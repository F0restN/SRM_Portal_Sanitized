import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {format, isAfter, isBefore, parseISO} from 'date-fns';

// Locality components
import {Button} from 'reactstrap'
import {
    Header,
    StyleButton,
    StyledSubtitle,
    StyledSandwichLayouts,
    StyledDeconstructedPancake, StyledTitle, StyledFoot,
} from './components/StyledComponents'
import LeftContainer from "./components/LeftContainer";
import RightContainer from "./components/RightContainer";
import store from "../../store/store";
import {current} from '@reduxjs/toolkit';
import {useParams} from 'react-router-dom';

import config from '../../config.json';
import * as ItemTypes from './components/ItemTypes';

class CoursesPicking extends Component {

    state = {
        authenticationStatus: store.getState(),
        leftContainerCards: [],
        rightContainerCards: [],
        currentYear: 2022,
        student: {
            studentInfo: {
                program: {
                    name: "default"
                },
                name: "default"
            }
        },
        overallProgramSemester: [],
    };
    originalLeftContainerCards = [];
    originalRightContainerCards = [];

    componentDidMount = async () => {
        // Step1. Retrieve student information
        const id = this.props.location.pathname.split("/")[2].split(":")[1]
        let result = await axios.post(`${config.portal}/students/getStudentInfo`, {
            peoplesoft_id: id
        }, {
            headers: {
                'Authorization': `Bearer ${this.state.authenticationStatus.jwtToken}`
            }
        });
        this.setState({student: result.data[0]});

        // Step2. Retrieve semester information
        let overallProgramSemestersResponse = await axios.post(`${config.portal}/programs/getOverallSemesters`, {
            program_duration: this.state.student.studentInfo.program.duration,
            program_start_date: this.state.student.studentInfo.program_start_date
        }, {
            headers: {
                'Authorization': `Bearer ${this.state.authenticationStatus.jwtToken}`
            }
        });
        this.setState({overallProgramSemester: [...overallProgramSemestersResponse.data]});

        // Step3. Retrieve course information for Selection panel
        try {
            // Set available courses  ( For leftContainer ）
            let response = await axios.post(`${config.portal}/courses/getCoursesForStudent`, {
                student_id: this.state.student.peoplesoft_id
            }, {
                headers: {
                    'Authorization': `Bearer ${this.state.authenticationStatus.jwtToken}`
                }
            });
            let avaCourses = [];
            for (let i = 0; i < response.data.length; i++) {
                let obj = response.data[i]
                avaCourses.push({
                    // type: ItemTypes.Card,
                    id: obj.uid,
                    courseId: obj.course_id,
                    text: obj.course_name,
                    term: obj.term,
                    prefix: obj.prefix
                });
            }
            this.originalLeftContainerCards = [...avaCourses]
            this.setState({leftContainerCards: avaCourses});

            // Set courses already selected （ For rightContainer ）
            let courses = []
            this.state.student.course.forEach((element) => {
                if (element.length > 0) {
                    let obj = element[0]
                    courses.push({
                        // type: 'Card',
                        id: obj.uid,
                        courseId: obj.course_id,
                        text: obj.course_name,
                        term: obj.term,
                        prefix: obj.prefix
                    });
                }
            })
            this.originalRightContainerCards = [...courses]
            this.setState({rightContainerCards: courses})

        } catch (error) {
            // this.setState({error});
        }
    };


    // Functions


    resetCard = () => {
        this.setState({leftContainerCards: this.originalLeftContainerCards})
        this.setState({rightContainerCards: [...this.originalRightContainerCards]})
    }

    autoPopulate = async () => {
        // Refresh right container
        let templateResponse = await axios.post(`${config.portal}/students/getTemplateForStudent`, {
            student: this.state.student,
            rightContainerCards: this.state.rightContainerCards
        }, {
            headers: {
                'Authorization': `Bearer ${this.state.authenticationStatus.jwtToken}`
            }
        });
        this.setState({rightContainerCards: templateResponse.data});

        // Remove cards from left container
        let rightContainerCards = templateResponse.data
        rightContainerCards.forEach((item, index) => {
            this.removeCard(item, 'left')
        })
    }

    save = async () => {
        let studentId = Number(this.state.student.peoplesoft_id);
        let bulkAddData = []
        this.state.rightContainerCards.forEach((element) => {
            bulkAddData.push({
                student_id: studentId,
                course_id: element.id,
                term: element.term
            })
        })

        axios.post(`${config.portal}/courses/bulkAddCourses`, bulkAddData, {
            headers: {
                'Authorization': `Bearer ${this.state.authenticationStatus.jwtToken}`
            }
        })
            .then(function (response) {
                alert(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    moveCard = (dragIndex, hoverIndex) => {
        const dragCard = this.state.leftContainerCards[dragIndex]
        let cloneCards = [...this.state.leftContainerCards];
        cloneCards.splice(dragIndex, 1);
        cloneCards.splice(hoverIndex, 0, dragCard);
        this.setState({leftContainerCards: cloneCards});
    }

    dragHandler = (item, container) => {
        if (container === "right"){
            let cloneCards = [...this.state.rightContainerCards]
            cloneCards.splice(0, 0, item)
            this.setState({rightContainerCards: cloneCards});
        } else {
            let cloneCards = [...this.state.leftContainerCards]
            cloneCards.splice(0, 0, item)
            this.setState({leftContainerCards: cloneCards});
        }
    }

    removeCard = (item, container) => {
        if (container === "right"){
            let cloneCards = [...this.state.rightContainerCards]
            for (let index = 0; index < cloneCards.length; index++) {
                const element = cloneCards[index];
                if (element.id === item.id) {
                    cloneCards.splice(index, 1)
                    break
                }
            }
            this.setState({rightContainerCards: cloneCards});
        } else {
            let cloneCards = [...this.state.leftContainerCards]
            for (let index = 0; index < cloneCards.length; index++) {
                const element = cloneCards[index];
                if (element.id === item.id) {
                    cloneCards.splice(index, 1)
                    break
                }
            }
            this.setState({leftContainerCards: cloneCards});
        }
    }

    render() {

        const {leftContainerCards, rightContainerCards, currentYear, overallProgramSemester, student} = this.state;

        return (
            <StyledSandwichLayouts>
                {/* Header Section */}
                 <div style={{width: '100%', height: '60px', background:'darkgray'}}>
                     Placeholder for Student / Start / Track
                     {/*<StyledTitle> Pitt – Health Informatics Banner </StyledTitle>*/}
                     {/*<StyledSubtitle> Picking appropriate course for this term</StyledSubtitle>*/}
                 </div>

                {/* Main Section */}
                <StyledDeconstructedPancake>
                    <DndProvider backend={HTML5Backend}>
                        <LeftContainer leftContainerCards={leftContainerCards}
                                       moveCard={this.moveCard}
                                       dragHandler={this.dragHandler}
                                       removeCard={this.removeCard}
                                       currentYear={currentYear}
                                       overallProgramSemester={overallProgramSemester}
                                       rightContainerCards={rightContainerCards}
                        />
                        <RightContainer rightContainerCards={rightContainerCards}
                                        moveCard={this.moveCard}
                                        dragHandler={this.dragHandler}
                                        removeCard={this.removeCard}
                                        currentYear={currentYear}
                                        overallProgramSemester={overallProgramSemester}
                                        student={student}
                        />
                    </DndProvider>
                </StyledDeconstructedPancake>

                {/* Bottom Section */}
                <StyledFoot>
                    <StyleButton>
                        <Button color="primary" onClick={this.save}> Save </Button>
                    </StyleButton>

                    <StyleButton>
                        <Button color="secondary" onClick={this.resetCard}> Reset </Button>
                    </StyleButton>

                    <StyleButton>
                        <Button color="success" onClick={this.autoPopulate}> Auto-populate </Button>
                    </StyleButton>

                    <StyleButton>
                        <Button color="success" onClick={() => {
                            alert("Generate POS")
                        }}> Generate POS
                            Document </Button>
                    </StyleButton>
                </StyledFoot>
            </StyledSandwichLayouts>
        );
    }
}

export default withRouter(CoursesPicking);
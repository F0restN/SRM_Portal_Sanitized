import React, {useEffect, useState} from 'react'
import SemesterContainer from './SemesterContainer'
import {
    StyledContainer,
    StyledContainerHeader, StyledContainerR,
    StyledLayoutContainer, StyledLayoutContainerR,
} from './StyledComponents'

export default function RightContainer(props) {

    // useEffect((props) => {
    //     let studentName = props.student.studentInfo.name
    //     let programName = props.student.studentInfo.program.name
    //     let title = " " + studentName + " (" + programName + ")"
    //     setTitleString(title)
    // })

    const displaySemesters = () => {
        return props.overallProgramSemester.map((ele, index) => {
            return <SemesterContainer key={index}
                                      term={ele}
                                      rightContainerCards={props.rightContainerCards}
                                      removeCard={props.removeCard}
                                      removeRightContainerCard={props.removeRightContainerCard}
                                      dragHandler={props.dragHandler}
                                      moveCard={props.moveCard}
                                      transferCard={props.transferCard}
            />
        })
    }

    return (
        <StyledLayoutContainerR>
            <StyledContainerHeader>{`Plan of study for ${props.student.studentInfo.name} (${props.student.studentInfo.program.name})`}</StyledContainerHeader>
            <StyledContainer>
                {displaySemesters()}
            </StyledContainer>
        </StyledLayoutContainerR>
    )
}

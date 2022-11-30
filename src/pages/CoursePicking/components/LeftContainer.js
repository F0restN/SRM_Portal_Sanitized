import React from 'react';
import { useDrop } from 'react-dnd'
import Card from "./Card";
import * as ItemTypes from './ItemTypes'
import {
    StyledContainer,
    StyledContainerHeader, StyledContainerL,
    StyledLayoutContainer, StyledLayoutContainerL,
    StyledLayoutLeftContainer
} from "./StyledComponents";
import _, { map } from 'underscore'

export default function LeftContainer(props) {

    let [{ isOver }, drop] = useDrop({
        accept: ItemTypes.RIGHT,
        drop(item, monitor){
            return {
                object: {
                    "enrollTerm": `${props.term}`,
                    ...item
                },
                target: "leftContainer",
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        })

    })

    const displayCards = () => {
        return props.leftContainerCards.map((card, index) => {
            return (
                <Card
                    key={card.id}
                    index={index}
                    type={ItemTypes.LEFT}
                    // Course properties
                    id={card.id}
                    courseId = {card.courseId}
                    text={card.text}
                    term={card.term}
                    prefix = {card.prefix}
                    // Function
                    removeCard={props.removeCard}
                    moveCard={props.moveCard}
                    transferCard={props.transferCard}
                    dragHandler={props.dragHandler}
                    removeRightContainerCard={props.removeRightContainerCard}
                />
            )
        })
    }

    return (
        <StyledLayoutContainerL>
            <StyledContainerHeader>Available Courses</StyledContainerHeader>
            <StyledContainer ref={drop}>
                {displayCards()}
            </StyledContainer>
        </StyledLayoutContainerL>
    )
}
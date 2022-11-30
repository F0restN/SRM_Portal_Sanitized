import React from 'react'
import { useDrop } from 'react-dnd'
import * as ItemTypes from './ItemTypes'
import {
    StyledCard,
    StyledContainerHeader,
    StyledRightPanelContainer,
    StyledRightContainer
} from './StyledComponents'
import Card from "./Card";

export default function SemesterContainer(props) {
    let [{ isOver }, drop] = useDrop({
        accept: ItemTypes.LEFT,
        drop(item, monitor) {
            if (item.term === props.term){
                return {
                    target: "rightContainer",
                    state: "successful",
                    object: {
                        "enrollTerm": `${props.term}`,
                        ...item
                    }
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        canDrop(item, monitor){
            let term = item.term.substring(4, item.term.length);
            let flag = term === "Summer" || item.term === props.term;
            return flag
        }
    })

    const displayCards = (currentTerm) => {
        return props.rightContainerCards.map((card, index) => {
            if (card.term === currentTerm) {
                return (
                    <Card
                        key={card.id}
                        index={index}
                        type={ItemTypes.RIGHT}
                        // Course properties
                        id={card.id}
                        courseId = {card.courseId}
                        prefix = {card.prefix}
                        text={card.text}
                        term={card.term}
                        // Function
                        removeCard={props.removeCard}
                        moveCard={props.moveCard}
                        transferCard={props.transferCard}
                        dragHandler={props.dragHandler}
                        removeRightContainerCard={props.removeRightContainerCard}
                    />
                )
            }
        })
    }

    return (
        <StyledRightPanelContainer>
            <StyledContainerHeader>{props.term}</StyledContainerHeader>
            <StyledRightContainer ref={drop}>
                {displayCards(`${props.term}`)}
            </StyledRightContainer>
        </StyledRightPanelContainer>
    )
}

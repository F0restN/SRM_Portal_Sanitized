import React, {useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd';
import * as ItemTypes from './ItemTypes'
import {hover} from "@testing-library/user-event/dist/hover";

const CardStyle = {
    backgroundColor: '#e3e9f3',
    padding: '8px',
    margin: '10px',
    border: '1px gray',
    cursor: 'move'
}

export default function Card({
                                 id,
                                 text,
                                 index,
                                 term,
                                 courseId,
                                 prefix,
                                 removeCard,
                                 moveCard,
                                 dragHandler,
                                 type
}) {
    // 真实DOM生成后会把DOM赋值给ref
    let ref = useRef();

    // let [, drop] = useDrop({
    //     accept: ItemTypes.CARD,
    //     drop: () => ({}),
    //     collect: () => ({}),
    //     // hover(item, monitor){
    //     //     const dragIndex = item.index;
    //     //     const hoverIndex = index;
    //     //     if( dragIndex === hoverIndex){
    //     //         return;
    //     //     }
    //     //     const {top, bottom} = ref.current.getBoundingClientRect();
    //     //     const halfOfHoverHeight = (bottom - top) / 2;
    //     //     const { y } = monitor.getClientOffset();  // event.clientY
    //     //     const hoverClientY = y - top;
    //     //     if( (dragIndex < hoverIndex && hoverClientY > halfOfHoverHeight) || (dragIndex > hoverIndex && hoverClientY < halfOfHoverHeight) ){
    //     //         // debugger
    //     //         moveCard(dragIndex, hoverIndex);
    //     //         item.index = hoverIndex;
    //     //     }
    //     // }
    // })

    // useDrag provide a way to hook a component onto a DnD and identified it as a draggable stuff.
    let [collectedProps, drag] = useDrag({
        type: type,
        item: () => ({id, text, index, term, courseId, prefix}),
        end(item, monitor) {
            let dropResult = monitor.getDropResult();
            try {
                if (monitor.didDrop() && dropResult.target === 'leftContainer'){
                    dragHandler(item, "left")
                    removeCard(item, "right")
                }
                if (monitor.didDrop() && dropResult.target === 'rightContainer'){
                    console.log("aaa")
                    dragHandler(item, "right")
                    removeCard(item, "left")
                }

            } catch (e) {
                console.log(e)
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            dropResult: monitor.getDropResult,
            draggingItem: monitor.getItem()
        })
    })

    let opacity = collectedProps.isDragging ? 0.3 : 1;
    // drop(ref);
    drag(ref);

    return (
        <div key={id} ref={ref} style={{...CardStyle, opacity}}>
            {prefix + " " + text + " (" + term + ")"}
        </div>

    )
}

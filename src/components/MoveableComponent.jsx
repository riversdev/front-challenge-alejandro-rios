import { useState, useRef } from 'react'
import Moveable from 'react-moveable';

const Component = ({
    updateMoveable,
    top,
    left,
    width,
    height,
    index,
    color,
    id,
    setSelected,
    isSelected = false,
    updateEnd,
    image,
    fit,
    deleteSelected,
}) => {
    const ref = useRef();

    const [nodoReferencia, setNodoReferencia] = useState({
        top,
        left,
        width,
        height,
        index,
        color,
        id,
        fit,
    });

    let parent = document.getElementById('parent');
    let parentBounds = parent?.getBoundingClientRect();

    const onResize = async (e) => {
        // ACTUALIZAR ALTO Y ANCHO
        let newWidth = e.width;
        let newHeight = e.height;

        const positionMaxTop = top + newHeight;
        const positionMaxLeft = left + newWidth;

        if (positionMaxTop > parentBounds?.height)
            newHeight = parentBounds?.height - top;
        if (positionMaxLeft > parentBounds?.width)
            newWidth = parentBounds?.width - left;

        updateMoveable(id, {
            top,
            left,
            width: newWidth,
            height: newHeight,
            color,
            fit,
        });

        // ACTUALIZAR NODO REFERENCIA
        const beforeTranslate = e.drag.beforeTranslate;

        ref.current.style.width = `${newWidth}px`;
        ref.current.style.height = `${newHeight}px`;

        let translateX = beforeTranslate[0];
        let translateY = beforeTranslate[1];

        // ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

        setNodoReferencia({
            ...nodoReferencia,
            translateX,
            translateY,
            top: top + translateY < 0 ? 0 : top + translateY,
            left: left + translateX < 0 ? 0 : left + translateX,
        });
    };

    const onResizeEnd = async (e) => {
        let newWidth = e.lastEvent?.width;
        let newHeight = e.lastEvent?.height;

        const positionMaxTop = top + newHeight;
        const positionMaxLeft = left + newWidth;

        if (positionMaxTop > parentBounds?.height)
            newHeight = parentBounds?.height - top;
        if (positionMaxLeft > parentBounds?.width)
            newWidth = parentBounds?.width - left;

        const { lastEvent } = e;
        const { drag } = lastEvent;
        // const { beforeTranslate } = drag;

        // const absoluteTop = top + beforeTranslate[1];
        // const absoluteLeft = left + beforeTranslate[0];

        const absoluteTop = top
        const absoluteLeft = left

        updateMoveable(
            id,
            {
                top: absoluteTop,
                left: absoluteLeft,
                width: newWidth,
                height: newHeight,
                color,
                fit,
            },
            true
        );
    };

    return (
        <>
            <div
                ref={ref}
                className='draggable'
                id={'component-' + id}
                style={{
                    position: 'absolute',
                    top: top,
                    left: left,
                    width: width,
                    height: height,
                    background: color,
                }}
                onClick={() => setSelected(id)}
                onDoubleClick={() => deleteSelected(id)}
            >
                <img src={image.url} style={{ objectFit: fit }} />
            </div>

            <Moveable
                target={isSelected && ref.current}
                resizable
                draggable
                onDrag={(e) => {
                    let top = e.top < 0 ? 0 : e.top
                    let left = e.left < 0 ? 0 : e.left

                    const positionMaxTop = top + e.height
                    const positionMaxLeft = left + e.width

                    if (positionMaxTop > parentBounds?.height)
                        top = parentBounds?.height - e.height
                    if (positionMaxLeft > parentBounds?.width)
                        left = parentBounds?.width - e.width

                    updateMoveable(id, {
                        top,
                        left,
                        width,
                        height,
                        color,
                        fit,
                    });
                }}
                onResize={onResize}
                onResizeEnd={onResizeEnd}
                keepRatio={false}
                throttleResize={1}
                renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
                edge={false}
                zoom={1}
                origin={false} // center point
                padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
                snappable
                elementSnapDirections={true}
            />
        </>
    );
}

export default Component
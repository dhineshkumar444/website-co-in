// src/components/Elements/TextElement.jsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { updateElement } from '../../redux/elementsSlice';
import { selectElement } from '../../redux/selectedElementSlice';

const TextElement = ({ element }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.selectedElement);
  const isSelected = selectedElement === element.id;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { id: element.id, type: 'text'  },  // Include the element ID in the drag item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(selectElement(element.id));
  };

  if (!element.position) return null;

  return (
    <div
      ref={drag}
      style={{
        position: 'absolute',
        left: element.position.x,
        top: element.position.y,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        color: element.properties.color,
        fontSize: element.properties.size+"px",
      }}
      onClick={handleClick}
    >
      {element.properties.content}
    </div>
  );
};

export default TextElement;

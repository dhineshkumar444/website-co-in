// src/components/Elements/ImageElement.jsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../redux/selectedElementSlice';

const ImageElement = ({ element }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.selectedElement);
  const isSelected = selectedElement?.id === element.id;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { id: element.id, type: 'image' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(selectElement(element.id));
  };

  return (
    <div
      ref={drag}
      className={`element ${isSelected ? 'selected' : ''}`}
      style={{
        left: element.position.x,
        top: element.position.y,
        opacity: isDragging ? 0.5 : 1,
        
      }}
      onClick={handleClick}
    >
      <img src={element.properties.src} alt="Element" width={element.properties.width}  height={element.properties.height}/>
    </div>
  );
};

export default ImageElement;





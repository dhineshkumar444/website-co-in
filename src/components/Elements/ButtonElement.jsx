// src/components/Elements/ButtonElement.jsx
import React from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { selectElement } from '../../redux/selectedElementSlice';


const ButtonElement = ({ element }) => {
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.selectedElement);
  const isSelected = selectedElement?.id === element.id;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { id: element.id, type: 'button'},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
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
  position: 'absolute',
  left: element.position.x,
  top: element.position.y,
  opacity: isDragging ? 0.5 : 1,
  cursor: 'move',
  
       
  fontSize:element.properties.buttonSize+"px"
}}
onClick={handleClick}
>
  <a href={element.properties.link}>
<button style={{backgroundColor: element.properties.bgColor,
  color: element.properties.color,}}>Click Me</button>
  </a>
</div>
  );
};

export default ButtonElement;


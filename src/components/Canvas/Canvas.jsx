// src/components/Canvas/Canvas.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, updateElement } from '../../redux/elementsSlice';
import TextElement from '../Elements/TextElement';
import ImageElement from '../Elements/ImageElement';
import ButtonElement from '../Elements/ButtonElement';

const Canvas = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements);

  const [, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvas = document.querySelector('.canvas');
      const canvasRect = canvas.getBoundingClientRect();
      const position = {
        x: offset.x - canvasRect.left,
        y: offset.y - canvasRect.top,
      };

      if (item.id) {
        // If it's an existing element, update its position
        dispatch(updateElement({
          id: item.id,
          position,
        }));
      } else {
        // If it's a new element, create it
        const newElement = {
          id: Date.now(),
          type: item.type,
          position,
          properties: {
            ...(item.type === 'text' && { content: 'Sample Text', color: '#000', size: 16 }),
            ...(item.type === 'image' && { src: 'https://via.placeholder.com/150', width: 150, height: 150 }),
            ...(item.type === 'button' && { label: 'Click Me', bgColor: '#007BFF', color: '#FFF', buttonSize: 14 }),
          },
        };
        dispatch(addElement(newElement));
      }
    },
  }));

  const renderElement = (el) => {
    switch (el.type) {
      case 'text':
        return <TextElement key={el.id} element={el} />;
      case 'image':
        return <ImageElement key={el.id} element={el} />;
      case 'button':
        return <ButtonElement key={el.id} element={el} />;
      default:
        return null;
    }
  };

  return (
    <div ref={drop} className="canvas" style={{ position: 'relative', width: '100%', height: '100vh', border: '1px solid #ccc' }}>
      {elements.map((el) => renderElement(el))}
    </div>
  );
};

export default Canvas;

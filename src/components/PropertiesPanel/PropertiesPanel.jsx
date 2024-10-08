// src/components/PropertiesPanel/PropertiesPanel.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateElement, removeElement } from '../../redux/elementsSlice';
import { deselectElement } from '../../redux/selectedElementSlice';
// import './PropertiesPanel.css'; // Optional: For specific styles

const PropertiesPanel = () => {
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.selectedElement);
  const elements = useSelector((state) => state.elements);

  const element = elements.find((el) => el.id === selectedElement);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (element) {
      setFormData({
        ...element.properties,
        content: element.properties.content || '', // For text
        src: element.properties.src || '', // For image
        label: element.properties.label || '', // For button
      });
    }
  }, [element]);

  if (!element) {
    return (
      <div className="properties-panel">
        <h2>Properties</h2>
        <p>Select an element to edit its properties.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(updateElement({
      id: element.id,
      properties: {
        ...element.properties,
        ...formData,
      },
    }));
  };

  const handleRemove = () => {
    dispatch(removeElement(element.id));
    dispatch(deselectElement());
  };

  const renderForm = () => {
    switch (element.type) {
      case 'text':
        return (
          <div className='property'>
            <label>Content:</label>
            <input
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
            <br />
            <label>Text Color:</label>
            <input
              type="color"
              name="color"
              value={formData.color || '#000000'} // Default to black
              onChange={handleChange}
            />
            <label>Font Size:</label>
            <input
              type="number"
              name="size"
              value={formData.size || 16} // Default to 16
              onChange={handleChange}
            />
            <br />
          </div>
        );
      case 'image':
        return (
          <div className='property'>
            <label>Image URL:</label>
            <input
              type="text"
              name="src"
              value={formData.src}
              onChange={handleChange}
            />
            <br />
            <label>Width (px):</label>
            <input
              type="number"
              name="width"
              value={formData.width || 150} // Default width
              onChange={handleChange}
              min="0"
            />
            <br />
            <label>Height (px):</label>
            <input
              type="number"
              name="height"
              value={formData.height || 150} // Default height
              onChange={handleChange}
              min="0"
            />
          </div>
        );
      case 'button':
        return (
          <div className='property'>
            <label>Label:</label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
            />
            <br />
            <label>Background Color:</label>
            <input
              type="color"
              name="bgColor"
              value={formData.bgColor || '#000000'} // Default to black
              onChange={handleChange}
            />
            <label>Button Size:</label>
            <input
              type="number"
              name="buttonSize"
              value={formData.buttonSize || 16} // Default size
              onChange={handleChange}
            />
            <label>Text Color:</label>
            <input
              type="color"
              name="color"
              value={formData.color || '#000000'} // Default to black
              onChange={handleChange}
            />
            <label>Add Link:</label>
            <input
              type="text"
              name="link"
              value={formData.link || '#'} // Default link
              onChange={handleChange}
            />
            <br />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="properties-panel">
      <h2>Properties</h2>
      <form>
        {renderForm()}
        <button
          type="button"
          onClick={handleSave}
          style={{
            marginTop: '20px',
            backgroundColor: 'green',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleRemove}
          style={{
            marginTop: '20px',
            marginLeft:"5px",
            backgroundColor: 'red',
            color: '#fff',
            border: 'none',
            padding: '5px 10px',
            cursor: 'pointer'
          }}
        >
          Delete Element
        </button>
      </form>
    </div>
  );
};

export default PropertiesPanel;

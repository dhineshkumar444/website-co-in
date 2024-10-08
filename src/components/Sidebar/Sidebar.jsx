// src/components/Sidebar/Sidebar.jsx
import React from 'react';
import { useDrag } from 'react-dnd';

const SidebarItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="draggable-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Elements</h2>
      <SidebarItem type="text" label="Text" />
      <SidebarItem type="image" label="Image" />
      <SidebarItem type="button" label="Button" />
    </div>
  );
};

export default Sidebar;

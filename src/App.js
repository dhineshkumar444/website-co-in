// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import store from './redux/store';
import Sidebar from './components/Sidebar/Sidebar';
import Canvas from './components/Canvas/Canvas';
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel';
import './styles/styles.css';
import Header from './Header';
import { TouchBackend } from 'react-dnd-touch-backend';

const App = () => {
  const isMobile = window.innerWidth <= 768; // Example condition for mobile
  const backend = isMobile ? TouchBackend : HTML5Backend;

  return (
    <Provider store={store}>
      <DndProvider backend={backend}>
      <Header />
        <div className="app-container">
        
          <Sidebar />
          <Canvas />
          <PropertiesPanel />
        </div>
      </DndProvider>
    </Provider>
  );
};

export default App;

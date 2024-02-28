import './App.css';
import './lib/main.js';

function App() {
  return (
    <div className="App">
      <div className="multi-container" />
      <div className="sketch" >
        <canvas id="draw-zone" className="sketch-child" width="500" height="500"></canvas>
        <p id="draw-zone-instruction" className="instruction">Draw here!</p>
        <button id="draw-zone-undo-button" className="button embedded-button">Undo</button>
      </div>
      <canvas id="circle-zone" className="sketch" width="500" height="500"></canvas>
      <p><input id="circle-zone-slider" type="range" min="0" max="1" step="any" /></p>
    </div>
  );
}

export default App;

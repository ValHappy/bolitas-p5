import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BlockPicker } from 'react-color';
import p5 from 'p5';

function App() {
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(55);

  const sketch = useRef();
  const canvasParent = useRef();

  useEffect(() => {
    sketch.current = new p5(p5canvas(canvasParent.current));
  }, []);

  const handleChange = (color) => {
    setColor(color.hex);
  }

  const handleSize = (event) => {
    setSize(parseInt(event.target.value));
  }

  const handleCreate = () => {
    sketch.current.addBolita({
      size: size,
      col: color,
    });
  }

  return (
    <div className="App">
      <header className="App-header">

        <section className="App-left">
          <BlockPicker color={color} triangle="hide" onChange={handleChange} />

          <input type="range" min="10" max="200" onInput={handleSize} />

          <button onClick={handleCreate}>Crear</button>
        </section>

        <section className="App-right">
          <div ref={canvasParent}></div>
        </section>

      </header>
    </div>
  );
}

const p5canvas = (domElement) => (app) => {

  var bolitas = [];

  app.setup = () => {
    var canvas = app.createCanvas(1200, 700);
    canvas.parent(domElement);
  }

  app.draw = () => {
    app.background(40, 44, 52);

    bolitas.forEach((bolita) => {
      app.noStroke();
      app.fill(bolita.col);
      app.ellipse(bolita.x, bolita.y, bolita.size, bolita.size);

      bolita.x += bolita.vel;

      if (bolita.x > app.width + bolita.size) {
        bolita.x = -1 * bolita.size - 10;
      }
    })
  }

  app.addBolita = (bolita) => {
    bolita.y = app.random(app.height);
    bolita.x = app.random(app.width);
    bolita.vel = app.random(1, 7);
    bolitas.push(bolita);
  }

}

export default App;

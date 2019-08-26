import React, { useState, useEffect } from 'react';

import './styles.css';

import MostrarVoltas from './MostrarVoltas';
import MostraTempo from './MostraTempo';
import Button from './Button';

function App() {

  const [numVoltas, setnumVoltas] = useState(0);
  const [running, setRunning] = useState(false);
  const [tempo, setTempo] = useState(0);

  const acresentarVoltas = () => {
    
    setnumVoltas(numVoltas + 1);
  }

  const decresentarVoltas = () => {
    if(numVoltas > 0){
      setnumVoltas(numVoltas - 1);
    }
  }

  const reset = () => {
    setnumVoltas(0);
    setTempo(0);
  }

  useEffect(() => {
    let timer = null;
    if(running){
      timer = setInterval(() => {
        setTempo(old => old + 1)
      }, 1000)
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    }
  },[running]);
  //Passando o colchetes vazias, o conteúdo será executado apenas uma vez.

  const toggleRunning = () => {
    setRunning(!running);
  }

  return (
    <div>
      <MostrarVoltas voltas={numVoltas}/>
      <Button text='+' className='bigger' onClick={acresentarVoltas} />
      <Button text='-' className='bigger' onClick={decresentarVoltas} />
      {
        numVoltas > 0 && 
        <div>
          <MostraTempo tempo={Math.round(tempo / numVoltas)} />
          <Button onClick={toggleRunning} text={running ? 'Pausar' : 'Iniciar' } />
          <Button onClick={reset} text='Reinicar' />
        </div>
      }
    </div>
  );
}

export default App;

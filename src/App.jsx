import { useState } from 'react'
import {Timer} from './Timer.jsx';
import './App.css'

function App() {
  function addTimer(){
    
  }

  return (
    <div id="main">
      <button onClick={addTimer}>Add Timer</button>
      <Timer time={{hours:"00",minutes:"00",seconds:"00"}}></Timer>
    </div>

  )
}


export default App

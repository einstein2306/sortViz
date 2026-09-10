import { useRef, useState } from 'react'
import {bubble} from './SortAlgorithms/Bubble.js'
import { selection } from './SortAlgorithms/Selection.js'
import { insertion } from './SortAlgorithms/Insertion.js'
import { merge } from './SortAlgorithms/Merge.js'
import { quick } from './SortAlgorithms/Quick.js'
import './App.css';

function App() {

  const [algorithm, setAlgorithm] = useState("select algorithm");
  const [array, setArray] = useState(Array.from({length: 60},()=> Math.floor(Math.random() * 250) + 20));
  const stopRef = useRef(false);
  const [stopDisabled, setDisabled] = useState(true);

  const algorithms = [
    {name: "Bubble"},
    {name: "Insertion"},
    {name: "Selection"},
    {name: "Merge"},
    {name: "Quick"}
  ]


  function buttonDeactivation(){
    document.querySelector('#start-btn').disabled = true;
    document.querySelector('#reset-btn').disabled = true;
    document.querySelector('.dropdown-toggle').disabled = true;
    setDisabled(false);
  }

  function buttonActivation(){
    setAlgorithm("select algorithm");
    document.querySelector('#start-btn').disabled = false;
    document.querySelector('#reset-btn').disabled = false;
    document.querySelector('.dropdown-toggle').disabled = false;
    setDisabled(true);
  }

function stopSorting(){
    stopRef.current = true;
    
    randomize();
    buttonActivation();

    document.querySelectorAll("#box").forEach(box => {
      box.style.backgroundColor = "steelblue";
    });
  }

  function randomize(){
    setArray(Array.from({length: 60},()=> Math.floor(Math.random() * 250) + 20));
  }

  function UpdateSortValue(algo){
    setAlgorithm(algo);
    console.log(algorithm);
  }

  async function performSorting(){
    buttonDeactivation();
    stopRef.current = false;

    if(algorithm === "select algorithm"){

      let parent = document.querySelector('#alert-msg');
      parent.replaceChildren();
      let alertBox = document.createElement("div");
      alertBox.className = "alert alert-warning alert-dismissible text-center  fade show small py-1 px-2";
      alertBox.role = "alert";
      alertBox.innerHTML = "<strong>Warning:</strong> Please select an algorithm.";
      let closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "btn-close p-2";
      closeButton.setAttribute("data-bs-dismiss", "alert");
      alertBox.appendChild(closeButton);
      parent.appendChild(alertBox);

      buttonActivation();
      return;
    }
    else if(algorithm === "Bubble"){
       await bubble(array,setArray,stopRef);
    }
    else if(algorithm === "Selection"){
       await selection(array,setArray,stopRef);
    }
    else if(algorithm === "Insertion"){
       await insertion(array,setArray,stopRef);
    }
    else if(algorithm === "Merge"){
       await merge(array,setArray,stopRef);
    }
    else if(algorithm === "Quick"){
       await quick(array,setArray,stopRef);
    }
    buttonActivation();

  }

  return (
    <div>
      <div className="container">
        <div>
          <h1 className='text-center'>Sorting Algorithm Visualizer</h1>
          <hr></hr>
        </div>
        <div id="controller">
          <div className="d-flex justify-content-left gap-2">
              <div className="dropdown">
                <button className="btn btn-sm dropdown-toggle" style={{ backgroundColor: "#e9ecef" }} type="button" data-bs-toggle="dropdown">
                  {algorithm}</button>
                <ul className="dropdown-menu">
                  {algorithms.map((algo)=>(
                    <li key={algo.name}><button  className='dropdown-item' onClick={()=>UpdateSortValue(algo.name)}>
                      {algo.name}
                      </button></li>
                  ))}
                </ul>
              </div>
              <button id="start-btn" className="btn btn-sm btn-primary" onClick={()=>performSorting()}>start</button>
              <button id="reset-btn" className="btn btn-sm btn-danger" onClick={()=>randomize()}>randomize</button>
              <button id="stop-btn" className="btn btn-sm btn-dark" onClick={()=>stopSorting()} disabled={stopDisabled}>reset</button>
          </div>
        </div>
        <div className="setter">
          <div id="alert-msg"></div>
          <div className="box-container d-flex align-items-end gap-1 bg-light rounded">
              {array.map((value,index) => (
                <div id="box" key={index} style={{ height:`${value}px`}}></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
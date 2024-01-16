import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Card(){
    const [task,setTask] = useState('')
    const[list,setList] = useState([]);
    const[count,setCount] = useState(0);

//create a function that appends a new div based on input 

function addTask(e){
    e.preventDefault();
    // use .trim to avoid that multiple spaces get passed as input values
    if(task.trim !== ''){
        setList([...list,task]);
        setTask('')
        setCount(prevCount => prevCount +1);
    }
}

function handleEvent(e){
    setTask(e.target.value);
}

function deleteDiv(index){
    document.getElementById(index).remove();
    setCount(prevCount => prevCount -1);
}


    return(
        <div className="card">
            <h2 className=" d-flex justify-content-center">Tasks</h2>
            <form onSubmit={addTask}>
                <input className="item" id="input" value={task} type="text" placeholder="Enter new Task" onChange={handleEvent}/>
            </form>
            <div>
            <div id="tasks">
                {list.map((item, index)=>{
                    return(
                    <div className="mt-1 mx-4" id={index}>
                        <i className="fa-solid fa-thumbtack mx-3"></i>
                        {item}
                        <i className="fa-regular fa-trash-can" id="delete" onClick={()=>deleteDiv(index)}></i>
                    </div>
                    )
                })}
                </div>
            </div>
            <div className="counter mt-1 mx-4" id="counter">{count}{count==1?" task left!":" tasks left!"}</div>
        </div>
    )
    }
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Card(){
    const[todo, setTodo] = useState(" ");
    const[count,setCount] = useState(0);
    const[isTodelete,setDelete] = useState(false);

//create a function that appends a new div based on input 

function addTask(e){
    const task = e.target.value;
    const el = document.getElementById("tasks");
    if(task != ""){
        const newDiv= document.createElement("div");
        newDiv.className="mt-1 mx-4"
        newDiv.innerHTML=`<i class="fa-solid fa-thumbtack mx-3"></i>`+"  "+task+" "+`<i class="fa-regular fa-trash-can" id="delete"></i>`;
        el.appendChild(newDiv);
        const inputField = document.getElementById("input");
        inputField.value="";
        setCount(prevCount => prevCount +1);
    }
}




   

    return(
        <div className="card">
            <h2 className=" d-flex justify-content-center">Tasks</h2>
            <input className="item" id="input" type="text" placeholder="Enter new Task" onBlur={(e)=>addTask(e)}/>
            <div id="tasks"></div>
            <div className="counter mt-1 mx-4" id="counter">{count}{count==1?" task left!":" tasks left!"}</div>
        </div>
    )
}
import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Card(){
    const[todo, setTodo] = useState("Add a new task");
    const[count,setCount] = useState(0);
    const[isDeleted,setDelete] = useState(false);

//create a function that appends a new div based on input 

function addTask(e){
    const task = e.target.value;
    console.log(task);
    return(
        <p>hey</p>
    )

}


   

    return(
        <div className="card">
            <h2 className=" d-flex justify-content-center">Tasks</h2>
            <input className="item" type="text" placeholder="Enter new item" onBlur={(e)=>addTask(e)}/>
        </div>
    )
}
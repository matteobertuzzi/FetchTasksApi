import React, { useEffect } from 'react';
import { useState } from 'react';

export default function Card(){
    const [task,setTask] = useState('')
    const[list,setList] = useState([]);
    const[count,setCount] = useState(0);

    // create a new list to send via POST api

    const [apiList, setApilist] =useState([]);

    const baseUrl = 'https://playground.4geeks.com/apis/fake/todos/';

    // create a new username each time page loads
    const username = 'matts17b'

    // create all API functionsn

    const createApiList = async()=>{

        const url = baseUrl + 'user/'+username;
        const options = {
            Method: 'POST',
            Headers: {
                'Content-Type': 'application/json'
            },
            Body:[],
            }

        const response = await fetch(url, options);
        console.log(response.ok, response.status, response.statusText);
        if (!response.ok){
            console.log('error encountered: '+ response.status + response.statusText);
            return;
        }
    }

    const getList = async()=>{

        const url = baseUrl + 'user/'+ username;
        const options = {
            method: 'GET'
            }
        
        const response = await fetch(url, options);
        console.log(response.ok, response.status, response.statusText);
        if (!response.ok){
            console.log('error encountered: '+ response.status + response.statusText);
            // we must always return or the function does not work
            return
        }
        const data = await response.json();
        console.log(data);
    }

    const addListItem = async(newTask)=>{

        const dataToPass = [...apiList,newTask];
        setApilist([...apiList,newTask]);
        const url = baseUrl + 'user/'+username;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToPass),
            }
        
        const response = await fetch(url, options);
        console.log(response.ok, response.status, response.statusText);
        if (!response.ok){
            console.log('error encountered: '+ response.status + response.statusText);
            return;
        }
        const data = await response.json();
        console.log(data);
    }

    const deleteListItem = async()=>{

        const url = baseUrl + 'user/'+username;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(apiList),
            }

        const response = await fetch(url, options);
        console.log(response.ok, response.status, response.statusText);
        if (!response.ok){
            console.log('error encountered: '+ response.status + response.statusText);
            return;
        }
        const data = await response.json();
        console.log(data);
    }

    const deleteList = async()=>{
        const url = baseUrl + 'user/'+username;
        const options = {
            method: 'DELETE',
           };

        const response = await fetch(url,options);
        console.log(response.ok, response.status, response.statusText);
        if(!response.ok){
            console.log('error encountered: '+response.status + ' '+ response.statusText);
            return;
        }
        const data = await response.json();
        console.log(data);
    }
   

//create a function that appends a new div based on input 

function addTask(e){
    e.preventDefault();

    const parent =document.getElementById('tasks');
    
    // use .trim to avoid that multiple spaces get passed as input values
    if(task.trim !== ''){
        const newTask = {done:false, label: task}
        setList([...list,newTask]);
        setTask('');
        addListItem(newTask);
        getList();
        setCount(prevCount => prevCount +1);
    }
}


function handleEvent(e){
    setTask(e.target.value);
}

function deleteDiv(item, index){
    // remove item from apiList
    const indexRemove = apiList.indexOf(item);
    apiList.splice(indexRemove,1);
    document.getElementById(index).remove();
    setCount(prevCount => prevCount -1);
    deleteListItem();
    console.log(apiList, list);
    getList();
}

// function to display user list in div #tasks

const showUserList = async()=>{

    const parent =document.getElementById('tasks');
    while(parent.firstChild){
        parent.removeChild(parent.lastChild);
    }

    const url = baseUrl + 'user/'+ username;
        const options = {
            method: 'GET'
            }
        
        const response = await fetch(url, options);
        console.log(response.ok, response.status, response.statusText);
        if (!response.ok){
            console.log('error encountered: '+ response.status + response.statusText);
            // we must always return or the function does not work
            return
        }
        const data = await response.json();
        console.log(data);
        
        setTimeout(()=>{
            while(parent.firstChild){
                parent.removeChild(parent.lastChild);
            }
        },20000);

        return(
        data.map((item)=>{
            const child = parent.appendChild(document.createElement('div'));
            child.textContent = item.label
            })
        )

}


    return(
        <div className="card">
            <h2 className=" d-flex justify-content-center">Tasks</h2>
            <div className="d-flex justify-content-around">
                <button type="button" className="btn btn-success m-1" onClick={createApiList}>New User</button>
                <button type="button" className="btn btn-warning m-1" onClick={showUserList}>Get Tasks</button>
                <button type="button" className="btn btn-danger m-1" onClick={deleteList}>Delete User</button>
            </div>
            <form id="inputForm" onSubmit={addTask}>
                <input className="item" id="input" value={task} type="text" placeholder="Enter new Task" onChange={handleEvent}/>
            </form>
            <div>
            <div id="tasks">
                {list.map((item, index)=>{
                    return(
                    <div className="mt-1 mx-4" id={index}>
                        <i className="fa-solid fa-thumbtack mx-3"></i>
                        {item.label}
                        <i className="fa-regular fa-trash-can" id="delete" onClick={()=>deleteDiv(item, index)}></i>
                    </div>
                    )
                })}
                </div>
            </div>
            <div className="counter mt-1 mx-4" id="counter">{count}{count==1?" task left!":" tasks left!"}</div>
        </div>
    )
}
    

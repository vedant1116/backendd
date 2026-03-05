import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  const [notes, setnotes] = useState([])

 function fetchData(){
    axios.get('https://backendd-tya8.onrender.com/api/notes').then((res)=>{
    setnotes(res.data.notes)
  })

 }
useEffect(()=>{
   fetchData()
},[])
  
function submitHandler(e){
 e.preventDefault();
 const title=e.target.title.value;
  const content=e.target.content.value;
  axios.post('https://backendd-tya8.onrender.com/api/notes',{title,content}).then(()=>{
    console.log(" note added successfully ");
    fetchData()
  })
  
 
}
function deleteHandler(noteId){
  console.log(noteId);
  
  axios.delete('https://backendd-tya8.onrender.com/api/notes/'+noteId).then((res)=>{
    console.log("note deleted successfully");
    fetchData()
    
  })

}

function updateHandler(noteId){
  console.log(noteId);

  axios.patch('https://backendd-tya8.onrender.com/api/notes/'+noteId,{content:prompt("Enter new content")}).then((res)=>{    

    console.log("note updated successfully");
    fetchData()
  })
  
}
 
  return (
    <div>
      <form onSubmit={submitHandler}>
      <input type="text" placeholder='title' name='title' />
      <input type="text" placeholder='content' name='content'/>
      <button type='submit'>Add Note</button>
      </form>
      <div className="notes">

        {notes.map((note,idx)=>{
          return (<div className="note">
            <h1>{note.title}</h1>
            <p>{note.content}</p>
            <button onClick={()=>{
              deleteHandler(note._id)
            }}>Delete</button>
            <button onClick={()=>{
              updateHandler(note._id)
            }}>Update</button>
          </div>)
        })}
      </div>
    </div>
  )
}


export default App

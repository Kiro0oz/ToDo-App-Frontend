import React, { useState } from 'react'
import axios from 'axios'

const TodoForm = ({setTodo, fetchData}) => {

  const [newTodo, setNewTodo] = useState({
    'body': ''
  })

  const handleInputChange = (e) => {
    setNewTodo({...newTodo, 'body': e.target.value })
  }  // This function updates the state with the input value

  const PostTodo = async () => {
    try{
      await axios.post('http://127.0.0.1:8000/api/todo/', newTodo)
      setTodo(prevData => [...prevData, newTodo])
      setNewTodo({'body': ''})
      fetchData()  
    } catch(e){
      console.error('Error:', e)
    }
  }


  return (
    <div>
        <input 
          type="text" 
          placeholder="Add ToDo" 
          className="input input-bordered input-accent w-full max-w-xs text-white" 
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              PostTodo()
            }
          }}
          value={newTodo.body} />
        <button className="btn btn-primary ml-2" onClick={PostTodo}>Add</button>
    </div>
  )
}

export default TodoForm
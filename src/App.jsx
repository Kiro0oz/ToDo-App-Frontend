import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import axios from 'axios';
import Table from './components/Table'
import './App.css'

function App() {

  const [todo, setTodo] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData()    
  }, [])  

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/todo/')
      setTodo(response.data)
      setIsLoading(false)
    } catch (err) {
      console.error('Error fetching data:', err)
    }
  }

  
  return (
    <div className='bg-indigo-100 px-8 min-h-screen'>
      <nav className='pt-8'>
      <p className='text-5xl text-center pb-20'>ToDo List</p>
      </nav>
      <div className='text-center'>
        <TodoForm
          setTodo={setTodo}
          fetchData={fetchData}
        />
        <Table 
          todo={todo}
          setTodo={setTodo}
          isLoading={isLoading}  
        />
      </div>
    </div>
  )
}

export default App

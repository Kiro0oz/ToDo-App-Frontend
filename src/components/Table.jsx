import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import axios from 'axios'
import { useState } from "react";

const Table = ({todo, setTodo, isLoading}) => {

  const [editText, setEditText] = useState({
    'body': ''
  })

  const handleDelete = async (id) => {
    try {
     await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
     const newTodo = todo.filter(t => t.id!== id)
     setTodo(newTodo)

    } catch (err) {
      console.error('Error deleting todo:', err)
    }
  }

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
      const newTodo = todo.map(t => t.id === id ? response.data : t)
      setTodo(newTodo)
    } catch (err) {
      console.error('Error editing todo:', err)
    }
  }

  const handleCheckBox = (id, value) => {
    handleEdit(id, {
      'compiled': !value
    })
  }

  const handleChange = (e) => {
    setEditText(prev => ({
      ...prev,
      'body': e.target.value
    }))  
  }


  return (
    <div className='py-8 flex justify-center'>
        <table className='w-11/12 max-w-4xl'>
          <thead className='border-b-2 border-black'>
            <tr>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Checkbox</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>To Do</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Data Created</th>
              <th className='p-3 text-sm font-semibold tracking-wide text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
          {isLoading ? <div>Loading...</div> : 
            <>
              {todo.map((todoItem, index) => {
                    return(
                      <tr key={todoItem.id} className="text-left border-b border-black">
                      <td className='p-3 text-sm'>
                          <span className="inline-block cursor-pointer" onClick={() => handleCheckBox(todoItem.id, todoItem.compiled)}>
                          {todoItem.compiled ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                          </span>
                      </td>
                      <td className='p-3 text-sm'>{todoItem.body}</td>
                      <td className='p-3 text-sm'>
                        {todoItem.compiled ? 
                          <span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-green-300">Complete</span>
                          :
                          <span className="p-1.5 text-xs font-medium tracking-wider rounded-md bg-red-300">Not Complete</span>
                          }
                      </td>
                      <td className='p-3 text-sm'>{new Date(todoItem.created).toLocaleString()}</td>
                      <td className='p-3 text-sm font-medium grid grid-flow-col items-center mt-5'>
                          <span className='text-xl cursor-pointer' onClick={()=>document.getElementById('my_modal_1').showModal()}><MdEditNote onClick={() => setEditText(todoItem)} /></span>
                          <span className='text-xl cursor-pointer'><MdOutlineDeleteOutline onClick={() => handleDelete(todoItem.id)} /></span>
                      </td>
                    </tr>
                    )
                  })
                }
            </>
          }
 
          </tbody>
        </table>
  
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg text-white">Edit ToDo</h3>
    <input type="text" placeholder="Edit" onChange={handleChange} value={editText.body} className="input w-full max-w-xs mt-6 bg-slate-50" />
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn mr-4" onClick={() => handleEdit(editText.id, editText)}>Edit</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  )
}

export default Table
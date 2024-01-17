import React, { useEffect, useState } from 'react';
import ITodos from '../interface/ITodos';
import { GetTodoByID, UpdateTodo } from '../redux/api/api.todo';

interface ModalProps {
  onClose: () => void;
  showPrivacyPolicy:boolean;
  id:string
}

const ModalComponent: React.FC<ModalProps> = ({id,showPrivacyPolicy,onClose}) => {
     const [form,setForm]=useState<ITodos>({
        title:"",
        description:"",
        isCompleted:false
    })

    const onChangeForm = (
        e: React.FormEvent<HTMLInputElement | HTMLSelectElement |HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;
        setForm({
            ...form,
            [name]: value,
        });

        if(name==="completed"){
            setForm({
                ...form,
                isCompleted:!form.isCompleted
            });
        }
    };

    useEffect(() => {
        async function getTodos() {
            GetTodoByID(id).then(res => {
                const data =  res.data
                console.log("data consent:",res.data)
                console.log(data)
                setForm(res.data)
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
              })
        }
        getTodos();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const OnClosed=()=>{
        async function UpdateTodoID() {
            const { title, isCompleted, description } = form;
            UpdateTodo(id,{ title, isCompleted, description }).then(res => {
                const data =  res.data
                console.log("data consent:",res.data)
                if(res.message === "success"){
                    onClose()
                    // setShowPrivacyPolicy(false)
                }
                // console.log(data)
                // setForm(res.data)
                // setTodos(data)
                // setTodos([...todos, data]);
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                // setIsLoading(false);
              })
        }
        UpdateTodoID();
    }

    console.log(form)
  return (
    <div className="font-sans bg-gray-100 flex items-center justify-center h-screen">
      <div>
        {showPrivacyPolicy && (
          <div className="fixed z-10 inset-0 flex items-center justify-center text-left">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div
              className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-screen-md w-full m-4"
              // Add transition classes as needed
            >
              {/* Modal panel */}
              <div className="px-6 py-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900"> Edit Todo list</h3>
              </div>
              <div className="prose max-w-screen-md p-6 overflow-y-auto text">
              <form className="max-w-sm mx-auto">
                    <div className='w-full text-left mt-2 mb-2'>
                        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Title</label>
                        <input type="text"
                            value={form.title}
                            name="title"
                            onChange={onChangeForm}
                            id="website-admin" className="rounded-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded" placeholder="Add new todo"
                        />
                    </div>
                    <div className='w-full text-left mt-2 mb-2'>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="add your description todo" value={form.description || ""} onChange={onChangeForm} name="description">
                        </textarea>
                    </div>
                    <input
                        type="checkbox"
                        name="completed"
                        onChange={onChangeForm}
                        checked={form.isCompleted}
                                // onChange={() => toggleComplete(todo.id)}
                    />
                        Click the checkbox for complete the task
                                {/* <span  className="mx-2 hover:cursor-pointer" style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }} onClick={()=>getID(todo.id)}>
                                    {todo.title} */}
                    {/* </span> */}
                </form>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex align-items justify-end p-4 gap-4 flex-row">
                <button onClick={OnClosed} type="button" className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400  sm:w-auto sm:text-sm"> Save </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;

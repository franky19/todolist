import { useEffect, useState } from 'react';
import { AddTodo, DeleteTodo, GetTodo, UpdateTodo} from '../redux/api/api.todo';
import logo from '../assets/delete.png';
import { TodoItem } from '../interface/ITodos';
import ModalComponent from './ModalComponent';

 

   const TodoApp = () => {
     const [todos, setTodos] = useState<TodoItem[]>([]);
     const [form,setForm]=useState({
        title:""
    })
    const [isLoading,setIsLoading] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [id,setID]=useState('')

    function getTodos() {
        GetTodo().then(res => {
            const data =  res.data
            setTodos(data)
          }).catch((e) => {
            console.log(e)
          }).finally(() => {
            setIsLoading(false);
          })
    }

     const addNewTodo = () => {
        function CreateNewTodo() {
            AddTodo(form.title).then(res => {
                console.log(res)
                const data =  res.data
                // console.log("data consent:",res.data)
                // console.log(data)
                // setTodos(data)
                // setTodos([...todos, data]);
                return getTodos();
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                setIsLoading(false);
              })
        }
        CreateNewTodo();
        // return getTodos()
        // window.location.reload();
     };

     const removeTodo = (id: string) => {
        function RemoveTodoByID() {
            DeleteTodo(id).then(res => {
                console.log(res)
                return getTodos();
                // window.location.reload();
            }).catch((e) => {
                console.log(e)
            }).finally(() => {
                setIsLoading(false);
            })
        }
        RemoveTodoByID();
    //    
     };

     const toggleComplete = (id: string) => {
       const updatedTodos = todos.map((todo) => {
         if (todo.id === id) {
            const isCompleted= !todo.isCompleted
            const {title,description} = todo
            UpdateTodo(id,{ title, isCompleted, description }).then(res => {
                const data =  res.data
                console.log("data consent:",res.data)
                if(res.message === "success"){
                    return { ...todo, isCompleted: !todo.isCompleted };
                    // onClose()
                    // setShowPrivacyPolicy(false)
                }
              }).catch((e) => {
                console.log(e)
              }).finally(() => {
                // setIsLoading(false);
              })
           return { ...todo, isCompleted: !todo.isCompleted };
         }
         return todo;
       });
       setTodos(updatedTodos);
     };
     

    useEffect(() => {
        getTodos();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onChangeForm = (
        e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.currentTarget;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const getID=(id:string)=>{
        setShowPrivacyPolicy(true);
        setID(id)
        console.log(id)
    }

    const closedModal=()=>{
        setShowPrivacyPolicy(false)
        getTodos()
    }

     return (
       <div>
         <nav
		className="fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out" style={{backgroundColor:'#e7f6df'}}
        >
             <div className="flex justify-between p-4" >
                    <div className="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
                            todo apps
                    </div>
            </div>
        </nav>
        <div className="flex items-center justify-center mt-40">
            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <form className="max-w-sm mx-auto">
                    <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Add New Todo</label>
                    <div className="flex">
                        <input type="text"
                        value={form.title}
                        name="title"
                        onChange={onChangeForm} id="website-admin" className="rounded-none bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add new todo" style={{borderEndStartRadius:"0.5rem",borderStartStartRadius:"0.5rem"}}/>
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 hover:cursor-pointer" onClick={addNewTodo}>
                        +
                        </span>
                    </div>
                </form>
                {todos.map((todo) => (
                   <div className="my-2 block max-w-sm  bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-left" key={todo.id}>
                       <div className='flex justify-between content-center items-center'>
                            <div className='px-3'>
                            <input
                                type="checkbox"
                                name="isCompleted"
                                checked={todo.isCompleted}
                                onChange={() => toggleComplete(todo.id)}
                            />
                                <span  className="mx-2 hover:cursor-pointer" style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }} onClick={()=>getID(todo.id)}>
                                    {todo.title}
                                </span>
                            </div>
                            <div className='px-3 hover:cursor-pointer' onClick={() => removeTodo(todo.id)}>
                                <img src={logo} alt="logo" style={{height:"20px"}}/>
                            </div>
                       </div>
                   </div>
                ))}
            </div>
            
        </div>
        {showPrivacyPolicy && <ModalComponent  showPrivacyPolicy=    {showPrivacyPolicy} id={id} onClose={closedModal} />}
        {/* {showPrivacyPolicy && <ModalComponent showPrivacyPolicy=    {showPrivacyPolicy} id={id} />} */}
       </div>
       
     );
   };

   export default TodoApp;
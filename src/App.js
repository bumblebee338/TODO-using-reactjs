import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import {useState, useEffect} from 'react';

function App() {

  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setfilterTodos] = useState([]);

  //use only once

  useEffect(()=>{
    getLocalTodos();
  },[]);

  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [status, todos]);


  const filterHandler = () =>{
    switch (status) {
      case "completed":
        setfilterTodos(todos.filter(todos => todos.completed === true));
        break;
      case "uncompleted":
        setfilterTodos(todos.filter(todos => todos.completed === false));
        break;
      default:
        setfilterTodos(todos);
        break;
    }
  }

  //SAVE TO LOCAL
  const saveLocalTodos=()=>{
      localStorage.setItem("todos", JSON.stringify(todos));
  }

  const getLocalTodos=()=>{
    if(localStorage.getItem("todos") === null){
      localStorage.setItem("todos", JSON.stringify([]));
    }else{
      let localTodos = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodos);
    }
  }

  
  return (
    <div className="App">
      
      <header>
        <h1>React Todo List</h1>
      </header>
      <div className="container">
        <Form 
          inputText={inputText}
          setInputText={setInputText}
          todos={todos}
          setTodos={setTodos}
          setStatus={setStatus} />

        <TodoList setTodos={setTodos} todos={todos} filterTodos={filterTodos}/>
      </div>
      
    </div>
  );
}

export default App;

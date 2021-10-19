import styled from 'styled-components'
import { useState, useRef } from "react";
import TodoItem from "./TodoItem";

const Layout = styled.div`
  max-width: 645px;
  background: #f8f6e187;
  margin: 10% auto;
  padding: 64px 32px;
  box-shadow: 1.8px 2.4px 5px 2px rgba(0, 0, 0, 0.3);
  position: relative; 
  text-align: center;
`
const Pushpin = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #1b9bac87;
  box-shadow: 0.8px 1.4px 5px 1px rgba(0, 0, 0, 0.3);
  top: 32px;
  ${props => props.locateAt === "right" && `
  right: 30px;
  ` 
  } 
`
const Title = styled.div`
  font-family: Microsoft JhengHei;
  font-size: 50px;
  font-weight: bold;
  color: #1b9bacf5;
  text-align: center;
`
const Input = styled.input`
  font-size: 24px;
  font-family: Microsoft JhengHei;
  margin: 20px auto;
  padding-bottom: 8px;
  width: 540px;
  height: 42px;
  background: #f1f0e487;
  border: none;
  position: relative;
  box-sizing: border-box;
`
const ButtonSection=styled.div`
  display:flex;
  justify-content: space-between;
  margin: auto;
  width: 615px;
`
const Button=styled.button`
  padding:6px;
  font-size: 16px;
  cursor: pointer;
  background: grey;
  color:white;
  border: none;
  border-radius:4px;
  & + & {
    margin-left: 4px;
  }
`

function App() {
  const [todos, setTodos] = useState([
    //傳入初始值
    { id: 1, content: "abc", isDone: true, todoDisplay:"show" },
  ]);
  const [value, setValue] = useState("");
  const id = useRef(2);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const onKeyPressed = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length === 0) return
      setTodos([
        {
          id: id.current,
          content: value,
          isDone: false,
          todoDisplay: "show"
        },
        ...todos,
      ]);
      setValue("");
      id.current++; 
    } ;
  }

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id)); //不等於這個 todo 的 id 會留下來 //在 parent 這層寫 func，當作參數傳給 child
  };
  
  const handleDeleteAllClick = () => {
    setTodos([])
  }

  const handleShowAllClick = () => {
    setTodos(
      todos.map((todo) => {
        return {
          ...todo,
          todoDisplay: "show",
        };
      })
    );
  }

  const handleShowCompletedClick = () => {
    
    setTodos(
      todos.map((todo) => {
        if (todo.isDone !== false) return {
          ...todo,
          todoDisplay: "show",
        };
        return {
          ...todo,
          todoDisplay: "hidden",
        };
      })
    );
  }

  const handleShowUncompletedClick = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.isDone !== false) return {
          ...todo,
          todoDisplay: "hidden",
        };
        return {
          ...todo,
          todoDisplay: "show",
        };
      })
    );
  }

  return (
    <Layout>
      <Pushpin></Pushpin>
      <Pushpin locateAt={"right"} ></Pushpin> {/*自己定義 locateAt 並傳入參數給 props*/}
      <Title>Todo List</Title>
      <Input 
        type="text" 
        placeholder="Add something to do here σ`∀´)σ" 
        value={value}
        onChange={handleInputChange}
        onKeyDown={onKeyPressed}
      />
      <ButtonSection>
        <Button onClick={handleDeleteAllClick}>Delete all</Button>
        <div>
          <Button onClick={handleShowAllClick}>All todo</Button>
          <Button onClick={handleShowCompletedClick}>completed todo</Button>
          <Button onClick={handleShowUncompletedClick}>uncompleted todo</Button>
        </div>
      </ButtonSection>
      {
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleToggleIsDone={handleToggleIsDone}
            handleDeleteTodo={handleDeleteTodo}
            todoDisplay={todo.todoDisplay}
          />
        ))
      }
    </Layout>
  );
}

export default App;

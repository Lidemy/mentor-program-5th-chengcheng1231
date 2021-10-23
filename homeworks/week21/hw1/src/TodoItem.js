import styled from "styled-components";

const ItemSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  position: relative;
  padding: 12px;
  ${props => props.complete === 'hidden' && `
  display: none;
  ` 
  } 
  ${props => props.complete === 'show' && `
  display: flex;
  ` 
  } 
  
`
const ItemCheckbox = styled.input`
  height: 20px;
  width: 20px;
  cursor: pointer;
`
const ItemText =styled.div`
  margin-left: 10px;
  font-size: 24px;
  font-family: Microsoft JhengHei;
  color: #1b9bacf5;
  width: 530px;
  word-wrap: break-word;
  text-align: initial;
  ${props => props.strikeThrough === true && `
  text-decoration:line-through;
  ` 
  } 
  
`
const deleteIcon = `
  content: "";
  width: 100%;
  height: 1.5px;
  background: #1b9bacf5;
  position: absolute;
  top: 50%;
  left: 50%;
`;

const ItemDelete=styled.div`
  position: absolute;
  right: 10px;
  height: 24px;
  width: 24px;
  cursor: pointer;
  
  &:before {
    ${deleteIcon}
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    ${deleteIcon}
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

export default function TodoItem({
    todo,
    handleToggleIsDone,
    handleDeleteTodo,
    todoDisplay
    }) {

    const handleTogglerClick = (e) => {
        handleToggleIsDone(todo.id);
    }

    const handleDeleteClick = () => {
        handleDeleteTodo(todo.id);
    };

    return (
        <ItemSection data-todo-id={todo.id} complete={todoDisplay}>
        <ItemCheckbox type="checkbox" checked={todo.isDone} onChange={handleTogglerClick}/>
        <ItemText strikeThrough={todo.isDone}>{todo.content}</ItemText>
        <ItemDelete onClick={handleDeleteClick}></ItemDelete>
        </ItemSection>
    )
}
import React from "react";
// import { TodoCounter } from "../TodoCounter";
// Importar nuestro contexto
import { TodoContext } from "../TodoContext";
import { TodoHeader } from "../TodoHeader";
import { TodoCounter } from "../TodoCounter";
import { TodoSearch} from "../TodoSearch"
import { TodoList } from "../TodoList";
import { TodoItem } from "../TodoItem";
import { TodoForm } from "../TodoForm";
import { EmptyTodos } from "../EmptyTodos";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoauding";
import { CreateTodoButton } from "../CreateTodoButton"
import { Modal } from "../Modal"


function AppUI(){
  // Desesctructuramos los valores de nuestro contexto, es decir metetimos los valores dentro de un objeto y luego utilizamos un hook de React, UseContext( y llamamos a nuestros context) 
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos, 
    completedTodos,
    searchValue,
    setSearchValue, 
  } = React.useContext(TodoContext);  

  return(
    <React.Fragment>
     <TodoHeader>
      <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        />
     </TodoHeader>

      <TodoList>
        {error && <TodosError error={error} />}
        {loading && <TodosLoading />}
        {(!loading && !searchedTodos.length) && <EmptyTodos />}
        {searchedTodos.map(todo =>(
          <TodoItem 
          key= {todo.text} 
          text={todo.text} 
          completed={todo.completed}
          onComplete={() => completeTodo(todo.text)} 
          onDelete={()=> deleteTodo(todo.text)}
        
          />
        ))}
        </TodoList>
        {openModal && (
            <Modal>
            <TodoForm />
            </Modal>
        )}

      <CreateTodoButton
        setOpenModal={setOpenModal}/>
    </React.Fragment>
    );
}

export { AppUI };
import React from "react";
import { useTodos } from "./useTodos"
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
import { ChangeAlertWithStorageListener } from "../ChangeAlert"



function App() {
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
    addTodo, 
    sincronizeTodos,
  } = useTodos(); 

  return (
    <React.Fragment>
      {/*Reactclone y ReactChildren, 
      para pasar props de Padre(TodoHeader) a hijos(todoCounter/TodoSearch)*/}
     <TodoHeader 
      loading={loading} >
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
     </TodoHeader>

      <TodoList 
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        totalTodos={totalTodos}
        searchText={searchValue}
        onError={() => <TodosError/>}
        onLoading={() => <TodosLoading/>}
        onEmptyTodos={() => <EmptyTodos/>}
        onEmptySearchResults={
          (searchText) => <p>No hay resultado para {searchText}</p>}
        // Render Props
          render={todo => (
          <TodoItem 
            key= {todo.text} 
            text={todo.text} 
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)} 
            onDelete={()=> deleteTodo(todo.text)}
            />
        )}
      /> 
      {/* //Render function. */}
      {/* {todo => (
          <TodoItem 
          key= {todo.text} 
          text={todo.text} 
          completed={todo.completed}
          onComplete={() => completeTodo(todo.text)} 
          onDelete={()=> deleteTodo(todo.text)}
          />
      )} 
      </TodoList>
    */}
      
      
        {openModal && (
            <Modal >
            <TodoForm 
            openModal={openModal}
            setOpenModal={setOpenModal}
            addTodo={addTodo}
            />
            </Modal>
        )}

      <CreateTodoButton
        addTodo={addTodo}
        setOpenModal={setOpenModal}
        />
      <ChangeAlertWithStorageListener 
      sincronize={sincronizeTodos}
      />
      
    </React.Fragment>
  );
}

export default App;
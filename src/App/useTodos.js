import React from "react";
import { useLocalStorage } from "./useLocalStorage" 


function useTodos() {
  const {
      item: todos,
      saveItem: saveTodos, 
      sincronizeItem :sincronizeTodos,
      loading,
      error,
    } = useLocalStorage("TODOS_V1",[]);

  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

    //Cantidad de Todos completados
  const completedTodos = todos.filter(todo => !!todo.completed).length;
    
    //Cantidad total de Todos
  const totalTodos = todos.length;
    
    // Creamos una nueva variable en donde guardaremos las coincidancias con la búsqueda
  let searchedTodos = [];
    
    //Lógica para filtrar
  if (!searchValue.length >= 1){
    searchedTodos = todos; 
  }else {
    searchedTodos = todos.filter(todo => {
          const todoText = todo.text.toLowerCase();
          const searchText = searchValue.toLowerCase();
          return todoText.includes(searchText);
    })
  }
      
    //Esta funcion cada vez que reciba un texto va a :     
    const completeTodo = (text)=>{
      //1.buscar en cada uno de los todos cual es ellos comple con esa condición 
    const todoIndex = todos.findIndex(todo => todo.text === text);
        //Por eso, clonamos una lista de los todos para que 
    const newTodos = [...todos];
        // En esta nueva lista marcamos como completado el todo o no  
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;;
        // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
      saveTodos(newTodos);
    }
  const addTodo = (text) =>{
      const newTodos = [...todos];
      newTodos.push({
        completed:false,
        text,
      }); 
      saveTodos(newTodos);
  }
  const deleteTodo = (text) =>{
      const todoIndex= todos.findIndex(todo => todo.text === text);
      const newTodos = [...todos];
      newTodos.splice(todoIndex, 1); 
      saveTodos(newTodos);
  }

  const state ={
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,

  }

  const stateUpdaters = {
    setSearchValue,
    completeTodo,
    addTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
 };

 return{ state, stateUpdaters};
}
  

 export { useTodos } ;

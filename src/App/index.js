import React from "react";
import { AppUI } from "./AppUI";

// const defaultTodos = [
//   {text:"cortar cebolla", completed: true }, 
//   {text:"Tomar curso de intro a React", completed: false },
//   {text:"Llorar con la llorona", completed: true },
//   { text: 'LALALALAA', completed: false },
// ];

function useLocalStorage (itemName, inicialValue){
  // Creamos el estado inicial para nuestros errores y carga
  const [error, setError] = React.useState(false)
   //Estado de carga
  const[loading, setLoading] = React.useState(true)
   // Guardamos nuestros TODOs del localStorage en nuestro estado
  const [item, setItem] = React.useState(inicialValue);
  
  React.useEffect(() => {
    setTimeout(() => {
    try {  
      // Traemos nuestros TODOs almacenados
      const localStorageItem = localStorage.getItem(itemName);
      let parsedItem;
  
      if(!localStorageItem){
        // Si el usuario es nuevo no existe un item en localStorage, por lo tanto guardamos uno con un array vacío
        localStorage.setItem(itemName, JSON.stringify(inicialValue));
        parsedItem = inicialValue;
      }else {
        // Si existen TODOs en el localStorage los regresamos como nuestros todos
        parsedItem = JSON.parse(localStorageItem);
      
      } 

      setItem(parsedItem);
      setLoading(false);
    } catch(error){
      setError(error)
    }

    }, 1000);
  });
  
 
  // Creamos la función en la que actualizaremos nuestro localStorage
  const saveItem = (newItem) => {
    try{
       // Convertimos a string nuestros TODOs
      const stringifiedItem = JSON.stringify(newItem);
      // Los guardamos en el localStorage
      localStorage.setItem(itemName, stringifiedItem);
      // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
      setItem(newItem);
    }catch(error){
      setError(error)
    }
   };

     return {
      item,
      saveItem,
      loading,
      error,
     };
}

function App() {

  const {
    item: todos,
    saveItem: saveTodos, 
    loading,
    error,
  } = useLocalStorage("TODOS_V1",[]);

  const [searchValue, setSearchValue] = React.useState("")
  
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
  const deleteTodo = (text) =>{
    const todoIndex= todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1); 
    saveTodos(newTodos);
  }
  return (
    <AppUI 
    loading={ loading }
    error={error}
    totalTodos = {totalTodos}
    completedTodos = {completedTodos}
    searchValue =  {searchValue}
    setSearchValue = {setSearchValue}
    searchedTodos={searchedTodos}
    completeTodo={ completeTodo}
    deleteTodo={deleteTodo}
    />
       );
}
export default App;
import React from "react";

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
  
      }, 4000);
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

export { useLocalStorage };
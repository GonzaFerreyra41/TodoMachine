import React from "react";

function useLocalStorage (itemName, inicialValue){

  const [state, dispatch]= React.useReducer(reducer, initialState({ inicialValue }));
  const { 
    error,
    loading,
    item,
    sincronizedItem,
  } = state;

  //ACTION CREATORS
  const onError = (error) => dispatch({ type : actionTypes.error, payload: error});
  const onSuccess = (item) =>dispatch({type: actionTypes.success, payload: item});
  const onSave = (item) =>dispatch({type: actionTypes.save, payload: item});
  const onSincronize = (item) =>dispatch({type: actionTypes.sincronize});



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
      onSuccess(parsedItem);
    } catch(error){
      onError(error);
    }

    }, 2000);
  }, [sincronizedItem]
    //este segundo argumento, que es un arrays vacio, de nustro useEffect nos indica que solo se va a renderizar al cargar por primera vez nuestra aplicacion.
  );
  // Creamos la función en la que actualizaremos nuestro localStorage
  const saveItem = (newItem) => {
    try{
        // Convertimos a string nuestros TODOs
      const stringifiedItem = JSON.stringify(newItem);
      // Los guardamos en el localStorage
      localStorage.setItem(itemName, stringifiedItem);
      // Cada que el usuario interactúe con nuestra aplicación se guardarán los TODOs con nuestra nueva función
      onSave(newItem);
    }catch(error){
        onError(error);
      }
    };

  const sincronizeItem = () =>{
    // setLoading(true);
    // setSincronzedItem(false);
    onSincronize();
  }

      return {
      item,
      saveItem,
      loading,
      error,
      sincronizeItem,
      };
}


const initialState = ({ inicialValue })=>({
  sincronizedItem:true,
  error: false,
  loading:true,
  item:inicialValue,
});
const actionTypes={
  error:"ERROR",
  success: "SUCCESS",
  save:"SAVE",
  sincronize:"SINCRONIZE"
};

const reducerObject= (state, payload)=> ({
  [actionTypes.error]: {
    ...state,
    error:true,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.success]: {
    ...state,
    loading:false,
    error:false,
    sincronizedItem:true,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    loading:true,
    sincronizedItem:false,
  },
});

const reducer = (state, action) => {
 return reducerObject(state, action.payload)[action.type] || state;
}

export { useLocalStorage };
import React from "react";
import { TodoContext } from "../TodoContext";
import "./TodoForm.css"

function TodoForm() {
    // Creamos un estado para nuestro nuevo TODO
    const [newTodoValue, setNewTodoValue] = React.useState("");
     // Desestructuramos las funciones que necesitamos para añadir un TODO y cerrar nuestro modal
    const {  
        addTodo,
        setOpenModal,
    } = React.useContext(TodoContext)
   // Función para cerrar el modal
    const onCancel = () =>{
        setOpenModal(false);
    };
     // Creamos una función para actualizar el estado de nuestro nuevo TODO
    const onChange = (event) =>{
        setNewTodoValue(event.target.value);
    };
    // Función para agregar nuestro nuevo TODO
    const onSubmit = (event) =>{
        // prevent default para evitar recargar la página
        event.preventDefault();
        // Utilizamos nuestra función para añadir nuestro TODO
        addTodo(newTodoValue);
         // Cerramos nustro modal
        setOpenModal(false);
        // También estaría bien resetear nuestro formulario
        
    };
    return (
        <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo TODO</label>
            <textarea //no usamos un input porque los texto pueden ser largos. 
            value={newTodoValue}
            onChange={onChange}
            placeholder="Escribe tu TODOs"
            />
            {/* generamos un div para poder manipular mejor los los button. */}
            <div className="TodoForm-buttonContainer">
                <button 
                className="TodoForm-button "
                type = "button"
                onClick={onCancel}>
                    Cancelar
                </button>
                <button 
                type="submit"
                className="TodoForm-button TodoForm-button--add"
                >
                    Añadir
                </button>
            </div>
        </form>
    )
}

export { TodoForm }; 
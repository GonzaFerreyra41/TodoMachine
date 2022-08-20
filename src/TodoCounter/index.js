import React from "react";
import "./TodoCounter.css";

//Desestructuramos los props que pasamos al componentes
function TodoCounter({ totalTodos, completedTodos, loading }) {
    return (
       <h2
        className={`TodoCounter ${!!loading && "TodoCounter--loading"}`}
        >
            Has completado {completedTodos} de {totalTodos} TODOS
        </h2>
    );
}

export { TodoCounter }; 
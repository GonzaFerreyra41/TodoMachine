import React from "react";
import "./TodoCounter.css";
//Desestructuramos los props que pasamos al componentes
function TodoCounter ({total, completed}) {

    return (
        <h2 className="TodoCounter">Has completado {completed} de {total} TODOS</h2>
    );
}

export { TodoCounter }; 
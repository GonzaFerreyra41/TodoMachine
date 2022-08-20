import React from "react"

function TodoHeader ({ children, loading }) {
    
    return(
        <header>
            {   
            // ReactChilden genera un array donde podemos enviar mas de un componente 
            React.Children
                .toArray(children)
                .map((child) => 
                //React.cloneElement pasa una props 
                React.cloneElement(child, { loading: loading}))
            }
        </header>
    )
}

export {TodoHeader}
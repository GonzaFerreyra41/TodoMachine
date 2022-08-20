import React from "react";
import "./TodoSearch.css"

function TodoSearch({ searchValue, setSearchValue, loading }){       
    const onSearchValueChange = (event) => {
        console.log(event.target.value);
        setSearchValue(event.target.value);
    };
    
    return(
        <input 
        className="TodoSearch" 
        placeholder="Search"
        onChange={onSearchValueChange}
        value={searchValue}  
        disabled={loading} //nuestro input este disabled es decir deshabilitado hasta que cargue.
        />
    );
}

export { TodoSearch };
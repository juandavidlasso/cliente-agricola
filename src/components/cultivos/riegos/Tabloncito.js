import React from 'react';

const Tabloncito = ({listado}) => {

    const {id_tablon, numero} = listado

    return (
        <button
            type="button"
            key={id_tablon}
            className="spanRiego"
            disabled={true}
        >
            {numero}
        </button>
    );
}
 
export default Tabloncito;
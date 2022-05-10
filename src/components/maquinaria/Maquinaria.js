import React from 'react';
import { Link } from 'react-router-dom'

const Maquinaria = ({maquina}) => {

    const {idMaquinaria, marca, serie} = maquina

    return (
        <Link key={idMaquinaria} to='/maquinaria/detalle' state={{ data: maquina}} className='Content_maquina'>
            <span className='fw-bold text-uppercase'>{marca} {serie}</span>
        </Link>
    );
}
 
export default Maquinaria;
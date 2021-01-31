import React from 'react'
import ProntuarioBuscar from './ProntuarioBuscar'
import useTitle from '../../utils/context/hooks/useSEO'


const Prontuario = () => {

    useTitle({ title: 'Prontuario' })

    return (
        <div className="container-fluid white">
            <div className="row">
                <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
                    <ProntuarioBuscar />  
                </div>
            </div>
        </div> 
    )
}

export default Prontuario
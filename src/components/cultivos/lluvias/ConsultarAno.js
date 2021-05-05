import React, { useState, Fragment } from 'react';
import ResumenAno from './ResumenAno';
import Swal from 'sweetalert2'

const ConsultarAno = ({setResumenAno}) => {

    // Estado
    const [verResultado, setVerResultado] = useState(false)
    const [datoBusqueda1, setDatoBusqueda1] = useState({
        fecdate: ''
    })

    //actualizar estado
    const actualizarState = e => {
        setDatoBusqueda1({
            ...datoBusqueda1,
            [e.target.name]: e.target.value
        })
    }

    // extraer dato
    const {fecdate} = datoBusqueda1

    // consultar solo año
    const consultarYear1 = async(e) => {
        e.preventDefault()

        if(fecdate <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar el año.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
                }
            })
            return
        }

        if(isNaN(fecdate)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El año debe ser numérico.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
                }
            })
            return
        }
        setVerResultado(true)
    }

    return (
        <Fragment>
            <div className="col-2 offset-5">
                <form onSubmit={consultarYear1}>
                    <div className="input-field">
                        <input id="year" type="text" placeholder="Ingrese el año" className="mt-4 inputfinal" name="fecdate" value={fecdate} onChange={actualizarState} />
                    </div>
                    <div className="input-field center">
                        <input type="submit" value="Consultar" className="btnlink2" />
                    </div>
                </form>
            </div>

            {verResultado === true ?
                <ResumenAno fecdate={fecdate} />
            :
                null
            }
            <button type="button" className="btn btn-block white-text btncerrar" onClick={() => setResumenAno(false)}>Cerrar</button>
        </Fragment>
    );
}
 
export default ConsultarAno;
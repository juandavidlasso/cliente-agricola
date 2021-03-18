import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { validarArea } from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarFormRegistroTablon } from '../../../utils/redux/actions/tablonActions'
// Graphql
import {NUEVO_TABLON_MUTATION} from '../../../apollo/mutations'
import {OBTENER_TABLONES_POR_CORTE_QUERY,
        OBTENER_AREA_SUERTE_QUERY,
        COUNT_TABLONES_SUERTE_QUERY,
        OBTENER_TOTAL_HTA_QUERY,
        OBTENER_AREA_CORTE_QUERY,
        OBTENER_SUERTE_CORTE_TABLON_QUERY } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const TablonRegisterNuevo = ({id_corte, id_suerte}) => {

    const dispatch = useDispatch()
    // extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ agregarTablon ] = useMutation(NUEVO_TABLON_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    //state
    const [ tablon, actualizarTablon ] = useState({
        id_tablon: '',
        numero: '',
        area: '',
        corte_id: id_corte
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarTablon({
            ...tablon,
            [e.target.name]: e.target.value
        })
    }

    // extraer valores
    const { numero, area } = tablon
    const input = {
        numero: Number(numero),
        area: Number(area),
        corte_id: id_corte
    }

    // submit
    const submitNuevoTablon = async (e) => {
        e.preventDefault()

        // validar
        if(numero.trim() === '' || area.trim() === '') {
            mostrarWarning('Los campos marcados con * son obligatorios.')
            return
        }
        
        if(numero <= 0) {
            mostrarWarning('El número debe ser mayor a 0.')
            return
        }
        if(isNaN(numero)) {
            mostrarWarning('El nombre del tablón debe ser númerico.')
            return
        }
        if(validarArea(area) === false) {
            mostrarWarning('El área no tiene el formato correcto. Ej: 5.23 ')
            return
        }

        // guardar en la db
        try {
            await agregarTablon({
                variables: {
                    input,
                    id_corte
                },
                refetchQueries: [
                    {query: OBTENER_TABLONES_POR_CORTE_QUERY, variables: {id_corte}},
                    {query: OBTENER_AREA_SUERTE_QUERY, variables: {id_suerte}},
                    {query: COUNT_TABLONES_SUERTE_QUERY, variables: {id_suerte}},
                    {query: OBTENER_TOTAL_HTA_QUERY},
                    {query: OBTENER_AREA_CORTE_QUERY, variables: {id_corte}},
                    {query: OBTENER_SUERTE_CORTE_TABLON_QUERY}
                ]
            })
            actualizarActivo(false)
            // console.log(data);

            // Reiniciar el form
            actualizarTablon({
                numero: '',
                area: ''
            })

            Swal.fire({
                icon: 'success',
                title: 'Felicitaciones',
                text: 'El tablón se registró correctamente!',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then(function () {
                Swal.fire({
                    title: 'Atención',
                    text: "Desea registrar más tablones?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'No, Terminar',
                    confirmButtonColor: '#b71c1c',
                    cancelButtonText: 'Si, Registrar',
                    cancelButtonColor: '#1b5e20',
                    allowOutsideClick: false,
                    customClass: {
                        popup: 'borde-popup',
                        content: 'contenido-popup',
                        title: 'title-popup'
                    }
                }).then((result) => {
                    if (result.value) {
                        dispatch( ocultarFormRegistroTablon() )
                    } else {
                        actualizarActivo(true)
                    }
                })
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        }
    }    

    const cerrar = () => {
        dispatch( ocultarFormRegistroTablon() )
    }


    return ( 
        <div className="card-panel white p-5">
            <form onSubmit={submitNuevoTablon}>
                <h1 className="h3 font-weight-normal center"> Registrar Nuevo Tablón </h1>

                { warning ? <p className="warning"> {warning.msg} </p> : null }
                { alerta ? <p className="error"> {alerta.msg} </p> : null }

                <div className="input-field">
                    <label htmlFor="numero"><span className="red-text font-weight-bold">*</span> Número </label>
                    <input placeholder="Número" type="text" className="validate" name="numero" value={numero} onChange={actualizarState} />
                </div>
                <div className="input-field">
                    <label htmlFor="area"><span className="red-text font-weight-bold">*</span> Área </label>
                    <input placeholder="Área" type="text" className="validate" name="area" value={area} onChange={actualizarState} />
                </div>
                <div className="input-field center">
                    <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
                    <button type="button" className="btnlink" onClick={() => cerrar()}>Cancelar</button>
                </div>
            </form>
        </div>
     );
}
 
export default TablonRegisterNuevo;
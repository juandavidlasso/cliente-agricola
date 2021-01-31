import React, { useState, useContext } from 'react'
import { validarVariedad, validarZona } from '../../../utils/js/validaciones'
import Swal from 'sweetalert2'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import {useHistory} from 'react-router-dom'
// GraphQL
import {NUEVA_SUERTE_RENOVADA_MUTATION} from '../../../apollo/mutations'
import {OBTENER_SUERTES_RENOVADAS_QUERY, OBTENER_TOTAL_HTA_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const SuerteRenovarDatos = ({nombre}) => {

    // estado del componente
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ agregarSuerteRenovada ] = useMutation(NUEVA_SUERTE_RENOVADA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

      // state del componente
    const [ newSuerte, actualizarSuerte ] = useState({
        id_suerte: '',
        nombre: nombre,
        variedad: '',
        zona: '',
        renovada: 'SI'
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarSuerte({
            ...newSuerte,
            [e.target.name]: e.target.value
        })
    }

      // Extraer los valores
    const { variedad, zona, renovada } = newSuerte
    const suerte = {
        nombre,
        variedad,
        zona,
        renovada
    }

    // Submit
    const submitNuevaSuerte = async (e) => {
        e.preventDefault()

        // validar campos vacios
        if(variedad.trim() === '' || zona.trim() === '') {
            mostrarWarning('Los campos marcados con * son obligatorios.')
            return
        }

        // validar variedad
        if(validarVariedad(variedad) === false) {
            mostrarWarning('La variedad no tiene el formato correcto. Ej: CC-1234')
            return
        }

        // valiadr zona
        if(validarZona(zona) === false) {
            mostrarWarning('La zona agroecologica no tiene el formato correcto. Ej: 1H1')
            return
        }

        // guardar en la db
        try {
            await agregarSuerteRenovada({
                variables: {
                    suerte
                },
                refetchQueries: [
                    {query: OBTENER_TOTAL_HTA_QUERY},
                    {query: OBTENER_SUERTES_RENOVADAS_QUERY}
                ]
            })
            actualizarActivo(false)
            // console.log(data)

            // Reiniciar el form
            actualizarSuerte({
                nombre: '',
                variedad: '',
                zona: ''
            })
            

            Swal.fire({
                icon: 'success',
                title: 'Felicitaciones',
                text: 'La suerte se renovó correctamente!',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then(function () {
                history.push('/suerte/list')
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        }
    }    


    return (  
        <form onSubmit={submitNuevaSuerte}>
            <h1 className="h3 mb-2 font-weight-normal center-align font-weight-bold"> Renovar suerte </h1>
                
            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="nombre"> Número de suerte </label>
                <input disabled id="nombre" placeholder="Número de suerte" name="nombre" type="text" className="validate" defaultValue={nombre}  />
            </div>
            <div className="input-field">
                <label htmlFor="variedad"><span className="red-text font-weight-bold">*</span> Variedad de suerte </label>
                <input id="variedad" placeholder="Variedad de suerte" name="variedad" type="text" className="validate" value={variedad} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="zona"><span className="red-text font-weight-bold">*</span> Zona agroecológica </label>
                <input id="zona" placeholder="Zona agroecológica" name="zona" type="text" className="validate" value={zona} onChange={actualizarState} />
            </div>
            <div className="input-field center">
                <input type="submit" className="btnlink" value="Renovar" disabled={!activo} />
            </div>
        </form>
    );
}
 
export default SuerteRenovarDatos;
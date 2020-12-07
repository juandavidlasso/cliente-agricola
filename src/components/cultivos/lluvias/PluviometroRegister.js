import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroLluvia } from '../../../utils/redux/actions/lluviaActions'
// Graphql
import {NUEVO_PLUVIOMETRO_MUTATION} from '../../../apollo/mutations'
import {OBTENER_PLUVIOMETROS_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const PluviometroRegister = () => {

    // estado del component
    const dispatch = useDispatch()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ agregarPluviometro ] = useMutation(NUEVO_PLUVIOMETRO_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ pluviometro, actualizarPluviometro ] = useState({
        id_pluviometro: '',
        nombre: ''
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarPluviometro({
        ...pluviometro,
        [e.target.name]: e.target.value
        })
    }

    // extraer valores
    const { nombre  } = pluviometro
    const input = {
        nombre: Number(nombre)
    }

    // submit
    const submitNuevoPluviometro = async (e) => {
        e.preventDefault()

        // validar
        if(nombre.trim() === '') {
            mostrarWarning('Debe ingresar el número del pluviómetro.')
            return
        }

        if(nombre <= 0) {
            mostrarWarning('El nombre debe ser mayor a 0.')
            return
        }

        if(isNaN(nombre)) {
            mostrarWarning('El nombre debe ser numérico. Ej: 1')
            return
        }

        // guardar en la db
        try {
            await agregarPluviometro({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_PLUVIOMETROS_QUERY
                }]
            })
            actualizarActivo(false)
            // console.log(data);

            // reiniciar el form
            actualizarPluviometro({
                nombre: ''
            })

            dispatch( ocultarRegistroLluvia() )
            Swal.fire({
                title: 'Éxito!',
                text: 'El pluviómetro se registró correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1'
            }) 
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        }
    }

    const cerrar = () => {
        dispatch( ocultarRegistroLluvia() )
    }   

    return (
        <form onSubmit={submitNuevoPluviometro}>
            <h4 className="center"> Registrar Pluviómetro </h4>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="numero"><span className="red-text font-weight-bold">*</span> Número </label>
                <input placeholder="Número" type="text" className="validate" name="nombre" value={nombre} onChange={actualizarState} />
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
                <button type="button" onClick={ () => cerrar() } className="btnlink">Cancelar</button>
            </div>
        </form>
    )
}

export default PluviometroRegister
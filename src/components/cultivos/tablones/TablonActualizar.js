import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import {validarArea} from '../../../utils/js/validaciones'
// Graphql
import {ACTUALIZAR_TABLON_MUTATION} from '../../../apollo/mutations'
import {OBTENER_TABLON_QUERY, 
        OBTENER_TABLONES_POR_CORTE_QUERY, 
        OBTENER_AREA_SUERTE_QUERY, 
        OBTENER_TOTAL_HTA_QUERY,
        OBTENER_AREA_CORTE_QUERY } from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const TablonActualizar = ({data, props}) => {

    const {id_tablon, numero, area} = data.obtenerTablon
    const id_corte = Number(props.match.params.id_corte)
    const id_suerte = Number(props.match.params.id_suerte)
    // extraer los valores del context
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarTablon ] = useMutation(ACTUALIZAR_TABLON_MUTATION)

    //state
    const [ nuevoTablon, actualizarNuevoTablon ] = useState({
        id_tablon: id_tablon,
        numero: numero,
        area: area,
        corte_id: id_corte
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevoTablon({
            ...nuevoTablon,
            [e.target.name]: e.target.value
        })
    }    

    // extraer valores
    const input = {
        numero: Number(nuevoTablon.numero),
        area: Number(nuevoTablon.area),
        corte_id: id_corte
    }   
    
    // submit
    const submitActualizarTablon = async (e) => {
        e.preventDefault()

        // validar
        if(nuevoTablon.numero.toString().trim() === '' || nuevoTablon.area.toString().trim() === '') {
            mostrarWarning('Los campos marcados con * son obligatorios.')
            return
        }
        
        if(nuevoTablon.numero <= 0) {
            mostrarWarning('El número debe ser mayor a 0.')
            return
        }
        if(isNaN(nuevoTablon.numero)) {
            mostrarWarning('El nombre del tablón debe ser númerico.')
            return
        }
        if(validarArea(nuevoTablon.area) === false) {
            mostrarWarning('El área no tiene el formato correcto. Ej: 5.23 ')
            return
        }

        // guardar en la db
        try {
            await actualizarTablon({
                variables: {
                    id_tablon,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_TABLON_QUERY, variables: {id_tablon}},
                    {query: OBTENER_TABLONES_POR_CORTE_QUERY, variables: {id_corte}},
                    {query: OBTENER_AREA_SUERTE_QUERY, variables: {id_suerte}},
                    {query: OBTENER_TOTAL_HTA_QUERY},
                    {query: OBTENER_AREA_CORTE_QUERY, variables: {id_corte}}
                ]
            })

            // console.log(data);

            // Reiniciar el form
            actualizarNuevoTablon({
                numero: '',
                area: ''
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'Los datos se actualizaron correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then(function () {
                history.push(`/corte/detalle/${id_corte}/${id_suerte}`)
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        }
    }    

    return (
        <form onSubmit={submitActualizarTablon}>
            <h1 className="h3 font-weight-normal center"> Actualizar Tablón </h1>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="numero"><span className="red-text font-weight-bold">*</span> Número </label>
                <input placeholder="Número" type="text" className="validate" name="numero" defaultValue={numero} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="area"><span className="red-text font-weight-bold">*</span> Área </label>
                <input placeholder="Área" type="text" className="validate" name="area" defaultValue={area} onChange={actualizarState} />
            </div>
            <div className="input-field center">
                <input type="submit" className="btnlink" value="Actualizar" />
                <Link to={`/suerte/detalle/${id_suerte}`} className="btnlink">Cancelar</Link>
            </div>
        </form>
    )
}

export default TablonActualizar
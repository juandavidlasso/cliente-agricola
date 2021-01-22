import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
// GraphQL
import {ACTUALIZAR_SUERTE_MUTATION} from '../../../apollo/mutations'
import {OBTENER_SUERTES_RENOVADAS_QUERY, VER_SUERTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const SuerteActualizar = ({data, props}) => {

    const {nombre, variedad, zona, renovada } = data.obtenerSuerte
    const id_suerte = Number(props.match.params.id_suerte)
    // extraer los valores del context
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarSuerte ] = useMutation(ACTUALIZAR_SUERTE_MUTATION)

    //state
    const [ nuevaSuerte, actualizarNuevaSuerte ] = useState({
        id_suerte: id_suerte,
        nombre: nombre,
        variedad: variedad,
        zona: zona,
        renovada: renovada
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevaSuerte({
            ...nuevaSuerte,
            [e.target.name]: e.target.value
        })
    }    

    // extraer valores
    const input = {
        nombre: nuevaSuerte.nombre,
        variedad: nuevaSuerte.variedad,
        zona: nuevaSuerte.zona,
        renovada: nuevaSuerte.renovada
    }

    // submit
    const submitActualizarSuerte = async (e) => {
        e.preventDefault()

        // validar campos vacios
        if(nuevaSuerte.nombre.trim() === '' || nuevaSuerte.variedad.trim() === '' || nuevaSuerte.zona.trim() === '') {
            mostrarWarning('Los campos marcados con * son obligatorios.')
            return
        }
        

        // guardar en la db
        try {
            await actualizarSuerte({
                variables: {
                    id_suerte,
                    input
                },
                refetchQueries: [
                    {query: OBTENER_SUERTES_RENOVADAS_QUERY},
                    {query: VER_SUERTE_QUERY, variables: {id_suerte} }
                ]
            })

            //console.log(data);

            // Reiniciar el form
            actualizarNuevaSuerte({
                nombre: '',
                variedad: '',
                zona: ''
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
                history.push(`/suerte/detalle/${id_suerte}`)
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        }
    }

    return ( 
        <form onSubmit={submitActualizarSuerte}>
            <h1 className="h3 font-weight-normal center"> Actualizar Suerte </h1>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div className="input-field">
                <label htmlFor="nombre"><span className="red-text font-weight-bold">*</span> Número de suerte </label>
                <input id="nombre" placeholder="Número de suerte" name="nombre" type="text" className="validate text-uppercase" defaultValue={nombre} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="variedad"><span className="red-text font-weight-bold text-uppercase">*</span> Variedad de suerte </label>
                <input id="variedad" placeholder="Variedad de suerte" name="variedad" type="text" className="validate" defaultValue={variedad} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="zona"><span className="red-text font-weight-bold text-uppercase">*</span> Zona agroecológica </label>
                <input id="zona" placeholder="Zona agroecológica" name="zona" type="text" className="validate" defaultValue={zona} onChange={actualizarState} />
            </div>
            <div className="input-field center">
                <input type="submit" className="btnlink" value="Actualizar" />
                <Link to={`/suerte/detalle/${id_suerte}`} className="btnlink">Cancelar</Link>
            </div>
        </form>
     );
}
 
export default SuerteActualizar;
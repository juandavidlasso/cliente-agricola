import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import SelectSuerte from './SelectSuerte'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroLluvia } from '../../../utils/redux/actions/lluviaActions'
// Graphql
import {NUEVO_PLUVIOMETRO_MUTATION} from '../../../apollo/mutations'
import {OBTENER_PLUVIOMETROS_QUERY, OBTENER_RESUMEN_PLUVIOMETROS_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const PluviometroRegister = ({setRegistroPluvio}) => {

    // estado del component
    const dispatch = useDispatch()
    const alertaContext = useContext(AlertaContext)
    const { suertes} = alertaContext
    
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
    // const input = {
    //     nombre: Number(nombre)
    // }

    // submit
    const submitNuevoPluviometro = async (e) => {
        e.preventDefault()



        // obtener suertes para guardar en pluviometro
        const suertesAsociadas = await suertes.map(( {__typename, id_suerte, ...suerte} ) => suerte)
        //const suertesLista = suertesAsociadas[0]['nombre']
        let suertesLista = ""
        let suerteFinal = ""
        for (let i = 0; i < suertesAsociadas.length; i++) {
            suertesLista = suertesLista+suertesAsociadas[i]['nombre'] + "-"
            suerteFinal = suertesLista.substring(0, suertesLista.length - 1)
        }

        //console.log(suerteFinal);

        // validar
        if(nombre.trim() === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar el número del pluviómetro.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
                }
            }).then(() => {
                setRegistroPluvio(false)
            })
            return
        }

        if(nombre <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre debe ser mayor a 0.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
                }
            }).then(() => {
                setRegistroPluvio(false)
            })
            return
        }

        if(isNaN(nombre)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre debe ser numérico. Ej: 1',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
                }
            }).then(() => {
                setRegistroPluvio(false)
            })
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await agregarPluviometro({
                variables: {
                    input: {
                        nombre: Number(nombre),
                        suertesAsociadas: suerteFinal
                    }
                },
                refetchQueries: [
                    {query: OBTENER_PLUVIOMETROS_QUERY},
                    {query: OBTENER_RESUMEN_PLUVIOMETROS_QUERY}
                ]
            })
            // console.log(data);

            // reiniciar el form
            actualizarPluviometro({
                nombre: ''
            })
            setRegistroPluvio(false)

            dispatch( ocultarRegistroLluvia() )
            Swal.fire({
                title: 'Éxito!',
                text: 'El pluviómetro se registró correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }) 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: (error.message.replace('GraphQL error: ', '')),
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                popup: 'borde-popup',
                content: 'contenido-popup',
                title: 'title-popup'
                }
            }).then(() => {
                setRegistroPluvio(false)
                actualizarActivo(true)
            })
        }
    }

    const cerrar = () => setRegistroPluvio(false) 

    return (
        <form onSubmit={submitNuevoPluviometro}>
            <h4 className="center"> Registrar Pluviómetro </h4>

            <div className="input-field">
                <label htmlFor="numero"><span className="red-text font-weight-bold">*</span> Número </label>
                <input placeholder="Número" type="text" className="validate" name="nombre" value={nombre} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <SelectSuerte />
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Registrar" disabled={!activo} />
                <button type="button" onClick={cerrar} className="btnlink">Terminar</button>
            </div>
        </form>
    )
}

export default PluviometroRegister
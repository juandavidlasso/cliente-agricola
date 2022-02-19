import React, { useState, useContext, useEffect, Fragment } from 'react';
// import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import Select from 'react-select'
// Context
import DatosContext from '../../../../utils/context/datos/datosContext'
// GraphQL
import {NUEVA_APLA_MUTATION} from '../../../../apollo/mutations'
// import {OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'


const ModalDatoPL = ({listado, trapl, fecha, id_corte}) => {

    // const { id_tablon, numero } = listado
    const {obtenerTablonesPorCorte} = listado
    const {id_trapl} = trapl
    // mutation hook
    const [ agregarAplicacionPlaga ] = useMutation(NUEVA_APLA_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)
    const [ tablones, setTablones] = useState([])
    const [ datosTablon, setDatosTablon] = useState([])
    const array = []
    // Context
    const datosContext = useContext(DatosContext)
    const { agregarTablones, arrayTablones } = datosContext

    useEffect(() => {
        agregarTablones(tablones)
        arrayDatos()
        setDatosTablon(array)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tablones])

    // Construyo array
    const arrayDatos = () => {
        obtenerTablonesPorCorte.map(tablon => {
            let datos = {
                fecha,
                corte_id: Number(id_corte),
                tablon_id: tablon.id_tablon,
                trapl_id: Number(id_trapl),
                numero: tablon.numero
            }
            return array.push(datos)
        })
    }
    
    // submit
    const submitNuevaAplicaionPlaga = async (e) => {
        e.preventDefault()

        if(arrayTablones.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar el/los tablón/tablones',
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

        actualizarActivo(false)
        const input = arrayTablones

        // guardar en la db
        try {
            await agregarAplicacionPlaga({
                variables: {
                    input
                }
            }).then((result) => {
                if(result.data.agregarAplicacionPlaga.success === true) {
                    // Redirigir
                    Swal.fire({
                        title: 'Éxito!',
                        text: result.data.agregarAplicacionPlaga.message,
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        customClass: {
                            popup: 'borde-popup',
                            content: 'contenido-popup',
                            title: 'title-popup'
                        }
                    }).then(() => window.location.reload())
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
            })
            actualizarActivo(true)
        }
    }

    const seleccionarTablon = (dato) => {
        setTablones(dato)
    }

    return (
        <Fragment>
            <Select
                options={datosTablon}
                isMulti={true}
                closeMenuOnSelect={false}
                onChange={ opcion => seleccionarTablon(opcion)}
                placeholder="Seleccione los tablones"
                getOptionValue={ opciones => opciones.tablon_id}
                getOptionLabel={opciones => `Tablón `+opciones.numero}
            />
            <div className='center pb-2 pt-0' style={{width: '100%'}}>
                <button
                    type='button'
                    className='mt-4 btnRegistroTablon'
                    onClick={(e) => submitNuevaAplicaionPlaga(e)}
                    disabled={!activo}
                >
                    Registrar
                </button>
            </div>
        </Fragment>
        // <Button
        //     type='button' 
        //     key={id_tablon} 
        //     className="d-inline-block me-2 mb-2" 
        //     style={{backgroundColor: "#b71c1c", color: 'white', border: '1px solid #b71c1c'}}
        //     onClick={e => submitNuevaAplicaionPlaga(e)}
        //     disabled={!activo}
        // >
        //     Tablón {numero}
        // </Button>
    )
}
 
export default ModalDatoPL;
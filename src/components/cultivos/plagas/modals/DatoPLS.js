import React, { useState } from 'react';
import moment from 'moment'
import { toast } from 'react-toastify'
// GraphQL
import {NUEVO_TRAPL_MUTATION, NUEVA_APLA_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRAPL_QUERY, OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoPLS = ({listadoTablones, tratamientopl, aplicacionpl, id_corte, fecha_inicio, fecha_corte}) => {

    const {id_tablon, numero, area} = listadoTablones
    const {cantidad, id_trapl, producto, tiempo, unidad} = tratamientopl
    const {fecha} = aplicacionpl
    // mutation hook
    const [ agregarAplicacionPlaga ] = useMutation(NUEVA_APLA_MUTATION)
    const [ agregarTratamientoPlaga ] = useMutation(NUEVO_TRAPL_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // extraer valores tratamiento plaga
    const input = {
        producto,
        unidad,
        cantidad: Number(cantidad),
        tiempo
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const fapla = moment(fecha)

    // submit
    const submitNuevoTrataApliPlaga = async (e) => {
        e.preventDefault()

        // validar
        if(fapla < ficorte) {
            toast.error("La fecha de la labor no puede ser inferior a la fecha de inicio del corte.", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

        if(ffcorte !== null && fapla > ffcorte) {
            toast.error("La fecha de la labor no puede ser mayor a la fecha de fin del corte.", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }    

        actualizarActivo(false)

        // guardar en la db
        try {
            await agregarTratamientoPlaga({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_TRAPL_QUERY
                }]
            })
            await agregarAplicacionPlaga({
                variables: {
                    input: {
                        fecha,
                        corte_id: Number(id_corte),
                        tablon_id: Number(id_tablon),
                        trapl_id: Number(id_trapl)
                    }
                },
                refetchQueries: [{
                    query: OBTENER_APLA_QUERY, variables: {id_corte, id_tablon, id_trapl}
                }]
            })

            // Mensaje
            toast.success("El tratamiento y la la aplicación se registraron correctamente!", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
        } catch (error) {
            toast.error((error.message.replace('GraphQL error: ', '')), {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            actualizarActivo(true)
        }
    }

    return (
        <button
            type="button"
            key={id_tablon}
            disabled={!activo}
            onClick={e => submitNuevoTrataApliPlaga(e)}
            className={activo === true ? 'hdato' : 'hdatoff'}
        >
            Tablón {numero} - Área {area}
        </button>
    );
}
 
export default DatoPLS;
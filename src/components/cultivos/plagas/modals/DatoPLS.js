import React, { useState } from 'react';
import moment from 'moment'
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

    const M = window.M

    // submit
    const submitNuevoTrataApliPlaga = async (e) => {
        e.preventDefault()

        // validar
        if(fapla < ficorte) {
            M.toast({
                html: 'La fecha de la labor no puede ser inferior a la fecha de inicio del corte.',
                displayLength: 2000,
                classes: 'yellow accent-4 black-text fw-bold'
            })
            return
        }

        if(ffcorte !== null && fapla > ffcorte) {
            M.toast({
                html: 'La fecha de la labor no puede ser mayor a la fecha de fin del corte.',
                displayLength: 2000,
                classes: 'yellow accent-4 black-text fw-bold'
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

            M.toast({
                html: 'El tratamiento y la la aplicación se registraron correctamente!',
                displayLength: 2000,
                classes: 'green accent-4 white-text fw-bold'
            })
        } catch (error) {
            M.toast({
                html: (error.message.replace('GraphQL error: ', '')),
                displayLength: 2000,
                classes: 'red darken-4 white-text fw-bold'
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
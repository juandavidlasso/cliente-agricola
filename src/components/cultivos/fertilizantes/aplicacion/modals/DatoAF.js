import React, { useState } from 'react';
import moment from 'moment'
// Graphql
import {NUEVA_APFE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APFE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoAF = ({cortes, afertilizantes, setTF, setUserIdApfe}) => {

    const {id_apfe, fecha, tipo} = afertilizantes
    const {id_corte, numero, fecha_inicio, fecha_corte} = cortes

    // mutation hook
    const [ agregarAplicacionFertilizante ] = useMutation(NUEVA_APFE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaAF ] = useState({
        id_apfe: id_apfe,
        fecha: fecha,
        tipo: tipo,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaAF.fecha,
        tipo: nuevaAF.tipo,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const fapfe = moment(nuevaAF.fecha)
    
    const M = window.M

    // submit
    const submitNuevaAF = async (e) => {
        e.preventDefault()

        // validar
        if(fapfe < ficorte) {
            M.toast({
                html: 'La fecha de aplicación no puede ser inferior a la fecha de inicio del corte.',
                displayLength: 2000,
                classes: 'yellow accent-4 black-text fw-bold'
            })
            return
        }

        if(ffcorte !== null && fapfe > ffcorte) {
            M.toast({
                html: 'La fecha de aplicación no puede ser mayor a la fecha de fin del corte.',
                displayLength: 2000,
                classes: 'yellow accent-4 black-text fw-bold'
            })
            return
        }
        
        actualizarActivo(false)

        // guardar en la db
        try {
            const { data } = await agregarAplicacionFertilizante({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APFE_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
            M.toast({
                html: 'La aplicación se registró correctamente! Ahora seleccione los tratamientos que desea registrar.',
                displayLength: 3000,
                classes: 'green accent-4 white-text fw-bold'
            })
            setTF(false)
            setUserIdApfe(data.agregarAplicacionFertilizante.id_apfe)
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
            key={id_corte}
            disabled={!activo}
            onClick={e => submitNuevaAF(e)}
            className={activo === true ? 'hdato' : 'hdatoff'}
        >
            Corte {numero}
        </button>
    );
}
 
export default DatoAF;
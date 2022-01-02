import React, { useState } from 'react';
import moment from 'moment'
// Graphql
import {NUEVA_APHE_MUTATION} from '../../../../../apollo/mutations'
import {OBTENER_APHE_POR_CORTE_QUERY} from '../../../../../apollo/querys'
import { useMutation } from '@apollo/client'

const DatoH = ({cortes, aherbicidas, setTH, setUserIdAphe}) => {

    const {id_aphe, fecha, tipo} = aherbicidas
    const {id_corte, numero, fecha_inicio, fecha_corte} = cortes

    // mutation hook
    const [ agregarAplicacionHerbicida ] = useMutation(NUEVA_APHE_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaAHerbicida ] = useState({
        id_aphe: id_aphe,
        fecha: fecha,
        tipo: tipo,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaAHerbicida.fecha,
        tipo: nuevaAHerbicida.tipo,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const faphe = moment(nuevaAHerbicida.fecha)
    
    const M = window.M

    // submit
    const submitNuevaAHerbicida = async (e) => {
        e.preventDefault()

        // validar
        if(faphe < ficorte) {
            M.toast({
                html: 'La fecha de aplicación no puede ser inferior a la fecha de inicio del corte.',
                displayLength: 2000,
                classes: 'yellow accent-4 black-text fw-bold'
            })
            return
        }

        if(ffcorte !== null && faphe > ffcorte) {
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
            const {data} = await agregarAplicacionHerbicida({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APHE_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
            M.toast({
                html: 'La aplicación se registró correctamente! Ahora seleccione los tratamientos que desea registrar.',
                displayLength: 3000,
                classes: 'green accent-4 white-text fw-bold'
            })
            setTH(false)
            setUserIdAphe(data.agregarAplicacionHerbicida.id_aphe)
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
            onClick={e => submitNuevaAHerbicida(e)}
            className={activo === true ? 'hdato' : 'hdatoff'}
        >
            Corte {numero}
        </button>
    );
}
 
export default DatoH;
import React, { useState } from 'react';
import moment from 'moment'
import { toast } from 'react-toastify'
// Context
//import DatosContext from '../../../../utils/context/datos/datosContext'
// Graphql
import {NUEVA_LABOR_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_LABORES_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'


const Dato = ({cortes, labor}) => {

    const {id_labor, fecha, actividad, equipo, estado, pases, aplico, costo, nota} = labor
    const {id_corte, numero, fecha_inicio, fecha_corte} = cortes

    // mutation hook
    const [ agregarLabor ] = useMutation(NUEVA_LABOR_MUTATION)
    const [ activo, actualizarActivo ] = useState(true)

    // state del componente
    const [ nuevaLabor ] = useState({
        id_labor: id_labor,
        fecha: fecha,
        actividad: actividad,
        equipo: equipo,
        estado: estado,
        pases: pases,
        aplico: aplico,
        costo: costo,
        nota: nota,
        corte_id: id_corte
    })

    const input = {
        fecha: nuevaLabor.fecha,
        actividad: nuevaLabor.actividad,
        equipo: nuevaLabor.equipo,
        estado: nuevaLabor.estado,
        pases: Number(nuevaLabor.pases),
        aplico: nuevaLabor.aplico,
        costo: Number(nuevaLabor.costo),
        nota: nuevaLabor.nota,
        corte_id: id_corte
    }

    // validar fecha
    const ficorte = moment(fecha_inicio)
    const ffcorte = moment(fecha_corte)
    const felabor = moment(nuevaLabor.fecha)

    // submit
    const submitNuevaLabor = async (e) => {
        e.preventDefault()

        // validar
        if(felabor < ficorte) {
            toast.error("La fecha de la labor no puede ser inferior a la fecha de inicio del corte.", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            return
        }

        if(ffcorte !== null && felabor > ffcorte) {
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
            await agregarLabor({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_LABORES_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
            toast.success("La labor se registró correctamente!", {
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
            key={id_corte}
            disabled={!activo}
            onClick={e => submitNuevaLabor(e)}
            className={activo === true ? 'hdato' : 'hdatoff'}
        >
            Corte {numero}
        </button>
    );
}
 
export default Dato;
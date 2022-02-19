import React, { useState } from 'react';
import moment from 'moment'
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
    //const [labores, setLabores] = useState([])
    // Context
    //const datosContext = useContext(DatosContext)
    //const { agregarLabores } = datosContext

    // useEffect(() => {
    //     agregarLabores(labores)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [labores])

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

    // const seleccionarLabores = id_corte => {
    //     //setLabores(input)
    // }

    const M = window.M

    // submit
    const submitNuevaLabor = async (e) => {
        e.preventDefault()

        // validar
        if(felabor < ficorte) {
            M.toast({
                html: 'La fecha de la labor no puede ser inferior a la fecha de inicio del corte.',
                displayLength: 2000,
                classes: 'yellow accent-4 black-text fw-bold'
            })
            return
        }

        if(ffcorte !== null && felabor > ffcorte) {
            M.toast({
                html: 'La fecha de la labor no puede ser mayor a la fecha de fin del corte.',
                displayLength: 2000,
                classes: 'yellow accent-4 black-text fw-bold'
            })
            return
        }

        actualizarActivo(false)

        // setLabores(input)

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
            M.toast({
                html: 'La labor se registró correctamente!',
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
            key={id_corte}
            disabled={!activo}
            onClick={e => submitNuevaLabor(e)}
            className={activo === true ? 'hdato' : 'hdatoff'}
        >
            Corte {numero}
            {/* <label>
                                <input type="checkbox" className="filled-in" onChange={(e) => submitNuevaLabor(id_corte, e)} />
                                <span style={{fontSize: '10px'}}>Agregar</span>
                            </label> */}
        </button>
    );
}
 
export default Dato;
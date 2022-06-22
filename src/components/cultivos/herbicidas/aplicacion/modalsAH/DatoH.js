import React, { useState } from 'react';
import moment from 'moment'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import DatoFechaH from './DatoFechaH'
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
    const [fechaValida, setFechaValida] = useState(false)

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

    // submit
    const submitNuevaAHerbicida = async (e) => {
        e.preventDefault()

        // validar
        if(faphe < ficorte) {
            Swal.fire({
                title: 'Atención',
                text: "La fecha de aplicación no puede ser inferior a la fecha de inicio del corte.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Registrar nueva fecha',
                confirmButtonColor: '#1b5e20',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#b71c1c',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    setFechaValida(true)
                }
            })
            return
        }

        if(ffcorte !== null && faphe > ffcorte) {
            Swal.fire({
                title: 'Atención',
                text: "La fecha de aplicación no puede ser mayor a la fecha de fin del corte.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Registrar nueva fecha',
                confirmButtonColor: '#1b5e20',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#b71c1c',
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    setFechaValida(true)
                }
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
            toast.success("La aplicación se registró correctamente! Ahora seleccione los tratamientos que desea registrar.", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            setTH(false)
            setUserIdAphe(data.agregarAplicacionHerbicida.id_aphe)
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
        <>
            <DatoFechaH
                fechaValida={fechaValida}
                setFechaValida={setFechaValida}
                cortes={cortes}
                aherbicidas={aherbicidas}
                setTH={setTH}
                setUserIdAphe={setUserIdAphe}
            />
            <button
                type="button"
                key={id_corte}
                disabled={!activo}
                onClick={e => submitNuevaAHerbicida(e)}
                className={activo === true ? 'hdato' : 'hdatoff'}
            >
                Corte {numero}
            </button>
        </>
    );
}
 
export default DatoH;
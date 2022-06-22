import React, { useState } from 'react';
import moment from 'moment'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import DatoFechaAF from './DatoFechaAF';
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
    const [fechaValida, setFechaValida] = useState(false)

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

    // submit
    const submitNuevaAF = async (e) => {
        e.preventDefault()

        // validar
        if(fapfe < ficorte) {
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

        if(ffcorte !== null && fapfe > ffcorte) {
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
            const { data } = await agregarAplicacionFertilizante({
                variables: {
                    input
                },
                refetchQueries: [{
                    query: OBTENER_APFE_POR_CORTE_QUERY, variables: {id_corte}
                }]
            })

            // Mensaje
            toast.success("La aplicación se registró correctamente! Ahora seleccione los tratamientos que desea registrar.", {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false
            })
            setTF(false)
            setUserIdApfe(data.agregarAplicacionFertilizante.id_apfe)
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
            <DatoFechaAF
                fechaValida={fechaValida}
                setFechaValida={setFechaValida}
                cortes={cortes}
                afertilizantes={afertilizantes}
                setTF={setTF}
                setUserIdApfe={setUserIdApfe}
            />
            <button
                type="button"
                key={id_corte}
                disabled={!activo}
                onClick={e => submitNuevaAF(e)}
                className={activo === true ? 'hdato' : 'hdatoff'}
            >
                Corte {numero}
            </button>
        </>
    );
}
 
export default DatoAF;
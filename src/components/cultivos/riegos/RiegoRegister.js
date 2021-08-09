import React, { useState, useContext } from 'react';
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Redux
import { useDispatch } from 'react-redux'
import { ocultarRegistroLluvia } from '../../../utils/redux/actions/lluviaActions'
// Graphql
import {AGREGAR_RIEGO_MUTATION} from '../../../apollo/mutations'
import {OBTENER_RIEGO_MAX_QUERY, OBTENER_RIEGOS_CORTE_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const RiegoRegister = ({id_corte, maximo}) => {

    // estado del componente
    const dispatch = useDispatch()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    const [ btnactivo, actualizarActivo ] = useState(true)
    // mutation hook
    const [ agregarRiego ] = useMutation(AGREGAR_RIEGO_MUTATION)
    // estado    
    const [riego, setRiego] = useState({
        id_riego: '',
        fecha: '',
        num_riego: '',
        corte_id: id_corte
    })

    // actualizar fecha siembra
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setRiego({
            ...riego,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }    

    // extraer valores
    const { fecha } = riego

    const cerrar = () => dispatch( ocultarRegistroLluvia() )

    // Submit
    const submitNuevoRiego = async (e) => {
        e.preventDefault()

        // validar
        if(fecha.trim() === '') {
            mostrarWarning('Debe ingresar la fecha.')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await agregarRiego({
                variables: {
                    input: {
                        fecha,
                        num_riego: Number(maximo+1),
                        corte_id: id_corte
                    }
                },
                refetchQueries: [
                    {query: OBTENER_RIEGO_MAX_QUERY, variables: {id_corte}},
                    {query: OBTENER_RIEGOS_CORTE_QUERY, variables: {id_corte}}
                ]
            })
            // console.log(data)

            // reiniciar el form
            setRiego({
                fecha: ''
            })

            dispatch( ocultarRegistroLluvia() )
            Swal.fire({
                title: 'Éxito!',
                text: 'El riego se registró correctamente!',
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
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
            actualizarActivo(true)  
        }
    }

    return ( 
        <form onSubmit={submitNuevoRiego}>
            <h4 className="center">Registrar Riego</h4>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }

            <div>
                <label htmlFor="fecha"><span className="red-text font-weight-bold">*</span> Fecha de siembra </label>
                <br />
                <DayPickerInput 
                    id="fecha" 
                    selectedDay={fecha} 
                    onDayChange={handleDayChange} 
                    placeholder="DD-MM-YYYY" 
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                />
            </div>
            <div className="input-field center">
                <input type="submit" className="btnlink" value="Registrar" disabled={!btnactivo} />
                <button type="button" className="btnlink" onClick={cerrar}>Cancelar</button>
            </div>
        </form>
    );
}
 
export default RiegoRegister;
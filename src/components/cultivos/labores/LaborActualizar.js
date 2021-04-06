import React, { useState, useContext } from 'react'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import {validarCostoLabor} from '../../../utils/js/validaciones'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Graphql
import {ACTUALIZAR_LABOR_MUTATION} from '../../../apollo/mutations'
import {OBTENER_LABORES_POR_CORTE_QUERY, OBTENER_LABOR_QUERY} from '../../../apollo/querys'
import { useMutation } from '@apollo/client'

const LaborActualizar = ({data, props}) => {

    const { id_labor, fecha, actividad, equipo, estado, pases, aplico, costo, nota } = data.obtenerLabor
    const id_suerte = Number(props.match.params.id_suerte)
    const id_corte = Number(props.match.params.id_corte)
    const ficorte = moment(props.location.state.fecha_inicio)

    // estado del component
    const history = useHistory()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarLabor ] = useMutation(ACTUALIZAR_LABOR_MUTATION)  
    const [ activo, actualizarActivo ] = useState(true) 
    
    // state del componente
    const [ nuevaLabor, actualizarNuevaLabor ] = useState({
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

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevaLabor({
            ...nuevaLabor,
            [e.target.name]: e.target.value
        })
    }  
    
    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        actualizarNuevaLabor({
            ...nuevaLabor,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }

    // extraer valores
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
    
    const filabor = moment(nuevaLabor.fecha)
    
    // submit
    const submitActualizarLabor = async (e) => {
        e.preventDefault()

        // Campos obligatorios
        if( nuevaLabor.fecha.trim() === '' ||
            nuevaLabor.actividad.trim() === '') {
            mostrarWarning('Los campos marcados con * son obligatorios.')
            return
        }

        if(isNaN(nuevaLabor.pases) && nuevaLabor.pases !== '') {
            mostrarWarning('El número de pases debe ser numérico. Ej: 1')
            return
        }

        if(nuevaLabor.pases <= 0 && nuevaLabor.pases !== '') {
            mostrarWarning('El número de pases debe ser mayor a 0.')
            return
        }

        if(validarCostoLabor(nuevaLabor.costo) === false && nuevaLabor.costo !== '') {
            mostrarWarning('El costo debe ser numérico. Ej: 12000')
            return
        }

        if(filabor < ficorte) {
            mostrarWarning('La fecha de labor no puede ser inferior a la fecha de corte.')
            return
        }

        actualizarActivo(false)

        // guardar en la db
        try {
            await actualizarLabor({
                variables: {
                    input,
                    id_labor
                },
                refetchQueries: [
                    {query: OBTENER_LABORES_POR_CORTE_QUERY, variables: {id_corte} },
                    {query: OBTENER_LABOR_QUERY, variables: {id_labor} }
                ]
            })
            // console.log(data)

            // reiniciar el form
            actualizarNuevaLabor({
                fecha: '',
                actividad: '',
                equipo: '',
                estado: '',
                pases: '',
                aplico: '',
                costo: '',
                nota: ''
            })

            Swal.fire({
                title: 'Éxito!',
                text: 'Los datos se actualizaron correctamente!',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            }).then(function () {
                history.push(`/corte/detalle/${id_corte}/${id_suerte}`)
            })
        } catch (error) {
            mostrarAlerta(error.message.replace('GraphQL error: ', ''))
            actualizarActivo(true)
        }
    }    

    return (
        <form onSubmit={submitActualizarLabor}>
            <h4 className="center"> Actualizar Labor </h4>
    
            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }            
    
            <div>
                <label htmlFor="fecha"><span className="red-text font-weight-bold">*</span> Fecha Aplicación </label>
                <br />
                <DayPickerInput 
                    id="fecha" 
                    selectedDay={fecha}
                    onDayChange={handleDayChange} 
                    placeholder="DD-MM-YYYY" 
                    format="DD-MM-YYYY"
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={moment(fecha).format('DD-MM-YYYY')}
                />
            </div>
            <div className="input-field">
                <label htmlFor="labor"><span className="red-text font-weight-bold">*</span> Labor </label>
                <input placeholder="Labor" type="text" className="validate" name="actividad" defaultValue={actividad} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="equipo"> Equipo </label>
                <input placeholder="Equipo" type="text" className="validate" name="equipo" defaultValue={equipo} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="numero_pases"> Número pases </label>
                <input placeholder="Número pases" type="text" name="pases" defaultValue={pases} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="realizado_por"> Realizado por </label>
                <input placeholder="Realizado por" type="text" className="validate" name="aplico" defaultValue={aplico} onChange={actualizarState} />
            </div>
            <div className="input-field left-add">
                <label htmlFor="costo"> Costo </label>
                <input placeholder="Costo" type="text" name="costo" defaultValue={costo} onChange={actualizarState} />
            </div>
            <div className="input-field">
                <label htmlFor="nota"> Nota </label>
                <input placeholder="Nota" type="text" className="validate" name="nota" defaultValue={nota} onChange={actualizarState} />
            </div>
            <div className="">
                <label htmlFor="estado"> Estado </label>
                &nbsp;&nbsp;
                <label>
                    <input className="with-gap" name="estado" type="radio" value="OK" onChange={actualizarState} />
                    <span>OK</span>
                </label>
                &nbsp;&nbsp;
                <label>
                    <input className="with-gap" name="estado" type="radio" value="NO" onChange={actualizarState} />
                    <span>No</span>
                </label>
            </div>
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} className="btnlink">Cancelar</Link>
            </div>
        </form>
    )
}

export default LaborActualizar
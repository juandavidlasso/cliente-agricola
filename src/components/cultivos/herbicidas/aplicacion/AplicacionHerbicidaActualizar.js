import React, { useState, useContext } from 'react'
import AlertaContext from '../../../../utils/context/alertas/alertaContext'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'
// Graphql
import {ACTUALIZAR_APHE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_APHE_POR_CORTE_QUERY, OBTENER_APHE_QUERY} from '../../../../apollo/querys'
import { useMutation } from '@apollo/client'


const AplicacionHerbicidaActualizar = ({data, id_corte, id_suerte, ficorte}) => {

    const { id_aphe, tipo, fecha } = data.obtenerAplicacionHerbicida

    // estado del component
    const navigate = useNavigate()
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta} = alertaContext
    const { warning, mostrarWarning} = alertaContext
    // mutation hook
    const [ actualizarAPHE ] = useMutation(ACTUALIZAR_APHE_MUTATION)  
    const [ activo, actualizarActivo ] = useState(true) 


    // state del componente
    const [ nuevaAplicacionHerbicida, actualizarNuevaAplicacionHerbicida ] = useState({
        id_aphe: id_aphe,
        fecha: fecha,
        tipo: tipo,
        corte_id: id_corte
    })

    // Funcion que ejecuta cada que el usuario escribe
    const actualizarState = e => {
        actualizarNuevaAplicacionHerbicida({
          ...nuevaAplicacionHerbicida,
          [e.target.name]: e.target.value
        })
    }

    // actualizar fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
      actualizarNuevaAplicacionHerbicida({
        ...nuevaAplicacionHerbicida,
        fecha: moment(selectedDay).format('YYYY-MM-DD')
      })
    }    

    // extraer valores
    const input = {
        fecha: nuevaAplicacionHerbicida.fecha,
        tipo: nuevaAplicacionHerbicida.tipo,
        corte_id: id_corte
    }  
    
    const fiaphe = moment(nuevaAplicacionHerbicida.fecha)
    
    // submit
    const submitActualizarAplicacionHerbicida = async (e) => {
      e.preventDefault()
  
      // Campos obligatorios
      if(nuevaAplicacionHerbicida.fecha.trim() === '' || nuevaAplicacionHerbicida.tipo.trim() === '') {
        mostrarWarning('Debe seleccionar la fecha y tipo de aplicación.')
        return
      }

      if(fiaphe < ficorte) {
        mostrarWarning('La fecha de la aplicación no puede ser inferior a la fecha de corte.')
        return
      }

      actualizarActivo(false)
  
      // guardar en la db
      try {
        await actualizarAPHE({
          variables: {
            input,
            id_aphe
          },
          refetchQueries: [
            {query: OBTENER_APHE_POR_CORTE_QUERY, variables: {id_corte} },
            {query: OBTENER_APHE_QUERY, variables: {id_aphe} }
          ]
        })
  
        // reiniciar el form
        actualizarNuevaAplicacionHerbicida({
          fecha: '',
          tipo: '',
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
            navigate(`/corte/detalle/${id_corte}/${id_suerte}`, { state: {id_corte:id_corte, id_suerte:id_suerte}})
        })
      } catch (error) {
        mostrarAlerta(error.message.replace('GraphQL error: ', ''))
        actualizarActivo(true)
      }
    }

    
    return (
        <form onSubmit={submitActualizarAplicacionHerbicida}>
            <h4 className="center"> Actualizar Aplicación Herbicida </h4>
            
            { alerta ? <p className="error"> {alerta.msg} </p> : null }
            { warning ? <p className="warning"> {warning.msg} </p> : null }
                
            <div className="input-field" style={{marginBottom: "2rem"}}>
                <select style={{display: "block",border: "2px solid #e1e1e1"}} name="tipo" defaultValue={tipo} onChange={actualizarState}>
                    <option value="">-- Seleccione Tipo Aplicación --</option>
                    <option value="PRE-EMERGENTE">PRE-EMERGENTE</option>
                    <option value="POST-EMERGENTE">POST-EMERGENTE</option>
                </select>
            </div>
            <div>
                <label htmlFor="fecha"><span className="red-text fw-bold">*</span> Fecha Aplicación </label>
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
            <div className="center">
                <input type="submit" className="btnlink" value="Actualizar" disabled={!activo} />
                <Link to={`/corte/detalle/${id_corte}/${id_suerte}`} state={{ id_corte:id_corte, id_suerte:id_suerte }} className="btnlink">Cancelar</Link>
            </div>
         </form> 
    )
}

export default AplicacionHerbicidaActualizar
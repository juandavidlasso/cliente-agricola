import React, { useState, useContext, Fragment, useEffect } from 'react'
import AlertaContext from '../../utils/context/alertas/alertaContext'
import ProntuarioResultado from './ProntuarioResultado'
import SelectSuerte from '../cultivos/lluvias/SelectSuerte'
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'

const ProntuarioBuscar = () => {

    // Estado del componente
    const alertaContext = useContext(AlertaContext)
    const { warning, mostrarWarning, suertes } = alertaContext
    const [datoSuerte, setDatosSuertes] = useState('')

    useEffect(() => {
        var M = window.M
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {
            position: 'bottom',
        });
    }, [])

    const [ busqueda, actualizarBusqueda ] = useState({
        inicial: '',
        final: ''
    })

    const [ valido , setValido ] = useState(false)

    // actualizar fecha inicial
    const handleDayChangeI = (selectedDay, modifiers, dayPickerInput) => {
        actualizarBusqueda({
            ...busqueda,
            inicial: moment(selectedDay).format('YYYY-MM-DD')
        })
    }   
    
    // actualizar fecha final
    const handleDayChangeF = (selectedDay, modifiers, dayPickerInput) => {
        actualizarBusqueda({
            ...busqueda,
            final: moment(selectedDay).format('YYYY-MM-DD')
        })
    }    

    const { inicial, final } = busqueda

    const nuevaConsulta = async () => {
        
        if(inicial.trim() === '' || final.trim() === '') {
            mostrarWarning('Debe ingresar las fechas.')
            return
        }

        // obtener suertes para guardar en pluviometro
        const suertesAsociadas = await suertes.map(( {__typename, id_suerte, ...suerte} ) => suerte)
        let suerteFinal = ""
        let suertesLista = ""
        // let nombre = ""
        for (let i = 0; i < suertesAsociadas.length; i++) {
            suertesLista = suertesLista+suertesAsociadas[i]['nombre'] + ","
            suerteFinal = suertesLista.substring(0, suertesLista.length - 1)
            // nombre = "'"+suerteFinal+"'"
        }

        setDatosSuertes(suerteFinal)
        setValido(true)
    }

    return (
        <Fragment>
        <div className="row">
            <div className="col s12 m12 l12 xl12 p-0">
                <h4 className="center mb-2">Ingrese los datos de búsqueda</h4>
                
                { warning ? <p className="warning"> {warning.msg} </p> : null }

                <div className="col s4">
                    <label htmlFor="inicial"><span className="red-text fw-bold">*</span> Fecha inicial</label>
                    <br />
                    <DayPickerInput 
                        id="inicial" 
                        selectedDay={inicial} 
                        onDayChange={handleDayChangeI}
                        placeholder="DD-MM-YYYY" 
                        format="DD-MM-YYYY"
                        formatDate={formatDate}
                        parseDate={parseDate}
                    />
                </div>
                <div className="col s4">
                    <label htmlFor="final"><span className="red-text fw-bold">*</span> Fecha final</label>
                    <br />
                    <DayPickerInput 
                        id="final" 
                        selectedDay={final} 
                        onDayChange={handleDayChangeF}
                        placeholder="DD-MM-YYYY" 
                        format="DD-MM-YYYY"
                        formatDate={formatDate}
                        parseDate={parseDate}
                    />
                </div>
                <div className="input-field col s4">
                    <SelectSuerte />
                </div>
                <div className="col s12 center">
                    <button
                        type='button'
                        className="tooltipped btnlink"
                        data-tooltip="Para visualizar todas las suertes elimínelas del listado"
                        onClick={() => nuevaConsulta()}
                    >
                        Consultar
                    </button>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col s12 m12 l12 xl12 p-0">
                {valido ? <ProntuarioResultado setValido={setValido} busqueda={busqueda} datoSuerte={datoSuerte} />  : null }
            </div>
        </div>
        </Fragment>
    )
}

export default ProntuarioBuscar
import React, { useState } from 'react';
// Componente fecha
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import moment from 'moment'

const FormMantenimientoRegistro = ({input, setForm, form}) => {

    // State
    const [mantenimiento, setMantenimiento] = useState({
        fecha: '',
        detalle: '',
        horaCambio: '',
        cantidad: '',
        insumoId: '',
        maquinariaId: ''
    })

    // Remove form
    const removeForm = () => setForm(form.filter(item => item !== input))

    // OnChnage
    const actualizarState = (e) => {
        setMantenimiento({
            ...mantenimiento,
            [e.target.name]: e.target.value
        })
    }

    // OnChnage fecha
    const handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
        setMantenimiento({
            ...mantenimiento,
            fecha: moment(selectedDay).format('YYYY-MM-DD')
        })
    }

    const {fecha, detalle, horaCambio, cantidad} = mantenimiento

    return (
        <div className='col s12 Content_show_form_registro p-2 mb-3' key={input}>
            <div className='col s2 '>
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
            <div className='col s2 '>Insumo</div>
            <div className='col s4 '>Tipo cambio</div>
            <div className='col s2'>
                <input type='text' name='detalle' value={detalle} onChange={actualizarState} />
            </div>
            <div className='col s2'>
                <button type='button' className='Content_titulo_btn' onClick={removeForm}><i className="fas fa-minus-circle me-3"></i>Eliminar</button>
            </div>
        </div>
    );
}
 
export default FormMantenimientoRegistro;
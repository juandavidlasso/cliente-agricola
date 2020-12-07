import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom';
// Email
import emailjs from 'emailjs-com'


const Confirmacion = ({data}) => {

    const { email } = data.obtenerEmail

    // estados del componente
    const history = useHistory()
    const [ activo, actualizarActivo ] = useState(true)
    const [ menu, actualizarMenu ] = useState(true)

    // alerta para enviar codigo al email
    const mostrarMenu = () => (
        <div className="dialog p-3">
            <p className="txt-dialog">
                Se le ha enviado un código a su correo electrónico, por favor, 
                ingréselo a continuación para poder reestablecer su contraseña.
            </p>
            <button type="button" className="btnlink" onClick={() => enviarEmail()} disabled={!activo}>Aceptar</button>
        </div>    
    )

    // enviar codigo al email
    const enviarEmail = async() => {
        // generar codigo
        var min = 1
        var max = 1000000
        var codigo = (min + (Math.random() * (max-min))).toFixed(0)

        // parametros del correo
        var templateParams = {
            email,
            codigo
        }

        console.log(codigo);

        // enviar correo
        await emailjs.send('gmail', 'confirmacion_cuenta', templateParams, 'user_TGZTjLWHDk1FqKJ6TvpPD')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        })

        actualizarMenu(false)
        actualizarActivo(false)
        history.push('/user/actualizar-password', {codigo:codigo, data:data})
    }
    
    return ( 
        <Fragment>
            {menu ? mostrarMenu() : null }
        </Fragment>
     );
}
 
export default Confirmacion;
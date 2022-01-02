import React, { useContext, useState } from 'react';
import Lluvias from './Lluvias';
import Swal from 'sweetalert2'
import SelectMesInicial from '../../../utils/componentes/SelectMesInicial'
import SelectMesFinal from '../../../utils/componentes/SelectMesFinal'
import SelectAno from '../../../utils/componentes/SelectAno'
import DatosContext from '../../../utils/context/datos/datosContext'

const BusquedaLluvia = ({pluviometroId, listaYear}) => {

    const datosContext = useContext(DatosContext)
    const {mesInicial, mesFinal, anoLluvia} = datosContext
    // Estado
    const [verConsulta, setVerConsulta] = useState(false)
    const [mesI, setMesI] = useState(0)
    const [mesF, setMesF] = useState(0)
    const [mesA, setMesA] = useState(0)

    const consultarLluvias = async() => {
        const {idInicial} = mesInicial
        const {idFinal} = mesFinal
        const {idAno, year} = anoLluvia

        if(idInicial===undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar la fecha inicial',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            return
        }

        if(idFinal===undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar la fecha final',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            return
        }

        if(idAno===undefined) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar el año',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#0d47a1',
                allowOutsideClick: false,
                customClass: {
                    popup: 'borde-popup',
                    content: 'contenido-popup',
                    title: 'title-popup'
                }
            })
            return
        }
        setMesI(idInicial)
        setMesF(idFinal)
        setMesA(year)
        setVerConsulta(true)
    }

    return ( 
        <div className="blue-grey lighten-5 p-2">
            <div className="col-12 p-0 left">
                <p className="fw-bold" style={{fontSize: '.8rem', color: 'red'}}>Si desea consultar solo por año seleccione en mes --</p>
            </div>

            <div className="col-12 p-2 center">
                <p className="fw-bold" style={{fontSize: '1.4rem', color: 'black'}}>Seleccione el mes y año</p>
            </div>


            <div className="col-12">
                <div className="row">
                    <div className="col s12 m12 l4 xl4"><SelectMesInicial /></div>
                    <div className="col s12 m12 l4 xl4"><SelectMesFinal /></div>
                    <div className="col s12 m12 l4 xl4"><SelectAno listaYear={listaYear} /></div>
                </div>
            </div>

            <div className="col-12">
                <div className="row">
                    <div className="col s12 center">
                        <button type="button" className="btnlink2" onClick={consultarLluvias}>Consultar</button>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="row">
                    <div className="col-md-6 offset-md-3 center p-2">
                        {verConsulta === true ?
                            <Lluvias idInicial={mesI} idFinal={mesF} idAno={mesA} pluviometroId={pluviometroId} />
                        :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>    
    );
}
 
export default BusquedaLluvia;
import React, { useState, useContext, useEffect } from 'react';
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import useTitle from '../../../utils/context/hooks/useSEO'
import SelectSuerte from '../lluvias/SelectSuerte'

import ResultadoDatosActuales from './ResultadoDatosActuales';

const DatosActuales = () => {

    useTitle({ title: 'Datos Actuales' })

    useEffect(() => {
        var M = window.M
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {
            position: 'bottom',
        });
    }, [])

    // useEffect(() => {
    //     var M = window.M
    //     M.toast({html: 'I am a toast!'})
    // },[])

    // Estado del componente
    const alertaContext = useContext(AlertaContext)
    const { suertes} = alertaContext
    const [nombres, setNombres] = useState(false)
    const [datoSuertes, setDatosSuerte] = useState('')

    // Obtener nombres
    const submitNombres = async(e) => {
        e.preventDefault()

        // obtener suertes para guardar en pluviometro
        const suertesAsociadas = await suertes.map(( {__typename, id_suerte, ...suerte} ) => suerte)
        let suerteFinal = ""
        let suertesLista = ""
        for (let i = 0; i < suertesAsociadas.length; i++) {
            suertesLista = suertesLista+suertesAsociadas[i]['nombre'] + ","
            suerteFinal = suertesLista.substring(0, suertesLista.length - 1)
        }

        setDatosSuerte(suerteFinal)
        setNombres(true)
    }

    return ( 
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 p-0 right">
            <div className="col-12 mx-auto">
                <h1 className="text-center"> Datos Actuales </h1>
            </div>

            <div className="col-12 p-2" style={{border: '1px solid gray'}}>
                <div className="col-6 mx-auto p-1 center">
                    <h2 className="blue-text" style={{marginTop: '-5px'}}>Seleccione la(s) suerte(s)</h2>
                    <SelectSuerte />
                    <button
                        type="button"
                        className="btnlink2 mt-3"
                        onClick={e => submitNombres(e)}
                    >
                        <a href="#!" className="tooltipped" data-tooltip="Para visualizar todas las suertes elimínelas del listado">Consultar</a>
                        </button>
                </div>
            </div>

            {nombres === true ?
                <ResultadoDatosActuales datoSuertes={datoSuertes} />
            :
                null    
            }
        </div>
    );
}
 
export default DatosActuales;
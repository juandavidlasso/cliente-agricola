import React from 'react';
// import DatosContext from '../../../utils/context/datos/datosContext'

const Lluvia = ({lluvia}) => {

    const { id_lluvia, cantidad, fecha} = lluvia
    // Context
    // const datosContext = useContext(DatosContext)
    // const { agregarMesInicial, agregarMesFinal, agregarAnoLluvia } = datosContext

    // useEffect(() => {
    //     agregarMesInicial('')
    //     agregarMesFinal('')
    //     agregarAnoLluvia('')
    // }, [])

    return (
        <tr key={id_lluvia}>
            <td>{fecha}</td>
            <td>{cantidad}</td>
        </tr>
    );
}
 
export default Lluvia;
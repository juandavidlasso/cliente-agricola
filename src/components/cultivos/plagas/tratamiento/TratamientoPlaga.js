import React from 'react'
import AplicacionPlaga from '../aplicacion/AplicacionPlaga'
// GraphQL
import {OBTENER_APLA_QUERY, OBTENER_AREA_CORTE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const TratamientoPlaga = ({trapl, edadActual, corte, tablon, props, estado}) => {

  const { id_corte, fecha_inicio, fecha_corte } = corte
  const { id_tablon } = tablon
  const { id_trapl, producto, unidad, cantidad, tiempo } = trapl

  // query hook
  const { data, loading, error } = useQuery(OBTENER_APLA_QUERY, { variables: {id_corte, id_tablon, id_trapl} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  const { data:dataArea, loading:loadingArea, error:errorArea } = useQuery(OBTENER_AREA_CORTE_QUERY, { variables: {id_corte} })
  // console.log(dataArea);
  // console.log(loadingArea);
  // console.log(errorArea);

  if(loading) return null
  if(error) return null
  if(loadingArea) return null
  if(errorArea) return null
  const areaSuerte = dataArea.obtenerAreaCorte

  return (
    <tr key={id_trapl}>
      <td>{fecha_corte ? 0 : edadActual}</td>
      <td>{producto}</td>
      <td>{unidad}</td>
      <td>{cantidad}</td>
      <td>{tiempo}</td>
      <td>{(areaSuerte*cantidad).toFixed(2)}</td>
      {data.obtenerAplicacionPlagas === null ? 
        <td></td> 
      : 
        (
          <AplicacionPlaga 
            data={data}
            props={props}
            corte={id_corte}
            tablon={id_tablon}
            trapl={id_trapl}
            estado={estado}
            fecha_inicio={fecha_inicio}
          />
        )
      }
    </tr>
  )
}

export default TratamientoPlaga

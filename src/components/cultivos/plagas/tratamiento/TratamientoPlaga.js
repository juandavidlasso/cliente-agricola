import React from 'react'
import AplicacionPlaga from '../aplicacion/AplicacionPlaga'
// GraphQL
import {OBTENER_APLA_QUERY, OBTENER_AREA_CORTE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const TratamientoPlaga = ({trapl, edadActual, corte, tablon, props, estado}) => {

  const id_suerte = props
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
  const rol = sessionStorage.getItem('rol')
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
        <td>
          {rol === '1' ? estado === true ?
            <Link to={{
                pathname: `/plaga/register/${id_suerte}/${id_corte}/${id_tablon}`,
                state: {trapl:trapl, tablon:tablon, fecha_inicio:fecha_inicio}
              }}
            className="red-text"
            >Aplicar
            </Link>
          :
            null
          :
            null
          }
        </td> 
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

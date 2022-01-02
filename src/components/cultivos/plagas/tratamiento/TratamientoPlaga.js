import React from 'react'
import AplicacionPlaga from '../aplicacion/AplicacionPlaga'
// GraphQL
import {OBTENER_APLA_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'
import { Fragment } from 'react'

const TratamientoPlaga = ({trapl, edadActual, corte, tablon, props, estado, setShowEditN, setTrataPL, setApliPL}) => {

  const { id_corte, fecha_inicio, fecha_corte } = corte
  const { id_tablon, area } = tablon
  const { id_trapl, producto, unidad, cantidad, tiempo } = trapl

  // query hook
  const { data, loading, error } = useQuery(OBTENER_APLA_QUERY, { variables: {id_corte, id_tablon, id_trapl} })

  if(loading) return null
  if(error) return null

  return (
    <Fragment>
      {data.obtenerAplicacionPlagas === null ? 
        null
      : 
        <tr key={id_trapl}>
          <td>{fecha_corte ? 0 : edadActual}</td>
          <td>{producto}</td>
          <td>{unidad}</td>
          <td>{cantidad}</td>
          <td>{tiempo}</td>
          <td>{(area*cantidad).toFixed(2)}</td>
            <AplicacionPlaga
              data={data}
              props={props}
              corte={id_corte}
              tablon={id_tablon}
              trapl={trapl}
              estado={estado}
              fecha_inicio={fecha_inicio}
              setShowEditN={setShowEditN}
              setTrataPL={setTrataPL}
              setApliPL={setApliPL}
            />
        </tr>
      }
    </Fragment>
  )
}

export default TratamientoPlaga

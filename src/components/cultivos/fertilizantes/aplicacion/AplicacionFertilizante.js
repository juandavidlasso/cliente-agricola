import React, { useEffect, Fragment } from 'react'
import {Link} from 'react-router-dom'
import TratamientoFertilizante from '../tratamiento/TratamientoFertilizante'
import Spinner from '../../../Spinner'
import moment from 'moment'
// GraphQL
import {OBTENER_TRFE_POR_APFE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const AplicacionFertilizante = ({afertilizantes, props, corte, estado, fecha_inicio, setUserId4Actions, setShowEdit}) => {

  const {id_apfe, fecha, tipo} = afertilizantes
  const id_corte = corte
  const id_suerte = props
  //console.log(id_corte);
  //console.log(id_suerte);

  // query hook
  const { data, loading, error } = useQuery(OBTENER_TRFE_POR_APFE_QUERY, { variables: {id_apfe} })
  //console.log(data);
  //console.log(loading);
  //console.log(error);

  useEffect(() => {
    const M = window.M
    var elem = document.querySelector('.collapsible');
    M.Collapsible.init(elem, {
      accordion: false
    })
  }, [])

  if(loading) return <Spinner />
  if(error) return null
  const rol = sessionStorage.getItem('rol')

  // Enviar objeto al modal
  const editProduct = (id) => {
    setShowEdit(true)
    setUserId4Actions(afertilizantes)
  };

  return (
    <li>
      <div className="collapsible-header pl-0 pr-0 pt-3 pb-3">
        <i className="fas fa-hiking"></i>
        <span className="ahover p-0" style={{fontSize: '13px'}}>Fecha aplicación: {moment(fecha).format('DD-MM-YYYY')} - {tipo}</span>
        {rol === '1' ? estado === true ?
          <Fragment>
            <Link to={`/fertilizante/register/${id_apfe}/${id_corte}/${id_suerte}`} className="btn btn-sm btn-primary ml-3" style={{fontSize: '12px'}}>+ Agregar Tratamiento</Link>
            <Link to={{
              pathname: `/fertilizante-aplicacion/editar/${id_apfe}/${id_corte}/${id_suerte}`,
              state: {fecha_inicio:fecha_inicio}
            }} className="btn btn-sm btn-warning ml-2" style={{fontSize: '12px'}}>Editar</Link>
            <Link to="#" className="red-text ml-2" onClick={() => editProduct(id_apfe)} style={{fontSize: '12px'}}>Desea utilizar esta información en otra suerte?</Link>
          </Fragment>
        :
          null
        :
          null
        }
      </div>
      <div className="collapsible-body" style={{paddingLeft: '5px', paddingRight: '5px'}}>
      {data.obtenerTRFEPorAplicacion.length === 0 ? 'No hay tratamientos' : (
        <table className="table table-sm responsive-table centered table-bordered" style={{fontSize: '14px'}}>
          <thead className="text-white" style={{backgroundColor: "#283747"}}>
            <tr>
              <th> Producto </th>
              <th> Dosis x Hta </th>
              <th> Presentación </th>
              <th> Valor x Hta </th>
              <th> Aplicado por </th>
              <th> Nota </th>
              {rol === '1' ? estado === true ?
                <th> Edición </th>
              :
                null
              :
                null
              }
            </tr>
          </thead>
          <tbody>
            {data.obtenerTRFEPorAplicacion.map(tfertilizantes => (
              <TratamientoFertilizante 
                key={tfertilizantes.id_trafe} 
                tfertilizantes={tfertilizantes} 
                corte={corte} 
                props={props} 
                afertilizantes={id_apfe}
                estado={estado}
              />
            ))} 
          </tbody>
        </table>
      )}
      </div>
    </li>
  )
}

export default AplicacionFertilizante

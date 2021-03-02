import React, { useEffect, Fragment } from 'react'
import {Link} from 'react-router-dom'
import TratamientoHerbicida from '../tratamiento/TratamientoHerbicida'
import Spinner from '../../../Spinner'
import moment from 'moment'
// GraphQL
import {OBTENER_TRHE_POR_APHE_QUERY} from '../../../../apollo/querys'
import { useQuery } from '@apollo/client'

const AplicacionHerbicida = ({aherbicidas, props, corte, estado, fecha_inicio, setUserId4Actions, setShowEdit, setArregloTratamientos}) => {

  const {id_aphe, fecha, tipo} = aherbicidas
  const id_corte = corte
  const id_suerte = props
  // console.log(id_corte);
  // console.log(id_suerte);

  // query hook
  const { data, loading, error } = useQuery(OBTENER_TRHE_POR_APHE_QUERY, { variables: {id_aphe} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  useEffect(() => {
    const M = window.M
    var elem = document.querySelector('.collapsible.expandable');
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
    setUserId4Actions(aherbicidas)
    setArregloTratamientos(data)
  };

  return (
    <li>
      <div className="collapsible-header pl-0 pr-0 pt-3 pb-3">
        <i className="fas fa-hiking"></i> 
        <span className="ahover p-0" style={{fontSize: '13px'}}>Fecha aplicación: {moment(fecha).format('DD-MM-YYYY')} - {tipo} </span>
        {rol === '1' ? estado === true ?
          <Fragment>
            <Link to={`/herbicida/register/${id_aphe}/${id_corte}/${id_suerte}`} className="btn btn-sm btn-primary ml-2" style={{fontSize: '12px'}}>+ Agregar Tratamiento</Link>
            <Link to={{
              pathname: `/herbicida-aplicacion/editar/${id_aphe}/${id_corte}/${id_suerte}`,
              state: {fecha_inicio:fecha_inicio}  
            }} className="btn btn-sm btn-warning ml-2" style={{fontSize: '12px'}}>Editar</Link>
            <Link to="#" className="red-text ml-2" onClick={() => editProduct(id_aphe)} style={{fontSize: '12px'}}>Desea utilizar esta información en otra suerte?</Link>
          </Fragment>
        :
          null
        :
          null
        }      
      </div>
      <div className="collapsible-body" style={{paddingLeft: '5px', paddingRight: '5px'}}>
        {data.obtenerTherbicidaPorAplicacion.length === 0 ? 'No hay tratamientos' : (
          <table className="table table-sm responsive-table centered table-bordered" style={{fontSize: '14px'}}>
            <thead className="thead-dark">
              <tr>
                <th> Producto </th>
                <th> Dosis x Hta </th>
                <th> Presentación </th>
                <th> Valor x Hta </th>
                <th> Aplicado por </th>
                <th> Nota </th>
                {rol === '1' ? estado === true ?
                  <th> Edición</th>
                :
                  null
                :
                  null
                }  
              </tr>
            </thead>

            <tbody>
              {data.obtenerTherbicidaPorAplicacion.map(therbicidas => (
                <TratamientoHerbicida 
                  key={therbicidas.id_trahe} 
                  therbicidas={therbicidas} 
                  props={props} 
                  corte={corte} 
                  aherbicidas={id_aphe} 
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

export default AplicacionHerbicida

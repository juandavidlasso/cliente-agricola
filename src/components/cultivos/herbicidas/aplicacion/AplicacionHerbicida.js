import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import TratamientoHerbicida from '../tratamiento/TratamientoHerbicida'
import Spinner from '../../../Spinner'
import moment from 'moment'
import Swal from 'sweetalert2'
import ValorTotalH from './ValorTotalH'
// GraphQL
import {ELIMINAR_APHE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRHE_POR_APHE_QUERY, OBTENER_APHE_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useQuery, useMutation } from '@apollo/client'

const AplicacionHerbicida = ({aherbicidas, props, corte, estado, fecha_inicio, setUserId4Actions, setShowEdit, setArregloTratamientos}) => {

  const {id_aphe, fecha, tipo} = aherbicidas
  const id_corte = corte
  const id_suerte = props
  // console.log(id_corte);
  // console.log(id_suerte);
  const [ verTH, setVerTH ] = useState(false)

  // query hook
  const { data, loading, error } = useQuery(OBTENER_TRHE_POR_APHE_QUERY, { variables: {id_aphe} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);
  // mutation
  const [ eliminarAphe ] = useMutation(ELIMINAR_APHE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)

  if(loading) return <Spinner />
  if(error) return null
  const rol = sessionStorage.getItem('rol')

  // Enviar objeto al modal
  const editProduct = (id) => {
    setShowEdit(true)
    setUserId4Actions(aherbicidas)
    setArregloTratamientos(data)
  };

  const mostrarTH = () => {
    setVerTH(true)
  }

  const ocultarTH = () => {
    setVerTH(false)
  }

  // submit eliminar aplicacion herbicida
  const submitEliminarAphe = async() => {
    Swal.fire({
      title: 'Atención',
      text: "Esta acción no se puede deshacer. Desea eliminar la aplicación y todos sus tratamientos?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      confirmButtonColor: '#1b5e20',
      cancelButtonText: 'No, Cancelar',
      cancelButtonColor: '#b71c1c',
      allowOutsideClick: false,
      customClass: {
        popup: 'borde-popup-war',
        content: 'contenido-popup-war',
        title: 'title-popup-war'
      }
    }).then( async (result) => {
      if (result.value) {
        try {
          await eliminarAphe({
            variables: {
              id_aphe
            },
            refetchQueries: [{
              query: OBTENER_APHE_POR_CORTE_QUERY, variables: {id_corte}
            }]
          })
          
          actualizarActivo(false)

          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La aplicación se eliminó correctamente.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d47a1',
            allowOutsideClick: false,
            customClass: {
              popup: 'borde-popup',
              content: 'contenido-popup',
              title: 'title-popup'
            }
          })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: (error.message.replace('GraphQL error: ', '')),
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d47a1',
            allowOutsideClick: false,
            customClass: {
              popup: 'borde-popup',
              content: 'contenido-popup',
              title: 'title-popup'
            }
          }) 
        }
      } else {
        actualizarActivo(true)
      }
    })
  }  

  return (
    <div className="center">
      <div className="col s5 alignah" style={{borderLeft: '1px solid gray'}}>
        <i className="fas fa-hiking"></i>
        <span className="ahover ml-2" style={{fontSize: '13px', cursor: 'pointer'}} onClick={mostrarTH}>Fecha aplicación: {moment(fecha).format('DD-MM-YYYY')} - {tipo} </span>
      </div>
      {rol === '1' ? estado === true ?
        <Fragment>
          <div className="col s3 alignah">
            <Link to={`/herbicida/register/${id_aphe}/${id_corte}/${id_suerte}`} className="btnmenu" style={{fontSize: '12px'}}>+ Agregar Tratamiento</Link>
          </div>
          <div className="col s2 alignah">
            <Link to={{
                pathname: `/herbicida-aplicacion/editar/${id_aphe}/${id_corte}/${id_suerte}`,
                state: {fecha_inicio:fecha_inicio}  
              }} className="btnmenu1" style={{fontSize: '12px'}}>Editar
            </Link>
            <button className="btneliaphe ml-2" onClick={() => submitEliminarAphe()} disabled={!activo}>Eliminar</button>
          </div>
          <div className="col s2 alignah">
            <Link to="#" className="red-text ml-2" onClick={() => editProduct(id_aphe)} style={{fontSize: '12px'}}>Desea utilizar esta información en otra suerte?</Link>
          </div>
        </Fragment>
      :
        null
      :
        null
      }
      {verTH === true ?
        <Fragment>
        <div className="col s12 alignth p-0">
          <div className="p-3" style={{width: '100%'}}>
            {data.obtenerTherbicidaPorAplicacion.length === 0 ? 'No hay tratamientos' : (
              <table className="table table-sm responsive-table centered table-bordered white tablaHF" style={{fontSize: '14px'}}>
                <thead className="text-white" style={{backgroundColor: "#283747"}}>
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
            <ValorTotalH id_aphe={id_aphe} />
          </div>
        </div>
        <div className="col s12 alignth1" onClick={ocultarTH}>
          <i className="material-icons">expand_less</i>
        </div>
        </Fragment>
      :
        <div className="col s12 alignth1" onClick={mostrarTH}>
          <i className="material-icons" >expand_more</i>
        </div>
      }
    </div>
  )
}

export default AplicacionHerbicida

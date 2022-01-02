import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'
import TratamientoFertilizante from '../tratamiento/TratamientoFertilizante'
import Spinner from '../../../Spinner'
import moment from 'moment'
import Swal from 'sweetalert2'
import ValorTotalF from './ValorTotalF'
// GraphQL
import {ELIMINAR_APFE_MUTATION} from '../../../../apollo/mutations'
import {OBTENER_TRFE_POR_APFE_QUERY, OBTENER_APFE_POR_CORTE_QUERY} from '../../../../apollo/querys'
import { useQuery, useMutation } from '@apollo/client'

const AplicacionFertilizante = ({afertilizantes, props, corte, estado, fecha_inicio, setUserId4Actions, setShowEdit, setArregloTratamientosF}) => {

  const {id_apfe, fecha, tipo} = afertilizantes
  const id_corte = corte
  const id_suerte = props
  const [ verTF, setVerTF ] = useState(false)

  // query hook
  const { data, loading, error } = useQuery(OBTENER_TRFE_POR_APFE_QUERY, { variables: {id_apfe} })

  // mutation
  const [ eliminarApfe ] = useMutation(ELIMINAR_APFE_MUTATION)
  const [ activo, actualizarActivo ] = useState(true)  

  if(loading) return <Spinner />
  if(error) return null
  const rol = sessionStorage.getItem('rol')

  // Enviar objeto al modal
  const editProduct = (id) => {
    setShowEdit(true)
    setUserId4Actions(afertilizantes)
    setArregloTratamientosF(data)
  };

  const mostrarTF = () => {
    setVerTF(true)
  }

  const ocultarTF = () => {
    setVerTF(false)
  }

  // submit eliminar aplicacion fertilizante
  const submitEliminarApfe = async() => {
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
          await eliminarApfe({
            variables: {
              id_apfe
            },
            refetchQueries: [{
              query: OBTENER_APFE_POR_CORTE_QUERY, variables: {id_corte}
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
        <span className="ahover ms-2" style={{fontSize: '13px', cursor: 'pointer'}} onClick={mostrarTF}>Fecha aplicación: {moment(fecha).format('DD-MM-YYYY')} - {tipo}</span>
      </div>
      {rol === '1' ? estado === true ?
        <Fragment>
          <div className="col s3 alignah">
            <Link to={`/fertilizante/register/${id_apfe}/${id_corte}/${id_suerte}`} state={{ id_apfe:id_apfe, id_corte:id_corte, id_suerte:id_suerte }} className="btnmenu" style={{fontSize: '12px'}}>+ Agregar Tratamiento</Link>
          </div>
          <div className="col s2 alignah">
            <Link
              to={`/fertilizante-aplicacion/editar/${id_apfe}/${id_corte}/${id_suerte}`}
              state={{ id_apfe:id_apfe, id_corte:id_corte, id_suerte:id_suerte, fecha_inicio:fecha_inicio}}
              className="btnmenu1" style={{fontSize: '12px'}}
            >
              Editar
            </Link>
            <button type='button' className="btneliaphe ms-2" onClick={() => submitEliminarApfe()} disabled={!activo}>Eliminar</button>
          </div>
          <div className="col s2 alignah">
            <button type='button' className="red-text ms-2 btnLinkTrans" onClick={() => editProduct(id_apfe)} style={{fontSize: '12px'}}>Desea utilizar esta información en otra suerte?</button>
          </div>
        </Fragment>
      :
        null
      :
        null
      }
      {verTF === true ?
        <Fragment>
        <div className="col s12 alignth p-0">
          <div className="p-3" style={{width: '100%'}}>
            {data.obtenerTRFEPorAplicacion.length === 0 ? 'No hay tratamientos' : (
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
            <ValorTotalF id_apfe={id_apfe} />
          </div>
        </div>
        <div className="col s12 alignth1" onClick={ocultarTF}>
          <i className="material-icons">expand_less</i>
        </div>
        </Fragment>
      :
        <div className="col s12 alignth1" onClick={mostrarTF}>
          <i className="material-icons" >expand_more</i>
        </div>
      }
    </div>
  )
}

export default AplicacionFertilizante

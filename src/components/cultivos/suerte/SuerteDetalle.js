import React, { useContext, Fragment } from 'react'
import { NavLink, Link, useHistory } from 'react-router-dom'
import ListCortes from '../cortes/ListCortes'
import useTitle from '../../../utils/context/hooks/useSEO'
import Swal from 'sweetalert2'
import AlertaContext from '../../../utils/context/alertas/alertaContext'
import Spinner from '../../Spinner'
import CountTablones from './CountTablones'
import CorteActual from './CorteActual'
import AreaSuerte from './AreaSuerte'
// GraphQL
import {VER_SUERTE_QUERY, OBTENER_SUERTES_RENOVADAS_QUERY, OBTENER_TOTAL_HTA_QUERY} from '../../../apollo/querys'
import {ELIMINAR_SUERTE_MUTATION} from '../../../apollo/mutations'
import { useQuery, useMutation } from '@apollo/client'


const SuerteDetalle = (props) => {

  useTitle({ title: 'Suerte' })

  const {id} = props.match.params
  //console.log(id)
  const id_suerte = Number(id)
  //console.log(id_suerte)

  // query hook
  const { data, loading, error } = useQuery(VER_SUERTE_QUERY, { variables: {id_suerte} })
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  // estado del componente
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta} = alertaContext

  // mutation
  const history = useHistory()
  const [ borrarSuerte ] = useMutation(ELIMINAR_SUERTE_MUTATION)

  if(loading) return <Spinner />
  if(error) return null
  const { nombre, variedad, zona, renovada } = data.obtenerSuerte
  const rol = sessionStorage.getItem('rol')

  const eliminarSuerte = () => {

  // guardar en la db
  try {
    Swal.fire({
      title: 'Alerta',
      text: "Desea eliminar la suerte? Esta acción eliminará la suerte y todos los datos relacionados y no se podrá deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'No, Cancelar',
      confirmButtonColor: '#b71c1c',
      cancelButtonText: 'Si, Eliminar',
      cancelButtonColor: '#1b5e20',
      allowOutsideClick: false,
      customClass: {
        popup: 'borde-popup-war',
        content: 'contenido-popup-war',
        title: 'title-popup-war'
      }
    }).then( async (result) => {
      if (result.value) {
        history.push('/suerte/list')
      } else {
        let timerInterval
        Swal.fire({
          title: 'Eliminando...',
          timer: 2000,
          timerProgressBar: true,
          allowOutsideClick: false,
          showConfirmButton: false,
          customClass: {
            popup: 'borde-popup',
            content: 'contenido-popup',
            title: 'title-popup'
          },
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              const content = Swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = Swal.getTimerLeft()
                }
              }
            }, 2000)
          },
          onClose: async () => {
            clearInterval(timerInterval)
            await borrarSuerte({
              variables: {
                id_suerte
              },
              refetchQueries: [
                {query: OBTENER_SUERTES_RENOVADAS_QUERY},
                {query: OBTENER_TOTAL_HTA_QUERY}
              ]
            }).then(() => {
              window.location.reload()
            })
          }
        }).then(() => {
          history.push('/suerte/list')
        })
      }
    })
    } catch (error) {
      mostrarAlerta(error.message.replace('GraphQL error: ', ''))
    }
  } 
  
  return (
    <div className="container-fluid grey lighten-4">
      <div className="row">
        <div className="col s12">

          <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
            
            <div className="row title">
              <div className="col s12 p-0">
                {rol === "1" ?
                  <Fragment>
                    <div className="col s12 m6 l6 xl6 p-0 pt-2 sdt1">
                      <NavLink to={'/suerte/list'} className="black-text left mr-2"> Suertes </NavLink>
                      /
                      <NavLink to={`/suerte/detalle/${id_suerte}`} className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Suerte <span className="text-uppercase">{nombre}</span></NavLink>
                    </div>
                    
                    <div className="col s12 m6 l6 xl6 p-0 pt-2 sdt2">
                      <Link to={`/suerte/editar/${id_suerte}`} className="red-text font-weight-bold mr-2">Editar Suerte</Link>
                      /
                      <Link to="#" className="red-text font-weight-bold ml-2" onClick={() => eliminarSuerte()}>Eliminar Suerte</Link>
                    </div>
                  </Fragment>
                :
                  <Fragment>
                    <div className="col s12 p-0 pt-2" style={{textAlign: 'left'}}>
                      <NavLink to={'/suerte/list'} className="black-text left mr-2"> Suertes </NavLink>
                      /
                      <NavLink to={`/suerte/detalle/${id_suerte}`} className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Suerte {nombre}</NavLink>
                    </div>
                  </Fragment>
                }
              </div>
            </div>

            { alerta ? <p className="error"> {alerta.msg} </p> : null }


            <div className="row">
              <div className="col s12 p-0">
                <div className="card-panel white p-2">
                  <h1 className="center title"> Suerte <span className="text-uppercase">{nombre}</span> </h1>
                  <div className="row title">
                    <div className="col s12 m6">
                      <div className="card">
                        <div className="card-content blue-grey lighten-4 center p-0 m-1">
                          <p className="card-title font-weight-bold h4 m-4"> Área </p>
                          <AreaSuerte id_suerte={id_suerte} />
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6">
                      <div className="card">
                        <div className="card-content blue-grey lighten-4 center p-0 m-1">
                          <span className="card-title font-weight-bold h4 m-4"> Variedad </span>
                          <p className="h5 m-2 text-uppercase"> {variedad} </p>
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6">
                      <div className="card">
                        <div className="card-content blue-grey lighten-4 center p-0 m-1">
                          <p className="card-title font-weight-bold h4 m-2"> No. Tablones </p>
                          <CountTablones props={props} />
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m6">
                      <div className="card">
                        <div className="card-content blue-grey lighten-4 center p-2 m-1">
                          <p className="card-title font-weight-bold m-1"> Zona Agro. </p>
                          <p className="h5 text-uppercase"> {zona} </p>
                        </div>
                      </div>
                    </div>
                    <CorteActual props={props} />
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col s12 p-0">
                <ListCortes suerte={data.obtenerSuerte} renovada={renovada}  />
              </div>
            </div>
      
          </div>
        </div>
      </div>
    </div>
  )
}


export default SuerteDetalle

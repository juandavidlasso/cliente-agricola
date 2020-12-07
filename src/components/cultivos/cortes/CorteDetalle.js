import React, { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'
import moment from 'moment'
import ListLabores from '../labores/ListLabores'
import ListFertilizantes from '../fertilizantes/ListFertilizantes'
import ListHerbicidas from '../herbicidas/ListHerbicidas'
import ListLluvias from '../lluvias/ListLluvias'
import ListPlagas from '../plagas/ListPlagas'
import ListCosechas from '../cosechas/ListCosechas'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
import TablonRegisterNuevo from '../tablones/TablonRegisterNuevo'
import ListTablones from '../tablones/ListTablones'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { mostrarLabores, ocultarLabores, ocultarRegistroLabor } from '../../../utils/redux/actions/laborActions'
import { mostrarHerbicidas, ocultarHerbicidas, ocultarRegistroAH } from '../../../utils/redux/actions/aplicacionHerbicidaActions'
import { mostrarFertilizantes, ocultarFertilizantes, ocultarRegistroAF } from '../../../utils/redux/actions/aplicacionFertilizanteActions'
import { mostrarPlagas, ocultarPlagas, ocultarRegistroPlaga } from '../../../utils/redux/actions/tratamientoPlagaActions'
import { mostrarLluvias, ocultarLluvias, ocultarRegistroLluvia } from '../../../utils/redux/actions/lluviaActions'
import { mostrarCosechas, ocultarCosechas, ocultarRegistroCosecha } from '../../../utils/redux/actions/cosechaActions'
import { mostrarFormRegistroTablon } from '../../../utils/redux/actions/tablonActions'
import { mostrarCortes } from '../../../utils/redux/actions/corteActions'
// GraphQL
import {VER_CORTE_QUERY,VER_SUERTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'


const CorteDetalle = (props) => {

  useTitle({ title: 'Corte' })
  
  const id_corte = Number(props.match.params.id_corte)
  //console.log(id_corte)
  const id_suerte = Number(props.match.params.id_suerte)
  //console.log(id_suerte)

  // query hook
  //const { data, loading, error } = useQuery(VER_SUERTE_QUERY)
  const { data:datacorte, loading:loadingcorte, error:errorcorte } = useQuery(VER_CORTE_QUERY, { variables: {id_corte} })
  const { data:datasuerte, loading:loadingsuerte, error:errorsuerte } = useQuery(VER_SUERTE_QUERY, { variables: {id_suerte} })

  //visualizar suerte
  const dispatch = useDispatch()
  const verLabores = useSelector( state => state.labores.verLabores)
  const verHerbicidas = useSelector( state => state.aplicacionHerbicidas.verHerbicidas)
  const verFertilizantes = useSelector( state => state.aplicacionFertilizantes.verFertilizantes)
  const verPlagas = useSelector( state => state.tratamientoPlagas.verPlagas)
  const verLluvias = useSelector( state => state.lluvias.verLluvias)
  const verCosechas = useSelector( state => state.cosechas.verCosechas)


  const onclicLabor = () => {
    dispatch( ocultarFertilizantes() )
    dispatch( ocultarHerbicidas() )
    dispatch( ocultarLluvias() )
    dispatch( ocultarPlagas() )
    dispatch( ocultarCosechas() )
    dispatch( ocultarRegistroLabor() )
    dispatch( ocultarRegistroAF() )
    dispatch( ocultarRegistroAH() )
    dispatch( ocultarRegistroLluvia() )
    dispatch( ocultarRegistroPlaga() )
    dispatch( ocultarRegistroCosecha() )
    dispatch( mostrarLabores() )
  }

  const onclicFertilizante = () => {
    dispatch( ocultarHerbicidas() )
    dispatch( ocultarLluvias() )
    dispatch( ocultarPlagas() )
    dispatch( ocultarCosechas() )
    dispatch( ocultarLabores() )
    dispatch( ocultarRegistroLabor() )
    dispatch( ocultarRegistroAF() )
    dispatch( ocultarRegistroAH() )
    dispatch( ocultarRegistroLluvia() )
    dispatch( ocultarRegistroPlaga() )
    dispatch( ocultarRegistroCosecha() )
    dispatch( mostrarFertilizantes() )
  }

  const onclicHerbicida = () => {
    dispatch( ocultarLluvias() )
    dispatch( ocultarPlagas() )
    dispatch( ocultarCosechas() )
    dispatch( ocultarLabores() )
    dispatch( ocultarFertilizantes() )
    dispatch( ocultarRegistroLabor() )
    dispatch( ocultarRegistroAF() )
    dispatch( ocultarRegistroAH() )
    dispatch( ocultarRegistroLluvia() )
    dispatch( ocultarRegistroPlaga() )
    dispatch( ocultarRegistroCosecha() )
    dispatch( mostrarHerbicidas() )
  }

  const onclicLluvia = () => {
    dispatch( ocultarPlagas() )
    dispatch( ocultarCosechas() )
    dispatch( ocultarLabores() )
    dispatch( ocultarFertilizantes() )
    dispatch( ocultarHerbicidas() )
    dispatch( ocultarRegistroLabor() )
    dispatch( ocultarRegistroAF() )
    dispatch( ocultarRegistroAH() )
    dispatch( ocultarRegistroLluvia() )
    dispatch( ocultarRegistroPlaga() )
    dispatch( ocultarRegistroCosecha() )
    dispatch( mostrarLluvias() )
  }

  const onclicPlaga = () => {
    dispatch( ocultarCosechas() )
    dispatch( ocultarLabores() )
    dispatch( ocultarFertilizantes() )
    dispatch( ocultarHerbicidas() )
    dispatch( ocultarLluvias() )
    dispatch( ocultarRegistroLabor() )
    dispatch( ocultarRegistroAF() )
    dispatch( ocultarRegistroAH() )
    dispatch( ocultarRegistroLluvia() )
    dispatch( ocultarRegistroPlaga() )
    dispatch( ocultarRegistroCosecha() )
    dispatch( mostrarPlagas() )
  }

  const onclicCosecha = () => {
    dispatch( ocultarLabores() )
    dispatch( ocultarFertilizantes() )
    dispatch( ocultarHerbicidas() )
    dispatch( ocultarLluvias() )
    dispatch( ocultarPlagas() )
    dispatch( ocultarRegistroLabor() )
    dispatch( ocultarRegistroAF() )
    dispatch( ocultarRegistroAH() )
    dispatch( ocultarRegistroLluvia() )
    dispatch( ocultarRegistroPlaga() )
    dispatch( ocultarRegistroCosecha() )
    dispatch( mostrarCosechas() )
  }

  const registroTablon = () => {
    dispatch( mostrarFormRegistroTablon() )
  }
  const mostrar = () => {
    dispatch( mostrarCortes() )
  }

  const verRegistroTablon = useSelector(state => state.tablones.verRegistroTablon)
  const verCortes = useSelector(state => state.cortes.verCortes)

  if(loadingcorte) return <Spinner />
  if(loadingsuerte) return <Spinner />
  if(errorcorte) return null
  if(errorsuerte) return null

  const { nombre } = datasuerte.obtenerSuerte

  const { numero, fecha_inicio, fecha_siembra, fecha_corte, estado, suerte_id } = datacorte.obtenerCorte
  const now = moment().format('YYYY-MM-DD')
  const factual = moment(now)
  const finicio = moment(fecha_inicio)
  const fcorte = moment(fecha_corte)
  const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1)
  const edadActual = factual.diff(finicio, 'months', true).toFixed(1)
  const rol = sessionStorage.getItem('rol')

  return (
    <div className="container-fluid grey lighten-4">
      <div className="row">
        <div className="col s12">
                                              {/* aqui va l10 off l2  xl10 off xl2 */}
          <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3"> 
            
            <div className="row title">
              <div className="col s12 p-0 pt-2">
                {rol === "1" ?
                  <Fragment>
                    <div className="col s12 m5 l5 xl5 pt-1 cdt1">
                      <NavLink to={'/suerte/list'} className="black-text left mr-2">Suertes</NavLink>
                      /
                      <NavLink to={`/suerte/detalle/${id_suerte}`} className="ml-2 mr-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Suerte <span className="text-uppercase">{nombre}</span></NavLink>
                      /
                      <NavLink to={`/corte/detalle/${id_corte}/${id_suerte}`} className="ml-2 mr-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Corte {numero}</NavLink>
                      { verLabores ?
                        <Fragment>
                          /
                          <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Labores</NavLink>
                        </Fragment>
                      : 
                        verHerbicidas ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Herbicidas</NavLink>
                          </Fragment>
                      : 
                        verFertilizantes ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Fertilizantes</NavLink>
                          </Fragment>                    
                      : 
                        verPlagas ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Control Plagas</NavLink>
                          </Fragment>
                      : 
                        verLluvias ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Lluvias</NavLink>
                          </Fragment>
                      : 
                        verCosechas ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Cosecha</NavLink>
                          </Fragment>
                      : 
                        null 
                      }
                    </div>
                    <div className="col s12 m5 l5 xl5 pt-1 cdt2">
                      {estado === true ? id_suerte === suerte_id ?
                        <Fragment>
                          <Link to={`/corte/editar/datos/${id_corte}/${id_suerte}/${nombre}`} className="red-text font-weight-bold mr-2"> Editar Corte </Link>
                          {fecha_corte ?
                              <Fragment>
                                /
                              </Fragment>
                          :
                            <Fragment>
                              /
                              <Link to="#" className="black-text font-weight-bold mr-2 ml-2" onClick={() => registroTablon()}>Registrar Tablon</Link>
                              /
                            </Fragment>
                          }
                          <a href="#!" onClick={ () => mostrar() } className="black-text font-weight-bold ml-2"> Ver Tablones </a>
                        </Fragment> 
                      :
                        null
                      :
                        null
                      }
                    </div>
                    <div className="col s12 m2 l2 xl2 pt-1 cdt3">
                      <h3 className="right"> Suerte {nombre} </h3>
                    </div>
                  </Fragment>
                :
                  <Fragment>
                    <div className="col s12 m6 l6 xl6 pt-1">
                      <NavLink to={'/suerte/list'} className="black-text left mr-2">Suertes</NavLink>
                      /
                      <NavLink to={`/suerte/detalle/${id_suerte}`} className="ml-2 mr-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Suerte {nombre}</NavLink>
                      /
                      <NavLink to={`/corte/detalle/${id_corte}/${id_suerte}`} className="ml-2 mr-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Corte {numero}</NavLink>
                      { verLabores ?
                        <Fragment>
                          /
                          <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Labores</NavLink>
                        </Fragment>
                      : 
                        verHerbicidas ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Herbicidas</NavLink>
                          </Fragment>
                      : 
                        verFertilizantes ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Fertilizantes</NavLink>
                          </Fragment>                    
                      : 
                        verPlagas ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Control Plagas</NavLink>
                          </Fragment>
                      : 
                        verLluvias ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Lluvias</NavLink>
                          </Fragment>
                      : 
                        verCosechas ?
                          <Fragment>
                            /
                            <NavLink to="#" className="ml-2 black-text" activeStyle={{textDecoration: "underline red", fontWeight: "bold"}}>Cosecha</NavLink>
                          </Fragment>
                      : 
                        null 
                      }
                    </div>
                    <div className="col s12 m3 l3 xl3 pt-1">
                      <a href="#!" onClick={ () => mostrar() } className="black-text font-weight-bold ml-2"> Ver Tablones </a>
                    </div>
                    <div className="col s12 m3 l3 xl3 pt-1">
                      <h3 className="right"> Suerte {nombre} </h3>
                    </div>
                  </Fragment>
                }
              </div>
            </div>


            <div className="row">
              <div className="col s12 p-0">
                { verRegistroTablon ?
                  <TablonRegisterNuevo id_corte={id_corte} id_suerte={id_suerte} />
                : 
                  null 
                }
              </div>
            </div>

            <div className="row">
              <div className="col s12 p-0">
                { verCortes ?
                  <ListTablones id_corte={id_corte} id_suerte={id_suerte} fecha_corte={fecha_corte} />
                : 
                  null 
                }
              </div>
            </div>

     
            <div className="row">
              <div className="col s12 p-0">
                <div className="card-panel white pb-1 pt-3 mb-0 mt-0">
                  <div className="row valign-wrapper">
                    <div className="col s12">
                    <h3 className="center black-text"> Corte {numero} </h3>
                    <table className="table responsive-table table-bordered centered title">
                      <thead className="text-white" style={{backgroundColor: "#283747"}}>
                        <tr>
                          <th scope="col"> Fecha de Siembra </th>
                          <th scope="col"> Fecha de Inicio </th>
                          <th scope="col"> Fecha de Corte </th>
                          <th scope="col"> Edad Corte </th>
                          <th scope="col"> Edad Actual (meses) </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td> { fecha_siembra ? (<p>{moment(fecha_siembra).format('DD-MM-YYYY')}</p>) : (<p>Sin registro</p>) } </td>
                          <td> { fecha_inicio ? (<p>{moment(fecha_inicio).format('DD-MM-YYYY')}</p>) : (<p>Sin registro</p>) } </td>
                          <td> { fecha_corte ? (<p>{moment(fecha_corte).format('DD-MM-YYYY')}</p>) : (<p>Sin registro</p>) } </td>
                          <td> { fecha_corte ? edadCorte : null } </td>
                          <td> { fecha_corte ? 0 : edadActual} </td>
                        </tr>
                      </tbody>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col s12 p-0">
                <NavLink to="#" onClick={ () => onclicLabor() } className={verLabores ? "btnlink2 btnvisited" : verHerbicidas ? "btnlink2" : verFertilizantes ? "btnlink2" : verPlagas ? "btnlink2" : verLluvias ? "btnlink2" : verCosechas ? "btnlink2" : "btnlink2"}><i className="fas fa-tractor left"></i> Labores agricolas </NavLink>
                <NavLink to="#" onClick={ () => onclicHerbicida() } className={verHerbicidas ? "btnlink2 btnvisited" : verLabores ? "btnlink2" : verFertilizantes ? "btnlink2" : verPlagas ? "btnlink2" : verLluvias ? "btnlink2" : verCosechas ? "btnlink2" : "btnlink2"}><i className="fas fa-hiking left"></i> Herbicidas </NavLink>
                <NavLink to="#" onClick={ () => onclicFertilizante() } className={verFertilizantes ? "btnlink2 btnvisited" : verHerbicidas ? "btnlink2" : verLabores ? "btnlink2" : verPlagas ? "btnlink2" : verLluvias ? "btnlink2" : verCosechas ? "btnlink2" : "btnlink2"}><i className="fas fa-spa left"></i> Fertilizantes </NavLink>
                <NavLink to="#" onClick={ () => onclicPlaga() } className={verPlagas ? "btnlink2 btnvisited" : verHerbicidas ? "btnlink2" : verFertilizantes ? "btnlink2" : verLabores ? "btnlink2" : verLluvias ? "btnlink2" : verCosechas ? "btnlink2" : "btnlink2"}><i className="fas fa-spider left"></i> Control plagas y enfermedades </NavLink>
                <NavLink to="#" onClick={ () => onclicLluvia() } className={verLluvias ? "btnlink2 btnvisited" : verHerbicidas ? "btnlink2" : verFertilizantes ? "btnlink2" : verPlagas ? "btnlink2" : verLabores ? "btnlink2" : verCosechas ? "btnlink2" : "btnlink2"}><i className="fas fa-cloud-sun-rain left"></i> Riego y Lluvias </NavLink>
                <NavLink to="#" onClick={ () => onclicCosecha() } className={verCosechas ? "btnlink2 btnvisited" : verHerbicidas ? "btnlink2" : verFertilizantes ? "btnlink2" : verPlagas ? "btnlink2" : verLluvias ? "btnlink2" : verLabores ? "btnlink2" : "btnlink2"}><i className="fas fa-trailer left"></i> Cosecha </NavLink>
              </div>
            </div>

            <div className="row">
              <div className="col s12 p-0">
              { verLabores ?
                <ListLabores corte={datacorte.obtenerCorte} props={id_suerte} estado={estado} />
              : verHerbicidas ?
                <ListHerbicidas corte={datacorte.obtenerCorte} props={id_suerte} estado={estado} />
              : verFertilizantes ?
                <ListFertilizantes corte={datacorte.obtenerCorte} props={id_suerte} estado={estado} />
              : verPlagas ?
                <ListPlagas props={id_corte} edadActual={edadActual} corte={datacorte.obtenerCorte} estado={estado} />
              : verLluvias ?
                <ListLluvias corte={datacorte.obtenerCorte} props={id_suerte} estado={estado} />
              : verCosechas ?
                <ListCosechas corte={datacorte.obtenerCorte} props={id_suerte} estado={estado} />
              : null }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorteDetalle

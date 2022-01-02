import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UpdateUser from './UpdateUser'
import useTitle from '../../utils/context/hooks/useSEO'
// GraphQL
import {USUARIO_ACTUAL_QUERY} from '../../apollo/querys'
import {useQuery} from '@apollo/client'

const UserEdit = () => {

  useTitle({ title: 'Editar Usuario' })

  // query hook
  const { data, loading, error } = useQuery(USUARIO_ACTUAL_QUERY)

  const [ editar, actualizarEditar ] = useState(true)

  const cerrarSesion = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.clear()
  }

  if(loading) return null
  if(error) return null
  const {nombre, apellido, email} = data.obtenerUsuario

  const editarDatos = () => {
    actualizarEditar(false)
  }

  return (
    <div className="container-fluid">
      <nav>
        <div className="nav-wrapper" style={{backgroundColor: "#283747"}}>
          <ul className="right">
            <li><Link to="/user/login" onClick={() => cerrarSesion()}><i className="material-icons right">power_settings_new</i>Salir</Link></li>
          </ul>
        </div>
      </nav>
      <div className="jumbotron mt-3 pt-4 white">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center"> Mis datos </h1>
        </div>
        <br />

        {editar ? 
          <table className="table col-md-6 mx-auto centered responsive-table table-striped">
            <thead className="text-white" style={{backgroundColor: "#283747"}}>
              <tr>
                <th className="fw-bold">Nombre</th>
                <th className="fw-bold">Apellido</th>
                <th className="fw-bold">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-capitalize"> {nombre} </td>
                <td className="text-capitalize"> {apellido} </td>
                <td> {email} </td>
              </tr>
              <tr>
                <td><Link to="/main" className="btnlink">Aceptar</Link></td>
                <td colSpan="2"><button type="button" onClick={() => editarDatos() } className="btn btnedit btn-warning">Editar</button></td>
              </tr>
            </tbody>
          </table>        
        :
          <UpdateUser data={data} actualizarEditar={actualizarEditar} />
        }


      </div>
    </div>
  )
}

export default UserEdit

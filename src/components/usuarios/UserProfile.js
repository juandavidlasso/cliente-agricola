import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../imagenes/logo.png'
import { Navbar, NavItem } from 'react-materialize'
import Swal from 'sweetalert2'
import useTitle from '../../utils/context/hooks/useSEO'
// GraphQL
import {USUARIO_ACTUAL_QUERY} from '../../apollo/querys'
import {useQuery} from '@apollo/client'


const UserProfile = () => {

  useTitle({ title: 'Principal' })

  // query hook
  const { data, loading, error } = useQuery(USUARIO_ACTUAL_QUERY)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  useEffect(() => {
    const M = window.M
    var elems = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elems, {})
  }, [])

  if(loading) return null
  if(error) return null
  const {email} = data.obtenerUsuario  

  const cerrarSesion = () => {
    sessionStorage.removeItem('token')
    sessionStorage.clear()
    window.location.reload()
  }

  const alerta = () => {
    Swal.fire({
      title: 'Atención!',
      text: 'Estamos trabajando para implementar este módulo!',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0d47a1',
      allowOutsideClick: false,
      customClass: {
        popup: 'borde-popup-war',
        content: 'contenido-popup-war',
        title: 'title-popup-war'
      }
    })
  }

    return (
      <div className="container-fluid">

        <div className="row">
          <Navbar
            alignLinks="right"
            id="mobile-nav"
            className="header"
            options={{
              draggable: true,
              edge: 'left',
              inDuration: 250,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 200,
              preventScrolling: true
            }}
          >
            <NavItem>
              <i className="material-icons left">person</i>{email}
            </NavItem>
            <NavItem href="/user/login" onClick={() => cerrarSesion()}>
              <i className="material-icons left">power_settings_new</i>Salir
            </NavItem>
          </Navbar>
        </div>

        <div className="row">
          <div className="col s12">
            <img src={logo} alt="Responsive" className="rounded mx-auto d-block img-fluid responsive-img icon2" />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 center mb-3">
            <Link to='/main' className="modulos p-4 center text-white"> Módulo 1: Cultivos. <br /><br /> <i className="fab fa-canadian-maple-leaf large"></i> </Link>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 center mb-3">
            <Link to="#!" className="modulos p-4 center text-white" onClick={() => alerta()}> Módulo 2: Maquinaria. <br /><br /> <i className="fas fa-tractor large"></i> </Link>
          </div>
          <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 center">
            <Link to="#!" className="modulos p-4 center text-white" onClick={() => alerta()}> Módulo 3: Empleados. <br /><br /> <i className="fas fa-users large"></i> </Link>
          </div>
        </div>

      </div>
    )
}

export default UserProfile

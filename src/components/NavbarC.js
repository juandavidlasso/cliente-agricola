import React, { useEffect } from 'react'
import m1 from '../imagenes/logo.png'
import m2 from '../imagenes/logof.png'
import { NavLink, Link } from 'react-router-dom'
import { Navbar, NavItem } from 'react-materialize'
// GraphQL
import {USUARIO_ACTUAL_QUERY} from '../apollo/querys'
import {useQuery} from '@apollo/client'

const NavbarC = () => {

  // query hook
  const { data, loading, error } = useQuery(USUARIO_ACTUAL_QUERY)
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  useEffect(() => {
    const M = window.M
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, [])

  const cerrarSesion = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.clear()
    window.location.reload()
  }

  if(loading) return null
  if(error) return null
  const {nombre, apellido, email, rol} = data.obtenerUsuario
  sessionStorage.setItem('rol', rol)

  return (
    <div className="row">
      <ul className="sidenav sidenav-fixed grey lighten-5 hide-on-med-and-down">
        <li>
          <div className="user-view">
            <div className="background center"><img src={m2} alt=""/></div>
            <img className="circle" src={m1} alt=""/>
              <p style={{marginBottom: "0px"}} className="text-capitalize">{nombre} {apellido}</p>
            <p>{email}</p>
          </div>
        </li>
        <li><div className="divider"></div></li>
        <li><Link to="#" className="subheader blue-grey lighten-1 font-weight-bold black-text">Personal</Link></li>
        <li className="ms"><NavLink to="/user/datos" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">person</i>Mis Datos</NavLink></li>
        {rol === 1 ?
          <li className="ms"><NavLink to="/user/register" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">person_add</i>Agregar Usuario</NavLink></li>
        : 
          null
        }
        <li><div className="divider"></div></li>
        <li><Link to="#" className="subheader blue-grey lighten-1 font-weight-bold black-text">Aplicativos</Link></li>
        <li className="ms"><NavLink to="/main" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">home</i>Menú</NavLink></li>
        {/* <Dropdown
          id="Dropdown_6"
          options={{
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }}
          trigger={
            <li className="ms"><Link to="#"><i className="material-icons left">list</i>Modulo Cultivos</Link></li>
          }
        >
          <a href="#">
            one
          </a>
          <a href="#">
            two
          </a>
        </Dropdown> */}
        <li className="ms" ><NavLink to="/prontuario" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">list</i>Prontuario</NavLink></li>
        <li className="ms"><NavLink to="/suerte/list" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">spa</i>Suerte</NavLink></li>
        <li className="ms"><NavLink to="#!" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">web</i>Datos Actuales</NavLink></li>
      </ul>

      {/* <ul id="slide-out" className="sidenav grey lighten-5">
        <li>
          <div className="user-view">
            <div className="background center"><img src={m2} alt=""/></div>
            <img className="circle" src={m1} alt=""/>
            <p style={{marginBottom: "0px"}} className="text-capitalize">{nombre} {apellido}</p>
            <p>{email}</p>
          </div>
        </li>
        <li className="ms"><NavLink to="/user/datos" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">person</i>Mis Datos</NavLink></li>
        {rol === 'administrador@gmail.com' ?
          <li className="ms"><NavLink to="/user/register" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">person_add</i>Agregar Usuario</NavLink></li>
        : 
          null
        }
        <li><div className="divider"></div></li>
        <li><a href="#!" className="subheader blue-grey lighten-1 font-weight-bold black-text">Aplicativos</a></li>
        <li className="ms"><NavLink to="/main" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">home</i>Menú</NavLink></li>
        <li className="ms"><NavLink to="/prontuario" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">list</i>Prontuario</NavLink></li>
        <li className="ms"><NavLink to="/suerte/list" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">spa</i>Suerte</NavLink></li>
        <li><div className="divider"></div></li>
        <li><a href="#!" className="subheader blue-grey lighten-5 font-weight-bold black-text">Opciones</a></li>
        <li className="ms"><NavLink to="/user/profile" className="waves-effect" activeStyle={{backgroundColor: "#cfd8dc"}}><i className="material-icons left">home</i> Home </NavLink></li>
        <li className="ms"><Link to="/user/login" className="waves-effect" onClick={() => cerrarSesion()}><i className="material-icons left">power_settings_new</i>Salir</Link></li>
      </ul> */}

      <Navbar
        alignLinks="right"
        id="mobile-nav"
        className="header1"
        options={{
          draggable: true,
          
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true
        }}
      >
        <NavItem href="/user/profile" className="home">
          <i className="material-icons left">home</i> Inicio
        </NavItem>
        <NavItem className="hide-on-med-and-down hacienda">
          Hacienda Santa Elena
        </NavItem>
        <NavItem className="divider subheader blue-grey lighten-1 font-weight-bold black-text">
          Personal
        </NavItem>
        <NavItem href="/user/datos" className="hide-on-large-only">
          <i className="material-icons left">person</i> Mis Datos
        </NavItem>
        {rol === 1 ?        
          <NavItem href="/user/register" className="hide-on-large-only">
            <i className="material-icons left">person_add</i> Agregar Usuario
          </NavItem>
        : 
          null
        }
        <NavItem className="divider subheader blue-grey lighten-1 font-weight-bold black-text">
          Aplicativos
        </NavItem>
        <NavItem href="/main" className="hide-on-large-only">
          <i className="material-icons left">home</i> Menú
        </NavItem>
        <NavItem href="/prontuario" className="hide-on-large-only">
          <i className="material-icons left">list</i> Prontuario
        </NavItem>
        <NavItem href="/suerte/list" className="hide-on-large-only">
          <i className="material-icons left">spa</i> Suerte
        </NavItem>
        <NavItem href="#!" className="hide-on-large-only">
          <i className="material-icons left">web</i> Datos Actuales
        </NavItem>
        <NavItem href="/user/login" onClick={() => cerrarSesion()} className="salir">
          <i className="material-icons left">power_settings_new</i> Salir
        </NavItem>
      </Navbar>

      {/* <nav>
        <div className="nav-wrapper valign-wrapper" style={{backgroundColor: "#212F3C"}}>
          <a href="#!" className="sidenav-trigger" data-target="slide-out"><i className="material-icons">menu</i></a>
          <div className="col-5">
            <ul className="right hide-on-med-and-down">
              <li><a href="/user/profile"><i className="material-icons left">home</i> Home </a></li>
            </ul>
          </div>
          <div className="col-3">
            <ul className="right hide-on-med-and-down">
              <li> Hacienda Santa Helena </li>
            </ul>
          </div>
          <div className="col-4">
            <ul className="right hide-on-med-and-down">
              <li><Link to="/user/login" onClick={() => cerrarSesion()}><i className="material-icons right">power_settings_new</i>Salir</Link></li>
            </ul>
          </div>
        </div>
      </nav> */}
    </div>
  )
}

export default NavbarC

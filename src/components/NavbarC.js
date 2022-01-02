import React from 'react'
import m1 from '../imagenes/logo.png'
import { Navbar, NavItem, SideNav, SideNavItem, Icon } from 'react-materialize'
// GraphQL
import {USUARIO_ACTUAL_QUERY} from '../apollo/querys'
import {useQuery} from '@apollo/client'

const NavbarC = () => {

  // query hook
  const { data, loading, error } = useQuery(USUARIO_ACTUAL_QUERY)

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
      
      <div className="hide-on-med-and-down">
        <SideNav
          id="SideNav-10"
          fixed
          options={{
            draggable: true
          }}
        >
        
        <SideNavItem
          user={{
            email: `${email}`,
            image: m1,
            name: `${nombre}  ${apellido} .`,
          }}
          userView
          className="sidenavp"
        />
        
        <SideNavItem href="/user/datos" icon={<Icon>person</Icon>}>
          Mis Datos
        </SideNavItem>

        {rol === 1 ?
          <SideNavItem href="/user/register" icon={<Icon>person_add</Icon>}>
            Agregar Usuario
          </SideNavItem>
        :
          null
        }
        <SideNavItem divider />
        <SideNavItem subheader className="blue-grey lighten-1">
          <span className="fw-bold black-text">Aplicativos</span>
        </SideNavItem>
        
        <SideNavItem href="/main" icon={<Icon>home</Icon>}>
          Menú
        </SideNavItem>

        <SideNavItem href="/prontuario" icon={<Icon>list</Icon>}>
          Prontuario
        </SideNavItem>

        <SideNavItem href="/suerte/list" icon={<Icon>spa</Icon>}>
          Suertes
        </SideNavItem>

        <SideNavItem href="/listado/lluvias" icon={<Icon>wb_cloudy</Icon>}>
          Lluvias
        </SideNavItem>
        
        <SideNavItem href="/datos-actuales" icon={<Icon>web</Icon>}>
          Datos Actuales
        </SideNavItem>

        </SideNav>
      </div>


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
  
      <NavItem className="divider subheader blue-grey lighten-1 fw-bold black-text hide-on-large-only">
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
      <NavItem className="divider subheader blue-grey lighten-1 fw-bold black-text hide-on-large-only">
        Aplicativos
      </NavItem>
      <NavItem href="/main" className="hide-on-large-only">
        <i className="material-icons left">home</i> Menú
      </NavItem>
      <NavItem href="/prontuario" className="hide-on-large-only">
        <i className="material-icons left">list</i> Prontuario
      </NavItem>
      <NavItem href="/suerte/list" className="hide-on-large-only">
        <i className="material-icons left">spa</i> Suertes
      </NavItem>
      <NavItem href="/listado/lluvias" className="hide-on-large-only">
        <i className="material-icons left">wb_cloudy</i> Lluvias
      </NavItem>
      <NavItem href="/datos-actuales" className="hide-on-large-only">
        <i className="material-icons left">web</i> Datos Actuales
      </NavItem>
      <NavItem href="/user/login" onClick={() => cerrarSesion()}>
        <i className="material-icons left">power_settings_new</i> Salir
      </NavItem>
      </Navbar>

    </div>
  )
}

export default NavbarC

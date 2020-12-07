import React from 'react';
import logo from '../imagenes/logo.png'
import { Navbar, NavItem } from 'react-materialize'

const NavbarM = () => {
    return ( 
        <div className="row">
          <Navbar
            alignLinks="left"
            id="mobile-nav"
            className="headerm"
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
            <NavItem href="#!" className="etiquetam1">
              <img src={logo} alt="logo" className="logom" />
            </NavItem>
            <NavItem href="/user/profile" className="etiquetam mr-5">
              <i className="material-icons left">home</i>Inicio
            </NavItem>
            <NavItem href="#!" className="etiquetam ml-5 mr-5">
              <i className="material-icons left">person</i>Usuario: juan
            </NavItem>
            <NavItem href="/user/login" className="etiquetam ml-5">
              <i className="material-icons left">power_settings_new</i>Salir
            </NavItem>
          </Navbar>
        </div>
     );
}
 
export default NavbarM;
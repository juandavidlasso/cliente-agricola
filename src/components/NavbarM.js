import React from 'react';
import logo from '../imagenes/logo.png'
import { Link } from 'react-router-dom'

const NavbarM = () => {

  // Funcion para cerrar sesion
  const cerrarSesion = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.removeItem('alertas')
    sessionStorage.clear()
  }

  const rol = Number(sessionStorage.getItem('rol'))

  return (
    <div className='Content_menu'>
      <label htmlFor="toggle-1"><i className='material-icons'>menu</i></label>
      <input type="checkbox" id="toggle-1" />
      <nav>
        <ol>
          <li className='Content_menu_li_img p-3'>
            <img src={logo} className='responsive-img' alt='Logo' />
          </li>
          <li className='Content_menu_li'>
            <p>jdandturk@gmail.com</p>
            <p>juan david lasso</p>
          </li>
          <li>
            <Link to='/user/profile' className='Content_menu_links ps-3'>
              <i className='material-icons d-inline-block' style={{marginRight: 15}}>apps</i>
              Módulos
            </Link>
          </li>
          <li>
            <Link to='/maquinaria/listado' className='Content_menu_links ps-3'>
              <i className='material-icons d-inline-block' style={{marginRight: 15}}>brightness_5</i>
              Maquinaria
            </Link>
          </li>
          {rol === 1 ?
            <li>
              <Link to='/maquinaria/registro-insumo' className='Content_menu_links ps-3'>
                <i className='material-icons d-inline-block' style={{marginRight: 15}}>storage</i>
                Registrar Insumo
              </Link>
            </li>
          :
            null
          }
          <li>
            <Link to="/user/profile" onClick={() => cerrarSesion()} className='Content_menu_links ps-3'>
              <i className='material-icons d-inline-block' style={{marginRight: 15}}>power_settings_new</i>
              Salir
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
}
 
export default NavbarM;
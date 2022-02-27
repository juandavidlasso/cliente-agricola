import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import m1 from '../imagenes/logo.png'
import { Navbar, NavItem, SideNav, SideNavItem, Icon } from 'react-materialize'
import moment from 'moment'
import { toast } from 'react-toastify'
// GraphQL
import {USUARIO_ACTUAL_QUERY, OBTENER_ALERTAS} from '../apollo/querys'
import {ENVIAR_ALERTAS_CORREO} from '../apollo/mutations'
import {useQuery, useMutation} from '@apollo/client'

const NavbarC = () => {

  // query hook
  const { data, loading, error } = useQuery(USUARIO_ACTUAL_QUERY)
  const { data: dataAlerta, loading: loadingAlerta, error: errorAlerta} = useQuery(OBTENER_ALERTAS)
  // mutation
  const [ enviarAlertas ] = useMutation(ENVIAR_ALERTAS_CORREO)
  
  // Estate
  let array = []
  const [ activo, actualizarActivo ] = useState(true)
  const location = useLocation()

  if(loading) return null
  if(error) return null
  if(loadingAlerta) return null
  if(errorAlerta) return null

  const {nombre, apellido, email, rol} = data.obtenerUsuario
  const {obtenerAlertasAplicaciones} = dataAlerta
  sessionStorage.setItem('rol', rol)

  // Funcion para obtener alertas
  const obtenerAlertas = () => {
    let i = 0
    sessionStorage.setItem('alertas', i)
    obtenerAlertasAplicaciones.map(alertas => {
      const {nombre, listcortes} = alertas
      listcortes.map(corte => {
        const {numero, fecha_inicio} = corte
        const now = moment().format('YYYY-MM-DD')
        const factual = moment(now)
        const finicio = moment(fecha_inicio)
        const edadActual = Number(factual.diff(finicio, 'days', true).toFixed(0))
        const edadActualM = Number(factual.diff(finicio, 'months', true).toFixed(1))
        // 20 dias
        if(edadActual === 20) {
          sessionStorage.setItem('alertas', i+=1)
          let object = {
            suerte: nombre,
            mensaje: `La suerte ${nombre} en el corte No. ${numero} con fecha de inicio (${fecha_inicio}) tiene 20 días, se le debe aplicar 1 nivel fertilizante granulado.`
          }
          array.push(object)
        }
        // 45 dias
        if(edadActual === 45) {
          sessionStorage.setItem('alertas', i+=1)
          let object = {
            suerte: nombre,
            mensaje: `La suerte ${nombre} en el corte No. ${numero} con fecha de inicio (${fecha_inicio}) tiene 45 días, se le debe aplicar Trichograma.`
          }
          array.push(object)
        }
        // 3.5 meses
        if(edadActualM === 3.5) {
          sessionStorage.setItem('alertas', i+=1)
          let object = {
            suerte: nombre,
            mensaje: `La suerte ${nombre} en el corte No. ${numero} con fecha de inicio (${fecha_inicio}) tiene 3.5 meses, se le debe aplicar 2 nivel fertilizante líquido y cotesia.`
          }
          array.push(object)
        }
        // 5 meses
        if(edadActualM === 5) {
          sessionStorage.setItem('alertas', i+=1)
          let object = {
            suerte: nombre,
            mensaje: `La suerte ${nombre} en el corte No. ${numero} con fecha de inicio (${fecha_inicio}) tiene 5 meses, se le debe aplicar fertilizante foliar.`
          }
          array.push(object)
        }
        // 5.5 meses
        if(edadActualM === 5.5) {
          sessionStorage.setItem('alertas', i+=1)
          let object = {
            suerte: nombre,
            mensaje: `La suerte ${nombre} en el corte No. ${numero} con fecha de inicio (${fecha_inicio}) tiene 5.5 meses, se le debe aplicar lydella 1.`
          }
          array.push(object)
        }
        // 8.5 meses - 1.8
        if(edadActualM === 1.8) {
          sessionStorage.setItem('alertas', i+=1)
          let object = {
            suerte: nombre,
            mensaje: `La suerte ${nombre} en el corte No. ${numero} con fecha de inicio (${fecha_inicio}) tiene 8.5 meses, se le debe aplicar lydella 2.`
          }
          array.push(object)
        }
        // 10 meses - 1.9
        if(edadActualM === 1.9) {
          sessionStorage.setItem('alertas', i+=1)
          let object = {
            suerte: nombre,
            mensaje: `La suerte ${nombre} en el corte No. ${numero} con fecha de inicio (${fecha_inicio}) tiene 10 meses, se le debe aplicar madurante.`
          }
          array.push(object)
        }
        return array
      })
      return array
    })
  }

  // Ejecuto la funcion
  if(location.pathname === '/main') {
    obtenerAlertas()
  }

  // Funcion para mostrar alertas
  const verAlertasAplicacion = async(input) => {
    actualizarActivo(false)
    if(input.length === 0 ) {
      return (
        toast.error('No hay aplicaciones pendientes.', {
          theme: 'colored',
          closeOnClick: false,
          pauseOnHover: false
        })
      )
    } else {
      try {
        await enviarAlertas({
          variables: {
            input
          }
        }).then(async (res) => {
          const status = res.data.enviarAlertas.success
          const msj = res.data.enviarAlertas.message
          sessionStorage.setItem('alertas', 0)
          // Si correo envio con exito muestro alerta
          if(status === true) {
            toast.success(`${msj}`, {
              theme: 'colored',
              closeOnClick: false,
              pauseOnHover: false,
              autoClose: false
            })
          }

          // Si correo no envio muestro error
          if(status === false) {
            toast.error(`${msj}`, {
              theme: 'colored',
              closeOnClick: false,
              pauseOnHover: false,
              autoClose: false
            })
          }
          // Mapeo las alertas y muestro los mensajes
          await input.map(alert => {
            const {suerte, mensaje} = alert
            return (
              toast.info(`Suerte ${suerte} - ${mensaje}`, {
                theme: 'colored',
                closeOnClick: false,
                pauseOnHover: false,
                autoClose: false
              })
            )
          })
        })
      } catch (error) {
        actualizarActivo(true)
        toast.error( error.message.replace('GraphQL error: ', ''), {
          theme: 'colored',
          closeOnClick: false,
          pauseOnHover: false
        })
      }
    }
  }

  // Funcion para cerrar sesion
  const cerrarSesion = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('rol')
    sessionStorage.removeItem('alertas')
    sessionStorage.clear()
    window.location.reload()
  }

  // Obtengo valor de alertas
  const alert = Number(sessionStorage.getItem('alertas'))

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
        {/* <SideNavItem subheader className="blue-grey lighten-1">
          <span className="fw-bold black-text">Aplicativos</span>
        </SideNavItem> */}
        
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

        <SideNavItem
          // className={alert === 0 ? 'btnBotonD' : 'btnBoton'}
          // icon={<Icon className="btnAlerta">add_alert</Icon>}
          // onClick={() => verAlertasAplicacion(array)}
        >
          <button
            type='button'
            className={alert === 0 ? 'btnAlert1' : !activo ? 'btnAlert1' : 'btnAlert'}
            onClick={() => verAlertasAplicacion(array)}
            disabled={!activo}
          >
            <i className='material-icons me-3 small'>add_alert</i>Alertas
          </button>
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

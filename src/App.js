import React from 'react';
import jwt_decode from 'jwt-decode'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
// Navbar
import NavbarC from './components/NavbarC'
// Redux
import { Provider } from 'react-redux'
import store from './utils/redux/store'
// Context
import AlertaState from './utils/context/alertas/alertaState'
// Usuarios
import UserLogin from './components/usuarios/UserLogin'
import UserRegister from './components/usuarios/UserRegister'
import UserProfile from './components/usuarios/UserProfile'
import UserEdit from './components/usuarios/UserEdit'
import UpdateConfirmacion from './components/usuarios/UpdateConfirmacion'
// Suertes
import ListSuertes from './components/cultivos/suerte/ListSuertes'
import SuerteDetalle from './components/cultivos/suerte/SuerteDetalle'
import SuerteEditar from './components/cultivos/suerte/SuerteEditar'
// Cortes
import CorteDetalle from './components/cultivos/cortes/CorteDetalle'
import CorteEditar from './components/cultivos/cortes/CorteEditar'
import CorteEditarDatos from './components/cultivos/cortes/CorteEditarDatos'
import AgregarTablones from './components/cultivos/cortes/AgregarTablones'
// Labores
import LaborEditar from './components/cultivos/labores/LaborEditar'
// Aplicacion herbicida editar
import AplicacionHerbicidaEditar from './components/cultivos/herbicidas/aplicacion/AplicacionHerbicidaEditar'
// Tratamiento Herbicida 
import TratamientoHerbicidaRegister from './components/cultivos/herbicidas/tratamiento/TratamientoHerbicidaRegister'
import TratamientoHerbicidaEditar from './components/cultivos/herbicidas/tratamiento/TratamientoHerbicidaEditar'
// Aplicacion fertilizante editar
import AplicacionFertilizanteEditar from './components/cultivos/fertilizantes/aplicacion/AplicacionFertilizanteEditar'
// Tratamiento Fertilizante
import TratamientoFertilizanteRegister from './components/cultivos/fertilizantes/tratamiento/TratamientoFertilizanteRegister'
import TratamientoFertilizanteEditar from './components/cultivos/fertilizantes/tratamiento/TratamientoFertilizanteEditar'
// Principal
import Main from './components/cultivos/Main'
// Cosecha editar
import CosechaEditar from './components/cultivos/cosechas/CosechaEditar'
// Lluvia
import LluviaRegister from './components/cultivos/lluvias/LluviaRegister'
// Tablon
import TablonEditar from './components/cultivos/tablones/TablonEditar'
// Prontuario
import Prontuario from './components/prontuario/Prontuario'
// Inform
// import Informe from './components/prontuario/Informe'
// Plagas
import AplicacionPlagaRegister from './components/cultivos/plagas/aplicacion/AplicacionPlagaRegister'
import ProductoEditar from './components/cultivos/plagas/productos/ProductoEditar'
import AplicacionPlagaEditar from './components/cultivos/plagas/aplicacion/AplicacionPlagaEditar'
// Forgot Password
import ForgotPassword from './components/usuarios/ForgotPassword'
// Datos Actuales
import DatosActuales from './components/cultivos/actuales/DatosActuales'
// Maquinaria
import NavbarM from './components/NavbarM'
import ListMaquinaria from './components/maquinaria/ListMaquinaria'
import MaquinariaDetalle from './components/maquinaria/MaquinariaDetalle';

// Proteger rutas frontend
const isAuthenticated = () => {
  const token = sessionStorage.getItem('token')
  let isValid = true
  try{
    isValid = jwt_decode(token)
  }catch(e){
    return false;
  }
  return isValid;
};

const PrivateRoute = (props) => (
  isAuthenticated()
    ?<Route {...props} />
    :<Redirect to="/user/login" />
)


const App = (props) => {

  // useEffect(() => {
  //   console.log('Route change', props.location.pathname)
  // },[])

  //console.log(window.location.pathname);

  return (
    <AlertaState>
      
        <Provider store={store}>

          <div className="container-fluid">
            { props.location.pathname === "/user/login" ||
              props.location.pathname === "/user/profile" ||
              props.location.pathname === "/reset/password" ||
              props.location.pathname === "/user/confirmar-cuenta" || 
              props.location.pathname === "/user/datos" ||
              props.location.pathname === "/maquinaria/listado" ||
              props.location.pathname === "/maquinaria/detalle" ? 
                null 
              : 
                <NavbarC /> 
            }

            { props.location.pathname === "/maquinaria/listado" ||
              props.location.pathname === "/maquinaria/detalle" ?
                <NavbarM />
              : 
                null 
            }

            <Switch>
              <Route exact path="/user/login" component={UserLogin} />
                <PrivateRoute exact path="/user/register" component={UserRegister} />
                <Route exact path="/user/actualizar-password" component={UpdateConfirmacion} />
                <PrivateRoute exact path="/user/profile" component={UserProfile} />
                <PrivateRoute exact path="/user/datos" component={UserEdit} />
                <PrivateRoute exact path="/main" component={Main} />
                <PrivateRoute exact path="/suerte/list" component={ListSuertes} />
                <PrivateRoute exact path="/suerte/detalle/:id" component={SuerteDetalle} />
                <PrivateRoute exact path="/suerte/editar/:id_suerte" component={SuerteEditar} />
                <PrivateRoute exact path="/corte/detalle/:id_corte/:id_suerte" component={CorteDetalle} />
                <PrivateRoute exact path="/corte/editar/:id_corte/:id_suerte/:nombre" component={CorteEditar} />
                <PrivateRoute exact path="/corte/editar/datos/:id_corte/:id_suerte/:nombre" component={CorteEditarDatos} />
                <PrivateRoute exact path="/corte/register/tablones/:id_corte/:id_suerte/:nombreNuevoCorte/:idNuevoCorte" component={AgregarTablones} />
                <PrivateRoute exact path="/labor/editar/:id_labor/:id_corte/:id_suerte" component={LaborEditar} />
                <PrivateRoute exact path="/herbicida-aplicacion/editar/:id_aphe/:id_corte/:id_suerte" component={AplicacionHerbicidaEditar} />
                <PrivateRoute exact path="/herbicida/register/:id_aphe/:id_corte/:id_suerte" component={TratamientoHerbicidaRegister} />
                <PrivateRoute exact path="/herbicida-tratamiento/editar/:id_aphe/:id_trahe/:id_corte/:id_suerte" component={TratamientoHerbicidaEditar} />
                <PrivateRoute exact path="/fertilizante-aplicacion/editar/:id_apfe/:id_corte/:id_suerte" component={AplicacionFertilizanteEditar} />
                <PrivateRoute exact path="/fertilizante/register/:id_apfe/:id_corte/:id_suerte" component={TratamientoFertilizanteRegister} />
                <PrivateRoute exact path="/fertilizante-tratamiento/editar/:id_apfe/:id_trafe/:id_corte/:id_suerte" component={TratamientoFertilizanteEditar} />
                <PrivateRoute exact path="/cosecha/editar/:id_cosecha/:id_corte/:id_suerte" component={CosechaEditar} />
                <PrivateRoute exact path="/lluvia/register/:id/:id_corte/:id_suerte" component={LluviaRegister} />
                <PrivateRoute exact path="/tablon/editar/:id_tablon/:id_corte/:id_suerte" component={TablonEditar} />
                <PrivateRoute exact path="/plaga/register/:id_suerte/:id_corte/:id_tablon" component={AplicacionPlagaRegister} />
                <PrivateRoute exact path="/plaga-aplicacion/editar/:id_suerte/:id_corte/:id_tablon/:id_trapl/:id_apla" component={AplicacionPlagaEditar} />
                <PrivateRoute exact path="/plaga-tratamiento/editar/:id_trapl/:id_corte/:id_suerte" component={ProductoEditar} />
                <PrivateRoute exact path="/prontuario" component={Prontuario} />
                <PrivateRoute exact path="/datos-actuales" component={DatosActuales} />
                <PrivateRoute exact path="/maquinaria/listado" component={ListMaquinaria} />
                <PrivateRoute exact path="/maquinaria/detalle" component={MaquinariaDetalle} />
                {/* <PrivateRoute exact path="/informe" component={Informe} /> */}
                <Route exact path="/reset/password" component={ForgotPassword} />
                <Redirect from="*" to="/user/login" />
            </Switch>
          </div>

        </Provider>
      
    </AlertaState>
  )  
}

export default withRouter(props => <App {...props} />)
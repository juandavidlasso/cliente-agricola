import React from 'react'
import jwt_decode from 'jwt-decode'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Navbar
import NavbarC from './components/NavbarC'
// Redux
import { Provider } from 'react-redux'
import store from './utils/redux/store'
// Context
import AlertaState from './utils/context/alertas/alertaState'
import DatoState from './utils/context/datos/datosState'
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
import SuerteRenovar from './components/cultivos/cortes/SuerteRenovar'
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
import ListLluvias from './components/cultivos/lluvias/ListLluvias'
// Tablon
import TablonEditar from './components/cultivos/tablones/TablonEditar'
// Prontuario
import Prontuario from './components/prontuario/Prontuario'
// Plagas
import ProductoEditar from './components/cultivos/plagas/productos/ProductoEditar'
import AplicacionPlagaEditar from './components/cultivos/plagas/aplicacion/AplicacionPlagaEditar'
// Forgot Password
import ForgotPassword from './components/usuarios/ForgotPassword'
import ChangePassword from './components/usuarios/ChangePassword'
import Confirmacion from './components/usuarios/Confirmacion'
// Datos Actuales
import DatosActuales from './components/cultivos/actuales/DatosActuales'
// Informe Vonsucro
import InformeVonsucro from './components/cultivos/vonsucro/InformeVonsucro'
// Maquinaria
import NavbarM from './components/NavbarM'
import ListMaquinaria from './components/maquinaria/ListMaquinaria'
import InsumoRegistro from './components/maquinaria/InsumoRegistro'
import MaquinariaDetalle from './components/maquinaria/MaquinariaDetalle'
import MantenimientoRegistro from './components/maquinaria/MantenimientoRegistro'

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
}

// Componente ruta privado
const PrivateRoute = ({ children }) => (
  isAuthenticated()
    ? children
    :<Navigate to="/user/login" />
)

const App = () => {

  const location = useLocation()

  return (
    <AlertaState>
      <DatoState>
        <Provider store={store}>

          <div className="container-fluid">
            { location.pathname === "/user/login" ||
              location.pathname === "/user/profile" ||
              location.pathname === "/reset/password" ||
              location.pathname === "/user/confirmar-cuenta" || 
              location.pathname === "/user/datos" ||
              location.pathname === "/maquinaria/listado" ||
              location.pathname === "/maquinaria/detalle" ||
              location.pathname === "/maquinaria/registro-insumo" ||
              location.pathname === "/informe-vonsucro" ||
              location.pathname === "/maquinaria/registro-mantenimiento" ? 
                null 
              : 
                <NavbarC /> 
            }

            { location.pathname === "/maquinaria/listado" ||
              location.pathname === "/maquinaria/detalle" ||
              location.pathname === "/maquinaria/registro-insumo" ||
              location.pathname === "/maquinaria/registro-mantenimiento" ? 
                <NavbarM />
              : 
                null
            }

            <Routes>
              <Route path="/user/login" element={<UserLogin />} />
              <Route path="/user/register" element={ <PrivateRoute> <UserRegister /> </PrivateRoute> } />
              <Route path="/user/actualizar-password" element={<UpdateConfirmacion />} />
              <Route path="/user/update-code" element={<ChangePassword />} />
              <Route path="/user/update-user/:codigo" element={<Confirmacion />} />
              <Route path="/user/profile" element={ <PrivateRoute> <UserProfile /> </PrivateRoute> } />
              <Route path="/user/datos" element={ <PrivateRoute> <UserEdit /> </PrivateRoute> } />
              <Route path="/main" element={ <PrivateRoute> <Main /> </PrivateRoute> } />
              <Route path="/suerte/list" element={ <PrivateRoute> <ListSuertes /> </PrivateRoute> } />
              <Route path="/suerte/detalle/:id" element={ <PrivateRoute> <SuerteDetalle /> </PrivateRoute> } />
              <Route path="/suerte/editar/:id_suerte" element={ <PrivateRoute> <SuerteEditar /> </PrivateRoute> } />
              <Route path="/suerte/renovar/datos/:id_suerte" element={ <PrivateRoute> <SuerteRenovar /> </PrivateRoute> } />
              <Route path="/corte/detalle/:id_corte/:id_suerte" element={ <PrivateRoute> <CorteDetalle /> </PrivateRoute> } />
              <Route path="/corte/editar/:id_corte/:id_suerte/:nombre" element={ <PrivateRoute> <CorteEditar /> </PrivateRoute> } />
              <Route path="/corte/editar/datos/:id_corte/:id_suerte/:nombre" element={ <PrivateRoute> <CorteEditarDatos /> </PrivateRoute> } />
              <Route path="/corte/register/tablones/:id_corte/:id_suerte/:nombreNuevoCorte/:idNuevoCorte" element={ <PrivateRoute> <AgregarTablones /> </PrivateRoute> } />
              <Route path="/labor/editar/:id_labor/:id_corte/:id_suerte" element={ <PrivateRoute> <LaborEditar /> </PrivateRoute> } />
              <Route path="/herbicida-aplicacion/editar/:id_aphe/:id_corte/:id_suerte" element={ <PrivateRoute> <AplicacionHerbicidaEditar /> </PrivateRoute> } />
              <Route path="/herbicida/register/:id_aphe/:id_corte/:id_suerte" element={ <PrivateRoute> <TratamientoHerbicidaRegister /> </PrivateRoute> } />
              <Route path="/herbicida-tratamiento/editar/:id_aphe/:id_trahe/:id_corte/:id_suerte" element={ <PrivateRoute> <TratamientoHerbicidaEditar /> </PrivateRoute> } />
              <Route path="/fertilizante-aplicacion/editar/:id_apfe/:id_corte/:id_suerte" element={ <PrivateRoute> <AplicacionFertilizanteEditar /> </PrivateRoute> } />
              <Route path="/fertilizante/register/:id_apfe/:id_corte/:id_suerte" element={ <PrivateRoute> <TratamientoFertilizanteRegister /> </PrivateRoute> } />
              <Route path="/fertilizante-tratamiento/editar/:id_apfe/:id_trafe/:id_corte/:id_suerte" element={ <PrivateRoute> <TratamientoFertilizanteEditar /> </PrivateRoute> } />
              <Route path="/cosecha/editar/:id_cosecha/:id_corte/:id_suerte" element={ <PrivateRoute> <CosechaEditar /> </PrivateRoute> } />
              <Route path="/listado/lluvias" element={ <PrivateRoute> <ListLluvias /> </PrivateRoute> } />
              <Route path="/tablon/editar/:id_tablon/:id_corte/:id_suerte" element={ <PrivateRoute> <TablonEditar /> </PrivateRoute> } />
              <Route path="/plaga-aplicacion/editar/:id_suerte/:id_corte/:id_tablon/:id_trapl/:id_apla" element={ <PrivateRoute> <AplicacionPlagaEditar /> </PrivateRoute> } />
              <Route path="/plaga-tratamiento/editar/:id_trapl/:id_corte/:id_suerte" element={ <PrivateRoute> <ProductoEditar /> </PrivateRoute> } />
              <Route path="/prontuario" element={ <PrivateRoute> <Prontuario /> </PrivateRoute> } />
              <Route path="/datos-actuales" element={ <PrivateRoute> <DatosActuales /> </PrivateRoute> } />
              <Route path="/informe-vonsucro" element={ <PrivateRoute> <InformeVonsucro /> </PrivateRoute> } />
              <Route path="/maquinaria/listado" element={ <PrivateRoute> <ListMaquinaria /> </PrivateRoute> } />
              <Route path="/maquinaria/registro-insumo" element={ <PrivateRoute> <InsumoRegistro /> </PrivateRoute> } />
              <Route path="/maquinaria/detalle" element={ <PrivateRoute> <MaquinariaDetalle /> </PrivateRoute> } />
              <Route path="/maquinaria/registro-mantenimiento" element={ <PrivateRoute> <MantenimientoRegistro /> </PrivateRoute> } />
              <Route path="/reset/password" element={<ForgotPassword />} />
              <Route path="*" element={<Navigate to="/user/login" />} />
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={8000}
              hideProgressBar={false}
            />
          </div>

        </Provider>
      </DatoState>
    </AlertaState>    
  );
}

export default App

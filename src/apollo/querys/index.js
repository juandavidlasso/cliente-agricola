import gql from 'graphql-tag'

// Retorna el usuario que esta logueado
export const USUARIO_ACTUAL_QUERY = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id_usuario
      nombre
      apellido
      email
      rol
    }
  }
`;

// Obtener las suertes
// export const OBTENER_SUERTES_QUERY = gql`
//   query obtenerSuertes {
//     obtenerSuertes{
//       id_suerte
//       nombre
//       variedad
//       zona
//     }
//   }
// `;


// Obtener las suertes renovadas
export const OBTENER_SUERTES_RENOVADAS_QUERY = gql`
  query obtenerSuertesRenovadas {
    obtenerSuertesRenovadas{
      id_suerte
      nombre
      variedad
      zona
      renovada
    }
  }
`;


// Visualizar cada suerte
export const VER_SUERTE_QUERY = gql`
  query obtenerSuerte($id_suerte:Int){
    obtenerSuerte(id_suerte: $id_suerte){
      id_suerte
      nombre
      variedad
      zona
      renovada
    }
  }
`;

// Visualizar nombre cada suerte
export const VER_NOMBRE_SUERTE_QUERY = gql`
  query obtenerSuerte($id_suerte:Int){
    obtenerSuerte(id_suerte: $id_suerte){
      id_suerte
      nombre
    }
  }
`;


// Obtener los cortes de cada suerte
export const OBTENER_CORTES_POR_SUERTE_QUERY = gql`
  query obtenerCortesPorSuerte($id_suerte: Int){
    obtenerCortesPorSuerte(id_suerte: $id_suerte)
  }
`;


// Obtener los cortes de cada suerte renovados
export const OBTENER_CORTES_RENOVADOS_QUERY = gql`
  query obtenerCortesRenovados($nombre: String){
    obtenerCortesRenovados(nombre: $nombre){
      id_corte
      numero
      fecha_inicio
      fecha_siembra
      fecha_corte
      activo
      estado
      suerte_id
    }
  }
`;


// Visualizar cada corte
export const VER_CORTE_QUERY = gql`
  query obtenerCorte($id_corte: Int){
    obtenerCorte(id_corte: $id_corte){
      id_corte
      numero
      fecha_inicio
      fecha_siembra
      fecha_corte
      activo
      estado
      suerte_id
    }
  }
`;


// Obtener las labores de cada corte
export const OBTENER_LABORES_POR_CORTE_QUERY = gql`
  query obtenerLaborPorCorte($id_corte: Int){
    obtenerLaborPorCorte(id_corte: $id_corte){
      id_labor
      fecha
      actividad
      equipo
      estado
      pases
      aplico
      costo
      nota
    }
  }
`;

// Obtener aplicacion herbicidas de cada corte
export const OBTENER_APHE_POR_CORTE_QUERY = gql`
  query obtenerHerbicidasPorCorte($id_corte: Int){
    obtenerHerbicidasPorCorte(id_corte: $id_corte){
      id_aphe
      tipo
      fecha
    }
  }
`;

// Obtener tratamientos herbicidas por aplicacion
export const OBTENER_TRHE_POR_APHE_QUERY = gql`
  query obtenerTherbicidaPorAplicacion($id_aphe: Int){
    obtenerTherbicidaPorAplicacion(id_aphe: $id_aphe){
      id_trahe
      producto
      dosis
      presentacion
      valor
      aplico
      nota
    }
  }
`;

// Obtener aplicacion fertilizantes por corte
export const OBTENER_APFE_POR_CORTE_QUERY = gql`
  query obtenerAPFEPorCorte($id_corte: Int) {
    obtenerAPFEPorCorte(id_corte: $id_corte) {
      id_apfe
      fecha
      tipo
    }
  }
`;

// Obtener tratamientos fertilizante por aplicacion
export const OBTENER_TRFE_POR_APFE_QUERY = gql`
  query obtenerTRFEPorAplicacion($id_apfe: Int) {
    obtenerTRFEPorAplicacion(id_apfe: $id_apfe) {
      id_trafe
      producto
      dosis
      presentacion
      valor
      aplico
      nota
    }
  }
`;

// Obtener las cosechas de cada corte
export const OBTENER_COSECHAS_POR_CORTE_QUERY = gql`
  query obtenerCosechaPorCorte($id_corte: Int){
    obtenerCosechaPorCorte(id_corte: $id_corte){
      id_cosecha
      peso
      rendimiento
    }
  }
`;

// Visualizar cada cosecha
export const VER_COSECHA_QUERY = gql`
  query obtenerCosecha($id_cosecha: Int){
    obtenerCosecha(id_cosecha: $id_cosecha){
      id_cosecha
      peso
      rendimiento
      corte_id
    }
  }
`;

// Obtener area de la suerte
export const OBTENER_AREA_SUERTE_QUERY = gql`
  query obtenerAreaSuerte($id_suerte: Int) {
    obtenerAreaSuerte(id_suerte: $id_suerte)
  }
`;


// Obtener area de cada corte
export const OBTENER_AREA_CORTE_QUERY = gql`
  query obtenerAreaCorte($id_corte: Int) {
    obtenerAreaCorte(id_corte: $id_corte)
  }
`;


// Obtener los pluviometros y lluvias
export const OBTENER_PLUVIOMETROS_QUERY = gql`
  query {
    obtenerPluviometrosYLluvias{
      id_pluviometro
      nombre
      listlluvias{
        id_lluvia
        fecha
        cantidad
      }
    }
  }
`;



// Obtener tablones por suerte
export const OBTENER_TABLONES_POR_CORTE_QUERY = gql`
  query obtenerTablonesPorCorte($id_corte: Int){
    obtenerTablonesPorCorte(id_corte: $id_corte){
      id_tablon
      numero
      area
    }
  }
`;


// Obtener tratamientos plagas
export const OBTENER_TRAPL_QUERY = gql`
  query obtenerTratamientoPlagas {
    obtenerTratamientoPlagas {
      id_trapl
      producto
      unidad
      cantidad
      tiempo
    }
  }
`;


// Obtener aplicacion plagas
export const OBTENER_APLA_QUERY = gql`
  query obtenerAplicacionPlagas($id_corte: Int, $id_tablon: Int, $id_trapl: Int){
    obtenerAplicacionPlagas(id_corte: $id_corte, id_tablon: $id_tablon, id_trapl: $id_trapl){
      id_apla
      fecha
    }
  }
`;


// Count tablones de cada suerte
export const COUNT_TABLONES_SUERTE_QUERY = gql`
  query countTablonesPorSuerte($id_suerte: Int) {
    countTablonesPorSuerte(id_suerte: $id_suerte)
  }
`;


// Obtener corte actual
export const OBTENER_CORTE_ACTUAL_QUERY = gql`
  query obtenerCorteActual($id_suerte: Int) {
    obtenerCorteActual(id_suerte: $id_suerte) {
      numero
      fecha_inicio
    }
  }
`;


// Obtener total hectareas
export const OBTENER_TOTAL_HTA_QUERY = gql`
  query obtenerTotalHtaSuertes {
    obtenerTotalHtaSuertes
  }
`;


// Obtener prontuario
export const CONSULTA_PRONTUARIO = gql`
  query consultaProntuario($nombre: String, $inicial: String, $final: String){
    consultaProntuario(nombre: $nombre, inicial: $inicial, final: $final){
      id_cosecha
      peso
      rendimiento
      cortePadre {
        id_corte
        numero
        fecha_siembra
        fecha_inicio
        fecha_corte
        area
        suertePadre {
          id_suerte
          nombre
          area
          variedad
        }
      }
    }
  }
`;



// Obtener Email
export const OBTENER_EMAIL_QUERY = gql`
  query obtenerEmail($email: String) {
    obtenerEmail(email: $email) {
      id_usuario
      nombre
      apellido
      email
      rol
    }
  }
`;


// Obtener labor para editar
export const OBTENER_LABOR_QUERY = gql`
  query obtenerLabor($id_labor: Int){
    obtenerLabor(id_labor: $id_labor){
      id_labor
      fecha
      actividad
      equipo
      estado
      pases
      aplico
      costo
      nota
    }
  }
`;



// Obtener aplicacion herbicidas para editar
export const OBTENER_APHE_QUERY = gql`
  query obtenerAplicacionHerbicida($id_aphe: Int){
    obtenerAplicacionHerbicida(id_aphe: $id_aphe){
      id_aphe
      tipo
      fecha
    }
  }
`;


// Obtener tratamientos herbicidas para editar
export const OBTENER_TRAHE_QUERY = gql`
  query obtenerTratamientoHerbicida($id_trahe: Int){
    obtenerTratamientoHerbicida(id_trahe: $id_trahe){
      id_trahe
      producto
      dosis
      presentacion
      valor
      aplico
      nota
    }
  }
`;



// Obtener aplicacion fertilizante para editar
export const OBTENER_APFE_QUERY = gql`
  query obtenerAlicacionFertilizante($id_apfe: Int) {
    obtenerAlicacionFertilizante(id_apfe: $id_apfe) {
      id_apfe
      fecha
      tipo
    }
  }
`;



// Obtener tratamientos fertilizante para editar
export const OBTENER_TRAFE_QUERY = gql`
  query obtenerTratamientoFertilizante($id_trafe: Int) {
    obtenerTratamientoFertilizante(id_trafe: $id_trafe) {
      id_trafe
      producto
      dosis
      presentacion
      valor
      aplico
      nota
    }
  }
`;


// Obtener tablon para editar
export const OBTENER_TABLON_QUERY = gql`
  query obtenerTablon($id_tablon: Int){
    obtenerTablon(id_tablon: $id_tablon){
      id_tablon
      numero
      area
    }
  }
`;



// Obtener tratamientos plaga para editar
export const OBTENER_TRAPLA_QUERY = gql`
  query obtenerTratamientoPlaga($id_trapl: Int) {
    obtenerTratamientoPlaga(id_trapl: $id_trapl) {
      id_trapl
      producto
      unidad
      cantidad
      tiempo
    }
  }
`;


// Obtener aplicacion plaga para editar
export const OBTENER_APPLA_QUERY = gql`
  query obtenerAplicacionPlaga($id_apla: Int){
    obtenerAplicacionPlaga(id_apla: $id_apla){
      id_apla
      fecha
    }
  }
`;




// Obtener datos actuales
export const OBTENER_DATOS_ACTUALES_QUERY = gql`
  query obtenerDatosActuales {
    obtenerDatosActuales {
      id_corte
      fecha_inicio
      fecha_corte
      listcosechas {
        peso
      }
      suertePadre {
        nombre
        area
        variedad
        zona
        renovada
        createdAt
      }
    }
  }
`;




// obtener suertes renovadas actuales
export const OBTENER_SUERTES_RENOVADAS_ACTUALES_QUERY = gql`
  query obtenerSuertesRenovadasActuales {
    obtenerSuertesRenovadasActuales {
      id_suerte
      nombre
      area
      variedad
      zona
      listcortes {
        id_corte
        numero
        fecha_siembra
        fecha_inicio
        fecha_corte
      }
    }
  }
`;



// OBTENER SUERTES RENOVADAS Y CORTES PARA MODAL TRANSFERIR INFORMACION
export const OBTENER_SUERTE_CORTE_MODAL = gql`
  query obtenerSuertesRenovadasYCortes {
    obtenerSuertesRenovadasYCortes {
      id_suerte
      nombre
      listcortes {
        id_corte
        numero
      }
    }
  }
`;

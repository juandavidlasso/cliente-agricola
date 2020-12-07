import gql from 'graphql-tag'

// Registrar usuario
export const NUEVO_USUARIO_MUTATION = gql`
  mutation agregarUsuario($input: UsuarioInput) {
    agregarUsuario(input : $input){
      id_usuario
      nombre
      apellido
      email
      password
      rol
    }
  }
`;

// Autenticar usuario en login
export const AUTENTICAR_USUARIO_MUTATION = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input : $input) {
      token
    }
  }
`;

// Agregar suerte
export const NUEVA_SUERTE_MUTATION = gql`
  mutation agregarSuerte($input: SuerteInput){
    agregarSuerte(input : $input) {
      id_suerte
      nombre
      variedad
      zona
      renovada
    }
  }
`;


// Agregar suerte renovada
export const NUEVA_SUERTE_RENOVADA_MUTATION = gql`
  mutation agregarSuerteRenovada($suerte: SuerteInput){
    agregarSuerteRenovada(suerte : $suerte) {
      id_suerte
      nombre
      variedad
      zona
      renovada
    }
  }
`;


// Agregar tablones
export const NUEVO_TABLON_MUTATION = gql`
  mutation agregarTablon($input: TablonInput, $id_corte: Int){
    agregarTablon(input: $input, id_corte: $id_corte){
      id_tablon
      numero
      area
      corte_id
    }
  }
`;


// Agregar corte
export const NUEVO_CORTE_MUTATION = gql`
  mutation agregarCorte($input: CorteInput){
    agregarCorte(input: $input){
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

// Actualizar corte
export const ACTUALIZAR_CORTE_MUTATION = gql`
  mutation actualizarCorte($id_corte: Int, $input: CorteInput){
    actualizarCorte(id_corte: $id_corte, input: $input){
      numero
      fecha_siembra
      fecha_inicio
      fecha_corte
      activo
      estado
      suerte_id
    }
  }
`;


// Agregar labor
export const NUEVA_LABOR_MUTATION = gql`
  mutation agregarLabor($input: LaboresInput){
    agregarLabor(input: $input){
      id_labor
      fecha
      actividad
      equipo
      estado
      pases
      aplico
      costo
      nota
      corte_id
    }
  }
`;


// Agregar aplicacion herbicida
export const NUEVA_APHE_MUTATION = gql`
  mutation agregarAplicacionHerbicida($input: AplicacionHerbicidasInput){
    agregarAplicacionHerbicida(input: $input){
      id_aphe
      fecha
      tipo
    }
  }
`;


// Agregar tratamiento herbicida
export const NUEVO_TRHE_MUTATION = gql`
  mutation agregarTratamientoHerbicida($input: TratamientoHerbicidasInput){
    agregarTratamientoHerbicidas(input: $input){
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

// Agregar aplicacion fertilizante
export const NUEVA_APFE_MUTATION = gql`
  mutation agregarAplicacionFertilizante($input: AplicacionFertilizantesInput){
    agregarAplicacionFertilizante(input: $input){
      id_apfe
      fecha
      tipo
    }
  }
`;

// Agregar tratamiento fertilizante
export const NUEVO_TRFE_MUTATION = gql`
  mutation agregarTratamientoFertilizante($input: TratamientoFertilizantesInput){
    agregarTratamientoFertilizante(input: $input){
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


// Agregar pluviometros
export const NUEVO_PLUVIOMETRO_MUTATION = gql`
  mutation agregarPluviometro($input: PluviometroInput){
    agregarPluviometro(input: $input){
      id_pluviometro
      nombre
    }
  }
`;


// Agregar lluvia
export const NUEVA_LLUVIA_MUTATION = gql`
  mutation agregarLluvia($input: LluviaInput){
    agregarLluvia(input: $input){
      id_lluvia
      fecha
      cantidad
    }
  }
`;


// Agregar cosecha
export const NUEVA_COSECHA_MUTATION = gql`
  mutation agregarCosecha($input: CosechaInput){
    agregarCosecha(input: $input){
      id_cosecha
      peso
      rendimiento
      corte_id
    }
  }
`;

// Actualizar cosecha
export const ACTUALIZAR_COSECHA_MUTATION = gql`
  mutation actualizarCosecha($id_cosecha: Int, $input: CosechaInput){
    actualizarCosecha(id_cosecha: $id_cosecha, input: $input){
      peso
      rendimiento
      corte_id
    }
  }
`;


// Agregar tratamiento plaga
export const NUEVO_TRAPL_MUTATION = gql`
  mutation agregarTratamientoPlaga($input: TratamientoPlagaInput) {
    agregarTratamientoPlaga(input: $input) {
      id_trapl
      producto
      unidad
      cantidad
      tiempo
    }
  }
`;


// Agregar aplicacion plaga
export const NUEVA_APLA_MUTATION = gql`
  mutation agregarAplicacionPlaga($input: AplicacionPlagaInput){
    agregarAplicacionPlaga(input: $input){
      fecha
      corte_id
      tablon_id
      trapl_id
    }
  }
`;


// Actualizar email
// export const ACTUALIZAR_USUARIO_MUTATION = gql`
//   mutation actualizarEmail($id_usuario: Int, $input: UsuarioInput) {
//     actualizarEmail(id_usuario: $id_usuario, input: $input) {
//       nombre
//       apellido
//       email
//       password
//     }
//   }
// `;



// Actualizar suerte
export const ACTUALIZAR_SUERTE_MUTATION = gql`
  mutation actualizarSuerte($id_suerte: Int, $input: SuerteInput) {
    actualizarSuerte(id_suerte: $id_suerte, input: $input) {
      id_suerte
      nombre
      variedad
      zona
      renovada
    }
  }
`;



// Actualizar labor
export const ACTUALIZAR_LABOR_MUTATION = gql`
  mutation actualizarLabor($id_labor: Int, $input: LaboresInput) {
    actualizarLabor(id_labor: $id_labor, input: $input) {
      id_labor
      fecha
      actividad
      equipo
      estado
      pases
      aplico
      costo
      nota
      corte_id
    }
  }
`;



// Actualizar aplicacion herbicida
export const ACTUALIZAR_APHE_MUTATION = gql`
  mutation actualizarAPHE($id_aphe: Int, $input: AplicacionHerbicidasInput) {
    actualizarAPHE(id_aphe: $id_aphe, input: $input) {
      id_aphe
      tipo
      fecha
      corte_id
    }
  }
`;



// Actualizar tratamiento herbicida
export const ACTUALIZAR_TRAHE_MUTATION = gql`
  mutation actualizarTRAHE($id_trahe: Int, $input: TratamientoHerbicidasInput) {
    actualizarTRAHE(id_trahe: $id_trahe, input: $input) {
      id_trahe
      producto
      dosis
      presentacion
      valor
      aplico
      nota
      aphe_id
    }
  }
`;



// Actualizar aplicacion fertilizante
export const ACTUALIZAR_APFE_MUTATION = gql`
  mutation actualizarAPFE($id_apfe: Int, $input: AplicacionFertilizantesInput) {
    actualizarAPFE(id_apfe:$id_apfe, input: $input) {
      id_apfe
      tipo
      fecha
      corte_id
    }
  }
`;



// Actualizar tratamiento fertilizante
export const ACTUALIZAR_TRAFE_MUTATION = gql`
  mutation actualizarTRAFE($id_trafe: Int, $input: TratamientoFertilizantesInput) {
    actualizarTRAFE(id_trafe: $id_trafe, input: $input) {
      id_trafe
      producto
      dosis
      presentacion
      valor
      aplico
      nota
      apfe_id
    }
  }
`;



// Actualizar aplicacion plaga
export const ACTUALIZAR_APLA_MUTATION = gql`
  mutation actualizarAPLA($id_apla: Int, $input: AplicacionPlagaInput) {
    actualizarAPLA(id_apla: $id_apla, input: $input) {
      id_apla
      fecha
      corte_id
      tablon_id
      trapl_id
    }
  }
`;



// Actualizar tratamiento plaga
export const ACTUALIZAR_TRAPL_MUTATION = gql`
  mutation actualizarTRAPL($id_trapl: Int, $input: TratamientoPlagaInput) {
    actualizarTRAPL(id_trapl: $id_trapl, input: $input) {
      id_trapl
      producto
      unidad
      cantidad
      tiempo
    }
  }
`;



// Actualizar tablon
export const ACTUALIZAR_TABLON_MUTATION = gql`
  mutation actualizarTablon($id_tablon: Int, $input: TablonInput) {
    actualizarTablon(id_tablon: $id_tablon, input: $input) {
      id_tablon
      numero
      area
      corte_id
    }
  }
`;


// Actualizar Usuario
export const ACTUALIZAR_USER_MUTATION = gql`
  mutation actualizarUsuario($id_usuario: Int, $input: UsuarioInput) {
    actualizarUsuario(id_usuario: $id_usuario, input: $input) {
      nombre
      apellido
      email
    }
  }
`;



// Terminar ciclo corte
export const CERRAR_CICLO_CORTE_MUTATION = gql`
  mutation terminarCorte($id_corte: Int, $input: CorteInput) {
    terminarCorte(id_corte: $id_corte, input: $input) {
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


// Eliminar suerte
export const ELIMINAR_SUERTE_MUTATION = gql`
  mutation borrarSuerte($id_suerte: Int!) {
    borrarSuerte(id_suerte: $id_suerte) {
      success
    }
  }
`;



// Eliminar Tablo
export const ELIMINAR_TABLON_MUTATION = gql`
  mutation eliminarTablon($id_tablon: Int) {
    eliminarTablon(id_tablon: $id_tablon){
      success
    }
  }
`;



// Actualizar pluviometro
// mutation actualizarPluviometro($id_pluviometro: Int, $input: PluviometroInput) {
//   actualizarPluviometro(id_pluviometro: $id_pluviometro, input: $input) {
//     id_pluviometro
//     nombre
//   }
// }



// Actualizar lluvia
// mutation actualizarLluvia($id_lluvia: Int, $input: LluviaInput) {
//   actualizarLluvia(id_lluvia: $id_lluvia, input: $input) {
//     id_lluvia
//     fecha
//     cantidad
//     pluviometro_id
//   }
// }
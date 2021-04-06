// VALIDACIONES PARA EL USUARIO

// Validar campos de texto
export const validarTexto = campo => {
  var patron = /^[a-zA-Z\s]+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}


// Validar Password usuario
export const validarPass = campo => {
  var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}


// Validar email usuario
export const validarEmail = campo => {
  var patron = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}

// VALIDACIONES PARA LA SUERTE

// Validar area suerte
export const validarArea = campo => {
  var patron = /^[0-9.\s]+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}

// Validar variedad suerte
export const validarVariedad = campo => {
  var patron = /^[0-9a-zA-Z-\s]+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}


// Validar zona agroecologica suerte
export const validarZona = campo => {
  var patron = /^[a-zA-Z0-9]+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}


// VALIDACIONES GENERALES

// Validar numero decimal
export const validarDecimal = campo => {
  var patron = /^[0-9.\s]+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}


// VALIDACIONES PARA LABORES

// Validar costo labor
export const validarCostoLabor = campo => {
  var patron = /^[0-9\s]+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}


// VALIDACIONES PARA TRATAMIENTOS HERBICIDAS Y FERTILIZANTES

// Validar dosis
export const validarDosis = campo => {
  var patron = /^[0-9.\s]+$/
  if(patron.test(campo) || campo === '') {
    return true
  } else {
    return false
  }
}

// Validar costo tratamientos
export const validarCostoTratamientos = campo => {
  var patron = /^[0-9\s]+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}

// Validar ano y mes
export const validarMesLluvia = campo => {
  var patron = /^([0-9\s]{4}[-]{1}[0-9]{2})+$/
  if(patron.test(campo)) {
    return true
  } else {
    return false
  }
}
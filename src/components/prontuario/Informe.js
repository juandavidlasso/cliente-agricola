import React from 'react'
import logo from '../../imagenes/logo.png'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import moment from 'moment'
// Create styles
const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "99vh"
  },
  body: {
    marginTop: 5
  },
  image: {
    width: '10%',
    display: 'block',
    margin: 'auto'
  },
  title: {
    margin: 10,
    fontSize: 25,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  name: {
    fontSize: 16,
    textAlign: 'center'
  },
  tablebody: {
    margin: 4,
    marginTop: 20
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderBottomWidth: 0,
    textAlign: 'center'
  }, 
  tableRow: { 
    flexDirection: "row"
  }, 
  tableCol1Header: { 
    //backgroundColor: 'blue',
    width: 52, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderRightWidth: 1,
    borderTopWidth: 0
  },     
  tableColHeader: { 
    //backgroundColor: 'yellow',
    width: 52, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  }, 
  tableColHeaderFE: { 
    //backgroundColor: 'brown',
    width: 60, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  },
  tableColHeaderTC: { 
    //backgroundColor: 'gray',
    width: 44, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  },  
  tableColHeader1: { 
    //backgroundColor: 'green',
    width: 67, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderRightWidth: 0,
    borderTopWidth: 0
  },  
  tableCol1: { 
    width: 52, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },   
  tableCol: { 
    //backgroundColor: 'orange',
    width: 52, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableColFE: { 
    //backgroundColor: 'purple',
    width: 60, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableColTC: { 
    //backgroundColor: 'red',
    width: 44, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableColx: { 
    //backgroundColor: 'pink',
    width: 67, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderRightWidth: 0,
    borderTopWidth: 0 
  }, 
  tableCellHeader: {
    margin: 5, 
    fontSize: 10,
    fontWeight: 500
  },  
  tableCell: { 
    margin: 5, 
    fontSize: 10 
  }
  });

const Informe = ({data}) => {

    // const datos = data.consultaProntuario
    // console.log(datos);
    
    
    return (
      <Document title="Informe Cosecha">
        <Page size="A4">

          {/*Imagen*/}
          <View style={styles.body}>
            <Image style={styles.image} src={logo} />
          </View>

          {/*Titulo*/}
          <Text style={styles.title}>Agrícola L&M S.A.S.</Text>

          {/*Subtitulo*/}
          <Text style={styles.name}>Prontuario</Text>
                  

          {/*Tabla*/}
            <View style={styles.tablebody}>
              <View style={styles.table}> 
                <View style={styles.tableRow}> 
                  <View style={styles.tableCol1Header}> 
                    <Text style={styles.tableCellHeader}>Suerte</Text> 
                  </View> 
                  <View style={styles.tableColHeader}> 
                    <Text style={styles.tableCellHeader}>Área</Text> 
                  </View> 
                  <View style={styles.tableColHeader}> 
                    <Text style={styles.tableCellHeader}>Variedad</Text> 
                  </View> 
                  <View style={styles.tableColHeader}> 
                    <Text style={styles.tableCellHeader}>Corte No.</Text> 
                  </View> 
                  <View style={styles.tableColHeaderFE}> 
                    <Text style={styles.tableCellHeader}>Fecha Siembra</Text> 
                  </View> 
                  <View style={styles.tableColHeaderFE}> 
                    <Text style={styles.tableCellHeader}>Fecha Corte</Text> 
                  </View> 
                  <View style={styles.tableColHeader}> 
                    <Text style={styles.tableCellHeader}>Edad Corte</Text> 
                  </View> 
                  <View style={styles.tableColHeaderTC}> 
                    <Text style={styles.tableCellHeader}>TCH</Text> 
                  </View> 
                  <View style={styles.tableColHeaderTC}> 
                      <Text style={styles.tableCellHeader}>TCHM</Text> 
                  </View> 
                  <View style={styles.tableColHeader}> 
                      <Text style={styles.tableCellHeader}>Peso</Text> 
                  </View> 
                  <View style={styles.tableColHeader1}> 
                      <Text style={styles.tableCellHeader}>Rendimiento</Text> 
                  </View> 
                </View>
                      
                {data.consultaProntuario.map(cosecha => {
                  const finicio = moment(cosecha.cortePadre.fecha_inicio)
                  const fcorte = moment(cosecha.cortePadre.fecha_corte)
                  const edadCorte = fcorte.diff(finicio, 'months', true).toFixed(1)
                  const tch = Number((cosecha.peso/cosecha.cortePadre.area).toFixed(1))
                  const tchm = Number((tch/edadCorte).toFixed(1))
                  return (
                    <View style={styles.tableRow} key={cosecha.id_cosecha}>
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{cosecha.cortePadre.suertePadre.nombre}</Text> 
                      </View> 
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{cosecha.cortePadre.area ? (cosecha.cortePadre.area).toFixed(2) : 0}</Text> 
                      </View> 
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{cosecha.cortePadre.suertePadre.variedad}</Text>  
                      </View>
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{cosecha.cortePadre.numero}</Text> 
                      </View> 
                      <View style={styles.tableColFE}> 
                        <Text style={styles.tableCell}>{cosecha.cortePadre.fecha_siembra}</Text> 
                      </View> 
                      <View style={styles.tableColFE}> 
                        <Text style={styles.tableCell}>{cosecha.cortePadre.fecha_corte}</Text> 
                      </View> 
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{edadCorte}</Text> 
                      </View> 
                      <View style={styles.tableColTC}> 
                        <Text style={styles.tableCell}>{tch}</Text> 
                      </View> 
                      <View style={styles.tableColTC}> 
                        <Text style={styles.tableCell}>{tchm}</Text> 
                      </View> 
                      <View style={styles.tableCol}> 
                        <Text style={styles.tableCell}>{cosecha.peso}</Text> 
                      </View> 
                      <View style={styles.tableColx}> 
                        <Text style={styles.tableCell}>{cosecha.rendimiento}</Text> 
                      </View> 
                    </View>
                  )
                })}                             
              </View>
            </View>

          </Page>
      </Document>
        
    )
}

export default Informe
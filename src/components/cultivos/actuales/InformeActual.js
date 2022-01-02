import React, { Fragment } from 'react'
import logo from '../../../imagenes/logo.png'
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
    marginLeft: 20,
    marginRight: 20,
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
    width: 72, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  }, 
  tableColHeaderA: { 
    //backgroundColor: 'brown',
    width: 70, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0
  },
  tableColHeaderB: { 
    //backgroundColor: 'brown',
    width: 92, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
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
    width: 72, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableColA: { 
    //backgroundColor: 'purple',
    width: 70, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableColB: { 
    //backgroundColor: 'orange',
    width: 92, 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },
  tableCellHeader: {
    margin: 5, 
    fontSize: 8,
    fontWeight: 500
  },  
  tableCell: { 
    margin: 5, 
    fontSize: 10 
  }
  });

const InformeActual = ({data}) => {
        
    return (
        <Document title="Informe Datos Actuales">
            <Page size="A4">

                {/*Imagen*/}
                <View style={styles.body}>
                    <Image style={styles.image} src={logo} />
                </View>

                {/*Titulo*/}
                <Text style={styles.title}>Agrícola L&M S.A.S.</Text>

                {/*Subtitulo*/}
                <Text style={styles.name}>Datos Actuales</Text>
                    

                {/*Tabla*/}
                <View style={styles.tablebody}>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableCol1Header}> 
                                <Text style={styles.tableCellHeader}>Suerte</Text> 
                            </View> 
                            <View style={styles.tableCol1Header}> 
                                <Text style={styles.tableCellHeader}>Área</Text> 
                            </View> 
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Variedad</Text> 
                            </View> 
                            <View style={styles.tableColHeaderB}> 
                                <Text style={styles.tableCellHeader}>Zona Agroecológica</Text> 
                            </View> 
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Fecha Último Corte</Text> 
                            </View> 
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Último TCH</Text> 
                            </View> 
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>Edad Actual (meses)</Text> 
                            </View> 
                            <View style={styles.tableColHeaderA}> 
                                <Text style={styles.tableCellHeader}># Corte Actual</Text> 
                            </View>  
                        </View>
                                
                        {data.obtenerDatosActuales.map(actuales => {
                            const {id_corte, area, fecha_inicio, fecha_corte, listcosechas, suertePadre} = actuales
                            const {nombre, variedad, zona, renovada, createdAt} = suertePadre
                            const areaActual = Number(fecha_inicio)
                            return (
                                <View style={styles.tableRow} key={id_corte}>
                                    <View style={styles.tableCol1}> 
                                        <Text style={styles.tableCell}>{nombre}</Text> 
                                    </View> 
                                    <View style={styles.tableCol1}> 
                                        <Text style={styles.tableCell}>{areaActual ? (areaActual).toFixed(2) : null}</Text> 
                                    </View> 
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{variedad}</Text>  
                                    </View>
                                    <View style={styles.tableColB}> 
                                        <Text style={styles.tableCell}>{zona}</Text> 
                                    </View> 
                                    <View style={styles.tableCol}> 
                                        <Text style={styles.tableCell}>{fecha_corte}</Text> 
                                    </View> 
                                    {listcosechas.length === 0 ?
                                        <Fragment>
                                            <View style={styles.tableCol}> 
                                                <Text style={styles.tableCell}></Text> 
                                            </View>
                                            <View style={styles.tableCol}> 
                                                <Text style={styles.tableCell}></Text> 
                                            </View>
                                            <View style={styles.tableColA}> 
                                                <Text style={styles.tableCell}></Text> 
                                            </View>
                                        </Fragment>
                                    :
                                        listcosechas.map(cosechas => {
                                            const {id_cosecha, peso} = cosechas
                                            const TCH = Number(peso/area).toFixed(2)
                                            // Edad actual
                                            const now = moment().format('YYYY-MM-DD')
                                            const factual = moment(now)
                                            const finicio = moment(createdAt)
                                            const edadActual = factual.diff(finicio, 'months', true).toFixed(1)
                                            return (
                                                <Fragment key={id_cosecha}>
                                                    <View style={styles.tableCol}> 
                                                        <Text style={styles.tableCell}>{TCH ? TCH : null}</Text> 
                                                    </View>
                                                    <View style={styles.tableCol}> 
                                                        <Text style={styles.tableCell}>{createdAt ? edadActual : null}</Text> 
                                                    </View>
                                                    <View style={styles.tableColA}> 
                                                        <Text style={styles.tableCell}>{renovada ? renovada : null}</Text> 
                                                    </View>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })}                             
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default InformeActual
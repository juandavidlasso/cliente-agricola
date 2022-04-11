import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

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
        marginVertical: 5,
        marginHorizontal: 100,
        width: '15%',
        alignSelf: 'center'
    },
    title: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 4,
        marginTop: 1,
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
    tableColHeaderP: {
        // backgroundColor: 'yellow',
        width: 70,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    tableColHeader: {
        // backgroundColor: 'green',
        width: '84vw',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeaderD: {
        // backgroundColor: 'pink',
        width: '2.8vw',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeaderPD: {
        // backgroundColor: 'blue',
        width: 60,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0
    },
    tableRowP: {
        flexDirection: "row",
        marginLeft: 70,
        marginRight: 60
    },
    tableColHeaderPI: {
        // backgroundColor: 'yellow',
        width: 70,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1
    },
    tableColHeaderPID: {
        // backgroundColor: 'brown',
        width: 60,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderRightWidth: 0
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 10,
        fontWeight: 500,
        textTransform: 'capitalize'
    },
    tableCell: {
        margin: 5,
        fontSize: 8
    },
    tableCellT: {
        margin: 7,
        fontSize: 9
    }
});

const InformeLluviasActuales = ({data, fechaActal, year, listaDias, dataSuertes}) => {

    return (
        <Document title="Listado de lluvias">
            <Page size="A4" orientation='landscape'>

                {/*Imagen*/}
                <View style={styles.body}>
                    <Image style={styles.image} src={`https://cliente-agricola.vercel.app/static/media/logo.e11f10d35a627b5c5978.png`} />
                </View>

                {/*Titulo*/}
                <Text style={styles.title}>Agrícola L&M S.A.S.</Text>

                {/*Subtitulo*/}
                <Text style={styles.name}>Listado de lluvias</Text>    

                {/*Tabla*/}
                <View style={styles.tablebody}>
                    <View style={styles.table}> 
                        <View style={styles.tableRow}> 
                            <View style={styles.tableColHeaderP}> 
                                <Text style={styles.tableCellHeader}>Pluviómetro</Text> 
                            </View> 
                            <View style={styles.tableColHeader}> 
                                <Text style={styles.tableCellHeader}>{fechaActal} - {year}</Text> 
                            </View>
                            <View style={styles.tableColHeaderPD}> 
                                <Text style={styles.tableCellHeader}>Total mes</Text> 
                            </View> 
                        </View>

                        {/* Meses */}
                        <View style={styles.tableRowP}>
                            {listaDias.map(dias => (
                                <View style={styles.tableColHeader} key={dias.idDia}>
                                    <Text style={styles.tableCellHeader} key={dias.idDia}>{dias.dia}</Text>
                                </View>
                            ))}
                        </View>
                        {/* Termina meses */}
                            
                        {data.obtenerResumenPluviometro.map(pluviometros => {
                            const {id_pluviometro, nombre, suertesAsociadas, listlluvias} = pluviometros
                            const total = Number(suertesAsociadas)
                            return (
                                <View style={styles.tableRow} key={id_pluviometro}>
                                    <View style={styles.tableColHeaderPI}>
                                        <Text style={styles.tableCell}>
                                            {`${nombre}\n`}
                                            {dataSuertes.length === 0 ?
                                                null
                                            :
                                                dataSuertes.map(asociadas => (
                                                    asociadas.nombre === nombre ? asociadas.suertesAsociadas === "" ?
                                                            null
                                                        :
                                                        <Text style={styles.tableCell} key={id_pluviometro}>Suerte {asociadas.suertesAsociadas}</Text>
                                                    :
                                                        null
                                                ))
                                            }
                                        </Text>
                                    </View>
                                    {listaDias.map(dias => (
                                        <View style={styles.tableColHeaderD} key={dias.idDia}>
                                            {listlluvias.length === 0 ?
                                                null
                                            :
                                                listlluvias.map(lluvias => {
                                                    const {id_lluvia, cantidad, fecha} = lluvias
                                                    const nuevaFecha = Number(fecha.split('-')[2])
                                                    var fechaNueva
                                                    nuevaFecha[0] === 0 ? fechaNueva = nuevaFecha.slice(1) : fechaNueva = nuevaFecha
                                                    return (
                                                        fechaNueva === dias.dia ?
                                                            <Text
                                                                style={styles.tableCell}
                                                                key={id_lluvia}
                                                            >
                                                                {cantidad}
                                                            </Text>
                                                        :
                                                            null
                                                    )
                                                })
                                            }
                                        </View>
                                    ))}
                                    <View style={styles.tableColHeaderPID}>
                                        <Text style={styles.tableCellT}>{(total).toFixed(0)}</Text>
                                    </View>
                                </View>
                            )
                        })}                             
                    </View>
                </View>
            </Page>
        </Document>
    );
}
 
export default InformeLluviasActuales;
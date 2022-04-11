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
        width: '7vw',
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
    }
});

const InformeLluviasAno = ({pluviometros, datos, total, listaMeses, fecdate}) => {

    const {obtenerPluviometros} = pluviometros

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
                                <Text style={styles.tableCellHeader}>Mes - {fecdate}</Text> 
                            </View>
                            <View style={styles.tableColHeaderPD}> 
                                <Text style={styles.tableCellHeader}>Total</Text> 
                            </View> 
                        </View>

                        {/* Meses */}
                        <View style={styles.tableRowP}>
                            {listaMeses.map(meses => (
                                <View style={styles.tableColHeader} key={meses.idMes}>
                                    <Text style={styles.tableCellHeader} key={meses.idMes}>{meses.idMes}</Text>
                                </View>
                            ))}
                        </View>
                        {/* Termina meses */}
                            
                        {obtenerPluviometros.map(pluviometro => {
                            const {id_pluviometro, nombre, suertesAsociadas} = pluviometro
                            return (
                                <View style={styles.tableRow} key={id_pluviometro}>
                                    <View style={styles.tableColHeaderPI}>
                                        <Text style={styles.tableCell}>
                                            {`${nombre}\n`}
                                            { suertesAsociadas === '' ?
                                                null
                                            :
                                                <Text style={[styles.tableCell , { fontWeight: 'bold'}]}>Suerte {suertesAsociadas}</Text>
                                            }
                                        </Text>
                                    </View>
                                    {listaMeses.map(meses => (
                                        <View style={styles.tableColHeaderD} key={meses.idMes}>
                                            {datos.length === 0 ?
                                                null
                                            :
                                                datos.map(lluvias => {
                                                    const {id_lluvia, fecha, cantidad, pluviometro_id} = lluvias
                                                    const fechaLluvia = Number(fecha.split('-')[1])
                                                    return (
                                                        pluviometro_id === id_pluviometro ? fechaLluvia === meses.idMes ?
                                                            <Text
                                                                style={styles.tableCell}
                                                                key={id_lluvia}
                                                            >
                                                                {(cantidad).toFixed(1)}
                                                            </Text>
                                                        :
                                                            null
                                                        :
                                                            null
                                                    )
                                                })
                                            }
                                        </View>
                                    ))}
                                    <View style={styles.tableColHeaderPID}>
                                        {total.length === 0 ?
                                            0
                                        :
                                            total.map(totales => (
                                                totales.pluviometro_id === id_pluviometro ?
                                                    <Text style={styles.tableCell} key={totales.id_lluvia}>
                                                        {(totales.cantidad).toFixed(0)}
                                                    </Text>
                                                :
                                                    null
                                            ))
                                        }
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
 
export default InformeLluviasAno;
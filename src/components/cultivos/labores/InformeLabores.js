import React from 'react'
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
    tableColHeader: {
        //backgroundColor: 'yellow',
        width: 110,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColHeaderF: {
        //backgroundColor: 'yellow',
        width: 110,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 10,
        fontWeight: 500
    },
    tableColCell: {
        //backgroundColor: 'orange',
        width: 110,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColCellF: {
        //backgroundColor: 'orange',
        width: 110,
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    }
})

const InformeLabores = ({data}) => {
    return (
        <Document title="Informe Labores">
            <Page size="A4" orientation='landscape'>

                {/*Imagen*/}
                <View style={styles.body}>
                <Image style={styles.image} src={'https://cliente-agricola.vercel.app/static/media/logo.e11f10d35a627b5c5978.png'} />
                </View>

                {/*Titulo*/}
                <Text style={styles.title}>Agrícola L&M S.A.S.</Text>

                {/*Subtitulo*/}
                <Text style={styles.name}>Labores</Text>
                        

                {/*Tabla*/}
                <View style={styles.tablebody}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Fecha</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Labor</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Equipo</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Estado</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>No. Pases</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Realizado por</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Costo Hectárea</Text>
                            </View>
                            <View style={styles.tableColHeaderF}>
                                <Text style={styles.tableCellHeader}>Nota</Text>
                            </View>
                        </View>
                            
                        {data.obtenerLaborPorCorte.map(labor => {
                            const {id_labor, fecha, actividad, equipo, estado, pases, aplico, costo, nota} = labor
                            return (
                            <View style={styles.tableRow} key={id_labor}>
                                <View style={styles.tableColCell}>
                                    <Text style={styles.tableCell}>{fecha}</Text>
                                </View>
                                <View style={styles.tableColCell}>
                                    <Text style={styles.tableCell}>{actividad}</Text>
                                </View>
                                <View style={styles.tableColCell}>
                                    <Text style={styles.tableCell}>{equipo ? equipo : null}</Text>
                                </View>
                                <View style={styles.tableColCell}>
                                    <Text style={styles.tableCell}>{estado ? estado : null}</Text>
                                </View>
                                <View style={styles.tableColCell}>
                                    <Text style={styles.tableCell}>{pases ? pases : null}</Text>
                                </View>
                                <View style={styles.tableColCell}>
                                    <Text style={styles.tableCell}>{aplico ? aplico : null}</Text>
                                </View>
                                <View style={styles.tableColCell}>
                                    <Text style={styles.tableCell}>{costo ? costo : null}</Text>
                                </View>
                                <View style={styles.tableColCellF}>
                                    <Text style={styles.tableCell}>{nota ? nota : null}</Text>
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
 
export default InformeLabores;
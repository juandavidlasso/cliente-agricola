import React, { useState } from 'react';
import { Offcanvas, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import Spinner from '../../Spinner'
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'
import Swal from 'sweetalert2'
// GraphQL
import {OBTENER_PLUVIOMETROS_Y_LLUVIAS} from '../../../apollo/querys'
import {ELIMINAR_LLUVIA_MUTATION} from '../../../apollo/mutations'
import { useQuery, useMutation } from '@apollo/client'

const Panel = ({setEditar, setIdLluvia, setFechaLluvia, setCantidadLluvia, setIdPluviometro}) => {

    // query hook
    const {data, loading, error} = useQuery(OBTENER_PLUVIOMETROS_Y_LLUVIAS)

    // estado
    const [ activo, actualizarActivo ] = useState(true)

    // mutation
    const [ eliminarLluvia ] = useMutation(ELIMINAR_LLUVIA_MUTATION)

    if(loading) return <Spinner />
    if(error) return null

    // submit eliminar lluvia
    const submitEliminarLluvia = async(lluviaId) => {

        const id_lluvia = lluviaId

        Swal.fire({
            title: 'Atención',
            text: "Esta acción no se puede deshacer. Desea eliminar la lluvia?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, Eliminar',
            confirmButtonColor: '#1b5e20',
            cancelButtonText: 'No, Cancelar',
            cancelButtonColor: '#b71c1c',
            allowOutsideClick: false,
            customClass: {
                popup: 'borde-popup-war',
                content: 'contenido-popup-war',
                title: 'title-popup-war'
            }
        }).then( async (result) => {
            if (result.value) {
                actualizarActivo(false)
                try {
                    await eliminarLluvia({
                        variables: {
                            id_lluvia
                        },
                        refetchQueries: [
                            { query: OBTENER_PLUVIOMETROS_Y_LLUVIAS }
                        ]
                    })

                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'La lluvia se eliminó correctamente.',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        customClass: {
                            popup: 'borde-popup',
                            content: 'contenido-popup',
                            title: 'title-popup'
                        }
                    })
                    actualizarActivo(true)
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: (error.message.replace('GraphQL error: ', '')),
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#0d47a1',
                        allowOutsideClick: false,
                        customClass: {
                            popup: 'borde-popup',
                            content: 'contenido-popup',
                            title: 'title-popup'
                        }
                    })
                    actualizarActivo(true)
                }
            } else {
                actualizarActivo(true)
            }
        })
    }

    // submit editar lluvia
    const submitEditarLluvia = async(idlluvia, feclluvia, cantlluvia, idpluviometrolluvia) => {
        setIdLluvia(idlluvia)
        setFechaLluvia(feclluvia)
        setCantidadLluvia(cantlluvia)
        setIdPluviometro(idpluviometrolluvia)
        setEditar(true)
    }

    return (
        <Offcanvas show={true} placement='end'>
            <Offcanvas.Header>
                <Offcanvas.Title>Gestionar lluvias</Offcanvas.Title>
                <i className='material-icons small' onClick={() => window.location.reload()} style={{cursor: 'pointer'}}>close</i>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {data.obtenerPluviometrosYLluvias.length === 0 ?
                    'No hay lluvias registradas'
                :
                    <Collapsible accordion>
                        {data.obtenerPluviometrosYLluvias.map(pluviometros => {
                            const {id_pluviometro, nombre, suertesAsociadas, listlluvias} = pluviometros
                            return (
                                <CollapsibleItem
                                    expanded={false}
                                    header={'Pluviometro '+ nombre + ' - Suertes ' + suertesAsociadas}
                                    icon={<Icon>filter_drama</Icon>}
                                    node="div"
                                    key={id_pluviometro}
                                >
                                    <table className='table table-hover'>
                                            <thead className='white-text' style={{background: '#2E4053'}}>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Cantidad</th>
                                                    <th>Edición</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {listlluvias.map(lluvias => {
                                                    const {id_lluvia, fecha, cantidad} = lluvias
                                                    return (
                                                        <tr key={id_lluvia}>
                                                            <td>{fecha}</td>
                                                            <td>{cantidad}</td>
                                                            <td>
                                                                <ButtonGroup>
                                                                    <DropdownButton as={ButtonGroup} title="Acción" drop='start'>
                                                                        <Dropdown.Item eventKey="1" onClick={() => submitEditarLluvia(id_lluvia, fecha, cantidad, id_pluviometro)}>Editar</Dropdown.Item>
                                                                        <Dropdown.Item eventKey="2" disabled={!activo} onClick={() => submitEliminarLluvia(id_lluvia)}>Eliminar</Dropdown.Item>
                                                                    </DropdownButton>
                                                                </ButtonGroup>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                </CollapsibleItem>
                            )
                        })}
                    </Collapsible>
                }
            </Offcanvas.Body>
        </Offcanvas>
    );
}
 
export default Panel;
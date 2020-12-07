import React, { useEffect, Fragment } from 'react'
import Lluvia from './Lluvia'
import { Link } from 'react-router-dom'

const Pluviometro = ({pluviometro, corte, props, estado}) => {

    const {id_corte} = corte 
    const id_suerte = props
    const {id_pluviometro, nombre, listlluvias} = pluviometro
    const rol = sessionStorage.getItem('rol')

    useEffect(() => {
        const M = window.M
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems);
    }, [])

    return (
        <li>
            <div className="collapsible-header">
                <i className="fa fa-thermometer-half"></i>
                <span className="ahover">Pluviometro {nombre}</span>
                {rol === '1' ? estado === true ?
                    <Fragment>
                        <Link to={{
                                pathname:`/lluvia/register/${id_pluviometro}/${id_corte}/${id_suerte}`,
                                state:{pluviometro:pluviometro}
                            }} 
                            className="btn btn-warning btn-sm botontablon">+ Registrar lluvia
                        </Link>
                    </Fragment>
                :
                    null
                :
                    null
                }
            </div>
            <div className="collapsible-body">
            {listlluvias.length === 0 ? 'No hay lluvias registradas.' : (
                <table className="table responsive-table centered table-striped table-bordered tablalabores">
                    <thead className="text-white" style={{backgroundColor: "#283747"}}>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Cantidad (MM)</th>
                        </tr>
                    </thead>

                <tbody className="white">
                    {listlluvias.map(lluvia => (
                        <Lluvia key={lluvia.id_lluvia} lluvia={lluvia} />
                    ))}
                </tbody>
                </table>
            )}
            </div>
        </li>
    )
}

export default Pluviometro
import React, { Fragment } from 'react';
import Spinner from '../../Spinner';
import Lluvia from './Lluvia';
// GraphQL
import {CONSULTAR_LLUVIAS} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const Lluvias = ({idInicial, idFinal, idAno, pluviometroId}) => {

    const inicial = idInicial
    const final = idFinal
    const ano = idAno
    const id_pluviometro = pluviometroId

    // query hook
    const {data, loading, error} = useQuery(CONSULTAR_LLUVIAS, { variables: {inicial, final, ano, id_pluviometro} })

    if(loading) return <Spinner />
    if(error) return null

    return (
        <Fragment>
            {data.consultarLluvias.length === 0 ?
                'No hay lluvias registradas'
            :
                <table className="table table-bordered table-hover">
                    <thead style={{background: '#2E4053', color: 'white'}}>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody style={{background: 'white'}}>
                        {data.consultarLluvias.map(lluvia => (
                            <Lluvia key={lluvia.id_lluvia} lluvia={lluvia} />
                        ))}
                    </tbody>
                </table>
            }
        </Fragment>
    );
}
 
export default Lluvias;
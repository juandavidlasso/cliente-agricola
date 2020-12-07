import React, { useState } from 'react'
import CorteActualizar from './CorteActualizar'
import SuerteRenovar from './SuerteRenovar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
// GraphQL
import {VER_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const CorteEditar = (props) => {

   useTitle({ title: 'Corte' })

   const id_suerte = Number(props.match.params.id_suerte)
   const nombre = props.match.params.nombre
   const id_corte = Number(props.match.params.id_corte)

   // estate
   const [ renovar, actualizarRenovar ] = useState(true)

   // query hook
   const { data, loading, error } = useQuery(VER_CORTE_QUERY, { variables: {id_corte} })
   // console.log(data);
   // console.log(loading);
   // console.log(error);

   if(loading) return <Spinner />
   if(error) return null

   return (
      <div className="container-fluid white">
         <div className="row">
            <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
               <div className="row">
                  <div className="col-md-10 offset-md-1"> 

                  {renovar ?
                     <CorteActualizar corte={data.obtenerCorte} props={id_suerte} actualizarRenovar={actualizarRenovar} nombre={nombre} />
                  :
                     <SuerteRenovar props={id_suerte} />
                  }
                      
                  </div>
               </div>
            </div>
         </div>
      </div>      
   )
}

export default CorteEditar

 import React from 'react'
import CosechaActualizar from './CosechaActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
// GraphQL
import {VER_COSECHA_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

 const CosechaEditar = (props) => {

   useTitle({ title: 'Cosecha' })

   const id_cosecha = Number(props.match.params.id_cosecha)
   const id_corte = Number(props.match.params.id_corte)
   const id_suerte = Number(props.match.params.id_suerte)

   // query hook
   const { data, loading, error } = useQuery(VER_COSECHA_QUERY, { variables: {id_cosecha} })
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
                  <div className="col-md-7 offset-md-3">
                  <br />

                     <CosechaActualizar cosecha={data.obtenerCosecha} suerte={id_suerte} corte={id_corte} />
                      
                  </div>
               </div>
            </div>
         </div>
      </div> 
   )
 }

export default CosechaEditar

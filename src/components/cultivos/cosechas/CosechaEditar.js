 import React from 'react'
import CosechaActualizar from './CosechaActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
// GraphQL
import {VER_COSECHA_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

 const CosechaEditar = () => {

   useTitle({ title: 'Cosecha' })

   const location = useLocation()
   const id_cosecha = Number(location.state.id_cosecha)
   const id_corte = Number(location.state.id_corte)
   const id_suerte = Number(location.state.id_suerte)

   // query hook
   const { data, loading, error } = useQuery(VER_COSECHA_QUERY, { variables: {id_cosecha} })

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

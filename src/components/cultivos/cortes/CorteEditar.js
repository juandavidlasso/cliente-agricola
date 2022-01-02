import React from 'react'
import CorteActualizar from './CorteActualizar'
import Spinner from '../../Spinner'
import useTitle from '../../../utils/context/hooks/useSEO'
import { useLocation } from 'react-router-dom'
// GraphQL
import {VER_CORTE_QUERY} from '../../../apollo/querys'
import { useQuery } from '@apollo/client'

const CorteEditar = () => {

   useTitle({ title: 'Corte' })

   const location = useLocation()
   const id_suerte = location.state.id_suerte
   const nombre = location.state.nombre
   const id_corte = location.state.id_corte

   // query hook
   const { data, loading, error } = useQuery(VER_CORTE_QUERY, { variables: {id_corte} })

   if(loading) return <Spinner />
   if(error) return null

   return (
      <div className="container-fluid white">
         <div className="row">
            <div className="col s12 offset-s0 m12 offset-m0 l8 offset-l4 xl9 offset-xl3">
               <div className="row">
                  <div className="col-md-10 offset-md-1"> 
                     <CorteActualizar corte={data.obtenerCorte} props={id_suerte} nombre={nombre} />                  
                  </div>
               </div>
            </div>
         </div>
      </div>      
   )
}

export default CorteEditar

import React from 'react'
import Title from './Title'
import ListMoto from './ListMoto'

function CardShowMoto({type,title,moto, listMoto}) {
  return (
    <div>
        <Title title={title} type={type}/>
        <ListMoto listMoto={listMoto} type={type} moto={moto}/>
    </div>
  )
}

export default CardShowMoto
import React, { Fragment, useContext } from 'react'
import { ShoppingCartContext } from '../context'

const CartTile = ({singleCartItem}) => {
    const {handleRemoveFromCart,handleAddToCart} = useContext(ShoppingCartContext)
  return (
  <Fragment>
      <div className=' grid grid-cols-3 items-start gap-5'>
        <div className=' col-span-2 flex items-start gap-4'>
         <div className=' w-28 h-28 max-sm:w-20 shrink-0
          p-1 rounded-sm bg-gray-400'>
          <img src={singleCartItem?.thumbnail}
          className=' w-full h-full object-contain'
           alt="" />
         </div>
         <div>
            <h3 className=' text-base font-bold
             text-gray-900'>{singleCartItem?.title}</h3>
             <button
             onClick={()=>handleRemoveFromCart(singleCartItem, true)}
               className=' text-sm px-4 py-3 bg-black
              text-white font-extrabold' >Remove</button>
         </div>
        </div>
        <div className=' ml-auto'>
          <h3 className='text-lg font-bold text-gray-900'>{singleCartItem?.totalPrice.toFixed(2)}</h3>
          <p className=' mt2 mb-3 font-bold text-[16px]'>quantity: {singleCartItem?.quantity}</p>
          <div className='mt-3 '>
            <button
            onClick={()=>handleRemoveFromCart(singleCartItem, false)}
             className='disabled:opacity-165 w-8 h-8 border border-[#000]'
             disabled={singleCartItem?.quantity===1}
             >-</button>
            <button
            onClick={()=>handleAddToCart(singleCartItem)}
             className='w-8 h-8  border border-[#000]'>+</button>
          </div>
        </div>
  
    </div>
    <hr className=' border-gray-500'/>
  </Fragment>
  )
}

export default CartTile

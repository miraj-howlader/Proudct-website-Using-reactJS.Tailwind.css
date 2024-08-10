import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShoppingCartContext } from '../../context'

const ProductDetails = () => {
  const {id} = useParams()
  const navagate = useNavigate();

  const {cartItems, productDetails,setProductDetails,loading,handleAddToCart, setLoading} = useContext(ShoppingCartContext)

   async function fetchProductDetails(){
    const apiResponse = await fetch(`https://dummyjson.com/products/${id}`)
    const result = await apiResponse.json();

    if(result) {
      setProductDetails(result);
      setLoading(false)
    }
  }

  useEffect(()=>{
   fetchProductDetails()
  }, [id])
  
   if(loading) return <h1 className=' text-3xl'>Loading data. Please wait a moment?</h1>
  return (
    <div >
      <div className='  p-6 lg:max-w-7xl max-w-4xl mx-auto gap-4'>
        <div className=' grid items-center grid-cols-1 lg:grid-cols-5'>
          <div className=' lg:col-span-3 w-full lg:sticky top-0 
           text-center'>
            <div className=' px-4 py-10 rounded-xl shadow-lg p-6  relative'>
              <img
              className=' w-4/5 rounded object-cover'
               src={productDetails?.thumbnail} alt="" />
            </div>

            <div className=' mt-6 flex-wrap justify-center gap-6
             mx-auto'>

              {
                productDetails?.images?.length ?
                productDetails?.images.map(imageItem=><div>
                  <div className=' rounded-xl p4 shadow-md' key={imageItem}>
                    <img src={imageItem} alt="" 
                    className=' w-24 cursor-pointer'/>

                  </div>
                </div>
              ):null
              }

            </div>

          </div>

          <div className=' lg:col-span-2  '>
            <h2 className=' text-2xl font-extrabold '>{productDetails?.title}</h2>
            <div className=' flex flex-wrap gap-4 mt-4'>
            <p className=' text-xl font-bold '>${productDetails?.price}</p>
          </div>
          <div>
            <button
            disabled={productDetails ? cartItems.findIndex(item=>item.id ===productDetails.id)> -1 : false}
            onClick={()=>handleAddToCart(productDetails)}
             className=' disabled:opacity-65 mt-5 min-w-[200px] px-4 py-4
             border border-[#000] bg-transparent text-sm
              font-bold rounded'>Add to Cart</button>
          </div>
          
          </div>
          
        </div>

      </div>
      
    </div>
  )
}

export default ProductDetails

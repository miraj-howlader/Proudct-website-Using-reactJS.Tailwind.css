import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartContext } from "../context";

const ProductTile = ({ singleproduct }) => {

  const navigate = useNavigate()
  const {handleAddToCart,cartItems} = useContext(ShoppingCartContext)

    function handleNavigateProductDetialpage(getCurrentProductId){
        navigate(`/product-details/${getCurrentProductId}`)
    }
  return (
    <div
      className=" relative group border border-cyan-700 p-6
     cursor-pointer"
    >
      <div className=" overflow-hidden aspect-w-1 aspect-h-1">
        <img src={singleproduct?.thumbnail}
         alt={singleproduct?.title} 
         className=" object-cover w-full h-full transition-all duration-300
          group-hover:scale-125"
         />
      </div>

      <div className=" flex items-start justify-between mt-4 space-x-4">
         <div className=" font-bold text-gray-900 sm:text-sm text-xs">
            <p className=" w-[100px] overflow-hidden text-ellipsis
             whitespace-nowrap">{singleproduct?.title}</p>
         </div>

         <div className=" text-right">
            <p className=" text-xs font-bold text-gray-900 sm:text-sm
             md:text-[14px]">${singleproduct?.price}</p>
         </div>
      </div>
      <button
      onClick={()=>handleNavigateProductDetialpage(singleproduct?.id)}
       className=" px-5 mt-5 w-full py-2 rounded-none bg-orange-600
       text-white font-bold text-lg">View all</button>
    
       <button
        disabled={cartItems.findIndex(item=>item.id ===singleproduct.id)>-1}
       onClick={()=>handleAddToCart(singleproduct)}
         className=" disabled:opacity-65 px-5 mt-5 w-full py-2 rounded-none bg-orange-600
       text-white font-bold text-lg">Add To Cart</button>
    </div>
  );
};

export default ProductTile;

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [productDetails,setProductDetails] = useState(null);
  const [cartItems,setCartItem] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProduct() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result && result?.products) {
      setListOfProducts(result?.products);
      setLoading(false)
    }
  }

  function handleAddToCart(getProductDetails){
   console.log(getProductDetails)
   let copyExistingCartItems = [...cartItems]
   const findexOfCurrentItem = copyExistingCartItems.findIndex(
    cartItem=>cartItem.id ===getProductDetails.id
   );
  
   if(findexOfCurrentItem === -1){
    copyExistingCartItems.push({
      ...getProductDetails,
      quantity:1,
      totalPrice:getProductDetails?.price
    })
   }else{
    copyExistingCartItems[findexOfCurrentItem]={
      ...copyExistingCartItems[findexOfCurrentItem],
      quantity: copyExistingCartItems[findexOfCurrentItem].quantity + 1,
      totalPrice: copyExistingCartItems[findexOfCurrentItem].quantity + 1 *copyExistingCartItems[findexOfCurrentItem].price
    
    }
   }
   setCartItem(copyExistingCartItems)
   localStorage.setItem('cartItems',JSON.stringify(copyExistingCartItems))
   navigate('/card')
  }

  function handleRemoveFromCart(getProductDetails,isFullyRemoveCart){
    let copyExistingCartItems = [...cartItems];
    const findIndexOfCurrentCartItem = copyExistingCartItems.findIndex(
      item=>item.id===getProductDetails.id
    )
    if(isFullyRemoveCart){
      copyExistingCartItems.splice(findIndexOfCurrentCartItem, 1)
    }else{
      copyExistingCartItems[findIndexOfCurrentCartItem]={
        ...copyExistingCartItems[findIndexOfCurrentCartItem],
        quantity: copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1,
        totalPrice: (copyExistingCartItems[findIndexOfCurrentCartItem].quantity - 1)*copyExistingCartItems[findIndexOfCurrentCartItem].price
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(copyExistingCartItems))
    setCartItem(copyExistingCartItems)
  }


  useEffect(() => {
    fetchListOfProduct();
    setCartItem(JSON.parse(localStorage.getItem('cartItems') || []))
  }, []);

  return (
    <ShoppingCartContext.Provider value={{
       listOfProducts,
       loading,
       setLoading,
       productDetails,
       setProductDetails,
       handleAddToCart,
       cartItems,
       handleRemoveFromCart
        }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;

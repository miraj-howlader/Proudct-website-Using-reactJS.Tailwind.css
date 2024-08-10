
import {Link, Route, Routes, useNavigate } from 'react-router-dom'
import ProductList from './pages/productList/ProductList'
import ProductDetails from './pages/productDetails/ProductDetails'
import CardList from './pages/cardList/CardList'

const App = () => {

 
  return (
    <div>
    
      <Routes>
        <Route path='/products' element={<ProductList />}/>
        <Route path='/product-details/:id' element={<ProductDetails />}/>
        <Route path='/card' element={<CardList />}/>
      </Routes>
    </div>
  )
}

export default App

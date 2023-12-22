import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom";
import '../src/assets/styles/bootstrap.custom.css';
import '../src/assets/styles/index.css'
import App from './App';
import HomeScreen from './screens/HomeScreen';
import { Provider } from 'react-redux';
import LoginScreen from './screens/LoginScreen.jsx';
import ProductScreen from "./screens/ProductScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import store from './store.js';
import PrivateRoute from './components/PrivateRoute.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
import OrderScreen from './screens/OrderScreen.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListScreen from './screens/admin/OrderListScreen.jsx';
import ProductListScreen from './screens/admin/ProductListScreen.jsx';
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx';
import CategoryScreen from './screens/CategoryScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import UserListScreen from './screens/admin/UserListScreen.jsx';
import UserEditScreen from './screens/admin/UserEditScreen.jsx';
import ReturnPolicy from './screens/ReturnPolicy.jsx';
import PrivacyPolicy from './screens/PrivacyPolicy.jsx';
import ContactScreen from './screens/ContactScreen.jsx';
import AboutScreen from './screens/AboutScreen.jsx';






const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<HomeScreen/>}/>

    <Route path='/product/:id' element={<ProductScreen/>} />
    <Route path='/category/:categoryName' element={<CategoryScreen/>}/>
    <Route path='/cart' element={<CartScreen/>} />
    <Route path='/returnpolicy' element={<ReturnPolicy/>}/>
    <Route path='/privacypolicy' element={<PrivacyPolicy/>}/>
    <Route path='/contactus' element={<ContactScreen/>}/>
    <Route path='/about' element={<AboutScreen/>}/>
  {/*<Route path='/verify' element={<VerifyScreen/>} />*/}
    
    <Route path='/register' element={<RegisterScreen/>} />
    <Route path='/login' element={<LoginScreen/>} />
    <Route path='' element={<PrivateRoute/>}>
   
    <Route path="/shipping" element={<ShippingScreen/>}/>
    <Route path="/payment" element={<PaymentScreen/>}/>
    <Route path="/placeorder" element={<PlaceOrderScreen/>}/> 
    <Route path="/order/:id" element={<OrderScreen/>}/>
    <Route path='/profile' element={<ProfileScreen/>}/>
    </Route>

    {/* Admin Routes */}
    <Route path='' element={<AdminRoute/>}>

      
   
    <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
    <Route path="/admin/productlist" element={<ProductListScreen/>}/>
    <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
<Route path='/admin/userlist' element={<UserListScreen/>}/>
<Route path='/admin/user/:id/edit' element={<UserEditScreen/>}/>
    </Route>
   

   
    

  
  



    
    
    </Route>
    
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);



import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import {useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import "./header.css";
import {Badge, NavDropdown} from 'react-bootstrap'
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categoryData } from "../../categoryData/CategoryData";
import { resetCart } from "../../slices/cartSlice";


const Header = () => {
 
  const [open, setOpen] = useState(false);
 
  const {cartItems} = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");

      
    } catch (error) {
      console.log(error);
      
    }

  }
  

  return (
    <header className="header">
      {/* logo */}
      <div className="image-wrapper" onClick={() => navigate('/')} style={{cursor:"pointer"}}>
        <img src={logo} alt="logo" width={"350px"}/>
      </div>

      {/* nav menu for desktop view */}
      <nav className="nav-menu">
        <span onClick={() =>navigate("/")}>Home</span>
        <span onClick={() => navigate("/about")}>About</span>
        <span onClick={() => navigate('/contactus')}>Contact Us</span>
        <span onClick={() => navigate('/services')}>Services</span>
        <NavDropdown title='Categories' id='category'>

        {
          categoryData?.map((item,index) => {

            return(

          <LinkContainer id={item?.id} key={index} to={`/category/${item?.categoryName}`} >
            <NavDropdown.Item>
              {item?.categoryTitle}

            </NavDropdown.Item>
          </LinkContainer>


            )
          })
        }
        
        
        </NavDropdown>
        {userInfo ? (<NavDropdown 
        title={userInfo.name}
        id='username'>
          <LinkContainer to='/profile' >
            <NavDropdown.Item>
              Profile

            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Logout
           

            </NavDropdown.Item>
        </NavDropdown>) : (<span
        onClick={() => navigate("/login")}
        >Login</span>)}
        {
          userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin ' id='adminmenu'>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>
                  Products
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>
                  Users
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>
                  Orders
                </NavDropdown.Item>
              </LinkContainer>

            </NavDropdown>
          )
        }

        <span>
        <AiOutlineShoppingCart size={"25px"}
        onClick={() => navigate("/cart")} />
           {
            cartItems.length > 0 && (
              <Badge pill 
                     bg="success"
                     style={{marginLeft : "5px"}}>
                      {cartItems.reduce((a,c) => a + c.qty ,0)}

              </Badge>

            )
           }
        </span>
      </nav>

      {/* nav menu for mobile view */}
      
        <div className="ham-icon" onClick={() => setOpen(!open)}>
          {open ? <ImCross size={"20px"} /> : <GiHamburgerMenu size={"25px"} />}
        </div>
    

      {open && (
        
      <nav className="mobile-nav-menu">
        <span onClick={() => {navigate("/")
      setOpen(!open)}}>Home</span>
        <span onClick={() => {navigate("/about")
      setOpen(!open)}}>About</span>
        <span onClick={() => {navigate("/contactus")
      setOpen(!open)}}>Contact Us</span>
        <span onClick={() => {navigate('/services')
      setOpen(!open)}}>Services</span>
        <NavDropdown title='Categories' id='category'>

        {
          categoryData.map((item,index) => {

            return(

          <LinkContainer id={item.id} key={index} to={`/category/${item.categoryName}`} onClick={() => setOpen(!open)}>
            <NavDropdown.Item>
              {item.categoryTitle}

            </NavDropdown.Item>
          </LinkContainer>


            )
          })
        }
        
        
        </NavDropdown>
        {userInfo ? (<NavDropdown 
        title={userInfo.name}
        id='username'>
          <LinkContainer to='/profile' onClick={() => setOpen(!open)}>
            <NavDropdown.Item>
              Profile

            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={() => {logoutHandler()
          setOpen(!open)}}>Logout
           

            </NavDropdown.Item>
        </NavDropdown>) : (<span
        onClick={() => {navigate("/login")
      setOpen(!open)}}
        >Login</span>)}
        {
          userInfo && userInfo.isAdmin && (
            <NavDropdown title='Admin ' id='adminmenu'>
              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>
                  Products
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>
                  Users
                </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>
                  Orders
                </NavDropdown.Item>
              </LinkContainer>

            </NavDropdown>
          )
        }

        <span>
        <AiOutlineShoppingCart size={"25px"}
        onClick={() => {navigate("/cart")
      setOpen(!open)}}/>
           {
            cartItems.length > 0 && (
              <Badge pill 
                     bg="success"
                     style={{marginLeft : "5px"}}>
                      {cartItems.reduce((a,c) => a + c.qty ,0)}

              </Badge>

            )
           }
        </span>
      </nav>
      )}

    </header>
  );
};

export default Header;



{/*<nav className="mobile-nav-menu">
          <span>Home</span>
          <span>About</span>
          <span>Contact Us</span>
          <span>Login</span>
          <span>
            <AiOutlineShoppingCart size={"30px"} />
          </span>
      </nav>*/}
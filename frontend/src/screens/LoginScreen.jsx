import { useState , useEffect, } from "react"
import {Link ,useLocation,useNavigate} from 'react-router-dom';
import { Form, Col,Row, Button } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";


function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [login , {isLoading}] = useLoginMutation();
     const {userInfo} = useSelector((state) => state.auth);
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }

    }, [userInfo,navigate,redirect]);
     const submitHandler = async (e) => {
    e.preventDefault();
    try {
        const res = await login({email,password}).unwrap();
        dispatch(setCredentials({...res, }));
        navigate(redirect);
    } catch (err) {
        toast.error(err?.data?.message || err.error);
       
        
        
    }
    
   }
  return (
    <div style={{width:"100%",height:"450px",display:"flex",alignItems:"center"}}>
    <FormContainer>
    <h1>Sign In</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group>
            <Form.Label> Email Address</Form.Label>
                <Form.Control
                type= "email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}>

                </Form.Control>
          
        </Form.Group>
        <Form.Group>
        <Form.Label> Password</Form.Label>
                <Form.Control
                type= "password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}>

                </Form.Control>
           
        </Form.Group>

        <Button type="submit"
        variant="primary"
        className="mt-2"
        disabled={isLoading}>
            Sign In

        </Button>
        {isLoading && <Loader/>}


    </Form>
    <Row>
        <Col>
        New Customer ?{''} <Link Link to={redirect ? `/register?redirect=${redirect}` : "/register"} style={{textDecoration:"none"}}>Register</Link>
        </Col>
    </Row>
   </FormContainer>
    </div>
   
  )
}

export default LoginScreen
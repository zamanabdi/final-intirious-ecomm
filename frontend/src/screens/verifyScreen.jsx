import { useState , useEffect, } from "react"
import {Link ,useLocation,useNavigate} from 'react-router-dom';
import { Form, Col,Row, Button } from "react-bootstrap";
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader/Loader";
import { useRegisterMutation, useVerifyMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";


function VerifyScreen() {
    const [code, setCode] = useState("");
   
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [verify, {isLoading}] = useRegisterMutation();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'
    const number = sp.get('number') || '/'
    const email = sp.get('email') || '/'

    
     const submitHandler = async (e) => {
    e.preventDefault();
    if(code.length !== 6){
        toast.error("otp must be of 6 digits")
    }
    try {
        const res = await verify({email,code,number,type:"verify"}).unwrap();
        if(res.err === "Invalid otp"){
            toast.error("Invalid otp");
        }else{
            dispatch(setCredentials({...res, }));
            navigate(redirect);
        }
    } catch (err) {
        toast.error(err?.data?.message || err.error);
       
        
        
    }
    
   }
  return (
   <FormContainer>
    <h1>OTP verification</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group controlId='otp' className="my-3">
        <Form.Label>Enter OTP sent to your phone number</Form.Label>
                <Form.Control
                type= "text"
                placeholder="Enter otp"
                value={code}
                onChange={(e) => setCode(e.target.value)}>

                </Form.Control>
           
        </Form.Group>

        <Button type="submit"
        variant="primary"
        className="mt-2"
        disabled={isLoading}>
            Confirm
        </Button>
        {isLoading && <Loader/>}


    </Form>
   </FormContainer>
  )
}

export default VerifyScreen
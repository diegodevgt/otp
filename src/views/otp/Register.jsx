import React, {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {reactLocalStorage} from 'reactjs-localstorage';

const Register = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(()=>{
      let data_user = null;
      if(reactLocalStorage.getObject('user') !== undefined && reactLocalStorage.getObject('user') !== null && reactLocalStorage.getObject('user').hasOwnProperty('temp_secret')){
        data_user = reactLocalStorage.getObject('user');
        setUser(data_user)
        history.push('/dashboard');
      }
      console.log("User Logged", data_user)
    },[]);

    console.log(API_BASE_URL);
    const [form_values, setFormValues] = useState({
        name: "",
        email: "",
        password: "",
        password_repeat: ""
    });
    const [response, setResponse] = useState({
        error:"",
        success:""
    });
    
    const timerMessage = (message) =>{
        setResponse({
            error: message, 
            success: ""
        });
        setTimeout(function() {    
            setResponse({
                error: "", 
                success: ""
            });
        }, 3000);
    }

    const handleClick = (e) =>{
        e.preventDefault();
        
        if(form_values.email === "" || form_values.password === "" || form_values.password_repeat === ""){
            timerMessage("All fields are required") 
        }else if(form_values.password !== form_values.password_repeat){
            timerMessage("The passwords do not match") 
        }else{
            register();
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormValues({...form_values, [name]: value})
    }

    const register = () =>{
        fetch(`${API_BASE_URL}/register`, {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({...form_values}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setResponse({
                ...response,
                success: "User created"
            })

            setTimeout(function() {    
                setResponse({error: "", success: ""})
                history.push('/login')
            }, 3000);

            setFormValues({
                name:"",
                email: "",
                password: ""
            });
        })
        .catch((error) => {
            setResponse({
                ...response,
                error: "User creation failed"
            })
            console.error('Error:', error);
        });
    }




    return (
        <div className="c-app c-default-layout flex-row align-items-center custom-bk">
        <CContainer>
            <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
                <CCard className="mx-4">
                <CCardBody className="p-4">
                    <CForm>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput value={form_values.name} onChange={handleChange} type="text" placeholder="Name" name="name" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput value={form_values.email} onChange={handleChange} type="text" placeholder="Email" autoComplete="email" name="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput value={form_values.password} onChange={handleChange} type="password" placeholder="Password" autoComplete="new-password" name="password" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                        <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput value={form_values.password_repeat} onChange={handleChange} type="password" placeholder="Repeat password" autoComplete="new-password" name="password_repeat"  />
                    </CInputGroup>
                    <CButton className="button-t-primary" block onClick={handleClick}>Create Account</CButton>
                    <CRow>{(response.error !== "") ? <p>{response.error}</p> : null} </CRow>
                    <CRow>{(response.success !== "") ? <p>{response.success}</p> : null} </CRow>
                    </CForm>
                </CCardBody>
                
                </CCard>
            </CCol>
            </CRow>
        </CContainer>
        </div>
    )
}

export default Register

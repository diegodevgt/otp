import React, {useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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



const Login = () => {
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(()=>{
      let data_user = null;
      if(reactLocalStorage.getObject('user') !== undefined && reactLocalStorage.getObject('user') !== null && reactLocalStorage.getObject('user').hasOwnProperty('temp_secret')){
        data_user = reactLocalStorage.getObject('user');
        console.log(data_user);
        setUser(data_user)
        history.push('/dashboard');
      }
      console.log("User Logged", data_user)
    },[]);


    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
    const [ response_login, setResponseLogin ] = useState({
        error: ""
    })
    const [form_values, setFormValues] = useState({
        email: "",
        password: ""
    });

    // login function
    const login = () =>{
        fetch(`${API_BASE_URL}/login`, {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({...form_values}),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setFormValues({
                email: "",
                password: ""
            });
            setResponseLogin({...data})
            reactLocalStorage.setObject('user', {...data.user});
            history.push('/dashboard');
            setTimeout(function() {    
                setResponseLogin({error: ""})
            }, 3000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormValues({...form_values, [name]: value})
    }
    
    const handleClick = (e) =>{
        e.preventDefault();
        if(form_values.name !== "" && form_values.email !== ""){
            login();
        }
    }

    return (
        <div className="c-app c-default-layout flex-row align-items-center custom-bk">
        <CContainer>
            <CRow className="justify-content-center">
            <CCol md="8">
                <CCardGroup>
                <CCard className="p-4">
                    <CCardBody>
                    <CForm>
                        <h1 className='title-t'>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-user" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="email" placeholder="email" autoComplete="email" name='email' value={form_values.email} onChange={handleChange} />
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                            <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="Password" autoComplete="current-password" name='password' value={form_values.password} onChange={handleChange} />
                        </CInputGroup>
                        <CRow>
                        <CCol xs="6">
                            <CButton className="px-4 button-t-primary" onClick={handleClick}>Login</CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                            <CButton color="link" className="px-0">Forgot password?</CButton>
                        </CCol>
                        </CRow>
                        <CRow>{(response_login.error !== "") ? <p>{response_login.error}</p> : null} </CRow>
                    </CForm>
                    </CCardBody>
                </CCard>
                <CCard className="text-white  py-5 d-md-down-none" style={{ width: '44%',}}>
                    <CCardBody className="text-center">
                    <div>
                        <h2 className='title-t'>Sign up</h2>
                        <p className='sub-title-t'>Not registered? <br/>
                            Create an account here
                        </p>
                        <Link to="/register">
                        <CButton color="" className="mt-3 button-t" active tabIndex={-1}>Register Now!</CButton>
                        </Link>
                    </div>
                    </CCardBody>
                </CCard>
                </CCardGroup>
            </CCol>
            </CRow>
        </CContainer>
        </div>
    )
}

export default Login

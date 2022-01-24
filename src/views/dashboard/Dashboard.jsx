import React, { lazy, useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CContainer,
  CFormGroup,
  CLabel,
  CInput,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Dashboard = (props) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
  const [users, setUsers] = useState(null);
  const [error, setError] = useState("");
  const [form_values, setFormVales] = useState({
    title:"",
    description:"",
    name_submitter:"",
    id_submitter:""
  });
  const [code, setCode] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/getUsers`, {
      method: 'get', // or 'PUT'
      headers: {
      'Content-Type': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.user);
      setUsers(data.user);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
  }, []);


  const verify = async () =>{
    return await fetch(`${API_BASE_URL}/verify`, {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: code,
          userId: form_values.id_submitter
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data.verified;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const formSubmit = () =>{
  return fetch(`${API_BASE_URL}/form`, {
      method: 'POST', // or 'PUT'
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...form_values
      }),
  })
  .then(response => response.json())
  .then(data => {
      setFormVales({
        title:"",
        description:"",
        name_submitter:"",
        id_submitter:""
      })
      setCode("");
      timerMessage("Form Submitted Correctly");
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

  const handleChange = (e) =>{
    const {name, value} = e.target;
    if(name === "code"){
        setCode(value);
    }else{
      setFormVales({...form_values, [name]: value})
    }
  }

  const handleChangeSelect = (e) =>{
    const {value} = e.target;
    if(value !== ""){
      let name = users[value].user.name;
      setFormVales({...form_values, 
        id_submitter: value,
        name_submitter: name
      })
    } else{
      setFormVales({...form_values, 
        id_submitter: "",
        name_submitter: ""
      })
    }
  }

  const handleClick = async () =>{
    let user_code = await verify();
    console.log(user_code);
    if(user_code){
      console.log('Verified');
      formSubmit();
    }else{
      timerMessage("User its not verified");
    }
  }

  const timerMessage = (message) =>{
    setError(message);
    setTimeout(function() {    
        setError("");
    }, 3000);
}
  

  return (
    (users !== null) ?
    <>
      <CContainer>
        <CRow>
          <CCol>
          <CCard>
            <CCardHeader>
              Issue
                <small> Form</small>
              </CCardHeader>
              <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="company">Title</CLabel>
                  <CInput id="company" placeholder="" name="title" onChange={handleChange} value={form_values.title} />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="vat">Description</CLabel>
                  <CInput id="vat" placeholder="" name="description" onChange={handleChange} value={form_values.description} />
                </CFormGroup>
                <CRow>
                  <CCol xs="4"> 
                      <CFormGroup>
                        <CLabel htmlFor="vat">Submitting by</CLabel>
                        <CSelect custom name="select" id="select" onChange={handleChangeSelect} value={form_values.id_submitter}>
                          <option value="">Please select</option>
                          {Object.entries(users).map((elem)=>{
                            return <option key={elem[0]} value={elem[0]}>{elem[1].user['name']}</option>
                          })}
                        </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="4"> 
                      <CFormGroup>
                        <CLabel htmlFor="vat">Code</CLabel>
                        <CInput id="vat" placeholder="Enter code" name="code" value={code} onChange={handleChange}/>
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="4"> 
                    {error ? error : null}
                  </CCol>
                </CRow>
                <CCardFooter>
                    <CButton 
                    onClick={handleClick}
                    style={{float:'right'}}
                    type="submit" size="sm" className="button-t-primary"> Submit</CButton>
                </CCardFooter>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </> : null
  )
}

export default Dashboard

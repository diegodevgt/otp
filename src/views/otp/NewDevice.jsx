import React, { lazy, useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CContainer,
    CFormGroup,
    CLabel,
    CInput,
    CSelect,
    CImg
  } from '@coreui/react'

const  NewDevice = (props) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
    const [users, setUsers] = useState(null);
    const [img, setImg] = useState(null);
    console.log(props)
    useEffect(() => {
      fetch(`${API_BASE_URL}/get-user-qr`, {
        method: 'POST', // or 'PUT'
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId: props.user.userid})
    })
    .then(response => response.text())
    .then(data => {
        setImg(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    }, []);

    const  createMarkup = (img) => {
        return {__html: `${img}`};
    }
  return (
    <CContainer>
        <CRow>
        <CCol>
            <CCard>
                <CCardHeader>
                    Register New Device
                </CCardHeader>
                    <CCardBody>
                        Scan QR with Google Authenticator App
                        <CRow>
                            <CCol cols={4}>
                            </CCol>
                            <CCol cols={4}>
                                {(img !== null) ?  <div dangerouslySetInnerHTML={createMarkup(img)} /> : null}
                            </CCol>
                            <CCol cols={4}>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </CContainer>
  );
}


export default NewDevice;

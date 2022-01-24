import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
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
    CSelect,
    CListGroup,
    CListGroupItem
  } from '@coreui/react'
  import {AgGridColumn, AgGridReact} from 'ag-grid-react';


  import 'ag-grid-community/dist/styles/ag-grid.css';
  import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


const  Submissions = (props) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 
    const [forms, setForms] = useState(null);
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        fetch(`${API_BASE_URL}/getForms`, {
            method: 'get', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            let data_push = [];
            Object.entries(data.forms).map((elem)=>{
                let object_push = {
                    title: elem[1].data.title,
                    description: elem[1].data.description,
                    submitted_by: elem[1].data.submitted_by
                }
                data_push.push(object_push);
            })
            setForms(data.forms)
            setRowData(data_push);
            console.log(data_push);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

  return (
      (forms !== null) ?
      <>
        <CContainer>
            <CRow>
                <CCol>
                    <CCard>
                        <CCardHeader>
                            Submissions
                        </CCardHeader>
                        <CCardBody>
                            <CRow>
                            <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
                                <AgGridReact
                                    defaultColDef={{
                                        flex: 1,
                                        resizable: true,
                                    }}
                                    rowData={rowData}>
                                    <AgGridColumn field="title"></AgGridColumn>
                                    <AgGridColumn field="description"></AgGridColumn>
                                    <AgGridColumn field="submitted_by"></AgGridColumn>
                                </AgGridReact>
                            </div>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
      </> : null
  );
}

export default Submissions;

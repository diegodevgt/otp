import React, { Suspense, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import {reactLocalStorage} from 'reactjs-localstorage';
// routes config
import routes from '../routes'

  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  const [user, setUser] = useState();
  const history = useHistory();
  useEffect(()=>{
    let data_user = null;
    if(reactLocalStorage.getObject('user') !== undefined && reactLocalStorage.getObject('user') !== null && reactLocalStorage.getObject('user').hasOwnProperty('temp_secret')){
      data_user = reactLocalStorage.getObject('user');
      setUser(data_user)
      
    }else{
      history.push('/login');
    }
    console.log("User Logged", data_user)
  },[]);
  
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => {
                    props = {...props, user}
                  return (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )}} />
              )
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)

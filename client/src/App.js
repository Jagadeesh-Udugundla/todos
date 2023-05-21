import React, { Fragment,useEffect } from 'react';
import Header  from './component/Header/Header';
import Login from './component/Auth/Login';
import Forgotpassword from './component/Auth/Forgotpassword';
import Register from './component/Auth/Register';
import Alert from './component/Layout/Alert';
import store from './store';
import {Provider} from 'react-redux';
import setAuthToken from './utils/setAuthToken';

import {loadUser} from './action/auth';
import PrivateRoute from './component/routing/PrivateRoute';
import Todo from './component/Todo/todo';


import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';


const App =() =>{
  useEffect(() => {
   
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: "LOGOUT" });
    });
  }, []);
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Alert />
            <Switch>
              
                
                <Route exact path="/login" component={Login}/>
                <Route exact path="/Forgotpassword" component={Forgotpassword}/>
                <Route exact path="/register" component={Register}/>
                
                <PrivateRoute exact path="/" component={Todo}/>
       
            </Switch>
        
      </Fragment>
    </Router>
    </Provider>
  )
}

export default App;
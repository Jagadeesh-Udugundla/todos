import React,{ Fragment,useState } from 'react';
import { Link,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../action/auth';
import flip from "./img2.png"

const Login = ({ login, isAuthenticated }) => {
    const [formData,setFormData] = useState({
        email:'',
        password:''
    });
    const {email,password} = formData;
    const onChange = e =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const onSubmit = e =>{
        e.preventDefault();
        login({email,password});
    }
    if(isAuthenticated){
        return <Redirect to='/' />
    }
    return (
        <Fragment>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center",height:"100vh",alignItems:"center" ,backgroundSize:"cover"}}>
            <div style={{width:"50%",height:"100vh",justifyContent:"center",alignItems:"center",backgroundSize:"cover"}}>
                <img src={flip} alt="logo" style={{height:"100vh",width:"700px",marginRight:"30px",backgroundSize:"cover",backgroundAttachment:"fixed"}} />
            </div>
            <div class="card text-center" style={{backgroundSize:"cover",width:"50%",height:"100vh", paddingTop:"10px"}}>
                
            <div class="card-header">
                Login
            </div>
            <div class="card-body mr-auto ml-auto">

            <form onSubmit={onSubmit} autoComplete="off">
             <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" name='email' value={email} onChange={onChange} class="form-control" id="inputEmail" placeholder="Email" />
            </div>
            <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password"  name='password' value={password} onChange={onChange} class="form-control" id="inputPassword" placeholder="Password" />
            </div>
            <div class="form-group">
                <div class="form-check">
                <label class="form-check-label" for="gridCheck">
                    <button className='btn' style={{backgroundColor:"yellow"}} >
                    <Link style={{color:"green"}} to="/Forgotpassword">Forgot password</Link></button> here
                </label><br/>
                <label class="form-check-label" for="gridCheck" style={{paddingTop:"10px"}}>
                    Don't register yet? Please <button className='btn bg-light' style={{backgroundColor:"#099636"}} ><Link to="/register">Register</Link></button> here
                </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            </form>

            </div>
            </div>
            </div>
            
        </Fragment>
    )
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { login })(Login);
  
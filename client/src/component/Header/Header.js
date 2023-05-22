import React,{Fragment} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../action/auth';
import banner1 from './img4.png';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
    const style ={
        "textDecoration":"none",
        "color":"green",
        ":hover":{
            "color":"white"
        }
    }
    const authLinks = (
        <Fragment>
        <button onClick={logout} className="btn btn-outline-success my-2 my-sm-0" style={{color:"white"}} type="submit">Logout</button>
        </Fragment>
    )
    const guestLinks = (
        <Fragment>
            <Link to='/login' style={style}><button className="btn btn-outline-success my-2 my-sm-0 bg-light" type="submit">Login</button></Link> &nbsp; &nbsp;
                <Link to='/register' style={style}><button className="btn btn-outline-success my-2 my-sm-0 bg-light" type="submit">Register</button></Link>
                
        </Fragment>
    )
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"blue",color:"white"}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" style={{borderRadius:"10px", color:"white",fontFamily:"Times New Roman"}}  to='/'>
                <img src={banner1}  style={{width:"40px",height:"30px", borderRadius:"50px", color:"white" }} alt="ecommerce logo" /> Home</Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                </form>
            </div>
            </nav>
        </Fragment>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { logout })(Navbar);
  
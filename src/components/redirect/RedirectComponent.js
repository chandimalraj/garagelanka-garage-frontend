import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function RedirectComponent({ user ,auth }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("user");

  useEffect(() => {
    console.log(user);
   if(auth.redirect === '/garages'){
    navigate('/garages')
   }
   if(auth.redirect === '/app'){
    navigate('/app')
   }
  }, [user?.redirect]);

  return null;
}

const mapStateToProps = (state) => ({
  auth:state.auth,
  user: state.auth?.user?.user,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps)(RedirectComponent);

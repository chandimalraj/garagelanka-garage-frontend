import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux/actions/auth/action";

export const useRedirect = (jwtDecode) => {
  console.log(jwtDecode);
  const user = jwtDecode.user;
  const navigate = useNavigate();
  if (user.redirect) {
    navigate("/garages");
  } else {
    navigate("/dashboard");
  }
};

export const useLoggedUserValidation = async () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  try {
    const jwtToken = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(jwtToken);
    console.log(decoded);
    //token validation should be done
    //login success action should be performed
    dispatch(loginSuccess(decoded, jwtToken));
    navigate("/garages");
    return {
      token: jwtToken,
      decoded: decoded,
    };
  } catch (error) {
    console.log(error);
    navigate("/");
  }
};

export const getUserPermission = async ()=>{
   
   try {
    const jwtToken = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(jwtToken);
    const user = decoded.user
    console.log(user)
    if(!user.redirect){
      return true
    }
    return false
    
   } catch (error) {
     console.log(error)
    //  return false
   } 
    
}
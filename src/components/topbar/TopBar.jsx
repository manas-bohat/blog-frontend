import { useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function TopBar() {
    const {user, dispatch} = useContext(Context);

    const handleLogout = async (e) => {
        dispatch({type: "LOGOUT"});
    }

    const PF = "https://fast-earth-67440.herokuapp.com/images/";

  return (
    <div className='top'>
        <div className="topLeft">
            <a href="https://www.facebook.com/manas.bohat" className="topIcon fab fa-facebook-square"></a>
            <a href="https://www.linkedin.com/in/manas-bohat-4b0b601ba" className="topIcon fab fa-linkedin"></a>
            <a href="https://in.pinterest.com/manasbohat/" className="topIcon fab fa-pinterest-square"></a>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                    <Link to="/" className="link">HOME</Link>
                </li>
                <li className="topListItem">
                    <Link to="/write" className="link">WRITE</Link>
                </li>
                <li className="topListItem" onClick={handleLogout}>
                    {user && "LOGOUT"}
                </li>
            </ul>
        </div>
        <div className="topRight">
            {user ? (
                <Link to="/settings" className="link">
                   {    
                        user.profilePic === "" ? <span className="edit">EDIT ACCOUNT</span> :
                        <img className="topImg"
                        src={PF + user.profilePic} /> 
                    }
                </Link>
            ) : (
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/login" className="link">LOGIN</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/register" className="link">REGISTER</Link>
                    </li>
                </ul>
            )}
        </div>
    </div>
    );
}



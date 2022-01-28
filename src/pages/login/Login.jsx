import axios from "axios";
import { useContext } from "react";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location]);

    const userRef = useRef();
    const passwordRef = useRef();
    const {dispatch, isFetching} = useContext(Context);
    const [error, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            });

            dispatch({type: "LOGIN_SUCCESS", payload: res.data});
        } catch(err) {
            setErrorMessage(err.response.data);
            dispatch({type: "LOGIN_FAILURE"});
        }
    }

  return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" 
                className="loginInput" 
                placeholder="Enter Username" 
                ref={userRef}
                />
                <label>Password</label>
                <input type="password" 
                className="loginInput" 
                placeholder="Enter Password"
                ref={passwordRef}
                />
                <button type="submit" className="loginButton" disabled={isFetching}>Login</button>
            </form>
            <div className="errorMessage">{error}</div>
        </div>
    )
}

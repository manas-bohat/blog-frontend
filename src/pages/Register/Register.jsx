import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./register.css";

export default function Register() {

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location]);

    const [username, setUsername] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [error, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post("/auth/register", {
            username,
            email,
            password
        });
        setErrorMessage("");
        res.data && window.location.replace("/login");
    } catch(err) {

        setErrorMessage(err.response.data);
        // console.log(err.response.data);
    }
    };

  return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className="registerInput" 
                placeholder="Enter Username" 
                onChange={e=>setUsername(e.target.value)}
                />
                <label>Email</label>
                <input type="email" className="registerInput" 
                placeholder="Enter Email" 
                onChange={e=>setEmail(e.target.value)}
                />
                <label>Password</label>
                <input type="password" className="registerInput" 
                placeholder="Enter Password"
                onChange={e=>setPassword(e.target.value)}
                />
                <button className="registerButton">Register</button>
            </form>
            <div className="errorMessage">{error}</div>
        </div>
    )
}

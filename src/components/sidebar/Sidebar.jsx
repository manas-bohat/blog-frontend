import "./sidebar.css";
import sideImage from "../assets/sidebar.jpg"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Sidebar() {

    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, [])

  return (
    
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT</span>
            <img src={sideImage} alt="side image"/>
            <p>
                I am Manas Bohat and this is Word on the Street, an online publishing platform. 
                Read beautiful stories and blogs written by our users, and write your own too.
                <br/> <br/>Come and join today, and let's make memories.
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <a href="https://www.facebook.com/manas.bohat" className="sidebarIcon fab fa-facebook-square"></a>
                <a href="https://www.linkedin.com/in/manas-bohat-4b0b601ba" className="sidebarIcon fab fa-linkedin"></a>
                <a href="https://in.pinterest.com/manasbohat/" className="sidebarIcon fab fa-pinterest-square"></a>
            </div>
        </div>
    </div>
    
    )
}

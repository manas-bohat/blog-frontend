import Sidebar from "../../components/sidebar/Sidebar"
import "./settings.css"
import { useState, useContext, useEffect } from "react"
import { Context } from "../../context/Context";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Settings() {

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location]);

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const PF = "http://localhost:5000/images/";
    const {user, dispatch} = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updatedUser = {
            userId: user._id,
            username, email, password,
        }

        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            // console.log(data);
            updatedUser.profilePic = filename;

            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log("Failed to upload");
            }
        }

        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            dispatch({type:"UPDATE_SUCCESS", payload: res.data});
            setSuccess(true);
        } catch(err) {
            dispatch({type:"UPDATE_FAILURE"});
            setSuccess(false);
            console.log(err);
        }
    }

    const handleDelete = async() => {

        const deleteUser = {
            userId: user._id,
            username
        }

        try {
            await axios.delete("/users/" + user._id, { data : deleteUser});
            dispatch({type: "LOGOUT"});
        } catch(err) {
            console.log(err);
        }
    }

  return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span onClick={handleDelete} className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <div className="PPTop">
                        <label>Profile Picture</label>
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display: "none"}} 
                         onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file): (user.profilePic.length === 0 ? "" : PF+user.profilePic)}/>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)}/>
                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={e => setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" placeholder="Update Password"  onChange={e => setPassword(e.target.value)}/>
                    <button type="submit" className="settingsSubmit">Update</button>
                    {success && <div style={{color: "green", textAlign: "center", marginTop:"20px"}}> Profile updated successfully. </div>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}

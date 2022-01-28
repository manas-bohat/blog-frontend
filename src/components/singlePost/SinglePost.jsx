import "./singlePost.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";

export default function SinglePost() {

    const PF = "https://fast-earth-67440.herokuapp.com/images/" 

    const location = useLocation();
    const path = (location.pathname.split("/"))[2]; // post ID 
    const [post, setPost] = useState({});
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setFile(res.data.file);
            setPhoto(res.data.photo);
        };
        getPost()
    }, [path])

    const handleDelete = async() => {
        try {
            await axios.delete("/posts/" + path, {  data :{ username: user.username  }});
            window.location.replace("/");
        } catch(err) {
            console.log(err);
        }
    };

    const handleUpdate = async(e) => {

        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc
        }

        if(file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            console.log(data);
            newPost.photo = filename;
            setPhoto(filename);

            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log("Failed to upload");
            }
        }

        try {
            await axios.put("/posts/" + path, newPost);
            // window.location.replace("/post/" + res.data._id);
            setUpdateMode(false);
        } catch(err) {
            console.log(err);
        }


        // try {
        //     await axios.put("/posts/" + path, { username: user.username, title, desc, photo});
        //     // window.location.reload();
        //     setUpdateMode(false);
        // } catch(err) {
        //     console.log(err);
        // }
    }

    const handleImage = async(e) => {

        setFile(e.target.files[0]);
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        console.log(data);
        setPhoto(filename);

            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log("Failed to upload");
            }


        // console.log(file);
        // const data = new FormData();
        // const filename = Date.now();
        // data.append("name", filename);
        // data.append("file", file);
        // console.log(data);
        // setPhoto(URL.createObjectURL(file));
    }
    
  return (
      <div className="singlePost">
        <div className="singlePostWrapper">
            { updateMode && file ? (<img className="singlePostImg" src={URL.createObjectURL(file)} />):
            photo && <img className="singlePostImg" src={PF + photo} />}

            {updateMode ? (
            <div>
                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display:"none"}}
                onChange={(e) => setFile(e.target.files[0])}
                ></input>
            </div>) : <span></span>
            }
            
            {   updateMode ? (<input autoFocus type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} 
                className="singlePostTitleInput"/>) : (
            <h1 className="singlePostTitle">
                {title}
                {post.username === user?.username && (
                    <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                        <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                    </div>
                )}
            </h1>)
            }           
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author :
                    <Link className="link" to={`/?user=${post.username}`}> {post.username} </Link>
                 </span>
                <span className="singlePostDate"> {new Date(post.createdAt).toDateString()} </span>
            </div>
            {
                updateMode ? (<textarea type="text" value={desc} onChange={(e)=>{setDesc(e.target.value)}} className="singlePostDescInput"/>) : (
                <p className="singlePostDesc">
                    {desc}
                </p>)
            }
            <hr/>
            {
                updateMode && 
            <button className="singlePostButton" onClick={handleUpdate}>Update</button> 
            }
        </div>
      </div>
  )
}

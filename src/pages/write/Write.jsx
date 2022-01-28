import "./write.css"
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";

export default function Write() {

    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0,0);
    }, [location]);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);

    const handleSubmit = async (e) => {
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

            try {
                await axios.post("/upload", data);
            } catch(err) {
                console.log("Failed to upload");
            }
        }

        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch(err) {
            console.log(err);
        }
    }

  return(
      <div className="write">
          {file && (
              <img className="writeImg" src={URL.createObjectURL(file)}/>
          )}
          <form className = "writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fas fa-plus"></i>
                </label>
                <input type="file" id="fileInput" style={{display: "none"}} 
                onChange={(e) => setFile(e.target.files[0])}
                ></input>
                <input type="text" placeholder="Title" className="writeInput" 
                    autoFocus={true} onChange={(e) => setTitle(e.target.value)}>
                </input>
                <button className="writeSubmit" type="submit">Publish</button>
            </div>
            <div className="writeFormGroup">
               <textarea placeholder="Tell your Story ..." type="text" 
                    className="writeInput writeText" onChange={(e) => setDesc(e.target.value)}>
                </textarea> 
            </div>
          </form>
      </div>
    )
}

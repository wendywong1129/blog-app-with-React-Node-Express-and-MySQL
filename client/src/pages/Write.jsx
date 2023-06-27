import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  // const [value, setValue] = useState("");
  // console.log(value);

  const state = useLocation().state;
  // console.log("Write state: ", state);

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post("/upload", formData);
      // console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // await upload();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : state.img,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      {/* <div className="content">content</div> */}
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="editor"
          />
        </div>
      </div>
      <div className="menu">
        {/* <div className="item">item 1</div> */}
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          {file && (
            <img className="preview" alt="" src={URL.createObjectURL(file)} />
          )}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        {/* <div className="item">item 2</div> */}
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              id="art"
              name="cat"
              value="art"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "art"}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="science"
              name="cat"
              value="science"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "science"}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="technology"
              name="cat"
              value="technology"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "technology"}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="cinema"
              name="cat"
              value="cinema"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "cinema"}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="design"
              name="cat"
              value="design"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "design"}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="food"
              name="cat"
              value="food"
              onChange={(e) => setCat(e.target.value)}
              checked={cat === "food"}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;

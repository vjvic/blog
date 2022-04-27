import "./write.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { createPost, reset } from "../../features/post/postSlice";
import {
  useAppDispatch /* , useAppSelector */,
  useAppSelector,
} from "../../app/hooks";
/* import { RootState } from "../../app/store"; */
import { Post } from "../../interface/Post";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File>();

  const { isSuccess } = useAppSelector((state: RootState) => state.post);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPost: Post = {
      title,
      desc,
      photo: "",
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("api/upload", data);
      } catch (err) {}
      dispatch(createPost(newPost));
    }
  };

  const onUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, dispatch, navigate]);

  return (
    <section className="write">
      {file ? (
        <img src={URL.createObjectURL(file)} alt="pic" className="blog-photo" />
      ) : (
        <div className="image-placeholder">
          <label htmlFor="fileInput" className="custom-file-upload">
            Browse
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={onUploadChange}
          />
        </div>
      )}

      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <textarea
            placeholder="Tell your story..."
            name="desc"
            value={desc}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDesc(e.target.value)
            }
          ></textarea>
          <button className="btn">Publish</button>
        </form>
      </div>
    </section>
  );
};

export default Write;

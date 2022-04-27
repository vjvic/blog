import { Post as postInterface } from "../../interface/Post";
import "./post.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Post = ({
  _id,
  title,
  desc,
  username,
  createdAt,
  photo,
}: postInterface) => {
  const navigate = useNavigate();

  const imgUrl = "http://localhost:5000/images/" + photo;

  const postDate = format(new Date(`${createdAt}`), "EEE MMMM dd yyyy");

  return (
    <div className="post">
      <img src={imgUrl} alt={title} />
      <h3 className="title" onClick={() => navigate("/details")}>
        {title}
      </h3>
      <p className="date">{postDate}</p>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default Post;

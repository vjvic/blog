import { Post as postInterface } from "../../interface/Post";
import "./post.css";
import { format } from "date-fns";

const Post = ({
  _id,
  title,
  desc,
  username,
  createdAt,
  photo,
}: postInterface) => {
  const imgUrl = "http://localhost:5000/images/" + photo;

  const postDate = format(new Date(`${createdAt}`), "EEE MMMM dd yyyy");

  return (
    <div className="post">
      <img src={imgUrl} alt={title} />
      <h3 className="title">{title}</h3>
      <p className="date">{postDate}</p>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default Post;

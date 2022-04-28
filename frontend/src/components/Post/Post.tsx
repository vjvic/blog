import { Post as postInterface } from "../../interface/Post";
import "./post.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { likePost } from "../../features/post/postSlice";
import { RootState } from "../../app/store";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

const Post = ({
  _id,
  title,
  desc,
  username,
  createdAt,
  photo,
  like,
}: postInterface) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log(like);

  const imgUrl = "http://localhost:5000/images/" + photo;

  const postDate = format(new Date(`${createdAt}`), "EEE MMMM dd yyyy");

  const alreadyLiked = like!.includes(user!._id!);

  return (
    <article className="post">
      <img src={imgUrl} alt={title} />
      <h3 className="title" onClick={() => navigate(`/details/${_id}`)}>
        {title}
      </h3>
      <p className="date">{postDate}</p>
      <p className="desc">{desc}</p>
      <div className="flex">
        <button
          onClick={() => dispatch(likePost(_id!))}
          disabled={!user}
          className="like-btn"
        >
          {alreadyLiked ? <AiFillLike /> : <AiOutlineLike />}
        </button>
        <div>{like!.length}</div>
      </div>
    </article>
  );
};

export default Post;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getPostDetails } from "../../features/post/postSlice";
import "./blog-details.css";
import { format } from "date-fns";

const BlogDetails = () => {
  const { id } = useParams();

  const { details, isLoading } = useAppSelector(
    (state: RootState) => state.post
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPostDetails(id!));
  }, [dispatch, id]);

  const postDate = details.createdAt
    ? format(new Date(`${details.createdAt}`), "EEE MMMM dd yyyy")
    : "";

  if (isLoading) return <div>loading...</div>;

  return (
    <section className="blog-details">
      <article>
        <img
          src={"http://localhost:5000/images/" + details.photo}
          alt={details.title}
          className="blog-photo"
        />

        <h1 className="title">{details.title}</h1>

        <div className="flex-between">
          <p className="author">
            Author: <span className="username">{details.username}</span>
          </p>
          <p className="date">{postDate}</p>
        </div>

        <p className="desc">{details.desc}</p>
      </article>
    </section>
  );
};

export default BlogDetails;

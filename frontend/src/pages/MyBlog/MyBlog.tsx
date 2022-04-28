import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Post } from "../../components";
import { getMyPost } from "../../features/post/postSlice";
import "./myBlog.css";

const MyBlog = () => {
  const { myPostList, isLikeSuccess } = useAppSelector(
    (state: RootState) => state.post
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyPost());
  }, [dispatch, isLikeSuccess]);

  return (
    <section className="my-blog">
      <div className="post-grid">
        {myPostList.map((post) => (
          <Post
            key={post._id}
            _id={post._id}
            title={post.title}
            desc={post.desc}
            photo={post.photo}
            createdAt={post.createdAt}
            username={post.username}
            like={post.like}
          />
        ))}
      </div>
    </section>
  );
};

export default MyBlog;

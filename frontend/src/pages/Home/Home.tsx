import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { useEffect } from "react";
import { getAllPost } from "../../features/post/postSlice";
import { Post } from "../../components";
import "./home.css";

const Home = () => {
  const { postList, isLikeSuccess } = useAppSelector(
    (state: RootState) => state.post
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch, isLikeSuccess]);

  return (
    <section className="home">
      <div className="post-grid">
        {postList.map((post) => (
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

export default Home;

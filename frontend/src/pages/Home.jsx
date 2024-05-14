import { useEffect, useState } from "react";
import PostList from "../components/PostList";
import API from "../api";
const Home = () => {
  const [postList, setPostList] = useState();

  useEffect(() => {
    const getPostList = async () => {
      try {
        const res = await API.get("blog/post/list/");
        const data = res.data;
        setPostList(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPostList();
  }, []);
  return (
    <main className="content-grid">
      <PostList list={postList} />
    </main>
  );
};

export default Home;

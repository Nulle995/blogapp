import { useContext, useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
import "../styles/PostDetail.css";
import { UserContext } from "../contexts/user";
import { MdOutlineTag } from "react-icons/md";
import { CiHashtag } from "react-icons/ci";
import { IoIosPricetag } from "react-icons/io";

const PostDetail = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState();
  const [post, setPost] = useState();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const getPostDetail = async () => {
      try {
        const res = await API.get(`blog/post/${postSlug}`);
        const data = res.data;
        console.log(data);
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPostDetail();
  }, []);
  console.log(postSlug);
  return (
    <div className="content-grid">
      <div className="post-detail-grid">
        {post && (
          <>
            <section className="post-detail">
              <img
                src={post.thumbnail}
                alt=""
                className="post-detail-thumbnail"
              />
              <div className="post-detail-content">
                <h1>{post.title}</h1>
                <p className="category-name">
                  <IoIosPricetag />
                  {post.category_detail.title}
                </p>

                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </section>
            <aside>
              <article>
                <h3>Know the Author</h3>
                <hr />
                <>
                  {post.author_detail.username}
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni illo porro eos pariatur veritatis aut!
                  </p>
                  <h3>More of the Author</h3>
                  <hr />
                  <div>
                    <h4>Titulo de prueba sobre algo de ciencia y tecnología</h4>
                    <datetime>24/02/1997</datetime>
                    <hr />
                  </div>
                  <div>
                    <h4>Titulo de prueba sobre algo de ciencia y tecnología</h4>
                    <datetime>24/02/1997</datetime>
                    <hr />
                  </div>
                  <div>
                    <h4>Titulo de prueba sobre algo de ciencia y tecnología</h4>
                    <datetime>24/02/1997</datetime>
                    <hr />
                  </div>
                </>
              </article>
              <article>
                <h3>Related Posts</h3>
              </article>
            </aside>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;

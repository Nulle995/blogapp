import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user";
import { Link } from "react-router-dom";
import { IoPricetagOutline } from "react-icons/io5";
import "../styles/Home.css";

const PostList = ({ list }) => {
  const { userData } = useContext(UserContext);

  useEffect(() => {
    console.log(list);
  }, []);
  return (
    <section className="post__list">
      {list?.length ? (
        list.map((post) => {
          const {
            slug,
            title,
            author,
            author_detail: authorDetail,
            thumbnail,
            desc,
            created_at,
            comment_count,
            category_detail: categoryDetail,
          } = post;

          const date = new Date(created_at);
          const formattedDate = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;

          const authorUsername =
            authorDetail.username.slice(0, 1).toUpperCase() +
            authorDetail.username.slice(1).toLowerCase();

          return (
            <article className="post__list--article" key={slug}>
              <div className="post__list--article--img">
                <img src={thumbnail} alt="" />
              </div>
              <div className="post__list--article--content">
                <Link to={`post/${slug}/`} className="article--content--title">
                  <h3>{title}</h3>
                </Link>

                <div className="article--content--desc">{desc}</div>
                <div className="article--content--bottom">
                  <p className="author">{authorUsername}</p> -
                  <p>{formattedDate}</p>
                </div>
              </div>
            </article>
          );
        })
      ) : (
        <>No hay post</>
      )}
    </section>
  );
};

export default PostList;

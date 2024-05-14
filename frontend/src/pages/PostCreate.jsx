import { useContext, useEffect, useState } from "react";
import API from "../api";
import TextEditor from "../components/TextEditor";
import { UserContext } from "../contexts/user";
import { Navigate } from "react-router-dom";
import { GrGallery } from "react-icons/gr";
import { MdCloudUpload } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { MdFileUpload } from "react-icons/md";
import "../styles/PostCreate.css";

const PostCreate = () => {
  const { userData } = useContext(UserContext);
  const [isEditor, setIsEditor] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("thumbnail", thumbnail);
    try {
      const res = await API.post("blog/post/create/", formData);
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const slugChange = (e) => {
    const titleValue = e.target.value;
    const slugValue = titleValue.split(" ").join("-");
    setSlug(slugValue);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailImage(reader.result);
    };
    reader.readAsDataURL(file);
    console.log("sadsad");
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await API.get("blog/category/");
        const data = res.data;
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
    if (userData) setIsEditor(userData.is_editor);
  }, [userData]);

  if (!isEditor) return <Navigate to={"/"} />;

  return (
    <div className="content-grid">
      <h1 className="create-post-title">Create Post</h1>
      <form onSubmit={handleSubmit} className="create-post">
        <div className="create-post-data">
          <div className="title">
            <label htmlFor="title">
              Title<span>*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                slugChange(e);
              }}
              required
            />
          </div>
          <div className="slug">
            <label htmlFor="slug">
              Slug<span>*</span>
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className="post-category">
            <label htmlFor="category">
              Category<span>*</span>
            </label>
            <select
              id="category"
              value={""}
              defaultValue={" "}
              onChange={(e) => {
                setCategory(e.target.value);
                console.log(e.target.value);
              }}
              required
            >
              {categories ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))
              ) : (
                <option>Loading..</option>
              )}
            </select>
          </div>

          <div className="content">
            <label htmlFor="">
              Content<span>*</span>
            </label>
            <TextEditor content={content} setContent={setContent} />
          </div>
          <button className="create-post-btn">Crear Post</button>
        </div>
        <aside>
          <div className="desc">
            <label htmlFor="desc">
              <p>
                Description<span>*</span>
              </p>
            </label>
            <hr />
            <textarea
              id="desc"
              placeholder="Post Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="thumbnail">
            <label htmlFor="thumbnail" className="image">
              <p>
                Featured Image<span>*</span>
              </p>
              <div className="image-icon">
                <MdFileUpload />
              </div>
            </label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleThumbnailChange}
              required
            />
            <hr />
            <div className="thumbnail-image-preview">
              {thumbnailImage ? (
                <img src={thumbnailImage} alt="" />
              ) : (
                <div className="default">Upload Your Image</div>
              )}
            </div>
          </div>
          <div></div>
        </aside>
      </form>
    </div>
  );
};

export default PostCreate;

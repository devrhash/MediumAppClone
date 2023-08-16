import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function RevisionHistory() {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const postId = useParams();

  useEffect(() => {
    console.log(postId);
    let new_array = [];

    new_array = JSON.parse(localStorage.getItem("revisionhistory"));
    console.log(new_array);

    setPosts(new_array);
  }, [refresh]);
  return (
    <div className="postBody">
      <div className="postContainer">
        {posts.map((post, index) => (
          <div>
            {post.id == postId.postId && (
              <div className="authorpostcard">
                <div className="card__header">
                  <img
                    src={post.image}
                    alt="card__image"
                    className="card__image"
                    width="200"
                    height="200"
                  ></img>
                </div>
                <div className="card__body">
                  <span className="tag tag-blue">{post.topic}</span>
                  <h4>{post.title}</h4>
                  <p>{post.text}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

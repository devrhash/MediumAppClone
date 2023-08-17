import { useEffect, useState } from "react";
import "./Post.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Posts() {
  const [listOp, setListOp] = useState([]);
  const [author, setAuthor] = useState([]);
  const [posts, setPosts] = useState([]);
  const [writeComment, setWriteComment] = useState(false);
  const [postId, setPostId] = useState(null);
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [modPost, setModPost] = useState([]);
  const [topPost, setTopPost] = useState([]);
  const [filters, setFilters] = useState({
    author: "",
    date: "",
    sortby: "",
    search: "",
  });

  const jwtToken = localStorage.getItem("jwtToken");
  const headers = {
    authToken: jwtToken,
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  const openComments = (e) => {
    setWriteComment(true);
    setPostId(e.currentTarget.id);
    console.log("/" + e.target.id);
    axios
      .get(` http://127.0.0.1:3000/comment/all/${e.currentTarget.id}`)
      .then((response) => {
        setAllComment(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };
  const sendComment = () => {
    const Comment = { post_id: postId, text: comment };
    axios
      .post("http://127.0.0.1:3000/comment/create", Comment, { headers })
      .then((response) => {
        console.log("commented");
        setRefresh(refresh + 1);
        setWriteComment(false);
        // setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("cannot put there");
        console.error("Error fetching posts:", error);
      });
  };

  const dislike = (e) => {
    axios
      .delete(`http://127.0.0.1:3000/like/remove/${e.currentTarget.id}`, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    let likedposts = JSON.parse(localStorage.getItem("likedposts"));
    let new_post = [];
    for (let x of likedposts) {
      if (x.id != e.currentTarget.id) {
        new_post.push(x);
      }
    }
    localStorage.setItem("likedposts", JSON.stringify(new_post));
    setRefresh(refresh + 1);
  };

  const liked = (e) => {
    axios
      .post(
        `http://127.0.0.1:3000/like/create/${e.currentTarget.id}`,
        {},
        { headers }
      )
      .then((response) => {
        // setIsLiked(true);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    let newpost = {};
    for (let x of modPost) {
      console.log(x);
      if (x.id == e.currentTarget.id) {
        console.log("yes it is matched");
        newpost = x;
        break;
      }
    }
    let likedposts = JSON.parse(localStorage.getItem("likedposts"));
    if (likedposts !== null) {
      likedposts.push(newpost);
      localStorage.setItem("likedposts", JSON.stringify(likedposts));
      console.log(likedposts);
    } else {
      let new_post = [];
      new_post.push(newpost);
      localStorage.setItem("likedposts", JSON.stringify(new_post));
    }
    setRefresh(refresh + 1);
  };

  const savePost = (e) => {
    console.log(e.currentTarget.id);
    axios
      .post(
        `http://127.0.0.1:3000/author/saveForLater/${e.currentTarget.id}`,
        {},
        { headers }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("cannot put there");
        console.error("Error fetching posts:", error);
      });
    let newpost = {};
    for (let x of modPost) {
      console.log(x);
      if (x.id == e.currentTarget.id) {
        console.log("yes it is matched");
        newpost = x;
        break;
      }
    }
    let savedposts = JSON.parse(localStorage.getItem("savedposts"));
    if (savedposts !== null) {
      savedposts.push(newpost);
      localStorage.setItem("savedposts", JSON.stringify(savedposts));
    } else {
      let new_post = [];
      new_post.push(newpost);
      localStorage.setItem("savedposts", JSON.stringify(new_post));
    }
    setRefresh(refresh + 1);
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/posts/all")
      .then((response) => {
        change(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    axios
      .get("http://127.0.0.1:3000/author/showAll")
      .then((response) => {
        setAuthor(response.data);
        localStorage.setItem("followed", JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });

    let listop = JSON.parse(localStorage.getItem("listop"));
    console.log(listop);
    setListOp(listop);
  }, [refresh]);

  const change = (data) => {
    let new_post = data;
    console.log(data);
    let savedposts = JSON.parse(localStorage.getItem("savedposts"));
    let likedposts = JSON.parse(localStorage.getItem("likedposts"));
    let editposts = JSON.parse(localStorage.getItem("editposts"));
    let revise = JSON.parse(localStorage.getItem("revisionhistory"));

    console.log(savedposts);
    console.log(likedposts);
    console.log(editposts);
    let new_array = [];

    for (let x of new_post) {
      let flag = false;
      let flag1 = false;
      let flag2 = false;
      if (savedposts !== null) {
        for (let y of savedposts) {
          if (x.id == y.id) {
            flag = true;
            break;
          }
        }
      }
      if (likedposts !== null) {
        for (let y of likedposts) {
          if (x.id == y.id) {
            flag1 = true;
            break;
          }
        }
      }
      if (revise !== null) {
        for (let y of revise) {
          if (y.id == x.id) {
            flag2 = true;
            console.log("now happens");
            break;
          }
        }
      }
      x.save = flag;
      x.like = flag1;
     
      if (!flag2) {
        if (revise === null) {
          revise = [];
        }
        revise.push(x);
      }
      new_array.push(x);
    }
    console.log(revise);
    localStorage.setItem("revisionhistory", JSON.stringify(revise));
    for (let index = 0; index < new_array.length; index++) {
      if (editposts != null) {
        for (let x of editposts) {
          if (new_array[index].id == x.id) {
            new_array[index].text = x.text;
            new_array[index].featured_image = x.featured_image;
            new_array[index].topic = x.topic;
            new_array[index].title = x.title;
          }
        }
      }
    }

    setModPost(new_array);
    console.log(modPost);
  };
  useEffect(() => {
    console.log(filters);

    if (filters.author != "") {
      console.log(filters.author);
      axios
        .get(`http://127.0.0.1:3000/get/post/author/${filters.author}`)
        .then((response) => {
          change(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    } else if (filters.date != "") {
      console.log("inside 2");
      axios
        .get(`http://127.0.0.1:3000/get/post/filter/date/${filters.date}`)
        .then((response) => {
          change(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    } else if (filters.sortby != "") {
      console.log("inside 2");
      axios
        .get(
          `http://127.0.0.1:3000/get/post/filter/likesAndComments/${filters.sortby}`
        )
        .then((response) => {
          change(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
    //
    else if (filters.search != "") {
      axios
        .get(`http://localhost:3000/posts/search?search=${filters.search}`)
        .then((response) => {
          change(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    } else {
      console.log("inside 3");
      axios
        .get("http://127.0.0.1:3000/posts/all")
        .then((response) => {
          change(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }

    if (topPost.length > 3) {
      topPost.splice(3, topPost.length - 3);
    }
  }, [filters]);

  const savelist = (e) => {
    let list = e.target.value;
    let postid = e.target.id;
    console.log("hehe" + list);
    console.log("byebye" + postid);
    let savetolist = JSON.parse(localStorage.getItem("savetolist"));

    if (savetolist !== null) {
      let flag = false;
      for (let index = 0; index < savetolist.length; index++) {
        if (savetolist[index].id == postid) {
          savetolist[index].list = list;
          flag = true;
          break;
        }
      }
      if (!flag) {
        savetolist.push({ id: postid, list: list });
      }
    } else {
      savetolist = [{ id: postid, list: list }];
    }
    localStorage.setItem("savetolist", JSON.stringify(savetolist));
    console.log(savetolist);
    setRefresh(refresh+1);
  };
  return (
    <div>
      <div className="postHeader">
        <div className="searchbody">
          <div className="wrap">
            <div className="search">
              <input
                name="search"
                className="searchTerm"
                placeholder="What are you looking for?"
                value={filters.search}
                onChange={handleFilterChange}
              ></input>
            </div>
          </div>
        </div>
        <select
          value={filters.sortby}
          onChange={handleFilterChange}
          className="sortby"
        >
          <option value="">Sort By</option>
          <option value="likes">Likes</option>
          <option value="comments">Comments</option>
        </select>
        <select
          name="author"
          value={filters.author}
          onChange={handleFilterChange}
          className="sortby"
        >
          <option value="">Filter by Author</option>
          {author.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <div className="postBody">
        <div className="postContainer">
          {modPost.map((post) => (
            <div className="card">
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
              <div className="card__footer">
                <div className="user">
                  <div className="user__info">
                    <Link to={`/author/${post.author_id}`}>
                      <h5>{post.author_name}</h5>
                    </Link>
                    <small>{post.published_at}</small>
                  </div>
                </div>
                <div className="reactions">
                  <p
                    style={{
                      font: "14px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                    onClick={openComments}
                    id={post.id}
                  >
                    comment:{post.comments_count}
                  </p>
                </div>
                {!post.like && (
                  <div className="reactions">
                    <p
                      style={{
                        font: "14px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      onClick={liked}
                      id={post.id}
                      name={post.author_id}
                    >
                      Like:{post.likes_count}
                    </p>
                  </div>
                )}
                {post.like && (
                  <div className="reactions">
                    <p
                      style={{
                        font: "14px",
                        cursor: "pointer",
                        fontWeight: "600",
                        color: "green",
                      }}
                      id={post.id}
                      name={post.author_id}
                      onClick={dislike}
                    >
                      Like:{post.likes_count}
                    </p>
                  </div>
                )}

                {!post.save && (
                  <div className="reactions">
                    <p
                      style={{
                        font: "14px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                      id={post.id}
                      onClick={savePost}
                    >
                      Save
                    </p>
                  </div>
                )}
                {post.save && (
                  <div className="reactions">
                    <p
                      style={{
                        font: "14px",

                        fontWeight: "600",
                        color: "green",
                      }}
                      id={post.id}
                    >
                      Saved
                    </p>
                    <select onChange={savelist} id={post.id}>
                      <option value="">select list</option>
                      {listOp.map((opt, index) => (
                        <option key={index} value={index}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {writeComment && (
          <div className="commentmodal">
            <div className="modalContent">
              <div className="modalHeader">
                <span class="close" onClick={() => setWriteComment(false)}>
                  &times;
                </span>
                <textarea
                  placeholder="comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  style={{ height: "100px", width: "100%" }}
                ></textarea>
                <button
                  style={{
                    width: "100px",
                    background: "white",
                    borderRadius: "8px",
                  }}
                  onClick={sendComment}
                >
                  send
                </button>
              </div>
              <div className="modalBody">
                <ul>
                  {allComment.map((comment, index) => (
                    <li key={index} className="comment-box">
                      <p className="comment-author">{comment.author_name}</p>
                      <p className="comment-date">{comment.comment_date}</p>
                      <p className="comment-text">{comment.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

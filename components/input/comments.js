import { useState, useEffect,useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

import NotificationContext from '../../store/notification-context'

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext)
  const [showComments, setShowComments] = useState(false);
  const [Comments, setComments] = useState([]);
  const  [isFetchingComments,setisFetchingComments] = useState(false)
  console.log(showComments)
  useEffect(() => {
    setisFetchingComments(true)
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setComments(data.comments);
          setisFetchingComments(false)
        })
        .catch((err) => {});
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    notificationCtx.shownotification({
      title: "sending Comment",
      message: "Your Comment is currently being stored",
      status: "pending",
    });
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "somethink went wrong!");
        });
      })
      .then((data) => {
        setShowComments(true)
        notificationCtx.shownotification({
          title: "success",
          message: "Your Comment Was Saved!",
          status: "success",
        });
      })
      .catch((err) => {
        notificationCtx.shownotification({
          title: "Error",
          message: err.message || 'somethink went wrong',
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? "Hide" : "Show"} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={Comments} />}
      {showComments && isFetchingComments && <p>Loading ....</p>}
    </section>
  );
}

export default Comments;

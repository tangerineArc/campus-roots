import { CircleCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import defaultProfilePicture from "../assets/default-profile-picture.jpg";
import commentsData from "../data/comments-data.js";
import styles from "../styles/post.module.css";

export default function Post({ data }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(data.likesCount);
  const [showComments, setShowComments] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [commentLikes, setCommentLikes] = useState({});
  const [commentLiked, setCommentLiked] = useState({});
  const [visibleReplies, setVisibleReplies] = useState({});

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => (liked ? prev - 1 : prev + 1));
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleReplies = (commentId) => {
    setVisibleReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  useEffect(() => {
    if (showComments) {
      const timeToMinutes = (timeStr) => {
        if (timeStr.includes("h")) return parseInt(timeStr) * 60;
        if (timeStr.includes("m")) return parseInt(timeStr);
        return 0;
      };

      const postComments = commentsData
        .filter(comment => comment.postid === data.id)
        .sort((a, b) => timeToMinutes(a.createdBefore) - timeToMinutes(b.createdBefore));

      const initialLikes = {};
      const initialLiked = {};
      postComments.forEach(comment => {
        initialLikes[comment.id] = comment.likeCount;
        initialLiked[comment.id] = false;
      });

      setFilteredComments(postComments);
      setCommentLikes(initialLikes);
      setCommentLiked(initialLiked);
    }
  }, [showComments, data.id]);

  const handleCommentLike = (commentId) => {
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: commentLiked[commentId] ? prev[commentId] - 1 : prev[commentId] + 1
    }));
    setCommentLiked(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const renderComments = (parentId = null, depth = 0) => {
    const comments = filteredComments.filter(comment => comment.parentCommentId === parentId);

    return comments.map(comment => {
      const childReplies = filteredComments.filter(c => c.parentCommentId === comment.id);
      const showReplies = visibleReplies[comment.id];

      return (
        <div key={comment.id} className={styles.comment} style={{ marginLeft: `${depth * 0.8}rem` }}>
          <div>
            <strong>{comment.writtenBy}</strong>{" "}
            <span className={styles.commentCreatedBefore}>({comment.createdBefore} ago)</span>{" "}
            <span className={styles.commentCreatedBefore}>
              <button onClick={() => handleCommentLike(comment.id)}>
                Like {commentLikes[comment.id]}
              </button>
            </span>{" "}
            <span className={styles.commentCreatedBefore}>
              <button>Reply</button>
            </span>
          </div>
          <div style={{ marginLeft: `0.5rem` }} className={styles.commentWriterHeadline}>
            {comment.writerHeadline}
          </div>
          <div>{comment.body}</div>

          {childReplies.length > 0 && (
            <>
              <button className={styles.viewRepliesButton} onClick={() => toggleReplies(comment.id)}>
                {showReplies ? "Hide Replies" : `View Replies (${childReplies.length})`}
              </button>
              <CSSTransition
                in={showReplies}
                timeout={300}
                classNames={{
                  enter: styles.commentEnter,
                  enterActive: styles.commentEnterActive,
                  exit: styles.commentExit,
                  exitActive: styles.commentExitActive,
                }}
                unmountOnExit
              >
                <div>
                  {renderComments(comment.id, depth + 1)}
                </div>
              </CSSTransition>
            </>
          )}
        </div>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={data.profilePic || defaultProfilePicture} alt="Profile" />
        <div className={styles.info}>
          <h3>
            {data.name}
            <CircleCheck className={styles.badge} />
          </h3>
          <span>{data.headline} • {data.createdBefore}</span>
        </div>
      </div>

      <p className={styles.postBody}>{data.postBody}</p>

      {data.imageUrls.map((url, idx) => (
        <img className={styles.postImage} src={url} key={idx} />
      ))}

      <div className={styles.postActions}>
        <button onClick={handleLike}>
          <Heart className={`${styles.iconLike} ${liked ? styles.liked : ""}`} />
          {likesCount}
        </button>
        <button onClick={handleToggleComments}>
          <MessageCircle className={styles.icon} />
          {commentsData.filter(comment => comment.postid === data.id).length}
        </button>
        <button>
          <Share2 className={styles.icon} />
        </button>
      </div>

      <CSSTransition
        in={showComments && filteredComments.length > 0}
        timeout={300}
        classNames={{
          enter: styles.commentEnter,
          enterActive: styles.commentEnterActive,
          exit: styles.commentExit,
          exitActive: styles.commentExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.commentsSection}>
          <TransitionGroup component={null}>
            {renderComments()}
          </TransitionGroup>
        </div>
      </CSSTransition>
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.number,
    name: PropTypes.string,
    headline: PropTypes.string,
    profilePic: PropTypes.string,
    createdBefore: PropTypes.string,
    postBody: PropTypes.string,
    likesCount: PropTypes.number,
    commentsCount: PropTypes.number,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

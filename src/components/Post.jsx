import DOMPurify from 'dompurify';
import { CircleCheck, Heart, MessageCircle, Share2, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import defaultProfilePicture from "../assets/default-profile-picture.jpg";
import { useAuth } from "../contexts/auth-context.jsx";

import useFetch from "../hooks/use-fetch.js";
import styles from "../styles/post.module.css";
import ProfilePic from "./ProfilePic.jsx";
import RichEditor from "./RichEditor.jsx";

export default function Post({ data }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(data.likes.some(like => like.userId === user.id));
  const [postLikes, setPostLikes] = useState(data.likes.length);
  const [showComments, setShowComments] = useState(false);
  const [filteredComments, setFilteredComments] = useState([]);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const commentRefs = useRef({});
  const options = { credentials: "include" };
  const { data: commentsData, loading, error } = useFetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/comments/${data.id}`, options);

  const sanitizedBody = DOMPurify.sanitize(data.body);

  const getTimeDifference = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffMs = now - createdDate;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
      return `${diffDays}d`;
    } else if (diffHours >= 1) {
      return `${diffHours}h`;
    } else if (diffMinutes >= 1) {
      return `${diffMinutes}m`;
    } else {
      return `0 m`;
    }
  }

  const togglePostLike = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/posts/like`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, postId: data.id }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setLiked(result.liked);
        setPostLikes(prev => (result.liked ? prev + 1 : prev - 1));
      } else {
        console.error("Server error:", result.error);
      }
    } catch (error) {
      console.error("Error toggling post like:", error);
    }
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
    setShowCommentEditor(!showComments);
  };

  const toggleReplies = (commentId) => {
    setVisibleReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleCommentLike = async (commentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER_URL}/posts/comments/toggleLikes`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id, commentId: commentId })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setCommentLikes(prev => ({
          ...prev,
          [commentId]: data.liked ? (prev[commentId] || 0) + 1 : (prev[commentId] || 1) - 1
        }));
      } else {
        console.error('Server error:', data.error);
      }
    } catch (error) {
      console.error('Error toggling comment like:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/add/comment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          body: commentContent,
          postId: data.id,
          userId: user.id,
          parentCommentId: replyingTo
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const result = await response.json();
      if (result.success) {
        const newComment = {
          id: result.commentId,
          body: commentContent,
          userId: user.id,
          user: {
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            about: user.about
          },
          parentCommentId: replyingTo,
          createdAt: new Date().toISOString()
        };
        setCommentContent("");
        setReplyingTo(null);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleReplyClick = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleDeleteClick = async (commentId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/comment/delete/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          commentId: commentId
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
    } catch (error) {
      console.error('Error delete comment:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/delete/${data.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      const result = await response.json();
      if (result.success) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  useEffect(() => {
    if (showComments && commentsData) {
      const postComments = commentsData.comments ? commentsData.comments : [];
      setFilteredComments(postComments);
      postComments.forEach(async (comment) => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_SERVER_URL}/posts/comments/likes/${comment.id}`,
            { credentials: 'include' }
          );
          const data = await response.json();
          if (data.success) {
            setCommentLikes(prev => ({
              ...prev,
              [comment.id]: data.likesCount
            }));
          }
        } catch (error) {
          console.error('Error fetching comment likes:', error);
        }
      });
    }
  }, [showComments, data.id, commentsData]);

  const renderComments = (parentId = null, depth = 0) => {
    const comments = filteredComments.filter(comment => comment.parentCommentId === parentId);

    return comments.map(comment => {
      const childReplies = filteredComments.filter(c => c.parentCommentId === comment.id);
      const showReplies = visibleReplies[comment.id];

      // Ensure we have a ref for this comment
      if (!commentRefs.current[comment.id]) {
        commentRefs.current[comment.id] = React.createRef();
      }

      return (
        <CSSTransition
          key={comment.id}
          nodeRef={commentRefs.current[comment.id]}
          timeout={300}
          classNames={{
            enter: styles.commentEnter,
            enterActive: styles.commentEnterActive,
            exit: styles.commentExit,
            exitActive: styles.commentExitActive,
          }}
        >
          <div ref={commentRefs.current[comment.id]} className={styles.comment} style={{ marginLeft: `${depth * 0.8}rem` }}>
            <div>
              <strong>{comment.user.name}</strong>{" "}
              <span className={styles.commentCreatedBefore}>{getTimeDifference(comment.createdAt)}</span>{" "}
              <span className={styles.commentCreatedBefore}>
                <button onClick={() => handleCommentLike(comment.id)}>
                  Like {commentLikes[comment.id] || 0}
                </button>
              </span>{" "}
              <span className={styles.commentCreatedBefore}>
                <button onClick={() => handleReplyClick(comment.id)}>Reply</button>
              </span>
              {user.id === comment.user.id && <span className={styles.commentCreatedBefore}>
                <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
              </span>}
            </div>
            <div style={{ marginLeft: `0.5rem` }} className={styles.commentWriterHeadline}>
              {comment.user.about}
            </div>
            <div dangerouslySetInnerHTML={{ __html: comment.body }} />

            {replyingTo === comment.id && (
              <div className={styles.inlineCommentEditor}>
                <RichEditor onEditorChange={setCommentContent} />
                <div className={styles.commentEditorActions}>
                  <button onClick={() => {
                    setReplyingTo(null);
                    setCommentContent("");
                  }}>Cancel</button>
                  <button onClick={handleCommentSubmit}>Reply</button>
                </div>
              </div>
            )}

            {childReplies.length > 0 && (
              <>
                <button className={styles.viewRepliesButton} onClick={() => toggleReplies(comment.id)}>
                  {showReplies ? "Hide Replies" : `View Replies (${childReplies.length})`}
                </button>
                <CSSTransition
                  in={showReplies}
                  nodeRef={commentRefs.current[comment.id]}
                  timeout={300}
                  classNames={{
                    enter: styles.commentEnter,
                    enterActive: styles.commentEnterActive,
                    exit: styles.commentExit,
                    exitActive: styles.commentExitActive,
                  }}
                  unmountOnExit
                >
                  <div ref={commentRefs.current[comment.id]}>
                    {renderComments(comment.id, depth + 1)}
                  </div>
                </CSSTransition>
              </>
            )}
          </div>
        </CSSTransition>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <ProfilePic src={data.user.avatar || defaultProfilePicture} alt="Profile"></ProfilePic>
        <div className={styles.info}>
          <h3>
            {data.user.name}
            <CircleCheck className={styles.badge} />
          </h3>
          <span>{data.user.about} • {getTimeDifference(data.createdAt)}</span>
        </div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: sanitizedBody }} className={styles.postBody} />

      <div className={styles.postActions}>
        <button onClick={togglePostLike}>
          <Heart className={`${styles.iconLike} ${liked ? styles.liked : ""}`} />
          {postLikes}
        </button>
        <button onClick={handleToggleComments}>
          <MessageCircle className={styles.icon} />
          {data.comments.length}
        </button>
        <button>
          <Share2 className={styles.icon} />
        </button>
        {user.id === data.userId && (
          <button onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 className={styles.icon} />
          </button>
        )}
      </div>

      {showCommentEditor && (
        <div className={styles.commentEditor}>
          <RichEditor onEditorChange={setCommentContent} />
          <div className={styles.commentEditorActions}>
            <button onClick={handleCommentSubmit}>Comment</button>
          </div>
        </div>
      )}

      {showComments && filteredComments.length > 0 && (
        <div className={styles.commentsSection}>
          <TransitionGroup component={null}>
            {renderComments()}
          </TransitionGroup>
        </div>
      )}

      {showDeleteConfirm && (
        <div className={styles.deleteConfirmOverlay}>
          <div className={styles.deleteConfirmModal}>
            <h3>Delete Post</h3>
            <p>Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className={styles.deleteConfirmActions}>
              <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button onClick={handleDeletePost} className={styles.deleteButton}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Post.propTypes = {
  data: PropTypes.exact({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      role: PropTypes.string,
      about: PropTypes.string,
    }).isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        url: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    likes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        userId: PropTypes.string,
        postId: PropTypes.string,
      })
    ).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        body: PropTypes.string,
        createdAt: PropTypes.string,
        userId: PropTypes.string,
        user: PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
          avatar: PropTypes.string,
        }),
        parentCommentId: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
};


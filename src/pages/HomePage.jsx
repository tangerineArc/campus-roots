import { ArrowRight, Pencil, Send } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/auth-context.jsx";

import Filter from "../components/Filter.jsx";
import RichEditor from "../components/RichEditor.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SecondarySidebar from "../components/SecondarySidebar.jsx";
import Sidebar from "../components/Sidebar.jsx";

import profilePic from "../assets/default-profile-picture.jpg";
import Post from "../components/Post.jsx";
import useFetch from "../hooks/use-fetch.js";
import styles from "../styles/home-page.module.css";

export default function HomePage() {
  const { user } = useAuth();
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const options = { credentials: "include" };
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/data`, options);

  const handleStartPost = () => {
    setIsEditorVisible(true);
  };

  const handleCancelPost = () => {
    setIsEditorVisible(false);
    setEditorContent("");
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const makePost = async () => {
    if (!editorContent.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/posts/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          body: editorContent,
          userId: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      setIsEditorVisible(false);
      setEditorContent("");
      const data = await response.json();
      if (!data.success) {
        console.error("Cannot make Post");
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar currSelection="feed" />

      <main className={styles.main}>
        <nav className={styles.nav}>
          <SearchBar />
          <div>
            <Filter items={["top", "recent", "relevant"]} />
          </div>
        </nav>

        <div className={styles.donationBanner}>
          <p>
            Your alma mater shaped your journey—now, you can shape someone
            else&apos;s. A small gift can fund scholarships, enhance research,
            and create opportunities for the next generation of IIT Patna
            graduates.
          </p>
          <button className={styles.donateButton}>
            Donate Now <ArrowRight />
          </button>
        </div>

        {!isEditorVisible && (
          <div className={styles.startPost}>
            <img src={profilePic} alt="User Avatar" className={styles.avatar} />
            <button className={styles.postBtn} onClick={handleStartPost}>
              <Pencil /> Start a Post...
            </button>
          </div>
        )}

        {isEditorVisible && (
          <div className={styles.editor}>
            <RichEditor onEditorChange={handleEditorChange} />
            <div>
              <button onClick={handleCancelPost}>Cancel</button>
              <button onClick={makePost}>
                <Send /> Post
              </button>
            </div>
          </div>
        )}

        <div className={styles.feed}>
          {data?.posts?.map((post) => (
            <Post key={post.id} data={post} className={styles.post} />
          ))}
        </div>
      </main>

      <SecondarySidebar />
    </div>
  );
};

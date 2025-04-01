import { Sprout } from "lucide-react";

import styles from "../styles/site-logo.module.css";

export default function SiteLogo() {
  return (
    <div className={styles.logo}>
      <Sprout size={64} strokeWidth={1.2} className="icon" />
      <div>
        <span>Campus</span>
        <span>Roots</span>
      </div>
    </div>
  );
}

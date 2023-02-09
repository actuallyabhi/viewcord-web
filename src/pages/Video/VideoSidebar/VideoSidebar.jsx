import React, { useEffect } from "react";
import styles from "./VideoSidebar.module.css";
import { SideBarVideoCard} from "../../../components/utils/ContentCards/VideoCard/VideoCard";

const VideoSidebar = ({ streams, loading }) => {
  return (
    <div className="m-2  grow">
      <div className={styles.videoSidebar}>
          <div className="flex flex-col">
            {streams && streams.map((stream) => <SideBarVideoCard {...stream} />)}
          </div>
      </div>
    </div>
  );
};

export default VideoSidebar;

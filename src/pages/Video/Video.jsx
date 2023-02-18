import React, { useEffect, useState } from "react";
import { getVideo } from "../../components/common/FetchFuctions";
import "./Video.css";
import Player from "../../components/utils/VideoPlayer/VideoPlayer";
import {useSearchParams, useNavigate} from 'react-router-dom'
import dash from "../../components/utils/DashUtils";
import VideoDetails from "./VideoDetails/VideoDetails";
import VideoSidebar from "./VideoSidebar/VideoSidebar";
import MetaHelmet from "../../components/common/MetaHelmet";

const Video = () => {
  const [fetchedData, setFetchedData] = React.useState(null);
  const [videoId , setVideoId] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [source, setSource] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true); 
    setVideoEnded(false);
    const video_id = searchParams.get('v');
    setVideoId(video_id);
    FetchVideoURL(video_id);
  }, [searchParams.get("v")]);

  useEffect(() => {
    if (videoEnded) {
      navigate(fetchedData?.relatedStreams[0].url);
    }
  }, [videoEnded]);
  
  const FetchVideoURL = async (video_id) => {
    if (videoId == video_id) {
      return; 
    } 
    const data = await getVideo(video_id);
    setFetchedData(data);
    const { videoStreams, audioStreams, duration  } = data;
    genrateDash([...videoStreams, ...audioStreams], duration);
    // console.log(data);
  }
  const genrateDash = async (raw_streams,duration) => {
    const genratedFile =  dash.generate_dash_file_from_formats(raw_streams,duration);
    let data = "data:text/xml;charset=utf-8," + encodeURIComponent(genratedFile)
    setSource(data)
    setLoading(false);
  };

  return (
    <>
    <MetaHelmet
      title={fetchedData?.title ? fetchedData.title : "Loading..."}
    />

      <div className="m-2 lg:ml-5 relative">
        <div className="flex flex-col grow xl:flex-row lg:gap-2">
          <div className="flex flex-col grow items-center">
            <div className="player-container">
              {/* {loading && <Loader />} */}
              <Player
                src={source}
                captions={fetchedData?.subtitles}
                thumbnail={fetchedData?.thumbnailUrl}
                onVideoEnded={() => setVideoEnded(true)}
              />
            </div>
            <VideoDetails fetchedData={fetchedData} />
          </div>
          <VideoSidebar
            loading={loading}
            streams={fetchedData?.relatedStreams}
          />
        </div>
      </div>
    </>
  );
};

export default Video;

import React, {  lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import NewHome from "./pages/NewHome/NewHome";
import Navbar from "./components/common/Navigation/Navbar";
import SideBar from "./components/common/Navigation/Sidebar";
import {SmallLoader,Loader} from "./components/common/Loader/Loader";
import { getLocal, setLocal } from "./components/utils/StorageUtils";
import { HotKeys } from "react-hotkeys";

const Home = lazy(() => import ("./pages/Home/Home"));
const Channel = lazy(() => import ("./pages/Channel/Channel"));
const Search = lazy(() => import ("./pages/Search/Search"));
const Video = lazy(() => import ("./pages/Video/Video"));
const Playlist = lazy(() => import ("./pages/Playlist/Playlist"));
const Preferences = lazy(() => import ("./pages/Preferences/Preferences"));
const Subscriptions = lazy(() => import ("./pages/Subscriptions/Subscriptions"));
const Library = lazy(() => import ("./pages/Library/Library"));


const App = () => {
  const theme = useSelector((state) => state.theme);
  const playerRef= React.useRef(null);
  const searchRef = React.useRef(null);

  function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}
const keyMap = {
  SEARCH : "s", 
  PLAYPAUSE : "space",
  FULLSCREEN : "f",
  CAPTIONS : "c",
  FORWORD: "right",
  BACKWARD: "left",
  VOLUP: "u",
  VOLDOWN: "d",
  MUTE: "m" ,
};

const handlers = {

  SEARCH: (e) => {
    console.log("search");
    if (searchRef.current) {
      searchRef.current.focus();
    }
  },
  PLAYPAUSE: (e) => {
    e.preventDefault();
    if(playerRef.current){
      playerRef.current.paused ? playerRef.current.play() : playerRef.current.pause();
    }
  },
  FULLSCREEN: () => {
    if(playerRef.current){
      // check if in fullscreen mode
      document.fullscreenElement ? document.exitFullscreen() : (playerRef.current.requestFullscreen ? playerRef.current.requestFullscreen() : playerRef.current.webkitRequestFullscreen());
    }
  },
  // CAPTIONS: () => {
  //   if(playerRef.current){
  //     // toggle captions
  //     playerRef.current.textTracks[0].mode === "showing" ? playerRef.current.textTracks[0].mode = "hidden" : playerRef.current.textTracks[0].mode = "showing";
  //   }
  // },
  FORWORD: () => {
    if(playerRef.current){
      playerRef.current.currentTime += 10;
    }
  },
  BACKWARD: () => {
    if(playerRef.current){
      playerRef.current.currentTime -= 10;
    }
  },
  VOLUP: () => {
    if(playerRef.current){
      playerRef.current.volume += 0.1;
    }
  },
  VOLDOWN: () => {
    if(playerRef.current){
      playerRef.current.volume -= 0.1;
      // alert(playerRef.current.volume);
    }
  },
  MUTE: () => {
    if(playerRef.current){
      playerRef.current.muted = !playerRef.current.muted;
    }
  },
  
};
return (
  <HotKeys keyMap={keyMap} handlers={handlers}>
    <div className={theme == "light" ? "" : "dark"}>
      <div className="flex flex-col grow h-[100dvh] bg-grey-200 dark:bg-slate-700 items-center overflow-hidden">
      <Navbar className="flex-grow-0 " 
      searchRef={searchRef}
      />
        <div className="flex flex-col-reverse md:flex-row m-0 p-0 min-w-full min-h-full h-full grow overflow-hidden">
          <SideBar />
          <div className="flex flex-col w-full h-full">
          <SmallLoader />
          <div className="w-full h-[94%] relative md:h-[100%] overflow-hidden overflow-y-scroll pb-[88px] md:pb-[75px] ">
            <Suspense fallback={ <Loader />    }>
              <Routes>
                <Route exact path="/trending" element={<Home isTrending={true} />} />
                <Route exact path="/channel/:channelId" element={<Channel />} />
                <Route exact path="/results" element={<Search />} />
                <Route exact path="/playlist" element={<Playlist />} />
                <Route exact path="/watch" element={<Video 
                playerRef={playerRef}
                />} />
                <Route exact path="/preferences" element={<Preferences />} />
                <Route exact path="/feed/subscriptions" element={<Subscriptions />} />
                <Route exact path="/feed/library" element={<Library />} />

                {getLocal("token") ? <Route path="/" element={<NewHome />} /> : <Route path="/" element={<Home />} />}
              </Routes>
            </Suspense>
          </div>
          </div>
        </div>
      </div>
    </div>
    </HotKeys>
  );
};

export default App;

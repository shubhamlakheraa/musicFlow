import React from "react";
import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";

const staggerSongList = stagger(0.1, { startDelay: 0.15 });

function useListAnimation(data) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "div",
      data
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: data ? staggerSongList : 0,
      }
    );
  }, [data]);

  return scope;
}

const ListSongs = ({ musicData, setSingleSong }) => {
  const [active, setActive] = useState(false);
  const [topTracksOnly, setTopTracksOnly] = useState(false);
  const scope = useListAnimation(musicData ? musicData.data : "");

  const renderSong = (res) => {
    setSingleSong(res);
  };

  let list = null;

  if (musicData) {
    if (topTracksOnly) {
      // Filter the data for top tracks
      const topTracks = musicData.data.filter((song) => song.top_track);
      list = topTracks.map((song) => (
        <div
          onClick={() => renderSong(song)}
          key={song.id}
          className="list flex justify-between items-center hover:bg-[#FFFFFF14] p-[14px] rounded-lg cursor-pointer "
        >
          <div className="flex">
            <img
              className="w-[48px] h-[48px] rounded-[56px] "
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt={song.name}
            />
            <div className="ml-5">
              <p className="text-white">{song.name}</p>
              <p className="text-white font text-sm opacity-[40%]">
                {song.artist}
              </p>
            </div>
          </div>
          <p className="text-white opacity-[60%] text-sm">4:37</p>
        </div>
      ));
    } else {
      // Render all songs
      list = musicData.data.map((song) => (
        <div
          onClick={() => renderSong(song)}
          key={song.id}
          className="list flex justify-between items-center hover:bg-[#FFFFFF14] p-[14px] rounded-lg cursor-pointer"
        >
          <div className="flex">
            <img
              className="w-[48px] h-[48px] rounded-[56px] "
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt={song.name}
            />
            <div className="ml-5">
              <p className="text-white">{song.name}</p>
              <p className="text-white font text-sm opacity-[40%]">
                {song.artist}
              </p>
            </div>
          </div>
          <p className="text-white opacity-[60%] text-sm">4:37</p>
        </div>
      ));
    }
  }

  const handleClick = () => {
    setActive(!active);

    setTopTracksOnly(true);
  };

  const handleClick2 = () => {
    if (topTracksOnly) {
      // Toggle topTracksOnly when "Top Tracks" is clicked
      setTopTracksOnly(false);
    }
  };
  console.log(musicData);

  return (
    <>
      <div ref={scope} className="relative  left-[280px]   ">
        <div className="flex">
          <span
            onClick={handleClick2}
            className={`text-white font-bold text-[24px] mx-7 cursor-pointer ${
              topTracksOnly ? "opacity-[60%]" : ""
            } `}
          >
            For You
          </span>
          <span
            onClick={handleClick}
            className={`text-white font-bold text-[24px] ${
              !topTracksOnly ? "opacity-[60%]" : ""
            } cursor-pointer `}
          >
            Top Tracks
          </span>
        </div>

        <div className="flex justify-between relative top-3 left-8">
          <form className="">
            <input
              className="bg-[#FFFFFF14] rounded-lg p-1 pr-4 pb-1 pl-4 opacity-[60%] w-[350px] "
              placeholder="Search Songs, Artist"
            />
          </form>

          <div className="flex items-center">
            <span className="absolute left-[-2rem]">
              <img
                src="/search.png"
                className=" w-[16px] h-[16px] opacity-[40%]"
              />
            </span>
          </div>
        </div>

        <div className="relative top-10 left-6 ">{list}</div>
      </div>
    </>
  );
};

export default ListSongs;

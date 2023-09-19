import React from "react";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import useResponsive from "../hooks/useResponsive";


const MusicPlayer = ({ singleSong, musicData, setSingleSong }) => {
  const [isPlay, setIsPlay] = useState(false);
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  const [seconds, setSeconds] = useState();
  const [play, { pause, duration, sound }] = useSound(
    singleSong ? singleSong.url : ""
  );

  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const { isMobile, isTablet, isDesktop } = useResponsive();

  useEffect(() => {}, [singleSong]);

  const handleClick = () => {
    setIsPlay(!isPlay);
  };

  const handleVolumeChange = (e) => {
    if (sound) {
      sound.volume = parseFloat(e.target.value);
    }
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlay]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlay) {
      pause();
      setIsPlay(false);
    } else {
      play();
      setIsPlay(true);
    }
  };

  //  useEffect(() => {

  //  }, [singleSong])

  const nextClick = () => {
    const currentIndex = musicData.data.findIndex(
      (song) => song.id === singleSong.id
    );

    const nextIndex = (currentIndex + 1) % musicData.data.length;

    const nextSong = musicData.data[nextIndex];

    setSingleSong(nextSong);
  };

  const prevClick = () => {
    const currentIndex = musicData.data.findIndex(
      (song) => song.id === singleSong.id
    );

    const prevIndex =
      (currentIndex - 1 + musicData.data.length) % musicData.data.length;

    const prevSong = musicData.data[prevIndex];

    setSingleSong(prevSong);
  };

  return (
    <>
      <div className={`text-white mt-[3rem] ${!isDesktop ? "" : "mr-[18%]"}`}>
        <div className={`${!isDesktop ? "ml-[4rem]" : ""}`}>
          <h1 className="text-2xl font-bold">
            {singleSong ? singleSong.name : ""}
          </h1>
          <h1 className="opacity-[60%] text-base ">
            {singleSong ? singleSong.artist : ""}
          </h1>
        </div>
        <div className="mt-5 flex flex-col items-center ">
          <img
            className={`${
              !isDesktop ? "w-[240px] h-[240px]" : "w-[360px] h-[360px]"
            } rounded-md `}
            src={`https://cms.samespace.com/assets/${
              singleSong ? singleSong.cover : ""
            }`}
          />
          <input
            type="range"
            min="0"
            max={duration / 1000}
            default="0"
            value={seconds}
            className={` ${!isDesktop ? "w-[60%]" : "w-[80%]"}   mt-[2rem] `}
            onChange={(e) => {
              sound.seek([e.target.value]);
            }}
          />
        </div>

        <div
          className={`mt-10 flex items-center ${
            !isDesktop ? "justify-evenly  " : "justify-around"
          }`}
        >
          <button className="rounded-full w-[32px] h-[32px] shadow-[2px_2px_10px_rgba(0,0,0,0,0.13)] bg-[#2C2C2C] flex items-center justify-center">
            <img className="" src="/dots.png" />
          </button>

          <div className="flex items-center justify-around w-[176px]">
            <button onClick={prevClick}>
              <img src="left.png" />
            </button>

            <button
              onClick={playingButton}
              className={`rounded-full w-[32px] h-[32px] flex items-center justify-center ${
                isPlay ? "bg-white" : ""
              }`}
            >
              {isPlay ? (
                <img className="h-[15px]" src="/play.png" />
              ) : (
                <img src="/pause.png" />
              )}
            </button>
            <button onClick={nextClick}>
              <img src="/right.png" />
            </button>
          </div>

          <button
            onClick={toggleVolumeVisibility}
            className="rounded-full w-[32px] h-[32px] shadow-[2px_2px_10px_rgba(0,0,0,0,0.13)] bg-[#2C2C2C] flex items-center justify-center"
          >
            <img className=" w-[15px] h-[12px] " src="sound.png" />
          </button>
          {isVolumeVisible && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sound ? sound.volume : 0}
              onChange={handleVolumeChange}
              className="w-[60px] h-[8px]"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;

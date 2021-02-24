import { useRef, useState, useEffect } from "react"
// import { playAudio } from "../util"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons"

function Player({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) {
  // useEffect(() => {
  //   const newSongs = songs.map((item) => {
  //     if (item.id === currentSong.id) {
  //       return {
  //         ...item,
  //         active: true,
  //       }
  //     } else {
  //       return {
  //         ...item,
  //         active: false,
  //       }
  //     }
  //   })
  //   setSongs(newSongs)
  // }, [currentSong])
  const activeLibraryHandler = (nextprev) => {
    const newSongs = songs.map((item) => {
      if (item.id === nextprev.id) {
        return {
          ...item,
          active: true,
        }
      } else {
        return {
          ...item,
          active: false,
        }
      }
    })
    setSongs(newSongs)
  }
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  const getTime = (time) => {
    return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
  }

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id)

    if (direction === "forward") {
      if (songs.length - 1 === currentIndex) {
        await setCurrentSong(songs[0])
        activeLibraryHandler(songs[0])
      } else {
        await setCurrentSong(songs[currentIndex + 1])
        activeLibraryHandler(songs[currentIndex + 1])
      }
    }
    if (direction === "back") {
      if (currentIndex === 0) {
        await setCurrentSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])
      } else {
        await setCurrentSong(songs[currentIndex - 1])
        activeLibraryHandler(songs[currentIndex - 1])
      }
    }
    if (isPlaying) audioRef.current.play()
  }

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercantage}%)`,
  }

  const trackBackground = {
    background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
  }

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={trackBackground} className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  )
}

export default Player

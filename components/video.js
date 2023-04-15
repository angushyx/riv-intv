import { useState, useEffect, useRef } from "react"
import styles from "../styles/Home.module.css"

const Video = () => {
  const [isVisible, setIsVisible] = useState(false) // 記錄影片是否顯示在畫面中
  const [isPlaying, setIsPlaying] = useState(false) // 記錄影片是否正在播放
  const [playbackTime, setPlaybackTime] = useState(0) // 記錄影片目前的播放時間
  const videoRef = useRef(null) // 取得 video element 的 Ref

  // 影片可以播放的 callback
  const handleCanPlay = () => {
    if (isVisible && !isPlaying) {
      setIsPlaying(true)
      videoRef.current.play()
    }
  }

  const handleIntersection = (entries) => {
    const entry = entries[0]
    // 如果影片進入畫面且至少有 30% 在畫面內設定為顯示
    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
      setIsVisible(true)
      if (!isPlaying) {
        setIsPlaying(true)
        videoRef.current.play()
      }
    } else {
      setIsVisible(false) // 設定為不顯示
      setPlaybackTime(videoRef.current.currentTime) // 記錄目前的播放時間
      setIsPlaying(false) // 設定為不播放
      videoRef.current.pause() // 暫停播放
      videoRef.current.currentTime = 0 // 回到開始的時間
    }
  }

  // 建立 IntersectionObserver，設定至少有 30% 在畫面內才算是進入畫面
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    })
    // 監聽 video element
    observer.observe(videoRef.current)

    // 解除監聽
    return () => {
      observer.disconnect()
    }
  }, [videoRef])

  // 點擊 video element 時的 callback
  const handleVideoClick = () => {
    if (isVisible) {
      if (isPlaying) {
        setIsPlaying(false)
        videoRef.current.pause()
      } else {
        setIsPlaying(true)
        if (playbackTime === 0) {
          videoRef.current.play()
        } else {
          videoRef.current.currentTime = playbackTime
          videoRef.current.play()
        }
      }
    }
  }

  // 影片播放時間更新的 callback
  const handleTimeUpdate = () => {
    if (isVisible && isPlaying) {
      setPlaybackTime(0)
    }
  }

  // 當影片不在範圍內 callback
  const handleVisibilityChange = () => {
    if (document.hidden && isPlaying) {
      setIsPlaying(false)
      setPlaybackTime(0)
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isPlaying])

  return (
    <div className={styles.video}>
      <video
        ref={videoRef}
        className={styles.video}
        src="/videos/sample.mp4"
        autoPlay={true}
        loop
        muted={true}
        controls={false}
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onCanPlay={handleCanPlay}
        currentTime={playbackTime}
      />
    </div>
  )
}

export default Video

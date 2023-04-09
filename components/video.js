import { useState, useEffect, useRef } from "react"
import styles from "../styles/Home.module.css"

const Video = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackTime, setPlaybackTime] = useState(0)
  const videoRef = useRef(null)
  console.log(playbackTime)

  const handleIntersection = (entries) => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      setIsVisible(true)
      setIsPlaying(true)
    } else {
      setIsVisible(false)
      setPlaybackTime(0)
      setIsPlaying(false)
      videoRef.current.pause()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    })
    observer.observe(videoRef.current)

    return () => {
      observer.unobserve(videoRef.current)
    }
  }, [videoRef])

  const handleVideoClick = () => {
    if (isVisible) {
      if (isPlaying) {
        setIsPlaying(false)
        videoRef.current.pause()
      } else {
        setIsPlaying(true)
        videoRef.current.play()
      }
    }
  }

  const handleTimeUpdate = () => {
    if (isVisible && isPlaying) {
      setPlaybackTime(videoRef.current.currentTime)
    }
  }

  const handleCanPlay = () => {
    if (isVisible && !isPlaying) {
      setIsPlaying(true)
      videoRef.current.play()
    }
  }

  const handleVisibilityChange = () => {
    if (document.hidden && isPlaying) {
      setIsPlaying(false)
      setPlaybackTime(0)
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  useEffect(() => {
    document.addEventListener(" ", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [isPlaying])

  console.log(isVisible, "isVisible")
  console.log(isPlaying, "isPlaying")

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
      />
    </div>
  )
}

export default Video

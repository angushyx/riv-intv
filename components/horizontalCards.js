import React, { useRef, useState } from "react"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import cardOne from "../public/images/Horizontal/Horizontal1.png"
import cardTwo from "../public/images/Horizontal/Horizontal2.png"
import cardThree from "../public/images/Horizontal/Horizontal3.png"
import cardFour from "../public/images/Horizontal/Horizontal4.png"
import cardFive from "../public/images/Horizontal/Horizontal5.png"

const HorizontalCards = () => {
  const cardImages = [cardOne, cardTwo, cardThree, cardFour, cardFive]
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [scrollTarget, setScrollTarget] = useState(0)
  const cardsWrapperRef = useRef(null)
  const multiplier = 2

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - cardsWrapperRef.current.offsetLeft)
    setScrollLeft(cardsWrapperRef.current.scrollLeft)
    setScrollTarget(null)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - cardsWrapperRef.current.offsetLeft
    const distance = (x - startX) * multiplier
    cardsWrapperRef.current.scrollLeft = scrollLeft - distance

    // 自動滑動
    const currentScrollLeft = cardsWrapperRef.current.scrollLeft
    if (distance > 0) {
      const newScrollTarget = currentScrollLeft + distance
      if (newScrollTarget > scrollTarget) setScrollTarget(newScrollTarget)
    } else {
      const newScrollTarget = currentScrollLeft + distance
      if (newScrollTarget < scrollTarget || scrollTarget === 0)
        setScrollTarget(newScrollTarget)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)

    if (scrollTarget === null) {
      const currentScrollLeft = cardsWrapperRef.current.scrollLeft
      let newScrollLeft
      if (currentScrollLeft % 300 > 150) {
        newScrollLeft = currentScrollLeft + 300 - (currentScrollLeft % 300)
      } else {
        newScrollLeft = currentScrollLeft - (currentScrollLeft % 300)
      }
      setScrollTarget(newScrollLeft)

      const scrollStep = () => {
        cardsWrapperRef.current.scrollLeft +=
          (scrollTarget - cardsWrapperRef.current.scrollLeft) / 4
        if (Math.abs(cardsWrapperRef.current.scrollLeft - scrollTarget) < 1) {
          cardsWrapperRef.current.scrollLeft = scrollTarget
        } else {
          requestAnimationFrame(scrollStep)
        }
      }

      requestAnimationFrame(scrollStep)
    }
  }

  return (
    <ul
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      ref={cardsWrapperRef}
      className={styles.shuffleCardsWrapper}
    >
      {cardImages.map((image, index) => (
        <li className={styles.shuffleCard} key={index}>
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={`card ${index + 1}`}
              width="1000"
              height="1000"
              className={styles.img}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default HorizontalCards

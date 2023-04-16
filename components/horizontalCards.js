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
  const cardsWrapperRef = useRef(null)
  const multiplier = 2

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - cardsWrapperRef.current.offsetLeft)
    setScrollLeft(cardsWrapperRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - cardsWrapperRef.current.offsetLeft
    const distance = (x - startX) * multiplier
    const currentScrollLeft = cardsWrapperRef.current.scrollLeft
    cardsWrapperRef.current.scrollLeft +=
      (currentScrollLeft - distance - scrollLeft) * 0.1
    setScrollLeft(cardsWrapperRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
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

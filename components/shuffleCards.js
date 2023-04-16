import React, { useState } from "react"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import shuffleOne from "../public/images/shuffle/shuffle1.png"
import shuffleTwo from "../public/images/shuffle/shuffle2.png"

const ShuffleCards = () => {
  const [isCardOneClicked, setIsCardOneClicked] = useState(false)
  const [isCardTwoClicked, setIsCardTwoClicked] = useState(false)

  const handleCardClick = () => {
    setIsCardOneClicked(!isCardOneClicked)
    setIsCardTwoClicked(!isCardTwoClicked)
  }

  return (
    <div className={styles.shuffleCardsWrapper}>
      <div
        className={`${styles.shuffleCardOne} ${styles.shuffleCard} ${
          isCardOneClicked ? styles.cardOneClicked : ""
        } `}
        onClick={handleCardClick}
      >
        <Image
          src={shuffleOne}
          alt="shuffleOne"
          width="1000"
          height="1000"
          className={`${styles.img} ${
            isCardOneClicked ? styles.cardOneEnlarged : ""
          }`}
        />
      </div>
      <div
        className={`${styles.shuffleCardTwo} ${styles.shuffleCard} ${
          isCardTwoClicked ? styles.cardTwoClicked : ""
        } `}
        onClick={handleCardClick}
      >
        <Image
          src={shuffleTwo}
          alt="shuffleTwo"
          width="1000"
          height="1000"
          className={`${styles.img} ${
            isCardTwoClicked ? styles.cardTwoEnlarged : ""
          }`}
        />
      </div>
    </div>
  )
}

export default ShuffleCards

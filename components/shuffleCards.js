import React, { useState } from "react"
import styles from "../styles/Home.module.css"
import Image from "next/image"
import shuffleOne from "../public/images/shuffle/shuffle1.png"
import shuffleTwo from "../public/images/shuffle/shuffle2.png"

const ShuffleCards = () => {
  const [isCardOneOnTop, setIsCardOneOnTop] = useState(true)

  const handleCardClick = () => {
    setIsCardOneOnTop((prev) => !prev)
  }

  return (
    <div className={styles.shuffleCardsWrapper}>
      <div
        className={`${styles.shuffleCardOne} ${styles.shuffleCard} ${
          isCardOneOnTop ? styles.cardOneOnTop : styles.cardTwoOnTop
        }`}
        onClick={handleCardClick}
      >
        <Image
          src={shuffleOne}
          alt="shuffleOne"
          width="1000"
          height="1000"
          className={styles.img}
        />
      </div>
      <div
        className={`${styles.shuffleCardTwo}  ${styles.shuffleCard} ${
          isCardOneOnTop ? styles.cardTwoOnTop : styles.cardOneOnTop
        }`}
        onClick={handleCardClick}
      >
        <Image
          src={shuffleTwo}
          alt="shuffleTwo"
          width="1000"
          height="1000"
          className={styles.img}
        />
      </div>
    </div>
  )
}

export default ShuffleCards

import React,{useState,useEffect} from 'react'
import styles from "../styles/Home.module.css"

const Header = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset

      if (scrollTop > lastScroll && scrollTop > 300) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      setLastScroll(scrollTop)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScroll])

  const headerClasses = `${styles.header} ${
    isScrolled ? `${styles.header} ${styles.hide}` : `${styles.header}`
  }`

  return <header className={headerClasses}>{children}</header>
}

export default Header
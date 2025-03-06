import React, { useState, useEffect } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger icon
import { RiCloseLine } from "react-icons/ri"; // Import close icon (cross)

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMenuOpen(false); // Reset menu to closed on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    home: {
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      justifyContent: "flex-start",
      height: "100vh",
      backgroundColor: "#F8F5F2",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
      padding: isMobile ? "20px" : "0 110px",
      overflowX: "hidden",
      textAlign: isMobile ? "center" : "left",
      paddingTop: "80px",
    },
    navbar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "100px",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 2000,
      backgroundColor: "#F8F5F2",
      color: "#1A1A19",
      padding: isMobile ? "10px 20px" : "10px 110px",
      boxSizing: "border-box", // Ensure padding is considered in width calculation
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center", // Ensure logo stays centered
      marginLeft: isMobile ? "0" : "0px", // Adjust based on screen size
      marginRight: isMobile ? "0" : "50px",
    },
    logo: {
      height: "50px",
    },
    navItems: {
      display: isMobile && !menuOpen ? "none" : "flex", // Hide nav on mobile if not open
      flexDirection: isMobile ? "column" : "row", // Change direction to column on mobile
      justifyContent: isMobile ? "flex-start" : "flex-end", // Align items to the left on mobile
      alignItems: "flex-start", // Align items to the left on mobile
      textAlign: isMobile ? "left" : "center", // Align text to the left on mobile
      position: isMobile && menuOpen ? "absolute" : "relative", // Absolute position when menu is open on mobile
      top: isMobile && menuOpen ? "105px" : "auto", // Position the menu below the icon
      left: isMobile && menuOpen ? "50%" : "auto", // Center the menu horizontally
      transform: isMobile && menuOpen ? "translateX(-50%)" : "none", // Adjust the translation to ensure proper centering
      width: isMobile && menuOpen ? "300px" : "auto", // Set width to 100px when menu is open on mobile
      backgroundColor: isMobile ? "rgba(255, 255, 255, 0.9)" : "#F8F5F2", // Semi-transparent background on mobile
      backdropFilter: isMobile && menuOpen ? "blur(10px)" : "none", // Apply blur effect on mobile
      zIndex: 1000, // Ensure it displays over the content
      transition: "top 0.3s ease, width 0.3s ease", // Smooth transition for opening menu
      boxShadow: isMobile && menuOpen ? "4px 4px 0px #1A1A1A" : "none", // Add shadow when menu is open
      borderRadius: isMobile ? "8px" : "0px",
      border: isMobile ? "2px solid black" : "0px solid black",
    },
    overlay: {
      display: isMobile && menuOpen ? "block" : "none", // Show overlay when the menu is open
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent dark overlay
      zIndex: 999, // Ensures the overlay appears over content but under the menu
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center vertically
    },
    navItem: {
      margin: isMobile ? "10px 0" : "0 30px", // Adjust spacing for mobile
      cursor: "pointer",
      textDecoration: "none",
      color: "rgb(39, 39, 39)",
      fontWeight: "700",
      fontSize: isMobile ? "20px" : "20px",
      marginLeft: isMobile ? "25px" : "0px",
    },
    menuIcon: {
      display: isMobile ? "block" : "none", // Only show hamburger menu on mobile
      fontSize: "30px",
      cursor: "pointer",
    },
    hero: {
      textAlign: isMobile ? "center" : "left",
      marginTop: isMobile ? "40px" : "130px",
      marginLeft: isMobile ? "0px" : "0px",
    },
    title: {
      color: "#484541",
      fontSize: isMobile ? "17px" : "20px",
      fontWeight: "600",
      margin: "0",
      marginLeft: isMobile ? "0px" : "0px",
      textAlign: isMobile ? "centre" : "left", // Ensures left alignment even on mobile
    },
    description: {
      fontSize: isMobile ? "55px" : "95px",
      fontWeight: "900",
      margin: "0",
      fontFamily: "'Roboto', sans-serif",
      marginLeft: isMobile ? "0px" : "0px",
      marginTop: "10px",
      color: "rgb(39, 39, 39)",
      textAlign: isMobile ? "centre" : "left", // Left alignment on mobile
    },
    infoDescription: {
      color: "#484541",
      fontSize: isMobile ? "17px" : "20px",
      fontWeight: "600",
      marginTop: "10px",
      textAlign: isMobile ? "centre" : "left", // Ensure left alignment
      marginLeft: isMobile ? "0px" : "0px",
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: isMobile ? "row" : "row",
      alignItems: "center",
      gap: isMobile ? "10px" : "20px",
      marginLeft: isMobile ? "0px" : "0px",
      marginTop: "20px",
    },
    iconButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px 20px",
      fontSize: "20px",
      color: "rgb(39, 39, 39)",
      backgroundColor: "#F3C623",
      border: "2px solid black",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "700",
      boxShadow: "4px 4px 0px #1A1A1A",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    iconButtonHover: {
      transform: "translateY(-6px)",
      boxShadow: "6px 6px 0px #1A1A1A",
    },
    get_started: {
      width: isMobile ? "100%" : "200px",
      maxWidth: "300px",
      marginLeft: isMobile ? "0px" : "350px",
      marginTop: isMobile ? "20px" : "-85px",
      zIndex: 20,
    },
    hero_image: {
      width: isMobile ? "100%" : "500px",
      maxWidth: isMobile ? "300px" : "600px",
      marginLeft: isMobile ? "0px" : "800px",
      marginTop: isMobile ? "20px" : "-465px", // Increase the negative margin value
      position: "relative", // Add relative positioning
      top: isMobile ? "0px" : "-120px", // Adjust the top position for non-mobile
      zIndex: 1000,
    },
    serviceSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: "#FFF",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
      padding: isMobile ? "20px" : "0 110px",
      overflowX: "hidden",
      paddingTop: isMobile ? "5px" : "30px",
      paddingBottom: isMobile ? "5px" : "30px",
    },
    serviceTitle: {
      fontSize: isMobile ? "40px" : "50px",
      color: "rgb(39, 39, 39)",
      fontWeight: "900",
      textAlign: "center",
      fontFamily: "'Roboto', sans-serif",
    },
    serviceCardsContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row", // Stack cards in column on mobile
      justifyContent: "center",
      alignItems: "center",
      gap: "50px", // Space between the cards
      flexWrap: "wrap", // Ensure wrapping on smaller screens
    },
    serviceCard: {
      borderRadius: "25px",
      height: isMobile ? "550px" : "600px",
      width: isMobile ? "340px" : "360px",
      backgroundColor: "#F8F5F2",
      boxShadow: "4px 4px 0px #1A1A1A",
      border: "2px solid black",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    serviceCardHover: {
      transform: "translateY(-6px)",
      boxShadow: "6px 6px 0px #1A1A1A",
    },
    serviceicon: {
      top: "10px",
      left: "0px",
      width: "200px", // Adjust size as needed
      height: "200px",
      display: "block",
    },
    servicetype: {
      marginLeft: "25px",
      fontFamily: "'Nunito', sans-serif",
      fontSize: isMobile ? "28px" : "28px",
      fontWeight: "900",
      zIndex: "200",
      marginTop: "-20px",
    },
    serviceinfo: {
      marginLeft: "25px",
      fontFamily: "'Nunito', sans-serif",
      fontSize: isMobile ? "17spx" : "18px",
      marginRight: "25px",
      fontWeight: "600",
      color: "#484541",
      zIndex: "200",
      marginTop: "",
    }
  };

  return (
    <div>
      <div style={styles.home}>
        <nav style={styles.navbar}>
          <div style={styles.logoContainer}>
            <img src="/mattia-logo.png" alt="Mattia Logo" style={styles.logo} />
            <span
              style={{ fontSize: "20px", fontWeight: "800", color: "black" }}
            >
              mattia.digital
            </span>
          </div>
          <div style={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <RiCloseLine /> : <GiHamburgerMenu />}{" "}
            {/* Render the close icon when menu is open */}
          </div>
          <div style={styles.navItems}>
            <a style={styles.navItem} href="#about">
              About
            </a>
            <a style={styles.navItem} href="#what-i-do">
              What I Do
            </a>
            <a style={styles.navItem} href="#my-work">
              My Work
            </a>
          </div>
          <div style={styles.overlay} onClick={() => setMenuOpen(false)}></div>
        </nav>

        <header style={styles.hero}>
          <h1 style={styles.title}>Hi, my name is Mattia.</h1>
          <p style={styles.description}>
            I DESIGN FOR <br />
            GROWTH.
          </p>
          <p style={styles.infoDescription}>
            I’m a Software Developer passionate about creating,{" "}
            {!isMobile && <br />} {/* Only add a line break if not mobile */}
            impactful web applications and helping others grow in tech.
          </p>

          <div style={styles.buttonsContainer}>
            <button
              style={{
                ...styles.iconButton,
                ...(hoveredButton === "cv" ? styles.iconButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("cv")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              Open cv
            </button>
            <button
              style={{
                ...styles.iconButton,
                ...(hoveredButton === "instagram"
                  ? styles.iconButtonHover
                  : {}),
              }}
              onMouseEnter={() => setHoveredButton("instagram")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <AiFillInstagram />
            </button>
            <button
              style={{
                ...styles.iconButton,
                ...(hoveredButton === "whatsapp" ? styles.iconButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("whatsapp")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <IoLogoWhatsapp />
            </button>
            <button
              style={{
                ...styles.iconButton,
                ...(hoveredButton === "linkedin" ? styles.iconButtonHover : {}),
              }}
              onMouseEnter={() => setHoveredButton("linkedin")}
              onMouseLeave={() => setHoveredButton(null)}
            >
              <FaLinkedin />
            </button>
          </div>
          {!isMobile && (
            <img
              src="/Get_Started.png"
              alt="Get Started"
              style={styles.get_started}
            />
          )}
          <img src="/hero3.png" alt="Get Started" style={styles.hero_image} />
        </header>
      </div>
      <div style={styles.serviceSection}>
        <div>
          <p style={styles.serviceTitle}>What I can do for you</p>
        </div>
        <div style={styles.serviceCardsContainer}>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              style={{
                ...styles.serviceCard,
                ...(hoveredCard === index ? styles.serviceCardHover : {}),
                position: "relative", // Ensure relative positioning for the card
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {index === 0 && (
                <>
                  <img
                    src="/ui-ux.png"
                    alt="UI/UX Design"
                    style={styles.serviceicon}
                  />
                  <p style={{ ...styles.servicetype }}>Web & Mobile UI/UX</p>
                  <p style={{...styles.serviceinfo}}>
                    I specialize in designing mobile apps, websites, and
                    eCommerce stores.
                    <br />
                    <br />
                    For web and mobile app design, I primarily use Figma for the
                    design process and provide a smooth handoff to your
                    developer. For personal or small-scale websites, I can also
                    handle the development side, offering a complete solution
                    from design to implementation.
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

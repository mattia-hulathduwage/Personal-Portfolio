import React, { useState, useEffect } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi"; // Import hamburger icon
import { RiCloseLine } from "react-icons/ri"; // Import close icon (cross)
import { db } from "../firebase";
import { ref, set, push } from "firebase/database"; // Import Firebase methods


const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault(); // Prevent default anchor behavior

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth", // Smooth scroll
        block: "start", // Align the section at the top of the viewport
      });
    }
  };

  const handleOpenCV = () => {
    window.open("/H-MATTIA-FULLSTACK.pdf", "_blank");
  };

  const projectImages = [
    "portfolio-ui.png",
    "e-commerce-ui.png",
    "expense-tracker-ui.png",
    "med-ui.png",
    "cream-ui.png",
    "figma1.png",
    "car-rent-ui.png",
    "dip-ui.png", // Add all your images here
    "restaurant-ui.png",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    projectType: "",
    details: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const messagesRef = ref(db, "contacts"); // Reference to 'contacts' node
      const newMessageRef = push(messagesRef); // Create a new entry
      await set(newMessageRef, {
        ...formData,
        createdAt: new Date().toISOString(),
      });

      alert("Message sent successfully!");

      // Clear the form fields by resetting state
      setFormData({
        name: "",
        email: "",
        website: "",
        projectType: "",
        details: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to send message.");
    }
  };
    
    

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
      paddingTop: "50px",
    },
    navbar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "0px",
      position: "relative", // Change this from "fixed" to "relative"
      top: 0,
      left: 0,
      zIndex: 2000,
      backgroundColor: "#F8F5F2",
      color: "#1A1A19",
      padding: isMobile ? "0px 0px" : "0px 0px",
      paddingBottom: isMobile ? "30px" : "opx",
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
      top: isMobile && menuOpen ? "55px" : "auto", // Position the menu below the icon
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
      marginLeft: isMobile ? "0px" : "0px",
    },
    title: {
      color: "#484541",
      fontSize: isMobile ? "17px" : "20px",
      fontWeight: "600",
      margin: "0",
      marginLeft: isMobile ? "0px" : "0px",
      textAlign: isMobile ? "centre" : "left", // Ensures left alignment even on mobile
      paddingTop: isMobile ? "40px" : "157px",
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
    aboutSection: {
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
    aboutTitle: {
      fontSize: isMobile ? "40px" : "50px",
      color: "rgb(39, 39, 39)",
      fontWeight: "900",
      textAlign: isMobile ? "center" : "center",
      fontFamily: "'Roboto', sans-serif",
    },
    aboutContent: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0px",
    },
    aboutMeText: {
      flex: 1,
      textAlign: isMobile ? "center" : "left",
      fontSize: isMobile ? "17spx" : "20px",
      fontWeight: isMobile ? "600" : "600",
      color: "#484541",
    },
    passionstyle: {
      fontWeight: isMobile ? "800" : "800",
    },
    hiretopic: {
      fontWeight: "800",
      fontSize: "26px",
    },
    aboutImageContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
    },
    aboutImage: {
      width: "90%",
      borderRadius: "0px",
      marginLeft: isMobile ? "0" : "150px",
    },
    serviceSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: "#F8F5F2",
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
      backgroundColor: "#fff",
      boxShadow: "4px 4px 0px #1A1A1A",
      border: "2px solid black",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      marginBottom: "10px",
    },
    serviceCardHover: {
      transform: "translateY(-6px)",
      boxShadow: "6px 6px 0px #1A1A1A",
    },
    serviceicon: {
      top: "10px",
      marginTop: isMobile ? "-15px" : "0px",
      left: "0px",
      width: "200px", // Adjust size as needed
      height: "200px",
      display: "block",
    },
    serviceicon1: {
      top: "10px",
      marginTop: isMobile ? "-15px" : "0px",
      marginLeft: "-10px",
      width: "200px", // Adjust size as needed
      height: "200px",
      display: "block",
    },
    servicetype: {
      marginLeft: "25px",
      fontFamily: "'Nunito', sans-serif",
      fontSize: isMobile ? "28px" : "28px",
      fontWeight: "800",
      zIndex: "200",
      marginTop: "-20px",
    },
    serviceinfo: {
      marginLeft: "25px",
      fontFamily: "'Nunito', sans-serif",
      fontSize: isMobile ? "17spx" : "17px",
      marginRight: "25px",
      fontWeight: "600",
      color: "#484541",
      zIndex: "200",
      marginTop: "",
    },
    ProjectSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      backgroundColor: "#fff",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
      padding: isMobile ? "20px" : "0 110px",
      overflowX: "hidden",
      paddingTop: isMobile ? "5px" : "30px",
      paddingBottom: isMobile ? "5px" : "0px",
    },
    projectContainer: {
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(3, 1fr)",
      width: isMobile ? "calc(100% + 40px)" : "calc(100% + 220px)",
      margin: isMobile ? "0 -20px" : "0 -110px",
      boxSizing: "border-box",
      backgroundColor: "black",
    },
    projectItem: {
      position: "relative",
      width: "100%",
      height: isMobile ? "250px" : "310px", // Set a fixed height for consistency
      overflow: "hidden", // Ensure image does not overflow
    },
    projectImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover", // Ensure the image covers the container
      transition: "transform 0.2s ease, filter 0.2s ease",
    },
    projectImageHover: {
      transform: "scale(1.1)", // Zoom effect
      filter: "brightness(0.7)", // Darken effect
    },
    contactSection: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      backgroundColor: "#F8F5F2",
      fontFamily: "'Nunito', sans-serif",
      padding: isMobile ? "20px" : "0 110px",
      overflowX: "hidden",
      paddingTop: "0px",
      paddingBottom: "70px",
    },
    contactLeft: {
      flex: 1,
      marginRight: isMobile ? "0" : "0px",
      textAlign: isMobile ? "center" : "left",
    },
    contactRight: {
      flex: 1,
      display: "flex",
      justifyContent: "center", // Center horizontally
      alignItems: "center", // Center horizontally
      paddingTop: "50px",
      marginLeft: isMobile ? "0" : "80px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      alignItems: isMobile ? "center" : "flex-end", // Align form fields to the center on mobile
      width: "100%", // Ensure form takes the full width
    },
    inputField: {
      marginLeft: isMobile ? "5px" : "0px",
      padding: "12px",
      borderRadius: "12px",
      border: "2px solid black",
      fontSize: "16px",
      width: isMobile ? "90%" : "50%", // Limit width to 80% on mobile to make them look good
      boxShadow: "4px 4px 0px #1A1A1A",
      fontFamily: "'Roboto', sans-serif",
      outline: "none", // Removes the default blue outline
    },
    dropDown: {
      marginLeft: isMobile ? "5px" : "0px",
      padding: "12px",
      borderRadius: "12px",
      border: "2px solid black",
      fontSize: "16px",
      width: isMobile ? "98%" : "53%", // Limit width to 80% on mobile to make them look good
      height: "48px", // Adjust height to match input fields
      boxShadow: "4px 4px 0px #1A1A1A",
      fontFamily: "'Nunito', sans-serif",
      outline: "none", // Removes the default blue outline
      backgroundColor: "white",
      color: "#484541",
      fontWeight: "700",
    },
    textArea: {
      padding: "12px",
      borderRadius: "12px",
      border: "2px solid black",
      fontSize: "16px",
      width: isMobile ? "90%" : "95%",
      height: "150px",
      resize: "none",
      boxShadow: "4px 4px 0px #1A1A1A",
      fontFamily: "'Roboto', sans-serif",
      outline: "none", // Removes the default blue outline
    },
    ContactTitle: {
      fontSize: isMobile ? "40px" : "50px",
      color: "rgb(39, 39, 39)",
      fontWeight: "900",
      textAlign: isMobile ? "center" : "left",
      fontFamily: "'Roboto', sans-serif",
    },
    contactDescription: {
      fontFamily: "'Nunito', sans-serif",
      fontSize: isMobile ? "18px" : "18px",
      fontWeight: "600",
      color: "black",
      marginTop: "0px",
    },
    contactButton: {
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
    contactButtonHover: {
      transform: "translateY(-6px)",
      boxShadow: "6px 6px 0px #1A1A1A",
    },
    contactFormRow: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "20px" : "20px", // Adjust spacing between name and email
      width: "100%",
    },
    footerContent: {
      display: isMobile ? "flex" : "flex",
      flexDirection: isMobile ? "column" : "row", // Stack on mobile
      alignItems: "center", // Center items horizontally
      textAlign: "center", // Center text content
      padding: "60px 0px",
    },
    footer: {
      backgroundColor: "#F8F5F2",
      padding: isMobile ? "20px" : "0 110px",
    },
    logof: {
      height: "80px",
      marginRight: "10px", // Ensure there's space between the logo and text
    },
    textf: {
      fontSize: "18px",
      fontWeight: "bold",
      fontFamily: "'Nunito', sans-serif",
      color: "#484541",
    },
    footerline: {
      width: "99.9%",
      border: "1px solidrgb(170, 170, 170)",
      margin: "0",
      position: "absolute", // Positions it independently
      left: "0",
    },
    rightText: {
      fontSize: "18px",
      fontWeight: "600",
      fontFamily: "'Nunito', sans-serif",
      color: "#6F6A64",
      textAlign: isMobile ? "center" : "right", // Keeps the new span text aligned to the right
      marginLeft: isMobile ? "0" : "auto", // Pushes the span to the far right
      marginTop: isMobile ? "40px" : "0",
    },
    blackText: {
      color: "black", // This will apply black color to the word "React"
    },
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
            <a
              style={styles.navItem}
              href="#about"
              onClick={(e) => handleScrollToSection(e, "about")}
            >
              About
            </a>
            <a
              style={styles.navItem}
              href="#what-i-do"
              onClick={(e) => handleScrollToSection(e, "what-i-do")}
            >
              What I Do
            </a>
            <a
              style={styles.navItem}
              href="#my-work"
              onClick={(e) => handleScrollToSection(e, "my-work")}
            >
              My Work
            </a>
            <a
              style={styles.navItem}
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "contact")}
            >
              ☕ Let's Talk
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
              onClick={handleOpenCV}
            >
              Open CV
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
              onClick={() =>
                window.open("https://instagram.com/mattiaonafriday", "_blank")
              }
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
              onClick={() =>
                window.open("https://wa.me/+94753354076", "_blank")
              }
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
              onClick={() =>
                window.open("https://www.linkedin.com/in/hmattia", "_blank")
              }
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
      <div id="about" style={styles.aboutSection}>
        <p style={styles.aboutTitle}>My Story in Short</p>
        <div style={styles.aboutContent}>
          {/* Left Side - About Me Description */}
          <div style={styles.aboutMeText}>
            <p>
              <p style={styles.passionstyle}>
                "I’m a passionate BSc (Hons) Software Engineering student and
                Full-Stack Developer who loves solving complex challenges and
                turning ideas into impactful digital experiences.
              </p>
              I build intuitive, high-performing web applications that
              seamlessly blend functionality and user experience. With a strong
              grasp of modern development practices, I bring creativity and
              efficiency to every project. Let’s build something amazing
              together!" 🚀
            </p>
          </div>
          <div style={styles.aboutImageContainer}>
            <img src="about-me.png" alt="About Me" style={styles.aboutImage} />
          </div>
        </div>
      </div>
      <div id="what-i-do" style={styles.serviceSection}>
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
                  <p style={{ ...styles.servicetype }}>
                    Web & Mobile UI/UX Design
                  </p>
                  <p style={{ ...styles.serviceinfo }}>
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
              {index === 1 && (
                <>
                  <img
                    src="/web-dev.png"
                    alt="UI/UX Design"
                    style={styles.serviceicon1}
                  />
                  <p style={{ ...styles.servicetype }}>
                    Web Application Development
                  </p>
                  <p style={{ ...styles.serviceinfo }}>
                    I develop dynamic and scalable web applications using React,
                    focusing on responsive user interfaces and seamless
                    performance. My expertise includes building interactive UIs,
                    integrating APIs, and ensuring smooth functionality.
                    <br />
                    <br />
                    Whether it's a business website or a complex web platform, I
                    deliver robust, efficient, and user-friendly solutions.
                  </p>
                </>
              )}
              {index === 2 && (
                <>
                  <img
                    src="/database.png"
                    alt="UI/UX Design"
                    style={styles.serviceicon1}
                  />
                  <p style={{ ...styles.servicetype }}>
                    Database Design & Development
                  </p>
                  <p style={{ ...styles.serviceinfo }}>
                    With expertise in MySQL and NoSQL, I design and develop
                    efficient, scalable databases tailored to your application's
                    requirements. My focus is on optimizing data storage,
                    retrieval, and management.
                    <br />
                    <br />
                    Ensuring data integrity, security, and high performance, I
                    deliver reliable and robust database solutions for your
                    projects.
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div id="my-work" style={styles.ProjectSection}>
        <div>
          <p style={styles.serviceTitle}>Featured Projects</p>
        </div>
        <div style={styles.projectContainer}>
          {projectImages.map((image, index) => (
            <div
              key={index}
              style={styles.projectItem}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={image}
                alt={`Project ${index + 1}`}
                style={{
                  ...styles.projectImage,
                  ...(hoveredIndex === index ? styles.projectImageHover : {}),
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div id="contact" style={styles.contactSection}>
        <div style={styles.contactLeft}>
          <h2 style={styles.ContactTitle}>
            Tell me about your<br></br>project
          </h2>
          <p style={styles.contactDescription}>
            Any project starts with goal setting. If you have a vision, I can
            design it.
            <br></br>
            <br></br>
            After the inquiry, I will reply within 2-3 working days, with an
            approximate quote for the project or with questions for more
            details. After that, we can have an intro call to discuss your
            project and see if it's a match.
          </p>
        </div>
        <div style={styles.contactRight}>
        <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.contactFormRow}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          style={styles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={formData.email}
          onChange={handleChange}
          style={styles.inputField}
        />
      </div>

      <div style={styles.contactFormRow}>
        <input
          type="text"
          name="website"
          placeholder="Your Website (if exist)"
          value={formData.website}
          onChange={handleChange}
          style={styles.inputField}
        />
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          style={styles.dropDown}
        >
          <option value="">Project type</option>
          <option value="UI/UX Design">🚀 UI/UX Design</option>
          <option value="Website">👩‍💻 Website</option>
          <option value="eCommerce">🛍️ eCommerce</option>
          <option value="Other">💡 Other</option>
        </select>
      </div>

      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        style={styles.textArea}
        placeholder="Project details, context, how can I help..."
        required
      />
      <button
        style={{
          ...styles.contactButton,
          ...(hoveredButton === 'contact' ? styles.contactButtonHover : {})
        }}
        onMouseEnter={() => setHoveredButton('contact')}
        onMouseLeave={() => setHoveredButton(null)}
        type="submit"
      >
        Get in touch
      </button>
    </form>
        </div>
      </div>
      <div id="footer" style={styles.footer}>
        <hr style={styles.footerline} />
        <div style={styles.footerContent}>
          <img
            src="mattia-logo-footer.png"
            alt="Mattia Logo"
            style={styles.logof}
          />
          <span style={styles.textf}>
            Hulathduwage Mattia <br></br> Full-Stack Developer
          </span>
          <span style={styles.rightText}>
            Mattia.Digital<br></br>
            made with <span style={styles.blackText}>⚛️React</span>{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;

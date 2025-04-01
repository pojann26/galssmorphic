import React, { useState, useEffect, useRef } from "react";
import { Download, Send, Sun, Moon, Menu, X } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const smoothScrollTo = (element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - (isMobile ? 100 : 120);
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  
  // Refs for sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Add these near your other state declarations
const [projects] = useState([
  {
    id: 1,
    title: "E-commerce Platform",
    tag: "Web Development",
    description: "A full-featured online store with cart functionality and payment integration.",
    image: "19289.jpg",
    link: "#"
  },
  {
    id: 2,
    title: "Fitness App",
    tag: "UI/UX Design",
    description: "A mobile application design for tracking workouts and nutrition.",
    image: "19289.jpg",
    link: "#"
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    tag: "Dashboard",
    description: "A responsive admin dashboard with data visualization components.",
    image: "19289.jpg",
    link: "#"
  },
  {
    id: 4,
    title: "Artist Portfolio",
    tag: "Portfolio",
    description: "A showcase website for a digital artist with gallery and contact features.",
    image: "19289.jpg",
    link: "#"
  }
]);

const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
const [transitionDirection, setTransitionDirection] = useState('none');

// Navigation functions with direction tracking
const nextProject = () => {
  setTransitionDirection('right');
  setTimeout(() => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
    setTransitionDirection('none');
  }, 10);
};

const prevProject = () => {
  setTransitionDirection('left');
  setTimeout(() => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setTransitionDirection('none');
  }, 10);
};

const goToProject = (index) => {
  setTransitionDirection(index > currentProjectIndex ? 'right' : 'left');
  setTimeout(() => {
    setCurrentProjectIndex(index);
    setTransitionDirection('none');
  }, 10);
};

// Calculate project positions with animation classes
const getProjectClasses = (index) => {
  const distance = (index - currentProjectIndex + projects.length) % projects.length;
  const isLeft = distance === projects.length - 1;
  const isRight = distance === 1;
  const isCenter = index === currentProjectIndex;
  const isHidden = !isLeft && !isRight && !isCenter;

  let classes = "absolute h-[400px] md:h-[500px] rounded-xl shadow-2xl overflow-hidden border-2 transition-all duration-500 ease-in-out cursor-pointer ";
  
  if (darkMode) {
    classes += "border-gray-700 ";
  } else {
    classes += "border-gray-200 ";
  }

  if (isCenter) {
    classes += "z-20 w-full md:w-2/3 left-1/2 transform -translate-x-1/2 scale-100 opacity-100 ";
  } else if (isLeft) {
    classes += "z-10 w-1/2 md:w-1/3 left-0 scale-90 opacity-70 blur-sm hover:blur-0 hover:opacity-90 ";
    if (transitionDirection === 'left') {
      classes += "translate-x-0 ";
    } else if (transitionDirection === 'right') {
      classes += "-translate-x-full ";
    }
  } else if (isRight) {
    classes += "z-10 w-1/2 md:w-1/3 right-0 scale-90 opacity-70 blur-sm hover:blur-0 hover:opacity-90 ";
    if (transitionDirection === 'right') {
      classes += "translate-x-0 ";
    } else if (transitionDirection === 'left') {
      classes += "translate-x-full ";
    }
  } else {
    classes += "hidden ";
  }

  return classes;
};
  
  // State for section visibility
  const [visibleSections, setVisibleSections] = useState({
    home: false,
    about: false,
    skills: false,
    projects: false,
    contact: false
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    // Handle scroll event
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Check section visibility
      const checkVisibility = () => {
        const newVisibleSections = {...visibleSections};
        const threshold = window.innerHeight * 0.75; // 75% of viewport height
        
        if (homeRef.current && homeRef.current.getBoundingClientRect().top < threshold) {
          newVisibleSections.home = true;
        }
        if (aboutRef.current && aboutRef.current.getBoundingClientRect().top < threshold) {
          newVisibleSections.about = true;
        }
        if (skillsRef.current && skillsRef.current.getBoundingClientRect().top < threshold) {
          newVisibleSections.skills = true;
        }
        if (projectsRef.current && projectsRef.current.getBoundingClientRect().top < threshold) {
          newVisibleSections.projects = true;
        }
        if (contactRef.current && contactRef.current.getBoundingClientRect().top < threshold) {
          newVisibleSections.contact = true;
        }
        
        setVisibleSections(newVisibleSections);
      };
      
      checkVisibility();
    };

    // Apply smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
        setMobileMenuOpen(false);
      });
    });

    // Dark mode setup
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Initial visibility check
    handleScroll();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [darkMode, scrolled]);

  // Skills data
  const squares = [
    // Row 1
    {
      id: 1,
      title: "HTML",
      subtitle: "Code",
      image: "html5.svg",
      description: ""
    },
    {
      id: 2,
      title: "CSS",
      subtitle: "Code",
      image: "css3.svg",
      description: ""
    },
    {
      id: 3,
      title: "javaScript",
      subtitle: "Code",
      image: "javascript.svg",
      description: ""
    },
    // Row 2
    {
      id: 4,
      title: "React",
      subtitle: "Code",
      image: "react.svg",
      description: ""
    },
    {
      id: 5,
      title: "TailWind",
      subtitle: "Code",
      image: "tailwindcss.svg",
      description: ""
    },
    {
      id: 6,
      title: "Figma",
      subtitle: "Design",
      image: "figma.svg",
      description: ""
    },
    // Row 3
    {
      id: 7,
      title: "PhotoShop",
      subtitle: "Edit photos",
      image: "photoshop.svg",
      description: ""
    },
    {
      id: 8,
      title: "Lightroom",
      subtitle: "Color Grading",
      image: "lightroom.svg",
      description: ""
    },
    {
      id: 9,
      title: "Instagram",
      subtitle: "Social",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
      description: ""
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col items-center transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-orange-100 via-purple-100 to-blue-100 text-gray-900"}`}>
      {/* Navbar with responsive design */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${darkMode ? "bg-gray-800/10" : "bg-white/30"} backdrop-blur-md rounded-full shadow-lg flex items-center justify-between border ${
  darkMode ? "border-white/5" : "border-gray-200/50"
} z-50 transition-all duration-300 ${
  scrolled ? 'w-[90%] md:w-[60%] py-2 px-4 md:px-8' : 'w-[95%] md:w-[70%] py-3 md:py-4 px-6 md:px-10'
} hover:w-[95%] md:hover:w-[70%] hover:py-3 md:hover:py-4 hover:px-6 md:hover:px-10`}>
  <div className={`text-xl md:text-2xl font-bold transition-all duration-300 ${
    scrolled ? 'scale-90' : 'scale-100'
  } hover:scale-100`}>[Zan]</div>
  
  {/* Desktop Navigation */}
  <div className={`hidden md:flex gap-4 lg:gap-8 text-base md:text-lg font-medium transition-all duration-300 ${
    scrolled ? 'scale-90' : 'scale-100'
  } hover:scale-100`}>
    <a 
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="hover:text-black dark:hover:text-white relative group transition-all duration-300"
    >
      Home
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"} group-hover:w-full transition-all duration-300`}></span>
    </a>
    <a 
      href="#about"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollTo(aboutRef.current);
      }}
      className="hover:text-black dark:hover:text-white relative group transition-all duration-300"
    >
      About
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"} group-hover:w-full transition-all duration-300`}></span>
    </a>
    <a 
      href="#skills"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollTo(skillsRef.current);
      }}
      className="hover:text-black dark:hover:text-white relative group transition-all duration-300"
    >
      Skills
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"} group-hover:w-full transition-all duration-300`}></span>
    </a>
    <a 
      href="#projects"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollTo(projectsRef.current);
      }}
      className="hover:text-black dark:hover:text-white relative group transition-all duration-300"
    >
      Projects
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"} group-hover:w-full transition-all duration-300`}></span>
    </a>
    <a 
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        smoothScrollTo(contactRef.current);
      }}
      className="hover:text-black dark:hover:text-white relative group transition-all duration-300"
    >
      Contact
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? "bg-white" : "bg-gray-800"} group-hover:w-full transition-all duration-300`}></span>
    </a>
  </div>
  
  {/* Mobile Menu Button */}
  <div className="md:hidden">
    <button 
      className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
    >
      {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
    </button>
  </div>
  
  {/* Theme Toggle */}
  <div className={`flex gap-4 items-center transition-all duration-300 ${
    scrolled ? 'scale-90' : 'scale-100'
  } hover:scale-100`}>
    <button 
      className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300"
      onClick={() => setDarkMode(!darkMode)}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  </div>
</nav>

{/* Mobile Menu */}
{mobileMenuOpen && (
  <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 ${darkMode ? "bg-gray-800/90" : "bg-white/90"} backdrop-blur-md rounded-2xl shadow-lg z-40 w-[90%] py-4 px-6 border ${
    darkMode ? "border-white/5" : "border-gray-200/50"
  }`}>
    <div className="flex flex-col gap-4 text-center">
      <a 
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setMobileMenuOpen(false);
        }}
        className="py-2 hover:text-black dark:hover:text-white transition-all duration-300"
      >
        Home
      </a>
      <a 
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo(aboutRef.current);
          setMobileMenuOpen(false);
        }}
        className="py-2 hover:text-black dark:hover:text-white transition-all duration-300"
      >
        About
      </a>
      <a 
        href="#skills"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo(skillsRef.current);
          setMobileMenuOpen(false);
        }}
        className="py-2 hover:text-black dark:hover:text-white transition-all duration-300"
      >
        Skills
      </a>
      <a 
        href="#projects"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo(projectsRef.current);
          setMobileMenuOpen(false);
        }}
        className="py-2 hover:text-black dark:hover:text-white transition-all duration-300"
      >
        Projects
      </a>
      <a 
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo(contactRef.current);
          setMobileMenuOpen(false);
        }}
        className="py-2 hover:text-black dark:hover:text-white transition-all duration-300"
      >
        Contact
      </a>
    </div>
  </div>
)}
      
{/* Hero Section */}
<section 
  id="home" 
  ref={homeRef}
  className={`mt-32 md:mt-48 w-[90%] md:w-[80%] max-w-5xl flex flex-col md:flex-row items-center justify-between relative z-10 gap-8 md:gap-0 transition-all duration-1000 ease-out ${
    visibleSections.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
        <div className="text-left max-w-xl order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>I'm</span>{' '}
            <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>Fauzan Akbar</span>
          </h1>
          <p className={`mt-4 text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Hi There! I'm A Second Semester Computer Science Student At Universitas Diponegoro. Passionate About Designing And Developing Website And Mobile Apps.
          </p>
          <div className="mt-6 flex gap-4">
            <button className={`${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-50"} ${darkMode ? "text-white" : "text-gray-900"} px-4 md:px-6 py-2 md:py-3 rounded-md flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 border ${darkMode ? "border-gray-600" : "border-gray-200"} shadow-gray-500/20 text-sm md:text-base`}>
              Contact Me! <Send size={18} />
            </button>
          </div>
        </div>
        <div className="order-1 md:order-2 md:ml-12">
          <img src="laptop.png" alt="emoji" className="w-40 md:w-52 drop-shadow-xl" />
        </div>
      </section>

      {/* Increased gap between home and about sections */}
      <div className="h-32 md:h-48 lg:h-56 xl:h-64"></div>
      
      {/* About Section */}
      <section 
        id="about" 
        ref={aboutRef}
        className={`w-[90%] md:w-[80%] max-w-5xl ${darkMode ? "bg-gray-800/20" : "bg-white/30"} backdrop-blur-md rounded-2xl p-6 md:p-12 shadow-lg border ${darkMode ? "border-white/5" : "border-gray-200/50"} mb-20 md:mb-32 flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-all duration-1000 ease-out delay-200 ${
          visibleSections.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Photo with proper scaling */}
        <div className="flex-shrink-0 w-40 h-40 md:w-64 md:h-64 rounded-xl overflow-hidden border-2 border-white/20">
          <img 
            src="bingung.png" 
            alt="Profile" 
            className="w-full h-full object-contain bg-gray-100/20 p-2"
          />
        </div>
        
        {/* Text Content */}
        <div className="flex-grow">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            I am an ordinary <span className={`${darkMode ? "text-white" : "text-gray-900"}`}>UI/UX Developer</span>
          </h2>
          <p className={`text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} mb-4 md:mb-6`}>
            I design and develop services for customers specializing creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences.
          </p>
          <p className={`text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} mb-6 md:mb-8`}>
            Of course with an offering of an efficient and reliable website to access from anywhere and anytime.
          </p>
          <div className="flex gap-4">
            <button className={`${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-900 hover:bg-gray-800"} text-white px-4 md:px-6 py-2 md:py-3 rounded-md flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 shadow-gray-500/20 text-sm md:text-base`}>
              <Download size={18} /> Download CV
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section 
        id="skills" 
        ref={skillsRef}
        className="w-full py-8 md:py-12 px-4"
      >
        {/* Infinite Scrolling Header */}
        <div className={`w-full overflow-hidden relative mb-8 md:mb-12 transition-all duration-1000 ease-out delay-300 ${
          visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex animate-scroll-left whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={`first-${i}`}>
                {["SKILLS", "TOOLS", "TECHNOLOGIES"].map((item, idx) => (
                  <div 
                    key={`${i}-${idx}`} 
                    className={`inline-flex items-center mx-4 md:mx-8 text-3xl md:text-6xl font-bold ${
                      darkMode ? "text-white/10" : "text-gray-900/10"
                    } hover:scale-105 transition-transform`}
                  >
                    {item}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 3x3 Perfect Square Grid */}
        <div className={`w-full max-w-md md:max-w-2xl mx-auto grid grid-cols-3 gap-2 md:gap-4 transition-all duration-1000 ease-out delay-500 ${
          visibleSections.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {squares.map((square) => (
            <div 
              key={square.id}
              className={`aspect-square ${darkMode ? "bg-gray-800/20" : "bg-white/30"} backdrop-blur-md rounded-lg shadow-lg border ${
                darkMode ? "border-white/5" : "border-gray-200/50"
              } p-2 md:p-4 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105`}
            >
              {/* Square Content - Edit each individually */}
              <div className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2">
                <img 
                  src={square.image} 
                  alt={square.title} 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-center">{square.title}</h3>
              <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                {square.subtitle}
              </p>
              {square.description && (
                <p className={`text-xs mt-1 text-center ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
                  {square.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
<section 
  id="projects" 
  ref={projectsRef}
  className={`w-[90%] md:w-[80%] max-w-5xl py-20 transition-all duration-1000 ease-out ${
    visibleSections.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">My Projects</h2>
  
  {/* Projects Carousel Container */}
  <div className="relative h-[500px] md:h-[600px] overflow-hidden">
    {/* Navigation Arrows */}
    <button 
      onClick={prevProject}
      className="absolute left-0 md:left-4 z-30 p-2 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-lg border dark:border-white/10 border-gray-200 hover:scale-110 transition-transform"
      aria-label="Previous project"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      onClick={nextProject}
      className="absolute right-0 md:right-4 z-30 p-2 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-lg border dark:border-white/10 border-gray-200 hover:scale-110 transition-transform"
      aria-label="Next project"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>

    {/* Project Cards */}
    <div className="relative w-full h-full">
      {projects.map((project, index) => (
        <div 
          key={project.id}
          onClick={() => {
            const distance = (index - currentProjectIndex + projects.length) % projects.length;
            if (distance === projects.length - 1) prevProject();
            if (distance === 1) nextProject();
          }}
          className={getProjectClasses(index)}
        >
          {/* Project Image */}
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          
          {/* Project Info Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 ${
            index === currentProjectIndex ? 'opacity-100' : 'opacity-0 hover:opacity-100'
          } transition-opacity`}>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full self-start mb-2 ${
              project.tag === 'Web Development' ? 'bg-blue-500' :
              project.tag === 'UI/UX Design' ? 'bg-purple-500' :
              project.tag === 'Dashboard' ? 'bg-green-500' :
              'bg-yellow-500'
            } text-white`}>
              {project.tag}
            </span>
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-300 text-sm md:text-base mb-4">{project.description}</p>
            {index === currentProjectIndex && (
              <a 
                href={project.link} 
                className="bg-white text-gray-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors self-start"
              >
                Visit Project
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
    
    {/* Indicators */}
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
      {projects.map((_, index) => (
        <button
          key={index}
          onClick={() => goToProject(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            index === currentProjectIndex ? 
              (darkMode ? 'bg-white w-6' : 'bg-gray-800 w-6') : 
              (darkMode ? 'bg-white/30' : 'bg-gray-800/30')
          }`}
          aria-label={`Go to project ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>

{/* Contact Section */}
<section 
  id="contact" 
  ref={contactRef}
  className={`w-[90%] md:w-[80%] max-w-5xl py-20 transition-all duration-1000 ease-out ${
    visibleSections.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`}
>
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
    <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
      Have a project in mind or want to collaborate? Feel free to reach out!
    </p>
  </div>

  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${darkMode ? "bg-gray-800/20" : "bg-white/30"} backdrop-blur-md rounded-2xl p-8 shadow-lg border ${darkMode ? "border-white/5" : "border-gray-200/50"}`}>
    {/* Contact Form */}
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Send me a message</h3>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Name
          </label>
          <input
            type="text"
            id="name"
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
              darkMode ? "bg-gray-700/50 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-white" 
              : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            }`}
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
              darkMode ? "bg-gray-700/50 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-white" 
              : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            }`}
            placeholder="Your Email"
          />
        </div>
        
        <div>
          <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
              darkMode ? "bg-gray-700/50 border-gray-600 focus:ring-purple-500 focus:border-purple-500 text-white" 
              : "bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            }`}
            placeholder="Your message here..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
            darkMode 
              ? "bg-purple-600 hover:bg-purple-700 text-white" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Send size={18} />
          Send Message
        </button>
      </form>
    </div>

    {/* Contact Info */}
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${darkMode ? "bg-purple-900/30" : "bg-blue-100"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Email</h4>
            <a href="mailto:your.email@example.com" className={`hover:underline ${darkMode ? "text-purple-400" : "text-blue-600"}`}>
              emailgw@contoh.com
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${darkMode ? "bg-purple-900/30" : "bg-blue-100"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <h4 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Phone</h4>
            <a href="tel:+1234567890" className={`hover:underline ${darkMode ? "text-purple-400" : "text-blue-600"}`}>
              +1 (234) 567-890
            </a>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${darkMode ? "bg-purple-900/30" : "bg-blue-100"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h4 className={`text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Location</h4>
            <p className={darkMode ? "text-gray-300" : "text-gray-700"}>Semarang, Indonesia</p>
          </div>
        </div>
      </div>
      
      {/* Social Links */}
      <div className="pt-4">
        <h4 className={`text-sm font-medium mb-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Follow me</h4>
        <div className="flex gap-4">
          {[
            { name: "GitHub", icon: "github.svg", url: "#" },
            { name: "LinkedIn", icon: "linkedin.svg", url: "#" },
            { name: "Instagram", icon: "instagram.svg", url: "#" }
          ].map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full hover:scale-110 transition-all ${darkMode ? "hover:bg-gray-700/50" : "hover:bg-gray-200/50"}`}
              aria-label={social.name}
            >
              <img 
                src={social.icon} 
                alt={social.name} 
                className="w-6 h-6"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Animation CSS */}
      <style jsx>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          display: inline-block;
          animation: scrollLeft 20s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}


import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/dr_vinay.jpg';

gsap.registerPlugin(ScrollTrigger);

const MISSIONS = [
  {
    id: '01',
    name: 'Optimized 3D Rectangular Filtration',
    description: 'Developed an optimized 3D rectangular filtration algorithm for dynamic routing protocols in Flying Ad-hoc Networks (FANETs) to improve delivery rates and network longevity.',
    tech: ['FANETs', 'Routing Protocol', '3D Filtration'],
    image: imgSpiderman,
    link: 'https://www.linkedin.com/in/dr-vinay-bhardwaj-54a313298/',
    blend: 'mix-blend-luminosity brightness-75',
  },
  {
    id: '02',
    name: 'SIRFRM Routing Model',
    description: 'Created a Secure and Intelligent Routing Fairness Rate Model (SIRFRM) for UAV communications, ensuring fairness and resilience against adversarial security threats.',
    tech: ['Cybersecurity', 'UAV Networks', 'SIRFRM', 'Network Security'],
    image: imgMan,
    link: 'https://www.linkedin.com/in/dr-vinay-bhardwaj-54a313298/',
    blend: 'mix-blend-luminosity grayscale',
  },
  {
    id: '03',
    name: 'SEEDRP Protocol',
    description: 'Designed a Secure Energy Efficient Dynamic Routing Protocol (SEEDRP) to achieve optimized energy utilization and robust data protection in flying ad-hoc structures.',
    tech: ['Energy Efficiency', 'Cryptography', 'SEEDRP', 'Dynamic Routing'],
    image: imgSpiderman,
    link: 'https://www.linkedin.com/in/dr-vinay-bhardwaj-54a313298/',
    blend: 'mix-blend-overlay brightness-125 saturate-150',
  }
];

const JOURNALS = [
  {
    num: 1,
    citation: "Rani, A., & Bhardwaj, V. (2025). Optimized 3d rectangular filtration for routing in fanets. International Journal of Performability Engineering, 21(1)."
  },
  {
    num: 2,
    citation: "Bhardwaj, V., Prashar, D., & Rashid, M. (2024). Sirfrm-secure and intelligent routing fairness rate model for flying adhoc networks. Mobile Networks and Applications, 29(6), 1828–1838."
  },
  {
    num: 3,
    citation: "Shukla, S. K., Dubey, S., Pandey, A. K., Mishra, V., Awasthi, M., & Bhardwaj, V. (2021). Image caption generator using neural networks."
  },
  {
    num: 4,
    citation: "Bhardwaj, V., & Kaur, N. (2021b). SEEDRP: A secure energy efficient dynamic routing protocol in fanets. Wireless Personal Communications, 1–27."
  },
  {
    num: 5,
    citation: "Bhardwaj, V., Kaur, N., Vashisht, S., & Jain, S. (2020). SecRIP: Secure and reliable intercluster routing protocol for efficient data transmission in flying ad hoc networks. Transactions on Emerging Telecommunications Technologies, e4068."
  },
  {
    num: 6,
    citation: "Bhardwaj, V. (2019). A novel approach to privacy preserving using anonymization & differential privacy. Think India Journal, 22(16), 2025–2034."
  },
  {
    num: 7,
    citation: "Kaur, J., & Bhardwaj, V. (2016). A novel approach of task scheduling for cloud computing using adaptive firefly. Int. J. Comput. Appl, 147(12), 9–13."
  },
  {
    num: 8,
    citation: "Kaur, S., & Bhardwaj, V. (2016). Energy efficient k-means clustering technique for underwater wireless sensor network. Int. J. Comput. Appl., 975, 8887."
  },
  {
    num: 9,
    citation: "Kaur, P., & Bhardwaj, V. (2015). K-means based general self-organized tree-based energy balancing routing protocol for wireless sensor networks. International Journal of Computer Science and Information Technologies (IJCSIT), 6(4), 3457–3464."
  },
  {
    num: 10,
    citation: "Kaur, S., & Bhardwaj, V. (2014). Study of genetic algorithms. International Journal of Science and Research, 3, 2012–2015."
  }
];

const CONFERENCES = [
  {
    num: 1,
    citation: "Rani, A., & Bhardwaj, V. (2024). Performance analysis of routing protocols for fanets, In 2024 15th international conference on computing communication and networking technologies (icccnt). IEEE."
  },
  {
    num: 2,
    citation: "Vally, D., & Bhardwaj, V. (2024). An effective path planning optimization in cellular networking based on key performance indicator: A review, In 2024 15th international conference on computing communication and networking technologies (icccnt). IEEE."
  },
  {
    num: 3,
    citation: "Kaushik, N., Bhardwaj, V., & Arri, H. S. (2023). A machine learning-based survey of adversarial attacks and defenses in malware classification, In 2023 14th international conference on computing communication and networking technologies (icccnt). IEEE."
  },
  {
    num: 4,
    citation: "Ojha, K., Bhardwaj, V., Ranjan, A., & Mohapatra, P. D. (2023). Honeypot: A review, In Proceedings of the kilby 100 7th international conference on computing sciences."
  },
  {
    num: 5,
    citation: "Rani, A., & Bhardwaj, V. (2023). Simulation based comparative study of routing protocols in fanet, In Proceedings of the kilby 100 7th international conference on computing sciences."
  },
  {
    num: 6,
    citation: "Rahul, S., & Bhardwaj, V. (2022). Optimization of resource scheduling and allocation algorithms, In 2022 second international conference on interdisciplinary cyber physical systems (icps). IEEE."
  },
  {
    num: 7,
    citation: "Agrawal, A., & Bhardwaj, V. (2021). Methods of sentiment analysis for hindi and english languages, In 2021 international conference on computing sciences (iccs). IEEE."
  },
  {
    num: 8,
    citation: "Bhardwaj, V., & Kaur, N. (2021a). Optimized route discovery and node registration for fanet, In Evolving technologies for computing, communication and smart world, Springer."
  },
  {
    num: 9,
    citation: "Bhardwaj, V., & Kaur, N. (2020). An efficient routing protocol for fanet based on hybrid optimization algorithm, In 2020 international conference on intelligent engineering and management (iciem). IEEE."
  }
];


const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imageRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position strictly bounded within the card [-1, 1]
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Apply 3D tilt mapped against mouse offset (multiplied by degrees of max tilt)
    gsap.to(cardRef.current, {
      rotateY: x * 15, // tilt left/right up to 7.5 deg
      rotateX: -y * 15, // tilt up/down up to 7.5 deg
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });
    
    // Move the glow to follow the cursor exactly
    gsap.to(glowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.2
    });
    
    // Inverse parallax on the image inside
    gsap.to(imageRef.current, {
      x: -x * 20,
      y: -y * 20,
      scale: 1.1,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    // Snap back everything cleanly
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power3.out',
      duration: 0.6
    });
    
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4
    });
    
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1.0,
      ease: 'power3.out',
      duration: 0.6
    });
  };

  return (
    <div 
      className="project-card relative w-full h-[450px] rounded-xl overflow-hidden cursor-pointer group bg-black border border-white/10"
      style={{ transformStyle: 'preserve-3d' }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-900">
        <img 
          ref={imageRef}
          src={project.image} 
          alt={project.name} 
          className={`absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center ${project.blend} transition-all duration-[1.5s]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      </div>

      {/* Dynamic Hover Glow Layer Tracker */}
      <div 
        ref={glowRef}
        className="absolute w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
      />
      
      {/* Laser Border overlay on Hover */}
      <div className="absolute inset-0 border border-red-500/0 group-hover:border-red-500/40 rounded-xl transition-colors duration-500 z-20 pointer-events-none" />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end pointer-events-none" style={{ transform: 'translateZ(30px)' }}> {/* Push text outward on Z axis */}
        
        {/* Dossier Code */}
        <div className="text-red-500/80 font-mono text-xs tracking-[0.3em] mb-2 font-bold uppercase transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          File_ID // {project.id}
        </div>
        
        <h3 className="text-3xl font-bold tracking-tight text-white mb-3 leading-none drop-shadow-xl font-sans">
          {project.name}
        </h3>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-light max-w-[90%]">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
          {project.tech.map((tool) => (
            <span key={tool} className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/20 rounded-full text-gray-300 font-medium">
              {tool}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pointer-events-auto w-fit">
          <a href={project.link} className="flex items-center space-x-2 text-sm uppercase tracking-[0.2em] font-medium text-white group/link relative">
            <span className="relative overflow-hidden block">
              <span className="block group-hover/link:-translate-y-full transition-transform duration-300">Access Record</span>
              <span className="block absolute inset-0 translate-y-full group-hover/link:translate-y-0 transition-transform duration-300 text-red-400">Access Record</span>
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300 text-red-500">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="10 5 19 5 19 14"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};


export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('journals');
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Header Animation
      tl.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
      
      // Select cards via class
      const cards = sectionRef.current.querySelectorAll('.project-card');
      
      tl.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="w-full min-h-screen bg-[#030303] py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        
        {/* Header Block */}
        <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white font-sans leading-none drop-shadow-lg mb-4">
              Research <span className="font-serif italic font-light opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white pr-2">Publications</span>
            </h2>
          </div>
          <p className="text-gray-400 font-light tracking-wide text-base md:text-lg max-w-sm mt-6 md:mt-0 leading-relaxed md:text-right">
            Peer-reviewed scientific journals and conference proceedings in network routing and cybersecurity.
          </p>
        </div>
        
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 place-items-center mb-12">
          {VISIONS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Complete Publications Record */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-red-500 font-mono text-xs tracking-[0.3em] uppercase font-bold mb-2 block">
                [ COMPLETE RECORD ]
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white font-sans uppercase">
                All Publications
              </h3>
            </div>
            
            {/* Tab Controls */}
            <div className="flex gap-4 mt-6 md:mt-0 p-1.5 bg-white/5 border border-white/10 rounded-full w-fit">
              <button 
                onClick={() => setActiveTab('journals')}
                className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === 'journals' 
                    ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Journals ({JOURNALS.length})
              </button>
              <button 
                onClick={() => setActiveTab('conferences')}
                className={`px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === 'conferences' 
                    ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Conferences ({CONFERENCES.length})
              </button>
            </div>
          </div>

          {/* List of Publications */}
          <div className="space-y-4">
            {(activeTab === 'journals' ? JOURNALS : CONFERENCES).map((item) => {
              // Highlight "Bhardwaj, V." and variations in the citation text
              const citationParts = item.citation.split(/(Bhardwaj,\s*V\.|Bhardwaj,V\.)/g);
              
              return (
                <div 
                  key={item.num}
                  className="flex items-start gap-6 p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-red-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="text-red-500 font-mono text-sm font-bold tracking-wider pt-0.5">
                    {String(item.num).padStart(2, '0')}
                  </div>
                  <div className="w-[1px] h-6 bg-white/10 self-start mt-1 hidden sm:block" />
                  <div className="text-gray-300 text-sm md:text-base font-light leading-relaxed">
                    {citationParts.map((part, index) => {
                      const isAuthorMatch = /Bhardwaj,\s*V\.|Bhardwaj,V\./i.test(part);
                      return isAuthorMatch ? (
                        <strong key={index} className="text-white font-semibold underline decoration-red-500/50 decoration-2">
                          {part}
                        </strong>
                      ) : (
                        <span key={index}>{part}</span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
      
      {/* Background Ambience line-grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />
    </section>
  );
}

// Ensure the mapping variable aligns exactly with the constant 
const VISIONS = MISSIONS;

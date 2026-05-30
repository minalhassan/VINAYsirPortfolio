import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Reuse our hero assets for the dual-identity mask effect prototype
import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/dr_vinay.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const maskRef = useRef(null);
  
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // 1. ScrollTrigger entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline bound to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // triggers when the top of the section hits 75% of the viewport height
          toggleActions: "play none none reverse" // play forwards on scroll down, reverse on scroll out
        }
      });

      // Select all text lines that have the 'stagger-reveal' class
      const textElements = textContainerRef.current.querySelectorAll('.stagger-reveal');
      
      // Select the image container
      const imgElement = imageContainerRef.current;

      tl.fromTo(imgElement, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(textElements, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.8" // start before image is fully in
      );
      
    }, sectionRef);

    return () => ctx.revert(); // clean up ScrollTrigger
  }, []);

  // 2. Interactive Spotlight Mask
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    
    // Get mouse position relative to the image container
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Use GSAP to smoothly lerp the mask center
    gsap.to(maskRef.current, {
      '--x': `${x}%`,
      '--y': `${y}%`,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    // Return to default center position smoothly
    gsap.to(maskRef.current, {
      '--x': '50%',
      '--y': '50%',
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  return (
    <section 
    id='about'
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-black flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay" />
      </div>

      <div className="max-w-[90rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Column: Interactive Portrait */}
        <div 
          ref={imageContainerRef}
          className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden cursor-crosshair group shadow-2xl border border-white/5"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: 'translateZ(0)' }} // Hardware acceleration
        >
          {/* Base Layer: Developer Portrait (Moody/Dark) */}
          <img 
            src={imgMan} 
            alt="Developer Persona" 
            className="absolute inset-0 w-full h-full object-cover object-center grayscale opacity-60 mix-blend-luminosity brightness-75 transition-all duration-700 group-hover:scale-105"
          />

          {/* Masked Overlay: Superhero Persona (Vibrant) */}
          <div 
            ref={maskRef}
            className="absolute inset-0 w-full h-full"
            style={{
              '--x': '50%',
              '--y': '50%',
              // The polygon logic simulates a circular spotlight reveal
              // For a soft glowing edge, clip-path doesn't support blur inherently, but this acts perfectly as the mask.
              clipPath: 'circle(15% at var(--x) var(--y))',
              transition: 'clip-path 0.1s ease-out'
            }}
          >
            <img 
              src={imgSpiderman} 
              alt="Hidden Superhero Persona" 
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out"
            />
            
            {/* Inner spotlight glow matched inside the mask */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/80" />
          </div>

          {/* Interaction Hint Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-24 h-24 rounded-full border border-white/20 scale-150 animate-ping absolute" />
          </div>
        </div>

        {/* Right Column: Story & Details */}
        <div ref={textContainerRef} className="flex flex-col justify-center space-y-10">
          
          <div className="overflow-hidden">
            <h2 className="stagger-reveal text-5xl md:text-6xl font-bold tracking-tighter text-white font-sans leading-tight">
              Academic & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500 font-serif italic pr-4">Research</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="stagger-reveal text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              With 13 years of academic tenure, my work focuses on Flying Ad-hoc Networks (FANETs), Wireless Sensor Networks (WSNs), and Cybersecurity. I specialize in developing secure routing protocols, optimizing network performance, and teaching core computer science disciplines.
            </p>
          </div>

          {/* Expertise Highlights */}
          <div className="overflow-hidden">
            <div className="stagger-reveal grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/10 max-w-xl">
              {[
                "Cybersecurity & Pentesting", 
                "FANETs & WSN Routing", 
                "CEH Certified Ethical Hacker", 
                "SCI & Scopus Journal Reviewer"
              ].map((skill, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors duration-300" />
                  <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Block */}
          <div className="overflow-hidden mt-6">
            <blockquote className="stagger-reveal border-l-2 border-red-500/50 pl-6 py-2">
              <p className="text-xl md:text-2xl text-gray-200 font-serif italic">
                “Securing the networks of today, <br /> routing the autonomous systems of tomorrow.”
              </p>
            </blockquote>
          </div>
          
        </div>

      </div>

      {/* TIMELINE & SKILLS SECTION */}
      <div className="max-w-[90rem] w-full mt-24 pt-16 border-t border-white/10 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side: Timeline (Employment & Education) */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-8 uppercase font-mono text-red-500">
            // Academic Timeline
          </h3>
          
          <div className="relative pl-6 border-l border-white/10 space-y-10">
            {/* Timeline Items */}
            
            {/* Employment 1 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#030303] border-2 border-red-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
              <span className="text-xs text-red-400 font-mono tracking-wider font-bold">2024 - TILL DATE</span>
              <h4 className="text-lg font-bold text-white mt-1">Associate Professor</h4>
              <p className="text-sm text-gray-400 font-light mt-0.5">Lovely Professional University, Phagwara, Punjab (Computer Science Department)</p>
            </div>

            {/* Employment 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#030303] border-2 border-purple-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              </div>
              <span className="text-xs text-purple-400 font-mono tracking-wider font-bold">2018 - 2024</span>
              <h4 className="text-lg font-bold text-white mt-1">Assistant Professor</h4>
              <p className="text-sm text-gray-400 font-light mt-0.5">Lovely Professional University, Phagwara, Punjab (Computer Science Department)</p>
            </div>

            {/* Employment 3 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#030303] border-2 border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
              <span className="text-xs text-gray-400 font-mono tracking-wider font-bold">2013 - 2018</span>
              <h4 className="text-lg font-bold text-white mt-1">Assistant Professor</h4>
              <p className="text-sm text-gray-400 font-light mt-0.5">Sri Guru Granth Sahib World University, Fatehgarh Sahib, Punjab (4 Years 2 Months)</p>
            </div>

            {/* Education 1 */}
            <div className="relative pt-6 border-t border-white/5">
              <div className="absolute -left-[31px] top-7.5 w-4.5 h-4.5 rounded-full bg-[#030303] border-2 border-red-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              </div>
              <span className="text-xs text-red-400 font-mono tracking-wider font-bold">2016 - 2020</span>
              <h4 className="text-lg font-bold text-white mt-1">Ph.D. in Unmanned Aerial Vehicles</h4>
              <p className="text-sm text-gray-300 font-medium">Sri Guru Granth Sahib World University, Punjab</p>
              <p className="text-xs text-gray-400 font-light mt-1 italic">Thesis: "Cross Layer optimization for Protocol in Flying Ad hoc Network" (CGPA: 7.6)</p>
            </div>

            {/* Education 2 */}
            <div className="relative">
              <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#030303] border-2 border-purple-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              </div>
              <span className="text-xs text-purple-400 font-mono tracking-wider font-bold">2011 - 2013</span>
              <h4 className="text-lg font-bold text-white mt-1">M.Tech. in Software Systems</h4>
              <p className="text-sm text-gray-300 font-medium">Guru Nanak Dev University, Amritsar</p>
              <p className="text-xs text-gray-400 font-light mt-1 italic">Thesis: "Threshold based stable LEACH in Wireless Sensor Network" (CGPA: 7.89)</p>
            </div>
            
          </div>
        </div>

        {/* Right Side: Detailed Skills Grid */}
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white mb-8 uppercase font-mono text-red-500">
            // Core Expertise & Skills
          </h3>
          
          <div className="space-y-8">
            {/* Certifications */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all duration-300">
              <span className="text-xs text-red-400 font-mono tracking-wider block mb-2 uppercase">// Key Certification</span>
              <h4 className="text-lg font-bold text-white">Certified Ethical Hacker (CEH v12)</h4>
              <p className="text-sm text-gray-400 mt-1">Granted by EC-Council</p>
            </div>

            {/* Skill categories */}
            <div>
              <span className="text-xs text-gray-400 font-mono tracking-wider block mb-3 uppercase">// Cybersecurity Skills</span>
              <div className="flex flex-wrap gap-2">
                {["Vulnerability Assessment", "Penetration Testing", "Network Security", "Social Engineering"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 bg-red-950/20 border border-red-500/20 text-red-300 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-mono tracking-wider block mb-3 uppercase">// Tools & Libraries</span>
              <div className="flex flex-wrap gap-2">
                {["Nmap", "Wireshark", "Metasploit", "Burp Suite", "Nikto", "Nessus", "John The Ripper", "AI Script Writing"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 bg-purple-950/20 border border-purple-500/20 text-purple-300 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-mono tracking-wider block mb-3 uppercase">// Languages</span>
              <div className="flex flex-wrap gap-2">
                {["Python", "C/C++", "SQL", "JavaScript", "LaTeX"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 bg-zinc-900 border border-white/10 text-white rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-mono tracking-wider block mb-3 uppercase">// Soft Skills</span>
              <div className="flex flex-wrap gap-2">
                {["Leadership", "Team work", "Event Handling", "Time Management"].map((s) => (
                  <span key={s} className="text-xs px-3 py-1.5 bg-zinc-900 border border-white/10 text-gray-300 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-xs text-red-400 font-mono tracking-wider block mb-2 uppercase">// Key Achievements</span>
              <ul className="space-y-3 text-sm text-gray-400 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>2025:</strong> Proposed and initiated the setup of an EC-Council Exam Center at Lovely Professional University, enabling on-campus exams and subsidized vouchers for students.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span><strong>2021:</strong> Active Reviewer in SCI and Scopus Journals.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

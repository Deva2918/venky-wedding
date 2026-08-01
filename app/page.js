'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Marcellus, Great_Vibes, Cormorant_Garamond } from 'next/font/google';

// Font definitions
const marcellus = Marcellus({ weight: '400', subsets: ['latin'] });
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });
const cormorant = Cormorant_Garamond({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

const INVITATION_DATA = {
  couple: {
    groom: {
      name: "Sai Venkateswara Rao Bonde",
      shortName: "Venkat",
      parents: "Mr. Srinivas Rao & Mrs. Kasthuri",
      image: "/assets/groom.jpg"
    },
    bride: {
      name: "Vineela Bandi",
      shortName: "Vineela",
      parents: "Mr. Veerasekhara Rao & Mrs. Ajaya Kumari",
      image: "/assets/bride.jpg"
    }
  },
  weddingDate: "2026-09-05T10:31:00",
  events: [
    {
      id: "pelli-koduku",
      title: "Pelli Koduku Ceremony",
      date: "Wednesday, 26th August 2026",
      time: "08:00 AM",
      venue: "Sri Lakshmi Castle, Flat No. B5, 2nd Lane, Jayaprakash Nagar, Vijayawada",
      mapUrl: "https://maps.app.goo.gl/CXu1vRyaRTGwVE3v7",
      iconImg: "/assets/pooja-plate.png",
      align: "right",
      topPct: "20%"
    },
    {
      id: "pelli-kuturu",
      title: "Pelli Kuturu Ceremony",
      date: "Wednesday, 26th August 2026",
      time: "08:00 AM",
      venue: "Near Home, Seetharampuram",
      mapUrl: "https://maps.app.goo.gl/o9wXhgkERR4hZ4MXA",
      iconImg: "/assets/pooja-plate.png",
      align: "left",
      topPct: "38%"
    },
    {
      id: "haldi",
      title: "Haldi Ceremony",
      date: "Thursday, 27th August 2026",
      time: "09:00 AM",
      venue: "Near Function Hall, Pasaladeevi",
      dressCode: "Yellow",
      mapUrl: "https://maps.app.goo.gl/X5fr5s3EEj6dScjD8",
      iconImg: "/assets/haldi-bowl.png",
      align: "right",
      topPct: "56%"
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      date: "Saturday, 05th September 2026",
      time: "10:31 AM",
      venue: "Hindu Temple of St Louis",
      mapUrl: "https://maps.app.goo.gl/BcE4pcMrCyi1j7i8A",
      iconImg: "/assets/nadaswaram.png",
      align: "left",
      topPct: "74%"
    },
    {
      id: "reception",
      title: "Reception",
      date: "Saturday, 29th August 2026",
      time: "07:00 PM",
      venue: "Anne Vaari Kalyana Mandapam, 100 Feet Rd, Poranki, Vijayawada",
      mapUrl: "https://maps.app.goo.gl/zmQntu9X6cNrTdmg7",
      iconImg: "/assets/reception-sofa.png",
      align: "right",
      topPct: "91%"
    }
  ],
  galleryImages: [
    "photo-1.jpg",
    "photo-2.jpg",
    "photo-3.jpg",
    "photo-4.jpg",
    "photo-5.jpg",
    "photo-6.jpg",
    "photo-7.jpg",
    "photo-8.jpg",
    "photo-9.jpg",
    "photo-10.jpg"
  ]
};

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [attendingStatus, setAttendingStatus] = useState('');

  // Scroll ref for timeline path drawing effect
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  useEffect(() => {
    const target = new Date(INVITATION_DATA.weddingDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => console.log("Audio play error:", err));
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div className={`min-h-screen bg-[#FDFBF2] text-[#3D2E24] ${cormorant.className} selection:bg-amber-100 selection:text-amber-900 relative`}>

      {/* --- BACKGROUND MUSIC --- */}
      <audio ref={audioRef} src="/wedding-music.mp3" loop />

      {/* --- FLOATING AUDIO CONTROLLER --- */}
      {isOpen && (
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#671418] text-amber-100 rounded-full shadow-2xl border border-amber-300 hover:scale-110 transition-transform"
          aria-label="Toggle Audio"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 opacity-70" />}
        </button>
      )}

      {/* --- ENTRY OVERLAY (FIRST SCREEN) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-start p-6 text-center bg-cover bg-center bg-no-repeat bg-[#FDFBF2]"
            style={{ backgroundImage: "url('/entry-card.jpg')" }}
          >
            <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-2 pt-26 sm:pt-28">
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 mb-1 flex items-center justify-center bg-transparent">
              </div>

              <p className={`${marcellus.className} tracking-[0.14em] uppercase text-[0.72rem] text-[#76181C] font-medium`}>
                THE WEDDING OF
              </p>

              <div className="space-y-0 text-[#76181C] py-0.5">
                <h1 className={`${greatVibes.className} text-5xl sm:text-6xl text-[#76181C] leading-tight`}>
                  {INVITATION_DATA.couple.bride.shortName}
                </h1>
                <p className={`${greatVibes.className} text-2xl text-[#76181C] my-0`}>&amp;</p>
                <h1 className={`${greatVibes.className} text-5xl sm:text-6xl text-[#76181C] leading-tight`}>
                  {INVITATION_DATA.couple.groom.shortName}
                </h1>
              </div>

              <p className={`${marcellus.className} tracking-[0.14em] uppercase text-[0.72rem] text-[#76181C] font-medium pt-1`}>
                05 SEPTEMBER 2026
              </p>

              <p className={`${cormorant.className} text-xs tracking-[0.08em] uppercase text-[#76181C]/90 font-medium max-w-[240px] leading-tight`}>
                Hindu Temple of St. Louis
              </p>

              <div className="pt-3">
                <button
                  onClick={handleOpenInvitation}
                  className={`${marcellus.className} px-7 py-2.5 bg-[#671418] hover:bg-[#76181C] text-[#FFFDF9] text-[0.72rem] tracking-[0.14em] uppercase font-medium rounded-md border-2 border-amber-400/80 shadow-md hover:scale-105 transition-transform`}
                >
                  OPEN INVITATION
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN PAGE CONTENT --- */}
      <main className="max-w-md mx-auto min-h-screen bg-[#FDFBF2] shadow-2xl border-x border-amber-200/50">

        {/* 1. HERO SCREEN WITH BACKGROUND VIDEO */}
        <section className="relative h-screen min-h-[680px] max-h-[850px] flex flex-col items-center justify-start p-6 text-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/assets/hero-procession-bg.mp4"
          />

          <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-2.5 pt-60">
            <p className={`${marcellus.className} tracking-[0.14em] text-[0.72rem] uppercase text-[#76181C] font-medium`}>
              || Shree Ganeshay Namah ||
            </p>

            <div className="space-y-0 text-[#76181C] py-1">
              <h1 className={`${greatVibes.className} text-6xl text-[#76181C]`}>
                {INVITATION_DATA.couple.groom.shortName}
              </h1>
              <p className={`${greatVibes.className} text-3xl text-[#76181C] my-0`}>&amp;</p>
              <h1 className={`${greatVibes.className} text-6xl text-[#76181C]`}>
                {INVITATION_DATA.couple.bride.shortName}
              </h1>
            </div>

            <p className={`${marcellus.className} tracking-[0.14em] text-[0.72rem] uppercase text-[#76181C] font-medium pt-1`}>
              Saturday, September 05, 2026
            </p>

            <p className={`${cormorant.className} text-xs tracking-[0.08em] uppercase text-[#76181C]/90 font-medium max-w-[260px] leading-relaxed`}>
               Hindu Temple of Saint Louis, Missouri, USA
            </p>
          </div>
        </section>

        {/* 2. THE COUPLE SECTION (PERFECTLY CENTERED CIRCULAR FRAMES) */}
        <section className="relative py-14 px-8 text-center shadow-inner overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0"
            src="/assets/temple-scenery.mp4"
          />

          <div className="relative z-10 space-y-1 pt-2">
            <h2 className={`${marcellus.className} text-3xl text-[#76181C] tracking-[0.01em]`}>The Couple</h2>
            <p className={`${cormorant.className} text-sm text-[#76181C]/80 italic`}>
              Two families, many blessings, one timeless celebration.
            </p>
          </div>

          {/* GROOM CARD */}
          <div className="relative z-10 pt-6 pb-4 px-4">
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              
              {/* Perfectly Centered Circular Photo Container */}
              <div className="absolute w-[210px] h-[210px] rounded-full overflow-hidden shadow-xl bg-white z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-13px] ml-[7px]">
                <img src={INVITATION_DATA.couple.groom.image} alt={INVITATION_DATA.couple.groom.name} className="w-full h-full object-cover object-top" />
              </div>

              {/* Pink Floral Wreath Overlay */}
              <img 
                src="/assets/pink-floral-wreath.png" 
                alt="Pink Floral Wreath" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 scale-125 mix-blend-multiply opacity-95" 
              />
            </div>

            <div className="mt-3 space-y-1">
              <h3 className={`${greatVibes.className} text-3xl text-[#76181C]`}>{INVITATION_DATA.couple.groom.name}</h3>
              <p className={`${marcellus.className} tracking-[0.14em] text-[0.72rem] uppercase text-[#76181C] font-medium pt-1`}>SON OF</p>
              <p className={`${cormorant.className} text-sm text-gray-800 font-medium`}>{INVITATION_DATA.couple.groom.parents}</p>
            </div>
          </div>

          <div className="relative z-10 w-full my-3 flex justify-center">
            <img src="/assets/gold-divider.png" alt="Divider" className="w-64 max-w-full h-auto opacity-90" />
          </div>

          {/* BRIDE CARD */}
          <div className="relative z-10 pt-2 pb-4 px-4">
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              
              {/* Perfectly Centered Circular Photo Container */}
              <div className="absolute w-[210px] h-[210px] rounded-full overflow-hidden shadow-xl bg-white z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-13px] ml-[7px]">
                <img src={INVITATION_DATA.couple.bride.image} alt={INVITATION_DATA.couple.bride.name} className="w-full h-full object-cover object-top" />
              </div>

              {/* Pink Floral Wreath Overlay */}
              <img 
                src="/assets/pink-floral-wreath.png" 
                alt="Pink Floral Wreath" 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 scale-125 mix-blend-multiply opacity-95" 
              />
            </div>

            <div className="mt-3 space-y-1">
              <h3 className={`${greatVibes.className} text-3xl text-[#76181C]`}>{INVITATION_DATA.couple.bride.name}</h3>
              <p className={`${marcellus.className} tracking-[0.14em] text-[0.72rem] uppercase text-[#76181C] font-medium pt-1`}>DAUGHTER OF</p>
              <p className={`${cormorant.className} text-sm text-gray-800 font-medium`}>{INVITATION_DATA.couple.bride.parents}</p>
            </div>
          </div>
        </section>

        {/* 3. MUHURTHAM COUNTDOWN */}
        <section 
          className="relative w-full aspect-[2.1/1] bg-cover bg-center bg-no-repeat overflow-hidden shadow-md"
          style={{ backgroundImage: "url('/assets/countdown-wall.jpg')" }}
        >
          <div className="absolute top-[50%] inset-x-[7.5%] bottom-[20%] grid grid-cols-4 items-center text-center">
            <div className="flex items-center justify-center">
              <span className={`${marcellus.className} text-2xl sm:text-3xl text-[#6D3412] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]`}>
                {String(timeLeft.days).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className={`${marcellus.className} text-2xl sm:text-3xl text-[#6D3412] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]`}>
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className={`${marcellus.className} text-2xl sm:text-3xl text-[#6D3412] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]`}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className={`${marcellus.className} text-2xl sm:text-3xl text-[#6D3412] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]`}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </section>

        {/* 4. CREATIVE SCROLLING JOURNEY TIMELINE WITH INTEGRATED TOP MARIGOLD BORDER */}
        <section 
          ref={timelineRef}
          className="relative pt-12 pb-20 px-3 shadow-inner overflow-hidden"
          style={{ 
            backgroundColor: '#fbebb3',
            backgroundImage: "url('/assets/muggu-pattern.png')",
          }}
        >
          {/* Top Marigold Garland Border placed cleanly inside the pink watercolor background */}
          <div className="absolute top-0 inset-x-0 w-full h-8 bg-repeat-x bg-contain z-10 pointer-events-none" style={{ backgroundImage: "url('/assets/kalyana-mandapam/gallery-toranam.png')" }} />

          {/* Title Header */}
          <div className="text-center space-y-1 relative z-10 pt-4 mb-8">
            <h2 className={`${greatVibes.className} text-5xl text-[#76181C]`}>The Wedding Journey</h2>
            <p className={`${cormorant.className} text-sm text-[#76181C]/80 italic`}>
              Walk with us, function to function, to the sacred hour.
            </p>
          </div>

          {/* STAGE CONTAINER */}
          <div className="relative w-full aspect-[400/1400] max-w-md mx-auto">
            
            {/* SVG SCROLLING & MOVING DASHES PATH */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 1400" fill="none">
              <path
                d="M 200 20 Q 340 180 200 340 Q 60 500 200 660 Q 340 820 200 980 Q 60 1140 200 1300"
                stroke="#76181C"
                strokeWidth="3.5"
                strokeDasharray="6 14"
                strokeLinecap="round"
                opacity="0.25"
              />
              <motion.path
                d="M 200 20 Q 340 180 200 340 Q 60 500 200 660 Q 340 820 200 980 Q 60 1140 200 1300"
                stroke="#76181C"
                strokeWidth="4"
                strokeDasharray="6 14"
                strokeLinecap="round"
                style={{ pathLength }}
                animate={{ strokeDashoffset: [40, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>

            {/* EVENT STOPS */}
            {INVITATION_DATA.events.map((evt, idx) => {
              const isAlignRight = evt.align === 'right';

              return (
                <motion.div 
                  key={evt.id} 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                  className="absolute w-full z-10 flex items-start"
                  style={{ top: `${15 + idx * 19}%` }}
                >
                  <div className={`w-[58%] text-center ${isAlignRight ? 'ml-auto pr-3' : 'mr-auto pl-3'}`}>
                    
                    <div className="w-11 h-11 mx-auto rounded-full bg-[#fbebb3] border-2 border-amber-400 p-1.5 flex items-center justify-center shadow-md mb-1 -mt-7">
                      <img src={evt.iconImg} alt={evt.title} className="w-full h-full object-contain drop-shadow-sm" />
                    </div>

                    <h3 className={`${marcellus.className} text-sm sm:text-base text-[#76181C] tracking-[0.01em] font-medium`}>{evt.title}</h3>
                    <p className={`${cormorant.className} text-[0.75rem] text-gray-800 font-semibold`}>{evt.date} · {evt.time}</p>
                    <p className={`${cormorant.className} text-[0.72rem] text-gray-700 font-medium leading-snug px-1`}>{evt.venue}</p>

                    {evt.dressCode && (
                      <p className={`${marcellus.className} text-[0.58rem] text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded-full w-max mx-auto uppercase tracking-[0.1em] mt-1`}>
                        Theme: {evt.dressCode}
                      </p>
                    )}

                    <a 
                      href={evt.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`${marcellus.className} inline-flex items-center gap-1 mt-1 text-[#76181C] text-[0.58rem] tracking-[0.12em] uppercase font-medium border border-[#76181C] rounded-full px-3 py-1 hover:bg-[#76181C] hover:text-white transition shadow-sm`}
                    >
                      <MapPin className="w-2.5 h-2.5" /> View Map
                    </a>
                  </div>
                </motion.div>
              );
            })}

          </div>
        </section>

        {/* 5. BEFORE THE VOWS */}
        <section 
          className="relative py-14 px-6 text-center overflow-hidden shadow-inner"
          style={{ 
            backgroundColor: '#F5E6BE',
            backgroundImage: "url('/assets/pattu-silk.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px'
          }}
        >
          <div className="absolute top-0 inset-x-0 w-full h-8 bg-repeat-x bg-contain z-10 pointer-events-none" style={{ backgroundImage: "url('/assets/kalyana-mandapam/gallery-toranam.png')" }} />

          <motion.img 
            initial={{ y: 20, opacity: 0.8 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/kalyana-mandapam/gallery-parasol.png" 
            alt="" 
            aria-hidden="true"
            className="absolute -right-6 top-16 w-28 sm:w-36 h-auto pointer-events-none z-0 opacity-85 rotate-12 drop-shadow-md"
          />

          <div className="relative z-10 space-y-1 mb-8 pt-2">
            <h2 className={`${greatVibes.className} text-5xl text-[#76181C]`}>Before the Vows</h2>
            <p className={`${cormorant.className} text-sm text-[#76181C]/80 italic`}>
              Little moments from the years that brought us here.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 max-w-sm mx-auto">
            {INVITATION_DATA.galleryImages.map((imgName, idx) => (
              <div 
                key={idx} 
                className={`rounded-xl overflow-hidden border-2 border-amber-300/60 shadow-md bg-white ${idx === 0 || idx === 9 ? 'col-span-2 h-52' : 'h-40'}`}
              >
                <img 
                  src={`/assets/gallery/${imgName}`} 
                  alt={`Gallery photo ${idx + 1}`} 
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>
        </section>

        {/* 6. RSVP SECTION */}
        <section 
          className="relative py-14 px-4 shadow-inner overflow-hidden"
          style={{ 
            backgroundColor: '#fbebb3',
            backgroundImage: "url('/assets/muggu-pattern.png')",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-top.jpg')" }} />
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-bottom.jpg')" }} />
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-left.jpg')" }} />
          <div className="absolute right-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-right.jpg')" }} />

          <div className="max-w-xs mx-auto text-center space-y-4 relative z-10 pt-2">
            <h2 className={`${marcellus.className} text-2xl text-[#76181C]`}>Bless Us With Your Presence</h2>
            <p className={`${cormorant.className} text-sm text-gray-700 italic`}>Please grace us with your response so we may reserve your place at our celebration.</p>

            {submitted ? (
              <div className={`${cormorant.className} p-4 bg-green-50 text-green-800 rounded-xl text-sm border border-green-200 shadow-sm`}>
                <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-1" />
                Your gracious response has been received. We eagerly look forward to celebrating together!
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 text-left">
                {/* Name Field */}
                <div>
                  <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1`}>
                    Your Esteemed Name
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter your full name" 
                    className={`${cormorant.className} w-full p-2.5 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#76181C] shadow-inner`}
                  />
                </div>

                {/* Attendance Decision */}
                <div>
                  <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1`}>
                    Will You Grace Us With Your Presence?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={`${cormorant.className} flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border border-amber-300 text-sm cursor-pointer shadow-sm hover:border-[#76181C] transition`}>
                      <input 
                        type="radio" 
                        name="attending" 
                        value="yes"
                        checked={attendingStatus === 'yes'}
                        onChange={(e) => setAttendingStatus(e.target.value)}
                        className="accent-[#76181C]" 
                      />
                      With joy, I/We will be there
                    </label>
                    <label className={`${cormorant.className} flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border border-amber-300 text-sm cursor-pointer shadow-sm hover:border-[#76181C] transition`}>
                      <input 
                        type="radio" 
                        name="attending" 
                        value="no"
                        checked={attendingStatus === 'no'}
                        onChange={(e) => setAttendingStatus(e.target.value)}
                        className="accent-[#76181C]" 
                      />
                      With regret, I/We cannot
                    </label>
                  </div>
                </div>

                {/* Conditional Guest Count & Event Selection (Only displayed when 'yes' is selected) */}
                <AnimatePresence>
                  {attendingStatus === 'yes' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3 pt-1 border-t border-amber-300/50 overflow-hidden"
                    >
                      <div>
                        <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1`}>
                          Total Guests Attending (Including You)
                        </label>
                        <select 
                          className={`${cormorant.className} w-full p-2.5 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#76181C] shadow-inner`}
                        >
                          <option value="1">Just Me (1 Guest)</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5">5+ Guests</option>
                        </select>
                      </div>

                      <div>
                        <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1.5`}>
                          Select Ceremonies You Will Honor Us Attending:
                        </label>
                        <div className="space-y-1.5 bg-white/60 p-2.5 rounded-lg border border-amber-300/70 shadow-inner">
                          {INVITATION_DATA.events.map((evt) => (
                            <label key={evt.id} className={`${cormorant.className} flex items-center gap-2.5 text-sm cursor-pointer text-gray-800 hover:text-[#76181C]`}>
                              <input type="checkbox" defaultChecked className="accent-[#76181C] w-4 h-4 rounded" />
                              <span>{evt.title} ({evt.date.split(',')[1]?.trim() || evt.date})</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Personal Message */}
                <div>
                  <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1`}>
                    Blessings &amp; Wishes for the Couple
                  </label>
                  <textarea 
                    rows="2"
                    placeholder="Leave a heartfelt note or message for the couple..." 
                    className={`${cormorant.className} w-full p-2.5 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#76181C] shadow-inner resize-none`}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`${marcellus.className} w-full py-3 bg-[#671418] hover:bg-[#76181C] text-amber-100 text-[0.75rem] tracking-[0.15em] uppercase font-semibold rounded-lg shadow-lg border border-amber-300/60 transition-transform hover:scale-[1.02]`}
                >
                  SEND YOUR BLESSINGS &amp; RSVP
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 8. AUTHENTIC FINAL FOOTER SECTION */}
        <footer 
          className="relative py-20 px-6 text-center overflow-hidden bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between min-h-[580px]"
          style={{ backgroundImage: "url('/entry-card.jpg')" }}
        >
          <div className="w-full max-w-xs mx-auto space-y-3 relative z-10 pt-16">
            <div className="space-y-1">
              <p className={`${cormorant.className} text-base text-[#76181C] italic font-semibold`}>We await your gracious presence</p>
              <p className={`${greatVibes.className} text-4xl text-[#76181C]`}>and your blessings</p>
              <p className={`${cormorant.className} text-2xl text-[#76181C] font-bold pt-1`}>శుభమస్తు</p>
            </div>

            <div className="pt-2 text-xs text-[#76181C]/90 space-y-1 font-medium">
              <p>This invitation was crafted with love for venky couple photos</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
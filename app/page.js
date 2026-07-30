'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Marcellus, Great_Vibes, Cormorant_Garamond } from 'next/font/google';

// Font definitions
const marcellus = Marcellus({ weight: '400', subsets: ['latin'] });
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] });
const cormorant = Cormorant_Garamond({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

// Scaled & Spaced Footprint Coordinates matching the main site SVG curve
const FOOTPRINT_COORDINATES = [
  { isLeft: true,  left: "50.5%",   top: "3.9%",   rot: -179.8 },
  { isLeft: false, left: "49.5%",   top: "3.9%",   rot: -179.8 },
  { isLeft: true,  left: "48.2%",   top: "6.6%",   rot: -163.5 },
  { isLeft: false, left: "44.5%",   top: "7.8%",   rot: -151.6 },
  { isLeft: true,  left: "41.9%",   top: "9.6%",   rot: -142.3 },
  { isLeft: false, left: "37.1%",   top: "10.3%",  rot: -138.4 },
  { isLeft: true,  left: "33.7%",   top: "12.2%",  rot: -140.9 },
  { isLeft: false, left: "29.1%",   top: "13.0%",  rot: -149.2 },
  { isLeft: true,  left: "27.5%",   top: "14.9%",  rot: -160.9 },
  { isLeft: false, left: "26.3%",   top: "16.3%",  rot: -172.3 },
  { isLeft: true,  left: "27.0%",   top: "17.9%",  rot: 178.5 },
  { isLeft: false, left: "28.6%",   top: "19.7%",  rot: 168.4 },
  { isLeft: true,  left: "32.0%",   top: "21.0%",  rot: 157.1 },
  { isLeft: false, left: "35.0%",   top: "22.9%",  rot: 146.2 },
  { isLeft: true,  left: "39.7%",   top: "23.6%",  rot: 137.6 },
  { isLeft: false, left: "43.5%",   top: "25.4%",  rot: 131.6 },
  { isLeft: true,  left: "48.7%",   top: "25.8%",  rot: 128.3 },
  { isLeft: false, left: "53.2%",   top: "27.5%",  rot: 127.3 },
  { isLeft: true,  left: "58.4%",   top: "27.8%",  rot: 128.5 },
  { isLeft: false, left: "62.7%",   top: "29.6%",  rot: 132.2 },
  { isLeft: true,  left: "67.7%",   top: "30.1%",  rot: 138.5 },
  { isLeft: false, left: "71.6%",   top: "31.9%",  rot: 147.5 },
  { isLeft: true,  left: "73.8%",   top: "33.0%",  rot: 158.5 },
  { isLeft: false, left: "73.5%",   top: "34.8%",  rot: 169.7 },
  { isLeft: true,  left: "72.9%",   top: "36.4%",  rot: 179.6 },
  { isLeft: false, left: "70.6%",   top: "38.0%",  rot: -170.5 },
  { isLeft: true,  left: "68.1%",   top: "39.8%",  rot: -159.3 },
  { isLeft: false, left: "64.0%",   top: "40.9%",  rot: -148.3 },
  { isLeft: true,  left: "60.1%",   top: "42.7%",  rot: -139.1 },
  { isLeft: false, left: "55.2%",   top: "43.3%",  rot: -132.6 },
  { isLeft: true,  left: "50.9%",   top: "45.0%",  rot: -128.7 },
  { isLeft: false, left: "46.7%",   top: "45.3%",  rot: -127.3 },
  { isLeft: true,  left: "42.2%",   top: "47.1%",  rot: -128.1 },
  { isLeft: false, left: "37.1%",   top: "47.4%",  rot: -131.3 },
  { isLeft: true,  left: "33.2%",   top: "49.2%",  rot: -137.0 },
  { isLeft: false, left: "29.4%",   top: "49.9%",  rot: -145.5 },
  { isLeft: true,  left: "28.3%",   top: "51.8%",  rot: -156.2 },
  { isLeft: false, left: "27.7%",   top: "53.1%",  rot: -167.5 },
  { isLeft: true,  left: "29.0%",   top: "54.8%",  rot: -177.8 },
  { isLeft: false, left: "30.2%",   top: "56.5%",  rot: 172.6 },
  { isLeft: true,  left: "34.3%",   top: "57.9%",  rot: 161.6 },
  { isLeft: false, left: "37.8%",   top: "59.8%",  rot: 150.4 },
  { isLeft: true,  left: "42.4%",   top: "60.7%",  rot: 140.7 },
  { isLeft: false, left: "46.9%",   top: "62.5%",  rot: 133.6 },
  { isLeft: true,  left: "52.0%",   top: "62.9%",  rot: 129.3 },
  { isLeft: false, left: "56.5%",   top: "64.6%",  rot: 127.4 },
  { isLeft: true,  left: "61.7%",   top: "64.9%",  rot: 127.8 },
  { isLeft: false, left: "65.1%",   top: "66.6%",  rot: 130.4 },
  { isLeft: true,  left: "69.1%",   top: "67.1%",  rot: 135.6 },
  { isLeft: false, left: "71.4%",   top: "68.9%",  rot: 143.6 },
  { isLeft: true,  left: "72.9%",   top: "69.9%",  rot: 153.9 },
  { isLeft: false, left: "72.0%",   top: "71.7%",  rot: 165.3 },
  { isLeft: true,  left: "71.9%",   top: "73.2%",  rot: 175.9 },
  { isLeft: false, left: "68.8%",   top: "74.8%",  rot: -174.6 },
  { isLeft: true,  left: "65.8%",   top: "76.6%",  rot: -163.9 },
  { isLeft: false, left: "62.0%",   top: "77.8%",  rot: -152.5 },
  { isLeft: true,  left: "57.6%",   top: "79.7%",  rot: -142.4 },
  { isLeft: false, left: "52.7%",   top: "80.3%",  rot: -134.8 },
  { isLeft: true,  left: "47.6%",   top: "82.1%",  rot: -130.0 },
  { isLeft: false, left: "43.5%",   top: "82.5%",  rot: -127.6 },
  { isLeft: true,  left: "38.9%",   top: "84.2%",  rot: -127.5 },
  { isLeft: false, left: "34.7%",   top: "84.5%",  rot: -129.7 },
  { isLeft: true,  left: "31.7%",   top: "86.3%",  rot: -134.4 },
  { isLeft: false, left: "28.7%",   top: "86.9%",  rot: -141.8 },
  { isLeft: true,  left: "28.2%",   top: "88.7%",  rot: -151.8 },
  { isLeft: false, left: "27.3%",   top: "89.9%",  rot: -163.1 },
  { isLeft: true,  left: "29.1%",   top: "91.7%",  rot: -173.9 },
];

const INVITATION_DATA = {
  couple: {
    groom: {
      name: "Bonde Sai Venkateswara Rao",
      shortName: "Venky",
      parents: "Mr. Venky Dad & Mrs. Kasthuri",
      image: "/assets/groom.jpg"
    },
    bride: {
      name: "Vineela",
      shortName: "Vineela",
      parents: "Mr. Vineela Dad & Mrs. Vineela Mom",
      image: "/assets/bride.jpg"
    }
  },
  weddingDate: "2026-09-05T10:32:00",
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
      topPct: "17.7%"
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
      topPct: "36.5%"
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
      topPct: "55.2%"
    },
    {
      id: "wedding",
      title: "Wedding Ceremony",
      date: "Saturday, 05th September 2026",
      time: "10:32 AM",
      venue: "Hindu Temple of St Louis",
      mapUrl: "https://maps.app.goo.gl/BcE4pcMrCyi1j7i8A",
      iconImg: "/assets/nadaswaram.png",
      align: "left",
      topPct: "74.0%"
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
      topPct: "92.7%"
    }
  ],
  // Local gallery filenames (add your photos to public/assets/gallery/)
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
            <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-2.5 pt-28 sm:pt-36">
              <p className={`${marcellus.className} tracking-[0.14em] uppercase text-[0.72rem] text-[#76181C] font-medium`}>
                THE WEDDING OF
              </p>

              <div className="space-y-0 text-[#76181C] py-0.5">
                <h1 className={`${greatVibes.className} text-5xl sm:text-6xl text-[#76181C] leading-tight`}>
                  {INVITATION_DATA.couple.groom.shortName}
                </h1>
                <p className={`${greatVibes.className} text-2xl text-[#76181C] my-0`}>&amp;</p>
                <h1 className={`${greatVibes.className} text-5xl sm:text-6xl text-[#76181C] leading-tight`}>
                  {INVITATION_DATA.couple.bride.shortName}
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

        {/* 2. THE COUPLE SECTION */}
        <section 
          className="relative py-14 px-8 text-center shadow-inner overflow-hidden"
          style={{ 
            backgroundColor: '#fbebb3',
            backgroundImage: "url('/assets/temple-scenery.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Borders */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-top.jpg')" }} />
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-bottom.jpg')" }} />
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-left.jpg')" }} />
          <div className="absolute right-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-right.jpg')" }} />

          <div className="relative z-10 space-y-1 pt-2">
            <h2 className={`${marcellus.className} text-3xl text-[#76181C] tracking-[0.01em]`}>The Couple</h2>
            <p className={`${cormorant.className} text-sm text-[#76181C]/80 italic`}>
              Two families, many blessings, one timeless celebration.
            </p>
          </div>

          {/* GROOM CARD */}
          <div className="relative z-10 pt-2 pb-4 px-4">
            <div className="relative w-64 h-[350px] mx-auto flex items-center justify-center">
              <div 
                className="absolute top-[32.5%] w-[76%] h-[63.5%] overflow-hidden rounded-t-[50px] rounded-b-xl"
                style={{ WebkitMaskImage: "radial-gradient(circle at 50% 0%, black 100%, transparent 100%)" }}
              >
                <img src={INVITATION_DATA.couple.groom.image} alt={INVITATION_DATA.couple.groom.name} className="w-full h-full object-cover object-top" />
              </div>
              <img src="/assets/peacock-arch.png" alt="Peacock Arch Frame" className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10" />
            </div>

            <div className="mt-1 space-y-1">
              <h3 className={`${greatVibes.className} text-3xl text-[#76181C]`}>{INVITATION_DATA.couple.groom.name}</h3>
              <p className={`${marcellus.className} tracking-[0.14em] text-[0.72rem] uppercase text-[#76181C] font-medium pt-1`}>SON OF</p>
              <p className={`${cormorant.className} text-sm text-gray-700 font-medium`}>{INVITATION_DATA.couple.groom.parents}</p>
            </div>
          </div>

          <div className="relative z-10 w-full my-2 flex justify-center">
            <img src="/assets/gold-divider.png" alt="Divider" className="w-64 max-w-full h-auto opacity-90" />
          </div>

          {/* BRIDE CARD */}
          <div className="relative z-10 pt-2 pb-4 px-4">
            <div className="relative w-64 h-[350px] mx-auto flex items-center justify-center">
              <div 
                className="absolute top-[32.5%] w-[76%] h-[63.5%] overflow-hidden rounded-t-[50px] rounded-b-xl"
                style={{ WebkitMaskImage: "radial-gradient(circle at 50% 0%, black 100%, transparent 100%)" }}
              >
                <img src={INVITATION_DATA.couple.bride.image} alt={INVITATION_DATA.couple.bride.name} className="w-full h-full object-cover object-top" />
              </div>
              <img src="/assets/peacock-arch.png" alt="Peacock Arch Frame" className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10" />
            </div>

            <div className="mt-1 space-y-1">
              <h3 className={`${greatVibes.className} text-3xl text-[#76181C]`}>{INVITATION_DATA.couple.bride.name}</h3>
              <p className={`${marcellus.className} tracking-[0.14em] text-[0.72rem] uppercase text-[#76181C] font-medium pt-1`}>DAUGHTER OF</p>
              <p className={`${cormorant.className} text-sm text-gray-700 font-medium`}>{INVITATION_DATA.couple.bride.parents}</p>
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

        {/* 4. THE WEDDING JOURNEY TIMELINE */}
        <section 
          className="relative py-14 px-3 shadow-inner overflow-hidden"
          style={{ 
            backgroundColor: '#fbebb3',
            backgroundImage: "url('/assets/muggu-pattern.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px'
          }}
        >
          {/* Elephant Borders */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-top.jpg')" }} />
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-bottom.jpg')" }} />
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-left.jpg')" }} />
          <div className="absolute right-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-right.jpg')" }} />

          {/* Title Header */}
          <div className="text-center space-y-1 relative z-10 pt-2 mb-2">
            <h2 className={`${greatVibes.className} text-5xl text-[#76181C]`}>The Wedding Journey</h2>
            <p className={`${cormorant.className} text-sm text-[#76181C]/80 italic`}>
              Walk with us, function to function, to the sacred hour.
            </p>
          </div>

          {/* STAGE CONTAINER WITH SVG ASPECT RATIO */}
          <div className="relative w-full aspect-[400/1333] max-w-md mx-auto">
            
            {/* FOOTPRINTS LAYER (SLOWER, SMOOTH REVEAL) */}
            {FOOTPRINT_COORDINATES.map((foot, index) => (
              <motion.img
                key={index}
                initial={{ opacity: 0, scale: 0.3 }}
                whileInView={{ opacity: 0.8, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: (index % 5) * 0.12,
                  ease: "easeOut" 
                }}
                src={foot.isLeft ? "/assets/footprint-left.png" : "/assets/footprint-right.png"}
                alt=""
                className="absolute w-3.5 h-auto pointer-events-none z-0"
                style={{
                  left: foot.left,
                  top: foot.top,
                  transform: `translate(-50%, -50%) rotate(${foot.rot}deg)`
                }}
              />
            ))}

            {/* EVENT STOPS */}
            {INVITATION_DATA.events.map((evt) => {
              const isAlignRight = evt.align === 'right';

              return (
                <div 
                  key={evt.id} 
                  className="absolute w-full z-10 flex items-start"
                  style={{ top: evt.topPct }}
                >
                  {/* Event Card positioned beside the path */}
                  <div className={`w-[58%] text-center space-y-0.5 ${isAlignRight ? 'ml-auto pr-2' : 'mr-auto pl-2'}`}>
                    
                    {/* Floating Medallion Badge */}
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#fbebb3]/95 border border-amber-400/70 p-1 flex items-center justify-center shadow-md mb-1">
                      <img src={evt.iconImg} alt={evt.title} className="w-full h-full object-contain drop-shadow-sm" />
                    </div>

                    <h3 className={`${marcellus.className} text-sm sm:text-base text-[#76181C] tracking-[0.01em] font-medium`}>{evt.title}</h3>
                    <p className={`${cormorant.className} text-[0.72rem] text-gray-800 font-semibold`}>{evt.date} · {evt.time}</p>
                    <p className={`${cormorant.className} text-[0.72rem] text-gray-700 font-medium leading-snug px-1`}>{evt.venue}</p>

                    {evt.dressCode && (
                      <p className={`${marcellus.className} text-[0.58rem] text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full w-max mx-auto uppercase tracking-[0.1em] mt-1`}>
                        Theme: {evt.dressCode}
                      </p>
                    )}

                    <a 
                      href={evt.mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`${marcellus.className} inline-flex items-center gap-1 mt-1 text-[#76181C] text-[0.58rem] tracking-[0.12em] uppercase font-medium border border-[#76181C] rounded-full px-2.5 py-0.5 hover:bg-[#76181C] hover:text-white transition`}
                    >
                      <MapPin className="w-2 h-2" /> View Map
                    </a>
                  </div>
                </div>
              );
            })}

          </div>
        </section>

        {/* 5. BEFORE THE VOWS (PATTU SILK BACKGROUND & TORANAM & PARASOL) */}
        <section 
          className="relative py-14 px-6 text-center overflow-hidden shadow-inner"
          style={{ 
            backgroundColor: '#F5E6BE',
            backgroundImage: "url('/assets/pattu-silk.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px'
          }}
        >
          {/* Toranam Garland at the top of the section */}
          <div className="absolute top-0 inset-x-0 w-full h-8 bg-repeat-x bg-contain z-10 pointer-events-none" style={{ backgroundImage: "url('/assets/kalyana-mandapam/gallery-toranam.png')" }} />

          {/* Decorative Ceremonial Umbrella Asset */}
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
          className="relative py-14 px-3 shadow-inner overflow-hidden"
          style={{ 
            backgroundColor: '#fbebb3',
            backgroundImage: "url('/assets/muggu-pattern.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px'
          }}
        >
          {/* Elephant Borders */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-top.jpg')" }} />
          <div className="absolute bottom-0 left-0 right-0 h-5 bg-repeat-x bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-bottom.jpg')" }} />
          <div className="absolute left-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-left.jpg')" }} />
          <div className="absolute right-0 top-0 bottom-0 w-5 bg-repeat-y bg-contain z-20 shadow-sm" style={{ backgroundImage: "url('/assets/elephant-border-right.jpg')" }} />

          <div className="max-w-xs mx-auto text-center space-y-4 relative z-10 pt-2">
            <h2 className={`${marcellus.className} text-2xl text-[#76181C]`}>Bless Us With Your Presence</h2>
            <p className={`${cormorant.className} text-sm text-gray-600`}>Let us know if you can join us, so we may keep a place for you.</p>

            {submitted ? (
              <div className={`${cormorant.className} p-4 bg-green-50 text-green-800 rounded-xl text-sm`}>
                <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-1" />
                Thank you! Your blessings have been received.
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 text-left">
                <label className={`${cormorant.className} flex items-center gap-2 p-3 bg-white rounded-lg border border-amber-200 text-sm cursor-pointer`}>
                  <input type="radio" name="attending" defaultChecked className="accent-[#76181C]" />
                  With joy, we will be there
                </label>
                <label className={`${cormorant.className} flex items-center gap-2 p-3 bg-white rounded-lg border border-amber-200 text-sm cursor-pointer`}>
                  <input type="radio" name="attending" className="accent-[#76181C]" />
                  With regret, we cannot
                </label>
                <button 
                  type="submit" 
                  className={`${marcellus.className} w-full py-2.5 bg-[#671418] text-amber-100 text-[0.72rem] tracking-[0.14em] uppercase font-medium rounded-lg shadow hover:bg-[#671418]`}
                >
                  SEND RSVP
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 7. OUR STORY TEMPLE FRAME SECTION (CONTIGUOUS WITH BACKGROUND PATTERN & ZERO PADDING) */}
        <section 
          className="relative py-0 px-0 text-center overflow-hidden"
          style={{ 
            backgroundColor: '#fbebb3',
            backgroundImage: "url('/assets/muggu-pattern.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '180px 180px'
          }}
        >
          <div className="relative w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center m-0 p-0">
            
            {/* Embedded Video Container with exact percentage coordinates matching the carved frame opening */}
            <div className="absolute top-[21%] left-[10.5%] right-[10.5%] bottom-[10.5%] z-0 overflow-hidden bg-black shadow-inner">
              <iframe 
                className="w-full h-full object-cover"
                src="https://www.youtube.com/embed/madronEXfl0?rel=0&modestbranding=1" 
                title="Our Story" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                loading="lazy"
              />
            </div>

            {/* Architectural Temple Frame Overlay */}
            <img 
              src="/assets/our-story-frame.jpg" 
              alt="Our Story Frame" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10" 
            />
          </div>
        </section>

        {/* 8. AUTHENTIC FINAL FOOTER SECTION (WITH ENTRY-CARD BACKGROUND & PROPER PADDING/SPACING) */}
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
              <p>This invitation was crafted with love for venky couple</p>
            </div>
          </div>

          {/* Traditional Indian Wedding Mural Illustration positioned precisely at the bottom */}
          <div className="w-full max-w-sm mx-auto relative z-10 mt-auto pt-6">
            <img 
              src="/assets/traditional-wedding-art.png" 
              alt="Traditional Wedding Art" 
              className="w-full h-auto object-contain mx-auto drop-shadow-sm" 
            />
          </div>
        </footer>

      </main>
    </div>
  );
}
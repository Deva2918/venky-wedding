'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, CheckCircle, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react';
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
      parents: "Mr. Srinivas Rao Bonde & Mrs. Kasthuri Bonde",
      image: "/assets/groom.jpg"
    },
    bride: {
      name: "Vineela Bandi",
      shortName: "Vineela",
      parents: "Mr. Veerasekhara Rao Bandi & Mrs. Ajaya Kumari Bandi",
      image: "/assets/bride.jpg"
    }
  },
  weddingDate: "2026-09-05T10:31:00",
  events: [
    {
      id: "pelli-koduku",
      title: "Pelli Kuthuru and Peli Koduku",
      date: "Thursday, 03rd September 2026",
      time: "05:00 PM",
      venue: "708 Kenmare Ct, Dardenne Prairie, MO 63368",
      mapUrl: "https://maps.app.goo.gl/kvhaF1TVbCi7kAnEA?g_st=ic",
      align: "right",
      topPct: "7%"
    },
    {
      id: "haldi",
      title: "Haldi",
      date: "Friday, 04th September 2026",
      time: "10:00 AM",
      venue: "708 Kenmare Ct, Dardenne Prairie, MO 63368",
      dressCode: "Yellow",
      mapUrl: "https://maps.app.goo.gl/kvhaF1TVbCi7kAnEA?g_st=ic",
      align: "left",
      topPct: "27%"
    },
    {
      id: "mehandi",
      title: "Mehandi",
      date: "Friday, 04th September 2026",
      time: "06:00 PM",
      venue: "708 Kenmare Ct, Dardenne Prairie, MO 63368",
      mapUrl: "https://maps.app.goo.gl/kvhaF1TVbCi7kAnEA?g_st=ic",
      align: "right",
      topPct: "41%"
    },
    {
      id: "wedding",
      title: "Wedding Day",
      date: "Saturday, 05th September 2026",
      time: "10:31 AM",
      venue: "The Hindu Temple of St Louis",
      mapUrl: "https://maps.app.goo.gl/QZRRP3PrJEx9x5J17?g_st=ipc",
      align: "left",
      topPct: "60%"
    },
    {
      id: "reception",
      title: "Reception",
      date: "Saturday, 05th September 2026",
      time: "06:30 PM",
      venue: "Persis Banquet Hall",
      mapUrl: "https://maps.app.goo.gl/RvZwvY2tDK6WD7Ad7?g_st=ic",
      align: "right",
      topPct: "75%"
    },
    {
      id: "vratham",
      title: "Vratham",
      date: "Sunday, 06th September 2026",
      time: "09:00 AM",
      venue: "708 Kenmare Ct, Dardenne Prairie, MO 63368",
      mapUrl: "https://maps.app.goo.gl/kvhaF1TVbCi7kAnEA?g_st=ic",
      align: "left",
      topPct: "87%"
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

const CEREMONY_OPTIONS = [
  "Peli Kuthuru and Peli Koduku",
  "Haldi",
  "Mehandi",
  "Wedding Day",
  "Reception",
  "Vratham"
];

function TimelineEventItem({ evt, idx }) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [40, 0]);

  const isAlignRight = evt.align === 'right';
  const eventImage = INVITATION_DATA.galleryImages[idx % INVITATION_DATA.galleryImages.length];

  return (
    <motion.div 
      ref={itemRef}
      style={{ opacity, scale, y, top: evt.topPct}}
      className={`absolute w-full z-20 flex items-center ${isAlignRight ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`w-[50%] flex items-center justify-center ${isAlignRight ? 'pr-3' : 'pl-3'}`}>
        <img 
          src={`/assets/${eventImage}`} 
          alt={evt.title} 
          className="w-50 h-50 sm:w-50 sm:h-50 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=300&q=80`;
          }}
        />
      </div>

      <div className={`w-[50%] text-center ${isAlignRight ? 'text-left pl-1' : 'text-right pr-1'}`}>
        <h2 className={`${marcellus.className} text-[1.2rem] sm:text-sm text-[#76181C] tracking-[0.01em] font-medium`}>{evt.title}</h2>
        <p className={`${cormorant.className} text-[1rem] text-gray-800 font-bold`}>{evt.date} · {evt.time}</p>
        <p className={`${cormorant.className} text-[0.85rem] text-gray-700 font-medium leading-snug`}>{evt.venue}</p>

        {evt.dressCode && (
          <p className={`${marcellus.className} text-[0.55rem] text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full w-max ${isAlignRight ? '' : 'ml-auto'} uppercase tracking-[0.1em] mt-0.5`}>
            Theme: {evt.dressCode}
          </p>
        )}

        <a 
          href={evt.mapUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${marcellus.className} inline-flex items-center gap-1 mt-1 text-[#76181C] text-[0.55rem] tracking-[0.12em] uppercase font-medium border border-[#76181C] rounded-full px-2.5 py-0.5 hover:bg-[#76181C] hover:text-white transition shadow-sm`}
        >
          <MapPin className="w-2.5 h-2.5" /> Map
        </a>
      </div>
    </motion.div>
  );
}

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const heroVideoRef = useRef(null);
  const templeVideoRef = useRef(null);
  const exitVideoRef = useRef(null);
  const formRef = useRef(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [attendingStatus, setAttendingStatus] = useState('');
  const [selectedCeremonies, setSelectedCeremonies] = useState({});
  const [checkboxError, setCheckboxError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    [heroVideoRef, templeVideoRef, exitVideoRef].forEach((ref) => {
      if (ref.current) {
        ref.current.play().catch((err) => console.log("Video play error:", err));
      }
    });
  };

  const handleCheckboxChange = (ceremony) => {
    setSelectedCeremonies(prev => {
      const updated = { ...prev, [ceremony]: !prev[ceremony] };
      if (Object.values(updated).some(val => val)) {
        setCheckboxError(false);
      }
      return updated;
    });
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();

    if (attendingStatus === 'yes') {
      const hasSelectedOne = Object.values(selectedCeremonies).some(val => val);
      if (!hasSelectedOne) {
        setCheckboxError(true);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formElement = formRef.current;
      const formData = new FormData(formElement);
      
      const urlEncodedData = new URLSearchParams();
      for (const [key, value] of formData.entries()) {
        urlEncodedData.append(key, value);
      }

      await fetch(formElement.action, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData.toString(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (error) {
      console.error("RSVP submission error:", error);
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  return (
    <div className={`min-h-screen bg-[#FDFBF2] text-[#3D2E24] ${cormorant.className} selection:bg-amber-100 selection:text-amber-900 relative`}>

      <audio ref={audioRef} src="/wedding-music.mp3" loop />

      {isOpen && (
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#671418] text-amber-100 rounded-full shadow-2xl border border-amber-300 hover:scale-110 transition-transform"
          aria-label="Toggle Audio"
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5 opacity-70" />}
        </button>
      )}

      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-start p-6 text-center bg-cover bg-center bg-no-repeat bg-[#FDFBF2]"
            style={{ backgroundImage: "url('/entry-card.jpg')" }}
          >
            <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-2 pt-50 sm:pt-28">
              <p className={`${marcellus.className} tracking-[0.14em] uppercase text-[0.72rem] text-[#76181C] font-medium`}>
                THE WEDDING OF
              </p>

              <div className="space-y-0 text-[#76181C] py-0.5">
                <h1 className={`${greatVibes.className} text-5xl sm:text-6xl text-[#76181C] leading-tight`}>
                  {INVITATION_DATA.couple.bride.shortName}
                </h1>
                <p className={`${greatVibes.className} text-2xl text-[#76181C] my-0`}>&</p>
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

      <main className="max-w-md mx-auto min-h-screen bg-[#FDFBF2] shadow-2xl border-x border-amber-200/50">

        <section className="relative h-screen min-h-[680px] max-h-[850px] flex flex-col items-center justify-start p-6 text-center overflow-hidden">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            src="/assets/hero-procession-bg.mp4"
          />

          <div className="relative z-10 w-full flex flex-col items-center justify-center space-y-2.5 pt-26">
            <p className={`${marcellus.className} tracking-[0.14em] text-[0.72rem] uppercase text-[#76181C] font-medium`}>
              || Shree Ganeshay Namah ||
            </p>

            <div className="space-y-0 text-[#76181C] py-1">
              <h1 className={`${greatVibes.className} text-6xl text-[#76181C]`}>
                {INVITATION_DATA.couple.groom.shortName}
              </h1>
              <p className={`${greatVibes.className} text-3xl text-[#76181C] my-0`}>&</p>
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

        <section className="relative py-14 px-8 text-center shadow-inner overflow-hidden">
          <video
            ref={templeVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            src="/assets/temple-scenery.mp4"
          />

          <div className="relative z-10 space-y-1 pt-2">
            <h2 className={`${marcellus.className} text-3xl text-[#76181C] tracking-[0.01em]`}>The Couple</h2>
            <p className={`${cormorant.className} text-sm text-[#76181C]/80 italic`}>
              Two families, many blessings, one timeless celebration.
            </p>
          </div>

          <div className="relative z-10 pt-6 pb-4 px-4">
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <div className="absolute w-[210px] h-[210px] rounded-full overflow-hidden shadow-xl bg-white z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-13px] ml-[7px]">
                <img src={INVITATION_DATA.couple.groom.image} alt={INVITATION_DATA.couple.groom.name} className="w-full h-full object-cover object-top" />
              </div>
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

          <div className="relative z-10 pt-2 pb-4 px-4">
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <div className="absolute w-[210px] h-[210px] rounded-full overflow-hidden shadow-xl bg-white z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-13px] ml-[7px]">
                <img src={INVITATION_DATA.couple.bride.image} alt={INVITATION_DATA.couple.bride.name} className="w-full h-full object-cover object-top" />
              </div>
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

        <section 
          ref={timelineRef}
          className="relative pt-6 px-3 shadow-inner overflow-hidden flex flex-col"
          style={{ backgroundColor: '#fbebb3' }}
        >
          <div className="absolute inset-0 z-0 flex flex-col w-full h-full pointer-events-none">
            <div className="w-full h-1/3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/journey-bg.jpg')" }} />
            <div className="w-full h-1/3 bg-cover bg-center bg-no-repeat scale-y-[-1]" style={{ backgroundImage: "url('/assets/journey-bg.jpg')" }} />
            <div className="w-full h-1/3 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/journey-bg.jpg')" }} />
          </div>

          <div className="absolute top-0 inset-x-0 w-full h-8 bg-repeat-x bg-contain z-20 pointer-events-none" style={{ backgroundImage: "url('/assets/kalyana-mandapam/gallery-toranam.png')" }} />
          <motion.img 
            initial={{ y: 20, opacity: 0.8 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/kalyana-mandapam/gallery-parasol.png" 
            alt="" 
            aria-hidden="true"
            className="absolute -right-6 top-10 w-28 sm:w-36 h-auto pointer-events-none z-20 opacity-85 rotate-1 drop-shadow-md"
          />
          <motion.img 
            initial={{ y: 20, opacity: 0.8 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/assets/kalyana-mandapam/gallery-parasol.png" 
            alt="" 
            aria-hidden="true"
            className="absolute -left-6 top-10 w-28 sm:w-36 h-auto pointer-events-none z-20 opacity-85 rotate-70 drop-shadow-md"
          />
          <div className="text-center space-y-1 relative z-20 pt-32 mb-4">
            <h2 className={`${greatVibes.className} text-5xl text-[#76181C]`}>The Wedding Journey</h2>
            <p className={`${cormorant.className} text-sm text-[#76181C]/80 italic`}>
              Walk with us, function to function, to the sacred hour.
            </p>
          </div>

          <div className="relative w-full aspect-[400/1600] max-w-md mx-auto z-10">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 1600" fill="none">
              <path
                d="M 215 50 Q 80 130 90 265 Q 100 400 300 490 Q 420 540 210 680 Q -10 820 210 960 Q 430 1100 90 1240 Q -30 1350 280 1460 Q 310 1500 200 1540"
                stroke="#76181C"
                strokeWidth="3.5"
                strokeDasharray="6 14"
                strokeLinecap="round"
                opacity="0.25"
              />
              <motion.path
                d="M 215 50 Q 80 130 90 265 Q 100 400 300 490 Q 420 540 210 680 Q -10 820 210 960 Q 430 1100 90 1240 Q -30 1350 280 1460 Q 310 1500 200 1540"
                stroke="#76181C"
                strokeWidth="4"
                strokeDasharray="6 14"
                strokeLinecap="round"
                style={{ pathLength }}
                animate={{ strokeDashoffset: [40, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            {INVITATION_DATA.events.map((evt, idx) => (
              <TimelineEventItem key={evt.id} evt={evt} idx={idx} />
            ))}
          </div>
        </section>

        <section 
          className="relative py-14 shadow-inner overflow-hidden"
          style={{ 
            backgroundColor: '#fbebb3',
            backgroundImage: "url('/assets/rsvp.jpg')",
          }}
        >
          <div className="max-w-xs mx-auto text-center space-y-4 relative z-10 pt-2">
            <h2 className={`${greatVibes.className} text-4xl text-[#76181C]`}>Bless Us With Your Presence</h2>
            <p className={`${cormorant.className} text-sm text-gray-700 italic`}>Please grace us with your response so we may reserve your place at our celebration.</p>

            {submitted ? (
              <div className={`${cormorant.className} p-4 bg-green-50 text-green-800 rounded-xl text-sm border border-green-200 shadow-sm`}>
                <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-1" />
                Your gracious response has been received. We eagerly look forward to celebrating together!
              </div>
            ) : (
              <form 
                ref={formRef}
                action="https://docs.google.com/forms/d/e/1FAIpQLSeSVtc6uAxQaw2MOVCeOrZlA-IxqZWl-5dffp17LSw_AIs1YA/formResponse" 
                onSubmit={handleRsvpSubmit} 
                className="space-y-3 text-left"
              >
                <div>
                  <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1`}>
                    Your Esteemed Name
                  </label>
                  <input 
                    type="text" 
                    name="entry.1405437147"
                    required 
                    placeholder="Enter your full name" 
                    className={`${cormorant.className} w-full p-2.5 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#76181C] shadow-inner`}
                  />
                </div>

                <div>
                  <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1`}>
                    Will You Grace Us With Your Presence?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className={`${cormorant.className} flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border border-amber-300 text-sm cursor-pointer shadow-sm hover:border-[#76181C] transition`}>
                      <input 
                        type="radio" 
                        name="entry.837843677" 
                        value="With joy, I/We will be there"
                        checked={attendingStatus === 'yes'}
                        onChange={() => setAttendingStatus('yes')}
                        required
                        className="accent-[#76181C]" 
                      />
                      With joy, I/We will be there
                    </label>
                    <label className={`${cormorant.className} flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg border border-amber-300 text-sm cursor-pointer shadow-sm hover:border-[#76181C] transition`}>
                      <input 
                        type="radio" 
                        name="entry.837843677" 
                        value="With regret, I/We cannot"
                        checked={attendingStatus === 'no'}
                        onChange={() => setAttendingStatus('no')}
                        required
                        className="accent-[#76181C]" 
                      />
                      With regret, I/We cannot
                    </label>
                  </div>
                </div>

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
                        <input 
                          type="text" 
                          name="entry.1282873364"
                          defaultValue="1"
                          placeholder="e.g., 2"
                          className={`${cormorant.className} w-full p-2.5 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#76181C] shadow-inner`}
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold`}>
                            Select Ceremonies You Will Honor Us Attending:
                          </label>
                        </div>
                        <div className={`space-y-1.5 bg-white/60 p-2.5 rounded-lg border ${checkboxError ? 'border-red-500 bg-red-50/40' : 'border-amber-300/70'} shadow-inner`}>
                          {CEREMONY_OPTIONS.map((ceremony, idx) => (
                            <label key={idx} className={`${cormorant.className} flex items-center gap-2.5 text-sm cursor-pointer text-gray-800 hover:text-[#76181C]`}>
                              <input 
                                type="checkbox" 
                                name="entry.1233983433" 
                                value={ceremony} 
                                checked={!!selectedCeremonies[ceremony]}
                                onChange={() => handleCheckboxChange(ceremony)}
                                className="accent-[#76181C] w-4 h-4 rounded" 
                              />
                              <span>{ceremony}</span>
                            </label>
                          ))}
                        </div>
                        {checkboxError && (
                          <p className="flex items-center gap-1 text-red-700 text-xs mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" /> Please select at least one ceremony you will attend.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className={`${marcellus.className} block text-[0.68rem] tracking-[0.1em] uppercase text-[#76181C] font-semibold mb-1`}>
                    Blessings & Wishes for the Couple
                  </label>
                  <textarea 
                    name="entry.1884014554"
                    rows="2"
                    placeholder="Leave a heartfelt note or message for the couple..." 
                    className={`${cormorant.className} w-full p-2.5 bg-white rounded-lg border border-amber-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#76181C] shadow-inner resize-none`}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`${marcellus.className} w-full py-3 bg-[#671418] hover:bg-[#76181C] text-amber-100 text-[0.75rem] tracking-[0.15em] uppercase font-semibold rounded-lg shadow-lg border border-amber-300/60 transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 mt-2`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-pulse" /> Submitting...
                    </>
                  ) : (
                    "SEND YOUR BLESSINGS & RSVP"
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        <footer 
          className="relative py-20 px-6 text-center overflow-hidden flex flex-col items-center justify-between min-h-[580px]"
        >
          <video
            ref={exitVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x-webkit-airplay="allow"
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            src="/assets/exit-card.mp4"
          />
          <div className="w-full max-w-xs mx-auto space-y-3 relative z-10 pt-16">
            <div className="space-y-1">
              <p className={`${cormorant.className} text-base text-[#76181C] italic font-semibold`}>We await your gracious presence</p>
              <p className={`${greatVibes.className} text-4xl text-[#76181C]`}>and your blessings</p>
              <p className={`${cormorant.className} text-2xl text-[#76181C] font-bold pt-1`}>శుభమస్తు</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
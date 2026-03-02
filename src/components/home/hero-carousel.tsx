"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import bannersData from "@/data/banners.json";

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % bannersData.length), []);
  const prev = () => setCurrent((c) => (c - 1 + bannersData.length) % bannersData.length);
  useEffect(() => { const t = setInterval(next, 5000); return () => clearInterval(t); }, [next]);
  const banner = bannersData[current];
  return (
    <div className="relative w-full h-[220px] sm:h-[320px] md:h-[400px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div key={banner.id} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center" style={{ background: "linear-gradient(135deg, " + banner.gradientFrom + ", " + banner.gradientTo + ")" }}>
          <div className="relative z-10 px-8 md:px-16 max-w-2xl">
            <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3">{banner.title}</motion.h2>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm sm:text-lg text-white/90 mb-6">{banner.subtitle}</motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-lg"><Link href={banner.ctaLink}>{banner.ctaText}</Link></Button>
            </motion.div>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20" style={{ backgroundImage: "url(" + banner.image + ")", backgroundSize: "cover", backgroundPosition: "center" }} />
        </motion.div>
      </AnimatePresence>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition"><ChevronLeft className="h-5 w-5" /></button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-2 text-white transition"><ChevronRight className="h-5 w-5" /></button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {bannersData.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={"w-2.5 h-2.5 rounded-full transition-all " + (i === current ? "bg-white w-8" : "bg-white/50")} />))}
      </div>
    </div>
  );
}

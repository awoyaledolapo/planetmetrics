"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-18">
      {/* Background — via next/image so it ships AVIF/WebP, responsive sizes, and is preloaded */}
      <div className="absolute inset-0">
        <Image
          src="/image/c-dustin-K-Iog-Bqf8E-unsplash.jpg"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={70}
          className="object-cover opacity-55"
        />
      </div>

      {/* Bottom fade so the hero blends into the next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
          {/* Headline — line-by-line clip reveal */}
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.02]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Metrics that matter,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block bg-gradient-to-b from-white/80 to-white/30 bg-clip-text text-transparent"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              >
                insights that drive decisions.
              </motion.span>
            </span>
          </h1>

          {/* Subhead — fade up */}
          <motion.p
            className="mt-7 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.55 }}
          >
            A cinematic analytics layer for subscription-based platforms.
            Monitor usage, surface trends, and understand every signal with
            uncommon clarity.
          </motion.p>

          {/* Neo-brutalist meta strip — appears, then a white bar sweeps across */}
          <motion.div
            className="relative mt-14 inline-flex items-stretch overflow-hidden border-2 border-white bg-black font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white shadow-[4px_4px_0_0_rgba(255,255,255,0.9)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.85 }}
          >
            <span className="flex items-center gap-2 bg-white px-3 py-2 text-black">
              <span className="h-1.5 w-1.5 bg-black" />
              SYS / 001
            </span>
            <span className="flex items-center px-4 py-2">Built for modern operators</span>
            <span className="flex items-center border-l-2 border-white px-3 py-2 text-emerald-400">
              ONLINE
            </span>

            {/* Wipe bar — slides left → right one time on mount */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-full bg-white mix-blend-difference"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.95 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

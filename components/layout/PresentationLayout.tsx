import React, { useEffect, useState } from 'react';
import { useMotionValue, useTransform, MotionValue } from 'framer-motion';
import { HeroSection } from '../sections/HeroSection';
import { ProblemSection } from '../sections/ProblemSection';
import { VisionSection } from '../sections/VisionSection';
import { AboutSection } from '../sections/AboutSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { ArchitectureSection } from '../sections/ArchitectureSection';
import { WhyItMattersSection } from '../sections/WhyItMattersSection';
import { ResultsSection } from '../sections/ResultsSection';
import { RoadmapSection } from '../sections/RoadmapSection';
import { ReferencesSection } from '../sections/ReferencesSection';
import { CollaborationSection } from '../sections/CollaborationSection';
import { ThankYouSection } from '../sections/ThankYouSection';

export function PresentationLayout({ scrollYProgress, loaded }: { scrollYProgress: MotionValue<number>, loaded: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const heroOp = useTransform(scrollYProgress, [0, .06], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, .08], [0, -80]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - .5) * 20);
      my.set((e.clientY / window.innerHeight - .5) * 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mx, my]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sections = Array.from(document.querySelectorAll('section'));
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [loaded]);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sectionsList = [
    "Hero", "Problem", "Vision", "About", "Feature: Matrix", "Feature: Vector", "Feature: Router", "Architecture", 
    "Why It Matters", "Results", "Roadmap", "References", "Collaboration", "Thank You"
  ];

  return (
    <div className="w-full relative z-10 pointer-events-auto">
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
          {sectionsList.map((name, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              title={name}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? 'bg-zinc-200 scale-125 shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
                  : 'bg-zinc-600 hover:bg-zinc-400'
              }`}
            />
          ))}
        </div>
        <div className="fixed bottom-6 right-6 z-50 text-zinc-400 font-mono text-sm pointer-events-none bg-zinc-900/50 px-3 py-1 rounded-full backdrop-blur-sm border border-zinc-800">
          {activeIndex + 1} / {sectionsList.length}
        </div>
        <HeroSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <ProblemSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <VisionSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <AboutSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <FeaturesSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <ArchitectureSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <WhyItMattersSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <ResultsSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <RoadmapSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <ReferencesSection />
        <CollaborationSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
        <ThankYouSection loaded={loaded} mx={mx} my={my} heroOp={heroOp} heroY={heroY} />
    </div>
  );
}

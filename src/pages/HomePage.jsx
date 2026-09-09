import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LiveStats from '../components/LiveStats';
import Features from '../components/Features';
import Team from '../components/Team';
import Footer from '../components/Footer';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');

  // Handle URL hash scrolling on mount (e.g., /#features or /#team)
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const targetTop = el.getBoundingClientRect().top + window.pageYOffset - 60;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
          window.history.replaceState(null, '', window.location.pathname);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Track active section via IntersectionObserver (Kreo setup)
  useEffect(() => {
    const sections = ['home', 'features', 'team'];
    const observers = [];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <div className="home-page" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Gradient Mesh */}
      <div className="bg-gradient-mesh" />

      {/* Floating Navbar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content: Hero, LiveStats, Features, Team */}
      <main className="main-content" style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <LiveStats />
        <Features />
        <Team />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import ContactSection from './components/ContactSection';
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import Sidebar from './components/Sidebar';
import SkillsSection from './components/SkillsSection';
import { navItems } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.toLowerCase());

    const updateActiveSection = () => {
      const current = sectionIds.find((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.42 && rect.bottom >= window.innerHeight * 0.28;
      });

      if (current) setActiveSection(current);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  return (
    <div className="portfolio-shell">
      <Sidebar activeSection={activeSection} />
      <main className="main-content">
        <button className="mobile-menu" type="button" aria-label="Open menu">
          <Menu size={20} />
        </button>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

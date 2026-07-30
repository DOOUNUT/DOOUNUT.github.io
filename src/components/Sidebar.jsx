import { ArrowUpRight, GitBranch, Mail, Moon, Terminal } from 'lucide-react';
import { navItems } from '../data/portfolioData';

export default function Sidebar({ activeSection }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Terminal size={24} />
        <span>Park.dev</span>
      </div>

      <section className="profile-card">
        <p className="eyebrow">Full Stack Developer</p>
        <h1>박기석</h1>
        <p>사용자 경험과 유지보수성을 고민하는 개발자</p>
      </section>

      <nav className="side-nav" aria-label="Portfolio sections">
        {navItems.map((item) => {
          const sectionId = item.toLowerCase();
          return (
            <a className={activeSection === sectionId ? 'active' : ''} href={`#${sectionId}`} key={item}>
              {item}
            </a>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button type="button" aria-label="Toggle theme">
          <Moon size={16} />
          Dark Mode
        </button>
        <div className="mini-links">
          <GitBranch size={18} />
          <Mail size={18} />
          <ArrowUpRight size={18} />
        </div>
      </div>
    </aside>
  );
}

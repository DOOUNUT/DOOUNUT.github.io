import { skills } from '../data/portfolioData';
import Section from './Section';

export default function SkillsSection() {
  return (
    <Section id="skills" eyebrow="TECH STACK" title="Skills">
      <div className="skill-grid">
        {skills.map(({ title, icon: Icon, items }) => (
          <article className="skill-card" key={title}>
            <div className="card-title">
              <Icon size={20} />
              <h3>{title}</h3>
            </div>
            <div className="badges">
              {items.map((item) => (
                <span className="skill-badge" key={item.name}>
                  <img src={item.icon} alt="" loading="lazy" />
                  {item.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

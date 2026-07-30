import { GraduationCap } from 'lucide-react';
import { timeline } from '../data/portfolioData';
import Section from './Section';

export default function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="TIMELINE" title="Experience & Education">
      <div className="timeline">
        {timeline.map(([title, description]) => (
          <article className="timeline-item" key={title}>
            <GraduationCap size={20} />
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

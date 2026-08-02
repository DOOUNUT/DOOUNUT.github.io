import { useState } from 'react';
import { X } from 'lucide-react';
import Section from './Section';
import { projects } from '../data/portfolioData';

const text = {
  eyebrow: 'Projects',
  title: '\uc9c1\uc811 \uad6c\ud604\ud558\uace0 \ubb38\uc81c\ub97c \ud574\uacb0\ud55c \ud504\ub85c\uc81d\ud2b8',
  description:
    '\uce74\ub4dc\ub97c \uc120\ud0dd\ud558\uba74 \ud504\ub85c\uc81d\ud2b8\ubcc4 \uba54\uc778 \ud654\uba74\uacfc \ub2f4\ub2f9 \uad6c\ud604 \ub0b4\uc6a9\uc744 \ud655\uc778\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4.',
  mainAlt: '\uba54\uc778 \ud654\uba74',
  detailAlt: '\uc0c1\uc138 \ud654\uba74',
  closeDetail: '\ud504\ub85c\uc81d\ud2b8 \uc0c1\uc138 \ub2eb\uae30',
  myPart: '\ub0b4\uac00 \ub9e1\uc740 \ubd80\ubd84',
  keyCode: 'Key Code',
  closeCode: '\uc8fc\uc694 \ucf54\ub4dc \ub2eb\uae30',
  viewCode: '\uc8fc\uc694 \ucf54\ub4dc \ubcf4\uae30',
};

const getTechs = (project) => project.techs ?? project.tech ?? [];
const getDescription = (project) => project.detail ?? project.description ?? project.summary ?? '';
const getPartDescription = (part) => part.description ?? part.body ?? '';
const getPartLabel = (project) => project.partLabel ?? text.myPart;

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSnippet, setActiveSnippet] = useState(null);
  const [activePartIndex, setActivePartIndex] = useState(null);

  const activePart =
    selectedProject && activePartIndex !== null ? selectedProject.myPart?.[activePartIndex] : null;

  const selectedSnippet =
    selectedProject && activeSnippet !== null ? selectedProject.codeSnippets?.[activeSnippet] : null;

  const detailImage = activePart?.image || selectedProject?.image;

  const selectPart = (index) => {
    setActivePartIndex(index);
    setActiveSnippet(null);
  };

  return (
    <Section
      id="projects"
      eyebrow={text.eyebrow}
      title={text.title}
      description={text.description}
    >
      <div className="projects-layout">
        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={`project-card ${project.imageType === 'mobile' ? 'mobile-screenshot' : ''} ${selectedProject?.name === project.name ? 'selected' : ''}`}
              key={project.name}
              onClick={() => {
                setSelectedProject(project);
                setActiveSnippet(null);
                setActivePartIndex(null);
              }}
            >
              <div className="project-image">
                <img src={project.image} alt={`${project.name} ${text.mainAlt}`} />
              </div>
              <div className="project-body">
                <div className="project-card-meta">
                  <span>{project.period}</span>
                  <span>{project.team}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className="project-techs">
                  {getTechs(project).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {selectedProject && (
          <aside
            className={`project-detail ${
              selectedProject.imageType === 'mobile' ? 'mobile-screenshot' : ''
            }`}
          >
            <div className="detail-image">
              <img src={detailImage} alt={`${selectedProject.name} ${text.detailAlt}`} />
            </div>
            <div className="detail-content">
              <div className="detail-header">
                <span className="detail-tag">{selectedProject.role}</span>
                <button
                  className="icon-close detail-close"
                  type="button"
                  aria-label={text.closeDetail}
                  onClick={() => {
                    setSelectedProject(null);
                    setActiveSnippet(null);
                    setActivePartIndex(null);
                  }}
                >
                  <X size={18} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </div>
              <h3>{selectedProject.name}</h3>
              <p>{getDescription(selectedProject)}</p>

              <div className="detail-list">
                <strong>{getPartLabel(selectedProject)}</strong>

                {selectedSnippet ? (
                  <div className="code-modal-panel inline">
                    <div className="code-modal-title">
                      <div>
                        <span className="detail-tag">{text.keyCode}</span>
                        <h4>{selectedSnippet.title}</h4>
                      </div>
                      <button
                        type="button"
                        className="icon-close"
                        aria-label={text.closeCode}
                        onClick={() => {
                          setActiveSnippet(null);
                          setActivePartIndex(null);
                        }}
                      >
                        <X size={18} strokeWidth={2.4} aria-hidden="true" />
                      </button>
                    </div>
                    {selectedSnippet.description && <p>{selectedSnippet.description}</p>}
                    <div className="code-preview key-code-preview">
                      <div className="window-bar">
                        <span />
                        <span />
                        <span />
                        <p>{selectedSnippet.path ?? selectedSnippet.title}</p>
                      </div>
                      <pre>
                        <code>{selectedSnippet.code}</code>
                      </pre>
                    </div>
                  </div>
                ) : (
                  <ul className="part-list">
                    {(selectedProject.myPart ?? []).map((item, index) => {
                      const snippet = selectedProject.codeSnippets?.[item.codeSnippet];
                      const isActive = activePartIndex === index;

                      return (
                        <li
                          className={isActive ? 'active' : ''}
                          key={item.title}
                          role="button"
                          tabIndex={0}
                          onClick={() => selectPart(index)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              selectPart(index);
                            }
                          }}
                        >
                          <div className="part-copy">
                            <b>{item.title}</b>
                            <span>{getPartDescription(item)}</span>
                          </div>
                          {snippet && (
                            <button
                              type="button"
                              className="part-code-button"
                              onClick={(event) => {
                                event.stopPropagation();
                                setActivePartIndex(index);
                                setActiveSnippet(item.codeSnippet);
                              }}
                            >
                              {text.viewCode}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {selectedProject.github && (
                <div className="detail-actions">
                  <a href={selectedProject.github} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </Section>
  );
}


import { useState } from 'react';
import { Code2, X } from 'lucide-react';
import { projects } from '../data/portfolioData';
import Section from './Section';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSnippet, setActiveSnippet] = useState(null);
  const selectedSnippet =
    selectedProject && activeSnippet !== null ? selectedProject.codeSnippets[activeSnippet] : null;

  return (
    <Section id="projects" eyebrow="SELECTED WORK" title="Projects">
      <div className="project-grid">
        {projects.map((project) => (
          <button
            className={selectedProject?.name === project.name ? 'project-card selected' : 'project-card'}
            key={project.name}
            type="button"
            onClick={() => {
              setSelectedProject(project);
              setActiveSnippet(null);
            }}
          >
            <div className="project-image">
              <img src={project.image} alt={`${project.name} 화면`} />
            </div>
            <div className="project-body">
              <p className="eyebrow">{project.period}</p>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className="badges">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedProject && (
        <article className="project-detail reveal is-visible">
          <div className="detail-image">
            <img src={selectedProject.image} alt={`${selectedProject.name} 상세 화면`} />
          </div>
          <div className="detail-content">
            <p className="eyebrow">PROJECT DETAIL</p>
            <h3>{selectedProject.name}</h3>
            <p>{selectedProject.description}</p>
            <div className="detail-meta">
              <span>기간: {selectedProject.period}</span>
              <span>인원: {selectedProject.team}</span>
              <span>역할: {selectedProject.role}</span>
            </div>
            {selectedSnippet ? (
              <div className="code-modal-panel">
                <div className="code-modal-title">
                  <div>
                    <p className="eyebrow">SOURCE VIEW</p>
                    <h4>{selectedSnippet.title}</h4>
                  </div>
                  <button type="button" aria-label="코드 닫기" onClick={() => setActiveSnippet(null)}>
                    <X size={18} />
                  </button>
                </div>
                <article className="code-snippet code-preview">
                  <div className="window-bar">
                    <span />
                    <span />
                    <span />
                    <p>{selectedSnippet.path}</p>
                  </div>
                  <pre><code>{selectedSnippet.code}</code></pre>
                </article>
              </div>
            ) : (
              <>
                <h4>{selectedProject.detailTitle}</h4>
                <ul className="part-list">
                  {selectedProject.myPart.map((item) => {
                    const snippet = selectedProject.codeSnippets[item.codeSnippet];

                    return (
                      <li key={item.title}>
                        <div className="part-copy">
                          <strong>{item.title}</strong>
                          <span>{item.body}</span>
                        </div>
                        {snippet && (
                          <button
                            className="part-code-button"
                            type="button"
                            onClick={() => setActiveSnippet(item.codeSnippet)}
                          >
                            <Code2 size={15} />
                            주요 코드 보기
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </article>
      )}
    </Section>
  );
}

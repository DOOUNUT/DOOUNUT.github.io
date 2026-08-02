export default function HeroSection() {
  return (
    <section className="hero reveal" id="about">
      <div className="hero-copy">
        <p className="eyebrow">Full Stack Developer</p>
        <h2>박기석</h2>
        <h3>문제의 원인을 분석하고 더 나은 사용자 경험을 만드는 개발자입니다.</h3>
        <p>
          React, Spring Boot, Flutter 기반 프로젝트 경험을 바탕으로 웹과 모바일 서비스를 구현합니다.
          읽기 쉬운 코드, 안정적인 API 흐름, 사용자가 덜 헤매는 인터페이스를 중요하게 생각합니다.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#projects">프로젝트 보기</a>
          <a className="button ghost" href="https://github.com/DOOUNUT?tab=repositories" target="_blank" rel="noreferrer">GitHub 보기</a>
          <a className="button ghost" href="#contact">연락하기</a>
        </div>
      </div>

      <div className="code-preview" aria-label="Developer profile code preview">
        <div className="window-bar">
          <span />
          <span />
          <span />
          <p>portfolio.jsx</p>
        </div>
        <pre>{`const developer = {
  name: "Park Giseok",
  role: "Full Stack Developer",
  stack: ["React", "Spring", "Flutter"],
  focus: "UX + Debugging"
};`}</pre>
      </div>
    </section>
  );
}

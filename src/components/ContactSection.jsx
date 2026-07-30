import { GitBranch, Mail, MapPin } from 'lucide-react';
import Section from './Section';

export default function ContactSection() {
  return (
    <Section id="contact" eyebrow="GET IN TOUCH" title="Contact">
      <div className="contact-layout">
        <div className="contact-info">
          <p>함께 성장할 팀을 찾고 있습니다. 프로젝트, 채용, 협업 관련 문의를 남겨주세요.</p>
          <span><Mail size={16} /> park.dev@example.com</span>
          <span><GitBranch size={16} /> github.com/park-giseok</span>
          <span><MapPin size={16} /> Seoul, Korea</span>
        </div>
        <form className="contact-form">
          <label>이름<input placeholder="이름 입력" /></label>
          <label>이메일<input placeholder="이메일 입력" /></label>
          <label>메시지<textarea placeholder="메시지 입력" /></label>
          <button className="button primary" type="button">보내기</button>
        </form>
      </div>
    </Section>
  );
}

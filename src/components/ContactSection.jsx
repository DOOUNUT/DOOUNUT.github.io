
import { GitBranch, Mail, MapPin } from 'lucide-react';
import Section from './Section';

export default function ContactSection() {
  return (
    <Section id="contact" eyebrow="GET IN TOUCH" title="Contact">
      <div className="contact-layout">
        <div className="contact-info">
          <p>함께 성장할 팀을 찾고 있습니다. 프로젝트, 채용, 협업 관련 문의를 남겨주세요.</p>
          <span><Mail size={16} /> kisuk446@naver.com</span>
          <span><GitBranch size={16} /> github.com/DOOUNUT</span>
          <span><MapPin size={16} /> Suwon, Korea</span>
        </div>
        <form className="contact-form is-disabled" aria-label="메시지 전송 준비중">
          <div className="form-disabled-badge">준비중</div>
          <label>이름<input placeholder="이름 입력" disabled /></label>
          <label>이메일<input placeholder="이메일 입력" disabled /></label>
          <label>메시지<textarea placeholder="메시지 입력" disabled /></label>
          <button className="button primary" type="button" disabled>보내기</button>
        </form>
      </div>
    </Section>
  );
}

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section className="section reveal" id={id}>
      <div className="section-heading">
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

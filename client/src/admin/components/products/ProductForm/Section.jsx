function Section({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </div>
      {children}
    </section>
  );
}
export default Section;

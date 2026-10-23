import PageHeader from '../components/PageHeader';

export default function Legal({ title }) {
  return (
    <>
      <PageHeader title={title} emoji="📄" />
      <section className="section">
        <div className="container-x max-w-3xl space-y-5 leading-relaxed text-brand-choc/80">
          <p className="rounded-2xl bg-brand-yellow/40 p-4 text-sm font-semibold">Placeholder — replace this page with your legal text, reviewed by your legal advisor.</p>
          <h2 className="text-2xl font-bold">1. Overview</h2><p>Add your {title.toLowerCase()} content here.</p>
          <h2 className="text-2xl font-bold">2. Data we collect</h2><p>Describe franchise inquiry, event booking and analytics data handling.</p>
          <h2 className="text-2xl font-bold">3. Contact</h2><p>Add the contact for legal and privacy questions.</p>
        </div>
      </section>
    </>
  );
}

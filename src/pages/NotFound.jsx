import PageHeader from '../components/PageHeader';
import Button from '../components/Button';

export default function NotFound() {
  return (
    <>
      <PageHeader title={'OOPS!\nPAGE NOT FOUND'} sub="This fry went missing." emoji="🍟" />
      <section className="section"><div className="container-x text-center"><Button to="/" size="lg">Back to home</Button></div></section>
    </>
  );
}

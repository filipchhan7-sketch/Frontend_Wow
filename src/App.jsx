import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Story from './pages/Story';
import WhyWowPage from './pages/WhyWowPage';
import Menu from './pages/Menu';
import Stores from './pages/Stores';
import Franchise from './pages/Franchise';
import Apply from './pages/Apply';
import International from './pages/International';
import Events from './pages/Events';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

const Page = ({ children }) => (
  <motion.main initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
    {children}
  </motion.main>
);

export default function App() {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0 }); }, [location.pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/story" element={<Page><Story /></Page>} />
          <Route path="/why-wow" element={<Page><WhyWowPage /></Page>} />
          <Route path="/menu" element={<Page><Menu /></Page>} />
          <Route path="/stores" element={<Page><Stores /></Page>} />
          <Route path="/franchise" element={<Page><Franchise /></Page>} />
          <Route path="/franchise/apply" element={<Page><Apply /></Page>} />
          <Route path="/international" element={<Page><International /></Page>} />
          <Route path="/events" element={<Page><Events /></Page>} />
          <Route path="/news" element={<Page><News /></Page>} />
          <Route path="/news/:slug" element={<Page><NewsDetail /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/privacy" element={<Page><Legal title="Privacy Policy" /></Page>} />
          <Route path="/terms" element={<Page><Legal title="Terms & Conditions" /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}

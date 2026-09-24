import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FutureSystemsShowcase } from './components/FutureSystemsShowcase';
import { Manifesto } from './components/Manifesto';
import { Services } from './components/Services';
import { FAQ } from './components/FAQ';
import { Authority } from './components/Authority';
import { ClosingFunnel } from './components/ClosingFunnel';
import { Footer } from './components/Footer';

export function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const scrollToDiagnostic = () => {
    const el = document.getElementById('diagnostico');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToShowcase = () => {
    const el = document.getElementById('prototipos-futuros');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToDiagnostic();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onDiagnosticClick={scrollToDiagnostic} />
      <main style={{ flex: 1 }}>
        <Hero
          onDiagnosticClick={scrollToDiagnostic}
          onExploreShowcase={scrollToShowcase}
        />
        <FutureSystemsShowcase />
        <Manifesto />
        <Services onSelectService={handleSelectService} />
        <FAQ />
        <Authority />
        <ClosingFunnel preselectedService={selectedService} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

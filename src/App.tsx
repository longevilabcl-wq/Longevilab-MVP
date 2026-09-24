import { useState, useEffect, useCallback } from 'react';
import { ViewType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { QuestionnaireStepper } from './components/QuestionnaireStepper';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isStepperActive, setIsStepperActive] = useState<boolean>(false);
  const [stepperStep, setStepperStep] = useState<number>(1);

  // Sync view from window hash on initial mount and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'mi-longevidad') {
        setCurrentView('mi-longevidad');
      } else if (hash === 'sobre-longevilab') {
        setCurrentView('sobre-longevilab');
        setIsStepperActive(false);
      } else if (hash === 'privacidad') {
        setCurrentView('privacidad');
        setIsStepperActive(false);
      } else if (hash === 'contacto') {
        setCurrentView('contacto');
        setIsStepperActive(false);
      } else {
        setCurrentView('home');
        setIsStepperActive(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = useCallback((view: ViewType) => {
    setCurrentView(view);
    if (view === 'home') {
      window.location.hash = '';
      setIsStepperActive(false);
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleUpdateHeaderState = useCallback((step: number, isActive: boolean) => {
    setStepperStep(step);
    setIsStepperActive(isActive);
  }, []);

  const handleExitStepper = useCallback(() => {
    navigateTo('home');
  }, [navigateTo]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#2F312D]">
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-[#2F312D] focus:shadow-md"
      >
        Saltar al contenido principal
      </a>

      {/* Main Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        isStepperActive={currentView === 'mi-longevidad' && isStepperActive}
        currentStep={stepperStep}
        totalSteps={8}
        onExitStepper={handleExitStepper}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {currentView === 'home' && <HomePage onNavigate={navigateTo} />}

        {currentView === 'mi-longevidad' && (
          <QuestionnaireStepper
            onExit={handleExitStepper}
            onUpdateHeaderState={handleUpdateHeaderState}
          />
        )}

        {currentView === 'sobre-longevilab' && <AboutPage onNavigate={navigateTo} />}

        {currentView === 'privacidad' && (
          <PlaceholderPage type="privacidad" onNavigate={navigateTo} />
        )}

        {currentView === 'contacto' && (
          <PlaceholderPage type="contacto" onNavigate={navigateTo} />
        )}
      </main>

      {/* Quiet Accessible Footer (hidden during questionnaire step 1-8 to eliminate distraction) */}
      {(!isStepperActive || currentView !== 'mi-longevidad') && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
}

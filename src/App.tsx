import React, { useState, useEffect } from 'react';
import { AppTab, UserProgress, TrainingRecord } from './types';
import { ALL_LESSONS } from './data/studyPlan';
import { WelcomeView } from './views/WelcomeView';
import { DemoView } from './views/DemoView';
import { LoginView } from './views/LoginView';
import { Navigation } from './components/Navigation';
import { DashboardView } from './views/DashboardView';
import { ChordsView } from './views/ChordsView';
import { TrainerView } from './views/TrainerView';
import { StudyPlanView } from './views/StudyPlanView';
import { MetronomeView } from './views/MetronomeView';
import { KitView } from './views/KitView';
import { EvolutionView } from './views/EvolutionView';

const LOCAL_STORAGE_KEY = 'cavaquinho_facil_progress_v1';
const SESSION_STORAGE_KEY = 'cavaquinho_facil_session_v1';

export default function App() {
  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [currentTab, setCurrentTab] = useState<AppTab>('dashboard');
  const [selectedChordForTrainer, setSelectedChordForTrainer] = useState<string>('G');
  const [selectedLessonForPlan, setSelectedLessonForPlan] = useState<string | undefined>(undefined);

  // User state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem(SESSION_STORAGE_KEY);
  });
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  // Progress state
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load progress from localStorage:', e);
    }
    // Default initial seed: 1st lesson completed as gentle welcome
    return {
      completedLessons: ['d1_l1'],
      streakDays: 1,
      history: [
        {
          id: 'seed-1',
          date: new Date(Date.now() - 86400000).toISOString(),
          chordA: 'G',
          chordB: 'C',
          durationSeconds: 60,
          switchesReported: 22,
          switchesPerMinute: 22.0,
        },
      ],
    };
  });

  // Sync route from URL on mount and handle popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      mapPathToTab(path);
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const mapPathToTab = (path: string) => {
    if (path.startsWith('/app/acordes')) setCurrentTab('acordes');
    else if (path.startsWith('/app/treinador')) setCurrentTab('treinador');
    else if (path.startsWith('/app/plano')) setCurrentTab('plano');
    else if (path.startsWith('/app/kit')) setCurrentTab('kit');
    else if (path.startsWith('/app/metronomo')) setCurrentTab('metronomo');
    else if (path.startsWith('/app/evolucao')) setCurrentTab('evolucao');
    else if (path.startsWith('/app')) setCurrentTab('dashboard');
  };

  // Helper to change URL and state
  const navigateTo = (path: string, tab?: AppTab) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    if (tab) {
      setCurrentTab(tab);
    } else {
      mapPathToTab(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userProgress));
    } catch (e) {
      console.warn('Could not save progress to localStorage:', e);
    }
  }, [userProgress]);

  // Handlers for user interactions
  const handleToggleLesson = (lessonId: string) => {
    setUserProgress((prev) => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const updated = alreadyCompleted
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return {
        ...prev,
        completedLessons: updated,
      };
    });
  };

  const handleSaveTrainingRecord = (recordData: Omit<TrainingRecord, 'id' | 'date'>) => {
    const newRecord: TrainingRecord = {
      ...recordData,
      id: `train-${Date.now()}`,
      date: new Date().toISOString(),
    };

    setUserProgress((prev) => ({
      ...prev,
      history: [newRecord, ...prev.history],
    }));
  };

  const handleClearHistory = () => {
    if (window.confirm('Deseja realmente limpar o histórico de treinos registrados?')) {
      setUserProgress((prev) => ({
        ...prev,
        history: [],
      }));
    }
  };

  const handleLoginSuccess = (email: string, code: string) => {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({ email, code, timestamp: Date.now() }));
    setIsLoggedIn(true);
    setIsDemoMode(true);
    navigateTo('/app', 'dashboard');
  };

  const handleSelectTabFromNav = (tab: AppTab) => {
    setCurrentTab(tab);
    const subPath =
      tab === 'dashboard'
        ? '/app'
        : tab === 'acordes'
        ? '/app/acordes'
        : tab === 'treinador'
        ? '/app/treinador'
        : tab === 'plano'
        ? '/app/plano'
        : tab === 'kit'
        ? '/app/kit'
        : tab === 'metronomo'
        ? '/app/metronomo'
        : '/app/evolucao';
    navigateTo(subPath, tab);
  };

  const handleStartTrainingWithChord = (chordId: string) => {
    setSelectedChordForTrainer(chordId);
    navigateTo('/app/treinador', 'treinador');
  };

  const handleSelectLessonFromDashboard = (lessonId: string) => {
    setSelectedLessonForPlan(lessonId);
    navigateTo('/app/plano', 'plano');
  };

  // Progress percentage
  const totalLessonsCount = ALL_LESSONS.length;
  const progressPercent = Math.round(
    (userProgress.completedLessons.length / totalLessonsCount) * 100
  );

  // ROUTE 1: WELCOME / LANDING (/)
  if (currentPath === '/') {
    return (
      <WelcomeView
        onGoToApp={() => navigateTo('/app', 'dashboard')}
        onGoToDemo={() => navigateTo('/demo')}
        onGoToLogin={() => navigateTo('/acessar')}
      />
    );
  }

  // ROUTE 2: DEMO (/demo)
  if (currentPath === '/demo') {
    return (
      <DemoView
        onGoToFullApp={() => navigateTo('/app', 'dashboard')}
        onGoToLogin={() => navigateTo('/acessar')}
        onGoToHome={() => navigateTo('/')}
      />
    );
  }

  // ROUTE 3: LOGIN / ACESSAR (/acessar)
  if (currentPath === '/acessar') {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onGoToHome={() => navigateTo('/')}
        onGoToDemo={() => navigateTo('/demo')}
      />
    );
  }

  // ROUTE 4: STUDENT AREA (/app and subpaths)
  return (
    <div className="min-h-screen bg-[#08090B] text-slate-100 flex flex-col lg:flex-row selection:bg-[#10D97E]/30 selection:text-[#10D97E]">
      {/* Responsive Navigation: Sidebar on Desktop, Bottom Bar on Mobile */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={handleSelectTabFromNav}
        isDemoMode={isDemoMode}
        onExitToHome={() => navigateTo('/')}
        progressPercent={progressPercent}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-h-screen p-4 sm:p-6 lg:p-8 overflow-y-auto pb-24 lg:pb-12">
        {currentTab === 'dashboard' && (
          <DashboardView
            userProgress={userProgress}
            onNavigateTab={handleSelectTabFromNav}
            onSelectLesson={handleSelectLessonFromDashboard}
          />
        )}

        {currentTab === 'acordes' && (
          <ChordsView
            onStartTrainingWithChord={handleStartTrainingWithChord}
            initialChordId={selectedChordForTrainer}
          />
        )}

        {currentTab === 'treinador' && (
          <TrainerView
            initialChordA={selectedChordForTrainer}
            initialChordB={selectedChordForTrainer === 'G' ? 'C' : 'G'}
            onSaveRecord={handleSaveTrainingRecord}
            recentRecords={userProgress.history}
          />
        )}

        {currentTab === 'plano' && (
          <StudyPlanView
            completedLessonIds={userProgress.completedLessons}
            onToggleLessonCompletion={handleToggleLesson}
            selectedLessonId={selectedLessonForPlan}
          />
        )}

        {currentTab === 'kit' && <KitView />}

        {currentTab === 'metronomo' && <MetronomeView />}

        {currentTab === 'evolucao' && (
          <EvolutionView
            userProgress={userProgress}
            onClearHistory={handleClearHistory}
            onNavigateTab={handleSelectTabFromNav}
          />
        )}
      </main>
    </div>
  );
}

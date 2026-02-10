
import React, { useState, useMemo, useEffect } from 'react';
import { 
  AppPhase, 
  ConversationState, 
  AnswerLog, 
  DiscoveryReport 
} from './types';
import { GeminiService } from './services/geminiService';
import LandingView from './components/LandingView';
import InquiryView from './components/InquiryView';
import ReportView from './components/ReportView';
import LoadingScreen from './components/LoadingScreen';
import KeySelectionView from './components/KeySelectionView';

const STORAGE_KEY = 'socratic_engine_state_v4';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [state, setState] = useState<ConversationState>({
    topic: '',
    currentQuestionIndex: 0,
    totalQuestions: 0,
    userAnswers: [],
    knowledgeLevel: 'Beginner',
    interestKeywords: []
  });
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [validation, setValidation] = useState('');
  const [report, setReport] = useState<DiscoveryReport | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  
  const gemini = useMemo(() => new GeminiService(), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.state && parsed?.phase) {
          setState(parsed.state);
          setPhase(parsed.phase);
          if (parsed.question) setCurrentQuestion(parsed.question);
          if (parsed.validation) setValidation(parsed.validation);
          if (parsed.report) setReport(parsed.report);
        }
      }
    } catch (e) {
      console.error("Error restoring state:", e);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      if (phase !== 'landing') {
        const dataToSave = { state, phase, question: currentQuestion, validation, report };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Failed to save state:", e);
    }
  }, [state, phase, currentQuestion, validation, report]);

  const handleStart = async (topic: string) => {
    if (isThinking) return;
    setIsThinking(true);
    setPhase('inquiry');
    try {
      const data = await gemini.initializeTopic(topic);
      setState(prev => ({
        ...prev,
        topic,
        totalQuestions: data.totalQuestions,
        currentQuestionIndex: 1,
        userAnswers: []
      }));
      setValidation(data.hook);
      setCurrentQuestion(data.firstQuestion);
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleApiError = (error: any) => {
    console.error("Gemini API Error Detail:", error);
    
    const errorBody = error?.error || error;
    const message = (errorBody?.message || error?.message || "").toLowerCase();
    const errorStr = JSON.stringify(error).toLowerCase();
    
    // Aggressive detection for 429, quota, or rate limit issues
    const isQuotaError = 
      errorStr.includes("429") || 
      errorStr.includes("quota") || 
      errorStr.includes("limit") || 
      errorStr.includes("exhausted") ||
      message.includes("quota") ||
      message.includes("limit") ||
      message.includes("exceeded");

    if (isQuotaError) {
      console.warn("Quota exceeded. Redirecting to key selection.");
      setPhase('key_needed');
    } else {
      // For other types of errors, still allow key selection as a potential fix
      setPhase('key_needed');
    }
  };

  const handleAnswer = async (answer: string) => {
    if (isThinking) return;

    const newLog: AnswerLog = { 
      question: currentQuestion, 
      answer: answer || "[User provided empty response]" 
    };
    const updatedAnswers = [...state.userAnswers, newLog];
    
    setIsThinking(true);
    if (state.currentQuestionIndex < state.totalQuestions) {
      try {
        const data = await gemini.getNextQuestion(state.topic, updatedAnswers, state.currentQuestionIndex, state.totalQuestions);
        setValidation(data.validation);
        setCurrentQuestion(data.question);
        setState(prev => ({ 
          ...prev, 
          userAnswers: updatedAnswers,
          currentQuestionIndex: prev.currentQuestionIndex + 1 
        }));
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsThinking(false);
      }
    } else {
      setState(prev => ({ ...prev, userAnswers: updatedAnswers }));
      await startSynthesis(updatedAnswers);
      setIsThinking(false);
    }
  };

  const handleSkip = () => {
    if (isThinking) return;
    handleAnswer("[Question Skipped]");
  };

  const startSynthesis = async (answers: AnswerLog[]) => {
    setPhase('loading_report');
    setIsThinking(true);
    try {
      const finalReport = await gemini.generateFinalReport(state.topic, answers);
      const imageUrl = await gemini.generateImage(state.topic, finalReport.facts[0]?.fact || "");
      setReport({ ...finalReport, imageUrl });
      setPhase('report');
    } catch (error: any) {
      handleApiError(error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPhase('landing');
    setState({
      topic: '',
      currentQuestionIndex: 0,
      totalQuestions: 0,
      userAnswers: [],
      knowledgeLevel: 'Beginner',
      interestKeywords: []
    });
    setReport(null);
    setValidation('');
    setCurrentQuestion('');
  };

  const onKeySelected = () => {
    if (state.userAnswers.length >= state.totalQuestions && state.totalQuestions > 0) {
      startSynthesis(state.userAnswers);
    } else if (state.topic) {
      setPhase('inquiry');
    } else {
      setPhase('landing');
    }
  };

  return (
    <main 
      tabIndex={-1}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f8fafc] text-slate-900 outline-none"
    >
      {phase === 'landing' && (
        <div className="flex flex-col items-center w-full">
          <LandingView onStart={handleStart} />
          <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100 max-w-md text-center">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-2">Notice: Shared Quota is Limited</p>
            <p className="text-[11px] text-amber-600 leading-relaxed mb-4">
              If you see "Quota Exceeded" errors, it's because many users are discovering simultaneously. You can use your own key for priority access.
            </p>
            <button 
              onClick={() => setPhase('key_needed')}
              className="px-6 py-2 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-amber-700 transition-all"
            >
              Use Priority Key
            </button>
          </div>
        </div>
      )}
      {phase === 'inquiry' && (
        <InquiryView 
          state={state} 
          currentQuestion={currentQuestion}
          validation={validation}
          onAnswer={handleAnswer}
          onSkip={handleSkip}
          isThinking={isThinking}
        />
      )}
      {phase === 'loading_report' && <LoadingScreen topic={state.topic} />}
      {phase === 'report' && report && (
        <ReportView 
          topic={state.topic} 
          report={report} 
          onRestart={handleRestart} 
        />
      )}
      {phase === 'key_needed' && (
        <KeySelectionView 
          onKeySelected={onKeySelected}
          onCancel={() => setPhase('landing')}
        />
      )}
    </main>
  );
};

export default App;


export type KnowledgeLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface AnswerLog {
  question: string;
  answer: string;
}

export interface ConversationState {
  topic: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  userAnswers: AnswerLog[];
  knowledgeLevel: KnowledgeLevel;
  interestKeywords: string[];
}

export interface NewsItem {
  headline: string;
  source: string;
  summary: string;
  relevance: string;
  publishedAt: string;
  uri?: string;
}

export interface FactItem {
  fact: string;
  context: string;
}

export interface DeepResearchSection {
  thematicAnalysis: string;
  keyDebates: string[];
  unansweredQuestions: string[];
}

export interface ThingsSection {
  recommendations: string[];
  misconceptions: string[];
  challenge: string;
  futureOutlook: string;
}

export interface YouTubeVideo {
  title: string;
  url: string;
  embedUrl: string;
  thumbnail?: string;
}

export interface ResearchPaper {
  title: string;
  authors: string;
  year: string;
  link: string;
  summary: string;
}

export interface DiscoveryReport {
  userPsychology: {
    profileSummary: string;
    dominantTrait: string;
    learningStyle: string;
  };
  news: NewsItem[];
  facts: FactItem[];
  things: ThingsSection;
  deepResearch: DeepResearchSection;
  researchPapers: ResearchPaper[];
  imageUrl?: string;
  youtubeVideos?: YouTubeVideo[];
}

export type AppPhase = 'landing' | 'inquiry' | 'loading_report' | 'report' | 'key_needed';

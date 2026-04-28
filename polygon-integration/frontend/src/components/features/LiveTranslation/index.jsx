import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Languages, Check, Settings } from 'lucide-react';
import Button from '../../ui/Button';
import Dropdown from '../../ui/Dropdown';
import SubtitleDisplay from './SubtitleDisplay';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'nl', name: 'Dutch', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  { code: 'th', name: 'Thai', flag: '🇹🇭' },
  { code: 'sv', name: 'Swedish', flag: '🇸🇪' },
  { code: 'da', name: 'Danish', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', flag: '🇫🇮' },
];

// Mock translations
const MOCK_TRANSLATIONS = {
  en: "Let's review the project timeline and discuss next steps.",
  es: "Revisemos el cronograma del proyecto y discutamos los próximos pasos.",
  fr: "Passons en revue le calendrier du projet et discutons des prochaines étapes.",
  de: "Lassen Sie uns den Projektzeitplan überprüfen und die nächsten Schritte besprechen.",
  ja: "プロジェクトのタイムラインを確認し、次のステップについて話し合いましょう。",
  zh: "让我们回顾一下项目时间表并讨论下一步行动。",
};

export default function LiveTranslation({ isOpen, onClose }) {
  const [enabled, setEnabled] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [subtitleStyle, setSubtitleStyle] = useState('netflix'); // netflix | sidebar
  const [translateChat, setTranslateChat] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState(null);
  const [confidence, setConfidence] = useState(95);
  
  // Simulate live translation
  useEffect(() => {
    if (!enabled) return;
    
    const phrases = [
      { original: "Welcome everyone to today's meeting.", translated: "Bienvenidos a todos a la reunión de hoy." },
      { original: "Let's start with the agenda overview.", translated: "Comencemos con el resumen de la agenda." },
      { original: "Any questions before we proceed?", translated: "¿Alguna pregunta antes de continuar?" },
      { original: "Great progress on the new features.", translated: "Gran progreso en las nuevas características." },
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      setCurrentSubtitle(phrases[index % phrases.length]);
      setConfidence(Math.floor(Math.random() * 15) + 85);
      index++;
    }, 4000);
    
    return () => clearInterval(interval);
  }, [enabled, targetLanguage]);
  
  if (!isOpen) return null;
  
  return (
    <>
      {/* Settings Panel */}
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="fixed right-0 top-0 h-screen w-96 glass-card border-l border-white/10 flex flex-col z-40"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Globe className="text-app-secondary" size={24} />
              <div>
                <h2 className="font-syne font-bold">Live Translation</h2>
                <p className="text-xs text-gray-400">Real-time subtitles</p>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose}>✕</Button>
          </div>
          
          {/* Enable Toggle */}
          <label className="flex items-center justify-between glass-card p-4 rounded-xl cursor-pointer">
            <div>
              <span className="font-semibold">Enable Translation</span>
              <p className="text-xs text-gray-400">Show translated subtitles</p>
            </div>
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-5 h-5 rounded"
            />
          </label>
        </div>
        
        {/* Language Settings */}
        <div className="p-4 space-y-4">
          {/* Source Language */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Source Language</label>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSourceLanguage(lang.code)}
                  className={`
                    flex items-center gap-2 p-3 rounded-xl transition-all
                    ${sourceLanguage === lang.code 
                      ? 'bg-app-primary text-white' 
                      : 'glass hover:bg-app-surface'}
                  `}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Target Language */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Translate To</label>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTargetLanguage(lang.code)}
                  className={`
                    flex items-center gap-2 p-3 rounded-xl transition-all
                    ${targetLanguage === lang.code 
                      ? 'bg-app-secondary text-white' 
                      : 'glass hover:bg-app-surface'}
                  `}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                  {targetLanguage === lang.code && <Check size={16} className="ml-auto" />}
                </button>
              ))}
            </div>
          </div>
          
          {/* Subtitle Style */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Subtitle Style</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSubtitleStyle('netflix')}
                className={`flex-1 p-3 rounded-xl ${
                  subtitleStyle === 'netflix' ? 'bg-app-primary' : 'glass'
                }`}
              >
                <div className="text-sm font-semibold">Netflix</div>
                <p className="text-xs text-gray-400">Bottom center</p>
              </button>
              <button
                onClick={() => setSubtitleStyle('sidebar')}
                className={`flex-1 p-3 rounded-xl ${
                  subtitleStyle === 'sidebar' ? 'bg-app-primary' : 'glass'
                }`}
              >
                <div className="text-sm font-semibold">Side Panel</div>
                <p className="text-xs text-gray-400">Right side</p>
              </button>
            </div>
          </div>
          
          {/* Translate Chat Toggle */}
          <label className="flex items-center justify-between glass-card p-3 rounded-xl cursor-pointer">
            <span className="text-sm">Translate Chat Messages</span>
            <input
              type="checkbox"
              checked={translateChat}
              onChange={(e) => setTranslateChat(e.target.checked)}
              className="rounded"
            />
          </label>
        </div>
      </motion.div>
      
      {/* Subtitle Display */}
      {enabled && currentSubtitle && (
        <SubtitleDisplay
          subtitle={currentSubtitle}
          style={subtitleStyle}
          confidence={confidence}
          targetLanguage={LANGUAGES.find(l => l.code === targetLanguage)}
        />
      )}
    </>
  );
}

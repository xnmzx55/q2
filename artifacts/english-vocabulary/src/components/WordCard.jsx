import { Volume2 } from "lucide-react";

export function speakWord(word) {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.82;
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));
  if (englishVoice) utterance.voice = englishVoice;
  window.speechSynthesis.speak(utterance);
}

export function WordCard({ english, arabic, id }) {
  return (
    <article className="word-card" data-testid={`word-card-${id}`}>
      <div>
        <p className="word-english">{english}</p>
        <p className="word-arabic" lang="ar" dir="rtl">{arabic}</p>
      </div>
      <button type="button" className="speak-button" aria-label={`Pronounce ${english}`} title={`Listen to ${english}`} onClick={() => speakWord(english)} data-testid={`button-pronounce-${id}`}>
        <Volume2 size={18} />
      </button>
    </article>
  );
}

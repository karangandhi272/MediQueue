import { useState, useRef } from "react";
import { Waves } from "lucide-react";
import { Volume2, VolumeX } from "lucide-react";

const FaqPage = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);


  const faqs = [
    {
      question: "Why is it taking so long to see a doctor?",
      answer: "We know waiting can be stressful, and we’re doing our best to get to everyone as quickly as possible. The ED uses a triage system, which means patients are treated based on the severity of their condition first, and then in order of their arrival. If your condition changes or worsens, please let the triage nurse know right away."
    },
    {
      question: "Is my condition serious? Should I be worried?",
      answer: "We understand how concerning this must feel. The triage team has assessed your condition, and if it were immediately life-threatening, you would already be receiving treatment. If you're still worried, let's check with the team to ensure you're as comfortable as possible while waiting."
    },
    {
      question: "I was here before them. Why are they being treated first?",
      answer: "In the ED, we prioritize patients based on the seriousness of their condition, not the order they arrive. Someone else may appear okay but could have a critical issue needing immediate attention. Rest assured, we’re monitoring everyone closely, including you."
    },
    {
      question: "Am I going to have to stay overnight?",
      answer: "It depends on the results of your evaluation and any tests or imaging you might need. Once the doctor has more information about your condition, they’ll discuss whether you need to be admitted or if it’s safe to go home."
    },
    {
        question: "What if my symptoms get worse before I see the doctor?",
        answer: "If you feel your symptoms are getting worse, please let the triage nurse know immediately. We’re here to make sure you’re safe, and we’ll reassess your condition if needed."
    },
    {
        question: "Can I go home and come back when you’re ready for me?",
        answer: "We completely understand the frustration of waiting. If you leave, you might lose your spot in the queue, and we wouldn’t be able to monitor your condition. However, if you feel better and decide to leave, please inform the staff so we can document it properly."
    },
    {
        question: "Is it safe for me to sit here with all these sick people?",
        answer: "We take precautions to ensure everyone’s safety. Our team works to isolate contagious patients and clean the area frequently. If you’re worried about exposure, let us know, and we can provide a mask or adjust your seating if possible."
    },
    {
        question: "What kinds of tests will I need? Are they painful?",
        answer: "The doctor will decide which tests are necessary based on your symptoms. These might include blood tests, imaging like X-rays, or other evaluations. Most tests are minimally uncomfortable, and the team will explain everything before they start."
    },
    {
        question: "Why can’t my family come back here with me?",
        answer: "I understand you’d feel more comfortable with your family here. In some cases, space or privacy rules limit visitors, but I can check with the staff and see if an exception can be made or provide updates to your family while they wait."
    },
    {
        question: "What if they don’t figure out what’s wrong with me?",
        answer: "It’s natural to feel anxious about getting the right diagnosis. The medical team is highly trained and will perform all necessary tests and evaluations to figure out what’s going on. If you still have concerns, let the doctor know so they can address them directly."
    },
    {
        question: "Why can’t I leave yet?",
        answer: "After the doctor finishes your evaluation, it may take some time to complete paperwork, prescriptions, or discharge instructions. This ensures you have all the information you need to recover safely."
    }

  ];

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-cyan-100 relative pl-10">
      <audio 
        ref={audioRef}
        src="/soundtrack.mp3" 
        loop 
      />
      <div className="w-1/2 p-12 pt-6 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900">
        <h1 className="text-4xl font-bold text-blue-500 mb-8 sticky top-0  z-10 pb-4">
          Ease your concerns
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <button 
              key={index}
              onClick={() => setSelectedQuestion(faq.answer)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                selectedQuestion === faq.answer 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-blue-900 hover:bg-blue-100'
              }`}
            >
              {faq.question}
            </button>
          ))}
        </div>
      </div>
      <div className="w-1/2 flex items-center justify-center relative">
        <div className="absolute top-1/2 -translate-y-1/2">
          <div className="relative">
            {selectedQuestion ? (
              <div className="bg-white p-6 w-96 rounded-2xl shadow-xl border-2 border-blue-200">
                <p className="text-blue-900">{selectedQuestion}</p>
              </div>
            ) : (
              <div className="text-center text-blue-300">
                <p>Click a question to get answers!</p>
              </div>
            )}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Waves size={64} className="text-blue-500"/>
            </div>
          </div>
        </div>
      </div>
      <button 
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 bg-white p-4 rounded-full shadow-lg z-50"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
    </div>
  );
};


export default FaqPage;
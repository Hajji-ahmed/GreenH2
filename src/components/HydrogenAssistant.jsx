"use client";
import { useState, useEffect, useRef } from 'react';

const HydrogenAssistant = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Bonjour ! Je suis votre expert en hydrogène vert. Posez-moi vos questions sur la production, le stockage ou les applications de l'hydrogène décarboné.",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const API_KEY = "AIzaSyAklWfEUEmTRTAUAEt2der0AJ5WmskecB4";

  // Questions suggérées par langue
  const suggestedQuestions = {
    fr: [
      "Qu'est-ce que l'hydrogène vert ?",
      "Comment produit-on de l'hydrogène vert ?",
      "Quels sont les avantages de l'hydrogène vert ?",
      "Quelle est la différence avec l'hydrogène gris ?"
    ],
    en: [
      "What is green hydrogen?",
      "How is green hydrogen produced?",
      "What are the advantages of green hydrogen?",
      "What's the difference with grey hydrogen?"
    ],
    ar: [
      "ما هو الهيدروجين الأخضر؟",
      "كيف يتم إنتاج الهيدروجين الأخضر؟",
      "ما هي مزايا الهيدروجين الأخضر؟",
      "ما الفرق بينه وبين الهيدروجين الرمادي؟"
    ],
    ma: [
      "شنو هو الهيدروجين الأخضر؟",
      "كيفاش كيتنتج الهيدروجين الأخضر؟",
      "شنو هي الحوايج لي كتميز الهيدروجين الأخضر؟",
      "شنو الفرق بينه و بين الهيدروجين الرمادي؟"
    ]
  };

  // Auto-scroll vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Change language and reset conversation
  const changeLanguage = (lang) => {
    setLanguage(lang);
    const initialMessage = {
      fr: "Bonjour ! Je suis votre expert en hydrogène vert. Posez-moi vos questions sur la production, le stockage ou les applications de l'hydrogène décarboné.",
      en: "Hello! I'm your green hydrogen expert. Ask me your questions about the production, storage or applications of decarbonized hydrogen.",
      ar: "مرحبًا! أنا خبيرك في الهيدروجين الأخضر. يمكنك طرح أسئلتك حول إنتاج أو تخزين أو تطبيقات الهيدروجين منخفض الكربون.",
      ma: "Salam! Ana khbar f l'hydrogène vert. Qder tsawni b suwal dyalek 3la l'production, stockage w l'utilisation dyal l'hydrogène décarboné."
    };
    setMessages([{ text: initialMessage[lang], sender: 'bot' }]);
    setConversationHistory([]);
  };

  const getLocalResponse = (question, lang) => {
    const knowledgeBase = {
      fr: {
        "Qu'est-ce que l'hydrogène vert ?": 
          "L'hydrogène vert est produit par électrolyse de l'eau en utilisant de l'électricité renouvelable. C'est une solution clé pour la décarbonation de l'industrie et des transports.",
        "Comment produit-on de l'hydrogène vert ?":
          "La production se fait principalement par électrolyse de l'eau (procédé PEM ou alcalin) alimentée par des énergies renouvelables. On peut aussi utiliser la biomasse ou la pyrolyse du méthane.",
        "Quels sont les avantages de l'hydrogène vert ?":
          "1) Zéro émission de CO2\n2) Stockage des surplus d'énergies renouvelables\n3) Utilisable dans de nombreux secteurs (industrie, transport, chauffage)\n4) Alternative durable aux énergies fossiles",
        "Quelle est la différence avec l'hydrogène gris ?":
          "L'hydrogène gris est produit à partir de gaz naturel (vaporeformage) et émet 10kg de CO2 par kg d'H2. L'hydrogène vert est produit sans émissions grâce aux énergies renouvelables."
      },
      en: {
        "What is green hydrogen?":
          "Green hydrogen is produced through water electrolysis powered by renewable electricity. It's a key solution for decarbonizing industry and transportation.",
        "How is green hydrogen produced?":
          "It's mainly produced through water electrolysis (PEM or alkaline process) using renewable energy. Biomass and methane pyrolysis are alternative methods.",
        "What are the advantages of green hydrogen?":
          "1) Zero CO2 emissions\n2) Stores excess renewable energy\n3) Usable in multiple sectors (industry, transport, heating)\n4) Sustainable alternative to fossil fuels",
        "What's the difference with grey hydrogen?":
          "Grey hydrogen is produced from natural gas (steam reforming) emitting 10kg CO2 per kg H2. Green hydrogen is emission-free as it uses renewable energy."
      },
      ar: {
        "ما هو الهيدروجين الأخضر؟":
          "الهيدروجين الأخضر ينتج عن طريق التحليل الكهربائي للماء باستخدام الكهرباء المتجددة. إنه حل رئيسي لإزالة الكربون من الصناعة والنقل.",
        "كيف يتم إنتاج الهيدروجين الأخضر؟":
          "يتم الإنتاج بشكل رئيسي عن طريق التحليل الكهربائي للماء (عملية PEM أو القلوية) باستخدام الطاقة المتجددة. يمكن أيضًا استخدام الكتلة الحيوية أو انحلال الميثان الحراري.",
        "ما هي مزايا الهيدروجين الأخضر؟":
          "1) انبعاثات صفرية من ثاني أكسيد الكربون\n2) تخزين فائض الطاقة المتجددة\n3) قابل للاستخدام في العديد من القطاعات (الصناعة، النقل، التدفئة)\n4) بديل مستدام للوقود الأحفوري",
        "ما الفرق بينه وبين الهيدروجين الرمادي؟":
          "ينتج الهيدروجين الرمادي من الغاز الطبيعي (إصلاح البخار) وينبعث منه 10 كجم من ثاني أكسيد الكربون لكل كجم من H2. الهيدروجين الأخضر ينتج بدون انبعاثات باستخدام الطاقة المتجددة."
      },
      ma: {
        "شنو هو الهيدروجين الأخضر؟":
          "Hydrogène vert kaytprodui b électrolyse dyal lma b l'électricité renouvelable. Hiya solution essentielle bach nqdew carbon f l'industrie w transport.",
        "كيفاش كيتنتج الهيدروجين الأخضر؟":
          "Kaytprodui principalement b électrolyse dyal lma (procédé PEM ou alcalin) b l'énergie renouvelable. Imkan aussi nsta3mo la biomasse ou pyrolyse dyal méthane.",
        "شنو هي الحوايج لي كتميز الهيدروجين الأخضر؟":
          "1) Zero émissions CO2\n2) Stockage dyal surplus dyal énergies renouvelables\n3) Yemken nsta3moh f bzaf dyal secteurs (industrie, transport, chauffage)\n4) Alternative durable l fossiles",
        "شنو الفرق بينه و بين الهيدروجين الرمادي؟":
          "Hydrogène gris kaytprodui b gaz naturel (vaporeformage) kaykhrjo 10kg CO2 par kg H2. Hydrogène vert kaytprodui bla émissions b l'énergies renouvelables."
      }
    };

    return knowledgeBase[lang]?.[question] || 
      (lang === 'en' 
        ? "I'm sorry, I couldn't generate a response. Please try rephrasing your question about green hydrogen." 
        : lang === 'ar' 
          ? "عذرًا، لم أتمكن من إنشاء رد. يرجى إعادة صياغة سؤالك حول الهيدروجين الأخضر."
          : lang === 'ma'
            ? "Sma7 lia, ma mkanch liha ndir réponse. 3awed sma7 lia w goul suwalek b chi tariqa okhra 3la hydrogène vert."
            : "Désolé, je n'ai pas pu générer de réponse. Veuillez reformuler votre question sur l'hydrogène vert.");
  };

  const generateResponse = async (question) => {
    try {
      const prompt = {
        contents: [
          {
            role: "user",
            parts: [{
              text: `Tu es un expert technique spécialisé dans l'hydrogène vert (hydrogène décarboné).
              Langue de réponse requise: ${language}
              Style: Technique mais accessible, avec des exemples concrets et des données chiffrées
              Contexte: ${JSON.stringify(conversationHistory.slice(-3))}
              
              Question: ${question}`
            }]
          }
        ],
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
          topP: 0.8,
          topK: 40
        }
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(prompt)
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, { role: 'user', parts: [{ text: inputMessage }] }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Essayer d'abord avec l'API Gemini
      const apiResponse = await generateResponse(inputMessage);
      
      if (apiResponse) {
        const botMessage = { text: apiResponse, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setConversationHistory(prev => [...prev, { role: 'model', parts: [{ text: apiResponse }] }]);
      } else {
        // Fallback local si l'API ne répond pas
        const localResponse = getLocalResponse(inputMessage, language);
        const botMessage = { text: localResponse, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setConversationHistory(prev => [...prev, { role: 'model', parts: [{ text: localResponse }] }]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        fr: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        en: "Sorry, an error occurred. Please try again.",
        ar: "عذرًا، حدث خطأ. يرجى المحاولة مرة أخرى.",
        ma: "Sma7 lia, kayna chi problème. 3awed jarreb."
      };
      setMessages(prev => [...prev, { text: errorMessage[language], sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Suggestions dynamiques basées sur la conversation
  const getDynamicSuggestions = () => {
    if (messages.length <= 1) return suggestedQuestions[language];
    
    const lastMessage = messages[messages.length - 1].text.toLowerCase();
    const dynamicSuggestions = {
      fr: [
        "Quels sont les coûts de production ?",
        "Quelle est l'efficacité énergétique ?",
        "Pouvez-vous donner des exemples de projets ?",
        "Quels sont les défis techniques ?"
      ],
      en: [
        "What are the production costs?",
        "What is the energy efficiency?",
        "Can you give project examples?",
        "What are the technical challenges?"
      ],
      ar: [
        "ما هي تكاليف الإنتاج؟",
        "ما هي الكفاءة الطاقة؟",
        "هل يمكنك إعطاء أمثلة للمشاريع؟",
        "ما هي التحديات التقنية؟"
      ],
      ma: [
        "Ch7al kaysserf l production?",
        "Chhal f l efficacité énergétique?",
        "Temken ta3ti des exemples dyal projets?",
        "Chnouma les défis techniques?"
      ]
    };
    
    if (lastMessage.includes("production") || lastMessage.includes("إنتاج") || lastMessage.includes("produi")) {
      return dynamicSuggestions[language].slice(0, 2);
    } else if (lastMessage.includes("avantages") || lastMessage.includes("advantages") || lastMessage.includes("مزايا") || lastMessage.includes("hwayej")) {
      return dynamicSuggestions[language].slice(1, 3);
    }
    
    return dynamicSuggestions[language];
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-sky-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-800 dark:text-sky-300 mb-4">
              {language === 'en' ? 'Questions About Green Hydrogen?' :
               language === 'ar' ? 'أسئلة حول الهيدروجين الأخضر؟' :
               language === 'ma' ? 'Sawalat 3la l Hydrogène Vert?' :
               'Des Questions sur l\'Hydrogène Vert ?'}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {language === 'en' ? 'Our specialized virtual assistant is here to help you!' :
               language === 'ar' ? 'مساعدنا الافتراضي المتخصص هنا لمساعدتك!' :
               language === 'ma' ? 'L assistant virtuel spécialisé dialna hna bach isa3edek!' :
               'Notre assistant virtuel spécialisé est là pour vous répondre !'}
            </p>
            <button
              onClick={() => setShowChatbot(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              <i className="fas fa-comments mr-2"></i>
              {language === 'en' ? 'Chat with our expert' :
               language === 'ar' ? 'تحدث مع خبيرنا' :
               language === 'ma' ? 'Hder m3a l khaber dialna' :
               'Discuter avec notre expert'}
            </button>
          </div>
        </div>
      </section>

      {/* Assistant en plein écran */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
          <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-xl flex-1 flex flex-col max-w-6xl w-full mx-auto mt-16">
            {/* Header */}
            <div className="bg-green-500 dark:bg-green-600 text-white p-4 flex justify-between items-center rounded-t-lg">
              <div className="flex items-center space-x-3">
                <i className="fas fa-leaf text-xl"></i>
                <h3 className="font-bold text-xl">
                  {language === 'en' ? 'Green Hydrogen Expert' :
                   language === 'ar' ? 'خبير الهيدروجين الأخضر' :
                   language === 'ma' ? 'Khaber f Hydrogène Vert' :
                   'Expert Hydrogène Vert'}
                </h3>
              </div>
              <div className="flex space-x-4">
                {/* Language selector */}
                <div className="relative">
                  <select 
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="appearance-none bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm focus:outline-none"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="ma">Darija</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-2 top-2 text-xs text-white pointer-events-none"></i>
                </div>
                
                <button 
                  onClick={() => {
                    setMessages([{
                      text: language === 'en' ? "Hello! I'm your green hydrogen expert. What would you like to know?" :
                            language === 'ar' ? "مرحبًا! أنا خبيرك في الهيدروجين الأخضر. ما الذي ترغب في معرفته؟" :
                            language === 'ma' ? "Salam! Ana khbar f l'hydrogène vert. Ash bghiti t3raf?" :
                            "Bonjour ! Je suis votre expert en hydrogène vert. Que souhaitez-vous savoir ?",
                      sender: 'bot'
                    }]);
                    setConversationHistory([]);
                  }}
                  className="p-2 hover:bg-green-400 dark:hover:bg-green-700 rounded-full"
                  title={language === 'en' ? "New chat" : language === 'ar' ? "محادثة جديدة" : language === 'ma' ? "Nouvelle conversation" : "Nouvelle conversation"}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <button 
                  onClick={() => setShowChatbot(false)}
                  className="p-2 hover:bg-green-400 dark:hover:bg-green-700 rounded-full"
                  title={language === 'en' ? "Close" : language === 'ar' ? "إغلاق" : language === 'ma' ? "Sedd" : "Fermer"}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
            
            {/* Zone de conversation */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-700">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3xl rounded-lg px-6 py-4 ${msg.sender === 'user' 
                      ? 'bg-sky-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200'}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {msg.sender === 'bot' && (
                      <div className={`flex items-center mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <i className="fas fa-robot text-green-500 mr-2"></i>
                        <span className="font-semibold text-green-500">
                          {language === 'en' ? 'Hydrogen Expert' :
                           language === 'ar' ? 'خبير الهيدروجين' :
                           language === 'ma' ? 'Khaber f Hydrogène' :
                           'Expert Hydrogène'}
                        </span>
                      </div>
                    )}
                    {msg.text.split('\n').map((paragraph, i) => (
                      <p key={i} className={`mb-2 last:mb-0 ${language === 'ar' ? 'text-right' : ''}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-600 rounded-lg px-6 py-4 max-w-3xl">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span className="text-gray-500 dark:text-gray-300">
                        {language === 'en' ? 'Expert is answering...' :
                         language === 'ar' ? 'الخبير يرد...' :
                         language === 'ma' ? 'L khaber kayjawb...' :
                         'Expert en train de répondre...'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Suggestions et input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
              {/* Questions suggérées */}
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {language === 'en' ? 'Try asking:' :
                   language === 'ar' ? 'جرب أن تسأل:' :
                   language === 'ma' ? 'Jarreb tsaal:' :
                   'Essayez de demander :'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getDynamicSuggestions().map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputMessage(question);
                        setTimeout(() => document.querySelector('#chat-input')?.focus(), 0);
                      }}
                      className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-full"
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input zone */}
              <div className="flex space-x-3">
                <input
                  id="chat-input"
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder={
                    language === 'en' ? "Ask your question about green hydrogen..." :
                    language === 'ar' ? "اطرح سؤالك حول الهيدروجين الأخضر..." :
                    language === 'ma' ? "Sawl suwal dyalek 3la l hydrogène vert..." :
                    "Posez votre question sur l'hydrogène vert..."
                  }
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                  autoFocus
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-50"
                >
                  <i className={`fas ${isLoading ? 'fa-spinner animate-spin' : 'fa-paper-plane'}`}></i>
                </button>
              </div>
              
              {/* Footer */}
              <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                <p>
                  {language === 'en' ? "AI expert may make mistakes. Verify important information." :
                   language === 'ar' ? "قد يخطئ الخبير الذكي. تحقق من المعلومات المهمة." :
                   language === 'ma' ? "L khaber AI yemken ykhata2. Vérifier les informations importantes." :
                   "L'expert IA peut faire des erreurs. Vérifiez les informations importantes."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HydrogenAssistant;
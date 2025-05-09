"use client";
import React, { useState, useEffect, useRef } from "react";

export default function Index() {
  return <StoryComponent />;
}

function MainComponent({
  isOpen = false,
  onToggle,
  darkMode = false,
  position = "bottom-right",
}) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("french");
  const [isTranslating, setIsTranslating] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const previousLanguageRef = useRef(language);

  //clé API Gemini
  const API_KEY = "AIzaSyAklWfEUEmTRTAUAEt2der0AJ5WmskecB4"; // Remplacez par votre clé API réelle
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
  const systemPrompts = {
    french: `Tu es un expert en hydrogène vert marocain. Réponds EXCLUSIVEMENT en français. Ne mélange pas les langues. Si on te pose une question dans une autre langue, réponds en français en précisant que tu ne réponds qu'en français.`,
    arabic: `أنت خبير في الهيدروجين الأخضر المغربي. أجب حصريًا باللغة العربية. لا تخلط بين اللغات. إذا تم طرح سؤال بلغة أخرى، أجب بالعربية مع توضيح أنك تجيب باللغة العربية فقط.`,
    darija: `Wahed khebar f l'hydrogène vert dyal lmaghrib. Jawbek EXCLUSIVEMENT b darija. Makhlitich loughat. Ila kan su2l b lougha okhra, jawb b darija o qol belli katjawb b darija ghir.`,
    english: `You are an expert in Moroccan green hydrogen. Respond EXCLUSIVELY in English. Do not mix languages. If asked in another language, respond in English stating you only respond in English.`
  };

  const welcomeMessages = {
    french: ["Bonjour! Je suis votre expert en hydrogène vert marocain."],
    arabic: ["مرحبا! أنا خبيرك في الهيدروجين الأخضر المغربي."],
    darija: ["Salam! Ana wahed lkhebar dyal l'hydrogène vert dyal lmaghrib."],
    english: ["Hello! I'm your expert in Moroccan green hydrogen."]
  };

  const placeholders = {
    french: "Posez votre question...",
    arabic: "اطرح سؤالك...",
    darija: "Sift su2lak...",
    english: "Ask your question..."
  };

  // Effet pour gérer la traduction lorsque la langue change
  useEffect(() => {
    if (previousLanguageRef.current !== language && messages.length > 0) {
      translateConversation();
    }
    previousLanguageRef.current = language;
  }, [language]);

  // Effet pour faire défiler vers le bas automatiquement
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const translateConversation = async () => {
    setIsTranslating(true);
    
    try {
      const translatedMessages = await Promise.all(
        messages.map(async (message) => {
          if (message.role === "assistant") {
            // Dans une vraie implémentation, vous utiliseriez une API de traduction ici
            // Pour cet exemple, nous simulons juste la traduction
            const translatedContent = `[Traduit en ${language}] ${message.content}`;
            return { ...message, content: translatedContent };
          }
          return message;
        })
      );
      
      setMessages(translatedMessages);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const simulateStreaming = (fullResponse) => {
    setIsStreaming(true);
    setStreamedResponse("");
    
    let i = 0;
    const words = fullResponse.split(" ");
    const interval = setInterval(() => {
      if (i < words.length) {
        setStreamedResponse(prev => prev + (i > 0 ? " " : "") + words[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setMessages(prev => [...prev, { role: "assistant", content: fullResponse }]);
        setStreamedResponse("");
      }
    }, 100); // Vitesse d'affichage des mots (en ms)
    
    return () => clearInterval(interval);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading || isTranslating || isStreaming) return;

    const userMessage = userInput.trim();
    setUserInput("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Préparation du prompt pour Gemini
      const chatHistory = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: systemPrompts[language] }]
            },
            ...chatHistory,
            {
              role: "user",
              parts: [{ text: userMessage }]
            }
          ]
        }),
      });

      if (!response.ok) throw new Error("Chatbot error");

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;
      
      // Simuler le streaming au lieu d'afficher directement la réponse
      simulateStreaming(botResponse);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Error: ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 transition-all duration-300 ${isOpen ? "h-[600px] w-[400px]" : "h-16 w-16"}`}>
      <div className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-xl h-full flex flex-col overflow-hidden border-2 border-green-600`}>
        {/* Header */}
        <div className={`${darkMode ? "bg-green-900" : "bg-green-600"} p-4 flex justify-between items-center cursor-pointer`} onClick={onToggle}>
          <div className="flex items-center text-white">
            <div className="relative mr-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <i className="fas fa-robot text-green-600 text-lg"></i>
              </div>
              <div className="absolute -bottom-10 -right-1 bg-green-400 rounded-full w-3 h-3 border-2 border-white"></div>
            </div>
            <span className={`${isOpen ? "block" : "hidden"} font-bold`}>
              {language === "french" && "Expert Hydrogène Vert Maroc"}
              {language === "arabic" && "خبير الهيدروجين الأخضر المغربي"}
              {language === "darija" && "Khebar Hydrogène Vert Dyal lMaghrib"}
              {language === "english" && "Moroccan Green Hydrogen Expert"}
            </span>
          </div>
          
          <div className="flex items-center">
            {isOpen && (
              <div className="flex space-x-2 mr-4">
                <button 
                  onClick={(e) => {e.stopPropagation(); setLanguage("french");}}
                  className={`px-2 py-1 rounded ${language === "french" ? "bg-white text-green-600" : "bg-green-700 text-white"} text-xs`}
                  disabled={isTranslating}
                >
                  FR
                </button>
                <button 
                  onClick={(e) => {e.stopPropagation(); setLanguage("arabic");}}
                  className={`px-2 py-1 rounded ${language === "arabic" ? "bg-white text-green-600" : "bg-green-700 text-white"} text-xs`}
                  disabled={isTranslating}
                >
                  AR
                </button>
                <button 
                  onClick={(e) => {e.stopPropagation(); setLanguage("darija");}}
                  className={`px-2 py-1 rounded ${language === "darija" ? "bg-white text-green-600" : "bg-green-700 text-white"} text-xs`}
                  disabled={isTranslating}
                >
                  MA
                </button>
                <button 
                  onClick={(e) => {e.stopPropagation(); setLanguage("english");}}
                  className={`px-2 py-1 rounded ${language === "english" ? "bg-white text-green-600" : "bg-green-700 text-white"} text-xs`}
                  disabled={isTranslating}
                >
                  EN
                </button>
              </div>
            )}
            <button className="text-white">
              <i className={`fas ${isOpen ? "fa-minus" : "fa-plus"}`} />
            </button>
          </div>
        </div>

        {isOpen && (
          <>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && !isTranslating && (
                <div className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"} py-8`}>
                  <img 
                    src="https://i.ibb.co/tT0cnfmc/Whats-App-Image-2025-03-17-at-01-40-31.jpg"
                    alt="Drapeau Maroc" 
                    className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-green-600"
                  />
                  <p>{welcomeMessages[language][0]}</p>
                </div>
              )}

              {isTranslating && (
                <div className="flex justify-center py-8">
                  <div className={`text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <div className="flex justify-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                    <p className="text-sm">Traduction en cours...</p>
                  </div>
                </div>
              )}

              {!isTranslating && messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? darkMode ? "bg-green-900 text-green-100" : "bg-green-100 text-green-900"
                      : darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"
                  }`}>
                    {message.role === "assistant" && (
                      <div className="flex items-start mb-1">
                        <img 
                          src="https://i.ibb.co/tT0cnfmc/Whats-App-Image-2025-03-17-at-01-40-31.jpg"
                          alt="Chatbot"
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      </div>
                    )}
                    {message.content}
                  </div>
                </div>
              ))}

              {isStreaming && (
                <div className="flex justify-start">
                  <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-lg p-3 max-w-[80%]`}>
                    <div className="flex items-start mb-1">
                      <img 
                        src="https://i.ibb.co/tT0cnfmc/Whats-App-Image-2025-03-17-at-01-40-31.jpg"
                        alt="Chatbot"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    </div>
                    {streamedResponse}
                    <span className="inline-block w-2 h-4 bg-gray-500 ml-1 animate-pulse"></span>
                  </div>
                </div>
              )}
              
              {isLoading && !isStreaming && (
                <div className="flex justify-start">
                  <div className={`${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-lg p-3 max-w-[80%]`}>
                    <div className="flex items-start mb-1">
                      <img 
                        src="https://i.ibb.co/tT0cnfmc/Whats-App-Image-2025-03-17-at-01-40-31.jpg"
                        alt="Chatbot"
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className={`p-4 border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={placeholders[language]}
                  className="flex-1 p-2 rounded-lg border border-green-600 focus:ring-2 focus:ring-green-500"
                  disabled={isLoading || isTranslating || isStreaming}
                />
                <button
                  type="submit"
                  disabled={isLoading || isTranslating || isStreaming}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <i className="fas fa-paper-plane" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Helper function for position classes
const positionClasses = {
  "bottom-right": "bottom-20 right-10",
  "bottom-left": "bottom-4 left-4",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
};

function StoryComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainComponent 
      isOpen={isOpen} 
      onToggle={() => setIsOpen(!isOpen)}
      darkMode={false}
      position="bottom-right"
    />
  );
}
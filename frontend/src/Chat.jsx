import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "./PageWrapper";

export default function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAsk = async () => {
    setLoading(true);
    setAnswer("");
    try {
      const res = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || "Sorry, no answer.");
    } catch (err) {
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
        {/* Home Button */}
        <div className="w-full max-w-xl flex justify-end px-2 mb-2">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline text-sm"
          >
            ⬅ Home
          </button>
        </div>

        {/* Chat UI */}
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-green-500 text-white text-xl font-bold px-4 py-3">
            LMbot – Atharva’s Assistant
          </div>

          <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
            {answer && (
              <div className="bg-gray-200 p-3 rounded-lg self-start w-fit max-w-sm">
                <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
              </div>
            )}

            {question && (
              <div className="bg-green-300 p-3 rounded-lg self-end w-fit max-w-sm ml-auto">
                <p className="text-gray-900 whitespace-pre-wrap">{question}</p>
              </div>
            )}
          </div>

          <div className="flex items-center p-4 border-t border-gray-200">
            <textarea
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-lg resize-none mr-2 h-12 bg-gray-100"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={handleAsk}
            >
              Send
            </button>
          </div>

          {loading && (
            <p className="text-center text-sm text-gray-500 pb-4">Typing…</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

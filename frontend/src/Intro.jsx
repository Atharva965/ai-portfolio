import { useNavigate } from "react-router-dom";
import PageWrapper from "./PageWrapper";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Atharva’s AI Portfolio</h1>
        <p className="mb-6 text-lg text-gray-700 text-center max-w-xl">
          This assistant will guide you through Atharva Srivastava's skills, projects, and goals.
        </p>
        <button
          onClick={() => navigate("/chat")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </PageWrapper>
  );
}

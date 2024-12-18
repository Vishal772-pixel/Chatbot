import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerateResponse(e) {
    e.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      // Initialize Generative AI client with API key
      const genAI = new GoogleGenerativeAI(
        "AIzaSyDHsX0PSeM9JzO2KR107EeOWMsHwVBVIH4"
      );

      // Get the model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Add system prompt
      const SYSTEM_PROMPT = "You are a helpful assistant that provides concise, clear answers to the medical related problem. don't answer any another unrelated things."; // System prompt

      // Combine system prompt and user question for the model
      const prompt = `${SYSTEM_PROMPT}\n\nUser's question: ${question}`;

      // Generate response
      const result = await model.generateContent(prompt);

      // Update response state
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error generating response:", error.message);
      setResponse("Sorry, something went wrong. Please try again!");
    }

    setLoading(false);
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-500 to-gray-100 flex items-center justify-center p-6"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(45deg, #4c6ef5, #f06d2f)",
        padding: "20px",
      }}
    >
      <div
        className="max-w-md w-full bg-white rounded-lg shadow-md p-6"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Ask something form */}
        <form onSubmit={handleGenerateResponse} className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
            rows={3}
            disabled={loading}
            style={{
              borderColor: "#3498db",
              borderRadius: "8px",
              padding: "15px",
              fontSize: "16px",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              boxShadow: loading ? "none" : "0 0 5px rgba(52, 152, 219, 0.5)",
            }}
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-medium ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={loading}
            style={{
              padding: "15px",
              fontSize: "18px",
              backgroundColor: "#3498db",
              borderRadius: "10px",
              border: "none",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
          >
            {loading ? "Generating..." : "Submit"}
          </button>
        </form>

        {/* Response Container */}
        <div
          className="mt-6 p-4 bg-gray-100 rounded-lg"
          style={{
            marginTop: "20px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "15px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            className="font-medium text-lg"
            style={{
              fontSize: "20px",
              color: "#333333",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            Response:
          </h2>
          <div
            className="mt-2 p-4 bg-white rounded-lg shadow-md max-h-96 overflow-auto"
            style={{
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              overflowY: "auto",
              maxHeight: "300px",
            }}
          >
            <p
              className="whitespace-pre-wrap text-gray-800"
              style={{
                color: "#2c3e50",
                lineHeight: "1.6",
                fontSize: "16px",
              }}
            >
              {loading
                ? "Loading..."
                : response || "Your response will appear here."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

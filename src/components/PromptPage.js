import React, { useState } from 'react';
import axios from 'axios';
import './PromptPage.css';

const PromptPage = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const scriptUrl = process.env.REACT_APP_SCRIPT_URL || 'http://52.200.176.145:9000';
      console.log('🔧 Environment variable REACT_APP_SCRIPT_URL:', process.env.REACT_APP_SCRIPT_URL);
      console.log('🔧 Using scriptUrl:', scriptUrl);
      let endpoint = `${scriptUrl}/run-script/${encodeURIComponent(prompt)}`;
      
      console.log('🚀 Sending GET request to:', endpoint);
      
      let response;
      try {
        // Try direct API call first
        response = await axios.get(endpoint);
      } catch (corsError) {
        console.log('⚠️ CORS error detected, trying with proxy...', corsError.message);
        // Fallback to CORS proxy
        const proxyEndpoint = `https://api.allorigins.win/get?url=${encodeURIComponent(endpoint)}`;
        console.log('🔄 Fetching with CORS proxy from:', proxyEndpoint);
        response = await axios.get(proxyEndpoint);
        // Parse the proxied response
        response.data = JSON.parse(response.data.contents);
      }
      
      console.log('✅ Response received:', response.data);
      setResponse(response.data);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'An error occurred while processing your request');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prompt-page">
      <div className="prompt-container">
        <div className="prompt-header">
          <h1>AI Content Creator</h1>
          <p>Ask our CM Agent to create a post for your social media</p>
        </div>

        <form onSubmit={handleSubmit} className="prompt-form">
          <div className="prompt-input-container">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the post you want to create... (e.g., 'Create a motivational post about productivity')"
              className="prompt-textarea"
              rows="4"
              disabled={isLoading}
            />
            <div className="prompt-actions">
              <button
                type="submit"
                className="publish-btn"
                disabled={!prompt.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner-small"></div>
                    Processing...
                  </>
                ) : (
                  'Publish'
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="prompt-error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {response && (
          <div className="prompt-response">
            <h3>Generated Content</h3>
            <div className="response-content">
              {typeof response === 'string' ? (
                <p>{response}</p>
              ) : (
                <pre>{JSON.stringify(response, null, 2)}</pre>
              )}
            </div>
          </div>
        )}

        <div className="prompt-tips">
          <h3>Tips for better prompts:</h3>
          <ul>
            <li>Be specific about the content type (motivational, educational, promotional)</li>
            <li>Mention your target audience if relevant</li>
            <li>Include any specific details or themes you want</li>
            <li>Specify the tone (professional, casual, funny, etc.)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PromptPage; 
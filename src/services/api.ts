export interface ChatResponse {
  answer: string;
  sources: string[];
}

export const sendMessage = async (prompt: string, apiUrl: string): Promise<string> => {
  try {
    if (apiUrl === '') apiUrl = "https://ap.sn4s.pp.ua";
    const response = await fetch(`${apiUrl}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: prompt }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: ChatResponse = await response.json();

    // Format the response with sources if available
    let formattedResponse = data.answer;
    if (data.sources && data.sources.length > 0) {
      formattedResponse += '\n\n**Sources:**\n' + data.sources.map(s => `- ${s}`).join('\n');
    }

    return formattedResponse;
  } catch (error) {
    console.error('Error sending message:', error);
    return "Sorry, I couldn't connect to the server. Please ensure the backend is running.";
  }
};

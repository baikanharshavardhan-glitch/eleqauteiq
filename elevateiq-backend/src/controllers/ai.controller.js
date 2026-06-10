const { sendSuccess, sendError } = require('../utils/response');

const chat = async (req, res) => {
  const { message, messages, session_id } = req.body;

  let groqMessages = [];
  let userMessage = '';

  if (messages && Array.isArray(messages) && messages.length > 0) {
    // Normalize roles: 'ai' → 'assistant', anything else stays as-is
    groqMessages = messages
      .map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: (m.content || m.text || '').trim(),
      }))
      .filter(m => m.content && ['user', 'assistant'].includes(m.role)); // only valid roles

    userMessage = groqMessages[groqMessages.length - 1]?.content || '';
  } else if (message && typeof message === 'string') {
    userMessage = message.trim();
    groqMessages = [{ role: 'user', content: userMessage }];
  }

  if (!userMessage) return sendError(res, 'Message is required.', 400);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'You are an AI assistant for ElevateIQ, a corporate training and HR platform. Help with HR policies, courses, career growth, performance tips, and work productivity. Be friendly, concise and professional.',
          },
          ...groqMessages,
        ],
        max_tokens: 512,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Groq error:', data.error.message);
      return sendError(res, 'AI service temporarily unavailable.', 503);
    }

    const aiReply =
      data.choices?.[0]?.message?.content || 'Sorry, I could not process that.';

    return sendSuccess(res, { reply: aiReply, session_id: session_id || 'default' });
  } catch (err) {
    console.error('AI chat error:', err.message);
    return sendError(res, 'Internal server error.', 500);
  }
};

const getChatHistory = async (req, res) => sendSuccess(res, []);
const clearHistory = async (req, res) => sendSuccess(res, {}, 'Chat history cleared');

module.exports = { chat, getChatHistory, clearHistory };
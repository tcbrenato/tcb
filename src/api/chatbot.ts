export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Base de connaissances scindée pour éviter l'erreur 400
const RENATO_KNOWLEDGE_BASE_PARTS = [
  "Tu es l'assistant IA de Rénato TCHOBO (Bénin). Réponds en français, sois précis et professionnel.",
  "Services: Développement Web (150k FCFA+), Applications Mobiles (350k FCFA+), UI/UX Design (200k FCFA+), SEO Marketing (75k FCFA/mois), E-commerce (250k FCFA+).",
  "Forfaits: Starter 125k, Business 300k, Enterprise sur devis.",
  "Contact: +229 01 58 84 84 20, info@renatotchobo.com.",
  "Expérience: 5+ ans, 50+ projets, 30+ clients, 99% satisfaction.",
  "Technologies: React, Node.js, PHP, React Native, Figma, WordPress, Shopify."
];

export async function askGroq(message: string): Promise<string> {
  try {
    if (!message || typeof message !== "string") return "Message invalide.";

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return "Clé API manquante.";

    // Préparer les messages pour l'API
    const messages = RENATO_KNOWLEDGE_BASE_PARTS.map(part => ({
      role: "system" as const,
      content: part
    }));

    messages.push({ role: "user" as const, content: message });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages,
        max_tokens: 512,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur Groq:', response.status, errorData);
      return `Erreur API (${response.status}). Veuillez réessayer plus tard.`;
    }

    const data = await response.json();

    // Parsing robuste de la réponse
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message?.content || data.choices[0].text || "Désolé, pas de réponse.";
    } else {
      console.error("Format de réponse inattendu:", data);
      return "Désolé, réponse inattendue de l'API.";
    }

  } catch (error) {
    console.error('Erreur lors de l\'appel à Groq:', error);
    return "Désolé, je n'arrive pas à répondre pour le moment.";
  }
}

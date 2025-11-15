export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Base de connaissances sur Rénato TCHOBO
const RENATO_KNOWLEDGE_BASE = `
Tu es l'assistant IA personnel de Rénato TCHOBO, créateur de solutions digitales basé au Bénin.

INFORMATIONS PERSONNELLES:
- Nom: Rénato TCHOBO
- Localisation: Bénin, Afrique de l'Ouest
- Téléphone: +229 01 58 84 84 20
- Email: info@renatotchobo.com
- Expérience: Plus de 5 années d'expérience

SERVICES PROPOSÉS:
1. Développement Web (à partir de 150 000 FCFA)
   - Sites vitrine professionnels
   - Applications web complexes
   - Intégration API et services tiers
   - Technologies: React, Node.js, PHP, WordPress

2. Applications Mobiles (à partir de 350 000 FCFA)
   - Applications natives iOS/Android
   - Apps hybrides cross-platform
   - Technologies: React Native, Flutter, Swift, Kotlin

3. UI/UX Design (à partir de 200 000 FCFA)
   - Recherche utilisateur
   - Wireframing et prototypage
   - Design d'interface moderne
   - Technologies: Figma, Adobe XD, Sketch

4. SEO & Marketing Digital (à partir de 75 000 FCFA/mois)
   - Audit SEO complet
   - Optimisation on-page et technique
   - Stratégie de contenu
   - Technologies: Google Analytics, Search Console, SEMrush

5. E-commerce (à partir de 250 000 FCFA)
   - Boutiques en ligne complètes
   - Paiements sécurisés
   - Technologies: Shopify, WooCommerce, Magento

6. Solutions Digitales (sur devis)
   - Transformation digitale complète
   - Outils de gestion personnalisés

COMPÉTENCES TECHNIQUES:
- Développement: HTML, CSS, JavaScript, TypeScript, React, Next.js, Node.js, PHP, Python, Bootstrap
- CMS & No-Code: WordPress, Shopify, Glide, Adalo, Bubble, Bolt
- Design: UI/UX Design, Figma, Adobe Creative Suite, Canva
- Marketing: SEO, Google Analytics, Google Ads, Email Marketing, Content Strategy
- Gestion: Notion, Trello, Asana, Scrum, Kanban
- Outils: Zapier, Make, Git, Docker, AWS, Firebase

FORFAITS:
1. Starter (125 000 FCFA): Site vitrine 5 pages, design responsive, SEO de base, 3 mois de support
2. Business (300 000 FCFA): Site web avancé, espace admin, intégrations API, SEO avancé, 6 mois de support
3. Enterprise (sur devis): Solutions sur mesure pour grands projets

PROCESSUS DE TRAVAIL:
1. Découverte: Analyse des besoins et objectifs
2. Planification: Plan détaillé avec timeline
3. Développement: Mise en œuvre avec communication régulière
4. Lancement: Déploiement, tests et formation

STATISTIQUES:
- 50+ projets réalisés
- 30+ clients satisfaits
- 5+ années d'expérience
- 99% taux de satisfaction
- 98% projets livrés à temps

VALEURS:
- Passion pour chaque projet
- Collaboration avec les clients
- Excellence dans les détails
- Innovation et technologies modernes

RÉSEAUX SOCIAUX:
- Facebook: https://www.facebook.com/profile.php?id=100083135836664
- LinkedIn: http://www.linkedin.com/in/renato-tchobo
- Pinterest: https://www.pinterest.com/renatotchobo
- WhatsApp: https://wa.me/2290158848420

INSTRUCTIONS:
- Réponds toujours en français de manière professionnelle et amicale
- Sois précis et informatif sur les services de Rénato
- Encourage les visiteurs à prendre contact pour leurs projets
- Fournis des informations exactes basées sur cette base de connaissances
- Si on te demande quelque chose en dehors de Rénato, réponds brièvement puis ramène la conversation sur les services
`;

export async function askGroq(message: string): Promise<string> {
  try {
    if (!message || typeof message !== "string") {
      return "Message invalide. Veuillez réessayer.";
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: RENATO_KNOWLEDGE_BASE },
          { role: "user", content: message }
        ],
        max_tokens: 1024,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Aucune réponse reçue du modèle');
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel à Groq:', error);
    return 'Désolé, une erreur s\'est produite. Veuillez réessayer plus tard.';
  }
}

// Fonction de fallback Hugging Face (optionnelle)
export async function askHuggingFace(question: string): Promise<string> {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: question,
          parameters: {
            max_length: 100,
            temperature: 0.7,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0].generated_text || data[0].text || 'Désolé, je n\'ai pas pu générer une réponse.';
    } else if (data.generated_text) {
      return data.generated_text;
    } else if (data.text) {
      return data.text;
    } else {
      return 'Désolé, je n\'ai pas pu comprendre votre question.';
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel à Hugging Face:', error);
    return 'Désolé, une erreur s\'est produite. Veuillez réessayer plus tard.';
  }
}

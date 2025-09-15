import React, { useState } from "react";
import { Mail, Phone, MapPin, Copy, CheckCircle, Loader2 } from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fadeInUp = useScrollAnimation({ y: 40 });

  // 🔹 Gestion des champs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Envoi via Formspree (principal)
  const handleFormspreeSubmit = async () => {
    const response = await fetch("https://formspree.io/f/xnnbyzlk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formData,
        _replyto: formData.email,
        _subject: `Nouvelle demande de projet - ${formData.name}`,
      }),
    });

    if (!response.ok) throw new Error("Erreur Formspree");
  };

  // 🔹 Envoi via EmailJS (fallback)
  const handleEmailJSSubmit = async () => {
    if (!window.emailjs) throw new Error("EmailJS non chargé");

    await window.emailjs.send(
      "service_xxxxx",
      "template_xxxxx",
      {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
      },
      "publicKey_xxxxx"
    );
  };

  // 🔹 Envoi via Web3Forms (fallback)
  const handleWeb3FormsSubmit = async () => {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "your-access-key",
        ...formData,
      }),
    });

    if (!response.ok) throw new Error("Erreur Web3Forms");
  };

  // 🔹 Envoi via Netlify (fallback)
  const handleNetlifySubmit = async () => {
    const formDataNetlify = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataNetlify.append(key, (formData as any)[key]);
    });

    const response = await fetch("/", {
      method: "POST",
      body: formDataNetlify,
    });

    if (!response.ok) throw new Error("Erreur Netlify");
  };

  // 🔹 Gestion d’envoi avec fallback automatique
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Essai Formspree (priorité)
      await handleFormspreeSubmit();

      // ✅ Succès
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (error) {
      console.warn("Formspree échoué, tentative fallback...");

      try {
        // Fallbacks en cascade
        await handleEmailJSSubmit();
        setIsSubmitted(true);
      } catch {
        try {
          await handleWeb3FormsSubmit();
          setIsSubmitted(true);
        } catch {
          try {
            await handleNetlifySubmit();
            setIsSubmitted(true);
          } catch {
            setSubmitError("Impossible d’envoyer votre demande. Réessayez plus tard.");
          }
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🔹 Copier infos projet
  const handleCopyInfo = () => {
    const projectInfo = `
Nom: ${formData.name}
Email: ${formData.email}
Entreprise: ${formData.company}
Service: ${formData.service}
Budget: ${formData.budget}
Délai: ${formData.timeline}
Message: ${formData.message}
    `;
    navigator.clipboard.writeText(projectInfo.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-20">
        {/* ✅ Titre */}
        <div className="text-center mb-12" {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-4">Parlons de votre projet</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Vous avez une idée en tête ? Partagez-la avec moi, et voyons comment
            nous pouvons la concrétiser ensemble.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* ✅ Formulaire */}
          <div {...fadeInUp}>
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-lg space-y-6"
            >
              {isSubmitted && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                  ✅ Merci ! Votre demande a bien été envoyée.
                </div>
              )}
              {submitError && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  ❌ {submitError}
                </div>
              )}

              <input
                type="text"
                name="name"
                placeholder="Votre nom *"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email *"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Votre entreprise"
                value={formData.company}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
              <input
                type="text"
                name="service"
                placeholder="Service souhaité *"
                value={formData.service}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
              <input
                type="text"
                name="budget"
                placeholder="Votre budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
              <input
                type="text"
                name="timeline"
                placeholder="Délai souhaité"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
              <textarea
                name="message"
                placeholder="Votre message *"
                value={formData.message}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                rows={5}
                required
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Envoi en cours...
                  </>
                ) : (
                  "Envoyer ma demande"
                )}
              </button>
            </form>
          </div>

          {/* ✅ Infos contact */}
          <div className="space-y-8" {...fadeInUp}>
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-xl font-semibold">Informations de contact</h3>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={20} /> info@renatotchobo.com
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={20} /> +229 97 00 00 00
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={20} /> Cotonou, Bénin
              </div>
            </div>

            {/* ✅ Alternatives */}
            <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
              <h3 className="text-xl font-semibold">Autres moyens</h3>
              <a
                href="mailto:info@renatotchobo.com"
                className="block text-blue-600 hover:underline"
              >
                📧 Envoyer un email direct
              </a>
              <a
                href="https://wa.me/22997000000"
                className="block text-green-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Discuter via WhatsApp
              </a>
              <button
                onClick={handleCopyInfo}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                {copied ? (
                  <>
                    <CheckCircle size={18} /> Copié !
                  </>
                ) : (
                  <>
                    <Copy size={18} /> Copier mes infos projet
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ FAQ */}
        <div className="mt-16 max-w-3xl mx-auto" {...fadeInUp}>
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Questions fréquentes
          </h3>
          <div className="space-y-4">
            <details className="bg-white p-4 rounded-lg shadow">
              <summary className="cursor-pointer font-medium">
                Quels types de projets réalises-tu ?
              </summary>
              <p className="mt-2 text-gray-600">
                Je travaille sur des projets digitaux variés : sites web, design,
                marketing, identité visuelle et accompagnement stratégique.
              </p>
            </details>
            <details className="bg-white p-4 rounded-lg shadow">
              <summary className="cursor-pointer font-medium">
                Quels sont tes délais moyens ?
              </summary>
              <p className="mt-2 text-gray-600">
                Cela dépend du projet : un site vitrine peut prendre 2 semaines,
                tandis qu’une stratégie marketing complète peut prendre plusieurs
                mois.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

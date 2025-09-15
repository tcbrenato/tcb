import React, { useState } from "react";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xnnbyzlk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || "Non spécifiée",
          service: formData.service,
          budget: formData.budget || "Non spécifié",
          timeline: formData.timeline || "Non spécifié",
          message: formData.message,
          _replyto: formData.email,
          _subject: `Nouvelle demande de projet - ${formData.name}`,
        }),
      });

      if (!response.ok) throw new Error("Erreur lors de l’envoi");

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
      alert("❌ Une erreur est survenue. Merci de réessayer !");
    }
  };

  return (
    <section className="py-16 px-6 lg:px-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Contactez-moi
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Vous avez un projet en tête ? Remplissez le formulaire ci-dessous et je
          reviendrai vers vous rapidement.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg"
        >
          {isSubmitted && (
            <p className="col-span-2 text-green-600 text-center font-medium">
              ✅ Merci ! Votre message a bien été envoyé.
            </p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Votre nom *"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Votre email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Votre entreprise"
            value={formData.company}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="service"
            placeholder="Service souhaité *"
            value={formData.service}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="text"
            name="budget"
            placeholder="Votre budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
          />
          <input
            type="text"
            name="timeline"
            placeholder="Délai souhaité"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
          />
          <textarea
            name="message"
            placeholder="Votre message *"
            value={formData.message}
            onChange={handleChange}
            className="col-span-2 w-full border p-3 rounded-lg focus:ring focus:ring-blue-300"
            rows={5}
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Envoyer ma demande
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

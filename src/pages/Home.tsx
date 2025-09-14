import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Code, Palette, Smartphone, TrendingUp, Users, Award, ArrowRight, Star } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = React.useRef<HTMLDivElement>(null);

  const titles = [
    "Créateur de solutions digitales",
    "Développeur web polyvalent",
    "Expert en UI/UX Design",
    "Spécialiste SEO & Marketing",
    "Gestionnaire de projets numériques"
  ];

  const { elementRef: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { elementRef: servicesRef, isVisible: servicesVisible } = useScrollAnimation();
  const { elementRef: testimonialRef, isVisible: testimonialVisible } = useScrollAnimation();

  // Typewriter pour les titres du hero
  useEffect(() => {
    const currentTitle = titles[currentIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentTitle.length) {
        setDisplayedText(currentTitle.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }, 5000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  // Carousel
  const [currentIndexSlide, setCurrentIndexSlide] = useState(0);
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndexSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  // Typewriter effect pour le bloc code du carousel
  const codeLines = [
    "import React from 'react';",
    "",
    "export default function App() {",
    "  return (",
    "    <div className='hero'>",
    "      <h1>Bienvenue sur mon site 🚀</h1>",
    "    </div>",
    "  );",
    "}"
  ];

  const [displayedCode, setDisplayedCode] = useState('');
  const [currentCodeLine, setCurrentCodeLine] = useState(0);

  useEffect(() => {
    if (currentIndexSlide === 2) { // slide "code"
      let charIndex = 0;
      setDisplayedCode('');
      const typeLine = () => {
        const interval = setInterval(() => {
          if (charIndex <= codeLines[currentCodeLine].length) {
            setDisplayedCode(prev => prev + codeLines[currentCodeLine][charIndex] || '');
            charIndex++;
          } else {
            clearInterval(interval);
            setDisplayedCode(prev => prev + '\n');
            setCurrentCodeLine(prev => prev + 1);
          }
        }, 30);
      };
      if (currentCodeLine < codeLines.length) typeLine();
    } else {
      setCurrentCodeLine(0);
      setDisplayedCode('');
    }
  }, [currentIndexSlide, currentCodeLine]);

  const stats = [
    { number: '50+', label: 'Projets Réalisés', icon: Code },
    { number: '30+', label: 'Clients Satisfaits', icon: Users },
    { number: '5+', label: 'Années d\'Expérience', icon: Award },
    { number: '99%', label: 'Taux de Satisfaction', icon: Star },
  ];

  const services = [
    { icon: Code, title: 'Développement Web', description: 'Sites web modernes, applications web performantes et plateformes e-commerce sur mesure.', color: 'bg-blue-500' },
    { icon: Smartphone, title: 'Applications Mobiles', description: 'Applications iOS et Android natives ou hybrides pour votre business mobile.', color: 'bg-green-500' },
    { icon: Palette, title: 'UI/UX Design', description: 'Interfaces utilisateur intuitives et expériences digitales exceptionnelles.', color: 'bg-purple-500' },
    { icon: TrendingUp, title: 'SEO & Marketing Digital', description: 'Stratégies digitales pour améliorer votre visibilité et générer plus de leads.', color: 'bg-orange-500' }
  ];

  const testimonials = [
    { name: "Marie Kouassi", role: "Directrice Marketing, TechCorp", content: "Rénato a transformé notre vision en une plateforme digitale exceptionnelle. Son expertise technique et sa créativité ont dépassé nos attentes.", rating: 5 },
    { name: "Jean-Baptiste Adé", role: "Founder, StartupBénin", content: "Un professionnel remarquable ! Il a su comprendre nos besoins et livrer une solution parfaitement adaptée à notre marché local.", rating: 5 },
    { name: "Fatou Diallo", role: "Propriétaire, BoutiqueMode", content: "Grâce à Rénato, notre boutique en ligne génère maintenant 70% de notre chiffre d'affaires. Une collaboration extraordinaire !", rating: 5 }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23195885%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div className="text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-gray-900 mb-4">
                Salut, je suis <span className="text-primary-500">Rénato</span>
              </h1>
              <div className="h-16 mb-6">
                <h2 className="text-xl md:text-2xl text-gray-600 font-medium">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Basé au Bénin, je transforme vos idées en solutions digitales innovantes. Passionné par la technologie, le design et l'impact positif du numérique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link to="/projects" className="bg-primary-500 text-white px-6 sm:px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2">
                  <span>Voir mes projets</span><ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/contact" className="border-2 border-primary-500 text-primary-500 px-6 sm:px-8 py-4 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300 hover:scale-105">
                  Discutons de votre projet
                </Link>
              </div>
            </div>

            {/* Carousel */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-96 lg:w-96 lg:h-[500px] rounded-2xl shadow-2xl overflow-hidden">
                {["https://i.ibb.co/3mGB2NVh/3c4ace58-6c2d-43ad-a572-765507174b05.jpg","/ren4.jpg","code"].map((slide, index) => {
                  const isActive = index === currentIndexSlide;
                  return (
                    <div key={index} className={`absolute w-full h-full transition-opacity duration-700 ${isActive ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
                      {slide === "code" ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900 p-4">
                          <pre className="text-green-400 font-mono text-sm rounded-lg w-[80%] max-w-md whitespace-pre-wrap">
                            {displayedCode}
                            <span className="animate-pulse">|</span>
                          </pre>
                        </div>
                      ) : (
                        <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover rounded-2xl" />
                      )}
                    </div>
                  )
                })}
                {/* Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                  {["0","1","2"].map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentIndexSlide(idx)} className={`w-3 h-3 rounded-full ${currentIndexSlide === idx ? "bg-white" : "bg-gray-500"}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-primary-500" />
        </div>
      </section>

      {/* Les autres sections restent identiques : Stats, Services, À propos, Témoignages, CTA */}
      {/* ... copier le code existant pour stats, services, testimonial, CTA ... */}
    </div>
  );
};

export default Home;

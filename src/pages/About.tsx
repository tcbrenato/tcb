import React from 'react';
import { Code, Palette, Globe, Award, Calendar, MapPin, Heart, Users, Target, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { elementRef: storyRef, isVisible: storyVisible } = useScrollAnimation();
  const { elementRef: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const { elementRef: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { elementRef: timelineRef, isVisible: timelineVisible } = useScrollAnimation();

  const skills = [
    {
      category: 'Développement',
      icon: Code,
      items: ['React', 'Node.js', 'PHP', 'JavaScript', 'TypeScript', 'Python'],
      color: 'bg-blue-500'
    },
    {
      category: 'Design',
      icon: Palette,
      items: ['UI/UX', 'Figma', 'Adobe Creative', 'Wireframing', 'Prototyping'],
      color: 'bg-purple-500'
    },
    {
      category: 'Marketing Digital',
      icon: TrendingUp,
      items: ['SEO', 'Google Ads', 'Analytics', 'Social Media', 'Content Strategy'],
      color: 'bg-green-500'
    },
    {
      category: 'Outils & Plateformes',
      icon: Globe,
      items: ['WordPress', 'Shopify', 'Git', 'Docker', 'AWS', 'Firebase'],
      color: 'bg-orange-500'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Chaque projet est abordé avec enthousiasme et dévouement pour créer des solutions exceptionnelles.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Je crois en la co-création avec mes clients pour des résultats qui dépassent les attentes.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Recherche constante de la perfection dans chaque détail, du code au design final.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Adoption des dernières technologies pour créer des solutions modernes et durables.'
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Débuts en Développement',
      description: 'Première immersion dans le monde du développement web avec HTML, CSS et JavaScript.'
    },
    {
      year: '2020',
      title: 'Formation Approfondie',
      description: 'Spécialisation en React et Node.js, premiers projets clients et freelance.'
    },
    {
      year: '2021',
      title: 'Expansion des Services',
      description: 'Intégration du design UI/UX et du marketing digital dans mon offre de services.'
    },
    {
      year: '2022',
      title: 'Solutions E-commerce',
      description: 'Développement d\'expertise en plateformes e-commerce et solutions pour PME.'
    },
    {
      year: '2023',
      title: 'Applications Mobiles',
      description: 'Extension vers le développement mobile et les solutions digitales complètes.'
    },
    {
      year: '2024',
      title: 'Leader Digital',
      description: 'Positionnement comme expert en transformation digitale au Bénin et en Afrique.'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section améliorée */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heroRef}
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              heroVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Photo principale avec double bordure */}
              <div className="order-2 lg:order-1">
                <div className="relative group">
                  {/* Bordure externe */}
                  <div className="absolute inset-0 bg-primary-500 rounded-2xl transform rotate-6 group-hover:rotate-3 transition-transform duration-500"></div>
                  {/* Bordure interne */}
                  <div className="absolute inset-1 rounded-2xl border-4 border-white shadow-xl"></div>
                  {/* Image */}
                  <img
                    src="/ren5.jpg"
                    alt="Rénato TCHOBO - Créateur de solutions digitales"
                    className="relative w-full max-w-md mx-auto rounded-2xl object-cover h-96 lg:h-[500px]"
                  />
                  {/* Badge disponibilité */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Disponible pour projets
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu textuel */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-6">
                  Salut, je suis <span className="text-primary-500">Rénato</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Créateur de solutions digitales passionné, je transforme les idées en expériences 
                  numériques exceptionnelles depuis le cœur de l'Afrique de l'Ouest.
                </p>
                
                {/* Infos rapides */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600 mb-8">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-primary-500" />
                    <span>Bénin, Afrique</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary-500" />
                    <span>5+ années d'expérience</span>
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="/projects"
                    className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Voir mes projets
                  </a>
                  <a
                    href="/contact"
                    className="border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all duration-300"
                  >
                    Discutons ensemble
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={storyRef}
            className={`max-w-6xl mx-auto transition-all duration-1000 ${
              storyVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-12 text-center">
              Mon Histoire
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Photos avec overlay */}
              {['ren4.jpg', 'ren5.jpg', 'ren6.jpg'].map((img, idx) => (
                <div key={idx} className="relative group">
                  <img 
                    src={`/${img}`} 
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute inset-0 bg-primary-500 bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">
                      {idx === 0 ? 'Dans mon élément' : idx === 1 ? 'Professionnel' : 'Authenticité'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Né au Bénin, j'ai toujours été fasciné par la technologie et son pouvoir de transformation. 
                Mon parcours a commencé par une curiosité pour le code, qui s'est rapidement transformée 
                en passion pour la création de solutions digitales qui ont un impact réel.
              </p>
              <p>
                Ce qui me motive chaque jour, c'est la possibilité de contribuer à la transformation 
                digitale de l'Afrique. Chaque projet est une opportunité de créer quelque chose d'unique, 
                de résoudre un problème concret et d'aider mes clients à atteindre leurs objectifs.
              </p>
              <p>
                Au-delà de la technique, je crois profondément en l'importance du design et de l'expérience 
                utilisateur. Une solution digitale ne doit pas seulement fonctionner, elle doit être 
                intuitive, belle et créer une connexion émotionnelle avec ses utilisateurs.
              </p>
              <div className="bg-primary-50 p-6 rounded-xl border-l-4 border-primary-500">
                <p className="text-primary-700 font-semibold text-xl italic">
                  "Mon objectif est simple : transformer vos idées les plus ambitieuses en réalités 
                  digitales qui dépassent vos attentes."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills, Values, Timeline, CTA Sections */}
      {/* ... (inchangées depuis ton code original) */}
    </div>
  );
};

export default About;

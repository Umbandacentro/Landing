import React, { useState, useEffect } from 'react';

// --- DADOS PADRÃO DO ATELIER CLÉO PEREIRA ---
const DEFAULT_CLEO_CONTENT = {
  header: {
    atelierName: "Atelier Cléo Pereira",
    tagline: "Costura Criativa & Carinho em Cada Detalhe",
    whatsappNumber: "5511999998888",
    whatsappLabel: "Encomende pelo WhatsApp",
  },
  hero: {
    badge: "Feito à Mão sob Encomenda",
    title: "Kits SPA personalizados feitos com carinho para presentear",
    subtitle: "Peças sob encomenda para quem entende que cuidar de quem amamos começa em casa. Envio seguro para todo o Brasil.",
    ctaText: "Encomende pelo WhatsApp",
    bgImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200",
  },
  about: {
    title: "Olá, eu sou a Cléo Pereira",
    subtitle: "Paixão pela costura criativa e pela arte de encantar através dos detalhes.",
    paragraph1: "No Atelier Cléo Pereira, cada costura carrega uma história. Especializada em peças funcionais e kits personalizados para o bem-estar e o lar, busco transformar tecidos selecionados em memórias afetivas.",
    paragraph2: "Seja para surpreender alguém especial com um Kit SPA exclusivo ou para deixar a rotina da sua casa mais charmosa, tudo aqui é produzido artesanalmente, sob medida para a sua necessidade.",
    imageUrl: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=800",
    experienceYears: "8+",
    experienceText: "Anos criando sorrisos artesanais"
  },
  services: [
    {
      id: "1",
      title: "Kit SPA Personalizado",
      description: "Nécessaire acolchoada, toalha de rosto aveludada e faixa para cabelo combinando para seu momento de autocuidado.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      tag: "Mais Pedido"
    },
    {
      id: "2",
      title: "Kit de Mesa & Cozinha",
      description: "Jogo americano impermeável, guardanapos de tecido e porta-talheres elegantes para receber quem você ama.",
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
      tag: "Lançamento"
    },
    {
      id: "3",
      title: "Touca Turbante & Acessórios",
      description: "Toucas de cetim e microfibra para cuidados capilares com acabamento impecável e elástico macio.",
      imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800",
      tag: "Exclusivo"
    },
    {
      id: "4",
      title: "Kit Gourmet Infantil",
      description: "Avental mini e touquinha de chef ajustáveis para momentos divertidos em família na cozinha.",
      imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800",
      tag: "Infantil"
    }
  ],
  forWhom: {
    title: "Feito para quem cuida de quem ama",
    items: [
      { id: "w1", title: "Para Presentear com Significado", desc: "Perfeito para aniversários, datas comemorativas ou lembranças marcantes." },
      { id: "w2", title: "Para Quem Ama Autocuidado", desc: "Peças macias e aconchegantes para transformar o banho em um ritual relaxante." },
      { id: "w3", title: "Para Deixar a Casa Aconchegante", desc: "Detalhes em tecido que trazem calor, cor e elegância para os ambientes." }
    ]
  },
  howItWorks: {
    title: "Como encomendar sua peça exclusiva",
    steps: [
      { step: "01", title: "Conte sua ideia pelo WhatsApp", desc: "Clique no botão e fale direto comigo para escolher estampas e modelos." },
      { step: "02", title: "Escolhemos juntas os detalhes", desc: "Definimos os tecidos, cores, bordados e prazos de confecção." },
      { step: "03", title: "Produção e Envio com Carinho", desc: "Sua peça é costurada à mão, embalada com perfume especial e enviada." }
    ]
  },
  differentials: {
    title: "Por que escolher o Atelier Cléo Pereira?",
    subtitle: "Compromisso com o acabamento perfeito e atendimento acolhedor do início ao fim.",
    imageUrl: "https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=800",
    list: [
      "Peças 100% personalizadas sob encomenda",
      "Tecidos de alta qualidade e pré-lavados (não encolhem)",
      "Atendimento atencioso e direto no WhatsApp com a artesã",
      "Embalagem especial pronta para presentear",
      "Envio seguro com rastreamento para todo o Brasil"
    ]
  },
  ctaBanner: {
    title: "Cuidar de quem você ama começa com um presente feito à mão.",
    subtitle: "Entre em contato agora mesmo e monte seu kit exclusivo comigo!",
    buttonText: "Falar com a Cléo no WhatsApp"
  },
  footer: {
    instagram: "@ateliercleopereira",
    instagramUrl: "https://instagram.com",
    address: "Ateliê em São Paulo, SP - Envio para todo o Brasil",
    copyright: "© 2026 Atelier Cléo Pereira. Todos os direitos reservados."
  }
};

const CRAFT_PRESET_IMAGES = [
  { label: "Kit SPA Toalhas", url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200" },
  { label: "Costura & Linhas", url: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=800" },
  { label: "Tecidos Artesanais", url: "https://images.unsplash.com/photo-1528458909336-e7a0adfac1d5?auto=format&fit=crop&q=80&w=800" },
  { label: "Mesa Posta Tecido", url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800" },
  { label: "Acessórios SPA", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('cleo_atelier_content');
      return saved ? JSON.parse(saved) : DEFAULT_CLEO_CONTENT;
    } catch (e) {
      return DEFAULT_CLEO_CONTENT;
    }
  });

  const [notification, setNotification] = useState('');

  const handleSave = (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem('cleo_atelier_content', JSON.stringify(newContent));
      showNotification('Alterações do Atelier salvas com sucesso!');
    } catch (e) {
      showNotification('Erro ao salvar no navegador.', true);
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja restaurar as informações originais do Atelier Cléo Pereira?")) {
      setContent(DEFAULT_CLEO_CONTENT);
      localStorage.removeItem('cleo_atelier_content');
      showNotification('Dados restaurados para os padrões originais!');
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const getWhatsappUrl = (customText) => {
    const cleanNum = content.header.whatsappNumber.replace(/\D/g, '');
    const defaultMsg = encodeURIComponent(customText || "Olá Cléo! Vi o site do Atelier e gostaria de encomendar um kit exclusivo.");
    return `https://wa.me/${cleanNum}?text=${defaultMsg}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-amber-950 font-sans selection:bg-rose-200 selection:text-rose-950">
      
      {/* BARRA SUPERIOR */}
      <nav className="sticky top-0 z-50 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-rose-700/10 border border-rose-700/30 flex items-center justify-center text-rose-800 shadow-inner">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-950 block leading-none">
                  {content.header.atelierName}
                </span>
                <span className="text-[10px] sm:text-xs text-rose-800 tracking-wider uppercase font-medium">
                  {content.header.tagline}
                </span>
              </div>
            </div>

            {activeTab === 'landing' && (
              <div className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-semibold text-amber-900/70">
                <a href="#sobre" className="hover:text-rose-800 transition-colors">Sobre</a>
                <a href="#servicos" className="hover:text-rose-800 transition-colors">Encomendas</a>
                <a href="#para-quem" className="hover:text-rose-800 transition-colors">Para Quem É</a>
                <a href="#como-funciona" className="hover:text-rose-800 transition-colors">Como Funciona</a>
                <a href="#diferenciais" className="hover:text-rose-800 transition-colors">Diferenciais</a>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <div className="flex bg-amber-900/5 p-1 rounded-full border border-amber-900/10">
                <button
                  onClick={() => setActiveTab('landing')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeTab === 'landing' ? 'bg-rose-800 text-white shadow-md' : 'text-amber-900/70 hover:text-amber-950'
                  }`}
                >
                  Ver Site
                </button>
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeTab === 'admin' ? 'bg-rose-800 text-white shadow-md' : 'text-amber-900/70 hover:text-amber-950'
                  }`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Painel Admin</span>
                </button>
              </div>

              {activeTab === 'landing' && (
                <a
                  href={getWhatsappUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md shadow-emerald-700/20 transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  <span>{content.header.whatsappLabel}</span>
                </a>
              )}
            </div>

          </div>
        </div>
      </nav>

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 bg-amber-950 text-rose-200 rounded-2xl shadow-2xl border border-rose-800/40 text-xs font-medium">
          <span>✨ {notification}</span>
        </div>
      )}

      <main>
        {activeTab === 'landing' ? (
          <LandingPage content={content} getWhatsappUrl={getWhatsappUrl} onOpenAdmin={() => setActiveTab('admin')} />
        ) : (
          <AdminPanel content={content} onSave={handleSave} onReset={handleReset} />
        )}
      </main>

    </div>
  );
}

function LandingPage({ content, getWhatsappUrl, onOpenAdmin }) {
  const { hero, about, services, forWhom, howItWorks, differentials, ctaBanner, footer } = content;

  return (
    <div className="relative overflow-hidden">
      
      <button
        onClick={onOpenAdmin}
        className="fixed bottom-6 left-6 z-40 flex items-center space-x-2 px-4 py-2.5 bg-amber-950/90 text-amber-100 backdrop-blur-md text-xs font-semibold rounded-full shadow-2xl border border-amber-700/40 hover:bg-rose-900 transition-all"
      >
        <span>⚙️ Editar Conteúdo</span>
      </button>

      <a
        href={getWhatsappUrl("Olá Cléo! Vim pelo botão do site e quero saber mais sobre suas peças.")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110 flex items-center justify-center border-2 border-white"
        title="Falar no WhatsApp"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
      </a>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {hero.badge && (
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-900/10 border border-rose-900/20 text-rose-900 text-xs font-semibold uppercase tracking-widest">
                  <span>❤️</span>
                  <span>{hero.badge}</span>
                </div>
              )}

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-950 tracking-tight leading-tight">
                {hero.title}
              </h1>

              <p className="text-base sm:text-lg text-amber-900/80 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
                {hero.subtitle}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={getWhatsappUrl("Olá Cléo! Quero encomendar um Kit SPA exclusivo.")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-full shadow-xl transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                  <span>{hero.ctaText}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                  <img src={hero.bgImage} alt="Kit SPA Cléo Pereira" className="w-full h-[420px] object-cover object-center" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-20 bg-white border-y border-amber-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <img src={about.imageUrl} alt="Cléo Pereira" className="rounded-3xl shadow-2xl object-cover w-full h-[460px] border-8 border-[#FAF7F2]" />
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">Artesã & Criadora</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950">{about.title}</h2>
              <p className="text-rose-900/80 font-medium italic text-lg">"{about.subtitle}"</p>
              <div className="space-y-4 text-amber-900/80 leading-relaxed font-light text-base">
                <p>{about.paragraph1}</p>
                <p>{about.paragraph2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-800">Catálogo do Atelier</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950">Peças feitas sob encomenda</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-lg flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {item.tag && <span className="absolute top-3 right-3 bg-rose-800 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">{item.tag}</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-950 mb-2">{item.title}</h3>
                    <p className="text-xs text-amber-900/70">{item.description}</p>
                  </div>
                  <a href={getWhatsappUrl(`Olá Cléo! Tenho interesse no ${item.title}.`)} target="_blank" rel="noreferrer" className="pt-3 border-t text-xs font-bold text-emerald-700">Pedir pelo WhatsApp →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section id="para-quem" className="py-20 bg-rose-950 text-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">{forWhom.title}</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {forWhom.items.map((w, idx) => (
            <div key={w.id || idx} className="bg-rose-900/40 border border-rose-800/60 p-8 rounded-3xl space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">{w.title}</h3>
              <p className="text-xs text-rose-200/80">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950">{howItWorks.title}</h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.steps.map((st, i) => (
            <div key={i} className="p-8 rounded-3xl bg-[#FAF7F2] border border-amber-900/10 space-y-4">
              <span className="font-serif text-4xl font-bold text-rose-800/30">{st.step}</span>
              <h3 className="font-serif text-lg font-bold text-amber-950">{st.title}</h3>
              <p className="text-xs text-amber-900/70">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="py-20 bg-[#FAF7F2] border-t border-amber-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950">{differentials.title}</h2>
            <ul className="space-y-4 pt-2">
              {differentials.list.map((item, index) => (
                <li key={index} className="flex items-start space-x-3 text-xs sm:text-sm text-amber-900 font-medium">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <img src={differentials.imageUrl} alt="Diferenciais" className="rounded-3xl shadow-xl object-cover w-full h-[400px]" />
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-rose-900 to-amber-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-bold">{ctaBanner.title}</h2>
          <p className="text-rose-200 text-base">{ctaBanner.subtitle}</p>
          <a href={getWhatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-full shadow-2xl uppercase tracking-wider">
            <span>{ctaBanner.buttonText}</span>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-amber-950 text-amber-200/80 py-12 border-t border-amber-900/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-amber-900/40">
          <div>
            <p className="font-serif text-lg font-bold text-white mb-2">{content.header.atelierName}</p>
            <p className="text-amber-300/70">{content.header.tagline}</p>
          </div>
          <div>
            <p className="font-bold text-white uppercase mb-2">Contato</p>
            <p>WhatsApp: {content.header.whatsappNumber}</p>
            <p className="mt-1">{footer.instagram}</p>
          </div>
          <div>
            <p className="font-bold text-white uppercase mb-2">Atendimento</p>
            <p>{footer.address}</p>
          </div>
        </div>
        <div className="pt-8 text-center text-amber-400/50">
          <p>{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

function AdminPanel({ content, onSave, onReset }) {
  const [formData, setFormData] = useState(content);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => { setFormData(content); }, [content]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleServiceChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const handleAddService = () => {
    const newService = {
      id: Date.now().toString(),
      title: "Nova Peça Artesanal",
      description: "Descrição detalhada do novo produto.",
      imageUrl: CRAFT_PRESET_IMAGES[0].url,
      tag: "Novo"
    };
    setFormData(prev => ({ ...prev, services: [...prev.services, newService] }));
  };

  const handleDeleteService = (id) => {
    if (formData.services.length <= 1) {
      alert("O site precisa manter ao menos 1 peça.");
      return;
    }
    setFormData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-amber-900/10 gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-amber-950 flex items-center space-x-2">
            <span>⚙️ Painel CMS - Atelier Cléo Pereira</span>
          </h1>
          <p className="text-xs text-amber-900/70 mt-1">Altere textos, imagens ou WhatsApp em tempo real.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onReset} className="px-4 py-2 text-xs font-semibold text-rose-800 bg-rose-50 rounded-full border border-rose-200">Restaurar Originais</button>
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-rose-800 text-white font-bold text-xs rounded-full shadow-lg">Salvar Alterações</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-3 space-y-2">
          <button onClick={() => setActiveTab('hero')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase ${activeTab === 'hero' ? 'bg-rose-800 text-white' : 'bg-white text-amber-900'}`}>1. Hero & WhatsApp</button>
          <button onClick={() => setActiveTab('about')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase ${activeTab === 'about' ? 'bg-rose-800 text-white' : 'bg-white text-amber-900'}`}>2. Sobre a Cléo</button>
          <button onClick={() => setActiveTab('services')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase ${activeTab === 'services' ? 'bg-rose-800 text-white' : 'bg-white text-amber-900'}`}>3. Catálogo de Peças</button>
          <button onClick={() => setActiveTab('diferenciais')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase ${activeTab === 'diferenciais' ? 'bg-rose-800 text-white' : 'bg-white text-amber-900'}`}>4. Diferenciais & CTA</button>
        </div>

        <div className="lg:col-span-9">
          <form onSubmit={handleSubmit} className="bg-white border border-amber-900/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            {activeTab === 'hero' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-amber-950 pb-2 border-b">Configurações do Banner Principal</h3>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">WhatsApp (com DDD)</label>
                  <input type="text" value={formData.header.whatsappNumber} onChange={(e) => handleChange('header', 'whatsappNumber', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Título Principal</label>
                  <textarea rows={2} value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Subtítulo</label>
                  <textarea rows={3} value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">URL da Imagem</label>
                  <input type="url" value={formData.hero.bgImage} onChange={(e) => handleChange('hero', 'bgImage', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm mb-2" />
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-amber-950 pb-2 border-b">Sobre a Cléo</h3>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Título</label>
                  <input type="text" value={formData.about.title} onChange={(e) => handleChange('about', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Subtítulo</label>
                  <input type="text" value={formData.about.subtitle} onChange={(e) => handleChange('about', 'subtitle', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Parágrafo 1</label>
                  <textarea rows={3} value={formData.about.paragraph1} onChange={(e) => handleChange('about', 'paragraph1', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Parágrafo 2</label>
                  <textarea rows={3} value={formData.about.paragraph2} onChange={(e) => handleChange('about', 'paragraph2', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b">
                  <h3 className="font-serif text-lg font-bold text-amber-950">Catálogo de Peças</h3>
                  <button type="button" onClick={handleAddService} className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-full">+ Adicionar</button>
                </div>
                <div className="space-y-6">
                  {formData.services.map((item, index) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#FAF7F2] border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-800">Peça #{index + 1}</span>
                        <button type="button" onClick={() => handleDeleteService(item.id)} className="text-rose-700">Excluir</button>
                      </div>
                      <input type="text" value={item.title} onChange={(e) => handleServiceChange(item.id, 'title', e.target.value)} className="w-full bg-white border p-2 rounded text-sm" />
                      <textarea rows={2} value={item.description} onChange={(e) => handleServiceChange(item.id, 'description', e.target.value)} className="w-full bg-white border p-2 rounded text-sm" />
                      <input type="url" value={item.imageUrl} onChange={(e) => handleServiceChange(item.id, 'imageUrl', e.target.value)} className="w-full bg-white border p-2 rounded text-sm" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'diferenciais' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-amber-950 pb-2 border-b">Diferenciais e CTA</h3>
                <input type="text" value={formData.differentials.title} onChange={(e) => handleChange('differentials', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
                <textarea rows={2} value={formData.ctaBanner.title} onChange={(e) => handleChange('ctaBanner', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
              </div>
            )}

            <div className="pt-4 border-t flex justify-end">
              <button type="submit" className="px-8 py-3 bg-rose-800 text-white font-bold text-xs rounded-full uppercase">Salvar Tudo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
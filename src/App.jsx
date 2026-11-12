import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { 
  Heart, 
  ShoppingBag, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  Send, 
  Scissors, 
  Settings, 
  RotateCcw, 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Type, 
  LayoutGrid, 
  Phone,
  Share2, 
  ExternalLink,
  ChevronRight,
  Award,
  Package,
  Truck
} from 'lucide-react';

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" />
    <path d="M12 2C6.486 2 2 6.486 2 12c0 1.825.494 3.535 1.352 5.006L2 22l5.134-1.346A9.947 9.947 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18.182c-1.584 0-3.068-.452-4.331-1.233l-.311-.192-3.224.845.86-3.142-.211-.325A8.144 8.144 0 013.818 12c0-4.511 3.671-8.182 8.182-8.182s8.182 3.671 8.182 8.182-3.671 8.182-8.182 8.182z" />
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// --- DADOS COMPLETOS ORIGINAIS DO ATELIER CLÉO PEREIRA ---
const DEFAULT_CLEO_CONTENT = {
  header: {
    atelierName: "Atelier Cléo Pereira",
    tagline: "Costura Criativa & Carinho em Cada Detalhe",
    whatsappNumber: "5511999998888",
    whatsappLabel: "Encomende pelo WhatsApp",
  },
  branding: {
    siteName: "Atelier Cléo Pereira",
    tagline: "COSTURA CRIATIVA & CARINHO EM CADA DETALHE",
    logoUrl: "", 
    fontStyle: "serif" // 'serif', 'sans', 'cursive'
  },
  hero: {
    badge: "Feito à Mão sob Encomenda",
    title: "Kits SPA e Jogos personalizados feitos com carinho para presentear",
    subtitle: "Peças sob encomenda para quem entende que cuidar de quem amamos começa em casa. Envio seguro para todo o Brasil.",
    ctaText: "Encomende pelo WhatsApp",
    bgImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1200",
  },
  about: {
    title: "Olá, eu sou a Cléo Pereira",
    subtitle: "Paixão pela costura criativa e pela arte de encantar através dos detalhes.",
    paragraph1: "No Atelier Cléo Pereira, cada costura carrega uma história. Especializada em peças funcionais, jogos de cama, mesa e kits personalizados para o bem-estar e o lar, busco transformar tecidos selecionados em memórias afetivas.",
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
    },
    {
      id: "5",
      title: "Jogos Americanos & Toalhas de Chá",
      description: "Jogos completos em tecido nobre com acabamento impecável para embelezar o momento das refeições e do chá.",
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
      tag: "Mesa Posta"
    },
    {
      id: "6",
      title: "Jogos de Cama & Almofadas Decorativas",
      description: "Jogos de fronhas e almofadas personalizadas para dar um toque acolhedor, elegante e exclusivo ao quarto.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      tag: "Lar & Conforto"
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
    facebook: "/ateliercleopereira",
    facebookUrl: "https://facebook.com",
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
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [content, setContent] = useState(DEFAULT_CLEO_CONTENT);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const checkRoute = () => {
      setIsAdminRoute(window.location.pathname.includes('/acp'));
    };
    checkRoute();
    window.addEventListener('popstate', checkRoute);

    if (supabase && supabase.auth) {
      supabase.auth.getSession().then(({ data }) => {
        setSession(data?.session || null);
      }).catch(() => setSession(null));

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      fetchContentFromSupabase();

      return () => {
        window.removeEventListener('popstate', checkRoute);
        if (authListener?.subscription) authListener.subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const fetchContentFromSupabase = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('landing_content')
        .select('content')
        .eq('id', 'cleo_content')
        .maybeSingle();

      if (data && data.content && typeof data.content === 'object') {
        setContent({
          ...DEFAULT_CLEO_CONTENT,
          ...data.content,
          branding: { ...DEFAULT_CLEO_CONTENT.branding, ...(data.content.branding || {}) },
          footer: { ...DEFAULT_CLEO_CONTENT.footer, ...(data.content.footer || {}) }
        });
      }
    } catch (err) {
      console.warn("Usando conteúdo padrão:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToSupabase = async (newContent) => {
    if (!session) {
      alert('Você precisa estar autenticado no painel.');
      return;
    }

    try {
      const { error } = await supabase
        .from('landing_content')
        .upsert({ id: 'cleo_content', content: newContent, updated_at: new Date() });

      if (error) throw error;

      setContent(newContent);
      showNotification('Alterações salvas com sucesso no Supabase!');
    } catch (e) {
      alert('Erro ao salvar no Supabase: ' + e.message);
    }
  };

  const handleReset = () => {
    if (window.confirm("Deseja restaurar as informações originais do Atelier Cléo Pereira?")) {
      setContent(DEFAULT_CLEO_CONTENT);
      showNotification('Dados restaurados para os padrões originais!');
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const getWhatsappUrl = (customText) => {
    const cleanNum = (content.header?.whatsappNumber || "5511999998888").replace(/\D/g, '');
    const defaultMsg = encodeURIComponent(customText || "Olá Cléo! Vi o site do Atelier e gostaria de encomendar um kit exclusivo.");
    return `https://wa.me/${cleanNum}?text=${defaultMsg}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-amber-950 font-serif">
        <p className="animate-pulse text-lg">Carregando Atelier Cléo Pereira...</p>
      </div>
    );
  }

  const safeContent = content || DEFAULT_CLEO_CONTENT;
  const branding = safeContent.branding || DEFAULT_CLEO_CONTENT.branding;

  const fontClass = 
    branding.fontStyle === 'sans' ? 'font-sans' :
    branding.fontStyle === 'cursive' ? 'font-serif italic' : 'font-serif';

  // ROTA SECRETA /acp (Painel Admin)
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-amber-950 font-sans p-4 sm:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-amber-900/15">
            <div>
              <h1 className="font-serif text-2xl font-bold text-amber-950 flex items-center space-x-2">
                <Settings className="w-6 h-6 text-rose-800" />
                <span>Painel CMS Restrito (/acp)</span>
              </h1>
              <p className="text-xs text-amber-900/70">Gestão completa de identidade visual, logótipo, textos, imagens, catálogo e redes sociais.</p>
            </div>
            <a href="/" className="text-xs font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full border border-rose-200 transition-colors">Ver Site Público</a>
          </div>

          {session ? (
            <AdminPanel 
              content={safeContent} 
              onSave={handleSaveToSupabase} 
              onReset={handleReset} 
              onLogout={() => supabase.auth.signOut()} 
            />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    );
  }

  // SITE PÚBLICO
  return (
    <div className={`min-h-screen bg-[#FAF7F2] text-amber-950 selection:bg-rose-200 selection:text-rose-950 ${fontClass}`}>
      <nav className="sticky top-0 z-50 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              {branding.logoUrl ? (
                <img 
                  src={branding.logoUrl} 
                  alt={branding.siteName || "Logo"} 
                  className="w-12 h-12 rounded-full object-cover border border-rose-900/20 shadow-sm"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-rose-700/10 border border-rose-700/30 flex items-center justify-center text-rose-800 shadow-inner">
                  <Scissors className="w-5 h-5" />
                </div>
              )}
              <div>
                <span className={`text-xl sm:text-2xl font-bold tracking-tight text-amber-950 block leading-none ${fontClass}`}>
                  {branding.siteName || safeContent.header.atelierName}
                </span>
                <span className="text-[10px] sm:text-xs text-rose-800 tracking-wider uppercase font-medium">
                  {branding.tagline || safeContent.header.tagline}
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-widest font-semibold text-amber-900/70">
              <a href="#sobre" className="hover:text-rose-800 transition-colors">Sobre</a>
              <a href="#servicos" className="hover:text-rose-800 transition-colors">Encomendas</a>
              <a href="#para-quem" className="hover:text-rose-800 transition-colors">Para Quem É</a>
              <a href="#como-funciona" className="hover:text-rose-800 transition-colors">Como Funciona</a>
              <a href="#diferenciais" className="hover:text-rose-800 transition-colors">Diferenciais</a>
            </div>

            <div>
              <a
                href={getWhatsappUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md shadow-emerald-700/20 transition-all hover:scale-105 whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{safeContent.header.whatsappLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 bg-amber-950 text-rose-200 rounded-2xl shadow-2xl border border-rose-800/40 animate-bounce text-xs font-medium">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>{notification}</span>
        </div>
      )}

      <main>
        <LandingPage content={safeContent} getWhatsappUrl={getWhatsappUrl} />
      </main>
    </div>
  );
}

function LandingPage({ content, getWhatsappUrl }) {
  const safeContent = content || {};
  const hero = safeContent.hero || {};
  const about = safeContent.about || {};
  const services = safeContent.services || [];
  const forWhom = safeContent.forWhom || { items: [] };
  const howItWorks = safeContent.howItWorks || { steps: [] };
  const differentials = safeContent.differentials || { list: [] };
  const ctaBanner = safeContent.ctaBanner || {};
  const footer = safeContent.footer || {};

  return (
    <div className="relative overflow-hidden">
      <a
        href={getWhatsappUrl("Olá Cléo! Vim pelo botão do site e quero saber mais sobre suas peças.")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/40 transition-transform hover:scale-110 flex items-center justify-center border-2 border-white"
        title="Falar no WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      {/* HERO */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {hero.badge && (
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-rose-900/10 border border-rose-900/20 text-rose-900 text-xs font-semibold uppercase tracking-widest">
                  <Heart className="w-3.5 h-3.5 fill-rose-800 text-rose-800" />
                  <span>{hero.badge}</span>
                </div>
              )}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-950 tracking-tight leading-tight">
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
                  className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-full shadow-xl shadow-emerald-700/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group uppercase tracking-wider"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>{hero.ctaText}</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-rose-200 to-amber-200 opacity-60 blur-lg"></div>
                <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                  <img src={hero.bgImage} alt="Kit SPA Cléo Pereira" className="w-full h-[420px] object-cover object-center transform hover:scale-105 transition-transform duration-700" />
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
              <h2 className="text-3xl sm:text-4xl font-bold text-amber-950">{about.title}</h2>
              <p className="text-rose-900/80 font-medium italic text-lg">"{about.subtitle}"</p>
              <div className="space-y-4 text-amber-900/80 leading-relaxed font-light text-base">
                <p>{about.paragraph1}</p>
                <p>{about.paragraph2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO DE PEÇAS & JOGOS */}
      <section id="servicos" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-800">Catálogo do Atelier</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-950">Peças, Jogos e Kits sob Encomenda</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-amber-900/10 shadow-lg flex flex-col group">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {item.tag && <span className="absolute top-3 right-3 bg-rose-800 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md">{item.tag}</span>}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 mb-2">{item.title}</h3>
                    <p className="text-xs text-amber-900/70 font-light">{item.description}</p>
                  </div>
                  <a href={getWhatsappUrl(`Olá Cléo! Tenho interesse no ${item.title}.`)} target="_blank" rel="noreferrer" className="pt-3 border-t border-amber-900/5 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span>Pedir pelo WhatsApp</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section id="para-quem" className="py-20 bg-rose-950 text-rose-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300">Carinho em Cada Traço</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{forWhom.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {forWhom.items.map((w, idx) => (
              <div key={w.id || idx} className="bg-rose-900/40 border border-rose-800/60 p-8 rounded-3xl space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-800/60 border border-rose-700/60 flex items-center justify-center text-rose-200">
                  <Heart className="w-6 h-6 fill-rose-300" />
                </div>
                <h3 className="text-xl font-bold text-white">{w.title}</h3>
                <p className="text-xs text-rose-200/80 leading-relaxed font-light">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-800">Passo a Passo</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-amber-950">{howItWorks.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.steps.map((st, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#FAF7F2] border border-amber-900/10 space-y-4">
                <span className="text-4xl font-bold text-rose-800/30 block">{st.step}</span>
                <h3 className="text-lg font-bold text-amber-950">{st.title}</h3>
                <p className="text-xs text-amber-900/70 leading-relaxed font-light">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="py-20 bg-[#FAF7F2] border-t border-amber-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-800">Diferenciais do Atelier</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-amber-950">{differentials.title}</h2>
              <p className="text-sm text-amber-900/70">{differentials.subtitle}</p>
              <ul className="space-y-4 pt-2">
                {differentials.list.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3 text-xs sm:text-sm text-amber-900 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <img src={differentials.imageUrl} alt="Diferenciais" className="rounded-3xl shadow-xl object-cover w-full h-[400px] border-4 border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-gradient-to-r from-rose-900 to-amber-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Sparkles className="w-8 h-8 text-rose-300 mx-auto" />
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">{ctaBanner.title}</h2>
          <p className="text-rose-200 text-base max-w-xl mx-auto font-light">{ctaBanner.subtitle}</p>
          <div className="pt-4">
            <a href={getWhatsappUrl("Olá Cléo! Quero montar meu presente sob medida!")} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-full shadow-2xl uppercase tracking-wider">
              <WhatsAppIcon className="w-5 h-5" />
              <span>{ctaBanner.buttonText}</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-amber-950 text-amber-200/80 py-12 border-t border-amber-900/40 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-amber-900/40">
            <div>
              <p className="text-lg font-bold text-white mb-2">{content.header?.atelierName}</p>
              <p className="text-amber-300/70 font-light">{content.header?.tagline}</p>
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider mb-2">Contato & Redes</p>
              <ul className="space-y-2.5">
                {footer.instagram && (
                  <li>
                    <a href={footer.instagramUrl || "https://instagram.com"} target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors">
                      <InstagramIcon className="w-4 h-4 text-rose-400" />
                      <span>{footer.instagram}</span>
                    </a>
                  </li>
                )}
                {footer.facebook && (
                  <li>
                    <a href={footer.facebookUrl || "https://facebook.com"} target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-white transition-colors">
                      <FacebookIcon className="w-4 h-4 text-blue-400" />
                      <span>{footer.facebook}</span>
                    </a>
                  </li>
                )}
                <li className="flex items-center space-x-2">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp: {content.header?.whatsappNumber}</span>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white uppercase tracking-wider mb-2">Atendimento</p>
              <p className="font-light">{footer.address}</p>
            </div>
          </div>
          <div className="pt-8 text-center text-amber-400/50">
            <p>{footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setErrorMsg(error.message);
  };

  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white border border-amber-900/10 rounded-3xl shadow-xl space-y-4">
      <h2 className="font-serif text-2xl font-bold text-amber-950 text-center">Entrar no Painel CMS</h2>
      {errorMsg && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">{errorMsg}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase mb-1">E-mail</label>
          <input type="email" required placeholder="admin@atelier.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase mb-1">Senha</label>
          <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
        </div>
        <button type="submit" className="w-full py-3 bg-rose-800 text-white font-bold text-xs rounded-full uppercase shadow-lg hover:bg-rose-900">Entrar</button>
      </form>
    </div>
  );
}

function AdminPanel({ content, onSave, onReset, onLogout }) {
  const [formData, setFormData] = useState(content);
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
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
      description: "Descrição detalhada do novo produto feito sob encomenda.",
      imageUrl: CRAFT_PRESET_IMAGES[0].url,
      tag: "Novo"
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const handleDeleteService = (id) => {
    if (formData.services.length <= 1) {
      alert("O site precisa manter ao menos 1 peça no catálogo.");
      return;
    }
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const safeBranding = formData.branding || DEFAULT_CLEO_CONTENT.branding;
  const safeFooter = formData.footer || DEFAULT_CLEO_CONTENT.footer;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-amber-900/10 shadow-sm">
        <span className="text-xs font-semibold text-emerald-800">Sessão ativa com segurança (Supabase Auth)</span>
        <div className="flex space-x-2">
          <button onClick={onReset} className="text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">Restaurar Padrão</button>
          <button onClick={onLogout} className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">Encerrar Sessão</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 space-y-2">
          <button type="button" onClick={() => setActiveTab('hero')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${activeTab === 'hero' ? 'bg-rose-800 text-white shadow-md' : 'bg-white text-amber-900 hover:bg-rose-50 border border-amber-900/10'}`}>
            <Type className="w-4 h-4" />
            <span>1. Hero, Logo & Tipografia</span>
          </button>
          <button type="button" onClick={() => setActiveTab('about')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${activeTab === 'about' ? 'bg-rose-800 text-white shadow-md' : 'bg-white text-amber-900 hover:bg-rose-50 border border-amber-900/10'}`}>
            <Scissors className="w-4 h-4" />
            <span>2. Sobre a Cléo</span>
          </button>
          <button type="button" onClick={() => setActiveTab('services')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${activeTab === 'services' ? 'bg-rose-800 text-white shadow-md' : 'bg-white text-amber-900 hover:bg-rose-50 border border-amber-900/10'}`}>
            <LayoutGrid className="w-4 h-4" />
            <span>3. Catálogo & Jogos ({formData.services.length})</span>
          </button>
          <button type="button" onClick={() => setActiveTab('diferenciais')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${activeTab === 'diferenciais' ? 'bg-rose-800 text-white shadow-md' : 'bg-white text-amber-900 hover:bg-rose-50 border border-amber-900/10'}`}>
            <Award className="w-4 h-4" />
            <span>4. Diferenciais & CTA</span>
          </button>
          <button type="button" onClick={() => setActiveTab('footer')} className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 ${activeTab === 'footer' ? 'bg-rose-800 text-white shadow-md' : 'bg-white text-amber-900 hover:bg-rose-50 border border-amber-900/10'}`}>
            <Share2 className="w-4 h-4" />
            <span>5. Redes Sociais & Rodapé</span>
          </button>
        </div>

        <div className="lg:col-span-9">
          <form onSubmit={handleSubmit} className="bg-white border border-amber-900/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-amber-950 pb-2 border-b border-amber-900/10">Identidade Visual, Logo e Tipografia</h3>
                
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-amber-900/10 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-amber-950">Logotipo & Cabeçalho</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Nome do Atelier</label>
                      <input 
                        type="text" 
                        value={safeBranding.siteName} 
                        onChange={(e) => handleChange('branding', 'siteName', e.target.value)} 
                        className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Subtítulo / Slogan</label>
                      <input 
                        type="text" 
                        value={safeBranding.tagline} 
                        onChange={(e) => handleChange('branding', 'tagline', e.target.value)} 
                        className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">URL da Imagem do Logo</label>
                      <input 
                        type="url" 
                        placeholder="https://... (deixe vazio para usar a tesoura)"
                        value={safeBranding.logoUrl} 
                        onChange={(e) => handleChange('branding', 'logoUrl', e.target.value)} 
                        className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Tipo de Texto / Tipografia</label>
                      <select 
                        value={safeBranding.fontStyle} 
                        onChange={(e) => handleChange('branding', 'fontStyle', e.target.value)} 
                        className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950"
                      >
                        <option value="serif">Clássico Editorial (Serifado)</option>
                        <option value="sans">Moderno & Limpo (Sem Serifa)</option>
                        <option value="cursive">Artesanal & Delicado (Itálico)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <h4 className="font-serif text-sm font-bold text-amber-950 border-b border-amber-900/10 pb-2">Configurações do Banner Principal e Contato</h4>
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Número do WhatsApp (com DDD)</label>
                    <input type="text" value={formData.header.whatsappNumber} onChange={(e) => handleChange('header', 'whatsappNumber', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Selo / Badge de Destaque</label>
                    <input type="text" value={formData.hero.badge} onChange={(e) => handleChange('hero', 'badge', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Título Principal (H1)</label>
                    <textarea rows={2} value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber-900 uppercase mb-1">Subtítulo / Descrição</label>
                    <textarea rows={3} value={formData.hero.subtitle} onChange={(e) => handleChange('hero', 'subtitle', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase mb-1">URL da Imagem do Hero</label>
                    <input type="url" value={formData.hero.bgImage} onChange={(e) => handleChange('hero', 'bgImage', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950 mb-2" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-amber-950 pb-2 border-b border-amber-900/10">Editar História e Foto da Cléo</h3>
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Título da Seção Sobre</label>
                  <input type="text" value={formData.about.title} onChange={(e) => handleChange('about', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Frase de Destaque / Subtítulo</label>
                  <input type="text" value={formData.about.subtitle} onChange={(e) => handleChange('about', 'subtitle', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Primeiro Parágrafo</label>
                  <textarea rows={3} value={formData.about.paragraph1} onChange={(e) => handleChange('about', 'paragraph1', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Segundo Parágrafo</label>
                  <textarea rows={3} value={formData.about.paragraph2} onChange={(e) => handleChange('about', 'paragraph2', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">URL da Foto da Cléo</label>
                  <input type="url" value={formData.about.imageUrl} onChange={(e) => handleChange('about', 'imageUrl', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-amber-900/10">
                  <h3 className="font-serif text-lg font-bold text-amber-950">Gerenciar Peças, Jogos e Kits sob Encomenda</h3>
                  <button type="button" onClick={handleAddService} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Peça/Jogo</span>
                  </button>
                </div>
                <div className="space-y-6">
                  {formData.services.map((item, index) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#FAF7F2] border border-amber-900/10 space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-800 uppercase">Item #{index + 1}</span>
                        <button type="button" onClick={() => handleDeleteService(item.id)} className="text-rose-700 hover:text-rose-900 p-1" title="Excluir Item">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">Título do Kit/Jogo</label>
                          <input type="text" value={item.title} onChange={(e) => handleServiceChange(item.id, 'title', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-lg px-3 py-2 text-sm text-amber-950" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">Selo / Tag</label>
                          <input type="text" value={item.tag} onChange={(e) => handleServiceChange(item.id, 'tag', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-lg px-3 py-2 text-sm text-amber-950" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">Descrição Breve</label>
                        <textarea rows={2} value={item.description} onChange={(e) => handleServiceChange(item.id, 'description', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-lg px-3 py-2 text-sm text-amber-950" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">URL da Imagem</label>
                        <input type="url" value={item.imageUrl} onChange={(e) => handleServiceChange(item.id, 'imageUrl', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-lg px-3 py-2 text-sm text-amber-950" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'diferenciais' && (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-amber-950 pb-2 border-b border-amber-900/10">Diferenciais e Chamada Final</h3>
                
                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Título da Seção Diferenciais</label>
                  <input type="text" value={formData.differentials.title} onChange={(e) => handleChange('differentials', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Subtítulo dos Diferenciais</label>
                  <input type="text" value={formData.differentials.subtitle} onChange={(e) => handleChange('differentials', 'subtitle', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">URL da Imagem dos Diferenciais</label>
                  <input type="url" value={formData.differentials.imageUrl} onChange={(e) => handleChange('differentials', 'imageUrl', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Frase Principal do Banner Final</label>
                  <textarea rows={2} value={formData.ctaBanner.title} onChange={(e) => handleChange('ctaBanner', 'title', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Texto do Botão Final de WhatsApp</label>
                  <input type="text" value={formData.ctaBanner.buttonText} onChange={(e) => handleChange('ctaBanner', 'buttonText', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-6">
                <h3 className="font-serif text-lg font-bold text-amber-950 pb-2 border-b border-amber-900/10">Redes Sociais e Rodapé</h3>
                
                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-amber-900/10 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-amber-950 flex items-center space-x-2">
                    <InstagramIcon className="w-4 h-4 text-rose-700" />
                    <span>Instagram</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Usuário / Handle (Ex: @ateliercleopereira)</label>
                      <input type="text" placeholder="@ateliercleopereira" value={safeFooter.instagram || ''} onChange={(e) => handleChange('footer', 'instagram', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Link Completo do Instagram</label>
                      <input type="url" placeholder="https://instagram.com/seu_perfil" value={safeFooter.instagramUrl || ''} onChange={(e) => handleChange('footer', 'instagramUrl', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-amber-900/10 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-amber-950 flex items-center space-x-2">
                    <FacebookIcon className="w-4 h-4 text-blue-700" />
                    <span>Facebook</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Nome da Página (Ex: /ateliercleopereira)</label>
                      <input type="text" placeholder="/ateliercleopereira" value={safeFooter.facebook || ''} onChange={(e) => handleChange('footer', 'facebook', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Link Completo do Facebook</label>
                      <input type="url" placeholder="https://facebook.com/sua_pagina" value={safeFooter.facebookUrl || ''} onChange={(e) => handleChange('footer', 'facebookUrl', e.target.value)} className="w-full bg-white border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <h4 className="font-serif text-sm font-bold text-amber-950 border-b border-amber-900/10 pb-2">Informações do Rodapé</h4>
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Endereço / Localização</label>
                    <input type="text" value={safeFooter.address || ''} onChange={(e) => handleChange('footer', 'address', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-900 uppercase mb-1">Texto de Copyright</label>
                    <input type="text" value={safeFooter.copyright || ''} onChange={(e) => handleChange('footer', 'copyright', e.target.value)} className="w-full bg-[#FAF7F2] border border-amber-900/10 rounded-xl px-4 py-2.5 text-sm text-amber-950" />
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-amber-900/10 flex justify-end">
              <button type="submit" className="px-8 py-3 bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs rounded-full shadow-lg transition-all flex items-center space-x-2 uppercase tracking-wider">
                <Save className="w-4 h-4" />
                <span>Salvar Tudo no Supabase</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

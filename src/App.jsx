import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

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
    paragraph1: "No Atelier Cléo Pereira, cada costura carrega uma história.",
    paragraph2: "Seja para surpreender alguém especial com um Kit SPA exclusivo ou para deixar a rotina da sua casa mais charmosa.",
    imageUrl: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&q=80&w=800",
  },
  services: [
    {
      id: "1",
      title: "Kit SPA Personalizado",
      description: "Nécessaire acolchoada, toalha de rosto aveludada e faixa para cabelo combinando.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      tag: "Mais Pedido"
    },
    {
      id: "2",
      title: "Kit de Mesa & Cozinha",
      description: "Jogo americano impermeável e guardanapos de tecido.",
      imageUrl: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800",
      tag: "Lançamento"
    }
  ],
  footer: {
    address: "Ateliê em São Paulo, SP - Envio para todo o Brasil",
    copyright: "© 2026 Atelier Cléo Pereira. Todos os direitos reservados."
  }
};

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [content, setContent] = useState(DEFAULT_CLEO_CONTENT);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

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

      fetchContent();

      return () => {
        window.removeEventListener('popstate', checkRoute);
        if (authListener?.subscription) authListener.subscription.unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('landing_content')
        .select('content')
        .eq('id', 'cleo_content')
        .maybeSingle();

      if (data && data.content && typeof data.content === 'object') {
        setContent(data.content);
      }
    } catch (err) {
      console.warn("Usando conteúdo padrão:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newContent) => {
    if (!session) {
      alert('Você precisa estar autenticado.');
      return;
    }

    try {
      const { error } = await supabase
        .from('landing_content')
        .upsert({ id: 'cleo_content', content: newContent, updated_at: new Date() });

      if (error) throw error;

      setContent(newContent);
      alert('Alterações salvas com sucesso no Supabase!');
    } catch (e) {
      alert('Erro ao salvar: ' + e.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-amber-950 font-serif">
        <p className="animate-pulse text-lg">Carregando Atelier Cléo Pereira...</p>
      </div>
    );
  }

  const safeContent = content || DEFAULT_CLEO_CONTENT;
  const header = safeContent.header || DEFAULT_CLEO_CONTENT.header;
  const hero = safeContent.hero || DEFAULT_CLEO_CONTENT.hero;
  const services = safeContent.services || DEFAULT_CLEO_CONTENT.services;

  // ROTA DO PAINEL ADMIN /acp
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-amber-950 font-sans p-4 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-amber-900/10">
            <h1 className="font-serif text-2xl font-bold text-amber-950">Painel CMS - Atelier Cléo Pereira</h1>
            <a href="/" className="text-xs font-semibold text-rose-800 bg-rose-50 px-4 py-2 rounded-full border border-rose-200">Ver Site Público</a>
          </div>

          {session ? (
            <AdminDashboard content={safeContent} onSave={handleSave} onLogout={() => supabase.auth.signOut()} />
          ) : (
            <LoginForm />
          )}
        </div>
      </div>
    );
  }

  // SITE PÚBLICO (Limpo, sem barras de administração visíveis)
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-amber-950 font-sans">
      <nav className="sticky top-0 z-50 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-rose-700/10 border border-rose-700/30 flex items-center justify-center text-rose-800">
                <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold text-amber-950 block leading-none">{header.atelierName}</span>
                <span className="text-[10px] sm:text-xs text-rose-800 tracking-wider uppercase font-medium">{header.tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <div className="relative overflow-hidden">
          <section className="relative pt-12 pb-20 bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-rose-900/10 border border-rose-900/20 text-rose-900 text-xs font-semibold uppercase">{hero.badge}</span>
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-950">{hero.title}</h1>
                  <p className="text-base text-amber-900/80 max-w-2xl font-light">{hero.subtitle}</p>
                  <a href={`https://wa.me/${(header.whatsappNumber || "").replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="inline-block px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-full shadow-xl uppercase">
                    {hero.ctaText}
                  </a>
                </div>
                <div className="lg:col-span-5">
                  <img src={hero.bgImage} alt="Hero" className="rounded-3xl border-4 border-white shadow-2xl w-full h-[380px] object-cover" />
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl font-bold text-amber-950 text-center mb-12">Catálogo de Peças</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((item) => (
                  <div key={item.id} className="bg-[#FAF7F2] rounded-3xl overflow-hidden border p-4 flex flex-col md:flex-row gap-4 items-center">
                    <img src={item.imageUrl} alt={item.title} className="w-full md:w-40 h-40 object-cover rounded-2xl" />
                    <div className="space-y-2 flex-1">
                      {item.tag && <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold uppercase">{item.tag}</span>}
                      <h3 className="font-serif text-lg font-bold text-amber-950">{item.title}</h3>
                      <p className="text-xs text-amber-900/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
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
    <div className="max-w-md mx-auto my-12 p-8 bg-white border rounded-3xl shadow-xl space-y-4">
      <h2 className="font-serif text-2xl font-bold text-amber-950 text-center">Entrar no Painel</h2>
      {errorMsg && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">{errorMsg}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" required placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
        <input type="password" required placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
        <button type="submit" className="w-full py-3 bg-rose-800 text-white font-bold text-xs rounded-full uppercase shadow-lg">Entrar</button>
      </form>
    </div>
  );
}

function AdminDashboard({ content, onSave, onLogout }) {
  const [formData, setFormData] = useState(content);

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;
    setFormData({ ...formData, services: updatedServices });
  };

  const addService = () => {
    const newService = {
      id: Date.now().toString(),
      title: "Nova Peça / Kit",
      description: "Descrição detalhada do produto...",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      tag: "Destaque"
    };
    setFormData({ ...formData, services: [...formData.services, newService] });
  };

  const removeService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: updatedServices });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm">
        <span className="text-xs font-semibold text-emerald-800">Sessão ativa com segurança</span>
        <button onClick={onLogout} className="text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">Encerrar Sessão</button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-8">
        
        {/* CABEÇALHO E WHATSAPP */}
        <div className="bg-white border p-6 rounded-3xl shadow-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-amber-950 border-b pb-2">Informações Gerais & WhatsApp</h2>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">WhatsApp de Encomendas (com DDI e DDD)</label>
            <input type="text" value={formData.header.whatsappNumber} onChange={(e) => setFormData({...formData, header: {...formData.header, whatsappNumber: e.target.value}})} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
          </div>
        </div>

        {/* HERO / BANNER PRINCIPAL */}
        <div className="bg-white border p-6 rounded-3xl shadow-sm space-y-4">
          <h2 className="font-serif text-lg font-bold text-amber-950 border-b pb-2">Banner Principal (Hero)</h2>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Título Principal</label>
            <input type="text" value={formData.hero.title} onChange={(e) => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">Subtítulo / Descrição</label>
            <textarea rows="2" value={formData.hero.subtitle} onChange={(e) => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-1">URL da Imagem de Capa (Foto principal)</label>
            <input type="text" value={formData.hero.bgImage} onChange={(e) => setFormData({...formData, hero: {...formData.hero, bgImage: e.target.value}})} className="w-full bg-[#FAF7F2] border p-2.5 rounded-xl text-sm" />
          </div>
        </div>

        {/* CATÁLOGO DE PRODUTOS / SERVIÇOS */}
        <div className="bg-white border p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="font-serif text-lg font-bold text-amber-950">Catálogo de Produtos & Peças</h2>
            <button type="button" onClick={addService} className="px-4 py-2 bg-amber-900 text-white font-bold text-xs rounded-full uppercase">+ Adicionar Produto</button>
          </div>

          <div className="space-y-6">
            {formData.services.map((item, index) => (
              <div key={item.id || index} className="bg-[#FAF7F2] border p-4 rounded-2xl space-y-4 relative">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-rose-900">Produto #{index + 1}</span>
                  <button type="button" onClick={() => removeService(index)} className="text-xs font-bold text-rose-700 bg-rose-100 px-3 py-1 rounded-lg">Remover Produto</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">Nome do Produto</label>
                    <input type="text" value={item.title} onChange={(e) => handleServiceChange(index, 'title', e.target.value)} className="w-full bg-white border p-2 rounded-xl text-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase mb-1">Etiqueta (ex: Mais Pedido)</label>
                    <input type="text" value={item.tag} onChange={(e) => handleServiceChange(index, 'tag', e.target.value)} className="w-full bg-white border p-2 rounded-xl text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">Descrição</label>
                  <input type="text" value={item.description} onChange={(e) => handleServiceChange(index, 'description', e.target.value)} className="w-full bg-white border p-2 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase mb-1">URL da Foto do Produto</label>
                  <input type="text" value={item.imageUrl} onChange={(e) => handleServiceChange(index, 'imageUrl', e.target.value)} className="w-full bg-white border p-2 rounded-xl text-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-rose-800 hover:bg-rose-900 text-white font-bold text-sm rounded-full uppercase shadow-xl">Salvar Todas as Alterações no Supabase</button>
      </form>
    </div>
  );
}
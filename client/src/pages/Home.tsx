/**
 * Design: Editorial Financeiro Sofisticado
 * - Tema escuro com acentos dourados
 * - Tipografia: Playfair Display (títulos) + Inter (corpo)
 * - Layout: Hero com imagem + Grid de artigos
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { articles as staticArticles, categories, getArticlesByCategory } from "@/data/articles";
import { Clock, ChevronRight, BookOpen, Menu, X } from "lucide-react";

interface AdminArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  themeId: string;
  readTime: string;
  date: string;
}

interface DisplayArticle {
  id: string;
  themeId: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
  contentFile?: string;
  isAdmin?: boolean;
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allArticles, setAllArticles] = useState<DisplayArticle[]>(staticArticles);

  // Carregar artigos do painel de admin
  useEffect(() => {
    try {
      const adminArticles = localStorage.getItem("admin_articles");
      if (adminArticles) {
        const parsed: AdminArticle[] = JSON.parse(adminArticles);
        const converted: DisplayArticle[] = parsed.map((article) => ({
          id: article.id,
          themeId: article.themeId,
          title: article.title,
          summary: article.summary,
          date: article.date,
          category: article.category,
          readTime: article.readTime,
          isAdmin: true,
        }));
        // Mesclar artigos do painel com artigos estáticos
        setAllArticles([...converted, ...staticArticles]);
      }
    } catch (error) {
      console.error("Erro ao carregar artigos do painel:", error);
    }
  }, []);

  const filteredArticles = allArticles.filter((article) => {
    if (selectedCategory === "all") return true;
    return article.themeId === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo-dgp.jpg" alt="DGP Logo" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h1 className="text-xl font-bold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Siga o Conhecimento
                </h1>
                <p className="text-xs text-muted-foreground">Análise feita por Danielson Gomes Pinto</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#artigos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Artigos
              </a>
              <a href="#videos" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Vídeos
              </a>
              <a href="#sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </a>

            </nav>
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 border-t border-border/30 mt-4">
              <a href="#artigos" className="block py-2 text-muted-foreground hover:text-foreground">
                Artigos
              </a>
              <a href="#sobre" className="block py-2 text-muted-foreground hover:text-foreground">
                Sobre
              </a>
              <a href="/admin" className="block py-2 text-muted-foreground hover:text-foreground">
                Admin
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/images/hero-banner.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-4">
              Investigação Independente
            </p>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Revelando as Conexões Ocultas do Poder da Mente
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Análises aprofundadas sobre os arquitetos do sistema matrix, 
              suas estratégias de controle e como elas moldaram o mundo moderno.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                {allArticles.length} artigos
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
              <span>Atualizado semanalmente</span>
            </div>
            
            {/* CTA Button */}
            <a 
              href="#artigos"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Explorar Artigos
              <ChevronRight className="w-4 h-4" />
            </a>
            <a 
              href="#videos"
              className="inline-flex items-center gap-2 mt-4 ml-4 px-6 py-3 bg-blue-400 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors"
            >
              Explorar Vídeo
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Decorative gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </section>

      {/* Main Content */}
      <main className="py-12" id="artigos">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-24">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Categorias
                </h3>
                <nav className="flex flex-wrap lg:flex-col gap-2 lg:space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        selectedCategory === cat.id
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Info Box */}
                <div className="hidden lg:block mt-8 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <h4 className="text-sm font-semibold mb-2">Sobre o Projeto</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Pesquisa independente baseada em fontes públicas e documentos históricos verificáveis.
                  </p>
                </div>
              </div>
            </aside>

            {/* Articles Grid */}
            <section className="flex-1">
              <div className="grid gap-6">
                {filteredArticles.length === 0 ? (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-muted-foreground">Nenhum artigo encontrado nesta categoria.</p>
                  </div>
                ) : (
                  filteredArticles.map((article) => (
                    <article 
                      key={article.id}
                      className="group p-6 rounded-lg border border-border/50 hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <Link href={`/artigo/${article.id}`}>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                              {article.title}
                            </h3>
                          </Link>
                          {article.isAdmin && (
                            <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                              Novo (Painel Admin)
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {article.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </span>
                          <span className="text-xs">
                            {new Date(article.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>

                        <Link href={`/artigo/${article.id}`} className="text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center gap-1 group/btn">
                          Ler Mais
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Seção Sobre */}
      <section id="sobre" className="py-16 bg-secondary/30 border-t border-border/50">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sobre o Siga o Conhecimento
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Siga o Conhecimento é uma plataforma de análise independente dedicada a investigar as conexões ocultas entre poder financeiro, política e história. Nosso objetivo é revelar como os arquitetos do sistema financeiro global moldaram o mundo moderno.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Nossa Missão</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Fornecer análises profundas e documentadas sobre os mecanismos de controle financeiro, desde a criação do Federal Reserve até os movimentos geopolíticos contemporâneos como os BRICS.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-3">Metodologia</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Utilizamos fontes públicas verificáveis, documentos históricos e pesquisa independente para construir narrativas que conectam eventos aparentemente desconexos em um padrão coerente de poder.
                </p>
              </div>
            </div>

            <div className="bg-secondary/50 p-6 rounded-lg border border-border/50">
              <h3 className="text-lg font-bold text-foreground mb-3">Contato e Feedback</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Suas sugestões e críticas são bem-vindas. Se você identificou uma fonte importante ou tem uma análise para compartilhar, entre em contato através dos canais abaixo:
              </p>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground"><strong>Email:</strong> <a href="mailto:dgp@sigaodinheiro.com" className="text-primary hover:underline">dgp@sigaodinheiro.com</a></p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground"><strong>YouTube:</strong> <a href="https://youtube.com/@DGP_s" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@DGP_s</a></p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground"><strong>Instagram:</strong> <a href="https://instagram.com/dgp_siga" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@dgp_siga</a></p>
                </div>
              </div>
              <a href="#newsletter" className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
                Enviar Feedback
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 bg-primary/10 border-t border-border/50">
        <div className="container max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Receba Análises Exclusivas
            </h2>
            <p className="text-muted-foreground">
              Inscreva-se para receber novos artigos, análises profundas e feedback direto sobre siga o conhecimento.
            </p>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as HTMLFormElement).email?.value;
            const feedback = (e.target as HTMLFormElement).feedback?.value;
            if (email && feedback) {
              localStorage.setItem('newsletter_email', email);
              localStorage.setItem('newsletter_feedback', feedback);
              alert('Obrigado! Seu feedback foi recebido.');
              (e.target as HTMLFormElement).reset();
            } else {
              alert('Por favor, preencha email e mensagem.');
            }
          }}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <textarea
                name="feedback"
                placeholder="Suas sugestões, críticas ou análises (opcional)..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Enviar Feedback e Inscrever-se
            </button>
          </form>
        </div>
      </section>

      {/* Vídeos Section */}
      <section id="videos" className="py-20 border-t border-border/50">
        <div className="container">
          <h3 className="text-3xl font-bold mb-12 text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
            Vídeos Exclusivos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://youtu.be/wQkqGjeSYS0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Matrix episódio 1
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/KcJEvjZyau4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Xadrez de Trump
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/KHgFUNrcjC0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Código da Pilhagem
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/gvwVvDqrDkM"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Jornada do Lider
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/Oza20WSsWp8"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Que é Dinheiro
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/olrqi1xXmOQ"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A ilusão de Solvencia
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/GXLrObtcmmU"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Matrix episódio 2
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/q591rSYdF1s"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Sinais Convergentes
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/rtw-W4PkXPo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Matrix episódio 3
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/rhvNjVfii5Y"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Matrix episódio 4
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/PedTJ4cWtg8"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Padrão Ouro episódio 1
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/fa7PucG1P9A"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Arquiteto do Poder episódio 1
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/9Ic0aSzH27E"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Arquiteto do Poder episódio 2
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/BBlLHHu8qco"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Arquiteto do Poder episódio 3
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/rWF_Fc880sc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Arquiteto do Poder episódio 4
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/ukiGePd0Puw"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Império da Prata
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/Wf_WRNw4IfA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Relação entre Segunda Guerra Mundial e o Ouro
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/9R4qo9MQHno"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Dívida Impagável
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/Pgbxn3dKleM"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Nova Ordem Mundial
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/I4Yr6eEa3wc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  BRICS episódio 2
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/37QJfucHwWY"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  BRICS episódio 3
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/BKtbE-3p81c"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Para onde foi o Ouro? episódio 1
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/Hsd1oG7mv14"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Para onde foi o Ouro? episódio 2
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/uE3MGuFZS_Y"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Para onde foi o Ouro? episódio 3
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/9R4qo9MQHno"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Dívida Impagável Parte II
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/a0Iz8Vdxn2w"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Matrix 2.0 episódio 1
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/muARK4yE7Zc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Laço da Dopamina episódio 1
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/gASnrQpLlvU"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Grande Reset
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/gASnrQpLlvU"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Ciclo
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtube.com/shorts/kH3YeKKNZ2E?feature=share"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Novo Guardião
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/5nxnasyWC9E"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Novo Padrão
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/MUnvqoJO0Pg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Novo Padrão Versão Horizontal
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/Wrr7DzBBmF4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Liberdade
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/upEOaAQLLb0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Para onde foi o Ouro? episódio 5
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/aSVt5pgj8f8"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Sistema se Auto Alimenta
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/ryAue_LUcfc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Despertar Final
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/GUWZq816tqk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Sinuca de Bico
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/0w272ioLnkI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Manipulação
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/zi8NwkRWXMM"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Ouro Nasceu para Brilhar
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/etI4y7DidGo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Qual a Relação entre o Ouro e o BRICS?
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/i-1j5WBwTbg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Relação entre Ouro e BRICS
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/969IElRKRSA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Terras Raras
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/cyHkFnB6kyA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Terras Raras em Espanhol
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/ily-Q_npvkM"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Terras Raras em Espanhol Versão Vertical
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/xuoifULhkYA"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Os Juros
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/QFMm8Io8qGE"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Dólar Mais Fraco?
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/okKQlyE3lKk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Poder da Mente
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/NIenJZPB8Tg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  O Poder da Mente Versão Vertical
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/gKa8bYPZLh0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  A Matrix da Mente
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
            <a
              href="https://youtu.be/aUHc2aKm-DQ"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-lg bg-secondary/30 border border-border/50 hover:border-blue-400 hover:bg-secondary/50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center">
                  <span className="text-blue-400">▶</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                  Xeque Mate da China?
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">Assista ao vídeo exclusivo</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-secondary/20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <h4 className="text-sm font-bold text-foreground mb-2">Contato</h4>
              <a href="mailto:dgp@sigaodinheiro.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">dgp@sigaodinheiro.com</a>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold text-foreground mb-2">YouTube</h4>
              <a href="https://youtube.com/@DGP_s" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">@DGP_s</a>
            </div>
            <div className="text-center">
              <h4 className="text-sm font-bold text-foreground mb-2">Instagram</h4>
              <a href="https://instagram.com/dgp_siga" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">@dgp_siga</a>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center text-muted-foreground text-sm">
            <p>© 2024 Siga o Conhecimento. Análise Independente de Poder Financeiro.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

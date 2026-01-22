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
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Siga o Dinheiro
                </h1>
                <p className="text-xs text-muted-foreground">Análise Financeira</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#artigos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Artigos
              </a>
              <a href="#sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </a>
              <a href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Admin
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
              Revelando as Conexões Ocultas do Poder Financeiro
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Análises aprofundadas sobre os arquitetos do sistema financeiro global, 
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
                Sobre o Siga o Dinheiro
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Siga o Dinheiro é uma plataforma de análise independente dedicada a investigar as conexões ocultas entre poder financeiro, política e história. Nosso objetivo é revelar como os arquitetos do sistema financeiro global moldaram o mundo moderno.
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
              <p className="text-muted-foreground text-sm">
                Suas sugestões e críticas são bem-vindas. Se você identificou uma fonte importante ou tem uma análise para compartilhar, entre em contato através do formulário de newsletter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-secondary/20">
        <div className="container">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2024 Siga o Dinheiro. Análise Independente de Poder Financeiro.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

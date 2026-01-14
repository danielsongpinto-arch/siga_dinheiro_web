/**
 * Design: Editorial Financeiro Sofisticado
 * - Tema escuro com acentos dourados
 * - Tipografia: Playfair Display (títulos) + Inter (corpo)
 * - Layout: Hero com imagem + Grid de artigos
 */

import { useState } from "react";
import { Link } from "wouter";
import { articles, categories, getArticlesByCategory } from "@/data/articles";
import { Clock, ChevronRight, BookOpen, Menu, X } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const filteredArticles = getArticlesByCategory(selectedCategory);

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
                {articles.length} artigos
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
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">
                  {categories.find(c => c.id === selectedCategory)?.name || "Artigos"}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {filteredArticles.length} {filteredArticles.length === 1 ? "artigo" : "artigos"}
                </span>
              </div>

              <div className="grid gap-6">
                {filteredArticles.map((article, index) => (
                  <Link key={article.id} href={`/artigo/${article.id}`}>
                    <article 
                      className="group p-6 rounded-xl bg-card border border-border/50 card-gold-hover"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="text-xs font-medium text-gold bg-primary/10 px-2 py-1 rounded">
                              {article.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {article.readTime}
                            </span>
                          </div>
                          <h4 
                            className="text-xl font-semibold mb-3 group-hover:text-gold transition-colors"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {article.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                        <div className="shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* About Section */}
      <section 
        className="relative py-20 overflow-hidden" 
        id="sobre"
        style={{
          backgroundImage: "url('/images/article-bg-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-background/90"></div>
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sobre o Projeto
            </h3>
            <div className="gold-line w-24 mx-auto mb-6"></div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              O <strong className="text-gold">Siga o Dinheiro</strong> é um projeto de pesquisa independente 
              dedicado a revelar as conexões ocultas entre poder financeiro, política e história. 
              Todos os artigos são baseados em fontes públicas verificáveis e documentos históricos.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nosso objetivo é democratizar o conhecimento sobre como o sistema financeiro global 
              foi construído e como ele continua a moldar nossas vidas de maneiras que raramente reconhecemos.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl">💰</span>
              </div>
              <h3 
                className="text-2xl font-bold text-gold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Siga o Dinheiro
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 text-sm">
              Pesquisa independente sobre poder financeiro e história econômica.
            </p>
            <div className="gold-line w-32 mx-auto mb-6"></div>
            <p className="text-xs text-muted-foreground">
              © 2024 Siga o Dinheiro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

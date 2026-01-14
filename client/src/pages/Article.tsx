/**
 * Design: Editorial Financeiro Sofisticado
 * - Página de leitura de artigo individual
 * - Tipografia otimizada para leitura longa
 * - Navegação de volta para home
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { getArticleById } from "@/data/articles";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { toast } from "sonner";

interface ArticleContent {
  id: string;
  title: string;
  summary: string;
  content: string;
  sections?: Array<{
    title: string;
    content: string;
  }>;
}

export default function Article() {
  const params = useParams<{ id: string }>();
  const article = getArticleById(params.id || "");
  const [content, setContent] = useState<ArticleContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (article) {
      // Carregar conteúdo do artigo via fetch
      fetch(`/data/${article.contentFile}`)
        .then(res => res.json())
        .then(data => {
          setContent(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao carregar artigo:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [article]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artigo não encontrado</h1>
          <Link href="/">
            <span className="text-gold hover:underline">Voltar para Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Voltar</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm">💰</span>
              </div>
              <span className="text-sm font-semibold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                Siga o Dinheiro
              </span>
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Compartilhar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-medium text-gold bg-primary/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <h1 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {article.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {article.summary}
              </p>
              <div className="gold-line mt-8"></div>
            </header>

            {/* Article Body */}
            <div className="prose-article">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full"></div>
                </div>
              ) : content && content.content ? (
                <Streamdown>{content.content}</Streamdown>
              ) : (
                <p className="text-muted-foreground">
                  Conteúdo não disponível.
                </p>
              )}
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-8 border-t border-border/30">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <span className="flex items-center gap-2 text-gold hover:underline">
                    <ArrowLeft className="w-4 h-4" />
                    Ver todos os artigos
                  </span>
                </Link>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar
                </button>
              </div>
            </footer>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8">
        <div className="container">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 Siga o Dinheiro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

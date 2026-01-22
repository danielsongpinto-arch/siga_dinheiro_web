import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { articles as staticArticles } from "@/data/articles";

interface Article {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  readTime: string;
  date: string;
  themeId?: string;
  contentFile?: string;
}

export default function ArticleDetail() {
  const [, params] = useRoute("/artigo/:id");
  const [, setLocation] = useLocation();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) {
      setLocation("/");
      return;
    }

    // Buscar artigos do localStorage
    const articlesJson = localStorage.getItem("admin_articles");
    const adminArticles: Article[] = articlesJson ? JSON.parse(articlesJson) : [];
    
    // Combinar artigos estáticos com artigos do admin
    const allArticles = [...adminArticles, ...staticArticles];

    // Encontrar artigo pelo ID
    const found = allArticles.find((a) => a.id === params.id);

    if (found) {
      setArticle(found);
    } else {
      // Se não encontrar, voltar para home
      setLocation("/");
    }

    setLoading(false);
  }, [params?.id, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">Carregando artigo...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-muted-foreground">Artigo não encontrado</p>
        </div>
      </div>
    );
  }

  // Processar conteúdo Markdown simples
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Negrito: **texto**
      let processedLine = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      // Itálico: *texto*
      processedLine = processedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");
      // Títulos: # Título
      if (line.startsWith("# ")) {
        return (
          <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">
            {line.substring(2)}
          </h2>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-xl font-bold mt-4 mb-2">
            {line.substring(3)}
          </h3>
        );
      }
      // Listas: - item
      if (line.startsWith("- ")) {
        return (
          <li key={idx} className="ml-6 mb-1">
            {line.substring(2)}
          </li>
        );
      }
      // Linha vazia
      if (line.trim() === "") {
        return <div key={idx} className="mb-4" />;
      }
      // Parágrafo normal
      return (
        <p
          key={idx}
          className="text-foreground mb-3 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Botão voltar */}
        <Button
          onClick={() => setLocation("/")}
          variant="outline"
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>

        {/* Artigo */}
        <Card className="p-8 border border-border">
          {/* Título */}
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            {article.title}
          </h1>

          {/* Metadados */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="w-4 h-4" />
              {article.category}
            </div>
          </div>

          {/* Resumo */}
          <p className="text-lg text-muted-foreground mb-8 italic">
            {article.summary}
          </p>

          {/* Conteúdo */}
          <div className="prose prose-invert max-w-none">
            {renderContent(article.content || "")}
          </div>
        </Card>
      </div>
    </div>
  );
}

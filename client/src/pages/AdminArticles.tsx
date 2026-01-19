import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";

// Tipos de artigos
interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  themeId: string;
  readTime: string;
  date?: Date;
}

const CATEGORIES = [
  { id: "arquitetos-do-poder", name: "Arquitetos do Poder" },
  { id: "rockefeller", name: "Rockefeller" },
  { id: "sistema-autoperpetuante", name: "Sistema Monetário" },
  { id: "brics", name: "BRICS" },
  { id: "ww2", name: "Segunda Guerra" },
];

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: "",
    summary: "",
    content: "",
    category: "arquitetos-do-poder",
    themeId: "arquitetos-do-poder",
    readTime: "20 min",
  });

  // Criar novo artigo
  const handleCreate = () => {
    if (!formData.title || !formData.summary || !formData.content) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const newArticle: Article = {
      id: `article-${Date.now()}`,
      title: formData.title || "",
      summary: formData.summary || "",
      content: formData.content || "",
      category: formData.category || "arquitetos-do-poder",
      themeId: formData.themeId || "arquitetos-do-poder",
      readTime: formData.readTime || "20 min",
      date: new Date(),
    };

    setArticles([newArticle, ...articles]);
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "arquitetos-do-poder",
      themeId: "arquitetos-do-poder",
      readTime: "20 min",
    });
    setIsCreating(false);
  };

  // Editar artigo
  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData(article);
  };

  // Salvar edição
  const handleSaveEdit = () => {
    if (!editingId) return;

    setArticles(
      articles.map((a) =>
        a.id === editingId
          ? {
              ...a,
              title: formData.title || a.title,
              summary: formData.summary || a.summary,
              content: formData.content || a.content,
              category: formData.category || a.category,
              themeId: formData.themeId || a.themeId,
              readTime: formData.readTime || a.readTime,
            }
          : a
      )
    );

    setEditingId(null);
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "arquitetos-do-poder",
      themeId: "arquitetos-do-poder",
      readTime: "20 min",
    });
  };

  // Deletar artigo
  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este artigo?")) {
      setArticles(articles.filter((a) => a.id !== id));
    }
  };

  // Cancelar
  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "arquitetos-do-poder",
      themeId: "arquitetos-do-poder",
      readTime: "20 min",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Painel de Admin
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus artigos financeiros
            </p>
          </div>
          {!isCreating && !editingId && (
            <Button
              onClick={() => setIsCreating(true)}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Novo Artigo
            </Button>
          )}
        </div>

        {/* Formulário de Criação/Edição */}
        {(isCreating || editingId) && (
          <Card className="mb-8 p-6 border border-border">
            <h2 className="text-xl font-bold mb-4">
              {isCreating ? "Criar Novo Artigo" : "Editar Artigo"}
            </h2>

            <div className="space-y-4">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Título *
                </label>
                <Input
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Digite o título do artigo"
                  className="w-full"
                />
              </div>

              {/* Resumo */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Resumo *
                </label>
                <Textarea
                  value={formData.summary || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  placeholder="Digite um resumo do artigo"
                  rows={3}
                  className="w-full"
                />
              </div>

              {/* Conteúdo */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Conteúdo *
                </label>
                <Textarea
                  value={formData.content || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Digite o conteúdo completo do artigo"
                  rows={6}
                  className="w-full"
                />
              </div>

              {/* Categoria */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Categoria
                  </label>
                  <select
                    value={formData.category || "arquitetos-do-poder"}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tempo de Leitura */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tempo de Leitura
                  </label>
                  <Input
                    value={formData.readTime || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, readTime: e.target.value })
                    }
                    placeholder="Ex: 20 min"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={
                    isCreating ? handleCreate : handleSaveEdit
                  }
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4" />
                  {isCreating ? "Criar" : "Salvar"}
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Lista de Artigos */}
        <div className="space-y-4">
          {articles.length === 0 ? (
            <Card className="p-8 text-center border border-border">
              <p className="text-muted-foreground">
                Nenhum artigo criado ainda. Clique em "Novo Artigo" para começar.
              </p>
            </Card>
          ) : (
            articles.map((article) => (
              <Card
                key={article.id}
                className="p-4 border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {article.summary}
                    </p>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                      <span>📁 {article.category}</span>
                      <span>⏱️ {article.readTime}</span>
                      {article.date && (
                        <span>
                          📅{" "}
                          {new Date(article.date).toLocaleDateString("pt-BR")}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => handleEdit(article)}
                      size="sm"
                      variant="outline"
                      className="gap-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      Editar
                    </Button>
                    <Button
                      onClick={() => handleDelete(article.id)}
                      size="sm"
                      variant="outline"
                      className="gap-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Deletar
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

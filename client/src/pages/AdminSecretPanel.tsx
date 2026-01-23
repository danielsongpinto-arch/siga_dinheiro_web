import { useState, useEffect } from "react";
import { articles as staticArticles, Article as ArticleType } from "@/data/articles";
import { Trash2, Edit2, Plus } from "lucide-react";

type Article = ArticleType | (Omit<ArticleType, 'themeId'> & { themeId?: string });

export default function AdminSecretPanel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [newArticleTitle, setNewArticleTitle] = useState("");
  const [newArticleSummary, setNewArticleSummary] = useState("");
  const [newArticleCategory, setNewArticleCategory] = useState("Arquitetos do Poder");

  const categories = [
    { id: "all", name: "Todos os Artigos", icon: "📚" },
    { id: "Arquitetos do Poder", name: "Arquitetos do Poder", icon: "🏛️" },
    { id: "Rockefeller", name: "Rockefeller", icon: "🛢️" },
    { id: "Sistema Monetário", name: "Sistema Monetário", icon: "💰" },
    { id: "BRICS", name: "BRICS", icon: "🌍" },
    { id: "Segunda Guerra", name: "Segunda Guerra", icon: "⚔️" },
  ];

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const stored = localStorage.getItem("articles");
    const storedArticles = stored ? JSON.parse(stored) : [];
    
    // Combinar artigos estáticos com os do localStorage, mas sem duplicar
    const allArticles: Article[] = [...staticArticles];
    
    // Adicionar apenas artigos do localStorage que não estão nos estáticos
    storedArticles.forEach((article: Article) => {
      if (!allArticles.find(a => a.id === article.id)) {
        allArticles.push(article);
      }
    });
    
    setArticles(allArticles);
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja deletar este artigo?")) {
      const stored = localStorage.getItem("articles");
      const storedArticles = stored ? JSON.parse(stored) : [];
      const updated = storedArticles.filter((a: Article) => a.id !== id);
      localStorage.setItem("articles", JSON.stringify(updated));
      loadArticles();
    }
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setEditTitle(article.title);
    setEditSummary(article.summary);
    setEditCategory(article.category);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    
    const stored = localStorage.getItem("articles");
    const storedArticles = stored ? JSON.parse(stored) : [];
    const updated = storedArticles.map((a: Article) =>
      a.id === editingId
        ? { ...a, title: editTitle, summary: editSummary, category: editCategory }
        : a
    );
    localStorage.setItem("articles", JSON.stringify(updated));
    setEditingId(null);
    loadArticles();
  };

  const handleAddArticle = () => {
    if (!newArticleTitle.trim() || !newArticleSummary.trim()) {
      alert("Preencha título e resumo");
      return;
    }

    const newArticle: Article = {
      id: `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newArticleTitle,
      summary: newArticleSummary,
      category: newArticleCategory,
      date: new Date().toLocaleDateString("pt-BR"),
      readTime: "15 min",
      content: newArticleSummary,
    };

    const stored = localStorage.getItem("articles");
    const storedArticles = stored ? JSON.parse(stored) : [];
    storedArticles.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(storedArticles));
    
    setNewArticleTitle("");
    setNewArticleSummary("");
    setNewArticleCategory("Arquitetos do Poder");
    loadArticles();
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Painel Admin Secreto</h1>
          <p className="text-muted-foreground">Gerenciar artigos (apenas para administradores)</p>
        </div>

        {/* Novo Artigo */}
        <div className="bg-secondary/50 p-6 rounded-lg border border-border/50 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Novo Artigo</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              value={newArticleTitle}
              onChange={(e) => setNewArticleTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
            />
            <textarea
              placeholder="Resumo"
              value={newArticleSummary}
              onChange={(e) => setNewArticleSummary(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 resize-none"
            />
            <select
              value={newArticleCategory}
              onChange={(e) => setNewArticleCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground focus:outline-none focus:border-primary/50"
            >
              {categories.slice(1).map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddArticle}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Artigo
            </button>
          </div>
        </div>

        {/* Busca e Filtros */}
        <div className="bg-secondary/50 p-6 rounded-lg border border-border/50 mb-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "bg-background border border-border/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Artigos */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Artigos ({filteredArticles.length})
          </h2>
          {filteredArticles.length === 0 ? (
            <p className="text-muted-foreground">Nenhum artigo encontrado</p>
          ) : (
            filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-secondary/50 p-6 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
              >
                {editingId === article.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground focus:outline-none focus:border-primary/50"
                    />
                    <textarea
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground focus:outline-none focus:border-primary/50 resize-none"
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border/50 text-foreground focus:outline-none focus:border-primary/50"
                    >
                      {categories.slice(1).map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{article.summary}</p>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>{article.category}</span>
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(article)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        title="Deletar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

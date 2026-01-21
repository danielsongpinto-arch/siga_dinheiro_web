import { useState, useEffect } from 'react';
import { MessageCircle, Send, Trash2 } from 'lucide-react';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
}

interface CommentsSectionProps {
  articleId: string;
}

export function CommentsSection({ articleId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // Carregar comentários do localStorage
  useEffect(() => {
    const storageKey = `comments-${articleId}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, [articleId]);

  // Salvar comentários no localStorage
  const saveComments = (newComments: Comment[]) => {
    const storageKey = `comments-${articleId}`;
    localStorage.setItem(storageKey, JSON.stringify(newComments));
    setComments(newComments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    // Simular delay de envio
    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        name,
        email,
        content,
        date: new Date().toLocaleDateString('pt-BR'),
      };
      
      const newComments = [newComment, ...comments];
      saveComments(newComments);
      
      setName('');
      setEmail('');
      setContent('');
      setLoading(false);
    }, 500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este comentário?')) {
      const newComments = comments.filter(c => c.id !== id);
      saveComments(newComments);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Comentários ({comments.length})</h3>
      </div>

      {/* Formulário de novo comentário */}
      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-card rounded-lg border border-border">
        <h4 className="font-semibold mb-4">Deixe seu comentário</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <textarea
          placeholder="Seu comentário..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Enviando...' : 'Enviar Comentário'}
        </button>
      </form>

      {/* Lista de comentários */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-card rounded-lg border border-border">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-foreground">{comment.name}</p>
                  <p className="text-sm text-muted-foreground">{comment.date}</p>
                </div>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="p-1 hover:bg-destructive/10 rounded-md transition-colors"
                  title="Deletar comentário"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </div>
              <p className="text-foreground whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

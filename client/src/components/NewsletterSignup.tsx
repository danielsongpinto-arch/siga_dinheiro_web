import { useState } from 'react';
import { Mail, Check } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      alert('Por favor, insira um email válido');
      return;
    }

    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      // Salvar email no localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }
      
      setEmail('');
      setSubmitted(true);
      setLoading(false);
      
      // Resetar mensagem de sucesso após 3 segundos
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 md:p-8 my-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">Fique Atualizado</h3>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Receba novos artigos e análises financeiras diretamente no seu email. Sem spam, apenas conteúdo de qualidade.
        </p>

        {submitted ? (
          <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <Check className="w-5 h-5 text-green-500" />
            <p className="text-green-600 font-medium">Inscrição realizada com sucesso! Obrigado!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity font-medium whitespace-nowrap"
            >
              {loading ? 'Inscrevendo...' : 'Inscrever'}
            </button>
          </form>
        )}
        
        <p className="text-xs text-muted-foreground mt-4">
          Respeitamos sua privacidade. Você pode se desinscrever a qualquer momento.
        </p>
      </div>
    </div>
  );
}

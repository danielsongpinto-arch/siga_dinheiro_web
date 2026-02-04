import { useState } from "react";
import { Mail, Globe, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  website?: string;
  email?: string;
}

export default function Sponsors() {
  const [sponsors] = useState<Sponsor[]>([
    // Adicionar patrocinadores aqui
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xl">🤝</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Patrocinadores
                </h1>
                <p className="text-xs text-muted-foreground">Nossos Colaboradores</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Início
              </a>
              <a href="/#artigos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Artigos
              </a>
              <a href="/#videos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Vídeos
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-border/30">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-gold text-sm font-medium tracking-wider uppercase mb-4">
              Parcerias Estratégicas
            </p>
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Nossos Patrocinadores e Colaboradores
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Conheça as empresas e profissionais que apoiam a missão de Siga o Conhecimento em trazer análises independentes e conteúdo de qualidade.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-20">
        <div className="container">
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor) => (
                <div 
                  key={sponsor.id}
                  className="bg-secondary/30 border border-border/50 rounded-lg p-8 hover:border-primary/50 transition-colors"
                >
                  {/* Logo */}
                  <div className="mb-6 flex items-center justify-center h-32 bg-background/50 rounded-lg border border-border/30">
                    <img 
                      src={sponsor.logo} 
                      alt={sponsor.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {sponsor.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6">
                    {sponsor.description}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    {sponsor.website && (
                      <a 
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Visite o site</span>
                      </a>
                    )}
                    {sponsor.email && (
                      <a 
                        href={`mailto:${sponsor.email}`}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Enviar email</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-6">
                Nenhum patrocinador adicionado ainda.
              </p>
              <p className="text-sm text-muted-foreground">
                Interessado em ser um patrocinador? Entre em contato conosco!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 border-t border-border/30 bg-secondary/20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h3 
              className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Quer ser um Patrocinador?
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Se sua empresa ou produto se alinha com nossa missão de análise independente e conhecimento, entre em contato conosco para explorar oportunidades de parceria.
            </p>
            <a href="mailto:dgp@sigaodinheiro.com">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Entre em Contato
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-secondary/30 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contato</h4>
              <a href="mailto:dgp@sigaodinheiro.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                dgp@sigaodinheiro.com
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Redes Sociais</h4>
              <div className="space-y-2">
                <a href="https://youtube.com/@DGP_s" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                  YouTube: @DGP_s
                </a>
                <a href="https://instagram.com/dgp_siga" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                  Instagram: @dgp_siga
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navegação</h4>
              <div className="space-y-2">
                <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                  Início
                </a>
                <a href="/#artigos" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                  Artigos
                </a>
                <a href="/#videos" className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                  Vídeos
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Siga o Conhecimento. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

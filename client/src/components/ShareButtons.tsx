import { Share2, Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const text = `Leia: "${title}" - ${url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2 py-4 border-t border-border/30">
      <div className="flex items-center gap-2">
        <Share2 className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Compartilhe:</span>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={shareOnTwitter}
          className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 hover:text-blue-400 transition-colors"
          title="Compartilhar no Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        
        <button
          onClick={shareOnLinkedin}
          className="p-2 rounded-lg hover:bg-blue-600/10 text-blue-600 hover:text-blue-500 transition-colors"
          title="Compartilhar no LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        
        <button
          onClick={shareOnFacebook}
          className="p-2 rounded-lg hover:bg-blue-700/10 text-blue-700 hover:text-blue-600 transition-colors"
          title="Compartilhar no Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-lg hover:bg-primary/10 text-primary hover:text-primary/80 transition-colors"
          title="Copiar link"
        >
          {copied ? (
            <Check className="w-5 h-5" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

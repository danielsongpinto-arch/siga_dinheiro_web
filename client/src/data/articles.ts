// Dados dos artigos - Siga o Dinheiro

export interface Article {
  id: string;
  themeId: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
  contentFile: string;
}

export const articles: Article[] = [
  {
    id: "arquitetos-001",
    themeId: "arquitetos-do-poder",
    title: "O Senhor das Finanças: Como J.P. Morgan Controlou o Dinheiro da América",
    summary: "J.P. Morgan exerceu mais poder sobre a economia americana do que qualquer presidente. Ele resgatou o governo dos EUA em 1895, controlou o Pânico de 1907 e criou o Federal Reserve em Jekyll Island. Consolidou indústrias inteiras: U.S. Steel, General Electric, International Harvester. Controlava 40% do capital industrial americano.",
    date: "2024-12-22",
    category: "Arquitetos do Poder",
    readTime: "25 min",
    contentFile: "jpmorgan_article.json"
  },
  {
    id: "arquitetos-002",
    themeId: "arquitetos-do-poder",
    title: "A Rede Invisível: Conexões Entre os Arquitetos do Poder",
    summary: "Rockefeller e Morgan não eram rivais - eram colaboradores operando como cartel coordenado. Jekyll Island 1910: 6 homens (1/4 da riqueza mundial) projetaram o Federal Reserve. A rede invisível persiste através de JPMorgan Chase, ExxonMobil, BlackRock e Vanguard.",
    date: "2024-12-23",
    category: "Arquitetos do Poder",
    readTime: "20 min",
    contentFile: "conexoes_article.json"
  },
  {
    id: "arquitetos-003",
    themeId: "arquitetos-do-poder",
    title: "O Barão do Aço: Andrew Carnegie e a Invenção da Filantropia Estratégica",
    summary: "De imigrante escocês pobre a segundo homem mais rico do mundo. Construiu monopólio do aço através de integração vertical. Inventou filantropia estratégica moderna: 2.509 bibliotecas, Carnegie Mellon, $350 milhões doados. Modelo seguido por Gates, Buffett, Bezos.",
    date: "2024-12-24",
    category: "Arquitetos do Poder",
    readTime: "22 min",
    contentFile: "carnegie_article.json"
  },
  {
    id: "rockefeller-001",
    themeId: "rockefeller",
    title: "O Rei do Petróleo: Como Rockefeller Construiu um Império de Controle Invisível",
    summary: "John D. Rockefeller, o homem mais rico da história ($400 bilhões ajustados), não apenas monopolizou o petróleo. Ele construiu um sistema de controle que moldou a medicina moderna, educação, mídia e governo. Este império invisível persiste hoje.",
    date: "2024-12-22",
    category: "Rockefeller",
    readTime: "30 min",
    contentFile: "rockefeller_article.json"
  },
  {
    id: "sistema-001",
    themeId: "sistema-autoperpetuante",
    title: "O Sistema Monetário Padrão: A Maior Transferência de Riqueza da História",
    summary: "Uma análise profunda de como o sistema monetário padrão foi projetado para se renovar através de crises, transferindo riqueza dos muitos para os poucos. Desde a natureza do dinheiro até a previsão para 2026, revelando os mecanismos ocultos.",
    date: "2024-12-25",
    category: "Sistema Monetário",
    readTime: "35 min",
    contentFile: "sistema_autoperpetuante_article.json"
  },
  {
    id: "brics-001",
    themeId: "brics",
    title: "BRICS e a Desdolarização: O Fim da Hegemonia do Dólar",
    summary: "O acordo do petrodólar expirou em 9 de junho de 2024. Os BRICS - representando mais da metade da população mundial - estão construindo uma arquitetura financeira alternativa que redistribuirá o poder econômico global de forma dramática.",
    date: "2024-12-26",
    category: "BRICS",
    readTime: "28 min",
    contentFile: "brics_article.json"
  },
  {
    id: "ww2-prewar",
    themeId: "ww2",
    title: "Véspera da Segunda Guerra: Os Laços Comerciais que Financiaram o Nazismo",
    summary: "Uma investigação sobre como IBM, Ford, General Motors e Standard Oil forneceram tecnologia, capital e conhecimento que tornaram possível o rearmamento alemão, operando sob o princípio de que lucros transcendem fronteiras.",
    date: "2024-12-27",
    category: "Segunda Guerra",
    readTime: "18 min",
    contentFile: "ww2_prewar_article.json"
  }
];

export const categories = [
  { id: "all", name: "Todos os Artigos", icon: "📚" },
  { id: "arquitetos-do-poder", name: "Arquitetos do Poder", icon: "🏛️" },
  { id: "rockefeller", name: "Rockefeller", icon: "🛢️" },
  { id: "sistema-autoperpetuante", name: "Sistema Monetário", icon: "💰" },
  { id: "brics", name: "BRICS", icon: "🌍" },
  { id: "ww2", name: "Segunda Guerra", icon: "⚔️" }
];

export function getArticlesByCategory(categoryId: string): Article[] {
  if (categoryId === "all") return articles;
  return articles.filter(a => a.themeId === categoryId);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}

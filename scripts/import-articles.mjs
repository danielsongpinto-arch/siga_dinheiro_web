import mysql from "mysql2/promise";

const articles = [
  {
    themeId: "arquitetos-do-poder",
    title: "O Senhor das Finanças: Como J.P. Morgan Controlou o Dinheiro da América",
    summary: "J.P. Morgan exerceu mais poder sobre a economia americana do que qualquer presidente. Ele resgatou o governo dos EUA em 1895, controlou o Pânico de 1907 e criou o Federal Reserve em Jekyll Island.",
    content: "J.P. Morgan foi o arquiteto invisível da economia americana. Sua influência transcendeu o mercado financeiro e moldou a política nacional.",
    category: "Arquitetos do Poder",
    readTime: "25 min",
  },
  {
    themeId: "arquitetos-do-poder",
    title: "A Rede Invisível: Conexões Entre os Arquitetos do Poder",
    summary: "Rockefeller e Morgan não eram rivais - eram colaboradores operando como cartel coordenado. Jekyll Island 1910: 6 homens projetaram o Federal Reserve.",
    content: "A rede de poder que controla a economia global é mais estruturada e coordenada do que a maioria das pessoas imagina.",
    category: "Arquitetos do Poder",
    readTime: "20 min",
  },
  {
    themeId: "arquitetos-do-poder",
    title: "O Barão do Aço: Andrew Carnegie e a Filantropia Estratégica",
    summary: "De imigrante escocês pobre a segundo homem mais rico do mundo. Construiu monopólio do aço e inventou filantropia estratégica moderna.",
    content: "Andrew Carnegie transformou a indústria do aço e redefiniu o conceito de responsabilidade social corporativa.",
    category: "Arquitetos do Poder",
    readTime: "22 min",
  },
  {
    themeId: "rockefeller",
    title: "O Rei do Petróleo: Como Rockefeller Construiu um Império",
    summary: "John D. Rockefeller, o homem mais rico da história, não apenas monopolizou o petróleo. Ele construiu um sistema de controle que moldou a medicina, educação e governo.",
    content: "Rockefeller criou um império que vai além do petróleo, influenciando praticamente todos os aspectos da sociedade moderna.",
    category: "Rockefeller",
    readTime: "30 min",
  },
  {
    themeId: "sistema-autoperpetuante",
    title: "O Sistema Monetário Padrão: A Maior Transferência de Riqueza",
    summary: "Uma análise profunda de como o sistema monetário padrão foi projetado para se renovar através de crises, transferindo riqueza dos muitos para os poucos.",
    content: "O sistema monetário moderno é uma máquina de transferência de riqueza que funciona de forma sistemática e previsível.",
    category: "Sistema Monetário",
    readTime: "35 min",
  },
  {
    themeId: "brics",
    title: "BRICS e a Desdolarização: O Fim da Hegemonia do Dólar",
    summary: "Os BRICS estão construindo uma arquitetura financeira alternativa que redistribuirá o poder econômico global de forma dramática.",
    content: "Os BRICS estão criando uma alternativa real ao sistema financeiro ocidental, com implicações profundas para o futuro econômico global.",
    category: "BRICS",
    readTime: "28 min",
  },
  {
    themeId: "ww2",
    title: "Véspera da Segunda Guerra: Os Laços Comerciais que Financiaram o Nazismo",
    summary: "Uma investigação sobre como corporações americanas forneceram tecnologia e capital que tornaram possível o rearmamento alemão.",
    content: "Corporações americanas tiveram um papel crucial no financiamento e apoio ao rearmamento nazista, priorizando lucros sobre ética.",
    category: "Segunda Guerra",
    readTime: "18 min",
  },
];

async function importArticles() {
  try {
    const connection = await mysql.createConnection(
      process.env.DATABASE_URL || ""
    );

    console.log("🔄 Importando artigos...");

    for (const article of articles) {
      try {
        await connection.execute(
          `INSERT INTO articles (title, summary, content, category, theme_id, read_time) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            article.title,
            article.summary,
            article.content,
            article.category,
            article.themeId,
            article.readTime,
          ]
        );
        console.log(`✅ Importado: ${article.title}`);
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          console.log(`⚠️  Já existe: ${article.title}`);
        } else {
          throw err;
        }
      }
    }

    console.log("\n✅ Importação concluída!");
    await connection.end();
  } catch (error) {
    console.error("❌ Erro ao importar artigos:", error.message);
    process.exit(1);
  }
}

importArticles();

# Siga o Dinheiro - Documentação Completa

## Visão Geral

Este é o site "Siga o Dinheiro", uma plataforma de artigos sobre poder financeiro, história econômica e conexões ocultas que moldaram o mundo moderno.

## Estrutura do Projeto

```
siga_dinheiro_web/
├── client/
│   ├── public/
│   │   ├── data/           # Arquivos JSON dos artigos
│   │   └── images/         # Imagens do site
│   └── src/
│       ├── data/
│       │   └── articles.ts # Lista de artigos e categorias
│       └── pages/
│           ├── Home.tsx    # Página inicial
│           └── Article.tsx # Página de leitura
├── dist/                   # Build de produção
└── package.json
```

## Como Adicionar um Novo Artigo

### Passo 1: Criar o arquivo JSON do artigo

Crie um arquivo em `client/public/data/` com o nome do artigo (ex: `novo_artigo.json`):

```json
{
  "id": "novo-artigo-001",
  "themeId": "categoria-do-artigo",
  "title": "Título do Artigo",
  "date": "2024-01-15",
  "summary": "Resumo do artigo em uma ou duas frases.",
  "content": "# Título\n\nConteúdo do artigo em Markdown...\n\n## Seção 1\n\nTexto da seção..."
}
```

### Passo 2: Registrar o artigo na lista

Edite o arquivo `client/src/data/articles.ts` e adicione o novo artigo ao array `articles`:

```typescript
{
  id: "novo-artigo-001",
  themeId: "categoria-do-artigo",
  title: "Título do Artigo",
  summary: "Resumo do artigo...",
  date: "2024-01-15",
  category: "Nome da Categoria",
  readTime: "15 min",
  contentFile: "novo_artigo.json"
}
```

### Passo 3: Adicionar nova categoria (se necessário)

Se o artigo pertence a uma nova categoria, adicione-a ao array `categories`:

```typescript
{ id: "nova-categoria", name: "Nome da Categoria", icon: "🆕" }
```

## Como Editar um Artigo Existente

1. Localize o arquivo JSON do artigo em `client/public/data/`
2. Edite o campo `content` com o novo texto em formato Markdown
3. Faça commit e push das alterações

## Formato do Conteúdo (Markdown)

O conteúdo dos artigos usa Markdown. Exemplos:

```markdown
# Título Principal

## Subtítulo

Parágrafo normal com **texto em negrito** e *itálico*.

> Citação em bloco

- Item de lista
- Outro item

1. Lista numerada
2. Segundo item

---

Linha separadora acima
```

## Deploy no Vercel

### Primeira vez:

1. Exporte o projeto para o GitHub (Management UI > Settings > GitHub)
2. Acesse vercel.com e faça login
3. Clique em "New Project"
4. Importe o repositório do GitHub
5. Vercel detectará automaticamente as configurações
6. Clique em "Deploy"

### Atualizações:

Após fazer alterações:
1. Faça commit das mudanças
2. Push para o GitHub
3. Vercel fará deploy automático

## Configurar Domínio dgp.money

1. No Vercel, vá em Settings > Domains
2. Adicione "dgp.money"
3. Configure os DNS no seu provedor de domínio:
   - Tipo A: @ → 76.76.21.21
   - Tipo CNAME: www → cname.vercel-dns.com

## Artigos Incluídos

1. **O Senhor das Finanças** - J.P. Morgan
2. **A Rede Invisível** - Conexões entre os Arquitetos do Poder
3. **O Barão do Aço** - Andrew Carnegie
4. **O Rei do Petróleo** - Rockefeller
5. **O Sistema Monetário Padrão** - Transferência de Riqueza
6. **BRICS e a Desdolarização** - Fim da Hegemonia do Dólar
7. **Véspera da Segunda Guerra** - Financiamento do Nazismo

## Suporte

Para problemas técnicos, verifique:
- Console do navegador (F12) para erros
- Logs do Vercel para erros de build
- Estrutura dos arquivos JSON (formato válido)

## Tecnologias Usadas

- React 18
- TypeScript
- Tailwind CSS 4
- Vite
- Wouter (roteamento)
- Streamdown (renderização Markdown)

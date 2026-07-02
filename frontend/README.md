# Pastelaria Central Frontend

MVP 1 em React + Vite para cardápio digital, carrinho, pedido rápido via WhatsApp e solicitação de encomendas.

## Stack

- React
- Vite
- JavaScript
- CSS puro
- Dados locais em `src/data`
- Sem backend e sem banco de dados neste MVP

## Rodar localmente

```bash
cd frontend
npm install
npm run dev
```

## Estrutura

- `src/data`: categorias, produtos mockados e configurações do negócio.
- `src/features/cart`: regras de carrinho, total e mensagem de pedido.
- `src/features/encomendas`: validação e mensagem de orçamento.
- `src/components`: componentes reutilizáveis da interface.
- `src/pages`: páginas públicas do MVP.

## Configuração importante

Troque o número em `src/data/siteConfig.js`:

```js
whatsappNumber: "5500000000000"
```

Use o formato internacional sem `+`, espaços ou hífens.

## Editar produtos

O jeito recomendado de manter o cardápio agora é por pastas em `public/cardapio`.

Cada pasta dentro de `public/cardapio` vira uma categoria/tópico. Cada pasta dentro da categoria vira um produto.

Exemplo:

```text
public/cardapio/
├── bebidas/
│   └── refrigerante-lata/
│       ├── 1.png
│       ├── 2.png
│       └── info.txt
└── pasteis/
    └── pastel-de-carne/
        ├── 1.png
        └── info.txt
```

Modelo de `info.txt`:

```text
nome: Pastel de carne
preco: 8,00
descricao: Pastel frito na hora com recheio de carne temperada.
disponivel: sim
tipo: pedido_rapido
selo: Mais vendido
destaque: sim
```

Depois de editar pastas, rode:

```bash
npm run generate:cardapio
```

Esse comando roda automaticamente antes de `npm run dev` e `npm run build`.

O arquivo `src/data/products.js` continua existindo como fallback técnico. Cada item deve manter os campos:

```js
{
  id,
  name,
  category,
  description,
  price,
  image,
  available,
  type,
  badge
}
```

Tipos aceitos: `pedido_rapido`, `encomenda` e `ambos`.

As categorias ficam em `src/data/categories.js`.

## Como testar manualmente

Use também o checklist completo em `../docs/21-checklist-testes-manuais.md`.

### Experiência mobile app-like

1. Abra o site com largura próxima de 360px ou 390px.
2. Confira o topo mobile com nome, cidade e carrinho.
3. Use a barra inferior: Início, Cardápio, Carrinho, Encomendas e Contato.
4. No Cardápio, busque um produto pelo nome, descrição ou categoria.
5. Navegue pelas categorias horizontais.
6. Toque em um produto para abrir o modal.
7. Escolha quantidade e observação do item.
8. Adicione ao carrinho e confira o botão flutuante com quantidade e total.

### Pedido rápido

1. Rode o projeto com `npm run dev`.
2. Abra o Cardápio.
3. Filtre uma categoria.
4. Adicione um produto disponível ao carrinho.
5. Aumente, diminua e remova quantidades.
6. Tente enviar com carrinho vazio para conferir a validação.
7. Faça um pedido válido com nome, telefone, retirada ou entrega, pagamento e observação.
8. Confira se o WhatsApp abre com itens, subtotal, total e dados do cliente.

### Encomenda

1. Abra a página Encomendas.
2. Tente enviar o formulário vazio para conferir as mensagens de erro.
3. Preencha nome, telefone, tipo de encomenda, produto, quantidade, cidade, data e retirada ou entrega.
4. Envie a solicitação.
5. Confira se o WhatsApp abre com a mensagem de orçamento e a frase de confirmação de valor, prazo e disponibilidade.

### Alteração do número do WhatsApp

1. Abra `src/data/siteConfig.js`.
2. Troque `whatsappNumber`.
3. Use o formato internacional sem `+`, espaços ou hífens.
4. Gere um pedido e uma encomenda para conferir os links.

### Edição de produtos

1. Abra `src/data/products.js`.
2. Edite nome, descrição, preço, categoria, imagem, disponibilidade, tipo e selo.
3. Confirme que a categoria existe em `src/data/categories.js`.
4. Abra o Cardápio e teste o filtro correspondente.

### Build de produção

```bash
npm run build
```

O comando deve finalizar sem erro e gerar a pasta `dist`.

## Publicação futura

O projeto pode ser publicado em serviços como Vercel ou Netlify. Antes de publicar, confirme:

- número real do WhatsApp;
- endereço;
- horário de funcionamento;
- imagens reais dos produtos;
- URL correta do Instagram.

## Limitações do MVP

- Não possui backend.
- Não possui banco de dados.
- Não possui login ou painel administrativo.
- Não confirma pedido automaticamente; a confirmação acontece na conversa do WhatsApp.
- Pagamento online, estoque, relatórios e integrações ficam para fases futuras.

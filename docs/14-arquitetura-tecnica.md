# 14. Arquitetura Técnica

## Objetivo

Definir a arquitetura inicial e a evolução técnica do projeto.

## MVP 1

Arquitetura simples, sem backend obrigatório.

```text
Cliente
↓
Site React + Vite
↓
Produtos em JSON
↓
Carrinho local
↓
WhatsApp
```

## Tecnologias recomendadas para o MVP

- React.
- Vite.
- JavaScript.
- CSS ou Tailwind.
- Vercel ou Netlify.
- WhatsApp link API.

## Estrutura inicial sugerida

```text
pastelaria-central/
├── docs/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── features/
│   │   └── styles/
│   └── package.json
└── README.md
```

## Backend futuro

Tecnologias sugeridas:

- Node.js.
- Express.
- PostgreSQL ou Supabase.
- JWT ou sessão para autenticação.

## Estrutura futura

```text
backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── database/
│   └── app.js
└── package.json
```

## Decisão arquitetural

O MVP deve validar o valor comercial antes da criação de um sistema administrativo completo.
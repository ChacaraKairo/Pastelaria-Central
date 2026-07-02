# Formulário de Cardápio

Aplicativo Electron para cadastrar categorias, produtos, preços, descrições e imagens.

Ao exportar, ele gera uma pasta `cardapio` no mesmo formato usado pelo site:

```text
cardapio/
├── pasteis/
│   └── pastel-de-carne/
│       ├── 1.png
│       ├── 2.png
│       └── info.txt
└── bebidas/
    └── refrigerante-lata/
        ├── 1.jpg
        └── info.txt
```

## Rodar

```bash
cd formulario
npm install
npm start
```

## Como usar

1. Crie categorias.
2. Cadastre produtos.
3. Adicione imagens.
4. Clique em Exportar cardápio.
5. Escolha uma pasta de destino.
6. Copie a pasta `cardapio` exportada para `frontend/public/cardapio`.

Depois, no frontend:

```bash
cd frontend
npm run generate:cardapio
npm run dev
```

## Onde os dados ficam salvos

Enquanto você trabalha, os dados ficam salvos em um banco SQLite local do Electron:

```text
userData/catalog.sqlite
```

As imagens selecionadas são copiadas para uma pasta interna:

```text
userData/product-images/
```

Use Exportar cardápio para gerar a pasta final.

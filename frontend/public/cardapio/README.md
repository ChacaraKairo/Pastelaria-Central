# Cardápio por Pastas

Esta pasta controla os produtos do site.

## Estrutura

```text
cardapio/
├── bebidas/
│   └── coca-cola-lata/
│       ├── 1.png
│       ├── 2.png
│       └── info.txt
├── pasteis/
│   └── pastel-de-carne/
│       ├── 1.png
│       └── info.txt
└── produtos-de-nc/
    └── cachaca-artesanal/
        ├── 1.png
        └── info.txt
```

Cada pasta dentro de `cardapio` vira um tópico/categoria no site.

Cada pasta dentro do tópico vira um produto.

## Imagens

Use nomes simples:

```text
1.png
2.png
3.jpg
```

A primeira imagem vira a foto principal do produto. As outras aparecem no modal do produto.

## Arquivo info.txt

Modelo:

```text
nome: Pastel de carne
preco: 8,00
descricao: Pastel frito na hora com recheio de carne temperada.
disponivel: sim
tipo: pedido_rapido
selo: Mais vendido
destaque: sim
```

## Campos aceitos

- `nome`: nome exibido no site.
- `preco`: preço em reais. Pode usar `8,00` ou `8.00`.
- `descricao`: texto curto do produto.
- `disponivel`: use `sim` ou `nao`.
- `tipo`: `pedido_rapido`, `encomenda` ou `ambos`.
- `selo`: etiqueta do card.
- `destaque`: use `sim` para aparecer nos destaques da home.

## Atualizar o site

Depois de criar ou editar pastas, rode:

```bash
npm run generate:cardapio
```

O comando também roda automaticamente antes de:

```bash
npm run dev
npm run build
```

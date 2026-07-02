# 28. Ajustes no Cardápio para Experiência Fast-Food

## Objetivo

Complementar o documento `12-cardapio-categorias-produtos.md` com ajustes comerciais para que o cardápio funcione como um sistema de pedido de fast-food.

## Nova ordem comercial das categorias

A ordem recomendada para exibição das categorias é:

1. Salgados.
2. Bebidas.
3. Combos.
4. Pastéis.
5. Promoções.
6. Café do Ciclista.
7. Massa de Pastel.
8. Congelados.
9. Encomendas.

## Motivo da ordem

Salgados devem aparecer primeiro porque são produtos principais e de decisão rápida.

Bebidas devem aparecer em seguida porque são o complemento mais natural para aumentar o valor do pedido.

Combos devem vir logo depois para estimular a compra de conjuntos prontos.

Massa de pastel, congelados e encomendas devem ficar mais abaixo ou em área própria, pois representam compra planejada ou sob orçamento.

## Campos adicionais recomendados nos produtos

Cada produto pode ter campos comerciais para permitir sugestões automáticas.

```js
{
  id: 1,
  name: "Coxinha de frango",
  category: "Salgados",
  description: "Coxinha tradicional com recheio de frango.",
  price: 7.00,
  image: "/images/coxinha.jpg",
  available: true,
  type: "pedido_rapido",
  badge: "Mais vendido",
  role: "principal",
  suggestedCategories: ["Bebidas", "Combos"]
}
```

## Papéis comerciais

- `principal`: produto principal do pedido, como salgados e pastéis.
- `complemento`: produto sugerido para acompanhar, como bebidas.
- `combo`: produto montado para aumentar o ticket médio.
- `encomenda`: produto sob orçamento ou data futura.

## Regras de sugestão

### Quando adicionar salgado ou pastel

Sugerir bebidas e combos.

Texto sugerido:

```text
Quer uma bebida para acompanhar?
```

### Quando adicionar bebida primeiro

Sugerir salgados mais vendidos.

Texto sugerido:

```text
Que tal escolher um salgado para acompanhar?
```

### Quando o carrinho tiver produto principal sem bebida

Mostrar seção:

```text
Complete seu pedido
```

Com bebidas disponíveis.

### Quando o carrinho tiver itens individuais

Sugerir combos da casa.

## Produtos de encomenda

Produtos com `type: "encomenda"` devem mostrar botão:

```text
Solicitar orçamento
```

E direcionar para o fluxo de encomendas, não para o carrinho comum.

## Seções comerciais recomendadas

- Mais pedidos.
- Salgados para agora.
- Bebidas geladas.
- Combos da casa.
- Promoções.
- Encomendas e congelados.

## Relação com a estratégia principal

Este documento complementa:

- `12-cardapio-categorias-produtos.md`
- `27-estrategia-fastfood-upsell.md`

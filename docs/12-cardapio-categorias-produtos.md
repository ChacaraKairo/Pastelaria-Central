# 12. Cardápio, Categorias e Produtos

## Objetivo

Definir a organização inicial dos produtos no site.

## Categorias iniciais

- Pastéis.
- Salgados.
- Bebidas.
- Combos.
- Café do Ciclista.
- Massa de Pastel.
- Congelados.
- Encomendas.
- Promoções.

## Campos do produto no MVP

```js
{
  id: 1,
  name: "Pastel de carne",
  category: "Pastéis",
  description: "Pastel frito na hora com recheio de carne temperada.",
  price: 8.00,
  image: "/images/pastel-carne.jpg",
  available: true,
  type: "pedido_rapido"
}
```

## Tipos de produto

- `pedido_rapido`: produto vendido para consumo imediato.
- `encomenda`: produto vendido sob solicitação.
- `ambos`: produto que pode ser comprado no pedido rápido e também encomendado.

## Produtos para encomenda

Produtos sob encomenda devem ter informações adicionais:

- quantidade mínima;
- prazo recomendado;
- disponibilidade para outras cidades;
- observações de produção.

## Combos

Combos devem ser usados para aumentar conversão.

Exemplos:

- Combo pastel + bebida.
- Combo família.
- Combo ciclista.
- Kit congelados.
- Kit festa.
# 27. Estratégia Fast-Food e Upsell

## Objetivo

Definir uma experiência de compra mais parecida com redes de fast-food, em que o sistema não apenas exibe produtos, mas conduz o cliente a montar um pedido maior e mais completo.

A ideia é transformar o site em uma ferramenta de venda, com sugestão de bebidas, combos e complementos.

## Direção comercial

O cliente deve sentir que está comprando em um sistema moderno de pedidos, semelhante a experiências de fast-food e delivery.

A experiência deve priorizar:

- produtos principais primeiro;
- bebidas como complemento natural;
- combos em destaque;
- sugestão de itens adicionais;
- pedido rápido;
- checkout simples pelo WhatsApp.

## Nova ordem das categorias

A ordem comercial das categorias deve ser:

1. Salgados.
2. Bebidas.
3. Combos.
4. Pastéis.
5. Promoções.
6. Café do Ciclista.
7. Massa de Pastel.
8. Congelados.
9. Encomendas.

Essa ordem deve ser usada em:

- filtros de categoria;
- carrosséis mobile;
- seções da Home;
- páginas de cardápio;
- páginas de produtos por categoria.

## Motivo da nova ordem

Salgados aparecem primeiro porque são produtos principais de compra rápida.

Bebidas aparecem logo em seguida porque são o complemento mais natural para aumentar o valor do pedido.

Combos aparecem em destaque porque reduzem a decisão do cliente e incentivam compras maiores.

Massa de pastel, congelados e encomendas devem ficar em uma experiência separada, pois representam compra planejada ou sob orçamento.

## Papéis comerciais dos produtos

Cada produto poderá ter um papel comercial.

Papéis sugeridos:

- `principal`: produto principal do pedido, como salgados e pastéis.
- `complemento`: produto sugerido para acompanhar, como bebidas.
- `combo`: produto montado para aumentar ticket médio.
- `encomenda`: produto vendido sob orçamento ou com data futura.

Exemplo:

```js
{
  id: 1,
  name: "Coxinha de frango",
  category: "Salgados",
  description: "Coxinha tradicional com recheio de frango.",
  price: 7.0,
  image: "/images/coxinha.jpg",
  available: true,
  type: "pedido_rapido",
  badge: "Mais vendido",
  role: "principal",
  suggestedCategories: ["Bebidas", "Combos"]
}
```

## Regra de sugestão de bebidas

Quando o cliente adicionar ao carrinho um produto da categoria `Salgados` ou `Pastéis`, o sistema deve sugerir bebidas.

Comportamento esperado:

1. Cliente adiciona um salgado ou pastel.
2. Produto entra no carrinho.
3. Sistema exibe sugestão: “Quer uma bebida para acompanhar?”
4. Sistema mostra até 3 bebidas disponíveis.
5. Cliente pode adicionar uma bebida ou continuar sem bebida.

Texto sugerido:

```text
Quer uma bebida para acompanhar?
Seu pedido combina com uma bebida gelada.
```

## Regra de sugestão de combos

Quando o cliente adicionar um produto principal, o sistema também pode sugerir combos.

No MVP, combos podem ser produtos cadastrados normalmente na categoria `Combos`.

Não é obrigatório montar combo automaticamente no código. O sistema pode apenas sugerir produtos da categoria `Combos`.

Texto sugerido:

```text
Transforme seu pedido em combo
Mais sabor e praticidade para o seu lanche.
```

## Seção “Complete seu pedido”

Antes da finalização pelo WhatsApp, o carrinho deve mostrar uma seção de venda adicional.

Regras simples:

- Se o carrinho tiver salgados ou pastéis e não tiver bebidas, sugerir bebidas.
- Se o carrinho tiver bebidas e não tiver salgados ou pastéis, sugerir salgados.
- Se o carrinho tiver itens individuais e não tiver combo, sugerir combos.

Nome da seção:

```text
Complete seu pedido
```

## Seções comerciais da Home

A Home deve priorizar seções com linguagem de venda.

Seções recomendadas:

- Mais pedidos.
- Salgados para agora.
- Bebidas geladas.
- Combos da casa.
- Promoções.
- Encomendas e congelados.
- Café do Ciclista.

Evitar títulos frios como:

- Lista de produtos.
- Visualização de itens.
- Categorias cadastradas.

Preferir chamadas como:

- Escolha seu salgado favorito.
- Adicione uma bebida gelada.
- Transforme em combo.
- Complete seu pedido.
- Peça agora pelo WhatsApp.

## Pedido rápido x encomenda

Produtos de pedido rápido devem ir para o carrinho comum.

Produtos de encomenda, massa de pastel e congelados devem conduzir o cliente para solicitação de orçamento quando fizer sentido.

Se o produto tiver `type: "encomenda"`, o botão principal deve ser:

```text
Solicitar orçamento
```

E deve levar para o fluxo de encomendas.

## Funções auxiliares sugeridas

Podem ser criadas funções como:

```text
getProductsByCategory
getSuggestedProducts
hasCategoryInCart
getCartUpsellSuggestions
getFeaturedProducts
getComboSuggestions
```

Locais sugeridos:

```text
src/features/products/productUtils.js
src/features/cart/cartUtils.js
```

## Critérios de aceite

A estratégia será considerada aplicada quando:

1. Salgados aparecerem antes das demais categorias.
2. Bebidas aparecerem logo depois de salgados.
3. Combos tiverem destaque visual.
4. Ao adicionar salgado ou pastel, o sistema sugerir bebidas.
5. O carrinho mostrar a seção “Complete seu pedido”.
6. Produtos de encomenda levarem para solicitação de orçamento.
7. A Home tiver seções comerciais e não apenas listagem fria.
8. Pedido via WhatsApp continuar funcionando.
9. Encomenda via WhatsApp continuar funcionando.
10. O projeto continuar sem backend e sem banco de dados no MVP.

# 29. Fluxo de Pedido com Upsell

## Objetivo

Complementar o fluxo de pedido rápido com uma etapa de sugestão de bebidas, combos e complementos.

## Fluxo recomendado

1. Cliente acessa o cardápio.
2. Cliente escolhe um salgado, pastel ou combo.
3. Cliente adiciona o produto ao carrinho.
4. Se o produto for salgado ou pastel, o sistema sugere bebidas.
5. O cliente pode adicionar uma bebida ou continuar sem bebida.
6. O sistema pode sugerir combo da casa.
7. Cliente revisa o carrinho.
8. Antes de finalizar, o carrinho exibe a seção “Complete seu pedido”.
9. Cliente preenche dados pessoais.
10. Cliente escolhe retirada ou entrega.
11. Cliente escolhe forma de pagamento.
12. Cliente envia pedido pelo WhatsApp.

## Etapa: sugestão de bebida

Quando o cliente adicionar um produto da categoria `Salgados` ou `Pastéis`, exibir uma sugestão com até 3 bebidas disponíveis.

Texto:

```text
Quer uma bebida para acompanhar?
Seu pedido combina com uma bebida gelada.
```

Ações:

- Adicionar bebida.
- Continuar sem bebida.

## Etapa: sugestão de combo

Quando o cliente adicionar produto principal, sugerir combos cadastrados.

Texto:

```text
Transforme seu pedido em combo
Mais sabor e praticidade para o seu lanche.
```

## Etapa: complete seu pedido

No carrinho, antes do botão de WhatsApp, exibir:

```text
Complete seu pedido
```

Regras:

- Se houver salgado ou pastel sem bebida, sugerir bebidas.
- Se houver bebida sem produto principal, sugerir salgados.
- Se houver itens individuais sem combo, sugerir combos.

## Modelo de mensagem do WhatsApp

A mensagem final continua seguindo o fluxo documentado em `10-fluxo-pedido-rapido.md`.

Exemplo:

```text
Olá, Pastelaria Central! Quero fazer um pedido.

Nome: [nome]
Telefone: [telefone]

Pedido:
- [quantidade]x [produto] - R$ [subtotal]

Total: R$ [total]

Tipo: [retirada/entrega]
Endereço: [endereço]
Pagamento: [forma de pagamento]
Observações: [observações]
```

## Regra importante

O upsell não deve impedir a finalização do pedido. O cliente sempre deve poder continuar sem adicionar bebida ou combo.
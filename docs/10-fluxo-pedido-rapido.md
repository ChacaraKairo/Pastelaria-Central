# 10. Fluxo de Pedido Rápido

## Objetivo

Permitir que o cliente monte um pedido no site e envie para a Pastelaria Central pelo WhatsApp.

## Etapas

1. Cliente acessa o cardápio.
2. Escolhe produtos.
3. Adiciona ao carrinho.
4. Revisa itens e quantidades.
5. Preenche dados pessoais.
6. Escolhe retirada ou entrega.
7. Escolhe forma de pagamento.
8. Adiciona observações.
9. Clica em enviar pelo WhatsApp.
10. O site abre conversa com mensagem formatada.

## Dados obrigatórios

- Nome.
- Telefone.
- Tipo de recebimento: retirada ou entrega.
- Forma de pagamento.

## Dados condicionais

- Endereço, obrigatório apenas para entrega.

## Modelo de mensagem

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

O envio pelo WhatsApp não confirma automaticamente o pedido. A confirmação será feita pela pastelaria na conversa.
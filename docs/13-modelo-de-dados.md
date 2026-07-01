# 13. Modelo de Dados

## Objetivo

Planejar os dados do MVP e preparar a evolução para banco de dados.

## MVP 1

No MVP 1, os produtos podem ser mantidos em arquivos estáticos.

Arquivos sugeridos:

```text
src/data/categories.js
src/data/products.js
```

## Entidades futuras

### Categoria

- id
- nome
- ativo

### Produto

- id
- categoria_id
- nome
- descrição
- preço
- imagem
- disponível
- tipo
- quantidade mínima

### Cliente

- id
- nome
- telefone
- cidade

### Pedido

- id
- cliente_id
- tipo
- status
- total
- forma_pagamento
- retirada_ou_entrega
- endereço
- observações
- criado_em

### Item do pedido

- id
- pedido_id
- produto_id
- quantidade
- preço_unitário
- subtotal

### Encomenda

- id
- cliente_id
- tipo_encomenda
- cidade
- data_desejada
- status
- valor_estimado
- valor_confirmado
- observações

### Item da encomenda

- id
- encomenda_id
- produto_id
- quantidade
- observações

## Status do pedido

- RECEBIDO
- EM_PREPARO
- PRONTO
- SAIU_PARA_ENTREGA
- FINALIZADO
- CANCELADO

## Status da encomenda

- SOLICITADA
- EM_ANALISE
- ORCAMENTO_ENVIADO
- CONFIRMADA
- EM_PRODUCAO
- PRONTA
- ENTREGUE
- CANCELADA
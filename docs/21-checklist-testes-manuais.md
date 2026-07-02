# 21. Checklist de Testes Manuais

## Objetivo

Validar manualmente o MVP 1 da Pastelaria Central antes da apresentação inicial para teste real.

## CT001 — Abrir página inicial

Objetivo:
Verificar se a home carrega corretamente.

Passos:
1. Abrir o site.
2. Verificar se o cabeçalho aparece.
3. Verificar se o hero aparece.
4. Verificar se os botões principais aparecem.

Resultado esperado:
A página deve carregar sem erro e exibir as chamadas principais da Pastelaria Central.

## CT002 — Validar chamadas da home

Objetivo:
Confirmar se a página inicial tem foco comercial.

Passos:
1. Abrir a home.
2. Ler o texto principal.
3. Verificar se existem chamadas para pedido rápido e encomenda.
4. Verificar se existem produtos em destaque, combos, encomendas e Café do Ciclista.

Resultado esperado:
A home deve parecer uma vitrine de fast-food, com botões visíveis para pedir e encomendar.

## CT003 — Navegar pelo cabeçalho

Objetivo:
Verificar se a navegação principal funciona.

Passos:
1. Clicar em Início.
2. Clicar em Cardápio.
3. Clicar em Encomendas.
4. Clicar em Café do Ciclista.
5. Clicar em Sobre.
6. Clicar em Contato.

Resultado esperado:
Cada clique deve abrir a página correta sem erro visual ou tela em branco.

## CT004 — Abrir cardápio

Objetivo:
Verificar se os produtos aparecem no cardápio.

Passos:
1. Abrir o site.
2. Clicar em Cardápio.
3. Verificar os cards de produto.
4. Conferir nome, descrição, preço, selo e imagem.

Resultado esperado:
O cardápio deve listar produtos com informações legíveis e imagens carregadas.

## CT005 — Filtrar categoria Pastéis

Objetivo:
Validar o filtro por categoria.

Passos:
1. Abrir o Cardápio.
2. Clicar na categoria Pastéis.
3. Conferir os produtos exibidos.

Resultado esperado:
Devem aparecer somente produtos da categoria Pastéis.

## CT006 — Filtrar todas as categorias

Objetivo:
Garantir que todas as categorias iniciais funcionam.

Passos:
1. Abrir o Cardápio.
2. Clicar em Todos.
3. Clicar em Pastéis.
4. Clicar em Salgados.
5. Clicar em Bebidas.
6. Clicar em Combos.
7. Clicar em Café do Ciclista.
8. Clicar em Massa de Pastel.
9. Clicar em Congelados.
10. Clicar em Encomendas.
11. Clicar em Promoções.

Resultado esperado:
Cada filtro deve atualizar a lista sem quebrar o layout.

## CT007 — Produto indisponível

Objetivo:
Garantir que produto indisponível não pode ser adicionado ao carrinho.

Passos:
1. Abrir o Cardápio.
2. Filtrar por Promoções.
3. Localizar um produto indisponível.
4. Verificar se não existe botão de adicionar.

Resultado esperado:
O produto indisponível deve aparecer bloqueado ou sem ação de adicionar.

## CT008 — Adicionar produto ao carrinho

Objetivo:
Validar inclusão de item no carrinho.

Passos:
1. Abrir o Cardápio.
2. Clicar em Adicionar em um produto disponível.
3. Observar a abertura do carrinho.

Resultado esperado:
O carrinho deve abrir com o produto, quantidade 1, preço unitário, subtotal e total.

## CT009 — Aumentar quantidade

Objetivo:
Validar alteração positiva de quantidade.

Passos:
1. Adicionar um produto ao carrinho.
2. Clicar no botão de aumentar quantidade.
3. Conferir subtotal e total.

Resultado esperado:
A quantidade deve aumentar e os valores devem ser recalculados corretamente.

## CT010 — Diminuir quantidade

Objetivo:
Validar alteração negativa de quantidade.

Passos:
1. Adicionar um produto ao carrinho.
2. Aumentar para quantidade 2.
3. Clicar no botão de diminuir quantidade.

Resultado esperado:
A quantidade deve diminuir e o total deve ser atualizado.

## CT011 — Remover produto

Objetivo:
Validar remoção de item do carrinho.

Passos:
1. Adicionar um produto ao carrinho.
2. Clicar no botão de remover item.

Resultado esperado:
O item deve sair do carrinho e o total deve ser recalculado.

## CT012 — Limpar carrinho

Objetivo:
Validar limpeza completa do carrinho.

Passos:
1. Adicionar dois produtos ao carrinho.
2. Clicar em Limpar carrinho.

Resultado esperado:
O carrinho deve ficar vazio e mostrar mensagem clara de carrinho vazio.

## CT013 — Finalizar com carrinho vazio

Objetivo:
Garantir que pedido vazio não é enviado.

Passos:
1. Abrir o carrinho sem itens.
2. Clicar em Enviar pedido.

Resultado esperado:
O sistema deve mostrar a mensagem "Adicione pelo menos um produto ao carrinho." e não abrir WhatsApp.

## CT014 — Validar nome obrigatório no pedido

Objetivo:
Garantir validação do nome.

Passos:
1. Adicionar produto ao carrinho.
2. Deixar o nome vazio.
3. Preencher os demais campos obrigatórios.
4. Clicar em Enviar pedido.

Resultado esperado:
O sistema deve mostrar "Informe seu nome.".

## CT015 — Validar telefone obrigatório no pedido

Objetivo:
Garantir validação do telefone.

Passos:
1. Adicionar produto ao carrinho.
2. Preencher nome.
3. Deixar telefone vazio.
4. Escolher pagamento.
5. Clicar em Enviar pedido.

Resultado esperado:
O sistema deve mostrar "Informe seu telefone.".

## CT016 — Validar pagamento obrigatório

Objetivo:
Garantir validação da forma de pagamento.

Passos:
1. Adicionar produto ao carrinho.
2. Preencher nome e telefone.
3. Deixar pagamento sem seleção.
4. Clicar em Enviar pedido.

Resultado esperado:
O sistema deve mostrar "Escolha a forma de pagamento.".

## CT017 — Pedido para retirada

Objetivo:
Validar mensagem de pedido com retirada.

Passos:
1. Adicionar produto ao carrinho.
2. Preencher nome.
3. Preencher telefone.
4. Escolher Retirada.
5. Escolher pagamento.
6. Adicionar observação.
7. Clicar em Enviar pedido.

Resultado esperado:
O WhatsApp deve abrir com mensagem contendo itens, total, tipo retirada e "Endereço: não se aplica, retirada no local.".

## CT018 — Endereço obrigatório na entrega

Objetivo:
Garantir validação condicional do endereço.

Passos:
1. Adicionar produto ao carrinho.
2. Preencher nome e telefone.
3. Escolher Entrega.
4. Deixar endereço vazio.
5. Escolher pagamento.
6. Clicar em Enviar pedido.

Resultado esperado:
O sistema deve mostrar "Informe o endereço para entrega.".

## CT019 — Pedido para entrega

Objetivo:
Validar mensagem de pedido com entrega.

Passos:
1. Adicionar produto ao carrinho.
2. Preencher nome.
3. Preencher telefone.
4. Escolher Entrega.
5. Informar endereço.
6. Escolher pagamento.
7. Clicar em Enviar pedido.

Resultado esperado:
O WhatsApp deve abrir com mensagem contendo endereço preenchido, pagamento e total correto.

## CT020 — Link do WhatsApp do pedido

Objetivo:
Validar montagem da URL do WhatsApp.

Passos:
1. Finalizar um pedido válido.
2. Conferir a aba ou janela aberta.
3. Verificar se a URL começa com `https://wa.me/`.

Resultado esperado:
A conversa deve abrir usando o número configurado em `src/data/siteConfig.js` e texto codificado.

## CT021 — Abrir página Encomendas

Objetivo:
Validar acesso ao formulário de encomendas.

Passos:
1. Clicar em Encomendas no cabeçalho.
2. Verificar os tipos de encomenda.
3. Verificar o formulário.

Resultado esperado:
A página deve exibir tipos de encomenda e campos de solicitação de orçamento.

## CT022 — Enviar encomenda vazia

Objetivo:
Garantir validação dos campos obrigatórios.

Passos:
1. Abrir Encomendas.
2. Clicar em Solicitar orçamento sem preencher campos.

Resultado esperado:
O sistema deve mostrar mensagens claras para todos os campos obrigatórios.

## CT023 — Validar data da encomenda

Objetivo:
Garantir que data desejada é obrigatória.

Passos:
1. Abrir Encomendas.
2. Preencher todos os campos, exceto data desejada.
3. Clicar em Solicitar orçamento.

Resultado esperado:
O sistema deve mostrar "Informe a data desejada da encomenda.".

## CT024 — Gerar encomenda válida

Objetivo:
Validar mensagem completa de orçamento.

Passos:
1. Abrir Encomendas.
2. Preencher nome.
3. Preencher telefone.
4. Escolher tipo de encomenda.
5. Informar produto desejado.
6. Informar quantidade.
7. Informar cidade.
8. Informar data desejada.
9. Escolher Retirada ou Entrega.
10. Adicionar observação.
11. Clicar em Solicitar orçamento.

Resultado esperado:
O WhatsApp deve abrir com a mensagem de encomenda e a frase de confirmação de orçamento.

## CT025 — Link do WhatsApp da encomenda

Objetivo:
Validar URL de encomenda.

Passos:
1. Gerar uma encomenda válida.
2. Conferir a aba ou janela aberta.
3. Verificar se a URL começa com `https://wa.me/`.

Resultado esperado:
A conversa deve abrir usando o número centralizado em `src/data/siteConfig.js`.

## CT026 — Responsividade em 360px

Objetivo:
Validar celular pequeno.

Passos:
1. Abrir o site com largura de 360px.
2. Navegar pela home.
3. Abrir cardápio.
4. Abrir carrinho.
5. Abrir Encomendas.

Resultado esperado:
Menu, cards, botões, carrinho e formulários devem continuar usáveis sem sobreposição.

## CT027 — Responsividade em 390px

Objetivo:
Validar celular comum.

Passos:
1. Abrir o site com largura de 390px.
2. Repetir navegação principal.
3. Adicionar produto ao carrinho.

Resultado esperado:
Os botões devem ser confortáveis e os textos devem caber nos elementos.

## CT028 — Responsividade em 768px

Objetivo:
Validar tablet.

Passos:
1. Abrir o site com largura de 768px.
2. Conferir home, cardápio, carrinho e encomendas.

Resultado esperado:
O layout deve aproveitar melhor o espaço sem quebrar a navegação.

## CT029 — Responsividade em desktop

Objetivo:
Validar largura de 1024px ou mais.

Passos:
1. Abrir o site em desktop.
2. Navegar por todas as páginas.
3. Conferir cards, hero, seções e footer.

Resultado esperado:
O layout deve ficar organizado e com aparência comercial.

## CT030 — Acessibilidade de imagens

Objetivo:
Verificar texto alternativo em imagens.

Passos:
1. Inspecionar cards de produtos.
2. Inspecionar imagem do hero.

Resultado esperado:
As imagens devem possuir atributo `alt` descritivo.

## CT031 — Acessibilidade de campos

Objetivo:
Verificar labels dos formulários.

Passos:
1. Abrir carrinho.
2. Conferir formulário de pedido.
3. Abrir Encomendas.
4. Conferir formulário de encomenda.

Resultado esperado:
Todos os campos devem ter rótulos claros.

## CT032 — Acessibilidade de foco

Objetivo:
Validar navegação por teclado.

Passos:
1. Usar a tecla Tab no site.
2. Navegar por botões, links e campos.

Resultado esperado:
O foco deve ficar visível em elementos interativos.

## CT033 — Conteúdo comercial

Objetivo:
Garantir que o site não está institucional demais.

Passos:
1. Ler home, cardápio e encomendas.
2. Conferir chamadas como Pedir agora, Fazer encomenda e WhatsApp.

Resultado esperado:
O conteúdo deve estimular pedido e encomenda.

## CT034 — Configuração do WhatsApp

Objetivo:
Garantir que o número é fácil de trocar.

Passos:
1. Abrir `frontend/src/data/siteConfig.js`.
2. Localizar `whatsappNumber`.
3. Conferir se os links usam essa configuração.

Resultado esperado:
O número deve estar centralizado em `siteConfig.js`.

## CT035 — Configuração dos produtos

Objetivo:
Validar dados mockados.

Passos:
1. Abrir `frontend/src/data/products.js`.
2. Conferir produtos de todas as categorias iniciais.
3. Conferir campos obrigatórios.

Resultado esperado:
Os produtos devem permitir testar pedido rápido, encomenda, indisponibilidade e filtros.

## CT036 — Instalação

Objetivo:
Validar instalação do frontend.

Passos:
1. Entrar na pasta `frontend`.
2. Rodar `npm install`.

Resultado esperado:
A instalação deve terminar sem erro.

## CT037 — Servidor de desenvolvimento

Objetivo:
Validar execução local.

Passos:
1. Entrar na pasta `frontend`.
2. Rodar `npm run dev`.
3. Abrir a URL exibida no terminal.

Resultado esperado:
O Vite deve iniciar e a home deve abrir sem erro.

## CT038 — Build de produção

Objetivo:
Validar build final.

Passos:
1. Entrar na pasta `frontend`.
2. Rodar `npm run build`.

Resultado esperado:
O build deve finalizar sem erro.

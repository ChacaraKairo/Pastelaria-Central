# 31. Checklist de Produção

## Objetivo

Listar tudo que ainda falta resolver para colocar o site/sistema da Pastelaria Central em produção com segurança, boa experiência de compra e conteúdo final.

Use este documento como lista de execução antes de publicar.

## 1. Bloqueadores obrigatórios

- [x] Trocar o número real do WhatsApp em `frontend/src/data/siteConfig.js`.
  - Configurado como `5533999601227`.

- [x] Confirmar endereço real da Pastelaria Central.
  - Configurado como `R. Davi Mussi, 35 - Centro, Novo Cruzeiro - MG, 39820-000`.

- [x] Confirmar horário real de funcionamento.
  - Segunda a sexta, 07:00-18:00.
  - Sábado, 07:30-16:00.
  - Domingo fechado.

- [ ] Confirmar Instagram oficial.
  - Hoje está como `https://www.instagram.com/pastelaria.central/`.
  - Verificar se o perfil existe e se é o perfil correto.

- [x] Remover textos de placeholder da página Contato.
  - A página já não exibe mais texto dizendo que os dados são placeholders.
  - Dados reais de telefone, endereço e horário foram preenchidos.

- [ ] Testar pedido real pelo WhatsApp com o número final.
  - Adicionar produtos.
  - Finalizar pedido.
  - Enviar para WhatsApp.
  - Conferir se a mensagem chega formatada corretamente.

## 2. Cardápio e produtos

- [ ] Confirmar lista final de produtos de pedido rápido.
  - Pastéis.
  - Salgados fritos.
  - Salgados assados.
  - Bebidas.
  - Combos.
  - Doces/sobremesas, se forem vendidos no dia a dia.

- [ ] Confirmar lista final de produtos sob encomenda.
  - Massa de pastel.
  - Salgados congelados.
  - Cento de salgados.
  - Pedido para evento.
  - Pedido para outra cidade.
  - Combo para festa.
  - Produtos de NC, se forem mantidos.

- [x] Remover ou substituir produtos de exemplo.
  - As pastas `produto-exemplo` principais foram convertidas para slugs reais ou removidas.

- [x] Revisar produto duplicado ou parecido.
  - `Guaraná gelado` foi removido/substituído por `Mate Cola`, que possui foto real.

- [ ] Confirmar preços reais.
  - Verificar todos os `info.txt` em `frontend/public/cardapio`.
  - Produtos de pedido rápido devem ter preço real.
  - Produtos sob orçamento devem manter `preco: 0,00` e `tipo: encomenda`.

- [ ] Confirmar disponibilidade inicial.
  - `disponivel: sim` apenas para produtos que podem ser vendidos.
  - Usar `disponivel: nao` para itens pausados.

- [ ] Confirmar selos comerciais.
  - Exemplos: `Mais vendido`, `Quentinha`, `Gelado`, `Combo`, `Produto de NC`.
  - Evitar selos genéricos demais.

- [ ] Confirmar destaques da Home.
  - Usar `destaque: sim` nos produtos que devem aparecer primeiro.
  - Priorizar salgados, pastéis e combos.

- [ ] Padronizar categorias comerciais.
  - A experiência pública deve seguir:
    1. Salgados.
    2. Bebidas.
    3. Combos.
    4. Pastéis.
    5. Promoções.
    6. Café do Ciclista.
    7. Massa de Pastel.
    8. Congelados.
    9. Encomendas.
    10. Doces/Sobremesas.
    11. Produtos de NC.

## 3. Fotos e imagens

- [x] Mover imagens reais para os locais corretos.
  - Atualmente existem imagens soltas na raiz do projeto:
    - `logo.jpeg`
    - `faixada.jpeg`
    - `pastel-frito-recem-feito.jpeg`
    - `pastel-frito-vasilha-suco.jpeg`
    - `empada-cozinha-matecola-pimenta.jpeg`
    - `proprietario.jpeg`
    - `images.jpeg`
  - As imagens úteis foram copiadas para `frontend/public/images` e para pastas de produto em `frontend/public/cardapio`.

- [x] Substituir imagem do hero.
  - O hero agora usa `/images/hero-pastel-bebida.jpeg`.

- [x] Substituir placeholders dos produtos publicados.
  - Os produtos atualmente publicados no cardápio gerado usam fotos reais.
  - Produtos futuros ainda devem receber foto própria.

- [ ] Fotografar cada produto principal.
  - Coxinha de frango.
  - Enroladinho assado.
  - Pastel de carne.
  - Bebidas.
  - Combo especial.
  - Sobremesa/doce, se mantido.

- [ ] Fotografar produtos de encomenda, se forem divulgados.
  - Massa de pastel.
  - Salgados congelados.
  - Cento de salgados.
  - Kits para festa.

- [ ] Fotografar fachada.
  - Usar para página Contato, Sobre ou Café do Ciclista.
  - A imagem `faixada.jpeg` existe, mas precisa ser avaliada e posicionada.

- [ ] Fotografar equipe/proprietário, se fizer sentido para confiança.
  - A imagem `proprietario.jpeg` existe.
  - Confirmar autorização de uso.

- [ ] Preparar logo.
  - `logo.jpeg` existe na raiz.
  - Definir se será usado no cabeçalho no lugar do círculo `PC`.
  - Criar versão quadrada para favicon/app icon.

- [ ] Otimizar imagens para web.
  - Criar versões `.webp` quando possível.
  - Evitar fotos muito pesadas.
  - Ideal:
    - Hero: até 1600px de largura.
    - Cards de produto: 800px ou 1000px.
    - Ícones/favicons: tamanhos específicos.

- [ ] Confirmar direitos de uso das imagens.
  - Usar apenas fotos próprias ou autorizadas.
  - Evitar imagens retiradas da internet sem autorização.

## 4. Conteúdo e textos finais

- [ ] Revisar texto principal da Home.
  - Confirmar se comunica corretamente:
    - Pastéis.
    - Salgados.
    - Bebidas.
    - Encomendas.
    - WhatsApp.

- [ ] Revisar textos dos produtos.
  - Cada produto deve ter descrição curta, apetitosa e clara.
  - Evitar textos como `Descrição a confirmar com a empresa`.

- [ ] Revisar texto da página Sobre.
  - Confirmar história real da Pastelaria Central.
  - Incluir tempo de atuação, tradição, localização e diferenciais.

- [ ] Revisar texto do Café do Ciclista.
  - Confirmar se a Pastelaria realmente quer divulgar esse diferencial.
  - Confirmar texto sobre Rota Bahia-Minas.

- [ ] Revisar texto das encomendas.
  - Deixar claro que é orçamento.
  - Informar que valor, prazo e disponibilidade serão confirmados pelo WhatsApp.

- [ ] Revisar textos de botões.
  - `Pedir agora`.
  - `Adicionar`.
  - `Ver carrinho`.
  - `Continuar comprando`.
  - `Finalizar pedido`.
  - `Enviar pedido pelo WhatsApp`.
  - `Solicitar orçamento`.

## 5. Fluxo de pedido rápido

- [ ] Testar adicionar vários produtos sem abrir carrinho automaticamente.
  - O comportamento desejado é continuar comprando sem pressão.

- [ ] Testar feedback visual ao adicionar produto.
  - Deve aparecer aviso de produto adicionado.
  - Deve permitir `Ver carrinho`.
  - Deve permitir `Continuar comprando`.

- [ ] Testar carrinho.
  - Aumentar quantidade.
  - Diminuir quantidade.
  - Remover item.
  - Limpar carrinho.
  - Conferir subtotal e total.

- [ ] Testar observação do item.
  - Exemplo: `sem cebola`, `bem frito`, `mais molho`.
  - Confirmar se aparece na mensagem do WhatsApp.

- [ ] Testar etapa `Finalizar pedido`.
  - O botão WhatsApp só deve aparecer depois de finalizar.

- [ ] Testar alteração depois de finalizar.
  - Se adicionar/remover item depois de finalizar, o botão WhatsApp deve sumir.
  - O cliente deve clicar em `Finalizar pedido` novamente.

- [ ] Testar validações.
  - Carrinho vazio.
  - Nome vazio.
  - Telefone vazio.
  - Pagamento vazio.
  - Endereço vazio quando for entrega.

- [ ] Testar mensagem final do WhatsApp.
  - Nome.
  - Telefone.
  - Itens.
  - Observações dos itens.
  - Total.
  - Retirada/entrega.
  - Endereço.
  - Localização, se usada.
  - Pagamento.
  - Observações gerais.

## 6. Upsell e experiência fast-food

- [ ] Testar sugestão de bebida.
  - Carrinho com salgado ou pastel e sem bebida deve sugerir bebidas.

- [ ] Testar sugestão de salgado/pastel.
  - Carrinho com bebida e sem produto principal deve sugerir salgado ou pastel.

- [ ] Testar sugestão de combo.
  - Carrinho com itens individuais e sem combo deve sugerir combos.

- [ ] Garantir que o upsell aparece só uma vez.
  - A sugestão deve ficar dentro do carrinho.
  - Não deve haver sobreposição duplicada.

- [ ] Confirmar se existem combos reais.
  - Se não existirem, cadastrar pelo menos:
    - Combo pastel + bebida.
    - Combo salgado + bebida.
    - Combo família ou festa, se fizer sentido.

- [ ] Confirmar se combos entram no pedido rápido ou em encomenda.
  - Combos do dia a dia: `tipo: pedido_rapido`.
  - Combos de festa: `tipo: encomenda`.

## 7. Encomendas

- [ ] Confirmar tipos de encomenda disponíveis.
  - Massa de pastel.
  - Salgados congelados.
  - Cento de salgados.
  - Pedido para evento.
  - Pedido para outra cidade.
  - Combo para festa.

- [ ] Confirmar campos necessários.
  - Nome.
  - Telefone.
  - Tipo de encomenda.
  - Produto.
  - Quantidade.
  - Cidade.
  - Data desejada.
  - Retirada/entrega.
  - Observações.

- [ ] Testar mensagem de encomenda no WhatsApp.
  - Deve deixar claro que ainda depende de confirmação.

- [ ] Confirmar se produtos de encomenda no cardápio levam para orçamento.
  - Produtos com `tipo: encomenda` não devem entrar no carrinho comum.

## 8. Formulário administrativo local

- [ ] Decidir se o formulário Electron será entregue junto com o projeto.
  - Ele é útil para cadastrar produtos, mas não é painel online.

- [ ] Testar o formulário em uma máquina real da operação.
  - Rodar `cd formulario && npm start`.
  - Criar categoria.
  - Criar produto.
  - Adicionar imagem.
  - Exportar cardápio.

- [ ] Validar fluxo de exportação.
  - Exportar pasta `cardapio`.
  - Copiar para `frontend/public/cardapio`.
  - Rodar `npm run generate:cardapio`.
  - Conferir no site.

- [ ] Criar instrução simples para a pastelaria.
  - Como cadastrar produto.
  - Como alterar preço.
  - Como marcar indisponível.
  - Como exportar.
  - Como enviar a alteração para quem publica o site.

- [ ] Decidir se precisa empacotar o Electron.
  - Hoje existe apenas `npm start`.
  - Para uso por pessoa não técnica, pode ser necessário gerar instalador no futuro.

## 9. SEO, compartilhamento e identidade

- [ ] Adicionar favicon.
  - Criar a partir do logo.
  - Colocar em `frontend/public`.
  - Referenciar em `frontend/index.html`.

- [ ] Adicionar imagem de compartilhamento.
  - Criar `og-image` com foto real.
  - Ideal: 1200x630.

- [ ] Melhorar metatags em `frontend/index.html`.
  - `og:title`.
  - `og:description`.
  - `og:image`.
  - `og:type`.
  - `og:locale`.
  - `theme-color`.

- [ ] Adicionar dados estruturados de negócio local.
  - JSON-LD com:
    - nome.
    - endereço.
    - telefone.
    - horário.
    - cidade.
    - rede social.

- [ ] Confirmar domínio final.
  - Definir domínio ou subdomínio.
  - Exemplo: `pastelariacentral.com.br` ou outro domínio disponível.

- [ ] Confirmar Google Business Profile.
  - O site deve ser adicionado ao perfil da empresa no Google.
  - Conferir endereço, telefone e horário.

## 10. Privacidade e informações legais

- [ ] Criar aviso simples sobre uso de dados.
  - O site salva dados no aparelho quando o cliente marca essa opção.
  - Os dados são enviados pelo WhatsApp.

- [ ] Criar página ou seção de política de privacidade simples.
  - Mesmo sem backend, há uso de `localStorage` e geolocalização opcional.

- [x] Revisar uso da localização.
  - O site solicita autorização de localização ao entrar.
  - A localização fica salva junto dos dados do cliente no `localStorage`.
  - A localização vai na mensagem do WhatsApp quando autorizada.

- [ ] Confirmar autorização para uso de fotos de pessoas.
  - Especialmente `proprietario.jpeg`.

- [ ] Confirmar informações fiscais/comerciais necessárias.
  - Se a empresa quiser, incluir razão social, CNPJ ou informações de contato formal.

## 11. Performance e qualidade técnica

- [ ] Otimizar imagens antes de publicar.
  - Converter para `.webp`.
  - Reduzir peso.
  - Evitar imagens grandes demais.

- [ ] Rodar build final.
  - Comando:
    ```bash
    cd frontend
    npm run build
    ```

- [ ] Rodar preview de produção.
  - Comando:
    ```bash
    cd frontend
    npm run preview
    ```

- [ ] Testar em celular real.
  - Android.
  - iPhone, se possível.
  - WhatsApp instalado.
  - Navegador Chrome.
  - Navegador Safari, se possível.

- [ ] Testar em desktop.
  - Chrome.
  - Edge.
  - Firefox, se possível.

- [ ] Testar conexão lenta.
  - Imagens devem carregar sem deixar a tela pesada.

- [ ] Conferir acessibilidade básica.
  - Botões clicáveis.
  - Contraste.
  - Campos com rótulos.
  - Navegação pelo teclado no carrinho e modal.

## 12. Deploy e infraestrutura

- [ ] Escolher plataforma de deploy.
  - Vercel.
  - Netlify.
  - Cloudflare Pages.

- [ ] Configurar build da plataforma.
  - Diretório: `frontend`.
  - Build command: `npm run build`.
  - Output: `dist`.

- [ ] Configurar domínio.
  - Comprar ou apontar domínio.
  - Configurar DNS.
  - Ativar HTTPS.

- [ ] Configurar redirects para SPA.
  - Como o site usa hash (`#menu`, `#encomendas`), o risco é menor.
  - Mesmo assim, validar links diretos.

- [ ] Criar rotina de atualização de cardápio.
  - Quem altera produtos?
  - Quem roda o formulário?
  - Quem publica o novo `cardapio`?
  - Quem valida WhatsApp depois da mudança?

## 13. Organização do repositório

- [x] Decidir destino das imagens soltas na raiz.
  - As imagens novas foram incorporadas ao frontend e as duplicatas soltas foram removidas.

- [ ] Resolver deleções pendentes de imagens antigas.
  - O Git mostra remoção de:
    - `images (1).jpeg`
    - `images (2).jpeg`
    - `images (3).jpeg`
    - `images (4).jpeg`
    - `images (5).jpeg`
    - `images (6).jpeg`
  - Confirmar se essas remoções são intencionais.

- [ ] Atualizar `README.md`.
  - O status ainda fala em documentação inicial.
  - Atualizar para refletir que há frontend, formulário e fluxo de produção.

- [ ] Atualizar `frontend/README.md`.
  - Incluir etapa de publicação.
  - Incluir checklist de troca de dados reais.
  - Incluir uso de imagens reais.

- [ ] Atualizar `docs/README.md`.
  - Adicionar este documento `31-checklist-producao.md` ao índice.

## 14. Critério final para publicar

O projeto estará pronto para produção quando todos estes pontos forem verdadeiros:

- [x] WhatsApp real configurado.
- [x] Endereço real configurado.
- [x] Horário real configurado.
- [ ] Instagram real confirmado.
- [ ] Produtos finais cadastrados.
- [ ] Preços finais revisados.
- [ ] Produtos de exemplo removidos ou convertidos.
- [ ] Fotos reais aplicadas no hero e nos principais produtos.
- [ ] Pedido rápido testado no celular real.
- [ ] Encomenda testada no celular real.
- [ ] Upsell testado.
- [ ] Build de produção aprovado.
- [ ] Site publicado com HTTPS.
- [ ] Dono/operador validou a mensagem recebida no WhatsApp.

# 24. Componentes Mobile

## Componentes criados

- `MobileHeader.jsx`: topo mobile com nome, cidade e carrinho.
- `MobileBottomNav.jsx`: navegação inferior fixa.
- `SearchBar.jsx`: busca por nome, descrição ou categoria.
- `ProductListItem.jsx`: produto em lista compacta para celular.
- `ProductModal.jsx`: detalhe do produto com quantidade e observação do item.
- `FloatingCartButton.jsx`: botão flutuante com quantidade e total.
- `MobileCartCheckout.jsx`: ponto de evolução do checkout mobile, reutilizando o drawer atual.

## Componentes ajustados

- `CartDrawer.jsx`: exibe observação do item e usa linhas únicas no carrinho.
- `EncomendaForm.jsx`: aceita tipo de encomenda selecionado por card.
- `Menu.jsx`: combina busca, categoria, lista mobile e modal.

## Regra importante

O mobile usa componentes específicos sem quebrar o desktop. O desktop mantém menu superior e grid de produtos.

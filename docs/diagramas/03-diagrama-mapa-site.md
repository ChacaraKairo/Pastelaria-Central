# 03. Diagrama do Mapa do Site

```mermaid
flowchart TD
    Home[Início]
    Cardapio[Cardápio]
    Carrinho[Carrinho]
    Pedido[Finalizar pedido]
    Encomendas[Encomendas]
    Cafe[Café do Ciclista]
    Sobre[Sobre]
    Contato[Contato]
    Privacidade[Política de privacidade]

    Home --> Cardapio
    Home --> Encomendas
    Home --> Cafe
    Home --> Sobre
    Home --> Contato
    Cardapio --> Carrinho
    Carrinho --> Pedido
    Contato --> Privacidade
```

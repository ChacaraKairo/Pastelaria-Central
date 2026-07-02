# 21. Diagrama de Navegação Mobile

```mermaid
flowchart TD
    Header[MobileHeader]
    BottomNav[MobileBottomNav]
    Home[Início]
    Menu[Cardápio]
    Cart[Carrinho]
    Encomendas[Encomendas]
    Contato[Contato]

    Header --> Cart
    BottomNav --> Home
    BottomNav --> Menu
    BottomNav --> Cart
    BottomNav --> Encomendas
    BottomNav --> Contato
```

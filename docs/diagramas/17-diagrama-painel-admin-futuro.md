# 17. Diagrama do Painel Administrativo Futuro

```mermaid
flowchart TD
    Login[Login]
    Dashboard[Dashboard]
    Produtos[Produtos]
    Categorias[Categorias]
    Pedidos[Pedidos]
    Encomendas[Encomendas]
    Clientes[Clientes]
    Relatorios[Relatórios]
    Config[Configurações]

    Login --> Dashboard
    Dashboard --> Produtos
    Dashboard --> Categorias
    Dashboard --> Pedidos
    Dashboard --> Encomendas
    Dashboard --> Clientes
    Dashboard --> Relatorios
    Dashboard --> Config
```

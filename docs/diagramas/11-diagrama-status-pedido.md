# 11. Diagrama de Status do Pedido

```mermaid
stateDiagram-v2
    [*] --> RECEBIDO
    RECEBIDO --> EM_PREPARO
    EM_PREPARO --> PRONTO
    PRONTO --> SAIU_PARA_ENTREGA
    SAIU_PARA_ENTREGA --> FINALIZADO
    PRONTO --> FINALIZADO
    RECEBIDO --> CANCELADO
    EM_PREPARO --> CANCELADO
    CANCELADO --> [*]
    FINALIZADO --> [*]
```

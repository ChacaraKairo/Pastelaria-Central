# 01. Diagrama de Contexto

```mermaid
flowchart TD
    Cliente[Cliente local]
    ClienteEncomenda[Cliente de encomenda]
    Turista[Turista ou ciclista]
    Admin[Administrador da pastelaria]
    Site[Site Pastelaria Central]
    WhatsApp[WhatsApp da pastelaria]
    Painel[Painel administrativo futuro]

    Cliente --> Site
    ClienteEncomenda --> Site
    Turista --> Site
    Site --> WhatsApp
    Admin --> WhatsApp
    Admin --> Painel
    Painel --> Site
```

# 16. Diagrama de Sequência da Encomenda

```mermaid
sequenceDiagram
    actor Cliente
    participant Site
    participant Formulario
    participant WhatsApp
    participant Pastelaria

    Cliente->>Site: Acessa página de encomendas
    Cliente->>Formulario: Preenche dados
    Formulario->>Formulario: Valida campos obrigatórios
    Formulario->>Site: Gera mensagem de orçamento
    Site->>WhatsApp: Abre conversa com mensagem
    Cliente->>WhatsApp: Envia solicitação
    WhatsApp->>Pastelaria: Entrega solicitação
    Pastelaria->>Cliente: Confirma valor, prazo e disponibilidade
```

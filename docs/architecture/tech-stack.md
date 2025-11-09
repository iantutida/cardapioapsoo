# Stack Tecnológico: Cardápio APSOO
**Versão:** 2.0  
**Baseado em:** [Project Brief](../project-brief.md) (v2.0)

## Linguagem de Programação

**TypeScript** (obrigatório)  
Todos os três aplicativos (Cliente Web, Admin Web, Desktop Electron) devem ser desenvolvidos em TypeScript.

## Paradigma de Programação

**⚠️ REQUISITO OBRIGATÓRIO**

**Programação Orientada a Objetos (POO)**  
**Este é um requisito obrigatório, não uma sugestão.**

- Todas as entidades de negócio **DEVEM** ser modeladas como **Classes TypeScript**
- Não é permitido usar funções puras ou programação funcional para as entidades de negócio
- Cada classe deve encapsular seus dados e comportamentos relacionados
- Ver [Arquitetura Full-Stack](./fullstack-architecture.md) Seção 5 para detalhes do mapeamento Entidade-Classe

## Backend e Banco de Dados

**Supabase** (Backend as a Service)  
- **Banco de Dados:** PostgreSQL (via Supabase)
- **Autenticação:** Supabase Auth
- **Armazenamento:** Supabase Storage (para imagens)
- **Tempo Real:** Supabase Realtime Subscriptions
- **API:** PostgREST (via Supabase)

## Frontend - Aplicativos Web

**Framework:** Framework web moderno (React, Vue, etc.)  
**Linguagem:** TypeScript  
**Cliente SDK:** `supabase-js`

### App 1: Cardápio do Cliente (Web)
- Interface pública
- Framework web + TypeScript
- Conexão: `supabase-js`

### App 2: Painel de Administração (Web)
- Interface administrativa privada
- Framework web + TypeScript
- Conexão: `supabase-js` (com Supabase Auth)

## Desktop

**Electron** (obrigatório)  
**Linguagem:** TypeScript  
**Cliente SDK:** `supabase-js`

### App 3: Estação de Pedidos (Desktop)
- Aplicativo Electron para MacOS
- TypeScript
- Conexão: `supabase-js` (com Realtime Subscription)

## Protocolo de Dados

**Model Context Protocol (MCP)**  
O Supabase (com sua API PostgREST) serve como fonte de dados (`context source`). O design atual está 100% compatível com MCP.

## Dependências Principais

- `supabase-js` - Cliente JavaScript/TypeScript para Supabase
- `electron` - Framework para aplicativos desktop
- Framework web (React, Vue, etc.) - A definir

## Restrições e Escopo Negativo

- **Não incluir:** Integrações de pagamento online
- **Não incluir:** Logística de entrega (delivery)
- **Não incluir:** Integrações externas (iFood, WhatsApp Business, ERP/PDV)

## Referências

- [Project Brief](../project-brief.md) - Seção 7 (Requisitos Técnicos)
- [Arquitetura Full-Stack](./fullstack-architecture.md) - Princípios de Implementação


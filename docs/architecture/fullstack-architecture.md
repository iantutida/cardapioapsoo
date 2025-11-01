# Full-Stack Architecture: Cardápio APSOO
**Versão:** 2.0  
**Arquiteto:** 🏗️ Winston  
**Baseado em:** [PRD](../prd/prd.md) (v2.0), [Frontend Architecture](./frontend-architecture.md) (v2.0), [Project Brief](../project-brief.md) (v2.0)  
**Requisitos Técnicos:** Supabase (BaaS), Electron (Desktop), MCP (Protocolo), POO (Paradigma), TypeScript (Linguagem)

## 1. Arquitetura de Dados (Modelos do Supabase)

1.  **`profiles`**
2.  **`store_settings`**
3.  **`categories`**
4.  **`products`**
5.  **`option_groups`**
6.  **`options`**
7.  **`product_option_links`**
8.  **`coupons`**
9.  **`orders`**
10. **`order_items`**
11. **`order_item_options`**

## 2. Arquitetura de Backend (Lógica do Supabase)

1.  **Autenticação (História 2.1):**
    * Usaremos o **Supabase Auth**.
    * Definiremos **Políticas de RLS (Row Level Security)**.
2.  **Armazenamento de Arquivos (História 2.2):**
    * Usaremos o **Supabase Storage**.
3.  **Tempo Real (Histórias 1.5, 3.1, 3.2):**
    * Usaremos o **Supabase Realtime Subscriptions**.
    * O **App Desktop (Electron)** irá "subscrever" (`subscribe`) a mudanças na tabela `orders`.
    * O **App do Cliente** (Página 3) irá "subscrever" a mudanças no seu próprio pedido.

## 3. Arquitetura de Frontend (Os Três Aplicativos)

1.  **App 1: Cardápio do Cliente (Web)**
    * **Tecnologia:** Framework web moderno (React, Vue, etc.) - Implementado em **TypeScript**.
    * **Conexão:** `supabase-js`.
2.  **App 2: Painel de Administração (Web)**
    * **Tecnologia:** Framework web - Implementado em **TypeScript**.
    * **Conexão:** `supabase-js` (com Supabase Auth).
3.  **App 3: Estação de Pedidos (Desktop)**
    * **Tecnologia:** **Electron** (com **TypeScript**).
    * **Conexão:** `supabase-js` (com Realtime Subscription).

## 4. Integração: Model Context Protocol (MCP)

* O **Supabase** (com sua API PostgREST) *é* a fonte de dados (`context source`).
* O design atual (usando Supabase) está 100% pronto para o MCP.

---
## 5. Princípios de Implementação (POO / TypeScript)

**⚠️ DIRETRIZES OBRIGATÓRIAS PARA IMPLEMENTAÇÃO**

Esta seção define requisitos obrigatórios para a equipe de desenvolvimento. Não são sugestões ou recomendações. Conforme Seção 7 do [Project Brief](../project-brief.md) (v2.0):

1.  **Linguagem (OBRIGATÓRIO):** A linguagem de implementação para todos os três aplicativos (Cliente Web, Admin Web, Desktop Electron) **DEVE** ser **TypeScript**.

2.  **Paradigma de Programação (OBRIGATÓRIO):** A implementação **DEVE** seguir estritamente os princípios de **Programação Orientada a Objetos (POO)**. 
    - As entidades de negócio **DEVEM** ser modeladas como Classes TypeScript
    - Não é permitido usar funções puras ou programação funcional para as entidades de negócio
    - Cada classe deve encapsular seus dados e comportamentos relacionados

3.  **Mapeamento Entidade-Classe (OBRIGATÓRIO):** As tabelas de dados da Seção 1 **DEVEM** ser modeladas como Classes TypeScript. O código deve interagir com essas classes, que por sua vez lidam com a lógica de dados do Supabase.

    | Tabela do Supabase (Seção 1) | Classe POO Correspondente (em TypeScript) | Propósito |
    | :--- | :--- | :--- |
    | `profiles` | `class User` (ou `Profile`) | Representa um cliente ou admin. |
    | `store_settings` | `class StoreConfig` | Um objeto singleton para configurações da loja. |
    | `categories` | `class Category` | Representa uma categoria do cardápio. |
    | `products` | `class Product` | Representa um item do cardápio. |
    | `option_groups` | `class OptionGroup` | Representa um grupo (ex: "Adicionais"). |
    | `options` | `class Option` | Representa um opcional (ex: "Bacon"). |
    | `orders` | `class Order` | Representa um pedido completo. |
    | `order_items` | `class OrderItem` | Representa um item dentro de um pedido. |
    | `order_item_options` | `class OrderItemOption` | Representa um opcional selecionado em um item. |
    | `coupons` | `class Coupon` | Representa um cupom de desconto. |
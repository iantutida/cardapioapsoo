# Arquitetura Frontend: Cardápio APSOO
**Versão:** 2.0  
**Baseado em:** [PRD](../prd/prd.md) (v2.0), [Project Brief](../project-brief.md) (v2.0)

## Requisitos Técnicos de Implementação

**⚠️ REQUISITOS OBRIGATÓRIOS:**

**Linguagem:** TypeScript (obrigatório)  
**Paradigma:** Programação Orientada a Objetos (POO) - **OBRIGATÓRIO**  
**Stack:** Framework web moderno (React, Vue, etc.) + Electron para Desktop

**Importante:** Todas as entidades de negócio **DEVEM** ser modeladas como **Classes TypeScript** seguindo princípios de POO. Não é permitido usar funções puras ou programação funcional para as entidades de negócio. Ver [Arquitetura Full-Stack](./fullstack-architecture.md) Seção 5 para detalhes do mapeamento Entidade-Classe.

Este documento detalha a arquitetura de informação e os wireframes para os componentes web do projeto.

---

## App 1: Cardápio do Cliente (Público)
*Interface pública para clientes navegarem e fazerem pedidos.*

### Arquitetura de Informação (Telas)

1.  **Página 1: Cardápio (A Página Principal)**
    * Hospeda a visualização do cardápio (História 1.1).
    * **Modal 1 (pop-up): Detalhes do Produto** (para História 1.2).
    * **Modal 2 (pop-up): Carrinho de Compras** (para História 1.3).
2.  **Página 2: Checkout (Finalização)**
    * Hospeda o formulário de finalização do pedido (História 1.4).
3.  **Página 3: Acompanhamento de Pedido**
    * Hospeda o visualizador de status do pedido (História 1.5).

### Wireframes (Layout das Telas)

#### Página 1: Cardápio (Principal)
* **Header:** Logo, Nome do Restaurante, Horário de Funcionamento (História 2.2).
* **Capa:** Imagem de Capa (História 2.2).
* **Descrição:** Descrição do restaurante (História 2.2).
* **Barra de Navegação de Categorias (Sticky):** Links de âncora para as categorias (História 1.1.3).
* **Seções do Cardápio:** Uma lista vertical de seções (ex: "Entradas", "Bebidas").
* **Card de Produto:** Dentro das seções. Mostra (Nome, Preço Base). Clicar abre o "Modal 1".
* **Botão Flutuante do Carrinho:** Ícone de carrinho com contagem de itens. Clicar abre o "Modal 2".

#### Modal 1: Detalhes do Produto (Wireframe)
* *Ativado por:* Clique no "Card de Produto".
* *Propósito:* História 1.2 (Personalizar e Adicionar).
* *Layout:*
    * Foto, Nome, Descrição.
    * **Grupos de Opcionais:** (ex: "Adicionais") (AC 1.2.2)
        * Radio buttons (para seleção única).
        * Checkboxes (para seleção múltipla).
    * **Campo de Observações:** (Texto livre) (AC 1.2.5).
    * **Seletor de Quantidade:** (+ / -) (AC 1.2.4).
    * **Botão de Ação:** "Adicionar ao Pedido - R$ XX,XX" (preço dinâmico) (AC 1.2.6).

#### Modal 2: Carrinho de Compras (Wireframe)
* *Ativado por:* Clique no "Botão Flutuante do Carrinho".
* *Propósito:* História 1.3 (Revisar).
* *Layout:*
    * **Lista de Itens Adicionados:** (AC 1.3.2)
        * Nome, Qtd, Opcionais, Preço do item.
        * Botões "Editar" e "Remover" por item (AC 1.3.3, 1.3.4).
    * **Campo de Cupom:** Caixa de texto + Botão "Aplicar" (AC 1.3.6).
    * **Resumo Financeiro:** Subtotal, Desconto, Total (AC 1.3.7).
    * **Botão de Ação:** "Finalizar Pedido" (leva à Página 2).

#### Página 2: Checkout (Wireframe)
* *Propósito:* História 1.4 (Finalizar).
* *Layout:*
    * Resumo do Pedido (Total, Itens).
    * **Seleção de Modalidade:** (Botões de Rádio) "Retirada" ou "Consumo no Local" (AC 1.4.1).
    * **Campos Condicionais:**
        * Se "Retirada": Campos "Nome" e "Telefone" (AC 1.4.2).
        * Se "Consumo no Local": Campo "Número da Mesa" (AC 1.4.3).
    * **Botão de Ação:** "Confirmar e Enviar Pedido" (AC 1.4.5).

#### Página 3: Acompanhamento de Pedido (Wireframe)
* *Propósito:* História 1.5 (Status).
* *Layout:*
    * **Tela de Entrada (Opcional):** Campo "Número de Telefone" + Botão "Buscar Pedido" (AC 1.5.2).
    * **Visualizador de Status (Visual):**
        * Passo 1: Recebido (Concluído)
        * Passo 2: Em Preparo (Ativo)
        * Passo 3: Pronto (Pendente)
    * Deve atualizar em tempo real (AC 1.5.4).

---

## App 2: Painel de Administração (Privado)
*Interface de dashboard para o gerente do restaurante.*

### Arquitetura de Informação (Telas)

* **Layout Padrão:** Um layout de dashboard com Barra de Navegação Lateral (Sidebar) e Cabeçalho Superior (com "Logout").

1.  **Página 1: Login** (História 2.1)
2.  **Página 2: Dashboard (Métricas)** (História 2.8)
3.  **Página 3: Gerenciamento de Produtos** (Para Histórias 2.3, 2.4 - Gerencia Categorias, Produtos e Opcionais)
4.  **Página 4: Gerenciamento de Pedidos** (História 2.6)
5.  **Página 5: Gerenciamento de Clientes (CRM)** (História 2.7)
6.  **Página 6: Gerenciamento de Cupons** (História 2.5)
7.  **Página 7: Configurações da Loja** (História 2.2)

### Wireframes (Esboço do Layout)

* **Página 1 (Login):** Campos de "Email", "Senha", Botão "Entrar".
* **Página 2 (Dashboard):** Seletor de período, Cards de estatísticas (Total Pedidos), Lista/Gráfico de Produtos Mais Vendidos.
* **Página 3 (Produtos):** Provavelmente terá abas (Tabs) para "Categorias" (com reordenamento), "Produtos" (com lista, filtro e formulário de edição/criação) e "Grupos de Opcionais" (para criar/gerenciar).
* **Página 4 (Pedidos):** Tabela de pedidos com filtros (por status). Clicar abre os detalhes do pedido e permite alterar o status.
* **Página 5 (Clientes):** Barra de pesquisa (Nome/Telefone). Área de resultados mostrando os pedidos anteriores do cliente.
* **Página 6 (Cupons):** Tabela de cupons (Código, Valor, Status). Botão "Novo Cupom".
* **Página 7 (Configurações):** Formulário simples (Nome, Descrição, Horário) e Uploader de imagens (Logo, Capa).
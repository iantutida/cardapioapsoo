# Project Brief: Cardápio APSOO
**Versão:** 2.0

## 1. Resumo Executivo

O "Cardápio APSOO" é uma plataforma de pedidos digitais projetada para restaurantes, com foco em otimizar o fluxo de pedidos para consumo local e retirada. O sistema é composto por três componentes principais:
1.  **Plataforma Web do Cliente:** Uma interface pública onde os clientes podem navegar pelo cardápio, montar um carrinho, aplicar cupons e finalizar pedidos para retirada ou consumo na mesa.
2.  **Painel Web do Restaurante:** Uma área administrativa segura para o restaurante configurar a aparência do cardápio, gerenciar produtos, categorias, opcionais, cupons e visualizar um histórico de pedidos e clientes.
3.  **Aplicativo Desktop de Gestão:** Uma aplicação Electron para Windows que funciona como a estação de recebimento de pedidos do restaurante, fornecendo notificações em tempo real e permitindo à equipe atualizar o status do pedido.
O projeto visa digitalizar e agilizar a operação de pedidos internos, excluindo intencionalmente integrações de pagamento online e logística de entrega para focar na experiência de pedido no local.

## 2. O Problema

1.  **Fluxo de Pedidos Ineficiente:** O processo manual atual do restaurante (papel, verbal) é lento, propenso a erros de anotação e consome muito tempo da equipe.
2.  **Erros de Comunicação (Cliente-Cozinha):** Pedidos com opcionais e observações são difíceis de gerenciar manualmente, levando a erros na preparação.
3.  **Atrito na Experiência do Cliente:** Os clientes podem enfrentar longas esperas para fazer um pedido (na mesa ou para retirada) em horários de pico.
4.  **Falta de Visibilidade Gerencial:** A administração não possui uma maneira fácil e em tempo real de visualizar quais produtos são mais vendidos ou o histórico de pedidos de um cliente.

## 3. Objetivos

1.  **Agilizar o Fluxo de Pedidos:** Automatizar o processo de recebimento, preparo e finalização de pedidos, reduzindo o tempo de espera do cliente e a carga de trabalho manual.
2.  **Melhorar a Precisão dos Pedidos:** Minimizar erros de comunicação, especialmente em pedidos com opcionais e observações.
3.  **Digitalizar a Experiência do Cliente:** Oferecer uma interface web moderna e fácil de usar para visualização do cardápio e realização de pedidos.
4.  **Fornecer Visibilidade Operacional:** Capacitar a gerência do restaurante com dados básicos (produtos mais vendidos, histórico do cliente).
5.  **Garantir Notificações Confiáveis:** Implementar um sistema de desktop robusto que alerte a equipe sobre cada novo pedido.

## 4. Usuários-Alvo

1.  **Cliente do Restaurante (Externo):** Clientes no local (mesa) ou buscando (retirada). Usam seus próprios smartphones. Necessitam de uma interface rápida e intuitiva para pedir sem um atendente.
2.  **Equipe do Restaurante (Interno):**
    * **Equipe (Cozinha/Balcão):** Usa o App Desktop. Necessita de notificações claras e uma forma simples de atualizar o status do pedido.
    * **Gerente/Proprietário:** Usa o Painel Web de Administração. Necessita configurar o cardápio, criar promoções e ver o desempenho das vendas.

## 5. Recursos Principais

**5.1. Módulo do Cliente (Web)**
* Visualização do cardápio por categorias.
* Visualização de detalhes do produto (opcionais, quantidade, observações).
* Carrinho de compras funcional com cálculo de subtotal.
* Aplicação de cupons de desconto.
* Seleção de modalidade: Retirada ou Consumo no Local (com número da mesa).
* Identificação rápida (nome/telefone ou número da mesa).
* Finalização do pedido e página de acompanhamento.
* Tela para acompanhamento do status do pedido em tempo real.

**5.2. Módulo de Administração (Web)**
* Autenticação segura (login/senha).
* Personalização da página (nome, logo, capa, descrição, horário).
* Gerenciamento completo de categorias e produtos.
* Gerenciamento de opcionais (associados a produtos, com preço adicional).
* Gerenciamento de cupons de desconto.
* Listagem e gerenciamento de pedidos (alteração de status).
* CRM básico (histórico de clientes por nome ou telefone).
* Visualização de métricas simples (total de pedidos/dia, produtos mais vendidos).

**5.3. Aplicativo de Gestão (Desktop - Electron)**
* Recebimento de novos pedidos em tempo real.
* Emissão de notificação sonora para cada novo pedido.
* Interface simples para alterar o status do pedido (Recebido → Em Preparo → Pronto).

## 6. Escopo Negativo (Non-Goals)

* **Pagamento Online:** Não haverá integração com gateways de pagamento (cartão de crédito, Pix).
* **Logística de Entrega:** Não haverá funcionalidade de delivery.
* **Integrações Externas:** Não haverá integrações com iFood, WhatsApp Business, ou sistemas de ERP/PDV.

## 7. Preferências de Stack de Tecnologia / Restrições (Versão 2.0 - ATUALIZADA)

**⚠️ REQUISITOS OBRIGATÓRIOS DE IMPLEMENTAÇÃO:**

* **Paradigma de Código (OBRIGATÓRIO):** A implementação do código **DEVE** seguir estritamente os princípios de **Programação Orientada a Objetos (POO)**. As entidades de negócio (Produtos, Pedidos, Categorias, etc.) **DEVEM** ser modeladas como **Classes TypeScript**. Não é permitido usar funções puras ou programação funcional para as entidades de negócio.
* **Linguagem (OBRIGATÓRIO):** A linguagem de implementação para todos os três aplicativos (Cliente Web, Admin Web, Desktop Electron) **DEVE** ser **TypeScript**.

**Outros Requisitos:**
* **Aplicativo de Gestão (Desktop):** Deve ser desenvolvido usando **Electron**.
* **Banco de Dados & Backend:** Deve ser utilizado o **Supabase** como backend principal e banco de dados.
* **Protocolo de Dados:** A arquitetura deve se conectar ao **Model Context Protocol (MCP)**.
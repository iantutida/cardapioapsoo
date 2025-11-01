# Documento de Requisitos do Produto (PRD): Cardápio APSOO
**Versão:** 2.0  
**Baseado em:** [Project Brief](../project-brief.md) (v2.0)

## Requisitos Técnicos de Implementação

**⚠️ ATENÇÃO: ESTES SÃO REQUISITOS OBRIGATÓRIOS - NÃO SÃO SUGESTÕES OU RECOMENDAÇÕES**

Conforme [Project Brief](../project-brief.md) Seção 7 (v2.0):

- **Paradigma:** **Programação Orientada a Objetos (POO)** - **OBRIGATÓRIO**  
  - Todas as entidades de negócio (Produtos, Pedidos, Categorias, Opcionais, Cupons, etc.) **DEVEM** ser implementadas como **Classes TypeScript**
  - Não é permitido usar funções puras ou programação funcional para as entidades de negócio
  - Ver [Arquitetura Full-Stack](../architecture/fullstack-architecture.md) Seção 5 para detalhes do mapeamento Entidade-Classe
- **Linguagem:** **TypeScript** - **OBRIGATÓRIO** para todos os três aplicativos
- **Backend:** Supabase (BaaS)
- **Desktop:** Electron
- **Protocolo:** Model Context Protocol (MCP)

## 1. Épico 1: Experiência do Cliente (Web)
*Este épico cobre todos os recursos da interface pública do cardápio que o cliente final utilizará.*

---

### História 1.1: Visualizar Cardápio por Categoria
* **Como um** Cliente do Restaurante,
* **Eu quero** visualizar o cardápio dividido por categorias (ex: "Entradas", "Pratos Principais", "Bebidas"),
* **Para que** eu possa encontrar facilmente os itens que desejo pedir.

**Critérios de Aceitação (AC):**
1.  **AC 1.1.1:** A página do cardápio deve exibir todas as categorias de produtos que estão ativas no painel de administração.
2.  **AC 1.1.2:** As categorias devem ser exibidas na ordem definida pelo administrador (conforme História 2.3).
3.  **AC 1.1.3:** Clicar em uma categoria deve rolar a página para baixo ou filtrar a visualização para mostrar apenas os produtos daquela categoria.
4.  **AC 1.1.4:** Cada produto listado sob uma categoria deve mostrar, no mínimo, seu **Nome** e **Preço**.
5.  **AC 1.1.5:** Produtos indisponíveis (status "Inativo" no admin) não devem ser exibidos no cardápio do cliente.

---

### História 1.2: Adicionar Produto ao Carrinho
* **Como um** Cliente do Restaurante,
* **Eu quero** clicar em um produto para ver seus detalhes, selecionar opcionais (com ou sem acréscimo), definir a quantidade, adicionar observações e adicioná-lo ao meu carrinho,
* **Para que** eu possa montar meu pedido com minhas personalizações exatas.

**Critérios de Aceitação (AC):**
1.  **AC 1.2.1:** Clicar em um item de produto deve abrir uma visualização de detalhes (modal) mostrando o nome, descrição, preço e foto do produto (se disponível).
2.  **AC 1.2.2:** Se o produto tiver grupos de opcionais associados (História 2.4), eles devem ser claramente listados.
3.  **AC 1.2.3:** O sistema deve permitir a seleção de opcionais (respeitando regras de seleção única/múltipla) e calcular corretamente o preço adicional.
4.  **AC 1.2.4:** O cliente deve poder alterar a **Quantidade** do item.
5.  **AC 1.2.5:** O cliente deve ter um campo de **Observações** em texto livre para aquele item.
6.  **AC 1.2.6:** O preço total do item (preço base + opcionais) deve ser recalculado e exibido dinamicamente.
7.  **AC 1.2.7:** Clicar em "Adicionar ao Pedido" deve adicionar o item configurado ao carrinho.

---

### História 1.3: Gerenciar o Carrinho de Compras
* **Como um** Cliente do Restaurante,
* **Eu quero** ver um resumo do meu carrinho de compras com todos os itens, seus preços e um subtotal claro,
* **Para que** eu possa revisar, modificar ou remover itens antes de finalizar meu pedido.

**Critérios de Aceitação (AC):**
1.  **AC 1.3.1:** O carrinho deve ser facilmente acessível de qualquer lugar da página do cardápio.
2.  **AC 1.3.2:** O carrinho deve listar cada item, mostrando nome, quantidade, opcionais selecionados (e custos) e o preço total do item.
3.  **AC 1.3.3:** O cliente deve poder **remover** um item do carrinho.
4.  **AC 1.3.4:** O cliente deve poder **editar** um item no carrinho (reabrindo o modal da História 1.2).
5.  **AC 1.3.5:** O carrinho deve exibir um **Subtotal** (soma de todos os itens).
6.  **AC 1.3.6:** O carrinho deve ter um campo para inserir um **Código de Cupom**.
7.  **AC 1.3.7:** Se um cupom válido (História 2.5) for aplicado, o desconto deve ser exibido e o **Total** (Subtotal - Desconto) deve ser recalculado.

---

### História 1.4: Finalizar Pedido (Checkout)
* **Como um** Cliente do Restaurante,
* **Eu quero** finalizar meu pedido selecionando a modalidade (Retirada ou Consumo no Local) e fornecendo minha identificação (nome/telefone ou número da mesa),
* **Para que** eu possa enviar meu pedido para a cozinha.

**Critérios de Aceitação (AC):**
1.  **AC 1.4.1:** Ao prosseguir do carrinho, o cliente deve escolher a **Modalidade**: "Retirada" ou "Consumo no Local".
2.  **AC 1.4.2:** Se "Retirada", o sistema deve solicitar **Nome** e **Número de Telefone**.
3.  **AC 1.4.3:** Se "Consumo no Local", o sistema deve solicitar o **Número da Mesa**.
4.  **AC 1.4.4:** O cliente deve ver um resumo final do pedido (total) antes de confirmar.
5.  **AC 1.4.5:** O botão "Confirmar Pedido" deve salvar o pedido no Supabase e acionar a notificação no App Desktop (História 3.1).
6.  **AC 1.4.6:** Após a confirmação, o cliente deve ser redirecionado para a página de Acompanhamento (História 1.5).

---

### História 1.5: Acompanhar Status do Pedido
* **Como um** Cliente do Restaurante,
* **Eu quero** acompanhar o status do meu pedido em tempo real em uma página de acompanhamento,
* **Para que** eu saiba quando meu pedido foi recebido, está em preparo e está pronto.

**Critérios de Aceitação (AC):**
1.  **AC 1.5.1:** Após finalizar o pedido, o cliente deve ser direcionado para esta página.
2.  **AC 1.5.2:** A página (ou uma tela inicial) deve permitir que um cliente insira seu número de telefone para recuperar o status de um pedido ativo.
3.  **AC 1.5.3:** A página deve exibir o status atual (ex: "Recebido", "Em Preparo", "Pronto").
4.  **AC 1.5.4:** A atualização de status na página do cliente deve ocorrer em tempo real (via Supabase) assim que a equipe alterar o status no App Desktop (História 3.2).

---
---

## 2. Épico 2: Gerenciamento do Restaurante (Web Admin)
*Este épico cobre a área administrativa privada para o gerente do restaurante configurar a loja e gerenciar as operações.*

---

### História 2.1: Autenticação do Administrador
* **Como um** Gerente de Restaurante,
* **Eu quero** fazer login em um painel de administração protegido por senha,
* **Para que** apenas pessoas autorizadas possam alterar o cardápio e ver os pedidos.

**Critérios de Aceitação (AC):**
1.  **AC 2.1.1:** Deve haver uma página de login (ex: `/admin/login`).
2.  **AC 2.1.2:** Tentativas de acesso a outras páginas de administração sem estar logado devem redirecionar para o login.
3.  **AC 2.1.3:** O login deve usar o sistema de autenticação do Supabase (e-mail/senha).
4.  **AC 2.1.4:** Após o login, o gerente é redirecionado para o dashboard.
5.  **AC 2.1.5:** Deve haver uma função de "Logout".

---

### História 2.2: Personalizar Informações do Cardápio
* **Como um** Gerente de Restaurante,
* **Eu quero** personalizar as informações básicas da minha página de cardápio (nome, logo, capa, descrição, horário de funcionamento),
* **Para que** o cardápio digital reflita a identidade da minha marca.

**Critérios de Aceitação (AC):**
1.  **AC 2.2.1:** Deve haver uma seção "Configurações da Loja" no painel de administração.
2.  **AC 2.2.2:** O gerente deve poder fazer upload de um **Logo** e uma **Imagem de Capa**.
3.  **AC 2.2.3:** O gerente deve poder definir o **Nome** e a **Descrição** do restaurante.
4.  **AC 2.2.4:** O gerente deve poder definir o **Horário de Funcionamento**.
5.  **AC 2.2.5:** Todas essas informações devem ser refletidas dinamicamente na página pública do cardápio (Épico 1).

---

### História 2.3: Gerenciar Categorias e Produtos (CRUD)
* **Como um** Gerente de Restaurante,
* **Eu quero** criar, visualizar, editar e excluir categorias e produtos, e reordená-los,
* **Para que** eu possa manter meu cardápio digital sempre atualizado e organizado.

**Critérios de Aceitação (AC):**
1.  **AC 2.3.1 (Categorias):** O gerente deve poder **Criar**, **Editar** (nome) e **Excluir** categorias. O gerente deve poder **Reordenar** as categorias.
2.  **AC 2.3.2 (Produtos - CRUD):** O gerente deve poder **Criar**, **Editar** e **Excluir** produtos.
3.  **AC 2.3.3 (Produtos - Detalhes):** Ao criar/editar um produto, o gerente define: Nome, Descrição, Preço Base, Foto, Categoria e Status (Ativo/Inativo).
4.  **AC 2.3.4 (Produtos - Ordenação):** O gerente deve poder **Reordenar** os produtos *dentro* de uma categoria.

---

### História 2.4: Gerenciar Opcionais (CRUD)
* **Como um** Gerente de Restaurante,
* **Eu quero** criar, editar e excluir "grupos de opcionais" (ex: "Adicionais") e "opcionais" individuais (ex: "Bacon +R$2,00").
* **Para que** eu possa associá-los a produtos específicos e oferecer personalização.

**Critérios de Aceitação (AC):**
1.  **AC 2.4.1:** O gerente deve poder criar "grupos de opcionais" (ex: "Tamanho", "Adicionais").
2.  **AC 2.4.2:** Um grupo deve ter configurações (ex: "seleção única" ou "seleção múltipla").
3.  **AC 2.4.3:** Dentro de um grupo, o gerente cria "opcionais" individuais (Nome, Preço Adicional [pode ser R$0]).
4.  **AC 2.4.4:** Ao editar um Produto (História 2.3), o gerente deve poder associar um ou mais "grupos de opcionais" a ele.
5.  **AC 2.4.5:** Os opcionais associados devem ser exibidos corretamente para o cliente (História 1.2).

---

### História 2.5: Gerenciar Cupons de Desconto (CRUD)
* **Como um** Gerente de Restaurante,
* **Eu quero** criar, visualizar, editar e desativar cupons de desconto,
* **Para que** eu possa oferecer promoções aos meus clientes.

**Critérios de Aceitação (AC):**
1.  **AC 2.5.1:** O gerente deve poder criar um cupom com: **Código**, **Tipo de Desconto** (Percentual ou Valor Fixo), **Valor** e **Status** (Ativo/Inativo).
2.  **AC 2.5.2:** O gerente deve poder visualizar uma lista de todos os cupons.
3.  **AC 2.5.3:** O gerente deve poder editar ou desativar um cupom.
4.  **AC 2.5.4:** O código do cupom deve ser aplicável no carrinho do cliente (História 1.3).

---

### História 2.6: Gerenciar Pedidos (Web Admin)
* **Como um** Gerente de Restaurante,
* **Eu quero** visualizar uma lista de todos os pedidos no painel de administração,
* **Para que** eu possa ter uma visão geral da operação e alterar o status de um pedido, se necessário.

**Critérios de Aceitação (AC):**
1.  **AC 2.6.1:** Deve haver uma página "Pedidos" no painel de administração.
2.  **AC 2.6.2:** A lista deve mostrar informações chave (ID, Cliente/Mesa, Status, Valor, Horário).
3.  **AC 2.6.3:** O gerente deve poder filtrar os pedidos (ex: por status).
4.  **AC 2.6.4:** O gerente deve poder **alterar o status** de um pedido (como uma substituição ao App Desktop).
5.  **AC 2.6.5:** O gerente deve poder visualizar os detalhes completos de um pedido.

---

### História 2.7: Visualizar Histórico do Cliente (CRM Básico)
* **Como um** Gerente de Restaurante,
* **Eu quero** visualizar um histórico de clientes e seus pedidos anteriores, pesquisando pelo **nome** ou **número de telefone**,
* **Para que** eu possa reconhecer clientes fiéis e ter um contexto sobre seus pedidos.

**Critérios de Aceitação (AC):**
1.  **AC 2.7.1:** Deve haver uma seção "Clientes" no painel de administração.
2.  **AC 2.7.2:** Esta seção deve permitir pesquisar um cliente pelo seu **Nome** ou **Número de Telefone**.
3.  **AC 2.7.3:** Os resultados devem exibir Nome, Telefone e uma lista de todos os pedidos anteriores associados.
4.  **AC 2.7.4:** Deve ser possível clicar em um pedido anterior para ver seus detalhes.

---

### História 2.8: Visualizar Métricas Simples
* **Como um** Gerente de Restaurante,
* **Eu quero** visualizar métricas simples em um dashboard, como o total de pedidos por dia e os produtos mais vendidos,
* **Para que** eu possa entender o desempenho do meu restaurante rapidamente.

**Critérios de Aceitação (AC):**
1.  **AC 2.8.1:** O painel de administração deve ter uma página principal (Dashboard).
2.  **AC 2.8.2:** O dashboard deve exibir o **Número Total de Pedidos** (Hoje).
3.  **AC 2.8.3:** O dashboard deve exibir uma lista dos **Produtos Mais Vendidos** (Hoje).
4.  **AC 2.8.4:** O gerente deve poder filtrar essas métricas por um período simples (ex: "Hoje", "Últimos 7 dias").

---
---

## 3. Épico 3: Estação de Pedidos (Desktop - Electron)
*Este épico cobre o aplicativo de desktop que a equipe do restaurante (cozinha/balcão) usará para gerenciar os pedidos em tempo real.*

---

### História 3.1: Receber Notificações de Novos Pedidos
* **Como um** Membro da Equipe do Restaurante,
* **Eu quero** ser notificado imediatamente (de forma sonora e visual) no aplicativo de desktop sempre que um novo pedido for enviado,
* **Para que** eu possa aceitar o pedido e iniciar o preparo sem demora.

**Critérios de Aceitação (AC):**
1.  **AC 3.1.1:** O aplicativo Electron deve usar os recursos de tempo real do Supabase para "ouvir" novos pedidos.
2.  **AC 3.1.2:** Quando um novo pedido for recebido, o aplicativo deve exibir uma notificação visual clara.
3.  **AC 3.1.3:** O aplicativo deve emitir uma **notificação sonora** ("bip") para chamar a atenção.
4.  **AC 3.1.4:** O novo pedido deve aparecer na fila "Novos Pedidos" (ou "Recebidos").

---

### História 3.2: Gerenciar Status do Pedido (Desktop)
* **Como um** Membro da Equipe do Restaurante,
* **Eu quero** alterar o status de um pedido usando uma interface simples (ex: "Aceitar", "Mover para 'Em Preparo'", "Marcar como 'Pronto'"),
* **Para que** eu possa gerenciar o fluxo de trabalho da cozinha e manter o cliente informado.

**Critérios de Aceitação (AC):**
1.  **AC 3.2.1:** A interface deve exibir colunas ou listas para os estágios do pedido (ex: "Recebidos", "Em Preparo", "Prontos").
2.  **AC 3.2.2:** A equipe deve poder mover um pedido de um status para o próximo com uma ação simples (botão ou arrastar).
3.  **AC 3.2.3:** Os status gerenciáveis devem ser: **Recebido** (estado inicial), **Em Preparo** e **Pronto**.
4.  **AC 3.2.4:** Alterar o status no aplicativo de desktop deve atualizar o status no Supabase em tempo real.
5.  **AC 3.2.5:** A alteração de status deve ser refletida na página de acompanhamento do cliente (História 1.5).
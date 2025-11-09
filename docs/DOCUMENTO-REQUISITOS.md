# Cardápio APSOO
(nome do sistema)

Manual do Sistema

Versão 1.0

---

# Informações do Documento

**Título do documento:** Documento de Requisitos do Cardápio APSOO

**Autores:**  
Equipe de Desenvolvimento APSOO

**Comentários:**  
Este documento descreve os requisitos funcionais e não-funcionais do sistema Cardápio APSOO, uma plataforma de pedidos digitais para restaurantes.

**Nome do arquivo:**  
DOCUMENTO-REQUISITOS.md

---

# HISTÓRICO DE REVISÕES

| Revisão | Data | Descrição | Autor |
|---------|------|-----------|-------|
| 01 | 2024 | Elaboração da primeira versão do documento. | Equipe APSOO |

---

# Índice

1. [Introdução](#1-introdução)
   1.1. [Objetivos](#11-objetivos)
   1.2. [Escopo](#12-escopo)
   1.3. [Referências](#13-referências)
   1.4. [Visão Geral do Documento](#14-visão-geral-do-documento)
   1.5. [Padrões e Convenções](#15-padrões-e-convenções)
2. [Descrição Geral do Sistema](#2-descrição-geral-do-sistema)
   2.1. [Escopo Negativo](#21-escopo-negativo)
   2.2. [Descrição dos Atores](#22-descrição-dos-atores)
3. [Requisitos Funcionais](#3-requisitos-funcionais)
   3.1. [Ações do Cliente](#31-ações-do-cliente)
   3.2. [Ações do Administrador](#32-ações-do-administrador)
   3.3. [Ações da Equipe do Restaurante](#33-ações-da-equipe-do-restaurante)
4. [Requisitos Não-Funcionais](#4-requisitos-não-funcionais)
   4.1. [Performance](#41-performance)
   4.2. [Usabilidade](#42-usabilidade)
   4.3. [Confiabilidade](#43-confiabilidade)
   4.4. [Segurança](#44-segurança)
   4.5. [Corretude](#45-corretude)
   4.6. [Requisitos de Hardware e Software](#46-requisitos-de-hardware-e-software)
5. [Diagrama de Casos de Uso](#5-diagrama-de-casos-de-uso)
6. [Considerações Finais](#6-considerações-finais)
   6.1. [Conclusões](#61-conclusões)
   6.2. [Trabalhos Futuros](#62-trabalhos-futuros)

---

# 1. Introdução

Este documento tem como objetivo apresentar uma descrição detalhada dos requisitos do Cardápio APSOO (Plataforma de Pedidos Digitais para Restaurantes). Por meio deste, o cliente tomará conhecimento das funcionalidades do projeto e os desenvolvedores terão uma noção de como implementar essas funcionalidades.

## 1.1. Objetivos

Dentre os objetivos deste documento estão o de listar da forma mais clara possível, os requisitos funcionais e não funcionais do sistema em questão. Assim, como dito anteriormente, o cliente tomará conhecimento do que o sistema fará e os desenvolvedores de como poderão implementar as funcionalidades.

## 1.2. Escopo

O presente documento visa ser escrito de forma abrangente e clara para que possa ser utilizado por todos os desenvolvedores, analistas e arquitetos envolvidos e ainda ser compreendido pelo cliente.

## 1.3. Referências

- [Project Brief](./project-brief.md) - Documento executivo do projeto
- [PRD - Documento de Requisitos do Produto](./prd/prd.md) - Requisitos detalhados por épicos
- [Arquitetura Full-Stack](./architecture/fullstack-architecture.md) - Arquitetura técnica do sistema
- [Stack Tecnológico](./architecture/tech-stack.md) - Tecnologias utilizadas

## 1.4. Visão Geral do Documento

A seguir são apresentadas as divisões deste documento e uma rápida descrição de cada seção:

- **Seção 2 – Descrição Geral do Sistema:** descreve o escopo do sistema e seus usuários de maneira geral.
- **Seção 3 – Requisitos Funcionais:** especifica todos os requisitos funcionais planejados para o sistema.
- **Seção 4 – Requisitos Não-Funcionais:** especifica todos os requisitos não-funcionais da primeira iteração do sistema.
- **Seção 5 – Diagrama de Casos de Uso:** resume o relacionamento entre os casos de uso que executam os requisitos elicitados.
- **Seção 6 – Considerações Finais:** apresenta conclusões e trabalhos futuros.

## 1.5. Padrões e Convenções

### 1.5.1. Identificação dos Requisitos

Para a especificação dos requisitos utilizaremos a seguinte representação:

**[TIPODOREQUISITONúmero] Nome**

O campo TIPODOREQUISITO poderá ser especificado pelos códigos RF (Requisitos Funcionais) ou RNF (Requisitos Não-Funcionais). Já o campo Número será preenchido com um número correspondente à ordem em que os requisitos aparecem no documento.

### 1.5.2. Prioridade dos Requisitos

A cada requisito será atribuída uma prioridade. A descrição de cada uma segue abaixo:

- **Essencial:** é um requisito imprescindível. Sem ele, o sistema não funcionará.
- **Importante:** é um requisito que deve ser implementado, mas, se não for, o sistema funcionará do mesmo jeito, mas de maneira insatisfatória.
- **Desejável:** é um requisito que trará um diferencial adicional ao sistema. Por isso, pode ser deixado para ser implementado por último ou em próximas iterações.

Na apresentação dos requisitos, quando da descrição dos casos de uso, utilizamos a notação: **-** para denotar a inexistência de pré-condições ou parâmetros de entrada e saída ou ainda a manutenção do estado do sistema (no campo de pós-condições).

---

# 2. Descrição Geral do Sistema

A necessidade de digitalizar e agilizar o processo de pedidos em restaurantes tem crescido muito com o passar dos anos. Há uma necessidade crescente no mercado da utilização de ferramentas que diminuam o custo do processo de elaboração do pedido e automatizem o processo que atualmente, na maioria dos restaurantes, é feito baseado em anotações manuais e comunicação verbal.

As poucas ferramentas já existentes não reúnem algumas funcionalidades como existência de administradores para controle de acesso de usuários, um bom sistema de geração de métricas para possibilitar análises de vendas, controle eficiente dos produtos e opcionais, e ainda o acompanhamento em tempo real do status do pedido pelo cliente. Pensando nisso foi que surgiu a proposta do Cardápio APSOO.

Cardápio APSOO é um sistema que pretende dar suporte na organização de pedidos digitais para restaurantes. Trata-se de uma plataforma completa desde a visualização do cardápio pelo cliente até a finalização do pedido, dando suporte a aspectos como gestão de produtos, categorias, opcionais, cupons de desconto, acompanhamento de pedidos em tempo real, etc.

As funcionalidades do sistema serão mostradas, à medida que os requisitos forem explicados, mas todas elas convergem para a idéia do software dita anteriormente.

## 2.1. Escopo Negativo

Devido a grande dimensão que o projeto pode ter, faz-se relevante definir o escopo não apenas dizendo as coisas que serão feitas, mas também deixando claro o que não fará parte do nosso escopo.

Algumas funcionalidades foram tidas pela equipe como funcionalidades que precisam de uma maior atenção. Sendo assim esse projeto se compromete a desenvolver apenas as funcionalidades citadas. Não fazem parte do escopo dessa proposta serviços tais como:

- **Pagamento Online:** Não haverá integração com gateways de pagamento (cartão de crédito, Pix, etc.).
- **Logística de Entrega:** Não haverá funcionalidade de delivery ou entrega em domicílio.
- **Integrações Externas:** Não haverá integrações com iFood, WhatsApp Business, ou sistemas de ERP/PDV.
- **Importar dados em qualquer formato:** o requisito de importar dados só poderá importar dados no formato especificado pelo programa, não garantindo resultados corretos se o formato não for respeitado.
- **Controles de segurança sofisticados:** a segurança do acesso dos usuários será com senha cadastrada através do sistema de autenticação do Supabase.
- **Comprometimento em disponibilizar o software nem de oferecer treinamento de instalação, configuração, administração e utilização do sistema desenvolvido.**

## 2.2. Descrição dos Atores

O sistema apresenta três atores diferenciados pelas funcionalidades a que tem acesso:

**Cliente do Restaurante:** Toda pessoa que irá realizar pedidos no restaurante. O cliente não precisa ser cadastrado previamente pelo administrador, mas tem permissão apenas para visualizar o cardápio, montar um carrinho, aplicar cupons, finalizar pedidos e acompanhar o status do pedido em tempo real. O cliente pode fazer pedidos para retirada (fornecendo nome e telefone) ou para consumo no local (fornecendo número da mesa).

**Administrador do Sistema:** Pessoa do restaurante com privilégio para determinar usuários, gerenciar e controlar o sistema e o banco de dados. É o ator que tem maior liberdade no sistema, pode fazer tudo que um cliente faz, mas só ele pode:
- Fazer login no painel administrativo
- Personalizar informações do cardápio (nome, logo, capa, descrição, horário)
- Gerenciar categorias e produtos (CRUD)
- Gerenciar opcionais e grupos de opcionais (CRUD)
- Gerenciar cupons de desconto (CRUD)
- Visualizar e gerenciar pedidos
- Visualizar histórico de clientes (CRM básico)
- Visualizar métricas simples (dashboard)

**Equipe do Restaurante:** Membros da equipe (cozinha/balcão) que utilizam o aplicativo desktop Electron. Este ator tem acesso para:
- Receber notificações de novos pedidos em tempo real
- Alterar o status dos pedidos (Recebido → Em Preparo → Pronto)
- Visualizar detalhes dos pedidos

---

# 3. Requisitos Funcionais

Esta seção apresenta em detalhes os requisitos funcionais do sistema.

## 3.1. Ações do Cliente

### [RF001] Visualizar Cardápio por Categoria

Requisito básico para permitir que os clientes visualizem o cardápio dividido por categorias (ex: "Entradas", "Pratos Principais", "Bebidas"). O cliente poderá navegar pelo cardápio e encontrar facilmente os itens que deseja pedir.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O sistema deve estar disponível
- Deve existir pelo menos uma categoria ativa com produtos

**Entrada:**
- Acesso à página do cardápio

**Saída:**
- Lista de categorias com seus respectivos produtos
- Informações de cada produto: nome, preço, descrição (se disponível)

**Pós-condições:**
- O cliente visualiza o cardápio organizado por categorias

---

### [RF002] Visualizar Detalhes do Produto

Permite que o cliente visualize os detalhes completos de um produto, incluindo opcionais disponíveis, preço base e descrição.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O cliente deve estar na página do cardápio
- O produto deve estar ativo

**Entrada:**
- Clique no produto desejado

**Saída:**
- Modal ou página com detalhes do produto
- Lista de grupos de opcionais associados
- Preço base do produto

**Pós-condições:**
- O cliente visualiza os detalhes do produto

---

### [RF003] Adicionar Produto ao Carrinho

Permite que o cliente adicione um produto ao carrinho de compras, selecionando opcionais, quantidade e observações.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O cliente deve estar visualizando os detalhes do produto
- O produto deve estar ativo

**Entrada:**
- Seleção de opcionais (se houver)
- Quantidade desejada
- Observações (opcional)

**Saída:**
- Produto adicionado ao carrinho
- Atualização visual do carrinho

**Pós-condições:**
- O produto é adicionado ao carrinho com as configurações selecionadas

---

### [RF004] Gerenciar Carrinho de Compras

Permite que o cliente visualize, edite e remova itens do carrinho de compras, além de aplicar cupons de desconto.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O cliente deve ter pelo menos um item no carrinho

**Entrada:**
- Ações: visualizar, editar, remover itens
- Código de cupom (opcional)

**Saída:**
- Lista atualizada de itens no carrinho
- Subtotal calculado
- Desconto aplicado (se cupom válido)
- Total final

**Pós-condições:**
- O carrinho é atualizado conforme as ações do cliente

---

### [RF005] Finalizar Pedido

Permite que o cliente finalize o pedido selecionando a modalidade (Retirada ou Consumo no Local) e fornecendo informações de identificação.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O cliente deve ter pelo menos um item no carrinho

**Entrada:**
- Modalidade: Retirada ou Consumo no Local
- Se Retirada: Nome e Telefone
- Se Consumo no Local: Número da Mesa

**Saída:**
- Pedido criado no sistema
- Notificação enviada para o aplicativo desktop
- Redirecionamento para página de acompanhamento

**Pós-condições:**
- O pedido é registrado no banco de dados
- A equipe do restaurante é notificada

---

### [RF006] Acompanhar Status do Pedido

Permite que o cliente acompanhe o status do pedido em tempo real através de uma página de acompanhamento.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- Deve existir um pedido criado

**Entrada:**
- Número de telefone (para recuperar pedido) ou acesso direto após finalização

**Saída:**
- Status atual do pedido (Recebido, Em Preparo, Pronto)
- Detalhes do pedido
- Atualização em tempo real

**Pós-condições:**
- O cliente visualiza o status atualizado do pedido

---

## 3.2. Ações do Administrador

### [RF007] Autenticar no Painel Administrativo

Permite que o administrador faça login no painel de administração protegido por senha.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve possuir credenciais válidas

**Entrada:**
- Email e senha

**Saída:**
- Sessão autenticada
- Redirecionamento para o dashboard

**Pós-condições:**
- O administrador tem acesso ao painel administrativo

---

### [RF008] Personalizar Informações do Cardápio

Permite que o administrador personalize as informações básicas da página de cardápio (nome, logo, capa, descrição, horário de funcionamento).

**Prioridade:**
- ☐ Essencial
- ☑ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve estar autenticado

**Entrada:**
- Nome do restaurante
- Logo (arquivo de imagem)
- Imagem de capa (arquivo de imagem)
- Descrição
- Horário de funcionamento

**Saída:**
- Informações atualizadas refletidas na página pública

**Pós-condições:**
- As informações do cardápio são atualizadas

---

### [RF009] Gerenciar Categorias e Produtos

Permite que o administrador crie, visualize, edite, exclua e reordene categorias e produtos.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve estar autenticado

**Entrada:**
- Dados da categoria: nome, ordem
- Dados do produto: nome, descrição, preço base, foto, categoria, status (Ativo/Inativo), ordem

**Saída:**
- Lista atualizada de categorias e produtos
- Produtos refletidos no cardápio público

**Pós-condições:**
- Categorias e produtos são gerenciados conforme as ações do administrador

---

### [RF010] Gerenciar Opcionais

Permite que o administrador crie, edite e exclua grupos de opcionais e opcionais individuais, associando-os a produtos.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve estar autenticado

**Entrada:**
- Dados do grupo de opcionais: nome, tipo de seleção (única/múltipla)
- Dados do opcional: nome, preço adicional
- Associação de grupos a produtos

**Saída:**
- Lista atualizada de grupos de opcionais e opcionais
- Opcionais disponíveis para seleção no cardápio público

**Pós-condições:**
- Opcionais são gerenciados e associados aos produtos

---

### [RF011] Gerenciar Cupons de Desconto

Permite que o administrador crie, visualize, edite e desative cupons de desconto.

**Prioridade:**
- ☐ Essencial
- ☑ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve estar autenticado

**Entrada:**
- Código do cupom
- Tipo de desconto (Percentual ou Valor Fixo)
- Valor do desconto
- Status (Ativo/Inativo)

**Saída:**
- Lista atualizada de cupons
- Cupons disponíveis para aplicação no carrinho

**Pós-condições:**
- Cupons são gerenciados conforme as ações do administrador

---

### [RF012] Gerenciar Pedidos

Permite que o administrador visualize uma lista de todos os pedidos e altere o status dos mesmos.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve estar autenticado

**Entrada:**
- Filtros (por status, data, etc.)
- Novo status do pedido (se alteração)

**Saída:**
- Lista de pedidos com informações chave (ID, Cliente/Mesa, Status, Valor, Horário)
- Detalhes completos do pedido
- Status atualizado

**Pós-condições:**
- Pedidos são visualizados e gerenciados conforme necessário

---

### [RF013] Visualizar Histórico do Cliente

Permite que o administrador visualize um histórico de clientes e seus pedidos anteriores, pesquisando pelo nome ou número de telefone.

**Prioridade:**
- ☐ Essencial
- ☑ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve estar autenticado

**Entrada:**
- Nome ou número de telefone do cliente

**Saída:**
- Informações do cliente (Nome, Telefone)
- Lista de todos os pedidos anteriores associados
- Detalhes de cada pedido

**Pós-condições:**
- O histórico do cliente é visualizado

---

### [RF014] Visualizar Métricas Simples

Permite que o administrador visualize métricas simples em um dashboard, como total de pedidos por dia e produtos mais vendidos.

**Prioridade:**
- ☐ Essencial
- ☑ Importante
- ☐ Desejável

**Pré-condições:**
- O administrador deve estar autenticado

**Entrada:**
- Período de filtro (Hoje, Últimos 7 dias, etc.)

**Saída:**
- Número total de pedidos no período
- Lista dos produtos mais vendidos
- Gráficos ou visualizações (se implementado)

**Pós-condições:**
- Métricas são visualizadas no dashboard

---

## 3.3. Ações da Equipe do Restaurante

### [RF015] Receber Notificações de Novos Pedidos

Permite que a equipe do restaurante seja notificada imediatamente (de forma sonora e visual) sempre que um novo pedido for enviado.

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O aplicativo desktop deve estar em execução
- Deve haver conexão com o banco de dados

**Entrada:**
- Novo pedido criado no sistema

**Saída:**
- Notificação visual clara
- Notificação sonora ("bip")
- Pedido aparece na fila "Novos Pedidos"

**Pós-condições:**
- A equipe é alertada sobre o novo pedido

---

### [RF016] Alterar Status do Pedido

Permite que a equipe do restaurante altere o status de um pedido usando uma interface simples (Recebido → Em Preparo → Pronto).

**Prioridade:**
- ☑ Essencial
- ☐ Importante
- ☐ Desejável

**Pré-condições:**
- O aplicativo desktop deve estar em execução
- Deve existir um pedido no sistema

**Entrada:**
- Seleção do pedido
- Novo status desejado

**Saída:**
- Status atualizado no banco de dados
- Status refletido na página de acompanhamento do cliente em tempo real

**Pós-condições:**
- O status do pedido é atualizado

---

# 4. Requisitos Não-Funcionais

Esta seção apresenta os requisitos não-funcionais do sistema em detalhes. Todos os requisitos não-funcionais aqui apresentados são essenciais para o bom funcionamento do sistema.

## 4.1. Performance

### [RNF001] Tempo de resposta

O tempo de resposta de uma consulta de um usuário deve ser de no máximo 05 segundos.

**Casos de uso associados:** todos.

---

### [RNF002] Atualização em tempo real

O sistema deve atualizar o status dos pedidos em tempo real, com latência máxima de 2 segundos entre a alteração no aplicativo desktop e a visualização na página do cliente.

**Casos de uso associados:** [RF006], [RF016]

---

## 4.2. Usabilidade

### [RNF003] Interface gráfica com o usuário

A interface deverá ser amigável, simples e intuitiva. A preocupação com as duas últimas características é devida ao fato de possivelmente o usuário não ter muita experiência com o uso do computador. Desta forma, as mensagens de erro devem ser explicativas, de modo a mostrar ao usuário como ele deve agir.

**Casos de uso associados:** todos.

---

### [RNF004] Design responsivo

O sistema web deve ser totalmente responsivo, funcionando adequadamente em dispositivos móveis (smartphones) e tablets, além de desktops.

**Casos de uso associados:** [RF001] a [RF006]

---

### [RNF005] Acessibilidade

A interface deve seguir padrões básicos de acessibilidade web (WCAG 2.1 nível AA), incluindo contraste adequado, navegação por teclado e leitores de tela.

**Casos de uso associados:** todos.

---

## 4.3. Confiabilidade

### [RNF006] Disponibilidade

O sistema web deve estar disponível 24 horas por dia, com tempo de inatividade planejado mínimo.

**Casos de uso associados:** todos.

---

### [RNF007] Consistência dos dados

Caso ocorra algum erro no processamento de uma transação, o programa deve retornar para um estado anterior consistente, sem que haja o comprometimento da coerência dos dados armazenados.

**Casos de uso associados:** [RF003], [RF004], [RF005], [RF009], [RF010], [RF011], [RF012], [RF016]

---

### [RNF008] Tolerância a falhas

O aplicativo desktop deve continuar funcionando mesmo em caso de perda temporária de conexão, sincronizando automaticamente quando a conexão for restabelecida.

**Casos de uso associados:** [RF015], [RF016]

---

## 4.4. Segurança

### [RNF009] Restrições de acesso

A confidencialidade dos dados do cliente é assegurada pela utilização de um servidor de banco de dados seguro (Supabase) e por um mecanismo de acesso autorizado, no qual cada administrador utiliza um email e uma senha para poder acessar o sistema. Ou seja, cada ator terá acesso a funcionalidades personalizadas.

**Casos de uso associados:** [RF007] a [RF014]

---

### [RNF010] Proteção de dados

Os dados pessoais dos clientes (nome, telefone) devem ser armazenados de forma segura e não devem ser compartilhados com terceiros sem consentimento.

**Casos de uso associados:** [RF005], [RF013]

---

### [RNF011] Validação de entrada

Todas as entradas de dados devem ser validadas tanto no frontend quanto no backend para prevenir ataques de injeção e garantir integridade dos dados.

**Casos de uso associados:** todos.

---

## 4.5. Corretude

### [RNF012] Correção dos dados

O sistema deve sempre retornar dados válidos para o usuário. Todos os cálculos (subtotal, desconto, total) devem ser precisos e consistentes.

**Casos de uso associados:** todos.

---

### [RNF013] Validação de regras de negócio

O sistema deve validar todas as regras de negócio, como:
- Produtos inativos não devem aparecer no cardápio
- Cupons inativos não devem ser aplicáveis
- Quantidades devem ser números positivos
- Preços devem ser valores válidos

**Casos de uso associados:** [RF001], [RF002], [RF003], [RF004], [RF011]

---

## 4.6. Requisitos de Hardware e Software

### [RNF014] Hardware - Cliente Web

Os dispositivos que acessarem o sistema web devem ter no mínimo:
- Processador compatível com navegadores modernos
- 2GB de memória RAM
- Conexão com internet
- Navegador web atualizado (Chrome, Firefox, Safari, Edge)

---

### [RNF015] Hardware - Aplicativo Desktop

Os computadores que executarem o aplicativo desktop devem ter no mínimo:
- Processador Intel Core i3 ou equivalente
- 4GB de memória RAM
- Sistema operacional macOS (versão 10.13 ou superior)
- Conexão com internet

---

### [RNF016] Software

O sistema será implementado usando:
- **Linguagem:** TypeScript (obrigatório)
- **Paradigma:** Programação Orientada a Objetos (POO) - obrigatório
- **Framework Web:** Next.js (App Router)
- **Backend:** Supabase (PostgreSQL, Autenticação, Storage, Realtime)
- **Desktop:** Electron
- **UI Components:** Radix UI e Shadcn UI
- **Estilização:** TailwindCSS
- **Banco de Dados:** PostgreSQL (via Supabase)

---

# 5. Diagrama de Casos de Uso

O diagrama de casos de uso do sistema deve ser construído utilizando recursos da UML, mostrando os relacionamentos entre os atores (Cliente, Administrador, Equipe do Restaurante) e os casos de uso descritos na Seção 3.

**Principais casos de uso identificados:**

**Cliente:**
- Visualizar Cardápio por Categoria
- Visualizar Detalhes do Produto
- Adicionar Produto ao Carrinho
- Gerenciar Carrinho de Compras
- Finalizar Pedido
- Acompanhar Status do Pedido

**Administrador:**
- Autenticar no Painel Administrativo
- Personalizar Informações do Cardápio
- Gerenciar Categorias e Produtos
- Gerenciar Opcionais
- Gerenciar Cupons de Desconto
- Gerenciar Pedidos
- Visualizar Histórico do Cliente
- Visualizar Métricas Simples

**Equipe do Restaurante:**
- Receber Notificações de Novos Pedidos
- Alterar Status do Pedido

---

# 6. Considerações Finais

## 6.1. Conclusões

O Cardápio APSOO foi desenvolvido seguindo rigorosamente os princípios de Programação Orientada a Objetos (POO), utilizando TypeScript como linguagem de programação. Todas as entidades de negócio foram modeladas como classes TypeScript, garantindo encapsulamento, reutilização e manutenibilidade do código.

O sistema foi arquitetado em três componentes principais:
1. **Plataforma Web do Cliente:** Interface pública responsiva para visualização do cardápio e realização de pedidos
2. **Painel Web do Restaurante:** Área administrativa completa para gerenciamento do cardápio e operações
3. **Aplicativo Desktop de Gestão:** Estação de pedidos em tempo real para a equipe do restaurante

A escolha do Supabase como backend permitiu uma implementação rápida e eficiente, fornecendo banco de dados PostgreSQL, autenticação, armazenamento de arquivos e funcionalidades de tempo real nativas.

**Principais decisões técnicas:**
- Uso obrigatório de POO e TypeScript conforme especificado no Project Brief
- Arquitetura baseada em Server Components do Next.js para melhor performance
- Integração com Supabase Realtime para atualizações instantâneas de status
- Aplicativo Electron para garantir notificações confiáveis no ambiente desktop

**Dificuldades encontradas:**
- Sincronização em tempo real entre múltiplos componentes (web e desktop)
- Gerenciamento de estado complexo no carrinho de compras com opcionais
- Validação e cálculo preciso de preços com múltiplos opcionais e cupons

## 6.2. Trabalhos Futuros

O sistema atual atende aos requisitos essenciais e importantes definidos. Para futuras iterações, podem ser consideradas as seguintes melhorias:

**Funcionalidades Desejáveis:**
- Sistema de avaliação e comentários de produtos
- Histórico de pedidos para clientes cadastrados
- Sistema de fidelidade com pontos
- Relatórios avançados com gráficos e exportação
- Suporte a múltiplos idiomas
- Modo escuro/claro configurável
- Integração com impressoras para impressão automática de pedidos na cozinha
- Aplicativo mobile nativo (iOS/Android)
- Sistema de mesas com QR Code único por mesa
- Chat em tempo real entre cliente e restaurante
- Sistema de fila de espera para retirada
- Notificações push para clientes quando o pedido estiver pronto

**Melhorias Técnicas:**
- Implementação de testes automatizados mais abrangentes (E2E)
- Otimização de performance com cache e lazy loading
- Implementação de PWA (Progressive Web App) para melhor experiência mobile
- Suporte a múltiplos restaurantes (multi-tenant)
- API REST documentada para integrações futuras
- Sistema de backup automático e recuperação de desastres
- Monitoramento e logging avançado
- Suporte a Windows e Linux no aplicativo desktop

**Melhorias de UX/UI:**
- Animações e transições mais suaves
- Onboarding interativo para novos usuários
- Tutorial contextual para administradores
- Preview em tempo real das alterações no cardápio
- Drag-and-drop para reordenação de produtos e categorias

---

**Fim do Documento**


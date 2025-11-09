# Índice de Documentação: Cardápio APSOO

**Versão:** 2.0  
**Última atualização:** 2024

---

## Visão Geral

Este projeto é uma plataforma de pedidos digitais para restaurantes, composta por três aplicativos principais:
1. **Plataforma Web do Cliente** (Interface pública)
2. **Painel Web do Restaurante** (Área administrativa)
3. **Aplicativo Desktop de Gestão** (Electron para MacOS)

---

## Documentos Principais

### [Project Brief](./project-brief.md)
**Versão:** 2.0  
**Descrição:** Documento executivo contendo visão geral, objetivos, escopo e requisitos técnicos do projeto.  
**Requisitos chave:** Supabase, Electron, MCP, POO, TypeScript

### [PRD - Documento de Requisitos do Produto](./prd/prd.md)
**Versão:** 2.0  
**Descrição:** Requisitos funcionais detalhados organizados por épicos e histórias de usuário.  
**Épicos:** Experiência do Cliente (Web), Gerenciamento do Restaurante (Web Admin), Estação de Pedidos (Desktop)

---

## Arquitetura

### [Arquitetura Full-Stack](./architecture/fullstack-architecture.md)
**Versão:** 2.0  
**Descrição:** Visão completa da arquitetura de dados, backend e frontend. Inclui princípios de implementação POO/TypeScript.

### [Arquitetura Frontend](./architecture/frontend-architecture.md)
**Versão:** 2.0  
**Descrição:** Especificações de UI/UX, wireframes e arquitetura de informação para os três aplicativos.

### [Stack Tecnológico](./architecture/tech-stack.md)
**Versão:** 2.0  
**Descrição:** Tecnologias, frameworks e ferramentas utilizadas no projeto.

### [Índice de Arquitetura](./architecture/index.md)
**Versão:** 2.0  
**Descrição:** Índice detalhado de todos os documentos de arquitetura.

---

## Histórias de Usuário

Histórias individuais estão organizadas em `docs/stories/` seguindo o padrão `{epicNum}.{storyNum}.story.md`.

**Épico 1:** Experiência do Cliente (Web)  
**Épico 2:** Gerenciamento do Restaurante (Web Admin)  
**Épico 3:** Estação de Pedidos (Desktop)

---

## Guia de Leitura

### Para Desenvolvedores Novos no Projeto
1. [Project Brief](./project-brief.md) - Entenda o contexto e objetivos
2. [Stack Tecnológico](./architecture/tech-stack.md) - Familiarize-se com as tecnologias
3. [Arquitetura Full-Stack](./architecture/fullstack-architecture.md) - Compreenda a arquitetura geral
4. [PRD](./prd/prd.md) - Conheça os requisitos funcionais

### Para Product Owners / Analistas
1. [Project Brief](./project-brief.md)
2. [PRD](./prd/prd.md)
3. [Arquitetura Frontend](./architecture/frontend-architecture.md)

### Para Arquitetos
1. [Project Brief](./project-brief.md) - Seção 7 (Requisitos Técnicos)
2. [Arquitetura Full-Stack](./architecture/fullstack-architecture.md)
3. [Arquitetura Frontend](./architecture/frontend-architecture.md)

---

## Convenções de Documentação

- **Versões:** Documentos principais devem estar sincronizados em versão
- **Referências:** Sempre referenciar outros documentos usando links relativos
- **Histórias:** Cada história deve ter um arquivo individual em `docs/stories/`
- **Atualizações:** Sempre atualizar a versão e data quando modificar documentos principais


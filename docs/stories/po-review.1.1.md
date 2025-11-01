# PO Review: Story 1.1 - Visualizar Cardápio por Categoria

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 1.1 apresenta uma base sólida e está bem estruturada, mas **requer correções críticas** para garantir alinhamento total com os requisitos obrigatórios de POO e completude dos critérios de aceite. A story está **quase pronta**, mas precisa de refinamentos antes de ser considerada aprovada para desenvolvimento.

**Pontuação Geral:** 7.5/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks bem detalhadas e acionáveis
- ✅ Dev Notes completos com especificações técnicas
- ✅ Referências cruzadas aos documentos de arquitetura estão corretas

### 2. Alinhamento com Requisitos Funcionais
- ✅ Todos os 5 ACs do PRD estão presentes e corretos
- ✅ ACs estão testáveis e mensuráveis
- ✅ Story cobre o escopo completo da funcionalidade

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de POO e TypeScript
- ✅ Estrutura de arquivos proposta faz sentido
- ✅ Testes definidos (unit, integration, E2E)

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. Dependência de Story 2.3 Não Resolvida

**Problema:** AC 1.1.2 menciona "conforme História 2.3", mas Story 2.3 (Gerenciamento de Categorias) ainda não existe ou não foi criada. A ordenação de categorias depende de funcionalidade administrativa que não está disponível.

**Impacto:** A story não pode ser implementada completamente sem definir como as categorias serão ordenadas no admin.

**Recomendação:**
- Opção A: Criar Story 2.3 antes ou em paralelo
- Opção B: Definir na Story 1.1 um valor padrão para ordenação (ex: `order ASC` ou `created_at DESC`) como fallback
- Opção C: Aceitar AC 1.1.2 com nota de que ordenação será implementada quando Story 2.3 estiver disponível

**Ação:** ⚠️ **BLOQUEADOR** - Resolver antes de iniciar desenvolvimento

#### 2. AC 1.1.3 é Ambíguo ("ou")

**Problema:** AC 1.1.3 diz "deve rolar a página para baixo **ou** filtrar a visualização". Isso cria ambiguidade - qual comportamento é esperado?

**Impacto:** Desenvolvedor pode implementar qualquer um dos dois, mas produto pode esperar comportamento específico.

**Recomendação:**
- Verificar com stakeholders qual comportamento é o esperado
- Se scroll suave: especificar "scroll suave para a seção da categoria"
- Se filtro: especificar "filtrar visualização para mostrar apenas produtos da categoria selecionada"
- Sugestão: Escolher **scroll suave** (mais comum em cardápios digitais) e remover "ou filtrar"

**Ação:** 🔴 **CRÍTICO** - Esclarecer antes de aprovar

#### 3. Dados de `store_settings` Não Estão na Story

**Problema:** Task 3.2 e 3.3 mencionam header com logo, nome, horário e capa/descrição, mas esses dados vêm de `store_settings` que não está mapeado como classe POO nesta story.

**Impacto:** Story não define como buscar dados de `store_settings` nem menciona a classe `StoreConfig`.

**Recomendação:**
- Adicionar subtask na Task 2 para criar classe `StoreConfig`
- Adicionar subtask na Task 6 para buscar dados de `store_settings`
- Ou definir que esses dados serão mockados/hardcoded temporariamente (com nota clara)

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 4. Falta AC para Casos de Erro/Vazio

**Problema:** Não há ACs definindo comportamento quando:
- Não há categorias cadastradas
- Não há produtos em uma categoria
- Erro ao carregar dados do Supabase
- Carregamento lento (loading state)

**Impacto:** UX pode ficar inconsistente ou confusa para o usuário.

**Recomendação:**
- Adicionar AC 1.1.6: "A página deve exibir estado de carregamento enquanto busca dados do Supabase"
- Adicionar AC 1.1.7: "Se não houver categorias ativas, a página deve exibir mensagem apropriada (ex: 'Cardápio em atualização')"
- Adicionar AC 1.1.8: "Se uma categoria não tiver produtos ativos, a seção deve ser ocultada ou exibir mensagem"

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar qualidade

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 5. Falta Detalhamento sobre Classes POO

**Problema:** A story menciona criar classes `Category` e `Product`, mas não especifica:
- Quais métodos devem existir nas classes
- Como as classes devem encapsular a lógica de negócio
- Padrão de acesso ao Supabase (as classes devem ter métodos estáticos? Instâncias?)

**Impacto:** Desenvolvedor pode criar classes apenas como DTOs (Data Transfer Objects) em vez de entidades com comportamento.

**Recomendação:**
- Adicionar em Dev Notes > Technical Constraints uma seção específica sobre métodos esperados:
  - `Category.getAllActive()` - método estático que busca categorias ativas ordenadas
  - `Category.getProducts()` - método de instância que busca produtos da categoria
  - `Product.isActive()` - método de instância que verifica status
- Especificar que classes devem encapsular lógica de negócio, não apenas dados

**Ação:** 🟡 **IMPORTANTE** - Adicionar para garantir POO correto

#### 6. Falta Definição de Performance

**Problema:** Não há AC ou constraint sobre performance. Cardápio pode ter muitas categorias/produtos.

**Impacto:** Pode resultar em página lenta ou problemas de UX.

**Recomendação:**
- Adicionar AC sobre tempo de carregamento (ex: "Página deve carregar em menos de 2s")
- Ou adicionar constraint técnica sobre paginação/lazy loading se necessário
- Task 6.3 menciona "cache/otimização", mas não está claro quando é necessário

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante para MVP

#### 7. Testes E2E Podem Ser Mais Específicos

**Problema:** Testes E2E mencionados são genéricos. Falta especificar casos de borda.

**Recomendação:**
- Adicionar casos de teste específicos:
  - Testar com 0 categorias
  - Testar com 1 categoria e 20 produtos
  - Testar com 10 categorias e produtos misturados
  - Testar comportamento de scroll em diferentes dispositivos
  - Testar acessibilidade (navegação por teclado)

**Ação:** 🟢 **SUGESTÃO** - Melhorar completude

#### 8. Referência a "Foto" do Produto Não Está no AC

**Problema:** Dev Notes mencionam foto do produto, mas AC 1.1.4 diz apenas "Nome e Preço".

**Impacto:** Desenvolvedor pode não implementar foto, mas pode ser esperado.

**Recomendação:**
- Se foto é obrigatória: adicionar ao AC 1.1.4
- Se foto é opcional: adicionar nota que foto será implementada em story futura
- Verificar wireframe para confirmar

**Ação:** 🟢 **SUGESTÃO** - Esclarecer se necessário

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs alinhados com PRD
- [ ] ACs não ambíguos (AC 1.1.3 precisa esclarecimento)
- [ ] Casos de erro/vazio definidos (faltando)
- [ ] Edge cases considerados (faltando)

### Requisitos Técnicos
- [x] POO mencionado como obrigatório
- [x] TypeScript mencionado como obrigatório
- [ ] Classes POO especificadas com métodos (necessita detalhamento)
- [ ] Integração com Supabase definida
- [ ] `store_settings` considerado (faltando)

### Dependências
- [ ] Story 2.3 depende de Story 2.3 (não resolvida)
- [ ] Dependências técnicas identificadas

### Testabilidade
- [x] Testes unitários definidos
- [x] Testes de integração definidos
- [x] Testes E2E definidos
- [ ] Casos de teste específicos detalhados (pode melhorar)

### Documentação
- [x] Dev Notes completos
- [x] Referências corretas
- [ ] Estrutura de arquivos definida (pode melhorar)

---

## ✅ Ações Recomendadas Antes de Aprovação

### Prioridade Alta (Bloqueadores)
1. 🔴 **Resolver dependência Story 2.3** - Definir como ordenação será tratada
2. 🔴 **Esclarecer AC 1.1.3** - Escolher entre scroll ou filtro
3. 🔴 **Adicionar `store_settings`** - Incluir busca de dados da loja na story

### Prioridade Média (Importante)
4. 🟡 **Adicionar ACs de erro/vazio** - Melhorar completude
5. 🟡 **Detalhar métodos das classes POO** - Garantir POO correto

### Prioridade Baixa (Sugestões)
6. 🟢 **Definir métricas de performance** - Se relevante para MVP
7. 🟢 **Detalhar casos de teste E2E** - Melhorar qualidade
8. 🟢 **Esclarecer sobre foto de produto** - Se necessário

---

## 📝 Recomendações de Refinamento

### 1. Adicionar ao AC 1.1.3 (Reescrever):
```
AC 1.1.3: Clicar em uma categoria na barra de navegação deve rolar suavemente 
a página para a seção correspondente dessa categoria, utilizando scroll suave (smooth scroll).
```

### 2. Adicionar novos ACs:
```
AC 1.1.6: A página deve exibir um indicador de carregamento enquanto busca dados do Supabase.
AC 1.1.7: Se não houver categorias ativas cadastradas, a página deve exibir mensagem 
informativa: "Cardápio em atualização. Em breve teremos novidades!"
AC 1.1.8: Categorias que não possuem produtos ativos não devem ser exibidas na barra 
de navegação nem como seções na página.
```

### 3. Adicionar na Task 2:
```
- [ ] Subtask 2.5: Criar classe `StoreConfig` conforme [Source: architecture/fullstack-architecture.md#5]
- [ ] Subtask 2.6: Implementar método estático `StoreConfig.getSettings()` para buscar configurações da loja
```

### 4. Adicionar na Task 6:
```
- [ ] Subtask 6.4: Criar serviço para buscar dados de `store_settings` do Supabase (logo, nome, horário, capa, descrição)
```

### 5. Adicionar seção em Dev Notes > Technical Constraints:
```
**Métodos Esperados nas Classes POO:**

**Classe Category:**
- `static async getAllActive(): Promise<Category[]>` - Busca todas categorias ativas ordenadas por `order`
- `async getProducts(): Promise<Product[]>` - Busca produtos ativos desta categoria
- `isActive(): boolean` - Verifica se categoria está ativa

**Classe Product:**
- `isActive(): boolean` - Verifica se produto está ativo
- `getDisplayPrice(): string` - Retorna preço formatado para exibição (ex: "R$ 25,90")

**Classe StoreConfig:**
- `static async getSettings(): Promise<StoreConfig>` - Busca configurações da loja (singleton)
- `getLogoUrl(): string | null` - Retorna URL do logo
- `getCoverUrl(): string | null` - Retorna URL da imagem de capa
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem boa base, mas possui 3 bloqueadores críticos que impedem desenvolvimento completo:
1. Dependência não resolvida (Story 2.3)
2. AC ambíguo (1.1.3)
3. Dados faltantes (`store_settings`)

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Esclarecer AC 1.1.3 com stakeholders
   - Decidir sobre dependência Story 2.3
   - Revisar se foto de produto é obrigatória

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Criar Story 2.3 se necessário
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra bom entendimento dos requisitos e está bem estruturada. As correções necessárias são principalmente sobre completude e clareza, não sobre problemas estruturais fundamentais. Com as correções aplicadas, a story estará pronta para desenvolvimento.

**Tempo estimado para correções:** 1-2 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


# PO Review: Story 1.2 - Adicionar Produto ao Carrinho

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 1.2 está bem estruturada e demonstra boa compreensão dos requisitos. A story expande corretamente os ACs do PRD com melhorias importantes (ACs 1.2.8-1.2.10). No entanto, **requer correções** relacionadas a dependências não resolvidas, casos de erro e validações antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 8.0/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks extremamente detalhadas e acionáveis
- ✅ Dev Notes completos com aprendizados da Story 1.1
- ✅ Estrutura de dados do carrinho bem definida

### 2. Alinhamento com Requisitos Funcionais
- ✅ Todos os 7 ACs do PRD estão presentes
- ✅ ACs adicionais (1.2.8-1.2.10) são melhorias válidas e bem justificadas
- ✅ ACs estão testáveis e mensuráveis
- ✅ Story cobre o escopo completo da funcionalidade

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de POO e TypeScript
- ✅ Referências à Story 1.1 mostram continuidade
- ✅ Métodos POO bem especificados
- ✅ Estrutura de arquivos consistente com Story 1.1

### 4. Qualidade das Tasks
- ✅ Tasks bem organizadas e sequenciais
- ✅ Subtasks granulares e acionáveis
- ✅ Mapeamento correto de ACs para Tasks

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. Dependência de Story 2.4 Não Resolvida

**Problema:** AC 1.2.2 menciona "grupos de opcionais associados (História 2.4)", mas Story 2.4 (Gerenciamento de Opcionais) ainda não existe ou não foi criada. A funcionalidade de opcionais depende de funcionalidade administrativa que não está disponível.

**Impacto:** Similar ao problema da Story 1.1 com Story 2.3. A story não pode ser implementada completamente sem definir como os grupos de opcionais serão criados/gerenciados no admin.

**Recomendação:**
- Opção A: Criar Story 2.4 antes ou em paralelo
- Opção B: Definir na Story 1.2 um comportamento padrão: aceitar produtos sem opcionais e produtos com opcionais já cadastrados diretamente no banco (via SQL/MCP)
- Opção C: Aceitar AC 1.2.2 com nota de que opcionais serão funcionais quando Story 2.4 estiver disponível

**Ação:** ⚠️ **BLOQUEADOR** - Resolver antes de iniciar desenvolvimento

#### 2. Falta AC para Loading State ao Abrir Modal

**Problema:** Não há AC definindo comportamento durante carregamento de dados do produto e opcionais ao abrir o modal. Task 10.3 menciona "loading state", mas não está no AC.

**Impacto:** UX pode ficar inconsistente - usuário pode clicar e não ver feedback imediato.

**Recomendação:**
- Adicionar AC 1.2.11: "Ao clicar em um produto, o modal deve exibir um indicador de carregamento enquanto busca dados do produto e seus opcionais do Supabase"

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 3. Falta AC para Erro ao Buscar Opcionais

**Problema:** Não há AC definindo comportamento quando:
- Erro ao buscar dados do produto
- Erro ao buscar grupos de opcionais
- Produto não existe ou foi removido após carregar a página

**Impacto:** UX pode ficar inconsistente ou confusa para o usuário.

**Recomendação:**
- Adicionar AC 1.2.12: "Se houver erro ao buscar dados do produto ou opcionais, o modal deve exibir mensagem de erro apropriada e permitir fechar"
- Adicionar AC 1.2.13: "Se o produto não existir ou foi removido, o modal não deve abrir e deve exibir mensagem de erro"

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar qualidade

#### 4. Validação de Seleção Única Não Está Clara no AC

**Problema:** AC 1.2.3 menciona "respeitando regras de seleção única/múltipla", mas não especifica claramente que grupos de seleção única devem ter exatamente uma opção selecionada sempre.

**Impacto:** Desenvolvedor pode implementar permitindo nenhuma seleção em grupos únicos.

**Recomendação:**
- Reescrever AC 1.2.3: "O sistema deve permitir a seleção de opcionais respeitando regras de seleção única/múltipla. Grupos de seleção única devem ter exatamente uma opção selecionada. Grupos de seleção múltipla podem ter zero ou mais opções selecionadas."

**Ação:** 🔴 **CRÍTICO** - Esclarecer antes de aprovar

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 5. Falta Especificação sobre Foto de Produto

**Problema:** AC 1.2.1 menciona "foto do produto (se disponível)", mas não especifica comportamento quando foto não está disponível ou erro ao carregar imagem.

**Impacto:** Pode resultar em layout inconsistente.

**Recomendação:**
- Adicionar nota técnica: "Se foto não estiver disponível ou houver erro ao carregar, exibir placeholder ou ocultar seção de foto"
- Ou adicionar subtask específica para tratar fallback de imagem

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar qualidade

#### 6. AC 1.2.7 Não Menciona Reset do Modal

**Problema:** AC 1.2.7 diz que deve adicionar ao carrinho e fechar modal, mas não menciona que o modal deve ser resetado (limpar opcionais, quantidade, observações) para próxima abertura.

**Impacto:** Se usuário fechar modal sem adicionar e reabrir, pode ver dados anteriores.

**Recomendação:**
- Adicionar ao AC 1.2.7: "...e resetar estado do modal (limpar seleções, quantidade, observações)"
- Ou adicionar AC 1.2.14: "Ao abrir o modal, o estado deve ser resetado (quantidade = 1, nenhum opcional selecionado, observações vazias)"

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar UX

#### 7. Falta AC sobre Máximo de Itens no Carrinho

**Problema:** Não há limite definido para quantidade de itens no carrinho. Usuário pode adicionar centenas de itens.

**Impacto:** Pode causar problemas de performance ou UX.

**Recomendação:**
- Adicionar AC 1.2.15: "O sistema deve permitir adicionar até 99 itens únicos no carrinho (limite por item, não total)"
- Ou definir política: "Sem limite de itens no carrinho para MVP"

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante para MVP

#### 8. Falta Validação sobre Adicionar Mesmo Produto Duas Vezes

**Problema:** Não está claro se o mesmo produto com mesmas configurações (opcionais, observações) deve criar item separado ou incrementar quantidade.

**Impacto:** Comportamento inconsistente.

**Recomendação:**
- Adicionar AC 1.2.16: "Se o mesmo produto com mesmas configurações (opcionais e observações idênticas) já estiver no carrinho, incrementar quantidade ao invés de criar novo item"
- Ou especificar: "Sempre criar novo item no carrinho, mesmo se configurações forem idênticas"

**Ação:** 🟡 **IMPORTANTE** - Esclarecer comportamento esperado

#### 9. Falta Detalhamento sobre Persistência do Carrinho

**Problema:** Task 3.4 menciona localStorage, mas não há AC sobre isso. Também não há menção sobre comportamento quando localStorage está desabilitado ou cheio.

**Impacto:** UX pode ser inconsistente em diferentes navegadores/configurações.

**Recomendação:**
- Adicionar AC 1.2.17: "O carrinho deve ser persistido no localStorage do navegador. Se localStorage não estiver disponível, carrinho deve funcionar apenas na sessão atual"
- Adicionar nota técnica sobre tratamento de erro de localStorage

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 10. Falta Validação sobre Preço Total Zero ou Negativo

**Problema:** Não há validação se preço total pode ser zero ou negativo (ex: desconto maior que preço base).

**Impacto:** Pode causar problemas de negócio.

**Recomendação:**
- Adicionar nota técnica: "Preço total nunca deve ser zero ou negativo. Validar antes de permitir adicionar ao carrinho"

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs alinhados com PRD
- [ ] AC 1.2.3 precisa esclarecimento sobre seleção única obrigatória
- [ ] Casos de erro/vazio definidos (faltando loading e erros)
- [ ] Edge cases considerados (faltando reset modal, mesmo produto)

### Requisitos Técnicos
- [x] POO mencionado como obrigatório
- [x] TypeScript mencionado como obrigatório
- [x] Classes POO especificadas com métodos
- [x] Integração com Supabase definida
- [x] Estrutura de dados do carrinho definida

### Dependências
- [ ] Story 2.4 depende de Story 2.4 (não resolvida)
- [x] Dependências técnicas identificadas

### Testabilidade
- [x] Testes unitários definidos
- [x] Testes de integração definidos
- [x] Testes E2E definidos
- [x] Casos de teste específicos detalhados

### Documentação
- [x] Dev Notes completos
- [x] Referências corretas
- [x] Estrutura de arquivos definida
- [x] Aprendizados da Story 1.1 incorporados

---

## ✅ Ações Recomendadas Antes de Aprovação

### Prioridade Alta (Bloqueadores)
1. 🔴 **Resolver dependência Story 2.4** - Definir como opcionais serão tratados
2. 🔴 **Adicionar AC para loading state** - AC 1.2.11
3. 🔴 **Esclarecer AC 1.2.3** - Seleção única obrigatória
4. 🔴 **Adicionar ACs de erro** - ACs 1.2.12 e 1.2.13

### Prioridade Média (Importante)
5. 🟡 **Adicionar AC sobre reset do modal** - AC 1.2.14
6. 🟡 **Esclarecer comportamento de mesmo produto** - AC 1.2.16
7. 🟡 **Adicionar especificação sobre foto** - Nota técnica

### Prioridade Baixa (Sugestões)
8. 🟢 **Adicionar limite de itens no carrinho** - Se relevante
9. 🟢 **Adicionar AC sobre persistência** - Se relevante
10. 🟢 **Adicionar validação de preço total** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Adicionar novos ACs:

```
AC 1.2.11: Ao clicar em um produto, o modal deve exibir um indicador de carregamento enquanto busca dados do produto e seus opcionais do Supabase.

AC 1.2.12: Se houver erro ao buscar dados do produto ou opcionais, o modal deve exibir mensagem de erro apropriada e permitir fechar.

AC 1.2.13: Se o produto não existir ou foi removido, o modal não deve abrir e deve exibir mensagem de erro na página.

AC 1.2.14: Ao abrir o modal, o estado deve ser resetado (quantidade = 1, nenhum opcional selecionado, observações vazias), exceto se estiver editando item existente do carrinho (Story 1.3).

AC 1.2.15: Se foto do produto não estiver disponível ou houver erro ao carregar, exibir placeholder apropriado ou ocultar seção de foto sem quebrar layout.

AC 1.2.16: Se o mesmo produto com mesmas configurações (opcionais e observações idênticas) já estiver no carrinho, incrementar quantidade ao invés de criar novo item.
```

### 2. Reescrever AC 1.2.3:

```
AC 1.2.3: O sistema deve permitir a seleção de opcionais respeitando regras de seleção única/múltipla. 
- Grupos de seleção única devem ter exatamente uma opção selecionada sempre (não pode haver zero seleções).
- Grupos de seleção múltipla podem ter zero ou mais opções selecionadas.
- O sistema deve calcular corretamente o preço adicional total baseado nas opções selecionadas.
```

### 3. Adicionar na Task 4:

```
- [ ] Subtask 4.5: Implementar indicador de carregamento ao abrir modal (AC 1.2.11)
- [ ] Subtask 4.6: Implementar tratamento de erro ao buscar dados do produto (AC 1.2.12, 1.2.13)
```

### 4. Adicionar na Task 9:

```
- [ ] Subtask 9.6: Implementar reset do estado do modal após fechar (AC 1.2.14)
- [ ] Subtask 9.7: Implementar lógica para incrementar quantidade se item idêntico já existe no carrinho (AC 1.2.16)
```

### 5. Adicionar na Task 5:

```
- [ ] Subtask 5.7: Implementar validação: grupos de seleção única devem ter exatamente uma opção selecionada (não pode ser zero)
```

### 6. Adicionar na Task 10:

```
- [ ] Subtask 10.4: Implementar tratamento de erro quando produto não existe ou foi removido
```

### 7. Adicionar seção em Dev Notes > Technical Constraints:

```
**Validações e Regras de Negócio:**

- Preço total nunca deve ser zero ou negativo
- Grupos de seleção única devem sempre ter uma opção selecionada
- Quantidade mínima: 1, máxima: 99
- Observações: máximo 500 caracteres
- Se mesmo produto com mesmas configurações já está no carrinho, incrementar quantidade
- Carrinho persiste no localStorage se disponível, senão apenas na sessão
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem excelente base e demonstra boa compreensão dos requisitos. No entanto, possui 4 bloqueadores críticos que impedem desenvolvimento completo:
1. Dependência não resolvida (Story 2.4)
2. Falta AC para loading state
3. AC ambíguo sobre seleção única
4. Falta ACs para casos de erro

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Decidir sobre dependência Story 2.4 (similar à decisão da Story 1.1)
   - Aprovar novos ACs propostos (1.2.11-1.2.16)

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra excelente qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre completude e clareza, não sobre problemas estruturais fundamentais. A story mostra aprendizado da Story 1.1 ao incorporar melhorias (ACs extras) e referenciar padrões estabelecidos.

**Comparação com Story 1.1:**
- ✅ Melhor: Mais ACs extras bem justificados
- ✅ Melhor: Tasks ainda mais detalhadas
- ✅ Melhor: Estrutura de dados bem definida
- ⚠️ Similar: Mesma dependência de story admin não resolvida

**Tempo estimado para correções:** 1-2 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


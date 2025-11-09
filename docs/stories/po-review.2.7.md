# PO Review: Story 2.7 - Visualizar Histórico do Cliente (CRM Básico)

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 2.7 está bem estruturada e demonstra boa compreensão dos requisitos de CRM básico. A story expande corretamente os ACs do PRD com melhorias importantes (ACs 2.7.7-2.7.16). No entanto, **requer algumas correções** relacionadas a agregação de dados, tratamento de casos edge, validação de busca e comportamento de expansão antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 7.5/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks bem detalhadas e acionáveis
- ✅ Dev Notes completos com exemplos de queries
- ✅ Estrutura de dados bem definida (agregação, busca)

### 2. Alinhamento com Requisitos Funcionais
- ✅ ACs bem detalhados e testáveis
- ✅ Story cobre o escopo completo da funcionalidade
- ✅ Reutilização de componentes (OrderDetailsModal) bem especificada
- ✅ Integração com Story 2.6 bem documentada

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de TypeScript
- ✅ Referências às Stories anteriores mostram continuidade
- ✅ Índices de performance bem especificados
- ✅ Busca case-insensitive e parcial bem documentada

### 4. Qualidade das Tasks
- ✅ Tasks bem organizadas e sequenciais
- ✅ Subtasks granulares e acionáveis
- ✅ Mapeamento correto de ACs para Tasks
- ✅ Boa separação de responsabilidades

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. Contradição no AC 2.7.2 e AC 2.7.6 sobre Agrupamento

**Problema:** AC 2.7.2 diz "agregar por `customer_phone` ou `customer_name` quando `order_type = 'Retirada'`", mas AC 2.7.6 diz "A busca deve considerar tanto pedidos de 'Retirada' (com `customer_name` e `customer_phone`) quanto 'Consumo no Local' (apenas `table_number`, não agrupar por cliente)". Há contradição: AC 2.7.2 sugere agrupar por `customer_name` OU `customer_phone`, mas AC 2.7.6 diz que pedidos de "Consumo no Local" não devem ser agrupados.

**Impacto:** Desenvolvedor pode ficar confuso sobre como agrupar pedidos de "Retirada" (por telefone ou nome?) e se deve incluir "Consumo no Local" na busca.

**Recomendação:**
- Clarificar AC 2.7.2: "Agrupar pedidos por `customer_phone` (chave única do cliente). Se `customer_phone` for null ou pedido for de 'Consumo no Local', não incluir na busca de clientes."
- Atualizar AC 2.7.6: "A busca deve considerar apenas pedidos de 'Retirada' (com `customer_name` e `customer_phone` preenchidos). Pedidos de 'Consumo no Local' (apenas `table_number`) não devem aparecer na busca de clientes, pois não há cliente identificado."

**Ação:** 🔴 **CRÍTICO** - Corrigir antes de aprovar

#### 2. Falta Especificação de Agregação SQL vs In-Memory

**Problema:** AC 2.7.2 e Dev Notes mencionam agregação (total de pedidos, valor total gasto), mas não especificam se deve ser feita via SQL (GROUP BY) ou em memória após buscar todos os pedidos.

**Impacto:** Performance pode ser ruim se agregação for feita em memória com muitos pedidos. SQL GROUP BY é mais eficiente.

**Recomendação:**
- Adicionar AC 2.7.20: "A agregação de métricas (total de pedidos, valor total gasto) deve ser feita via SQL usando GROUP BY na query do Supabase para garantir performance adequada, não em memória após buscar todos os pedidos."
- Atualizar Dev Notes com exemplo de query SQL usando GROUP BY.

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 3. Falta AC sobre Validação de Termo de Busca Vazio

**Problema:** AC 2.7.8 e 2.7.9 mencionam campo de busca e debounce, mas não especificam comportamento quando usuário tenta buscar com campo vazio ou apenas espaços.

**Impacto:** Pode causar requisições desnecessárias ou erros se busca for executada com termo vazio.

**Recomendação:**
- Adicionar AC 2.7.21: "Se o campo de busca estiver vazio ou contiver apenas espaços, o botão 'Buscar' deve estar desabilitado e a busca não deve ser executada. Ao pressionar Enter em campo vazio, não deve fazer nada."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 4. Falta AC sobre Limite de Resultados e Paginação

**Problema:** AC 2.7.1 e 2.7.2 não especificam limite de resultados ou paginação. Se houver muitos clientes com mesmo nome/telefone parcial, pode retornar centenas de resultados.

**Impacto:** Performance pode ser ruim e UX pode ficar confusa com muitos resultados.

**Recomendação:**
- Adicionar AC 2.7.22: "A busca deve retornar no máximo 50 clientes por vez. Se houver mais resultados, exibir mensagem 'Mostrando 50 de X clientes encontrados. Refine sua busca para ver mais resultados.' Não há paginação nesta versão."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 5. Falta AC sobre Comportamento de Expansão/Colapso

**Problema:** AC 2.7.11 diz "expandir ou abrir modal", mas não especifica qual comportamento deve ser usado. AC 2.7.6 menciona "expansão/colapso", mas não detalha comportamento.

**Impacto:** Pode causar inconsistência na implementação - alguns desenvolvedores podem usar expansão, outros modal.

**Recomendação:**
- Clarificar AC 2.7.11: "Ao clicar em um cliente, deve expandir o card mostrando lista de pedidos dentro do próprio card (não abrir modal separado). O card deve ter indicador visual de expansão (ícone de seta ou chevron). Ao clicar novamente, deve colapsar."
- Adicionar AC 2.7.23: "Apenas um card de cliente pode estar expandido por vez. Ao expandir um novo card, o anterior deve colapsar automaticamente."

**Ação:** 🔴 **CRÍTICO** - Clarificar antes de aprovar

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 6. Falta AC sobre Formato de Telefone na Busca

**Problema:** AC 2.7.1 menciona busca por telefone, mas não especifica se deve aceitar telefone com ou sem formatação (ex: "11999999999" vs "(11) 99999-9999").

**Impacto:** Usuário pode buscar por telefone formatado e não encontrar resultados se telefone estiver salvo sem formatação.

**Recomendação:**
- Adicionar AC 2.7.24: "A busca por telefone deve aceitar telefone com ou sem formatação. O sistema deve remover caracteres especiais (parênteses, hífens, espaços) antes de comparar. Exemplo: busca '11999999999' encontra '(11) 99999-9999' e vice-versa."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 7. Falta AC sobre Ordenação de Resultados

**Problema:** AC 2.7.10 menciona exibir resultados, mas não especifica ordem (alfabética por nome? Por data do último pedido? Por valor total gasto?).

**Impacto:** Pode causar inconsistência na UX - resultados podem aparecer em ordem aleatória.

**Recomendação:**
- Adicionar AC 2.7.25: "Os resultados da busca devem ser ordenados por data do último pedido (mais recentes primeiro). Em caso de empate, ordenar por nome do cliente (alfabética)."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 8. Falta AC sobre Loading ao Expandir Cliente

**Problema:** AC 2.7.13 menciona estados de loading, mas não especifica se deve exibir loading ao expandir cliente e carregar lista de pedidos.

**Impacto:** Pode causar confusão - usuário pode clicar e não ter feedback visual enquanto pedidos estão sendo carregados.

**Recomendação:**
- Adicionar AC 2.7.26: "Ao expandir um cliente, deve exibir indicador de loading (skeleton ou spinner) enquanto lista de pedidos está sendo carregada. Se houver erro ao carregar pedidos, exibir mensagem de erro dentro do card expandido."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 9. Falta AC sobre Tratamento de Cliente com Múltiplos Telefones

**Problema:** AC 2.7.2 agrupa por `customer_phone`, mas não especifica comportamento se mesmo cliente fizer pedidos com telefones diferentes (ex: celular e fixo).

**Impacto:** Cliente pode aparecer como dois clientes diferentes na busca.

**Recomendação:**
- Adicionar nota técnica: "Esta versão agrupa por `customer_phone` (chave única). Se mesmo cliente usar telefones diferentes, aparecerá como clientes separados. Melhoria futura: normalização de telefone ou agrupamento por nome + telefone similar."

**Ação:** 🟡 **IMPORTANTE** - Adicionar nota técnica

#### 10. Falta AC sobre Acessibilidade da Busca

**Problema:** AC 2.7.8 e 2.7.9 mencionam campo de busca e botão, mas não especificam acessibilidade (labels, ARIA, navegação por teclado).

**Impacto:** Campo de busca pode não ser acessível para usuários com deficiências.

**Recomendação:**
- Adicionar AC 2.7.27: "O campo de busca e botão devem ser acessíveis via teclado (Tab para navegar, Enter para buscar) e ter labels apropriados para screen readers (ex: 'Campo de busca para nome ou telefone do cliente')."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar acessibilidade

#### 11. Falta AC sobre Mensagem quando Cliente não tem Pedidos

**Problema:** AC 2.7.11 menciona expandir e mostrar lista de pedidos, mas não especifica comportamento se cliente não tiver pedidos (caso edge improvável, mas possível).

**Impacto:** Pode causar confusão - card expande mas não mostra nada.

**Recomendação:**
- Adicionar AC 2.7.28: "Se cliente não tiver pedidos (caso edge), ao expandir deve exibir mensagem 'Este cliente ainda não possui pedidos registrados.' dentro do card expandido."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 12. Falta AC sobre Cache de Resultados

**Problema:** Não há AC sobre cache de resultados de busca. Se usuário buscar mesmo termo novamente, pode fazer requisição desnecessária.

**Impacto:** Pode causar requisições excessivas se usuário alternar entre buscas.

**Recomendação:**
- Adicionar nota técnica: "Considerar cache de resultados de busca no frontend (ex: manter últimos 10 termos buscados em memória) para melhorar performance. Não é obrigatório nesta versão."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs bem detalhados e testáveis
- [ ] Casos de erro/vazio definidos (faltando busca vazia, limite de resultados)
- [ ] Edge cases considerados (faltando cliente sem pedidos, múltiplos telefones)
- [ ] Comportamento de expansão especificado (faltando clarificação)

### Requisitos Técnicos
- [x] TypeScript mencionado como obrigatório
- [x] Índices de performance especificados
- [ ] Agregação SQL vs in-memory especificada (faltando AC)
- [ ] Limite de resultados especificado (faltando AC)
- [ ] Ordenação de resultados especificada (faltando AC)

### Segurança
- [x] RLS já configurado (Story 2.6)
- [x] Proteção de rotas especificada
- [ ] Validação de termo de busca especificada (faltando AC)

### Testabilidade
- [x] Testes unitários definidos
- [x] Testes de integração definidos
- [x] Casos de teste específicos detalhados
- [ ] Casos de teste para edge cases (faltando cliente sem pedidos, busca vazia)

### Documentação
- [x] Dev Notes completos
- [x] Referências corretas
- [x] Exemplos de queries bem documentados
- [ ] Agregação SQL bem especificada (faltando exemplo GROUP BY)

---

## ✅ Ações Recomendadas Antes de Aprovação

### Prioridade Alta (Bloqueadores)
1. 🔴 **Corrigir contradição sobre agrupamento** - AC 2.7.2 e 2.7.6
2. 🔴 **Especificar agregação SQL vs in-memory** - AC 2.7.20
3. 🔴 **Adicionar AC para validação de busca vazia** - AC 2.7.21
4. 🔴 **Adicionar AC para limite de resultados** - AC 2.7.22
5. 🔴 **Clarificar comportamento de expansão** - AC 2.7.11 e 2.7.23

### Prioridade Média (Importante)
6. 🟡 **Adicionar AC para formato de telefone** - AC 2.7.24
7. 🟡 **Adicionar AC para ordenação de resultados** - AC 2.7.25
8. 🟡 **Adicionar AC para loading ao expandir** - AC 2.7.26
9. 🟡 **Adicionar nota sobre múltiplos telefones** - Nota técnica
10. 🟡 **Adicionar AC para acessibilidade da busca** - AC 2.7.27

### Prioridade Baixa (Sugestões)
11. 🟢 **Adicionar AC para cliente sem pedidos** - AC 2.7.28
12. 🟢 **Adicionar nota sobre cache de resultados** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Corrigir ACs existentes:

```
AC 2.7.2 (CORRIGIDO): O método deve retornar pedidos agrupados por cliente (agregar por `customer_phone`, que é a chave única do cliente). Para cada cliente, retornar: nome, telefone, total de pedidos, valor total gasto, último pedido. **Nota:** Apenas pedidos de "Retirada" com `customer_phone` preenchido devem ser incluídos na busca. Pedidos de "Consumo no Local" não têm cliente identificado e não devem aparecer.

AC 2.7.6 (CORRIGIDO): A busca deve considerar apenas pedidos de "Retirada" (com `customer_name` e `customer_phone` preenchidos). Pedidos de "Consumo no Local" (apenas `table_number`) não devem aparecer na busca de clientes, pois não há cliente identificado.

AC 2.7.11 (CLARIFICADO): Ao clicar em um cliente, deve expandir o card mostrando lista de todos os pedidos anteriores dentro do próprio card (não abrir modal separado). O card deve ter indicador visual de expansão (ícone de seta ou chevron). Ao clicar novamente, deve colapsar.
```

### 2. Adicionar novos ACs:

```
AC 2.7.20: A agregação de métricas (total de pedidos, valor total gasto) deve ser feita via SQL usando GROUP BY na query do Supabase para garantir performance adequada, não em memória após buscar todos os pedidos.

AC 2.7.21: Se o campo de busca estiver vazio ou contiver apenas espaços, o botão "Buscar" deve estar desabilitado e a busca não deve ser executada. Ao pressionar Enter em campo vazio, não deve fazer nada.

AC 2.7.22: A busca deve retornar no máximo 50 clientes por vez. Se houver mais resultados, exibir mensagem "Mostrando 50 de X clientes encontrados. Refine sua busca para ver mais resultados." Não há paginação nesta versão.

AC 2.7.23: Apenas um card de cliente pode estar expandido por vez. Ao expandir um novo card, o anterior deve colapsar automaticamente.

AC 2.7.24: A busca por telefone deve aceitar telefone com ou sem formatação. O sistema deve remover caracteres especiais (parênteses, hífens, espaços) antes de comparar. Exemplo: busca "11999999999" encontra "(11) 99999-9999" e vice-versa.

AC 2.7.25: Os resultados da busca devem ser ordenados por data do último pedido (mais recentes primeiro). Em caso de empate, ordenar por nome do cliente (alfabética).

AC 2.7.26: Ao expandir um cliente, deve exibir indicador de loading (skeleton ou spinner) enquanto lista de pedidos está sendo carregada. Se houver erro ao carregar pedidos, exibir mensagem de erro dentro do card expandido.

AC 2.7.27: O campo de busca e botão devem ser acessíveis via teclado (Tab para navegar, Enter para buscar) e ter labels apropriados para screen readers (ex: "Campo de busca para nome ou telefone do cliente").

AC 2.7.28: Se cliente não tiver pedidos (caso edge), ao expandir deve exibir mensagem "Este cliente ainda não possui pedidos registrados." dentro do card expandido.
```

### 3. Atualizar Task 1:

```
- [ ] Subtask 1.2: Implementar agregação de pedidos por cliente usando SQL GROUP BY (agrupar por `customer_phone` quando disponível, filtrar apenas pedidos de "Retirada") (AC 2.7.2, 2.7.6, 2.7.20)
- [ ] Subtask 1.7: Implementar normalização de telefone na busca (remover caracteres especiais) para aceitar telefone com ou sem formatação (AC 2.7.24)
- [ ] Subtask 1.8: Implementar ordenação de resultados por data do último pedido (mais recentes primeiro), depois por nome (AC 2.7.25)
- [ ] Subtask 1.9: Implementar limite de 50 resultados por busca (AC 2.7.22)
```

### 4. Atualizar Task 2:

```
- [ ] Subtask 2.7: Validar termo de busca (não permitir busca vazia ou apenas espaços) (AC 2.7.21)
- [ ] Subtask 2.8: Retornar limite de 50 clientes por busca com mensagem se houver mais resultados (AC 2.7.22)
```

### 5. Atualizar Task 3:

```
- [ ] Subtask 3.8: Desabilitar botão "Buscar" quando campo estiver vazio ou contiver apenas espaços (AC 2.7.21)
- [ ] Subtask 3.9: Implementar acessibilidade do campo de busca (labels, ARIA, navegação por teclado) (AC 2.7.27)
```

### 6. Atualizar Task 4:

```
- [ ] Subtask 4.7: Implementar expansão/colapso de card (apenas um expandido por vez) (AC 2.7.11, 2.7.23)
- [ ] Subtask 4.8: Exibir indicador visual de expansão (ícone de seta ou chevron) (AC 2.7.11)
```

### 7. Atualizar Task 5:

```
- [ ] Subtask 5.6: Exibir indicador de loading ao expandir cliente enquanto pedidos estão sendo carregados (AC 2.7.26)
- [ ] Subtask 5.7: Exibir mensagem de erro dentro do card se houver erro ao carregar pedidos (AC 2.7.26)
- [ ] Subtask 5.8: Exibir mensagem "Este cliente ainda não possui pedidos registrados" se cliente não tiver pedidos (AC 2.7.28)
```

### 8. Adicionar seção em Dev Notes > Agregação SQL:

```
**Agregação via SQL GROUP BY:**

A agregação deve ser feita diretamente na query SQL para garantir performance:

```sql
SELECT 
  customer_phone,
  MAX(customer_name) as name,
  COUNT(*) as total_orders,
  SUM(total) as total_spent,
  MAX(created_at) as last_order_date,
  (SELECT status FROM orders o2 
   WHERE o2.customer_phone = o.customer_phone 
   ORDER BY created_at DESC LIMIT 1) as last_order_status
FROM orders o
WHERE order_type = 'Retirada'
  AND customer_phone IS NOT NULL
  AND (customer_name ILIKE '%${searchTerm}%' OR customer_phone ILIKE '%${searchTerm}%')
GROUP BY customer_phone
ORDER BY last_order_date DESC, name ASC
LIMIT 50
```

**Normalização de Telefone:**

Antes de buscar, remover caracteres especiais do termo de busca:
```typescript
const normalizedSearchTerm = searchTerm.replace(/[^\d]/g, '')
// Buscar por telefone normalizado
```

**Múltiplos Telefones:**

Esta versão agrupa por `customer_phone` (chave única). Se mesmo cliente usar telefones diferentes, aparecerá como clientes separados. Melhoria futura: normalização de telefone ou agrupamento por nome + telefone similar.
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem boa base e demonstra aprendizado das stories anteriores. No entanto, possui 5 bloqueadores críticos que impedem desenvolvimento completo:
1. Contradição sobre agrupamento de pedidos (AC 2.7.2 vs 2.7.6)
2. Falta especificação de agregação SQL vs in-memory
3. Falta validação de termo de busca vazio
4. Falta limite de resultados
5. Comportamento de expansão não está claro

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Aprovar novos ACs propostos (2.7.20-2.7.28)
   - Decidir sobre cache de resultados (nota técnica ou AC)

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra boa qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre completude, casos edge, performance e UX, não sobre problemas estruturais fundamentais. A story mostra aprendizado das Stories anteriores ao incorporar padrões estabelecidos (debounce, toast, responsividade, reutilização de componentes).

**Comparação com Stories Anteriores:**
- ✅ Similar: Mesmo padrão de expandir ACs do PRD com melhorias
- ✅ Melhor: Reutilização de componentes bem especificada
- ✅ Melhor: Exemplos de queries bem documentados
- ⚠️ Área de melhoria: Necessita mais atenção a performance (agregação SQL) e casos edge (busca vazia, múltiplos telefones)

**Destaques:**
- Excelente trabalho em especificar busca case-insensitive e parcial
- Boa separação de responsabilidades nas tasks
- Aprendizados das Stories anteriores bem incorporados
- Boa cobertura de casos de erro e validações

**Áreas de Melhoria:**
- Necessita mais atenção a performance (agregação SQL vs in-memory)
- Necessita mais casos edge (busca vazia, cliente sem pedidos, múltiplos telefones)
- Necessita mais atenção a UX (comportamento de expansão, loading, ordenação)

**Tempo estimado para correções:** 2-3 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


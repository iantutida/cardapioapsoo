# PO Review: Story 2.8 - Visualizar Métricas Simples

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 2.8 está bem estruturada e demonstra boa compreensão dos requisitos de dashboard e métricas. A story expande corretamente os ACs do PRD com melhorias importantes. No entanto, **requer algumas correções** relacionadas a performance (agregação SQL vs in-memory), definição de períodos (timezone, inclusão de hoje), tratamento de produtos deletados e casos edge antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 7.0/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks bem detalhadas e acionáveis
- ✅ Dev Notes completos com exemplos de código
- ✅ Estrutura de dados bem definida (métricas, top produtos)

### 2. Alinhamento com Requisitos Funcionais
- ✅ ACs bem detalhados e testáveis
- ✅ Story cobre o escopo completo da funcionalidade
- ✅ Integração com Stories anteriores bem documentada
- ✅ Estados de loading e erro bem especificados

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de TypeScript
- ✅ Referências às Stories anteriores mostram continuidade
- ✅ Índices de performance bem especificados
- ✅ Timeout e logs estruturados bem definidos

### 4. Qualidade das Tasks
- ✅ Tasks bem organizadas e sequenciais
- ✅ Subtasks granulares e acionáveis
- ✅ Mapeamento correto de ACs para Tasks
- ✅ Boa separação de responsabilidades

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. Agregação In-Memory vs SQL (Performance)

**Problema:** Dev Notes (linhas 136-162) mostram exemplo de agregação de produtos mais vendidos **em memória** após buscar todos os `order_items`. Com muitos pedidos, isso pode causar problemas de performance. AC 2.8.3 não especifica se agregação deve ser SQL ou in-memory.

**Impacto:** Performance pode ser ruim com muitos pedidos. SQL GROUP BY é mais eficiente e escalável.

**Recomendação:**
- Adicionar AC 2.8.20: "A agregação de produtos mais vendidos deve ser feita via SQL usando GROUP BY na query do Supabase para garantir performance adequada, não em memória após buscar todos os order_items."
- Atualizar Dev Notes com exemplo de query SQL usando GROUP BY.

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 2. Definição de Período "Últimos 7 Dias" Ambígua

**Problema:** AC 2.8.1 e Dev Notes (linha 127) dizem "últimos 7 dias completos" com "fim do dia de ontem (23:59:59)", mas não especifica se deve incluir hoje ou não. Há ambiguidade: "últimos 7 dias" pode significar "hoje + 6 dias anteriores" ou "7 dias anteriores excluindo hoje".

**Impacto:** Desenvolvedor pode implementar de forma diferente do esperado pelo usuário.

**Recomendação:**
- Clarificar AC 2.8.1 e Dev Notes: "Período 'last7days' deve incluir os últimos 7 dias completos incluindo hoje (hoje + 6 dias anteriores). Data inicial: 7 dias atrás (00:00:00) em timezone local. Data final: agora (não fim do dia de ontem)."
- Ou alternativamente: "Período 'last7days' deve incluir apenas os últimos 7 dias completos excluindo hoje (7 dias anteriores). Data inicial: 7 dias atrás (00:00:00). Data final: fim do dia de ontem (23:59:59)."

**Ação:** 🔴 **CRÍTICO** - Clarificar antes de aprovar

#### 3. Falta AC sobre Timezone para Cálculo de Períodos

**Problema:** Dev Notes mencionam "timezone local", mas não especificam como lidar com timezone do servidor vs cliente. Supabase armazena timestamps em UTC.

**Impacto:** Métricas podem estar incorretas dependendo do timezone do servidor/cliente.

**Recomendação:**
- Adicionar AC 2.8.21: "O cálculo de períodos deve considerar timezone do servidor (UTC) para consistência. Período 'today' deve ser calculado como: início do dia atual em UTC (00:00:00 UTC) até agora em UTC. Período 'last7days' deve ser calculado como: 7 dias atrás em UTC até agora em UTC."
- Ou alternativamente: "O cálculo de períodos deve considerar timezone do cliente (timezone local do navegador) para melhor UX. Converter timestamps UTC para timezone local antes de filtrar."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 4. Falta AC sobre Tratamento de Produtos Deletados/Soft Deleted

**Problema:** AC 2.8.2 e 2.8.3 não especificam se produtos deletados (soft deleted) devem aparecer na lista de "Produtos Mais Vendidos". Se produto foi deletado mas ainda tem vendas históricas, deve aparecer?

**Impacto:** Pode causar confusão - produto deletado aparece como "mais vendido".

**Recomendação:**
- Adicionar AC 2.8.22: "A lista de produtos mais vendidos deve incluir apenas produtos ativos (não deletados). Se produto foi soft deleted (`deleted_at IS NOT NULL`), não deve aparecer na lista, mesmo que tenha vendas históricas no período."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 5. Falta AC sobre Validação de Parâmetro `limit`

**Problema:** AC 2.8.2 menciona `limit: number`, mas não especifica valores válidos (mínimo, máximo). Se usuário passar `limit = 0` ou `limit = 1000`, o que acontece?

**Impacto:** Pode causar problemas de performance ou resultados inesperados.

**Recomendação:**
- Adicionar AC 2.8.23: "O parâmetro `limit` deve ser validado: mínimo 1, máximo 50. Se valor inválido for passado, retornar erro de validação. Valor padrão deve ser 10 se não especificado."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 6. Falta AC sobre Comparação com Período Anterior

**Problema:** AC 2.8.8 menciona cards de métricas, mas não especifica se deve mostrar comparação com período anterior (ex: "Hoje: 50 pedidos (+10% vs ontem)").

**Impacto:** Dashboard pode ficar menos informativo sem comparações.

**Recomendação:**
- Adicionar nota técnica: "Comparação com período anterior não é obrigatória nesta versão, mas pode ser adicionada em melhoria futura."

**Ação:** 🟡 **IMPORTANTE** - Adicionar nota técnica

#### 7. Falta AC sobre Formatação de Média Diária

**Problema:** AC 2.8.8 menciona "média de pedidos por dia", mas não especifica precisão (inteiro ou decimal). Exemplo: 15 pedidos em 7 dias = 2.14 pedidos/dia ou 2 pedidos/dia?

**Impacto:** Pode causar inconsistência na formatação.

**Recomendação:**
- Adicionar AC 2.8.24: "A média diária de pedidos deve ser exibida com 1 casa decimal (ex: '2.1 pedidos/dia'). Se média for exata, pode ser exibida sem decimais (ex: '2 pedidos/dia')."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 8. Falta AC sobre Estado Vazio Específico para Produtos Mais Vendidos

**Problema:** AC 2.8.14 menciona "estado vazio quando não há pedidos no período", mas não especifica comportamento quando há pedidos mas nenhum produto foi vendido (caso edge improvável).

**Impacto:** Lista pode ficar vazia sem mensagem explicativa.

**Recomendação:**
- Adicionar AC 2.8.25: "Se não houver produtos vendidos no período (caso edge), a seção 'Produtos Mais Vendidos' deve exibir mensagem 'Nenhum produto vendido neste período.' ao invés de lista vazia."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 9. Falta AC sobre Acessibilidade do Dashboard

**Problema:** ACs não mencionam acessibilidade (labels, ARIA, navegação por teclado) para cards e lista de produtos.

**Impacto:** Dashboard pode não ser acessível para usuários com deficiências.

**Recomendação:**
- Adicionar AC 2.8.26: "O dashboard deve ser acessível via teclado (Tab para navegar entre cards e lista, Enter para ativar seletor de período) e ter labels apropriados para screen readers (ex: 'Card Total de Pedidos: 50 pedidos')."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar acessibilidade

#### 10. Falta AC sobre Loading Separado para Cards e Lista

**Problema:** AC 2.8.14 menciona "skeleton para cards e lista", mas não especifica se loading deve ser simultâneo ou separado. Se métricas carregarem rápido mas produtos demorarem, o que acontece?

**Impacto:** UX pode ficar confusa se uma parte carrega e outra não.

**Recomendação:**
- Adicionar AC 2.8.27: "Cards de métricas e lista de produtos mais vendidos devem ter loading independente. Se métricas carregarem primeiro, exibir cards e manter skeleton na lista até produtos carregarem. Se produtos carregarem primeiro, exibir lista e manter skeleton nos cards até métricas carregarem."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar UX

#### 11. Falta AC sobre Tratamento de Empate na Ordenação

**Problema:** AC 2.8.13 menciona "em caso de empate, ordenar por receita total", mas não especifica comportamento se ambos (quantidade e receita) forem iguais.

**Impacto:** Ordem pode ser inconsistente entre requisições.

**Recomendação:**
- Adicionar nota técnica: "Em caso de empate completo (quantidade e receita iguais), ordenar por nome do produto (alfabética) para garantir ordem consistente."

**Ação:** 🟡 **IMPORTANTE** - Adicionar nota técnica

#### 12. Falta AC sobre Cálculo de Receita Considerando Descontos

**Problema:** AC 2.8.1 menciona "receita total", mas não especifica se deve considerar descontos de cupons. A tabela `orders` tem campo `total` (já com desconto aplicado) e `subtotal` (sem desconto).

**Impacto:** Receita pode estar incorreta se usar campo errado.

**Recomendação:**
- Clarificar AC 2.8.1: "Receita total deve usar o campo `total` da tabela `orders` (já com desconto de cupom aplicado), não `subtotal`."

**Ação:** 🟡 **IMPORTANTE** - Clarificar antes de aprovar

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs bem detalhados e testáveis
- [ ] Casos de erro/vazio definidos (faltando produtos deletados, estado vazio específico)
- [ ] Edge cases considerados (faltando empate completo, produtos sem vendas)
- [ ] Definição de períodos especificada (faltando timezone, inclusão de hoje)

### Requisitos Técnicos
- [x] TypeScript mencionado como obrigatório
- [x] Índices de performance especificados
- [ ] Agregação SQL vs in-memory especificada (faltando AC)
- [ ] Validação de parâmetros especificada (faltando limit)
- [ ] Timezone especificado (faltando AC)

### Segurança
- [x] RLS já configurado (Stories anteriores)
- [x] Proteção de rotas especificada
- [ ] Validação de parâmetros especificada (faltando limit)

### Testabilidade
- [x] Testes unitários definidos
- [x] Testes de integração definidos
- [x] Casos de teste específicos detalhados
- [ ] Casos de teste para edge cases (faltando produtos deletados, empate)

### Documentação
- [x] Dev Notes completos
- [x] Referências corretas
- [x] Exemplos de código bem documentados
- [ ] Agregação SQL bem especificada (faltando exemplo GROUP BY)
- [ ] Timezone bem especificado (faltando AC)

---

## ✅ Ações Recomendadas Antes de Aprovação

### Prioridade Alta (Bloqueadores)
1. 🔴 **Especificar agregação SQL vs in-memory** - AC 2.8.20
2. 🔴 **Clarificar definição de período "Últimos 7 Dias"** - AC 2.8.1 e Dev Notes
3. 🔴 **Adicionar AC para timezone** - AC 2.8.21
4. 🔴 **Adicionar AC para produtos deletados** - AC 2.8.22
5. 🔴 **Adicionar AC para validação de limit** - AC 2.8.23

### Prioridade Média (Importante)
6. 🟡 **Clarificar receita (total vs subtotal)** - AC 2.8.1
7. 🟡 **Adicionar AC para formatação de média diária** - AC 2.8.24
8. 🟡 **Adicionar AC para estado vazio de produtos** - AC 2.8.25
9. 🟡 **Adicionar AC para acessibilidade** - AC 2.8.26
10. 🟡 **Adicionar AC para loading independente** - AC 2.8.27
11. 🟡 **Adicionar nota sobre empate completo** - Nota técnica

### Prioridade Baixa (Sugestões)
12. 🟢 **Adicionar nota sobre comparação com período anterior** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Corrigir ACs existentes:

```
AC 2.8.1 (CLARIFICADO): Deve existir método `static Order.getMetrics(period: 'today' | 'last7days')` que retorna métricas agregadas: total de pedidos, receita total (usando campo `total` da tabela `orders`, já com desconto aplicado), média de pedidos por dia (quando período = 'last7days'). **Nota:** Período 'last7days' deve incluir os últimos 7 dias completos incluindo hoje (hoje + 6 dias anteriores). Cálculo deve considerar timezone UTC para consistência.

AC 2.8.2 (CLARIFICADO): Deve existir método `static Order.getTopProducts(period: 'today' | 'last7days', limit: number)` que retorna lista de produtos mais vendidos com: nome do produto, quantidade total vendida, receita total do produto. **Nota:** Apenas produtos ativos (não deletados, `deleted_at IS NULL`) devem ser incluídos na lista.
```

### 2. Adicionar novos ACs:

```
AC 2.8.20: A agregação de produtos mais vendidos deve ser feita via SQL usando GROUP BY na query do Supabase para garantir performance adequada, não em memória após buscar todos os order_items.

AC 2.8.21: O cálculo de períodos deve considerar timezone do servidor (UTC) para consistência. Período 'today' deve ser calculado como: início do dia atual em UTC (00:00:00 UTC) até agora em UTC. Período 'last7days' deve ser calculado como: 7 dias atrás em UTC até agora em UTC.

AC 2.8.22: A lista de produtos mais vendidos deve incluir apenas produtos ativos (não deletados). Se produto foi soft deleted (`deleted_at IS NOT NULL`), não deve aparecer na lista, mesmo que tenha vendas históricas no período.

AC 2.8.23: O parâmetro `limit` deve ser validado: mínimo 1, máximo 50. Se valor inválido for passado, retornar erro de validação. Valor padrão deve ser 10 se não especificado.

AC 2.8.24: A média diária de pedidos deve ser exibida com 1 casa decimal (ex: '2.1 pedidos/dia'). Se média for exata, pode ser exibida sem decimais (ex: '2 pedidos/dia').

AC 2.8.25: Se não houver produtos vendidos no período (caso edge), a seção 'Produtos Mais Vendidos' deve exibir mensagem 'Nenhum produto vendido neste período.' ao invés de lista vazia.

AC 2.8.26: O dashboard deve ser acessível via teclado (Tab para navegar entre cards e lista, Enter para ativar seletor de período) e ter labels apropriados para screen readers (ex: 'Card Total de Pedidos: 50 pedidos').

AC 2.8.27: Cards de métricas e lista de produtos mais vendidos devem ter loading independente. Se métricas carregarem primeiro, exibir cards e manter skeleton na lista até produtos carregarem. Se produtos carregarem primeiro, exibir lista e manter skeleton nos cards até métricas carregarem.
```

### 3. Atualizar Task 1:

```
- [ ] Subtask 1.3: Implementar cálculo de período: "today" = pedidos de hoje em UTC (00:00 UTC até agora UTC), "last7days" = últimos 7 dias incluindo hoje em UTC (7 dias atrás UTC até agora UTC) (AC 2.8.1, 2.8.21)
- [ ] Subtask 1.7: Implementar agregação de `order_items` por `product_id` usando SQL GROUP BY com SUM de `quantity` e SUM de `total_price`, filtrando apenas produtos ativos (`deleted_at IS NULL`) (AC 2.8.3, 2.8.20, 2.8.22)
- [ ] Subtask 1.9: Validar parâmetro `limit` (mínimo 1, máximo 50, padrão 10) (AC 2.8.23)
```

### 4. Atualizar Task 2:

```
- [ ] Subtask 2.4: Validar parâmetros de período (apenas 'today' ou 'last7days') e limit (1-50, padrão 10) (AC 2.8.23)
```

### 5. Atualizar Task 3:

```
- [ ] Subtask 3.7: Estados de loading independentes (skeleton para cards e lista separadamente) (AC 2.8.27)
- [ ] Subtask 3.8: Estado vazio quando não há pedidos no período e estado vazio específico para produtos (AC 2.8.25)
- [ ] Subtask 3.11: Implementar acessibilidade do dashboard (teclado, screen readers) (AC 2.8.26)
```

### 6. Atualizar Task 4:

```
- [ ] Subtask 4.7: Formatar média diária com 1 casa decimal (AC 2.8.24)
```

### 7. Adicionar seção em Dev Notes > Agregação SQL:

```
**Agregação via SQL GROUP BY:**

A agregação deve ser feita diretamente na query SQL para garantir performance:

```sql
SELECT 
  oi.product_id,
  MAX(oi.product_name) as product_name,
  SUM(oi.quantity) as total_quantity,
  SUM(oi.total_price) as total_revenue
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.created_at >= :start_date
  AND o.created_at <= :end_date
  AND p.deleted_at IS NULL
GROUP BY oi.product_id
ORDER BY total_quantity DESC, total_revenue DESC
LIMIT :limit
```

**Timezone:**

Todos os cálculos de período devem usar UTC:
- Período "today": início do dia atual em UTC até agora em UTC
- Período "last7days": 7 dias atrás em UTC até agora em UTC

**Produtos Deletados:**

Apenas produtos ativos (`deleted_at IS NULL`) devem aparecer na lista de produtos mais vendidos, mesmo que tenham vendas históricas no período.

**Empate na Ordenação:**

Em caso de empate completo (quantidade e receita iguais), ordenar por nome do produto (alfabética) para garantir ordem consistente.
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem boa base e demonstra aprendizado das stories anteriores. No entanto, possui 5 bloqueadores críticos que impedem desenvolvimento completo:
1. Falta especificação de agregação SQL vs in-memory (performance)
2. Definição de período "Últimos 7 Dias" ambígua
3. Falta especificação de timezone
4. Falta tratamento de produtos deletados
5. Falta validação de parâmetro limit

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Aprovar novos ACs propostos (2.8.20-2.8.27)
   - Decidir sobre definição de período "Últimos 7 Dias" (incluir hoje ou não)

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra boa qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre performance (agregação SQL), definição de períodos (timezone, inclusão de hoje) e casos edge (produtos deletados, validação de parâmetros), não sobre problemas estruturais fundamentais. A story mostra aprendizado das Stories anteriores ao incorporar padrões estabelecidos (timeout, toast, responsividade, loading states).

**Comparação com Stories Anteriores:**
- ✅ Similar: Mesmo padrão de expandir ACs do PRD com melhorias
- ✅ Melhor: Estados de loading e erro bem especificados desde o início
- ✅ Melhor: Exemplos de código bem documentados
- ⚠️ Área de melhoria: Necessita mais atenção a performance (agregação SQL) e definição de períodos (timezone)

**Destaques:**
- Excelente trabalho em especificar cards de métricas e lista de produtos
- Boa separação de responsabilidades nas tasks
- Aprendizados das Stories anteriores bem incorporados
- Boa cobertura de casos de erro e validações

**Áreas de Melhoria:**
- Necessita mais atenção a performance (agregação SQL vs in-memory)
- Necessita mais casos edge (produtos deletados, empate completo, validação de parâmetros)
- Necessita mais atenção a definição de períodos (timezone, inclusão de hoje)

**Tempo estimado para correções:** 2-3 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


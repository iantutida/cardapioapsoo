# PO Review: Story 3.2 - Gerenciar Status do Pedido (Desktop)

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 3.2 está bem estruturada e demonstra boa compreensão dos requisitos de interface Kanban para gerenciamento de pedidos. A story expande corretamente os ACs do PRD com melhorias importantes e integração bem documentada com Stories anteriores. No entanto, **requer algumas correções** relacionadas a detecção de conflitos, atualização otimista, filtros de subscription, integração com Story 3.1 e acessibilidade antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 8.0/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks bem detalhadas e acionáveis
- ✅ Dev Notes completos com exemplos de código TypeScript
- ✅ Integração com Stories anteriores muito bem documentada

### 2. Alinhamento com Requisitos Funcionais
- ✅ ACs bem detalhados e testáveis
- ✅ Story cobre o escopo completo da funcionalidade
- ✅ Integração com Story 3.1 e 2.6 bem especificada
- ✅ Interface Kanban e botões alternativos bem definidos

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de TypeScript e POO
- ✅ Referências às Stories anteriores mostram continuidade
- ✅ Supabase Realtime bem especificado
- ✅ API existente bem documentada

### 4. Qualidade das Tasks
- ✅ Tasks bem organizadas e sequenciais
- ✅ Subtasks granulares e acionáveis
- ✅ Mapeamento correto de ACs para Tasks
- ✅ Boa separação de responsabilidades

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. Detecção de Conflitos Não Especificada

**Problema:** AC 3.2.15 menciona "exibir notificação visual discreta informando conflito e atualizar card para status mais recente", mas Dev Notes (linhas 262-265) apenas sugerem comparar `updated_at` sem especificar algoritmo completo ou comportamento quando conflito é detectado durante atualização otimista.

**Impacto:** Conflitos podem ser resolvidos incorretamente ou causar inconsistências na UI.

**Recomendação:**
- Expandir AC 3.2.15: "Se pedido for atualizado por outro usuário simultaneamente, o sistema deve detectar conflito comparando `updated_at` do pedido local com `updated_at` recebido via Realtime. Se Realtime `updated_at` > local `updated_at` E status mudou, atualizar card para status mais recente e exibir notificação discreta: 'Pedido #XXXX foi atualizado por outro usuário'. Se conflito ocorrer durante atualização otimista (card já foi movido localmente), reverter card para status anterior e exibir erro: 'Pedido foi atualizado por outro usuário. Atualizando...'."

**Ação:** 🔴 **CRÍTICO** - Expandir antes de aprovar

#### 2. Atualização Otimista Não Trata Conflitos Simultâneos

**Problema:** AC 3.2.10 diz "atualizar status imediatamente (atualização otimista) e fazer chamada à API. Se API falhar, reverter card", mas não especifica comportamento se API retornar erro de conflito (ex: status já foi alterado por outro usuário enquanto card estava sendo arrastado).

**Impacto:** Card pode ficar em estado inconsistente se conflito ocorrer durante drag-and-drop.

**Recomendação:**
- Expandir AC 3.2.10: "Ao soltar card em coluna válida, deve atualizar status imediatamente (atualização otimista) e fazer chamada à API. Se API retornar erro de conflito (status já alterado por outro usuário), reverter card para coluna original, atualizar para status mais recente recebido via Realtime, e exibir notificação discreta informando conflito. Se API falhar por outros motivos (rede, timeout), reverter card e exibir erro genérico."

**Ação:** 🔴 **CRÍTICO** - Expandir antes de aprovar

#### 3. Filtro de Subscription Realtime Ambíguo

**Problema:** AC 3.2.16 diz "filtrar apenas pedidos com status 'Recebido', 'Em Preparo' ou 'Pronto' criados nas últimas 24 horas", mas Supabase Realtime não suporta filtro combinado de status E data diretamente na subscription. Filtro por data deve ser aplicado no handler ou via query separada.

**Impacto:** Subscription pode receber eventos de pedidos antigos, causando sobrecarga ou cards aparecendo incorretamente.

**Recomendação:**
- Clarificar AC 3.2.16: "A subscription Realtime deve filtrar apenas pedidos com status 'Recebido', 'Em Preparo' ou 'Pronto'. No handler de eventos UPDATE, verificar se pedido foi criado nas últimas 24 horas (`created_at >= Date.now() - 24h`) antes de processar. Se pedido for mais antigo, ignorar evento silenciosamente. Ao carregar aplicativo, buscar apenas pedidos das últimas 24 horas para popular colunas iniciais."

**Ação:** 🔴 **CRÍTICO** - Clarificar antes de aprovar

#### 4. Integração com Story 3.1 Não Especificada

**Problema:** Dev Notes (linhas 288-296) mencionam "substituir ou integrar fila de pedidos 'Recebidos' com coluna Kanban", mas não especifica qual abordagem deve ser usada. Fila de Story 3.1 deve ser removida? Mantida? Integrada?

**Impacto:** Desenvolvedor pode implementar de forma diferente do esperado, causando duplicação ou perda de funcionalidade.

**Recomendação:**
- Adicionar AC 3.2.23: "A interface Kanban deve substituir a fila de pedidos 'Recebidos' da Story 3.1. A coluna 'Recebidos' do Kanban deve funcionar como a fila anterior, mas integrada ao sistema de colunas. Notificações de novos pedidos (Story 3.1) devem continuar funcionando, mas pedido deve aparecer na coluna 'Recebidos' do Kanban ao invés de fila separada."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 5. Falta AC sobre Estados de Loading e Vazio por Coluna

**Problema:** ACs não especificam comportamento quando coluna está vazia ou quando está carregando pedidos. Cada coluna deve ter estado vazio próprio?

**Impacto:** UX pode ficar confusa - usuário pode não saber se coluna está vazia ou carregando.

**Recomendação:**
- Adicionar AC 3.2.24: "Cada coluna do Kanban deve ter estados independentes: loading (skeleton cards enquanto carrega), vazio (mensagem 'Nenhum pedido' quando coluna está vazia), e erro (mensagem de erro com retry se falhar ao carregar pedidos da coluna). Estados devem ser visuais e informativos."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 6. Falta AC sobre Acessibilidade do Drag-and-Drop

**Problema:** AC 3.2.12 menciona acessibilidade dos botões, mas não especifica acessibilidade do drag-and-drop (teclado, screen readers). Drag-and-drop não é acessível por padrão.

**Impacto:** Usuários com deficiências podem não conseguir usar drag-and-drop.

**Recomendação:**
- Adicionar AC 3.2.25: "O drag-and-drop deve ser acessível via teclado: usar setas para navegar entre cards, Enter para iniciar arraste, setas para mover entre colunas, Enter para confirmar drop, Escape para cancelar. Screen readers devem anunciar ações ('Arrastando pedido #1234', 'Coluna de destino: Em Preparo'). Botões de ação devem ser sempre acessíveis como alternativa ao drag-and-drop."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar acessibilidade

#### 7. Falta AC sobre Feedback Visual Durante Atualização

**Problema:** AC 3.2.13 menciona "loading no card", mas não especifica tipo de feedback (spinner? desabilitar? card semi-transparente?). AC 3.2.9 menciona feedback durante arraste, mas não durante atualização via botão.

**Impacto:** Feedback pode ser inconsistente entre drag-and-drop e botões.

**Recomendação:**
- Expandir AC 3.2.13: "Ao clicar em botão de ação, deve exibir loading no card (spinner ou card semi-transparente com overlay de loading) e desabilitar botão durante atualização. Card deve permanecer na coluna original até atualização completar. Após sucesso, card deve mover automaticamente para coluna correta com animação suave."

**Ação:** 🟡 **IMPORTANTE** - Expandir antes de aprovar

#### 8. Falta AC sobre Ordenação de Cards Dentro de Coluna

**Problema:** AC 3.2.7 menciona cards dentro de coluna, mas não especifica ordem (mais recentes primeiro? por valor? por cliente?).

**Impacto:** Cards podem aparecer em ordem aleatória ou inconsistente.

**Recomendação:**
- Adicionar AC 3.2.26: "Cards dentro de cada coluna devem ser ordenados por data de criação (mais recentes primeiro). Em caso de empate, ordenar por valor total (maior primeiro). Ordenação deve ser mantida quando novos pedidos chegam via Realtime."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 9. Falta AC sobre Limite de Pedidos por Coluna

**Problema:** AC 3.2.6 menciona "scroll vertical se houver muitos pedidos", mas não especifica se há limite máximo de pedidos exibidos por coluna ou se todos são carregados.

**Impacto:** Performance pode ser ruim se houver centenas de pedidos em uma coluna.

**Recomendação:**
- Adicionar nota técnica: "Cada coluna deve exibir até 50 pedidos por vez. Se houver mais pedidos, implementar scroll virtual ou paginação. Pedidos mais antigos (mais de 24 horas) devem ser removidos automaticamente das colunas."

**Ação:** 🟡 **IMPORTANTE** - Adicionar nota técnica

#### 10. Falta AC sobre Persistência de Estado do Kanban

**Problema:** Não especifica se estado do Kanban (colunas, posição de cards) deve persistir quando aplicativo é fechado e reaberto.

**Impacto:** Usuário pode perder contexto visual ao reabrir aplicativo.

**Recomendação:**
- Adicionar nota técnica: "Estado do Kanban não precisa persistir entre sessões. Ao reabrir aplicativo, colunas devem ser recarregadas com pedidos atuais das últimas 24 horas. Posição de cards dentro de colunas deve seguir ordenação padrão (mais recentes primeiro)."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 11. Falta AC sobre Tratamento de Erro ao Carregar Detalhes

**Problema:** AC 3.2.19 menciona carregar detalhes, mas não especifica comportamento se API falhar ao buscar detalhes do pedido.

**Impacto:** Modal pode ficar em estado indefinido se detalhes não carregarem.

**Recomendação:**
- Adicionar AC 3.2.27: "Se busca de detalhes do pedido falhar ao abrir modal, exibir mensagem de erro dentro do modal ('Erro ao carregar detalhes. Tente novamente.') com botão de retry. Modal deve permanecer aberto para permitir retry. Se erro persistir após 3 tentativas, fechar modal e exibir notificação de erro."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 12. Falta AC sobre Formato de Cliente/Mesa no Card

**Problema:** AC 3.2.7 menciona "cliente/mesa", mas não especifica formato de exibição (ex: "João Silva" vs "Mesa 5" vs "João Silva - Mesa 5").

**Impacto:** Pode causar confusão - usuário pode não saber se é cliente ou mesa.

**Recomendação:**
- Clarificar AC 3.2.7: "Cards devem mostrar cliente/mesa formatado: se `order_type = 'Retirada'`, exibir 'Cliente: {nome}' ou 'Cliente: {telefone}' se nome não disponível. Se `order_type = 'Consumo no Local'`, exibir 'Mesa {número}'. Formato deve ser claro e legível."

**Ação:** 🟡 **IMPORTANTE** - Clarificar antes de aprovar

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs bem detalhados e testáveis
- [ ] Casos de erro/vazio definidos (faltando estados de coluna, erro ao carregar detalhes)
- [ ] Edge cases considerados (faltando conflitos durante otimista, múltiplas atualizações simultâneas)
- [ ] Comportamento de atualização otimista especificado (faltando tratamento de conflitos)

### Requisitos Técnicos
- [x] TypeScript mencionado como obrigatório
- [x] POO mencionado como obrigatório
- [x] Supabase Realtime bem especificado
- [ ] Filtro de subscription bem especificado (faltando clarificação de filtro combinado)
- [ ] Detecção de conflitos bem especificada (faltando algoritmo completo)

### Segurança
- [x] Service role key já especificada (Story 3.1)
- [x] API existente bem documentada
- [ ] Validação de transições bem especificada (backend já faz, mas frontend deve validar também?)

### Testabilidade
- [x] Testes manuais definidos
- [x] Casos de teste específicos detalhados
- [ ] Casos de teste para edge cases (faltando conflitos durante otimista, múltiplas atualizações)

### Documentação
- [x] Dev Notes completos
- [x] Referências corretas
- [x] Exemplos de código bem documentados
- [ ] Integração com Story 3.1 bem especificada (faltando AC)

---

## ✅ Ações Recomendadas Antes de Aprovação

### Prioridade Alta (Bloqueadores)
1. 🔴 **Expandir detecção de conflitos** - AC 3.2.15
2. 🔴 **Expandir atualização otimista com conflitos** - AC 3.2.10
3. 🔴 **Clarificar filtro de subscription** - AC 3.2.16
4. 🔴 **Especificar integração com Story 3.1** - AC 3.2.23
5. 🔴 **Adicionar AC para estados de coluna** - AC 3.2.24

### Prioridade Média (Importante)
6. 🟡 **Adicionar AC para acessibilidade do drag-and-drop** - AC 3.2.25
7. 🟡 **Expandir feedback visual durante atualização** - AC 3.2.13
8. 🟡 **Adicionar AC para ordenação de cards** - AC 3.2.26
9. 🟡 **Adicionar nota sobre limite de pedidos** - Nota técnica
10. 🟡 **Adicionar AC para erro ao carregar detalhes** - AC 3.2.27
11. 🟡 **Clarificar formato de cliente/mesa** - AC 3.2.7

### Prioridade Baixa (Sugestões)
12. 🟢 **Adicionar nota sobre persistência de estado** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Expandir ACs existentes:

```
AC 3.2.10 (EXPANDIDO): Ao soltar card em coluna válida, deve atualizar status imediatamente (atualização otimista) e fazer chamada à API. Se API retornar erro de conflito (status já alterado por outro usuário), reverter card para coluna original, atualizar para status mais recente recebido via Realtime, e exibir notificação discreta informando conflito. Se API falhar por outros motivos (rede, timeout), reverter card e exibir erro genérico com opção de retry.

AC 3.2.15 (EXPANDIDO): Se pedido for atualizado por outro usuário simultaneamente, o sistema deve detectar conflito comparando `updated_at` do pedido local com `updated_at` recebido via Realtime. Se Realtime `updated_at` > local `updated_at` E status mudou, atualizar card para status mais recente e exibir notificação discreta: 'Pedido #XXXX foi atualizado por outro usuário'. Se conflito ocorrer durante atualização otimista (card já foi movido localmente), reverter card para status anterior e exibir erro: 'Pedido foi atualizado por outro usuário. Atualizando...'.

AC 3.2.16 (CLARIFICADO): A subscription Realtime deve filtrar apenas pedidos com status 'Recebido', 'Em Preparo' ou 'Pronto'. No handler de eventos UPDATE, verificar se pedido foi criado nas últimas 24 horas (`created_at >= Date.now() - 24h`) antes de processar. Se pedido for mais antigo, ignorar evento silenciosamente. Ao carregar aplicativo, buscar apenas pedidos das últimas 24 horas para popular colunas iniciais.

AC 3.2.7 (CLARIFICADO): Cada pedido deve ser exibido como card arrastável dentro da coluna correspondente ao seu status atual. Cards devem mostrar: ID do pedido (últimos 8 caracteres), tipo de pedido (Retirada/Consumo no Local), cliente/mesa formatado (se Retirada: 'Cliente: {nome}' ou 'Cliente: {telefone}'; se Consumo no Local: 'Mesa {número}'), valor total formatado (R$ X.XXX,XX), e horário de recebimento formatado (HH:mm).

AC 3.2.13 (EXPANDIDO): Ao clicar em botão de ação, deve exibir loading no card (spinner ou card semi-transparente com overlay de loading) e desabilitar botão durante atualização. Card deve permanecer na coluna original até atualização completar. Após sucesso, card deve mover automaticamente para coluna correta com animação suave (fade-out da coluna original, fade-in na coluna destino).
```

### 2. Adicionar novos ACs:

```
AC 3.2.23: A interface Kanban deve substituir a fila de pedidos 'Recebidos' da Story 3.1. A coluna 'Recebidos' do Kanban deve funcionar como a fila anterior, mas integrada ao sistema de colunas. Notificações de novos pedidos (Story 3.1) devem continuar funcionando, mas pedido deve aparecer na coluna 'Recebidos' do Kanban ao invés de fila separada.

AC 3.2.24: Cada coluna do Kanban deve ter estados independentes: loading (skeleton cards enquanto carrega pedidos iniciais), vazio (mensagem 'Nenhum pedido em {status}' quando coluna está vazia), e erro (mensagem de erro com botão retry se falhar ao carregar pedidos da coluna). Estados devem ser visuais e informativos, não bloquear outras colunas.

AC 3.2.25: O drag-and-drop deve ser acessível via teclado: usar setas para navegar entre cards, Enter para iniciar arraste, setas esquerda/direita para mover entre colunas, Enter para confirmar drop, Escape para cancelar. Screen readers devem anunciar ações ('Arrastando pedido #1234', 'Coluna de destino: Em Preparo'). Botões de ação devem ser sempre acessíveis como alternativa ao drag-and-drop.

AC 3.2.26: Cards dentro de cada coluna devem ser ordenados por data de criação (mais recentes primeiro). Em caso de empate, ordenar por valor total (maior primeiro). Ordenação deve ser mantida quando novos pedidos chegam via Realtime ou quando status é alterado.

AC 3.2.27: Se busca de detalhes do pedido falhar ao abrir modal, exibir mensagem de erro dentro do modal ('Erro ao carregar detalhes. Tente novamente.') com botão de retry. Modal deve permanecer aberto para permitir retry. Se erro persistir após 3 tentativas, fechar modal e exibir notificação de erro.
```

### 3. Atualizar Task 2:

```
- [ ] Subtask 2.9: Implementar estados independentes por coluna (loading, vazio, erro) (AC 3.2.24)
- [ ] Subtask 2.10: Implementar ordenação de cards dentro de coluna (mais recentes primeiro, depois por valor) (AC 3.2.26)
```

### 4. Atualizar Task 3:

```
- [ ] Subtask 3.6: Implementar acessibilidade do drag-and-drop via teclado e screen readers (AC 3.2.25)
```

### 5. Atualizar Task 4:

```
- [ ] Subtask 4.5: Implementar filtro de data no handler de eventos UPDATE (verificar created_at >= 24h atrás) (AC 3.2.16)
- [ ] Subtask 4.6: Implementar detecção completa de conflitos com algoritmo de comparação de updated_at (AC 3.2.15)
```

### 6. Atualizar Task 5:

```
- [ ] Subtask 5.7: Implementar tratamento de erro ao carregar detalhes com retry (AC 3.2.27)
```

### 7. Adicionar Task 7: Integração com Story 3.1

```
- [ ] Task 7: Integração com Story 3.1
  - [ ] Subtask 7.1: Substituir fila de pedidos 'Recebidos' pela coluna Kanban (AC 3.2.23)
  - [ ] Subtask 7.2: Manter notificações de novos pedidos funcionando (Story 3.1)
  - [ ] Subtask 7.3: Integrar notificações com coluna 'Recebidos' do Kanban
```

### 8. Adicionar seção em Dev Notes > Detecção de Conflitos:

```
**Algoritmo de Detecção de Conflitos:**

```typescript
function handleStatusUpdate(realtimeOrder: Order, localOrder: Order | null) {
  if (!localOrder) {
    // Pedido novo, adicionar à coluna correta
    addOrderToColumn(realtimeOrder)
    return
  }
  
  const realtimeTime = new Date(realtimeOrder.updated_at).getTime()
  const localTime = new Date(localOrder.updated_at).getTime()
  
  if (realtimeTime > localTime && realtimeOrder.status !== localOrder.status) {
    // Conflito detectado: atualização externa mais recente
    if (isOptimisticUpdateInProgress(localOrder.id)) {
      // Reverter atualização otimista
      revertOptimisticUpdate(localOrder.id)
      showConflictNotification('Pedido foi atualizado por outro usuário. Atualizando...')
    } else {
      // Apenas atualizar card
      showConflictNotification('Pedido #' + getOrderIdShort(realtimeOrder.id) + ' foi atualizado por outro usuário')
    }
    
    // Atualizar card para status mais recente
    moveCardToColumn(realtimeOrder.id, realtimeOrder.status)
  }
}
```

**Atualização Otimista com Tratamento de Conflito:**

```typescript
async function updateStatusOptimistic(orderId: string, newStatus: string) {
  // 1. Mover card imediatamente (otimista)
  const card = moveCardToColumnOptimistic(orderId, newStatus)
  markOptimisticUpdateInProgress(orderId)
  
  try {
    // 2. Chamar API
    const result = await Order.updateStatus(orderId, newStatus)
    
    // 3. Se sucesso, confirmar movimento
    confirmOptimisticUpdate(orderId)
    markOptimisticUpdateComplete(orderId)
    
  } catch (error) {
    if (error.code === 'CONFLICT' || error.message.includes('status already changed')) {
      // 4a. Conflito: reverter e atualizar para status mais recente
      revertOptimisticUpdate(orderId)
      markOptimisticUpdateComplete(orderId)
      // Status será atualizado via Realtime subscription
      showConflictNotification('Pedido foi atualizado por outro usuário. Atualizando...')
    } else {
      // 4b. Outro erro: reverter e mostrar erro genérico
      revertOptimisticUpdate(orderId)
      markOptimisticUpdateComplete(orderId)
      showErrorNotification('Erro ao atualizar status. Tente novamente.', { retry: () => updateStatusOptimistic(orderId, newStatus) })
    }
  }
}
```
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem boa base e demonstra aprendizado das stories anteriores. No entanto, possui 5 bloqueadores críticos que impedem desenvolvimento completo:
1. Detecção de conflitos não especificada completamente
2. Atualização otimista não trata conflitos simultâneos
3. Filtro de subscription ambíguo (status + data)
4. Integração com Story 3.1 não especificada
5. Estados de loading/vazio por coluna não especificados

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Aprovar novos ACs propostos (3.2.23-3.2.27)
   - Decidir sobre limite de pedidos por coluna (nota técnica ou AC)

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra boa qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre tratamento de conflitos, atualização otimista, filtros de subscription e integração com Story 3.1, não sobre problemas estruturais fundamentais. A story mostra aprendizado das Stories anteriores ao incorporar padrões estabelecidos (timeout, logs estruturados, TypeScript, POO, Realtime).

**Comparação com Stories Anteriores:**
- ✅ Similar: Mesmo padrão de expandir ACs do PRD com melhorias
- ✅ Melhor: Integração com Stories anteriores muito bem documentada
- ✅ Melhor: Dev Notes completos com exemplos de código
- ⚠️ Área de melhoria: Necessita mais atenção a conflitos simultâneos e atualização otimista

**Destaques:**
- Excelente trabalho em especificar interface Kanban e drag-and-drop
- Boa separação de responsabilidades nas tasks
- Aprendizados das Stories anteriores bem incorporados
- Boa cobertura de casos de teste manuais

**Áreas de Melhoria:**
- Necessita mais atenção a tratamento de conflitos (algoritmo completo, durante otimista)
- Necessita mais casos edge (múltiplas atualizações simultâneas, filtro combinado)
- Necessita mais atenção a acessibilidade (drag-and-drop via teclado)

**Tempo estimado para correções:** 2-3 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


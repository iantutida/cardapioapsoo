# PO Review: Story 3.1 - Receber Notificações de Novos Pedidos

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 3.1 está bem estruturada e demonstra boa compreensão dos requisitos de aplicativo Electron com notificações em tempo real. A story expande corretamente os ACs do PRD com melhorias importantes. No entanto, **requer algumas correções** relacionadas a segurança (RLS e autenticação), tratamento de erros (reconexão, retry), casos edge (app minimizado, notificações duplicadas) e configurações antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 7.5/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks bem detalhadas e acionáveis
- ✅ Dev Notes completos com exemplos de código TypeScript
- ✅ Estrutura de projeto Electron bem definida

### 2. Alinhamento com Requisitos Funcionais
- ✅ ACs bem detalhados e testáveis
- ✅ Story cobre o escopo completo da funcionalidade
- ✅ Integração com Stories anteriores bem documentada
- ✅ Notificações visuais e sonoras bem especificadas

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de TypeScript e POO
- ✅ Referências às Stories anteriores mostram continuidade
- ✅ Supabase Realtime bem especificado
- ✅ Timeout e logs estruturados bem definidos

### 4. Qualidade das Tasks
- ✅ Tasks bem organizadas e sequenciais
- ✅ Subtasks granulares e acionáveis
- ✅ Mapeamento correto de ACs para Tasks
- ✅ Boa separação de responsabilidades (main/renderer/preload)

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. RLS e Autenticação Não Especificados

**Problema:** AC 3.1.20 menciona usar "anon key se RLS permitir leitura pública" ou "conta de serviço", mas não especifica qual política RLS deve existir ou como garantir acesso seguro. Stories 2.6/2.7 configuraram RLS apenas para admins autenticados, não para leitura pública.

**Impacto:** Aplicativo Electron pode não conseguir ler pedidos se RLS bloquear leitura pública. Risco de segurança se usar anon key sem RLS adequado.

**Recomendação:**
- Adicionar AC 3.1.21: "Deve existir política RLS específica para aplicativo Electron permitindo leitura de pedidos com `status = 'Recebido'`. A política deve usar autenticação via service role key ou token específico do Electron. Se usar anon key, política deve ser: `CREATE POLICY electron_read_received_orders ON orders FOR SELECT USING (status = 'Recebido');` apenas se segurança permitir."
- Ou alternativamente: "O aplicativo Electron deve usar service role key (não anon key) para garantir acesso completo aos pedidos. Service role key deve ser armazenada de forma segura (criptografada) no arquivo de configuração."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 2. Estratégia de Reconexão Não Especificada

**Problema:** AC 3.1.4 menciona "reconexão automática" e Dev Notes mostram `setTimeout(() => reconnect(), 5000)`, mas não especifica estratégia de retry (exponential backoff, limite máximo de tentativas, comportamento após múltiplas falhas).

**Impacto:** Aplicativo pode tentar reconectar infinitamente ou muito rapidamente, causando problemas de performance ou spam de conexões.

**Recomendação:**
- Adicionar AC 3.1.22: "A reconexão automática deve usar exponential backoff: primeira tentativa após 5 segundos, segunda após 10 segundos, terceira após 20 segundos, máximo de 60 segundos entre tentativas. Após 10 tentativas falhadas consecutivas, exibir notificação visual permanente pedindo intervenção manual. Indicador de status deve mostrar 'Tentando reconectar... (X tentativas)'."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 3. Verificação de "Não Perturbe" Não Implementável

**Problema:** AC 3.1.12 diz "respeitar estado de 'Não Perturbe' do sistema operacional", mas Dev Notes (linha 239) admitem que não há API direta no Electron para verificar isso. A alternativa sugerida (verificar volume do sistema) não é equivalente.

**Impacto:** AC não pode ser implementado como especificado. Desenvolvedor pode implementar solução parcial ou ignorar completamente.

**Recomendação:**
- Clarificar AC 3.1.12: "O aplicativo deve respeitar configuração interna de 'Som Desabilitado' (se usuário desabilitar som nas configurações do app). Para modo 'Não Perturbe' do sistema operacional, verificar volume do sistema: se volume = 0 ou sistema está silencioso, não reproduzir som. **Nota:** Verificação completa de 'Não Perturbe' não é possível via Electron APIs, mas verificação de volume do sistema é suficiente para maioria dos casos."

**Ação:** 🔴 **CRÍTICO** - Clarificar antes de aprovar

#### 4. Falta AC sobre Notificações quando App está Minimizado

**Problema:** Manual Test Steps (linha 364) mencionam "criar pedido quando aplicativo está minimizado → verificar notificação aparece ao restaurar", mas não há AC especificando esse comportamento.

**Impacto:** Comportamento pode ser inconsistente - notificação pode não aparecer ou aparecer incorretamente quando app está minimizado.

**Recomendação:**
- Adicionar AC 3.1.23: "Quando um novo pedido for recebido enquanto aplicativo está minimizado ou em segundo plano, a notificação visual deve aparecer imediatamente ao restaurar o aplicativo. O som deve ser reproduzido mesmo quando app está em segundo plano (se som estiver habilitado). Se sistema operacional suportar, exibir notificação nativa do sistema quando app está minimizado."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 5. Falta AC sobre Limite de Notificações Empilhadas

**Problema:** AC 3.1.8 diz "notificações devem empilhar verticalmente", mas não especifica limite máximo. Se 100 pedidos chegarem simultaneamente, todas as notificações devem aparecer?

**Impacto:** Interface pode ficar sobrecarregada com muitas notificações, causando problemas de performance e UX ruim.

**Recomendação:**
- Adicionar AC 3.1.24: "O sistema de notificações deve suportar máximo de 5 notificações visuais simultâneas. Se mais de 5 pedidos chegarem rapidamente, exibir apenas as 5 mais recentes e adicionar badge indicando '+X pedidos adicionais' na última notificação. Notificações antigas devem ser removidas automaticamente (FIFO) quando limite for atingido."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 6. Falta AC sobre Tratamento de Pedidos Duplicados

**Problema:** Não há AC especificando comportamento se mesmo pedido for recebido duas vezes (ex: evento INSERT duplicado, reconexão após falha).

**Impacto:** Usuário pode receber múltiplas notificações para mesmo pedido.

**Recomendação:**
- Adicionar AC 3.1.25: "O aplicativo deve manter cache de IDs de pedidos já notificados (últimos 100 pedidos ou últimos 5 minutos). Se pedido com mesmo ID já foi notificado, não exibir nova notificação visual/sonora, apenas atualizar fila se necessário."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 7. Falta AC sobre Configuração de Som (Habilitar/Desabilitar)

**Problema:** AC 3.1.11 menciona "volume configurável", mas não especifica se usuário pode desabilitar som completamente.

**Impacto:** Usuário pode querer desabilitar som mas não ter opção.

**Recomendação:**
- Adicionar AC 3.1.26: "O aplicativo deve ter configuração para habilitar/desabilitar notificações sonoras completamente (toggle 'Som de Notificação' nas configurações). Se desabilitado, apenas notificação visual deve aparecer."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 8. Falta AC sobre Persistência de Pedidos Não Vistos

**Problema:** AC 3.1.16 diz "buscar pedidos das últimas 24 horas", mas não especifica comportamento se usuário fechar aplicativo e reabrir. Pedidos não vistos devem persistir?

**Impacto:** Usuário pode perder pedidos se fechar app antes de ver notificações.

**Recomendação:**
- Adicionar nota técnica: "Pedidos das últimas 24 horas são carregados ao iniciar aplicativo. Se usuário fechar e reabrir app, pedidos ainda com `status = 'Recebido'` aparecerão na fila, mas notificações não serão reexibidas (já foram notificados anteriormente)."

**Ação:** 🟡 **IMPORTANTE** - Adicionar nota técnica

#### 9. Falta AC sobre Acessibilidade das Notificações

**Problema:** ACs não mencionam acessibilidade (labels, ARIA, navegação por teclado) para notificações e fila de pedidos.

**Impacto:** Aplicativo pode não ser acessível para usuários com deficiências.

**Recomendação:**
- Adicionar AC 3.1.27: "As notificações visuais e fila de pedidos devem ser acessíveis via teclado (Tab para navegar, Enter para ativar botão 'Ver Detalhes', Escape para fechar notificação) e ter labels apropriados para screen readers (ex: 'Novo pedido recebido: Pedido #1234, Retirada, R$ 50,00')."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar acessibilidade

#### 10. Falta AC sobre Tratamento de Erro ao Carregar Fila Inicial

**Problema:** AC 3.1.16 menciona "buscar pedidos ao iniciar", mas não especifica comportamento se busca falhar (erro de rede, timeout, RLS).

**Impacto:** Aplicativo pode ficar em estado indefinido se busca inicial falhar.

**Recomendação:**
- Adicionar AC 3.1.28: "Se busca inicial de pedidos falhar ao iniciar aplicativo, exibir mensagem de erro na fila ('Erro ao carregar pedidos. Clique para tentar novamente.') e permitir retry manual. Aplicativo deve continuar funcionando (subscription Realtime deve funcionar mesmo se busca inicial falhar)."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

#### 11. Falta AC sobre Formato de ID do Pedido

**Problema:** AC 3.1.6 e 3.1.14 mencionam "ID do pedido (ou últimos 4 dígitos)", mas não especificam qual formato usar ou quando usar cada um.

**Impacto:** Pode causar inconsistência - alguns lugares mostram ID completo, outros últimos 4 dígitos.

**Recomendação:**
- Clarificar AC 3.1.6 e 3.1.14: "ID do pedido deve ser exibido como últimos 8 caracteres do UUID (ex: 'a1b2c3d4') para melhor legibilidade. Em notificações, pode usar apenas últimos 4 caracteres se espaço for limitado."

**Ação:** 🟡 **IMPORTANTE** - Clarificar antes de aprovar

#### 12. Falta AC sobre Botão "Ver Detalhes"

**Problema:** AC 3.1.6 menciona botão "Ver Detalhes", mas não especifica o que acontece ao clicar (abrir modal? navegar para página?).

**Impacto:** Funcionalidade pode ficar incompleta ou inconsistente.

**Recomendação:**
- Adicionar AC 3.1.29: "Ao clicar em 'Ver Detalhes' na notificação ou em pedido na fila, deve abrir modal ou seção expandida mostrando detalhes completos do pedido: itens, opcionais, observações, cliente/mesa, resumo financeiro. **Nota:** Detalhes completos serão implementados na Story 3.2, mas estrutura básica deve estar pronta nesta story."

**Ação:** 🟡 **IMPORTANTE** - Adicionar antes de aprovar

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs bem detalhados e testáveis
- [ ] Casos de erro/vazio definidos (faltando erro ao carregar fila, reconexão após múltiplas falhas)
- [ ] Edge cases considerados (faltando app minimizado, pedidos duplicados, limite de notificações)
- [ ] Comportamento de notificações especificado (faltando quando app minimizado)

### Requisitos Técnicos
- [x] TypeScript mencionado como obrigatório
- [x] POO mencionado como obrigatório
- [x] Supabase Realtime bem especificado
- [ ] RLS e autenticação especificados (faltando AC)
- [ ] Estratégia de reconexão especificada (faltando AC)

### Segurança
- [ ] RLS e autenticação especificados (faltando AC)
- [ ] Armazenamento seguro de credenciais especificado (faltando AC)
- [ ] Service role vs anon key decidido (faltando AC)

### Testabilidade
- [x] Testes manuais definidos
- [x] Casos de teste específicos detalhados
- [ ] Casos de teste para edge cases (faltando app minimizado, pedidos duplicados)

### Documentação
- [x] Dev Notes completos
- [x] Referências corretas
- [x] Exemplos de código bem documentados
- [ ] Estratégia de reconexão bem especificada (faltando AC)

---

## ✅ Ações Recomendadas Antes de Aprovação

### Prioridade Alta (Bloqueadores)
1. 🔴 **Especificar RLS e autenticação** - AC 3.1.21
2. 🔴 **Especificar estratégia de reconexão** - AC 3.1.22
3. 🔴 **Clarificar verificação de 'Não Perturbe'** - AC 3.1.12
4. 🔴 **Adicionar AC para app minimizado** - AC 3.1.23
5. 🔴 **Adicionar AC para limite de notificações** - AC 3.1.24

### Prioridade Média (Importante)
6. 🟡 **Adicionar AC para pedidos duplicados** - AC 3.1.25
7. 🟡 **Adicionar AC para desabilitar som** - AC 3.1.26
8. 🟡 **Adicionar nota sobre persistência** - Nota técnica
9. 🟡 **Adicionar AC para acessibilidade** - AC 3.1.27
10. 🟡 **Adicionar AC para erro ao carregar fila** - AC 3.1.28
11. 🟡 **Clarificar formato de ID** - AC 3.1.6 e 3.1.14
12. 🟡 **Adicionar AC para botão 'Ver Detalhes'** - AC 3.1.29

### Prioridade Baixa (Sugestões)
13. 🟢 **Considerar notificações nativas do sistema** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Corrigir ACs existentes:

```
AC 3.1.12 (CLARIFICADO): O aplicativo deve respeitar configuração interna de 'Som Desabilitado' (se usuário desabilitar som nas configurações do app). Para modo 'Não Perturbe' do sistema operacional, verificar volume do sistema: se volume = 0 ou sistema está silencioso, não reproduzir som. **Nota:** Verificação completa de 'Não Perturbe' não é possível via Electron APIs, mas verificação de volume do sistema é suficiente para maioria dos casos.

AC 3.1.6 (CLARIFICADO): Quando um novo pedido for recebido, o aplicativo deve exibir uma notificação visual clara e destacada. A notificação deve incluir: ID do pedido (últimos 8 caracteres do UUID, ex: 'a1b2c3d4'), tipo de pedido (Retirada/Consumo no Local), valor total formatado (R$ X.XXX,XX), e botão "Ver Detalhes".

AC 3.1.14 (CLARIFICADO): Cada pedido na fila deve exibir: ID do pedido (últimos 8 caracteres do UUID), tipo de pedido (Retirada/Consumo no Local), cliente (nome ou mesa), valor total formatado, e data/hora de recebimento.
```

### 2. Adicionar novos ACs:

```
AC 3.1.21: Deve existir política RLS específica para aplicativo Electron permitindo leitura de pedidos com `status = 'Recebido'`. O aplicativo deve usar service role key (não anon key) para garantir acesso completo aos pedidos. Service role key deve ser armazenada de forma segura (criptografada ou em variável de ambiente) no arquivo de configuração. **Nota:** Se segurança permitir leitura pública, política pode ser: `CREATE POLICY electron_read_received_orders ON orders FOR SELECT USING (status = 'Recebido');`

AC 3.1.22: A reconexão automática deve usar exponential backoff: primeira tentativa após 5 segundos, segunda após 10 segundos, terceira após 20 segundos, máximo de 60 segundos entre tentativas. Após 10 tentativas falhadas consecutivas, exibir notificação visual permanente pedindo intervenção manual. Indicador de status deve mostrar 'Tentando reconectar... (X tentativas)'.

AC 3.1.23: Quando um novo pedido for recebido enquanto aplicativo está minimizado ou em segundo plano, a notificação visual deve aparecer imediatamente ao restaurar o aplicativo. O som deve ser reproduzido mesmo quando app está em segundo plano (se som estiver habilitado). Se sistema operacional suportar, exibir notificação nativa do sistema quando app está minimizado.

AC 3.1.24: O sistema de notificações deve suportar máximo de 5 notificações visuais simultâneas. Se mais de 5 pedidos chegarem rapidamente, exibir apenas as 5 mais recentes e adicionar badge indicando '+X pedidos adicionais' na última notificação. Notificações antigas devem ser removidas automaticamente (FIFO) quando limite for atingido.

AC 3.1.25: O aplicativo deve manter cache de IDs de pedidos já notificados (últimos 100 pedidos ou últimos 5 minutos). Se pedido com mesmo ID já foi notificado, não exibir nova notificação visual/sonora, apenas atualizar fila se necessário.

AC 3.1.26: O aplicativo deve ter configuração para habilitar/desabilitar notificações sonoras completamente (toggle 'Som de Notificação' nas configurações). Se desabilitado, apenas notificação visual deve aparecer.

AC 3.1.27: As notificações visuais e fila de pedidos devem ser acessíveis via teclado (Tab para navegar, Enter para ativar botão 'Ver Detalhes', Escape para fechar notificação) e ter labels apropriados para screen readers (ex: 'Novo pedido recebido: Pedido #1234, Retirada, R$ 50,00').

AC 3.1.28: Se busca inicial de pedidos falhar ao iniciar aplicativo, exibir mensagem de erro na fila ('Erro ao carregar pedidos. Clique para tentar novamente.') e permitir retry manual. Aplicativo deve continuar funcionando (subscription Realtime deve funcionar mesmo se busca inicial falhar).

AC 3.1.29: Ao clicar em 'Ver Detalhes' na notificação ou em pedido na fila, deve abrir modal ou seção expandida mostrando detalhes completos do pedido: itens, opcionais, observações, cliente/mesa, resumo financeiro. **Nota:** Detalhes completos serão implementados na Story 3.2, mas estrutura básica deve estar pronta nesta story.
```

### 3. Atualizar Task 2:

```
- [ ] Subtask 2.4: Implementar reconexão automática com exponential backoff (5s, 10s, 20s, max 60s) e limite de 10 tentativas consecutivas (AC 3.1.22)
- [ ] Subtask 2.7: Implementar cache de IDs de pedidos notificados para evitar duplicatas (AC 3.1.25)
```

### 4. Atualizar Task 3:

```
- [ ] Subtask 3.7: Implementar limite de 5 notificações simultâneas com badge '+X pedidos adicionais' (AC 3.1.24)
- [ ] Subtask 3.8: Implementar tratamento de notificações quando app está minimizado (AC 3.1.23)
- [ ] Subtask 3.9: Implementar acessibilidade das notificações (teclado, screen readers) (AC 3.1.27)
- [ ] Subtask 3.10: Implementar botão 'Ver Detalhes' com modal/seção expandida básica (AC 3.1.29)
```

### 5. Atualizar Task 4:

```
- [ ] Subtask 4.6: Implementar toggle para habilitar/desabilitar som completamente (AC 3.1.26)
- [ ] Subtask 4.7: Implementar verificação de volume do sistema (não 'Não Perturbe' diretamente) (AC 3.1.12)
```

### 6. Atualizar Task 5:

```
- [ ] Subtask 5.8: Implementar tratamento de erro ao carregar fila inicial com retry manual (AC 3.1.28)
```

### 7. Adicionar Task 7: Segurança e Configuração

```
- [ ] Task 7: Configuração e Segurança
  - [ ] Subtask 7.1: Criar política RLS para aplicativo Electron (AC 3.1.21)
  - [ ] Subtask 7.2: Implementar armazenamento seguro de service role key (criptografia ou env vars) (AC 3.1.21)
  - [ ] Subtask 7.3: Criar arquivo de configuração com credenciais e configurações de notificação
```

### 8. Adicionar seção em Dev Notes > Segurança:

```
**RLS e Autenticação:**

O aplicativo Electron deve usar service role key (não anon key) para garantir acesso completo aos pedidos. Service role key deve ser armazenada de forma segura:

1. **Opção 1 (Recomendada):** Variáveis de ambiente no sistema operacional
2. **Opção 2:** Arquivo de configuração criptografado
3. **Opção 3:** Keychain do macOS (usando `keytar` do Electron)

**Política RLS:**

Se usar service role key, RLS pode ser ignorado (service role bypassa RLS). Se usar anon key, criar política:

```sql
CREATE POLICY electron_read_received_orders ON orders 
FOR SELECT 
USING (status = 'Recebido');
```

**Reconexão com Exponential Backoff:**

```typescript
let reconnectAttempts = 0
const maxAttempts = 10
const baseDelay = 5000 // 5 segundos

async function reconnect() {
  if (reconnectAttempts >= maxAttempts) {
    showPermanentError('Falha ao conectar. Intervenção manual necessária.')
    return
  }
  
  const delay = Math.min(baseDelay * Math.pow(2, reconnectAttempts), 60000)
  reconnectAttempts++
  
  setTimeout(async () => {
    try {
      await subscribe()
      reconnectAttempts = 0 // Reset on success
    } catch (error) {
      reconnect()
    }
  }, delay)
}
```

**Cache de Pedidos Notificados:**

```typescript
const notifiedOrders = new Set<string>()
const NOTIFICATION_CACHE_TTL = 5 * 60 * 1000 // 5 minutos

function hasBeenNotified(orderId: string): boolean {
  return notifiedOrders.has(orderId)
}

function markAsNotified(orderId: string) {
  notifiedOrders.add(orderId)
  setTimeout(() => notifiedOrders.delete(orderId), NOTIFICATION_CACHE_TTL)
}
```
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem boa base e demonstra aprendizado das stories anteriores. No entanto, possui 5 bloqueadores críticos que impedem desenvolvimento completo:
1. RLS e autenticação não especificados (segurança)
2. Estratégia de reconexão não especificada (exponential backoff)
3. Verificação de 'Não Perturbe' não implementável como especificado
4. Falta AC para comportamento quando app está minimizado
5. Falta AC para limite de notificações empilhadas

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Aprovar novos ACs propostos (3.1.21-3.1.29)
   - Decidir sobre uso de service role key vs anon key + RLS

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra boa qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre segurança (RLS, autenticação), tratamento de erros (reconexão, retry) e casos edge (app minimizado, pedidos duplicados, limite de notificações), não sobre problemas estruturais fundamentais. A story mostra aprendizado das Stories anteriores ao incorporar padrões estabelecidos (timeout, logs estruturados, TypeScript, POO).

**Comparação com Stories Anteriores:**
- ✅ Similar: Mesmo padrão de expandir ACs do PRD com melhorias
- ✅ Melhor: Dev Notes muito completos com exemplos de código
- ✅ Melhor: Estrutura de projeto bem definida
- ⚠️ Área de melhoria: Necessita mais atenção a segurança (RLS, autenticação) e casos edge (app minimizado, reconexão)

**Destaques:**
- Excelente trabalho em especificar notificações visuais e sonoras
- Boa separação de responsabilidades nas tasks (main/renderer/preload)
- Aprendizados das Stories anteriores bem incorporados
- Boa cobertura de casos de teste manuais

**Áreas de Melhoria:**
- Necessita mais atenção a segurança (RLS, autenticação, armazenamento de credenciais)
- Necessita mais casos edge (app minimizado, pedidos duplicados, limite de notificações)
- Necessita mais atenção a tratamento de erros (reconexão com exponential backoff, erro ao carregar fila)

**Tempo estimado para correções:** 2-3 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


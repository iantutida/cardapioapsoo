# PO Review: Story 1.3 - Gerenciar o Carrinho de Compras

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 1.3 está muito bem estruturada e demonstra excelente compreensão dos requisitos e aprendizado das stories anteriores. A story expande corretamente os ACs do PRD com melhorias importantes (ACs 1.3.8-1.3.16). No entanto, **requer algumas correções** relacionadas a dependências não resolvidas, casos de erro e validações antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 8.5/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks extremamente detalhadas e acionáveis
- ✅ Dev Notes completos com aprendizados da Story 1.2
- ✅ Estrutura de dados bem definida (AppliedCoupon, CartContextType)

### 2. Alinhamento com Requisitos Funcionais
- ✅ Todos os 7 ACs do PRD estão presentes
- ✅ ACs adicionais (1.3.8-1.3.16) são melhorias válidas e bem justificadas
- ✅ ACs estão testáveis e mensuráveis
- ✅ Story cobre o escopo completo da funcionalidade

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de POO e TypeScript
- ✅ Referências às Stories anteriores mostram continuidade
- ✅ Métodos POO bem especificados para classe Coupon
- ✅ Estrutura de arquivos consistente com stories anteriores
- ✅ Validações e regras de negócio bem documentadas

### 4. Qualidade das Tasks
- ✅ Tasks bem organizadas e sequenciais
- ✅ Subtasks granulares e acionáveis
- ✅ Mapeamento correto de ACs para Tasks
- ✅ Boa separação de responsabilidades

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. Dependência de Story 2.5 Não Resolvida

**Problema:** AC 1.3.7 menciona "cupom válido (História 2.5)", mas Story 2.5 (Gerenciamento de Cupons) ainda não existe ou não foi criada. A funcionalidade de cupons depende de funcionalidade administrativa que não está disponível.

**Impacto:** Similar aos problemas das Stories 1.1 e 1.2. A story não pode ser implementada completamente sem definir como os cupons serão criados/gerenciados no admin.

**Recomendação:**
- Opção A: Criar Story 2.5 antes ou em paralelo
- Opção B: Manter nota existente (já está no AC 1.3.7) de que funcionará com cupons cadastrados diretamente no banco
- Opção C: Aceitar AC 1.3.7 com nota de que cupons serão funcionais quando Story 2.5 estiver disponível

**Ação:** ⚠️ **BLOQUEADOR** - Resolver antes de iniciar desenvolvimento (mas nota já existe no AC)

#### 2. Falta AC para Validação de Cupom ao Recarregar Página

**Problema:** Dev Notes menciona "Cupom aplicado deve ser validado ao recarregar página (verificar se ainda está ativo no Supabase)", mas não há AC definindo esse comportamento.

**Impacto:** Se usuário aplicar cupom, recarregar página e o cupom tiver sido desativado no admin, o cupom ainda aparecerá como aplicado, causando inconsistência.

**Recomendação:**
- Adicionar AC 1.3.17: "Ao recarregar a página, se um cupom estiver aplicado, o sistema deve validar se o cupom ainda está ativo no Supabase. Se o cupom foi desativado, deve ser removido automaticamente e o usuário deve ser notificado."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 3. Falta AC para Erro ao Validar Cupom

**Problema:** Não há AC definindo comportamento quando há erro ao validar cupom no Supabase (ex: erro de rede, timeout).

**Impacto:** UX pode ficar inconsistente - usuário pode tentar aplicar cupom e não receber feedback adequado.

**Recomendação:**
- Adicionar AC 1.3.18: "Se houver erro ao validar cupom no Supabase (ex: erro de rede), o sistema deve exibir mensagem de erro apropriada (ex: 'Erro ao validar cupom. Tente novamente.') e não aplicar o cupom."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 4. AC 1.3.4 Não Especifica Comportamento ao Cancelar Edição

**Problema:** AC 1.3.4 menciona editar item e reabrir modal pré-preenchido, mas não especifica o que acontece se o usuário fechar o modal sem salvar.

**Impacto:** Pode haver confusão sobre se alterações foram salvas ou não.

**Recomendação:**
- Adicionar AC 1.3.19: "Ao editar um item do carrinho, se o usuário fechar o modal sem salvar alterações, o item original deve permanecer inalterado no carrinho."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar clareza

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 5. Falta Especificação sobre Posição do Botão Flutuante em Mobile

**Problema:** AC 1.3.1 menciona "botão flutuante fixo", mas não especifica posição. Dev Notes menciona "bottom-right em desktop, pode variar em mobile", mas não está no AC.

**Impacto:** Pode resultar em inconsistência entre desenvolvedores sobre onde posicionar o botão.

**Recomendação:**
- Adicionar AC 1.3.20: "O botão flutuante do carrinho deve estar posicionado no canto inferior direito em desktop e tablet. Em mobile, pode estar no canto inferior direito ou centralizado na parte inferior, garantindo que não interfira com a navegação."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar especificação

#### 6. Falta AC sobre Loading State ao Aplicar Cupom

**Problema:** Não há AC definindo comportamento durante validação de cupom ao clicar em "Aplicar". Pode haver delay na resposta do Supabase.

**Impacto:** UX pode ficar inconsistente - usuário pode clicar múltiplas vezes ou não ver feedback.

**Recomendação:**
- Adicionar AC 1.3.21: "Ao clicar em 'Aplicar' no campo de cupom, o sistema deve exibir um indicador de carregamento enquanto valida o cupom no Supabase."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar UX

#### 7. Falta AC sobre Comportamento quando Cupom Remove Total a Zero

**Problema:** Validações mencionam que total não pode ser negativo, mas não especificam comportamento quando desconto deixa total em zero ou muito próximo de zero.

**Impacto:** Pode causar confusão sobre se pedido pode ser finalizado com total zero.

**Recomendação:**
- Adicionar nota técnica: "Se desconto deixar total em zero ou negativo após cálculo, o desconto deve ser ajustado para garantir que total seja pelo menos R$ 0,01"
- Ou adicionar AC: "Se aplicação de cupom deixar total em zero ou negativo, o desconto deve ser ajustado automaticamente para o máximo possível sem deixar total negativo."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 8. Falta AC sobre Máximo de Itens no Carrinho para Exibição

**Problema:** Não há limite definido para número de itens visíveis no modal antes de precisar scroll. Pode haver muitos itens e UX ruim.

**Impacto:** Pode resultar em modal muito longo e difícil de navegar.

**Recomendação:**
- Adicionar nota técnica: "Implementar scroll interno na lista de itens se houver muitos itens. Máximo de itens visíveis sem scroll: 5-7 itens dependendo do tamanho da tela."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 9. Falta Detalhamento sobre Estrutura de Opcionais na Exibição

**Problema:** AC 1.3.2 menciona "opcionais selecionados (com nomes e custos adicionais)", mas não especifica formato exato de exibição. Subtask 5.6 menciona formato, mas não está no AC.

**Impacto:** Pode resultar em formato inconsistente entre desenvolvedores.

**Recomendação:**
- Adicionar ao AC 1.3.2: "...opcionais selecionados (com nomes e custos adicionais formatados, ex: 'Bacon +R$2,00' ou 'Grátis' se custo for zero)"

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 10. Falta AC sobre Acessibilidade do Botão Flutuante

**Problema:** AC 1.3.16 menciona responsividade do modal, mas não menciona acessibilidade do botão flutuante (navegação por teclado, screen readers).

**Impacto:** Pode não ser acessível para usuários com deficiências.

**Recomendação:**
- Adicionar AC 1.3.22: "O botão flutuante do carrinho deve ser acessível via teclado (Tab para focar, Enter para ativar) e ter label apropriado para screen readers."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs alinhados com PRD
- [x] ACs bem detalhados e testáveis
- [ ] Casos de erro/vazio definidos (faltando validação ao recarregar, erro ao validar)
- [ ] Edge cases considerados (faltando cancelar edição, cupom deixar total zero)

### Requisitos Técnicos
- [x] POO mencionado como obrigatório
- [x] TypeScript mencionado como obrigatório
- [x] Classes POO especificadas com métodos
- [x] Integração com Supabase definida
- [x] Estrutura de dados do carrinho definida

### Dependências
- [ ] Story 2.5 depende de Story 2.5 (não resolvida, mas nota existe no AC)
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
- [x] Aprendizados das stories anteriores incorporados
- [x] Validações e regras de negócio bem documentadas

---

## ✅ Ações Recomendadas Antes de Aprovação

### Prioridade Alta (Bloqueadores)
1. 🔴 **Adicionar AC para validação de cupom ao recarregar página** - AC 1.3.17
2. 🔴 **Adicionar AC para erro ao validar cupom** - AC 1.3.18
3. 🔴 **Adicionar AC sobre cancelar edição** - AC 1.3.19

### Prioridade Média (Importante)
4. 🟡 **Adicionar AC sobre posição do botão flutuante** - AC 1.3.20
5. 🟡 **Adicionar AC sobre loading state ao aplicar cupom** - AC 1.3.21
6. 🟡 **Esclarecer formato de exibição de opcionais no AC** - Melhorar AC 1.3.2

### Prioridade Baixa (Sugestões)
7. 🟢 **Adicionar nota sobre comportamento quando cupom deixa total zero** - Se relevante
8. 🟢 **Adicionar nota sobre scroll na lista de itens** - Se relevante
9. 🟢 **Adicionar AC sobre acessibilidade do botão flutuante** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Adicionar novos ACs:

```
AC 1.3.17: Ao recarregar a página, se um cupom estiver aplicado, o sistema deve validar se o cupom ainda está ativo no Supabase. Se o cupom foi desativado, deve ser removido automaticamente e o usuário deve ser notificado através de mensagem informativa.

AC 1.3.18: Se houver erro ao validar cupom no Supabase (ex: erro de rede, timeout), o sistema deve exibir mensagem de erro apropriada (ex: "Erro ao validar cupom. Tente novamente.") e não aplicar o cupom.

AC 1.3.19: Ao editar um item do carrinho, se o usuário fechar o modal sem salvar alterações (clicando em X, ESC ou fora do modal), o item original deve permanecer inalterado no carrinho.

AC 1.3.20: O botão flutuante do carrinho deve estar posicionado no canto inferior direito em desktop e tablet. Em mobile, pode estar no canto inferior direito ou centralizado na parte inferior, garantindo que não interfira com a navegação e seja facilmente acessível.

AC 1.3.21: Ao clicar em "Aplicar" no campo de cupom, o sistema deve exibir um indicador de carregamento enquanto valida o cupom no Supabase.

AC 1.3.22: O botão flutuante do carrinho deve ser acessível via teclado (Tab para focar, Enter para ativar) e ter label apropriado para screen readers (ex: "Abrir carrinho, X itens").
```

### 2. Melhorar AC 1.3.2:

```
AC 1.3.2: O carrinho deve listar cada item, mostrando nome do produto, quantidade, opcionais selecionados (com nomes e custos adicionais formatados, ex: "Bacon +R$2,00" ou "Grátis" se custo for zero), observações (se houver) e o preço total do item formatado.
```

### 3. Adicionar na Task 2:

```
- [ ] Subtask 2.7: Implementar validação de cupom aplicado ao recarregar página (verificar se ainda está ativo no Supabase) (AC 1.3.17)
- [ ] Subtask 2.8: Implementar tratamento de erro ao validar cupom (ex: erro de rede) (AC 1.3.18)
```

### 4. Adicionar na Task 7:

```
- [ ] Subtask 7.6: Implementar lógica para preservar item original se modal de edição for fechado sem salvar (AC 1.3.19)
```

### 5. Adicionar na Task 3:

```
- [ ] Subtask 3.7: Implementar posicionamento responsivo do botão flutuante conforme especificação (AC 1.3.20)
- [ ] Subtask 3.8: Implementar acessibilidade do botão flutuante (teclado, screen readers) (AC 1.3.22)
```

### 6. Adicionar na Task 9:

```
- [ ] Subtask 9.7: Implementar indicador de carregamento ao validar cupom (AC 1.3.21)
```

### 7. Adicionar seção em Dev Notes > Validações e Regras de Negócio:

```
- **Cupom ao recarregar:** Validar se cupom aplicado ainda está ativo ao recarregar página
- **Erro ao validar cupom:** Não aplicar cupom se houver erro ao validar, exibir mensagem de erro
- **Cancelar edição:** Preservar item original se modal de edição for fechado sem salvar
- **Total zero com cupom:** Se desconto deixar total em zero ou negativo, ajustar desconto automaticamente para máximo possível sem deixar total negativo
- **Lista de itens:** Implementar scroll interno na lista se houver muitos itens (>5-7 itens visíveis)
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem excelente base e demonstra aprendizado das stories anteriores. No entanto, possui 3 bloqueadores críticos que impedem desenvolvimento completo:
1. Falta AC para validação de cupom ao recarregar página
2. Falta AC para erro ao validar cupom
3. Falta AC sobre cancelar edição de item

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Aprovar novos ACs propostos (1.3.17-1.3.22)

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra excelente qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre completude e casos de erro, não sobre problemas estruturais fundamentais. A story mostra aprendizado consistente das Stories 1.1 e 1.2 ao incorporar melhorias e referenciar padrões estabelecidos.

**Comparação com Stories Anteriores:**
- ✅ Melhor: Validações e regras de negócio já bem documentadas desde o início
- ✅ Melhor: Estrutura de dados bem definida antes da implementação
- ✅ Melhor: Mais ACs extras bem justificados
- ⚠️ Similar: Mesma dependência de story admin não resolvida (mas nota já existe no AC)

**Destaques:**
- Excelente trabalho em documentar validações e regras de negócio
- Boa separação de responsabilidades nas tasks
- Aprendizados das stories anteriores bem incorporados

**Tempo estimado para correções:** 1-2 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


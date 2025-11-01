# PO Review: Story 1.4 - Finalizar Pedido (Checkout)

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 1.4 está bem estruturada e demonstra boa compreensão dos requisitos e aprendizado das stories anteriores. A story expande corretamente os ACs do PRD com melhorias importantes (ACs 1.4.7-1.4.14). No entanto, **requer algumas correções** relacionadas a dependências não resolvidas, casos de erro, validações e comportamento de formulário antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 8.0/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks extremamente detalhadas e acionáveis
- ✅ Dev Notes completos com aprendizados da Story 1.3
- ✅ Estrutura de dados bem definida (OrderData, tabelas do Supabase)

### 2. Alinhamento com Requisitos Funcionais
- ✅ Todos os 6 ACs do PRD estão presentes
- ✅ ACs adicionais (1.4.7-1.4.14) são melhorias válidas e bem justificadas
- ✅ ACs estão testáveis e mensuráveis
- ✅ Story cobre o escopo completo da funcionalidade

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de POO e TypeScript
- ✅ Referências às Stories anteriores mostram continuidade
- ✅ Métodos POO bem especificados para classes Order, OrderItem, OrderItemOption
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

#### 1. Dependência de Story 3.1 Não Mencionada no AC 1.4.5

**Problema:** O PRD menciona "acionar a notificação no App Desktop (História 3.1)" no AC 1.4.5, mas na story expandida isso não está mencionado no AC 1.4.6. A story menciona salvar no Supabase, mas não especifica se deve acionar notificação no Desktop.

**Impacto:** Se Story 3.1 depender dessa funcionalidade, pode haver inconsistência. Precisamos clarificar se:
- A notificação é automática quando pedido é salvo no Supabase (via realtime/subscription)
- Ou se precisa de ação explícita no código
- Ou se foi removida conscientemente da story

**Recomendação:**
- Adicionar nota ao AC 1.4.6: "Nota: A notificação no App Desktop (Story 3.1) será acionada automaticamente via Supabase Realtime quando pedido for salvo, ou será implementada em Story 3.1."
- Ou adicionar AC específico: "AC 1.4.15: Ao salvar pedido, o sistema deve acionar notificação no App Desktop conforme Story 3.1."

**Ação:** 🔴 **CRÍTICO** - Esclarecer antes de aprovar

#### 2. Falta AC sobre Comportamento ao Mudar Modalidade

**Problema:** Não há AC definindo o que acontece quando o usuário:
- Preenche campos de "Retirada" (nome e telefone)
- Muda para "Consumo no Local"
- Os campos devem ser limpos? Validação deve ser resetada?

**Impacto:** Pode causar confusão ou bugs se campos de uma modalidade permanecerem preenchidos ao mudar para outra.

**Recomendação:**
- Adicionar AC 1.4.15: "Ao mudar a modalidade selecionada, os campos da modalidade anterior devem ser limpos e a validação deve ser resetada."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 3. Falta AC sobre Máximo de Caracteres para Nome

**Problema:** AC 1.4.2 menciona "mínimo 2 caracteres" mas não menciona máximo. Dev Notes menciona "máximo 100 caracteres", mas não está no AC.

**Impacto:** Pode causar inconsistência entre desenvolvedores sobre limite máximo.

**Recomendação:**
- Atualizar AC 1.4.2: "...**Nome** (obrigatório, mínimo 2 caracteres, máximo 100 caracteres)"

**Ação:** 🔴 **CRÍTICO** - Adicionar ao AC

#### 4. Falta AC sobre Formato Específico de Telefone Aceito

**Problema:** AC 1.4.2 menciona "formato brasileiro válido" e AC 1.4.12 menciona formatação automática, mas não especifica quais formatos são aceitos (apenas formato exibido). Dev Notes menciona "(11) 98765-4321, 11987654321, etc." mas não está no AC.

**Impacto:** Pode causar inconsistência sobre quais formatos são válidos.

**Recomendação:**
- Atualizar AC 1.4.2: "...**Número de Telefone** (obrigatório, formato brasileiro válido, aceitar: (11) 98765-4321, 11987654321, ou formato internacional)"
- Ou criar AC separado: "AC 1.4.16: O sistema deve aceitar telefone em diferentes formatos (com ou sem máscara, com ou sem código de área) mas validar que é um número brasileiro válido (10-11 dígitos)."

**Ação:** 🔴 **CRÍTICO** - Esclarecer antes de aprovar

#### 5. Falta AC sobre Timeout ao Salvar Pedido

**Problema:** AC 1.4.8 menciona erro ao salvar, mas não especifica comportamento em caso de timeout (ex: rede lenta, Supabase temporariamente indisponível).

**Impacto:** Usuário pode ficar com indicador de carregamento indefinidamente.

**Recomendação:**
- Adicionar AC 1.4.17: "Se houver timeout ao salvar pedido no Supabase (ex: rede lenta), o sistema deve exibir mensagem de erro apropriada (ex: 'Tempo de espera esgotado. Tente novamente.') após período razoável (ex: 30 segundos) e permitir tentar novamente."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 6. Falta AC sobre Integridade Transacional

**Problema:** Dev Notes menciona "transação ou inserções em sequência garantindo integridade" e validações mencionam rollback, mas não há AC definindo comportamento se houver erro parcial (ex: `orders` salvo mas `order_items` falhou).

**Impacto:** Pode causar dados inconsistentes no banco (pedido sem itens).

**Recomendação:**
- Adicionar AC 1.4.18: "Se houver erro ao salvar `order_items` ou `order_item_options` após salvar `orders`, o sistema deve fazer rollback completo (deletar pedido criado) e exibir mensagem de erro, garantindo que não haja pedidos órfãos no banco."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 7. Falta AC sobre Limpeza de Cupom no clearCart()

**Problema:** AC 1.4.6 menciona "Limpar o carrinho e cupom aplicado", mas não está claro se `clearCart()` do CartContext já limpa cupom ou se precisa chamar `removeCoupon()` separadamente.

**Impacto:** Pode causar bugs se cupom não for limpo corretamente.

**Recomendação:**
- Adicionar nota técnica: "Garantir que `clearCart()` do CartContext também limpe cupom aplicado, ou chamar `removeCoupon()` explicitamente após `clearCart()`."

**Ação:** 🟡 **IMPORTANTE** - Esclarecer na task

#### 8. Falta AC sobre Validação em Tempo Real vs. onSubmit

**Problema:** AC 1.4.11 menciona validação visual, mas não especifica se validação deve ser em tempo real (onChange) ou apenas ao tentar submeter.

**Impacto:** Pode causar inconsistência na UX - alguns campos validando enquanto digita, outros apenas ao submeter.

**Recomendação:**
- Adicionar AC 1.4.19: "A validação visual dos campos deve ocorrer em tempo real (ao sair do campo ou após usuário digitar) e também ao tentar confirmar pedido."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar UX

#### 9. Falta AC sobre Acessibilidade da Página

**Problema:** AC 1.4.10 menciona responsividade, mas não menciona acessibilidade (navegação por teclado, screen readers, labels apropriados).

**Impacto:** Pode não ser acessível para usuários com deficiências.

**Recomendação:**
- Adicionar AC 1.4.20: "A página de checkout deve ser acessível via teclado (navegação por Tab, Enter para submeter) e ter labels apropriados para screen readers. Campos devem ter mensagens de erro acessíveis."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar acessibilidade

#### 10. Falta AC sobre Confirmação antes de Submeter

**Problema:** Não há AC sobre confirmação ou revisão final antes de submeter pedido. É uma ação importante (criar pedido), pode ser útil ter confirmação.

**Recomendação:**
- Opção A: Adicionar AC 1.4.21: "Antes de confirmar pedido, deve ser exibido modal de confirmação mostrando resumo completo e perguntando 'Confirmar pedido?'"
- Opção B: Considerar se necessário - pode ser que o resumo já exibido seja suficiente

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 11. Falta AC sobre Mensagem de Sucesso antes de Redirecionar

**Problema:** AC 1.4.7 menciona redirecionamento após sucesso, mas não menciona se deve exibir mensagem de sucesso (ex: toast) antes de redirecionar ou durante redirecionamento.

**Impacto:** UX pode ficar confusa - usuário pode não saber que pedido foi salvo com sucesso se redirecionamento for muito rápido.

**Recomendação:**
- Adicionar AC 1.4.22: "Após salvar pedido com sucesso, deve ser exibida mensagem de confirmação (ex: toast 'Pedido confirmado com sucesso!') antes ou durante redirecionamento para página de acompanhamento."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar UX

#### 12. Falta AC sobre Limite de Número da Mesa

**Problema:** AC 1.4.3 menciona "número positivo" e validações mencionam "1-999", mas não está claro no AC se há limite máximo.

**Impacto:** Pode causar inconsistência sobre limite de mesa.

**Recomendação:**
- Atualizar AC 1.4.3: "...**Número da Mesa** (obrigatório, número positivo entre 1 e 999)"

**Ação:** 🟡 **IMPORTANTE** - Esclarecer no AC

#### 13. Falta Especificação sobre Ordem dos Campos no Formulário

**Problema:** Component Specifications menciona estrutura, mas não especifica ordem exata dos campos ou se resumo deve vir antes ou depois do formulário.

**Impacto:** Pode causar inconsistência na implementação.

**Recomendação:**
- Adicionar nota técnica: "Ordem sugerida: 1) Resumo do Pedido, 2) Seleção de Modalidade, 3) Campos Condicionais, 4) Botão Confirmar"

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs alinhados com PRD
- [x] ACs bem detalhados e testáveis
- [ ] Casos de erro/vazio definidos (faltando timeout, mudança de modalidade, integridade transacional)
- [ ] Edge cases considerados (faltando máximo de caracteres, formato de telefone, limpeza de campos)

### Requisitos Técnicos
- [x] POO mencionado como obrigatório
- [x] TypeScript mencionado como obrigatório
- [x] Classes POO especificadas com métodos
- [x] Integração com Supabase definida
- [x] Estrutura de dados do pedido definida
- [ ] Transação/rollback especificada (faltando AC)

### Dependências
- [ ] Story 3.1 depende de notificação (não resolvida - precisa esclarecimento)
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
1. 🔴 **Esclarecer dependência de Story 3.1** - Adicionar nota ou AC específico
2. 🔴 **Adicionar AC sobre mudança de modalidade** - AC 1.4.15
3. 🔴 **Adicionar máximo de caracteres no AC 1.4.2** - Especificar máximo 100
4. 🔴 **Adicionar formato específico de telefone no AC** - AC 1.4.16 ou atualizar 1.4.2
5. 🔴 **Adicionar AC sobre timeout** - AC 1.4.17
6. 🔴 **Adicionar AC sobre integridade transacional** - AC 1.4.18

### Prioridade Média (Importante)
7. 🟡 **Esclarecer limpeza de cupom na task** - Nota técnica
8. 🟡 **Adicionar AC sobre validação em tempo real** - AC 1.4.19
9. 🟡 **Adicionar AC sobre acessibilidade** - AC 1.4.20
10. 🟡 **Adicionar AC sobre mensagem de sucesso** - AC 1.4.22
11. 🟡 **Esclarecer limite de número da mesa no AC** - Atualizar AC 1.4.3

### Prioridade Baixa (Sugestões)
12. 🟢 **Adicionar AC sobre confirmação antes de submeter** - AC 1.4.21 (se relevante)
13. 🟢 **Adicionar nota sobre ordem dos campos** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Adicionar novos ACs:

```
AC 1.4.15: Ao mudar a modalidade selecionada, os campos da modalidade anterior devem ser limpos e a validação deve ser resetada.

AC 1.4.16: O sistema deve aceitar telefone em diferentes formatos (com ou sem máscara, com ou sem código de área) mas validar que é um número brasileiro válido (10-11 dígitos após remover caracteres não numéricos).

AC 1.4.17: Se houver timeout ao salvar pedido no Supabase (ex: rede lenta, Supabase temporariamente indisponível), o sistema deve exibir mensagem de erro apropriada (ex: "Tempo de espera esgotado. Tente novamente.") após período razoável (ex: 30 segundos) e permitir tentar novamente sem perder dados preenchidos.

AC 1.4.18: Se houver erro ao salvar order_items ou order_item_options após salvar orders, o sistema deve fazer rollback completo (deletar pedido criado) e exibir mensagem de erro, garantindo que não haja pedidos órfãos no banco de dados.

AC 1.4.19: A validação visual dos campos deve ocorrer em tempo real (ao sair do campo ou após usuário digitar alguns caracteres) e também ao tentar confirmar pedido.

AC 1.4.20: A página de checkout deve ser acessível via teclado (navegação por Tab, Enter para submeter formulário) e ter labels apropriados para screen readers. Campos devem ter mensagens de erro acessíveis.

AC 1.4.21: Antes de confirmar pedido, deve ser exibido modal de confirmação mostrando resumo completo do pedido e perguntando "Confirmar e enviar pedido?" com opções "Cancelar" e "Confirmar". (OPCIONAL - pode ser que resumo já exibido seja suficiente)

AC 1.4.22: Após salvar pedido com sucesso, deve ser exibida mensagem de confirmação (ex: toast "Pedido confirmado com sucesso!") antes ou durante redirecionamento para página de acompanhamento.
```

### 2. Melhorar ACs existentes:

```
AC 1.4.2: Se "Retirada" for selecionado, o sistema deve solicitar **Nome** (obrigatório, mínimo 2 caracteres, máximo 100 caracteres) e **Número de Telefone** (obrigatório, formato brasileiro válido, aceitar: (11) 98765-4321, 11987654321, ou formato internacional - validar 10-11 dígitos após remover caracteres não numéricos).

AC 1.4.3: Se "Consumo no Local" for selecionado, o sistema deve solicitar o **Número da Mesa** (obrigatório, número positivo entre 1 e 999).

AC 1.4.6: Ao clicar em "Confirmar Pedido", o sistema deve:
   - Salvar o pedido no Supabase (tabelas orders, order_items, order_item_options) em transação garantindo integridade
   - Limpar o carrinho e cupom aplicado
   - Exibir indicador de carregamento durante o processo
   - Nota: A notificação no App Desktop (Story 3.1) será acionada automaticamente via Supabase Realtime quando pedido for salvo, ou será implementada em Story 3.1.
```

### 3. Adicionar na Task 7:

```
- [ ] Subtask 7.8: Implementar timeout ao salvar pedido (30 segundos) e exibir mensagem de erro apropriada se timeout ocorrer (AC 1.4.17)
- [ ] Subtask 7.9: Implementar rollback completo se houver erro parcial ao salvar (deletar orders se order_items falhar) (AC 1.4.18)
- [ ] Subtask 7.10: Garantir que clearCart() também limpe cupom aplicado, ou chamar removeCoupon() explicitamente
```

### 4. Adicionar na Task 3:

```
- [ ] Subtask 3.4: Implementar limpeza de campos ao mudar modalidade (limpar campos da modalidade anterior) (AC 1.4.15)
```

### 5. Adicionar na Task 4:

```
- [ ] Subtask 4.6: Implementar validação em tempo real (onChange/onBlur) além de validação ao submeter (AC 1.4.19)
- [ ] Subtask 4.7: Aceitar telefone em diferentes formatos mas validar 10-11 dígitos (AC 1.4.16)
```

### 6. Adicionar na Task 7:

```
- [ ] Subtask 7.11: Exibir mensagem de sucesso (toast) antes ou durante redirecionamento (AC 1.4.22)
```

### 7. Adicionar na Task 2:

```
- [ ] Subtask 2.5: Implementar acessibilidade da página (teclado, screen readers, labels) (AC 1.4.20)
```

### 8. Adicionar seção em Dev Notes > Validações e Regras de Negócio:

```
- **Mudança de modalidade:** Limpar campos e resetar validação ao mudar modalidade selecionada
- **Timeout ao salvar:** Implementar timeout de 30 segundos e exibir mensagem de erro apropriada
- **Integridade transacional:** Garantir rollback completo se houver erro parcial ao salvar (orders sem order_items)
- **Limpeza de cupom:** Garantir que cupom seja limpo junto com carrinho após salvar pedido
- **Validação em tempo real:** Validar campos em tempo real (onChange/onBlur) e ao submeter
- **Formato de telefone:** Aceitar diferentes formatos mas validar 10-11 dígitos brasileiros
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem excelente base e demonstra aprendizado das stories anteriores. No entanto, possui 6 bloqueadores críticos que impedem desenvolvimento completo:
1. Dependência de Story 3.1 não esclarecida
2. Falta AC sobre mudança de modalidade
3. Falta máximo de caracteres no AC
4. Falta formato específico de telefone
5. Falta AC sobre timeout
6. Falta AC sobre integridade transacional

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Aprovar novos ACs propostos (1.4.15-1.4.22)
   - Decidir se confirmação antes de submeter é necessária (AC 1.4.21)
   - Esclarecer dependência de Story 3.1

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra boa qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre completude, casos de erro e validações, não sobre problemas estruturais fundamentais. A story mostra aprendizado consistente das Stories anteriores ao incorporar melhorias e referenciar padrões estabelecidos.

**Comparação com Stories Anteriores:**
- ✅ Melhor: Validações e regras de negócio já bem documentadas desde o início
- ✅ Melhor: Estrutura de dados bem definida antes da implementação
- ✅ Similar: Mesmo padrão de expandir ACs do PRD com melhorias
- ⚠️ Similar: Mesma necessidade de esclarecer dependências (Story 3.1)

**Destaques:**
- Excelente trabalho em documentar estrutura de tabelas do Supabase
- Boa separação de responsabilidades nas tasks
- Aprendizados da Story 1.3 bem incorporados
- Boa cobertura de casos de erro e validações

**Áreas de Melhoria:**
- Necessita mais atenção a edge cases (mudança de modalidade, timeout, integridade transacional)
- Necessita esclarecimento sobre dependências (Story 3.1)

**Tempo estimado para correções:** 2-3 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


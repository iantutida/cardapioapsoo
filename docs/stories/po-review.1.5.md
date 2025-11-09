# PO Review: Story 1.5 - Acompanhar Status do Pedido

**Reviewer:** Sarah (Product Owner)  
**Data:** 2024  
**Versão da Story:** Draft  
**Status da Review:** ⚠️ Requer Correções Antes de Aprovação

---

## Resumo Executivo

A Story 1.5 está muito bem estruturada e demonstra excelente compreensão dos requisitos e aprendizado das stories anteriores. A story expande corretamente os ACs do PRD com melhorias importantes (ACs 1.5.5-1.5.16). No entanto, **requer algumas correções** relacionadas a dependências não resolvidas, casos de erro, definição de "pedido ativo" e comportamento do Realtime antes de ser aprovada para desenvolvimento.

**Pontuação Geral:** 8.5/10

---

## ✅ Pontos Fortes

### 1. Estrutura e Organização
- ✅ Story bem formatada seguindo padrão User Story
- ✅ Tasks e subtasks extremamente detalhadas e acionáveis
- ✅ Dev Notes completos com aprendizados da Story 1.4
- ✅ Estrutura de dados bem definida (tabelas do Supabase, Realtime)

### 2. Alinhamento com Requisitos Funcionais
- ✅ Todos os 4 ACs do PRD estão presentes
- ✅ ACs adicionais (1.5.5-1.5.16) são melhorias válidas e bem justificadas
- ✅ ACs estão testáveis e mensuráveis
- ✅ Story cobre o escopo completo da funcionalidade

### 3. Aspectos Técnicos
- ✅ Menciona obrigatoriedade de POO e TypeScript
- ✅ Referências às Stories anteriores mostram continuidade
- ✅ Métodos POO bem especificados para classe Order
- ✅ Estrutura de arquivos consistente com stories anteriores
- ✅ Realtime Subscription bem especificada
- ✅ Validações e regras de negócio bem documentadas

### 4. Qualidade das Tasks
- ✅ Tasks bem organizadas e sequenciais
- ✅ Subtasks granulares e acionáveis
- ✅ Mapeamento correto de ACs para Tasks
- ✅ Boa separação de responsabilidades (busca, Realtime, UI)

---

## ⚠️ Pontos que Requerem Atenção

### 🔴 CRÍTICO - Requer Correção Imediata

#### 1. Definição de "Pedido Ativo" Não Está Clara

**Problema:** Dev Notes menciona "Pedido ativo: Status diferente de 'Pronto' OU status 'Pronto' há menos de X horas (ex: 2 horas) - verificar requisitos de negócio" e "buscar pedidos onde `customer_phone = {telefone}` e status é 'Recebido' ou 'Em Preparo' (ou 'Pronto' recente)". Mas não há AC definindo o que é considerado "pedido ativo" para busca.

**Impacto:** Pode haver inconsistência sobre quais pedidos devem aparecer na busca. Se pedido está "Pronto" há 5 horas, deve aparecer? E se for "Pronto" há 1 hora?

**Recomendação:**
- Adicionar AC 1.5.17: "A busca por telefone deve retornar apenas pedidos com status 'Recebido' ou 'Em Preparo', ou pedidos com status 'Pronto' criados há menos de 2 horas (configurável). Pedidos 'Pronto' mais antigos não devem aparecer na busca."
- Ou especificar: "Pedidos ativos são aqueles com status 'Recebido' ou 'Em Preparo', independentemente da data."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 2. Dependência de Story 3.2 Não Esclarecida

**Problema:** AC 1.5.4 menciona "quando a equipe alterar o status no App Desktop (História 3.2)", mas Story 3.2 ainda não existe ou não foi criada. A funcionalidade de atualização em tempo real depende de funcionalidade do Desktop que não está disponível.

**Impacto:** Similar aos problemas das Stories anteriores. A story não pode ser testada completamente sem definir como o status será alterado no Desktop.

**Recomendação:**
- Opção A: Criar Story 3.2 antes ou em paralelo
- Opção B: Manter nota no AC: "Nota: A alteração de status será feita pela equipe no App Desktop (Story 3.2). Até lá, pode ser testada alterando status diretamente no Supabase."
- Opção C: Aceitar AC 1.5.4 com nota de que Realtime será testado quando Story 3.2 estiver disponível

**Ação:** ⚠️ **BLOQUEADOR** - Esclarecer antes de iniciar desenvolvimento (mas nota já existe no AC)

#### 3. Falta AC sobre Timeout ao Buscar Pedido

**Problema:** AC 1.5.7 menciona "erro ao buscar pedido no Supabase (ex: erro de rede)", mas não especifica comportamento em caso de timeout (ex: rede lenta, Supabase temporariamente indisponível).

**Impacto:** Usuário pode ficar com indicador de carregamento indefinidamente.

**Recomendação:**
- Adicionar AC 1.5.18: "Se houver timeout ao buscar pedido no Supabase (ex: rede lenta, Supabase temporariamente indisponível), o sistema deve exibir mensagem de erro apropriada (ex: 'Tempo de espera esgotado. Tente novamente.') após período razoável (ex: 30 segundos) e permitir tentar novamente."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 4. Falta AC sobre Comportamento quando Realtime Desconecta

**Problema:** Subtask 6.5 menciona "Tratar erros de conexão realtime (exibir mensagem apropriada se desconectar)", mas não há AC definindo esse comportamento.

**Impacto:** UX pode ficar inconsistente - usuário pode não saber que conexão caiu e status não está atualizando em tempo real.

**Recomendação:**
- Adicionar AC 1.5.19: "Se a conexão Realtime for perdida durante o acompanhamento do pedido, o sistema deve exibir mensagem informativa (ex: 'Conexão perdida. Tentando reconectar...') e tentar reconectar automaticamente. Se reconexão falhar após múltiplas tentativas, o sistema deve exibir mensagem e permitir atualização manual (botão 'Atualizar')."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

#### 5. Falta AC sobre Validação de ID do Pedido na URL

**Problema:** AC 1.5.1 menciona acesso com ID do pedido na URL, mas não especifica o que acontece se o ID for inválido (não UUID válido) ou malformado.

**Impacto:** Pode causar erro na página ou comportamento inconsistente.

**Recomendação:**
- Adicionar AC 1.5.20: "Se o ID do pedido na URL for inválido (não UUID válido ou malformado), a página deve validar o formato antes de buscar no Supabase e exibir mensagem de erro apropriada (ex: 'ID do pedido inválido') sem tentar buscar no banco."

**Ação:** 🔴 **CRÍTICO** - Adicionar antes de aprovar

### 🟡 IMPORTANTE - Melhorias Recomendadas

#### 6. Falta AC sobre Busca por Telefone para "Consumo no Local"

**Problema:** AC 1.5.2 menciona busca por telefone, mas pedidos "Consumo no Local" não têm telefone (têm número da mesa). Como um cliente que fez pedido "Consumo no Local" pode buscar seu pedido?

**Impacto:** Funcionalidade pode estar incompleta - clientes de "Consumo no Local" não conseguem buscar pedidos.

**Recomendação:**
- Adicionar AC 1.5.21: "Para pedidos 'Consumo no Local', a busca deve ser feita por número da mesa ao invés de telefone. O sistema deve permitir buscar pedidos ativos por número da mesa (mesma validação: número positivo entre 1 e 999)."
- Ou adicionar nota: "Nota: Pedidos 'Consumo no Local' serão buscados por número da mesa. Ver Story X para implementação."

**Ação:** 🟡 **IMPORTANTE** - Esclarecer antes de aprovar

#### 7. Falta AC sobre Limite de Tempo para Exibir Pedidos "Pronto"

**Problema:** Dev Notes menciona "Pedido ativo: Status diferente de 'Pronto' OU status 'Pronto' há menos de X horas (ex: 2 horas)", mas não está claro no AC. Se um pedido está "Pronto" há 3 horas, ainda deve aparecer na busca?

**Impacto:** Pode causar confusão sobre quais pedidos aparecem na busca.

**Recomendação:**
- Adicionar ao AC 1.5.17 (criar): "Pedidos com status 'Pronto' criados há mais de 2 horas não devem aparecer na busca por telefone (considerar finalizados)."

**Ação:** 🟡 **IMPORTANTE** - Esclarecer no AC

#### 8. Falta AC sobre Atualização Manual do Status

**Problema:** Não há AC permitindo que o usuário atualize o status manualmente se Realtime não estiver funcionando ou se quiser verificar atualização.

**Impacto:** Se Realtime falhar, usuário não tem como atualizar status sem recarregar página.

**Recomendação:**
- Adicionar AC 1.5.22: "A página deve ter um botão 'Atualizar' que permite buscar o status atual do pedido manualmente do Supabase, atualizando a página sem recarregar completamente."

**Ação:** 🟡 **IMPORTANTE** - Adicionar para melhorar UX

#### 9. Falta AC sobre Comportamento quando ID do Pedido Não Existe

**Problema:** AC 1.5.6 menciona "pedido não encontrado", mas não especifica se isso inclui quando ID é válido (UUID) mas não existe no banco versus quando ID é inválido (não UUID).

**Impacto:** Pode causar confusão sobre mensagens de erro diferentes.

**Recomendação:**
- Melhorar AC 1.5.6: "Se o pedido não for encontrado (ID válido mas não existe no banco, telefone não corresponde a pedido ativo, ou ID inválido na URL), a página deve exibir mensagem apropriada..."

**Ação:** 🟡 **IMPORTANTE** - Esclarecer no AC

#### 10. Falta AC sobre Formatação de Data/Hora

**Problema:** AC 1.5.5 menciona "data/hora de criação", mas não especifica formato de exibição.

**Impacto:** Pode causar inconsistência na formatação de datas.

**Recomendação:**
- Adicionar nota técnica: "Formato sugerido: 'DD/MM/YYYY às HH:MM' (ex: '15/12/2024 às 14:30')"
- Ou adicionar AC: "A data/hora deve ser formatada em formato brasileiro legível (ex: '15/12/2024 às 14:30')."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

#### 11. Falta AC sobre Exibição de Itens do Pedido

**Problema:** AC 1.5.5 menciona "informações básicas do pedido" mas não especifica se deve incluir lista de itens do pedido (opcional).

**Impacto:** Pode causar inconsistência sobre o que exibir na página de tracking.

**Recomendação:**
- Adicionar nota técnica: "A lista de itens do pedido pode ser exibida opcionalmente, mas não é obrigatória para esta story."
- Ou adicionar AC: "A página deve permitir expandir/colapsar lista de itens do pedido (opcional)."

**Ação:** 🟢 **SUGESTÃO** - Adicionar se relevante

---

## 📋 Checklist de Aprovação

### Requisitos Funcionais
- [x] ACs alinhados com PRD
- [x] ACs bem detalhados e testáveis
- [ ] Casos de erro/vazio definidos (faltando timeout, Realtime desconecta, ID inválido)
- [ ] Edge cases considerados (faltando definição de pedido ativo, busca por mesa)

### Requisitos Técnicos
- [x] POO mencionado como obrigatório
- [x] TypeScript mencionado como obrigatório
- [x] Classes POO especificadas com métodos
- [x] Integração com Supabase definida
- [x] Realtime Subscription especificada
- [ ] Definição de "pedido ativo" esclarecida (faltando AC)

### Dependências
- [ ] Story 3.2 depende de Story 3.2 (não resolvida, mas nota existe no AC)
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
1. 🔴 **Adicionar AC para definição de "pedido ativo"** - AC 1.5.17
2. 🔴 **Adicionar AC para timeout ao buscar pedido** - AC 1.5.18
3. 🔴 **Adicionar AC para Realtime desconecta** - AC 1.5.19
4. 🔴 **Adicionar AC para validação de ID na URL** - AC 1.5.20

### Prioridade Média (Importante)
5. 🟡 **Esclarecer busca por "Consumo no Local"** - AC 1.5.21 ou nota
6. 🟡 **Esclarecer limite de tempo para pedidos "Pronto"** - No AC 1.5.17
7. 🟡 **Adicionar AC para atualização manual** - AC 1.5.22
8. 🟡 **Melhorar AC 1.5.6 sobre pedido não encontrado** - Esclarecer diferentes casos

### Prioridade Baixa (Sugestões)
9. 🟢 **Adicionar nota sobre formatação de data/hora** - Se relevante
10. 🟢 **Adicionar nota sobre exibição de itens do pedido** - Se relevante

---

## 📝 Recomendações de Refinamento

### 1. Adicionar novos ACs:

```
AC 1.5.17: A busca por telefone deve retornar apenas pedidos com status 'Recebido' ou 'Em Preparo', ou pedidos com status 'Pronto' criados há menos de 2 horas. Pedidos 'Pronto' mais antigos não devem aparecer na busca (considerar finalizados).

AC 1.5.18: Se houver timeout ao buscar pedido no Supabase (ex: rede lenta, Supabase temporariamente indisponível), o sistema deve exibir mensagem de erro apropriada (ex: "Tempo de espera esgotado. Tente novamente.") após período razoável (ex: 30 segundos) e permitir tentar novamente.

AC 1.5.19: Se a conexão Realtime for perdida durante o acompanhamento do pedido, o sistema deve exibir mensagem informativa (ex: "Conexão perdida. Tentando reconectar...") e tentar reconectar automaticamente. Se reconexão falhar após múltiplas tentativas (ex: 3 tentativas), o sistema deve exibir mensagem e permitir atualização manual através de botão "Atualizar".

AC 1.5.20: Se o ID do pedido na URL for inválido (não UUID válido ou malformado), a página deve validar o formato antes de buscar no Supabase e exibir mensagem de erro apropriada (ex: "ID do pedido inválido") sem tentar buscar no banco.

AC 1.5.21: Para pedidos "Consumo no Local", a busca deve ser feita por número da mesa ao invés de telefone. O sistema deve permitir buscar pedidos ativos por número da mesa (mesma validação: número positivo entre 1 e 999). **Nota:** Se esta funcionalidade não for implementada nesta story, adicionar nota indicando que será implementada em story futura.

AC 1.5.22: A página deve ter um botão "Atualizar" que permite buscar o status atual do pedido manualmente do Supabase, atualizando a página sem recarregar completamente. Este botão deve estar visível quando Realtime não estiver funcionando ou quando usuário quiser verificar atualização manual.
```

### 2. Melhorar AC 1.5.6:

```
AC 1.5.6: Se o pedido não for encontrado, a página deve exibir mensagem apropriada:
- Se ID inválido na URL: "ID do pedido inválido"
- Se ID válido mas não existe no banco: "Pedido não encontrado"
- Se telefone não corresponde a pedido ativo: "Nenhum pedido ativo encontrado para este telefone"
```

### 3. Melhorar AC 1.5.4:

```
AC 1.5.4: A atualização de status na página do cliente deve ocorrer em tempo real (via Supabase Realtime Subscription) assim que a equipe alterar o status no App Desktop (História 3.2). **Nota:** A alteração de status será feita pela equipe no App Desktop (Story 3.2). Até lá, pode ser testada alterando status diretamente no Supabase.
```

### 4. Adicionar na Task 1:

```
- [ ] Subtask 1.5: Implementar filtro para pedidos "Pronto" criados há menos de 2 horas (AC 1.5.17)
- [ ] Subtask 1.6: Implementar método estático `Order.findByTableNumber(tableNumber: number): Promise<Order[]>` para buscar pedidos ativos por número da mesa (se AC 1.5.21 aprovado)
```

### 5. Adicionar na Task 3:

```
- [ ] Subtask 3.7: Implementar timeout ao buscar pedido (30 segundos) e exibir mensagem de erro se timeout ocorrer (AC 1.5.18)
- [ ] Subtask 3.8: Validar formato de ID do pedido na URL antes de buscar (AC 1.5.20)
```

### 6. Adicionar na Task 6:

```
- [ ] Subtask 6.6: Implementar reconexão automática do Realtime se conexão cair (máximo 3 tentativas) (AC 1.5.19)
- [ ] Subtask 6.7: Exibir mensagem informativa quando Realtime desconectar e permitir atualização manual (AC 1.5.19)
```

### 7. Adicionar na Task 7:

```
- [ ] Subtask 7.5: Implementar timeout ao buscar pedido (30 segundos) e exibir mensagem de erro apropriada se timeout ocorrer (AC 1.5.18)
- [ ] Subtask 7.6: Validar formato de ID do pedido na URL antes de buscar (AC 1.5.20)
```

### 8. Adicionar nova Task:

```
- [ ] Task 9: Implementar atualização manual de status (AC: 1.5.22)
  - [ ] Subtask 9.1: Adicionar botão "Atualizar" na página de tracking
  - [ ] Subtask 9.2: Implementar busca manual do status atual do pedido ao clicar
  - [ ] Subtask 9.3: Exibir botão quando Realtime não estiver funcionando ou sempre visível
```

### 9. Adicionar seção em Dev Notes > Validações e Regras de Negócio:

```
- **Pedido ativo:** Pedidos com status 'Recebido' ou 'Em Preparo', ou pedidos 'Pronto' criados há menos de 2 horas (AC 1.5.17)
- **Timeout ao buscar:** Implementar timeout de 30 segundos e exibir mensagem de erro apropriada se timeout ocorrer (AC 1.5.18)
- **Validação de ID:** Validar formato de UUID antes de buscar pedido no Supabase (AC 1.5.20)
- **Realtime desconecta:** Exibir mensagem informativa e tentar reconectar automaticamente (máximo 3 tentativas) (AC 1.5.19)
- **Atualização manual:** Permitir atualizar status manualmente através de botão "Atualizar" (AC 1.5.22)
- **Busca por mesa:** Para pedidos "Consumo no Local", buscar por número da mesa ao invés de telefone (AC 1.5.21 - se aprovado)
```

---

## 🎯 Decisão da Review

**Status:** ⚠️ **REQUER CORREÇÕES ANTES DE APROVAÇÃO**

**Justificativa:** A story tem excelente base e demonstra aprendizado das stories anteriores. No entanto, possui 5 bloqueadores críticos que impedem desenvolvimento completo:
1. Falta definição clara de "pedido ativo"
2. Falta AC para timeout ao buscar pedido
3. Falta AC para Realtime desconecta
4. Falta AC para validação de ID na URL
5. Falta esclarecimento sobre busca por "Consumo no Local"

**Próximos Passos:**
1. Product Owner (Sarah) deve:
   - Aprovar novos ACs propostos (1.5.17-1.5.22)
   - Decidir se busca por mesa será implementada nesta story ou em story futura

2. Scrum Master deve:
   - Aplicar correções recomendadas na story
   - Reenviar para review após correções

3. Após correções, story pode ser aprovada para desenvolvimento.

---

## 📌 Notas Finais

A story demonstra excelente qualidade geral e atenção aos detalhes. As correções necessárias são principalmente sobre completude, casos de erro e definições de negócio, não sobre problemas estruturais fundamentais. A story mostra aprendizado consistente das Stories anteriores ao incorporar melhorias e referenciar padrões estabelecidos.

**Comparação com Stories Anteriores:**
- ✅ Melhor: Realtime Subscription bem especificada desde o início
- ✅ Melhor: Validações e regras de negócio já bem documentadas
- ✅ Melhor: Mais ACs extras bem justificados
- ⚠️ Similar: Mesma dependência de story Desktop não resolvida (mas nota já existe no AC)

**Destaques:**
- Excelente trabalho em especificar Realtime Subscription
- Boa separação de responsabilidades nas tasks
- Aprendizados da Story 1.4 bem incorporados
- Boa cobertura de casos de erro e validações

**Áreas de Melhoria:**
- Necessita mais atenção a definições de negócio ("pedido ativo")
- Necessita esclarecimento sobre busca por "Consumo no Local"
- Necessita mais casos de erro (timeout, Realtime desconecta)

**Tempo estimado para correções:** 2-3 horas  
**Próxima review:** Após aplicação das correções críticas

---

**Reviewer:** Sarah  
**Data:** 2024  
**Versão do Review:** 1.0


# Guia Rápido: Gerenciamento de Pedidos

## 📍 Acesso

**URL:** `/admin/orders`  
**Menu:** Sidebar → "Pedidos"  
**Permissão:** Apenas administradores

## 🎯 Funcionalidades

### 1️⃣ Visualizar Pedidos

**Informações exibidas:**
- **ID do Pedido**: Últimos 8 caracteres (ex: `a1b2c3d4`)
- **Cliente/Mesa**: Nome e telefone (Retirada) ou Número da mesa (Consumo no Local)
- **Tipo**: Retirada ou Consumo no Local
- **Status**: Recebido (azul), Em Preparo (amarelo), Pronto (verde)
- **Total**: Valor total do pedido
- **Horário**: Hora de criação do pedido

### 2️⃣ Contadores de Status

No topo da página, você vê:
- **Recebidos** (azul): Pedidos aguardando preparo
- **Em Preparo** (amarelo): Pedidos sendo preparados
- **Prontos** (verde): Pedidos finalizados

### 3️⃣ Filtrar Pedidos

**Filtro de Status:**
- **Todos**: Exibe todos os pedidos
- **Recebido**: Apenas pedidos aguardando preparo
- **Em Preparo**: Apenas pedidos em preparação
- **Pronto**: Apenas pedidos finalizados

**Filtro de Tipo:**
- **Todos**: Exibe todos os tipos
- **Retirada**: Apenas pedidos para retirada
- **Consumo no Local**: Apenas pedidos para consumo no local

**Filtro de Período:**
- **Hoje**: Pedidos de hoje
- **Últimos 7 dias**: Pedidos da última semana
- **Últimos 30 dias**: Pedidos do último mês
- **Personalizado**: Escolha datas específicas

**Período Personalizado:**
1. Clique em "Personalizado"
2. Selecione Data Inicial e Data Final
3. Clique em "Limpar" para resetar

### 4️⃣ Alterar Status do Pedido

**Fluxo de Status:**
```
Recebido → Em Preparo → Pronto
```

**Como alterar:**
1. Localize o pedido na lista
2. Clique no botão de ação:
   - **"Iniciar Preparo"** (para pedidos Recebidos)
   - **"Marcar Pronto"** (para pedidos Em Preparo)
3. ✅ Status atualizado automaticamente
4. ✅ Cliente recebe notificação em tempo real (se estiver acompanhando)

**Importante:**
- ❌ Não é possível voltar status (ex: Pronto → Recebido)
- ✅ Apenas progressão é permitida
- ✅ Cliente é notificado automaticamente via Realtime

### 5️⃣ Ver Detalhes do Pedido

**Como fazer:**
1. Clique em **"Ver Detalhes"** no pedido desejado
2. Modal abre mostrando:
   - Informações do pedido (ID, tipo, cliente/mesa, status, horário)
   - Lista completa de itens
   - Opcionais selecionados em cada item
   - Observações (se houver)
   - Resumo financeiro (subtotal, desconto, total)

**Informações no Modal:**
- **Itens**: Nome, quantidade, preço unitário, total
- **Opcionais**: Nome e preço adicional (se houver)
- **Observações**: Notas especiais do cliente
- **Cupom**: Código e desconto aplicado (se houver)
- **Resumo**: Subtotal, desconto, total

### 6️⃣ Atualização Automática

**Polling Automático:**
- ✅ Lista atualiza automaticamente a cada 30 segundos
- ✅ Indicador "Atualizado há Xs" no topo
- ✅ Polling pausa quando você troca de aba
- ✅ Polling retoma quando você volta para a aba

**Notificação ao Cliente:**
- ✅ Quando você altera o status, o cliente recebe notificação instantânea
- ✅ Status atualiza na tela do cliente sem precisar recarregar
- ⚠️ Se a notificação falhar, você verá um aviso (mas o status é atualizado)

## 📋 Exemplos de Uso

### Exemplo 1: Receber e Preparar Pedido

**Cenário:** Novo pedido de retirada chegou

1. Acesse `/admin/orders`
2. Veja o pedido na lista com status **Recebido** (badge azul)
3. Clique em **"Ver Detalhes"** para conferir os itens
4. Clique em **"Iniciar Preparo"**
5. ✅ Status muda para **Em Preparo** (badge amarelo)
6. ✅ Cliente vê atualização na tela de acompanhamento
7. Quando finalizar, clique em **"Marcar Pronto"**
8. ✅ Status muda para **Pronto** (badge verde)
9. ✅ Cliente é notificado que pode retirar

### Exemplo 2: Filtrar Pedidos do Dia

**Cenário:** Ver apenas pedidos de hoje que estão em preparo

1. Acesse `/admin/orders`
2. Clique em **"Em Preparo"** no filtro de status
3. Certifique-se que o período está em **"Hoje"**
4. ✅ Lista mostra apenas pedidos em preparo de hoje

### Exemplo 3: Buscar Pedidos Antigos

**Cenário:** Revisar pedidos da última semana

1. Acesse `/admin/orders`
2. Clique em **"Últimos 7 dias"** no filtro de período
3. Clique em **"Todos"** no filtro de status
4. ✅ Lista mostra todos os pedidos dos últimos 7 dias

## 🚨 Problemas Comuns

**"Tempo de espera esgotado"**
- ✅ Tente novamente
- ✅ Verifique sua conexão com a internet
- ✅ Se persistir, recarregue a página

**"Transição de status inválida"**
- ✅ Você tentou voltar um status (ex: Pronto → Recebido)
- ✅ Apenas progressão é permitida
- ✅ Recarregue a página para ver o status correto

**"Status atualizado, mas notificação ao cliente pode ter falhado"**
- ✅ O status foi atualizado no banco de dados
- ✅ A notificação em tempo real para o cliente pode ter falhado
- ✅ Cliente ainda pode ver o status atualizado ao recarregar a página
- ✅ Isso é raro e não afeta a operação

**Pedido não aparece na lista**
- ✅ Verifique os filtros aplicados
- ✅ Aguarde até 30 segundos para atualização automática
- ✅ Recarregue a página manualmente

## 💡 Dicas

### Organização do Fluxo

1. **Manhã**: Filtre por "Recebido" para ver pedidos aguardando
2. **Durante o dia**: Alterne entre "Em Preparo" e "Pronto"
3. **Fim do dia**: Use "Últimos 7 dias" para revisar

### Eficiência

- ✅ Use os contadores no topo para ter visão rápida
- ✅ Mantenha a aba aberta para atualização automática
- ✅ Use "Ver Detalhes" antes de iniciar preparo
- ✅ Marque como "Pronto" assim que finalizar

### Comunicação com Cliente

- ✅ Cliente recebe notificação instantânea
- ✅ Status atualiza automaticamente na tela dele
- ✅ Não precisa ligar ou enviar mensagem

## 🔄 Integração com Cliente

### Como o Cliente Acompanha

1. Cliente faz pedido e recebe link de acompanhamento
2. Cliente acessa `/tracking/{orderId}`
3. Cliente vê status em tempo real
4. Quando você altera status no admin:
   - ✅ Status atualiza automaticamente na tela do cliente
   - ✅ Sem necessidade de refresh
   - ✅ Máximo 3 segundos de delay

### Fluxo Completo

```
Cliente faz pedido → Status: Recebido (azul)
         ↓
Admin clica "Iniciar Preparo" → Status: Em Preparo (amarelo)
         ↓
Admin clica "Marcar Pronto" → Status: Pronto (verde)
         ↓
Cliente retira o pedido
```

## 🔒 Segurança

### Permissões

- ✅ Apenas **administradores** podem acessar `/admin/orders`
- ✅ Clientes não têm acesso à lista de pedidos
- ✅ Clientes só veem seus próprios pedidos via link específico
- ✅ Políticas RLS (Row Level Security) aplicadas no banco de dados

### Auditoria

- ✅ Todas as alterações de status são registradas em log
- ✅ Log inclui: ID do pedido, status anterior, novo status, admin que alterou, timestamp
- ✅ Logs estruturados em JSON para análise

## 📞 Suporte

Para mais informações técnicas, consulte:
- `docs/stories/2.6.story.md` - Documentação técnica completa
- `src/domain/entities/Order.ts` - Lógica de negócio
- `app/api/admin/orders/route.ts` - API endpoints

---

**Última atualização:** 2024-11-09  
**Versão:** 1.0


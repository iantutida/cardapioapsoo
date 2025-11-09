# Guia Rápido: Gerenciamento de Cupons de Desconto

## 📍 Acesso

**URL:** `/admin/coupons`  
**Menu:** Sidebar → "Cupons"  
**Permissão:** Apenas administradores

## 🎯 Funcionalidades

### 1️⃣ Criar Cupom

**Como fazer:**
1. Clique em **"Novo Cupom"** (botão verde no topo)
2. Preencha:
   - **Código**: Ex: "PROMO10" (3-20 caracteres, será convertido para MAIÚSCULAS)
   - **Tipo de Desconto**: Percentual (%) ou Fixo (R$)
   - **Valor**: 
     - Percentual: 1-100%
     - Fixo: Qualquer valor > R$ 0,00
   - **Status**: Ativo (visível para clientes) ou Inativo (oculto)
3. Clique em **"Criar"**
4. ✅ Cupom aparece na lista

**Preview:**
- Enquanto você digita o código, vê o preview em MAIÚSCULAS
- A unidade (% ou R$) muda automaticamente conforme o tipo selecionado

### 2️⃣ Editar Cupom

**Como fazer:**
1. Localize o cupom na lista
2. Clique em **"Editar"**
3. Altere os dados desejados
4. Clique em **"Atualizar"**
5. ✅ Mudanças aplicadas imediatamente

**Nota:** Mudanças no valor ou tipo afetam novos pedidos instantaneamente.

### 3️⃣ Desativar Cupom

**Como fazer:**
1. Localize um cupom **Ativo** na lista
2. Clique em **"Desativar"**
3. Confirme a ação no modal
4. ✅ Cupom fica **Inativo** (não pode mais ser usado pelos clientes)

**Importante:**
- Cupons são **desativados**, não excluídos
- Histórico de pedidos com o cupom é preservado
- Cupons inativos ainda aparecem na lista admin

### 4️⃣ Filtrar Cupons

**Opções de filtro:**
- **Todos**: Exibe todos os cupons (ativos e inativos)
- **Ativos**: Apenas cupons que clientes podem usar
- **Inativos**: Apenas cupons desativados

**Busca:**
- Digite no campo de busca para filtrar por código
- Busca é **case insensitive** (não diferencia maiúsculas/minúsculas)

## 📋 Informações na Listagem

Cada cupom exibe:
- **Código**: Em fonte monoespaçada (ex: PROMO10)
- **Tipo**: Percentual ou Fixo
- **Valor**: Formatado (10% ou R$ 20,00)
- **Status**: Badge verde (Ativo) ou cinza (Inativo)
- **Data de Criação**: Formato DD/MM/AAAA
- **Ações**: Editar / Desativar (se ativo)

## ✅ Validações

### Código
- ✅ Obrigatório
- ✅ 3-20 caracteres
- ✅ Único (não pode duplicar)
- ✅ Convertido automaticamente para MAIÚSCULAS

### Valor
- **Percentual:**
  - ✅ Entre 1% e 100%
  - ✅ Número inteiro
- **Fixo:**
  - ✅ Maior que R$ 0,00
  - ✅ Até 2 casas decimais

## 🎨 Interface

### Estados Visuais

**Loading:**
- Skeleton animado durante carregamento inicial

**Vazio:**
- Mensagem "Nenhum cupom criado"
- Botão CTA "Criar Primeiro Cupom"

**Lista:**
- Tabela responsiva com todos os cupons
- Badges coloridos para status
- Ações inline (Editar/Desativar)

### Feedback

**Toasts:**
- ✅ Sucesso: "Cupom criado/atualizado/desativado com sucesso"
- ❌ Erro: Mensagens específicas (código duplicado, timeout, etc.)

**Spinners:**
- Botão "Salvando..." durante operações
- Botões desabilitados durante processamento

## 🔄 Integração com Checkout

### Como Funciona

1. Cliente adiciona produtos ao carrinho
2. Cliente aplica cupom no checkout
3. Sistema valida:
   - ✅ Cupom existe?
   - ✅ Cupom está ativo?
   - ✅ Código correto?
4. Desconto aplicado automaticamente

### Mudanças em Tempo Real

**Quando você edita um cupom no admin:**
- ✅ Mudanças refletem **imediatamente** no checkout
- ✅ Cache é invalidado automaticamente
- ✅ Clientes veem o novo valor/tipo em até 60 segundos

**Quando você desativa um cupom:**
- ✅ Clientes não conseguem mais aplicá-lo
- ✅ Cupons já aplicados em carrinhos abertos são invalidados

## 💡 Exemplos

### Exemplo 1: Cupom Percentual

```
Código: PROMO10
Tipo: Percentual
Valor: 10
Status: Ativo

Resultado: 10% de desconto em qualquer pedido
```

### Exemplo 2: Cupom Fixo

```
Código: R$5OFF
Tipo: Fixo
Valor: 5.00
Status: Ativo

Resultado: R$ 5,00 de desconto em qualquer pedido
```

### Exemplo 3: Cupom Inativo

```
Código: EXPIRADO
Tipo: Percentual
Valor: 20
Status: Inativo

Resultado: Não pode ser usado pelos clientes
```

## 🚨 Problemas Comuns

**"Código de cupom já existe"**
- ✅ Escolha outro código único
- ✅ Códigos são case-insensitive (PROMO10 = promo10)

**"Botão Salvar está desabilitado"**
- ✅ Verifique se todos os campos obrigatórios estão preenchidos
- ✅ Código deve ter 3-20 caracteres
- ✅ Valor deve estar dentro dos limites (1-100% ou > R$ 0,00)

**"Tempo de espera esgotado"**
- ✅ Tente novamente
- ✅ Seus dados foram preservados no formulário
- ✅ Verifique sua conexão com a internet

**"Cupom não aparece no checkout"**
- ✅ Verifique se o status está "Ativo"
- ✅ Aguarde até 60 segundos para sincronização
- ✅ Recarregue a página do checkout

## 🔒 Segurança

### Permissões

- ✅ Apenas **administradores** podem criar/editar/desativar cupons
- ✅ Clientes podem apenas **validar** cupons ativos no checkout
- ✅ Políticas RLS (Row Level Security) aplicadas no banco de dados

### Auditoria

- ✅ Data de criação registrada
- ✅ Data de última atualização registrada
- ✅ Histórico preservado (soft delete)

## 📞 Suporte

Para mais informações técnicas, consulte:
- `docs/stories/2.5.story.md` - Documentação técnica completa
- `src/domain/entities/Coupon.ts` - Lógica de negócio
- `app/api/admin/coupons/route.ts` - API endpoints

---

**Última atualização:** 2024-11-08  
**Versão:** 1.0


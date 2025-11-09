# 🎯 Guia Rápido: Gerenciar Opcionais

## Acesso

1. Faça login como admin em `/admin/login`
2. Acesse `/admin/options` pelo menu lateral

## 📋 Passo a Passo

### 1️⃣ Criar Grupo de Opcionais

**O que é:** Um grupo organiza opcionais relacionados (ex: "Adicionais", "Bebidas", "Tamanhos")

**Como fazer:**
1. Clique em **"Novo Grupo"** (botão azul no topo)
2. Preencha:
   - **Nome**: Ex: "Adicionais" (3-40 caracteres)
   - **Tipo de Seleção**:
     - ✅ **Seleção Única**: Cliente escolhe apenas UMA opção (ex: tamanho da pizza)
     - ✅ **Seleção Múltipla**: Cliente pode escolher VÁRIAS opções (ex: adicionais no hambúrguer)
3. Clique em **"Criar"**
4. ✅ Grupo aparece na sidebar à esquerda

### 2️⃣ Criar Opcional

**O que é:** Um item que o cliente pode adicionar ao produto (ex: "Bacon Extra", "Coca-Cola")

**Como fazer:**
1. Clique em **"Novo Opcional"** (botão verde no topo)
2. Preencha:
   - **Nome**: Ex: "Bacon Extra" (3-60 caracteres)
   - **Preço Adicional**: Ex: "5.50" (use 0.00 para sem custo)
   - **Grupo**: Selecione o grupo criado anteriormente
3. Clique em **"Criar"**
4. ✅ Opcional aparece na lista à direita

### 3️⃣ Editar

**Grupo:**
1. Clique no grupo na sidebar para selecioná-lo
2. Clique em **"Editar"** (aparece abaixo do nome do grupo)
3. Altere os dados
4. Clique em **"Atualizar"**

**Opcional:**
1. Clique no opcional na lista
2. Clique em **"Editar"**
3. Altere os dados
4. Clique em **"Atualizar"**

### 4️⃣ Excluir

**Grupo:**
1. Selecione o grupo na sidebar
2. Clique em **"Excluir"**
3. Confirme (⚠️ todos os opcionais do grupo serão removidos)

**Opcional:**
1. Clique em **"Excluir"** no opcional
2. Confirme

> 💡 **Nota:** Se o opcional já foi usado em pedidos, ele será ocultado mas não removido (para manter o histórico).

## 💡 Exemplos Práticos

### Exemplo 1: Hambúrguer com Adicionais

```
1. Criar Grupo:
   Nome: "Adicionais"
   Tipo: Seleção Múltipla ✅

2. Criar Opcionais:
   ✅ Bacon Extra - R$ 5,00
   ✅ Queijo Cheddar - R$ 3,50
   ✅ Ovo - R$ 2,00
   ✅ Cebola Caramelizada - R$ 0,00 (sem custo)
```

### Exemplo 2: Pizza com Tamanhos

```
1. Criar Grupo:
   Nome: "Tamanhos"
   Tipo: Seleção Única ✅

2. Criar Opcionais:
   ✅ Pequena (4 fatias) - R$ 0,00
   ✅ Média (6 fatias) - R$ 10,00
   ✅ Grande (8 fatias) - R$ 20,00
```

### Exemplo 3: Combo com Bebida

```
1. Criar Grupo:
   Nome: "Bebidas"
   Tipo: Seleção Única ✅

2. Criar Opcionais:
   ✅ Coca-Cola 350ml - R$ 5,50
   ✅ Guaraná 350ml - R$ 5,00
   ✅ Suco Natural - R$ 8,00
   ✅ Sem bebida - R$ 0,00
```

## 🔗 Associar com Produtos

Após criar grupos e opcionais, associe-os aos produtos:

**Via API (temporário):**
```bash
curl -X PUT http://localhost:3000/api/admin/products/<PRODUCT_ID>/option-groups \
  -H "Cookie: sb-auth-token=..." \
  -H "Content-Type: application/json" \
  -d '{"optionGroupIds": ["<GRUPO_ID_1>", "<GRUPO_ID_2>"]}'
```

**Resultado:**
- Os opcionais aparecem no modal do produto em `/menu`
- Cliente pode selecionar conforme o tipo (única/múltipla)
- Preço é calculado automaticamente

## ✅ Validações

### Grupo
- ✅ Nome: 3-40 caracteres
- ✅ Tipo: obrigatório

### Opcional
- ✅ Nome: 3-60 caracteres
- ✅ Preço: >= 0 (não pode ser negativo)
- ✅ Grupo: obrigatório

## 🎨 Interface

### Sidebar (Esquerda)
- Lista de grupos
- Contagem de opcionais por grupo
- Badge do tipo (Única/Múltipla)
- Botões Editar/Excluir quando selecionado

### Painel Principal (Direita)
- Lista de opcionais
- Preço formatado (R$ ou "Sem custo adicional")
- Nome do grupo
- Botões Editar/Excluir

## 🚀 Dicas

1. **Crie os grupos primeiro**, depois os opcionais
2. **Use preço 0.00** para opcionais sem custo adicional
3. **Seleção Única** = cliente escolhe apenas 1 (ex: tamanho)
4. **Seleção Múltipla** = cliente escolhe quantos quiser (ex: adicionais)
5. **Não pode excluir grupo com opcionais?** É proposital! Exclua os opcionais primeiro ou confirme a exclusão em massa.

## ❓ Problemas Comuns

**"Não consigo criar opcional"**
- ✅ Crie um grupo primeiro

**"Botão Salvar está desabilitado"**
- ✅ Verifique se todos os campos estão preenchidos corretamente
- ✅ Nome deve ter tamanho válido
- ✅ Preço não pode ser negativo

**"Opcional não aparece no menu"**
- ✅ Verifique se o opcional está associado ao produto
- ✅ Use a API de associação (ver seção "Associar com Produtos")

## 📞 Suporte

Para mais informações, consulte:
- `docs/stories/2.4.features-completas.md` - Documentação completa
- `docs/stories/2.4.completion.md` - Detalhes técnicos


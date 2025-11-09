# 🎯 Guia Rápido: Gerenciar Produtos & Categorias

## Acesso

1. Faça login como admin em `/admin/login`
2. Acesse `/admin/products` pelo menu lateral

## 📋 Passo a Passo

### 1️⃣ Criar Categoria

**O que é:** Uma categoria organiza produtos relacionados (ex: "Lanches", "Bebidas", "Sobremesas")

**Como fazer:**
1. Clique em **"Nova Categoria"** (botão azul no topo)
2. Preencha:
   - **Nome**: Ex: "Lanches" (3-60 caracteres)
3. Clique em **"Criar"**
4. ✅ Categoria aparece na sidebar à esquerda (sempre ativa por padrão)

### 2️⃣ Criar Produto

**O que é:** Um item do seu cardápio que os clientes podem pedir

**Como fazer:**
1. Clique em **"Novo Produto"** (botão verde no topo)
2. Preencha:
   - **Nome**: Ex: "Hambúrguer Especial" (3-120 caracteres)
   - **Descrição**: Opcional, descreva ingredientes e características
   - **Preço (R$)**: Ex: "25.90" (deve ser maior que zero)
   - **Categoria**: Selecione a categoria criada anteriormente
   - **Status**: 
     - ✅ **Ativo**: Visível no cardápio público
     - ❌ **Inativo**: Oculto (útil para produtos temporariamente indisponíveis)
3. Clique em **"Criar"**
4. ✅ Produto aparece na lista à direita

### 3️⃣ Editar

**Categoria:**
1. Clique na categoria na sidebar para selecioná-la
2. Clique em **"Editar"** (aparece abaixo do nome)
3. Altere os dados
4. Clique em **"Atualizar"**

**Produto:**
1. Clique em **"Editar"** no card do produto
2. Altere os dados
3. Clique em **"Atualizar"**

### 4️⃣ Excluir

**Categoria:**
1. Selecione a categoria na sidebar
2. Clique em **"Excluir"**
3. Confirme

**Produto:**
1. Clique em **"Excluir"** no card do produto
2. Confirme

> ⚠️ **Atenção:** Exclusões são permanentes e não podem ser desfeitas.

## 💡 Exemplos Práticos

### Exemplo 1: Criar Cardápio de Lanchonete

```
1. Criar Categorias:
   ✅ Lanches
   ✅ Bebidas
   ✅ Sobremesas
   ✅ Acompanhamentos

2. Criar Produtos em "Lanches":
   ✅ Hambúrguer Clássico - R$ 18,90
   ✅ Hambúrguer Especial - R$ 25,90
   ✅ Hot Dog - R$ 12,00

3. Criar Produtos em "Bebidas":
   ✅ Coca-Cola 350ml - R$ 5,50
   ✅ Suco Natural - R$ 8,00
```

### Exemplo 2: Produto com Descrição

```
1. Clique em "Novo Produto"
2. Preencha:
   Nome: "Pizza Margherita"
   Descrição: "Molho de tomate, mussarela, manjericão fresco"
   Preço: 45.00
   Categoria: Pizzas
   Status: Ativo
3. Clique em "Criar"
4. ✅ Produto aparece no cardápio
```

## ✅ Validações

### Categoria
- ✅ Nome: 3-60 caracteres
- ✅ Nome obrigatório

### Produto
- ✅ Nome: 3-120 caracteres
- ✅ Preço: maior que zero
- ✅ Categoria: obrigatória

## 🎨 Interface

### Sidebar (Esquerda)
- Lista de categorias
- Contagem de produtos por categoria
- Botões Editar/Excluir quando selecionada

### Painel Principal (Direita)
- Cards de produtos com:
  - Nome do produto
  - Preço formatado (R$)
  - Badge de status (Ativo/Inativo)
  - Botões Editar/Excluir

## 🚀 Dicas

1. **Crie as categorias primeiro**, depois os produtos
2. **Status Inativo** é útil para produtos temporariamente indisponíveis (sem precisar excluir)
3. **Descrições claras** ajudam o cliente a decidir
4. **Organize por categoria** facilita a navegação no cardápio

## 🔄 Sincronização com Cardápio Público

- Mudanças aparecem em `/menu` em até **60 segundos**
- Produtos **Inativos** são automaticamente **ocultos**
- Produtos **Ativos** são automaticamente **exibidos**
- Categorias são sempre ativas por padrão

## ❓ Problemas Comuns

**"Não consigo criar produto"**
- ✅ Crie uma categoria primeiro

**"Botão Salvar está desabilitado"**
- ✅ Verifique se todos os campos obrigatórios estão preenchidos
- ✅ Nome deve ter tamanho válido
- ✅ Preço deve ser maior que zero

**"Produto não aparece no cardápio"**
- ✅ Verifique se o status está "Ativo"
- ✅ Aguarde até 60 segundos para sincronização

## 📞 Suporte

Para mais informações, consulte:
- `docs/stories/2.3.story.md` - Documentação técnica completa
- `/menu` - Visualize o cardápio público


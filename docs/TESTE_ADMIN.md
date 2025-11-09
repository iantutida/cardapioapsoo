# Guia de Teste - Usuário Admin

Este documento fornece todas as informações necessárias para testar o login admin.

## 🔗 Links do Projeto

### Projeto Supabase
- **Project ID:** `xtppkykcrphepfsdxmzu`
- **Region:** `sa-east-1`
- **Dashboard:** Acesse via [Supabase Dashboard](https://supabase.com/dashboard/project/xtppkykcrphepfsdxmzu)

### Aplicação Local
- **URL Local:** `http://localhost:3000` (ou a porta que estiver rodando)
- **URL Login Admin:** `http://localhost:3000/admin/login`

## 👤 Credenciais de Teste

### Usuário Admin de Teste

**Email:** `admin@teste.com`  
**Senha:** `admin123456`

**⚠️ IMPORTANTE:** Você precisa criar este usuário primeiro no Supabase Dashboard antes de poder fazer login.

---

## 📋 Passo a Passo para Criar Usuário Admin

### Opção 1: Via Supabase Dashboard (Recomendado)

1. **Acesse o Supabase Dashboard:**
   - Vá para: https://supabase.com/dashboard/project/xtppkykcrphepfsdxmzu
   - Ou acesse: https://supabase.com/dashboard e selecione o projeto "Cardápio"

2. **Crie o Usuário:**
   - No menu lateral, clique em **Authentication**
   - Clique em **Users**
   - Clique no botão **Add User** → **Create New User**
   - Preencha:
     - **Email:** `admin@teste.com`
     - **Password:** `admin123456`
     - Marque a opção **Auto Confirm User** ✅
   - Clique em **Create User**

3. **Torne o Usuário Admin:**
   - No menu lateral, clique em **SQL Editor**
   - Clique em **New Query**
   - Cole e execute o seguinte SQL:

```sql
-- Tornar o usuário admin
SELECT make_user_admin('admin@teste.com');
```

   - Você deve ver a mensagem: "Usuário admin@teste.com atualizado para role admin com sucesso!"

4. **Verificar se funcionou:**
   - Execute este SQL para verificar:

```sql
SELECT id, email, role 
FROM profiles 
WHERE email = 'admin@teste.com';
```

   - Você deve ver o usuário com `role = 'admin'`

---

### Opção 2: Via SQL Direto (Alternativa)

Se preferir criar tudo via SQL:

1. **Acesse o SQL Editor no Supabase Dashboard**

2. **Execute o seguinte SQL:**

```sql
-- NOTA: Este método requer que você crie o usuário via Dashboard primeiro
-- Após criar o usuário via Dashboard, execute este SQL para torná-lo admin

-- Primeiro, verifique se o usuário existe
SELECT id, email 
FROM auth.users 
WHERE email = 'admin@teste.com';

-- Se o usuário existir, execute:
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'admin@teste.com'
ON CONFLICT (id) 
DO UPDATE 
SET role = 'admin', email = 'admin@teste.com';

-- Verificar resultado
SELECT id, email, role 
FROM profiles 
WHERE email = 'admin@teste.com';
```

---

## 🧪 Como Testar

### 1. Inicie o Servidor Local

```bash
npm run dev
```

O servidor deve iniciar em `http://localhost:3000` (ou outra porta se 3000 estiver ocupada)

### 2. Acesse a Página de Login

Abra seu navegador e vá para:
```
http://localhost:3000/admin/login
```

### 3. Faça Login

- **Email:** `admin@teste.com`
- **Senha:** `admin123456`
- Clique em **Entrar**

### 4. Verifique o Redirecionamento

Após login bem-sucedido, você deve ser redirecionado para:
```
http://localhost:3000/admin/dashboard
```

### 5. Verifique o Layout Admin

Você deve ver:
- ✅ Sidebar à esquerda com menu de navegação
- ✅ Header superior com botão "Logout"
- ✅ Conteúdo da página Dashboard

### 6. Teste o Logout

- Clique no botão **Logout** no header
- Você deve ver um toast de confirmação
- Deve ser redirecionado para `/admin/login`

---

## 🔍 Verificações Adicionais

### Verificar Sessão no Supabase

Você pode verificar se a sessão está sendo criada corretamente:

1. Abra as **Developer Tools** do navegador (F12)
2. Vá para a aba **Application** (Chrome) ou **Storage** (Firefox)
3. Verifique os **Cookies** para `http://localhost:3000`
4. Procure por cookies relacionados ao Supabase (geralmente começam com `sb-`)

### Verificar RLS (Row Level Security)

Para verificar se as políticas RLS estão funcionando:

1. No Supabase Dashboard, vá para **SQL Editor**
2. Execute:

```sql
-- Verificar políticas RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  roles,
  cmd
FROM pg_policies
WHERE tablename IN ('profiles', 'store_settings', 'categories', 'products')
ORDER BY tablename, policyname;
```

---

## ⚠️ Troubleshooting

### Erro: "Email ou senha incorretos"

- Verifique se o usuário foi criado corretamente no Supabase Dashboard
- Verifique se o email está correto: `admin@teste.com`
- Verifique se a senha está correta: `admin123456`
- Verifique se o usuário foi confirmado (Auto Confirm User)

### Erro: "Acesso negado. Apenas administradores podem acessar esta área."

- Verifique se o usuário tem role 'admin' no banco:

```sql
SELECT id, email, role 
FROM profiles 
WHERE email = 'admin@teste.com';
```

- Se o role não for 'admin', execute:

```sql
SELECT make_user_admin('admin@teste.com');
```

### Erro: Redirecionamento para /admin/login mesmo após login

- Verifique se os cookies estão sendo criados corretamente
- Limpe os cookies do navegador e tente novamente
- Verifique o console do navegador para erros

### Erro: Middleware não funciona

- O middleware verifica o cookie `sb-access-token`
- O layout do admin também verifica a sessão usando `getServerSession()`
- Se o middleware falhar, o layout ainda deve proteger a rota

---

## 📝 Notas Importantes

1. **Segurança:** Estas credenciais são apenas para teste local. NUNCA use em produção.

2. **Criação de Usuários:** Em produção, a criação de usuários admin deve ser feita manualmente via Supabase Dashboard ou através de uma interface administrativa dedicada (Story futura).

3. **Senha:** A senha `admin123456` atende ao requisito mínimo de 6 caracteres do Supabase Auth.

4. **Role Admin:** Todos os usuários criados via trigger recebem role 'user' por padrão. Você precisa atualizar manualmente para 'admin' usando a função `make_user_admin()` ou SQL direto.

---

## 🚀 Pronto para Testar!

Após seguir os passos acima, você deve conseguir:
- ✅ Fazer login com `admin@teste.com` / `admin123456`
- ✅ Acessar o painel administrativo
- ✅ Ver o layout com Sidebar e Header
- ✅ Fazer logout

Boa sorte nos testes! 🎉


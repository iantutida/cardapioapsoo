# Como Criar Usuários Administradores

Este documento descreve como criar usuários administradores no sistema.

## Processo de Criação

### Opção 1: Via Supabase Dashboard (Recomendado)

1. Acesse o Supabase Dashboard do projeto
2. Vá para **Authentication** → **Users**
3. Clique em **Add User** → **Create New User**
4. Preencha:
   - **Email**: email do administrador
   - **Password**: senha temporária (mínimo 6 caracteres)
   - Marque **Auto Confirm User** se desejar que o usuário seja confirmado automaticamente
5. Clique em **Create User**
6. Após criar o usuário, vá para **SQL Editor** e execute:

```sql
-- Atualizar role do perfil para admin
UPDATE profiles
SET role = 'admin'
WHERE email = 'email@do.admin';
```

### Opção 2: Via SQL Direto

1. Acesse o Supabase Dashboard → **SQL Editor**
2. Execute o seguinte SQL (substituindo os valores):

```sql
-- Primeiro, criar o usuário no auth.users via SQL
-- Nota: Em produção, prefira usar a interface do Supabase Dashboard para criar usuários
-- Este método requer conhecimento do UUID do usuário criado

-- Inserir perfil com role admin
INSERT INTO profiles (id, email, role)
VALUES ('user-uuid-aqui', 'admin@example.com', 'admin')
ON CONFLICT (id) DO UPDATE
SET role = 'admin';
```

### Opção 3: Via Supabase Management API (Automação)

Para criar usuários via API (útil para automação ou scripts):

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Chave de serviço, NÃO anon key
)

// Criar usuário
const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
  email: 'admin@example.com',
  password: 'senha-temporaria',
  email_confirm: true,
})

// Atualizar perfil para admin
if (user && !error) {
  await supabaseAdmin
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', user.user.id)
}
```

## Importante

- **Nunca exponha a Service Role Key no frontend ou código público**
- Sempre verifique se o usuário tem role 'admin' antes de permitir acesso
- Em produção, considere implementar uma interface administrativa dedicada para gerenciar usuários admin (Story futura)
- O trigger automático cria o perfil com role 'user' por padrão. Você precisa atualizar manualmente para 'admin'

## Verificação

Para verificar se um usuário é admin:

```sql
SELECT id, email, role 
FROM profiles 
WHERE role = 'admin';
```

## Segurança

- Todos os dados administrativos estão protegidos por RLS (Row Level Security)
- Apenas usuários com `role = 'admin'` podem acessar tabelas administrativas
- O sistema verifica a role tanto no middleware quanto no layout do admin
- RLS está habilitado nas seguintes tabelas: `profiles`, `store_settings`, `categories`, `products`, `option_groups`, `options`, `product_option_links`, `coupons`

## Bucket `store-media`

- O bucket `store-media` é criado automaticamente pela migration `20240101000012_create_store_media_bucket.sql`
- Caso seja necessário criar manualmente via Dashboard:
  1. Acesse **Storage** → **Buckets** → **Create bucket** e defina o ID `store-media` como público
  2. Vá para **Policies** e aplique as regras:
     - `SELECT`: permitir leitura pública (`bucket_id = 'store-media'`)
     - `INSERT`/`UPDATE`/`DELETE`: permitir apenas quando `auth.uid()` tiver `role = 'admin'` na tabela `profiles`
  3. Verifique que o bucket existe em todos os ambientes (staging/produção) após o deploy
  4. Execute `SELECT * FROM storage.objects WHERE bucket_id = 'store-media'` para confirmar as políticas após o deploy
- Os arquivos são armazenados em caminhos `store-settings/logo-*.{formato}` e `store-settings/cover-*.{formato}`
- Para remover arquivos manualmente, utilize o Storage Explorer do Supabase ou execute `storage.objects.remove`

## Bucket `product-media`

- O bucket `product-media` é criado automaticamente pela migration `20240101000013_create_product_media_bucket.sql`
- Caso seja necessário criar manualmente via Dashboard:
  1. Acesse **Storage** → **Buckets** → **Create bucket** e defina o ID `product-media` como público
  2. Vá para **Policies** e aplique as regras:
     - `SELECT`: permitir leitura pública (`bucket_id = 'product-media'`)
     - `INSERT`/`UPDATE`/`DELETE`: permitir apenas quando `auth.uid()` tiver `role = 'admin'` na tabela `profiles`
  3. Verifique que o bucket existe em todos os ambientes (staging/produção) após o deploy
  4. Execute `SELECT * FROM storage.objects WHERE bucket_id = 'product-media'` para confirmar as políticas após o deploy
- Os arquivos são armazenados em caminhos `products/{productId}/{timestamp}-{random}.{formato}`
- Para remover arquivos manualmente, utilize o Storage Explorer do Supabase ou execute `storage.objects.remove`

## Notas de Implementação

- A tabela `profiles` é criada automaticamente quando um usuário é criado no `auth.users` através do trigger `on_auth_user_created`
- Por padrão, novos usuários recebem role 'user'
- Apenas usuários com role 'admin' podem fazer login no painel administrativo (`/admin/*`)


# Guia de Deploy no Vercel

Este documento contém todas as instruções necessárias para fazer o deploy do projeto Cardápio APSOO na plataforma Vercel.

## 📋 Pré-requisitos

- Conta no Vercel (gratuita)
- Repositório GitHub conectado ao Vercel
- Projeto Supabase configurado e em execução
- Credenciais do Supabase (URL e Anon Key)

---

## 🚀 Passo a Passo do Deploy

### 1. Conectar Repositório no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New..."** → **"Project"**
3. Conecte seu repositório GitHub `iantutida/cardapioapsoo`
4. Selecione o repositório e clique em **"Import"**

### 2. Configurar o Projeto

Na tela de configuração do projeto:

#### Framework Preset
- ✅ **Next.js** (detectado automaticamente)

#### Root Directory
- ✅ **`./`** (raiz do projeto)

#### Build and Output Settings
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)
- **Install Command:** `npm install` (padrão)

#### Environment Variables
⚠️ **IMPORTANTE:** Configure as variáveis de ambiente antes do primeiro deploy ou após o primeiro deploy (será necessário fazer redeploy).

Clique em **"Environment Variables"** e adicione:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Sua URL do Supabase (ex: `https://xxxxx.supabase.co`) | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sua Anon Key do Supabase | Production, Preview, Development |

**Como obter as credenciais do Supabase:**
1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Fazer o Deploy

1. Clique em **"Deploy"**
2. Aguarde o processo de build (pode levar alguns minutos)
3. O Vercel irá:
   - Instalar dependências (`npm install`)
   - Executar o build (`npm run build`)
   - Fazer deploy da aplicação

### 4. Configurar Variáveis de Ambiente (se não configurou antes)

Se você fez o deploy sem configurar as variáveis de ambiente:

1. Vá em **Settings** → **Environment Variables**
2. Adicione as variáveis conforme descrito acima
3. Vá em **Deployments**
4. Clique nos três pontos (`...`) do último deployment
5. Selecione **"Redeploy"**
6. Aguarde o redeploy concluir

---

## ✅ Verificação Pós-Deploy

Após o deploy concluir com sucesso:

1. **Acesse a URL fornecida pelo Vercel** (ex: `cardapioapsoo.vercel.app`)
2. **Teste as funcionalidades principais:**
   - ✅ Página inicial carrega
   - ✅ Menu de produtos exibe corretamente
   - ✅ Imagens dos produtos carregam
   - ✅ Checkout funciona
   - ✅ Login admin funciona (`/admin/login`)

---

## 🔧 Configurações Técnicas

### Build Settings

O projeto já está configurado com:

- **Next.js 14.2** com App Router
- **TypeScript** habilitado
- **TailwindCSS** para estilização
- **Supabase** para backend e autenticação

### Arquivos de Configuração

- `next.config.js` - Configuração do Next.js (imagens remotas do Supabase)
- `package.json` - Dependências e scripts
- `tsconfig.json` - Configuração TypeScript
- `middleware.ts` - Middleware para rotas admin

### Estrutura de Rotas

- `/` - Página inicial (cardápio público)
- `/menu` - Menu de produtos
- `/checkout` - Finalização de pedidos
- `/tracking` - Rastreamento de pedidos
- `/admin/login` - Login administrativo
- `/admin/*` - Área administrativa (protegida)

---

## 🐛 Troubleshooting

### Erro: "Missing Supabase environment variables"

**Solução:** Configure as variáveis de ambiente no Vercel e faça redeploy.

### Erro: "Module not found" durante build

**Solução:** Verifique se todas as dependências estão no `package.json` e execute `npm install` localmente para garantir que está tudo correto.

### Imagens não carregam

**Solução:** Verifique se:
1. As imagens estão no Supabase Storage
2. O bucket está público
3. A URL do Supabase está correta nas variáveis de ambiente

### Erro 404 em rotas

**Solução:** Verifique se o `next.config.js` está correto e se todas as rotas estão usando o App Router (`app/` directory).

---

## 📝 Notas Importantes

1. **Variáveis de Ambiente:**
   - Todas as variáveis que começam com `NEXT_PUBLIC_` são expostas ao cliente
   - Nunca exponha a `SUPABASE_SERVICE_ROLE_KEY` no cliente (use apenas no backend)

2. **Build Time:**
   - O primeiro build pode levar 3-5 minutos
   - Builds subsequentes são mais rápidos devido ao cache

3. **Domínio Customizado:**
   - Após o deploy, você pode configurar um domínio customizado em **Settings** → **Domains**

4. **Logs:**
   - Acesse os logs do deploy em **Deployments** → clique no deployment → **"View Function Logs"**

---

## 🔄 Atualizações Futuras

Para atualizar o projeto após fazer alterações:

1. Faça commit e push para o branch `main` no GitHub
2. O Vercel detectará automaticamente e fará um novo deploy
3. Você pode também fazer deploy manual em **Deployments** → **"Deploy"**

---

## 📞 Suporte

Se encontrar problemas durante o deploy:

1. Verifique os logs do build no Vercel
2. Verifique se todas as variáveis de ambiente estão configuradas
3. Teste o build localmente: `npm run build`
4. Consulte a [documentação do Vercel](https://vercel.com/docs)

---

**Última atualização:** 2024-11-09


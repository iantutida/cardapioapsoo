# Configuração do Aplicativo Electron

## ⚠️ IMPORTANTE: Service Role Key

O aplicativo Electron precisa da **Service Role Key** do Supabase (não a anon key) para ter acesso completo aos pedidos.

### Como obter a Service Role Key:

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie a **`service_role` key** (não a `anon` key)
5. Cole no arquivo `src/config/config.json` no campo `serviceRoleKey`

### ⚠️ SEGURANÇA

- **NUNCA** commite o arquivo `config.json` no Git
- A Service Role Key tem acesso completo ao banco de dados
- Mantenha este arquivo em segredo
- O arquivo já está no `.gitignore`

### Estrutura do config.json:

```json
{
  "supabase": {
    "url": "https://xtppkykcrphepfsdxmzu.supabase.co",
    "serviceRoleKey": "sua-service-role-key-aqui"
  },
  "notifications": {
    "soundEnabled": true,
    "soundVolume": 0.7,
    "autoCloseDelay": 5000
  }
}
```

### Após configurar:

1. Edite `src/config/config.json`
2. Substitua `SUA_SERVICE_ROLE_KEY_AQUI` pela Service Role Key real
3. Execute `npm run dev` novamente


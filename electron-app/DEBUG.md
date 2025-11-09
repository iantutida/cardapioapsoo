# Checklist de Verificação - Electron App

## 1. Verificar Console do DevTools

Abra o DevTools (deve abrir automaticamente) e verifique:

### Logs Esperados (em ordem):
1. `electron-orders:renderer-script-loaded`
2. `electron-orders:dom-ready` ou `electron-orders:dom-already-ready`
3. `electron-orders:init-start`
4. `electron-orders:config-loaded` (deve mostrar `hasKey: true`, `keyLength: > 100`)
5. `electron-orders:config-check`
6. `electron-orders:error-container-check`
7. `electron-orders:validation` (deve mostrar `isInvalidKey: false`)
8. `electron-orders:config-valid`
9. `electron-orders:initSupabase-start`
10. `electron-orders:supabase-initialized`
11. `electron-orders:fetching-orders`
12. `electron-orders:orders-fetched` ou `electron-orders:supabase-error`

### Se houver erro:
- `electron-orders:supabase-error` - Mostra detalhes do erro do Supabase
- `electron-orders:initial-orders-error` - Mostra erro ao carregar pedidos

## 2. Verificar Network Tab

Na aba Network do DevTools, você deve ver:
- `renderer.js` - Status 200
- Requisições para `supabase.co` quando buscar pedidos
- WebSocket connection para Realtime (ws:// ou wss://)

## 3. Verificar Configuração

Arquivo: `electron-app/src/config/config.json`
- ✅ URL do Supabase está correta
- ✅ Service Role Key está preenchida (não é `SUA_SERVICE_ROLE_KEY_AQUI`)
- ✅ Service Role Key tem mais de 100 caracteres

## 4. Verificar Supabase Dashboard

1. Acesse: https://app.supabase.com
2. Vá em **Database** → **Replication**
3. Verifique se a tabela `orders` está habilitada para Realtime
4. Vá em **Database** → **Tables** → `orders`
5. Verifique se há políticas RLS que possam estar bloqueando

## 5. Problemas Comuns

### Erro: "Blocked script execution"
- **Solução**: Certifique-se de que executou `npm run dev` após as últimas mudanças

### Erro: "Cannot read property 'from' of null"
- **Causa**: Supabase client não foi inicializado
- **Solução**: Verifique se `electron-orders:supabase-initialized` aparece no console

### Erro: "new row violates row-level security policy"
- **Causa**: RLS está bloqueando mesmo com Service Role Key
- **Solução**: Verifique se está usando Service Role Key (não anon key)

### Status: "Desconectado" mas sem erros
- **Causa**: Realtime não está habilitado na tabela `orders`
- **Solução**: Habilite Realtime no Supabase Dashboard

## 6. Teste Manual

No console do DevTools, execute:

```javascript
// Verificar se electronAPI está disponível
console.log('electronAPI:', window.electronAPI)

// Tentar carregar config
window.electronAPI.getConfig().then(config => {
  console.log('Config:', config)
})
```

Se isso funcionar, o problema está na inicialização do Supabase ou nas permissões.


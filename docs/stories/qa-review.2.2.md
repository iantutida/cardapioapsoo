# QA Review: Story 2.2 - Personalizar Configurações da Loja

## 📊 Informações da Review

| Campo | Valor |
|:------|:------|
| **Story ID** | 2.2 |
| **Reviewer** | Quinn (QA Test Architect) |
| **Data da Review** | {{DATE}} |
| **Versão da Story** | v2.1 |
| **Status** | 🟡 APROVADO COM RESSALVAS |

---

## 🎯 Resumo Executivo

**Objetivo:** Avaliar cobertura de testes, identificar gaps de qualidade e validar prontidão para produção.

**Resultado:** Story bem estruturada com cobertura funcional adequada, mas com **gaps críticos em automação E2E** e testes não-funcionais.

**Recomendação:** ⚠️ Implementar testes automatizados antes do deploy em produção.

---

## ✅ Checklist de Acceptance Criteria

| AC | Descrição | Cobertura de Teste | Status |
|:---|:----------|:-------------------|:-------|
| 2.2.1 | Página `/admin/settings` com formulário | Manual ✓ | ✅ |
| 2.2.2 | Upload de logo/capa para bucket | Manual ✓, Unit ✓ | ✅ |
| 2.2.3 | Preview e remoção de arquivos | Manual ✓ | 🟡 |
| 2.2.4 | Validação de campos (nome, desc, horário) | Unit ✓, Component ✓ | ✅ |
| 2.2.5 | Revalidação de `/menu` em ≤60s | Integration ✓ | ✅ |
| 2.2.6 | Tratamento de erros | Unit ✓, API ✓ | ✅ |
| 2.2.7 | Indicadores de carregamento/progresso | Manual ✓ | 🟡 |
| 2.2.8 | Responsividade e acessibilidade | Manual ✓ | 🟡 |
| 2.2.9 | Bloqueio de navegação com alterações | Component ✓ | ✅ |
| 2.2.10 | Metadata "Última atualização" | Manual ✓ | ✅ |
| 2.2.11 | Nomes únicos e remoção de órfãos | Unit ✓ | ✅ |
| 2.2.12 | Bucket com políticas RLS | Manual ✓ | 🟡 |
| 2.2.13 | RLS para admins apenas | Integration ✓ | ✅ |

**Legenda:** ✅ Completo | 🟡 Parcial | ❌ Ausente

---

## 🔴 Gaps Críticos Identificados

### 1. Automação de Testes E2E ❌ CRÍTICO

**Problema:** Nenhum teste automatizado end-to-end implementado.

**Impacto:** Regressões não detectadas em fluxos críticos (upload, validação, propagação para `/menu`).

**Ação Requerida:**
```typescript
// Testes obrigatórios a implementar (Playwright)
- Login admin → Upload logo → Verificar /menu
- Validação em tempo real (nome < 3 chars)
- Bloqueio de navegação com alterações não salvas
- Upload de arquivo > limite (erro esperado)
- Remoção de logo/capa → Verificar fallback
```

**Prioridade:** 🔴 BLOQUEANTE para produção

---

### 2. Testes de Performance ⚠️ ALTO

**Problema:** Sem validação de tempo de upload/revalidação.

**Cenários faltantes:**
- [ ] Upload de 2MB deve completar em < X segundos
- [ ] Revalidação de `/menu` ocorre em ≤60s (definido no AC, não testado)
- [ ] Upload concorrente de logo+capa

**Ação Requerida:** Estabelecer baseline de performance antes do deploy.

---

### 3. Testes de Segurança ⚠️ ALTO

**Problema:** Validações de segurança mencionadas, mas não testadas.

**Cenários faltantes:**
- [ ] Path traversal em nome de arquivo (`../../etc/passwd`)
- [ ] Upload de SVG com script embutido
- [ ] MIME type spoofing (arquivo .exe renomeado para .jpg)
- [ ] Tentativa de upload sem token auth válido

**Ação Requerida:** Executar security test suite antes de produção.

---

### 4. Acessibilidade (A11y) 🟡 MÉDIO

**Problema:** Mencionado genericamente, sem validação específica.

**Critérios faltantes:**
- [ ] ARIA labels em inputs de upload
- [ ] Screen reader anuncia progresso de upload
- [ ] Contraste WCAG AA em mensagens de erro
- [ ] Navegação por teclado em previews

**Ação Requerida:** Executar auditoria com axe-core ou Lighthouse.

---

### 5. Cross-Browser Testing 🟡 MÉDIO

**Problema:** Sem evidência de testes multi-browser.

**Browsers obrigatórios:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (macOS/iOS)

**Especial atenção:** Preview de WebP pode falhar em browsers antigos.

---

## 🧪 Cobertura de Testes Atual

### Unit Tests
| Componente | Cobertura | Status |
|:-----------|:----------|:-------|
| `StoreConfig.update` | ✓ | ✅ |
| Validação de formulário | ✓ | ✅ |
| Helpers | ✓ | ✅ |

### Integration Tests
| Cenário | Cobertura | Status |
|:--------|:----------|:-------|
| API `/admin/store-settings` | ✓ | ✅ |
| Revalidação `/menu` | Mock ✓ | 🟡 |
| RLS policies | ✓ | ✅ |

### E2E Tests
| Fluxo | Cobertura | Status |
|:------|:----------|:-------|
| Upload completo | ❌ | ❌ |
| Validações | ❌ | ❌ |
| Navegação | ❌ | ❌ |

**Cobertura Geral Estimada:** ~60% (sem E2E)

---

## 📝 Casos de Teste Adicionais Recomendados

### Functional

#### TC-2.2.F01: Upload Simultâneo
**Pré-condição:** Admin autenticado  
**Passos:**
1. Abrir `/admin/settings` em 2 abas
2. Aba 1: Fazer upload de logo A
3. Aba 2: Fazer upload de logo B
4. Salvar ambas simultaneamente

**Resultado Esperado:** Última requisição vence; nenhum arquivo órfão.

---

#### TC-2.2.F02: Idempotência
**Passos:**
1. Salvar configurações sem modificar nada
2. Verificar que nenhuma operação desnecessária ocorreu

**Resultado Esperado:** Sucesso sem upload/remoção.

---

### Performance

#### TC-2.2.P01: Upload sob Rede Lenta
**Pré-condição:** Simular 3G (DevTools)  
**Passos:**
1. Upload de capa 2MB
2. Medir tempo até conclusão

**Resultado Esperado:** 
- Progresso visível
- Timeout após 30s com fallback
- Log estruturado registrado

---

### Security

#### TC-2.2.S01: Path Traversal
**Passos:**
1. Tentar upload com filename `../../config.json`

**Resultado Esperado:** Rejeitado; arquivo salvo com nome sanitizado.

---

#### TC-2.2.S02: Arquivo Malicioso
**Passos:**
1. Upload de SVG com `<script>alert('xss')</script>`

**Resultado Esperado:** Script não executado; validação MIME type.

---

### Accessibility

#### TC-2.2.A01: Navegação por Teclado
**Passos:**
1. Usar apenas Tab/Enter/Space
2. Percorrer todos os campos e botões

**Resultado Esperado:** Todos os elementos alcançáveis; foco visível.

---

#### TC-2.2.A02: Screen Reader
**Ferramenta:** NVDA/JAWS  
**Passos:**
1. Ativar leitor de tela
2. Navegar pelo formulário
3. Iniciar upload

**Resultado Esperado:** 
- Labels lidos corretamente
- Progresso anunciado
- Erros comunicados

---

## 🐛 Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|:------|:--------------|:--------|:----------|
| Regressão em upload sem E2E | Alta | Alto | Implementar testes Playwright |
| Timeout não logado corretamente | Média | Médio | Validar logs em staging |
| Bucket policies incorretas em prod | Baixa | Crítico | Checklist pré-deploy obrigatório |
| WebP não suportado em Safari antigo | Média | Baixo | Fallback para JPEG |
| Upload concorrente corrompe dados | Baixa | Alto | Lock otimista ou timestamp check |

---

## 📋 Checklist Pré-Deploy

### Funcional
- [ ] Todos os ACs passando em manual test
- [ ] Upload de logo 1MB funcionando
- [ ] Upload de capa 2MB funcionando
- [ ] Remoção de arquivos limpa storage
- [ ] Revalidação propagando em ≤60s
- [ ] Mensagens padrão exibidas quando campos opcionais vazios

### Não-Funcional
- [ ] Testes E2E implementados e passando
- [ ] Performance baseline estabelecida
- [ ] Testes de segurança executados
- [ ] Auditoria A11y com score ≥90
- [ ] Testado em Chrome, Firefox, Safari

### Infraestrutura
- [ ] Bucket `store-media` existe em produção
- [ ] Políticas RLS configuradas corretamente
- [ ] Políticas de storage validadas
- [ ] Logs estruturados funcionando
- [ ] Timeout de 30s configurado

### Documentação
- [ ] README atualizado com fluxo de configurações
- [ ] Checklist de deploy documentado
- [ ] Guia de troubleshooting criado

---

## 🎬 Plano de Ação

### Imediato (Bloqueantes)
1. **Implementar testes E2E** (Playwright)
   - Fluxo completo de upload
   - Validações em tempo real
   - Bloqueio de navegação
   - **Estimativa:** 4-6 horas

2. **Executar testes de segurança**
   - Path traversal
   - MIME type validation
   - Auth bypass attempts
   - **Estimativa:** 2-3 horas

### Curto Prazo (Antes de Produção)
3. **Validar performance**
   - Estabelecer baseline
   - Testar upload concorrente
   - **Estimativa:** 2 horas

4. **Auditoria de acessibilidade**
   - Lighthouse A11y
   - Navegação por teclado
   - **Estimativa:** 1-2 horas

### Recomendações Futuras
5. Implementar visual regression tests (Percy/Chromatic)
6. Adicionar monitoring de taxa de erro de upload
7. Criar smoke test suite para pré-deploy

---

## 💬 Notas Adicionais

### Pontos Positivos
- ✅ Estrutura de tasks muito clara
- ✅ Cobertura de unit tests sólida
- ✅ Tratamento de erros bem pensado
- ✅ RLS e segurança considerados desde o início

### Observações
- Conversão para WebP mencionada mas não implementada (confirmar)
- Checklist de bucket pode ser automatizado via script
- Considerar rate limiting para uploads (proteção contra abuse)

---

## 📎 Anexos

### Ferramentas Recomendadas
- **E2E:** Playwright
- **A11y:** axe-core, Lighthouse
- **Security:** OWASP ZAP (básico)
- **Performance:** Chrome DevTools Performance tab

### Referências
- [Story 2.2](./2.2.story.md)
- [PRD Original](../prd/prd.md)
- [Frontend Architecture](../architecture/frontend-architecture.md)

---

## ✍️ Assinatura

**Reviewer:** Quinn (QA Test Architect)  
**Data:** {{DATE}}  
**Próxima Review:** Após implementação dos testes E2E

---

**Status Final:** 🟡 APROVADO COM RESSALVAS - Implementar ações imediatas antes de produção.


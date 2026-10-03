# CHANGELOG — Simulador V2 by Codex

## 2026-10-03 — primeira versão

| Arquivo | Linha(s) / seção | Motivo | Efeito esperado |
|---|---:|---|---|
| `index.html` | 1–78 | Criar identidade, idioma padrão PT-BR, alternância EN e narrativa Al → H₂ → PEMFC. | Apresentar a inovação como uma cadeia sustentável, antes dos detalhes do modelo. |
| `index.html` | 82–116 (`#levels`) | Expor os quatro níveis, os seletores de fluido/estrutura e as ressalvas comparativas. | Tornar visível a ampliação gradual do espaço de projeto e evitar comparações cruzadas indevidas. |
| `index.html` | 118–184 (`#explore`) | Incluir seletores, corrente, métricas, potência, polarização e varredura local de ξs. | Deixar o leitor explorar dados simulados e distinguir a região viável da inviável. |
| `index.html` | 186–235 (`#equations`) | Criar cartões de equações com indicadores sincronizados e demonstração isolada de vazão de refrigerante. | Explicar os resultados sem insinuar nova execução do solver ou acoplamento térmico inexistente. |
| `index.html` | 237–271 (`#about`) | Registrar procedência, hipóteses, limites, balanços térmicos e convenções. | Manter a interpretação científica e a origem dos números visíveis. |
| `app.js` | 1–108 (`TEXT`, hierarquia, idioma e configuração) | Implementar interface PT/EN, seleção de configuração e leitura da hierarquia. | Atualizar conteúdo e unidades no idioma escolhido, preservando PT como padrão. |
| `app.js` | 110–182 (`renderLevels`) | Gerar cartões, ganhos por estágio, gráfico e detalhe das variáveis liberadas. | Apresentar a sequência dos quatro níveis com valores e condições correspondentes. |
| `app.js` | 183–344 (seleção de curvas, potência e polarização) | Ligar o controle de corrente aos oito traçados armazenados, calcular a diferença bruta–líquida e separar pontos inviáveis. | Permitir exploração dinâmica sem inventar reexecução do modelo; sinalizar violações. |
| `app.js` | 345–393 (varreduras ξs e equações vinculadas ao ponto) | Conectar quatro varreduras locais e valores físicos ao ponto escolhido. | Acompanhar mudanças em ξs, tensão, alimentação de H₂, potência e calor pós-processado do reator. |
| `app.js` | 394–471 (`renderCoolantDemo`, eventos e inicialização) | Demonstrar ṁcf = Q̇cool/(cpΔT) para carga e ΔT definidos pelo usuário, com cp correspondente ao fluido selecionado. | Mostrar a independência da vazão e evitar vinculá-la ao calor da reação Al–água. |
| `styles.css` | 1–282 | Aplicar sistema visual, tipografia, cartões, gráficos e cores com rótulos além da cor. | Criar hierarquia visual legível para leitura e exploração científica. |
| `styles.css` | 283–366 | Adaptar para telas menores, foco de teclado e preferência por movimento reduzido; reforçar contraste de textos secundários. | Melhorar uso em celular, teclado e baixa visão. |
| `data/grok-v3.json` | 1 | Extrair metadados, equações, oito curvas, hierarquia e quatro séries ξs do HTML Grok v3. | Permitir auditoria e reutilização dos dados sem carregar os 84.086 candidatos completos. |
| `data/model-v3.js` | 1 | Empacotar os mesmos dados como script local sem dependência de servidor. | Permitir abrir `index.html` diretamente no navegador. |
| `README.md` | 1–42 | Documentar abertura, interações, procedência, limitações e princípios de UX adotados. | Facilitar uso, manutenção e conferência do que o painel recalcula ou apenas exibe. |

### Verificações realizadas

- `node --check` passou para `app.js` e `data/model-v3.js`.
- Auditoria estática encontrou 51 IDs HTML sem duplicação, todas as 99 chaves de idioma presentes e comprimentos consistentes nas séries principais das oito curvas.
- As quatro varreduras locais incluídas têm 40 pontos cada; a hierarquia da MEA física corresponde aos valores armazenados no arquivo Grok v3.
- A inspeção no navegador integrado foi bloqueada pela política de segurança para páginas `file://`. Nenhum navegador alternativo ou contorno foi usado; portanto, a conferência visual automatizada permanece pendente.
- O HTML-fonte e os demais arquivos da pasta Grok foram apenas lidos; os novos artefatos estão confinados a `simulador V2 by Codex`.

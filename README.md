# AluH₂ PEMFC Explorer

Simulador interativo, em português (padrão) e inglês, para explorar parte dos resultados simulados da pilha PEMFC alimentada com H₂ produzido a partir da reação entre alumínio e água.

## Abrir

Abra `index.html` diretamente em um navegador moderno. A aplicação é local e não depende de instalação, servidor, biblioteca externa ou conexão com a internet. O arquivo `data/model-v3.js` contém os dados necessários para a abertura sem servidor; `data/grok-v3.json` mantém a mesma seleção em formato legível por máquina.

## O que é interativo

- Os seletores de refrigerante e estrutura atualizam a hierarquia dos quatro níveis e suas potências líquidas reportadas.
- A seleção de uma curva e o controle de corrente percorrem pontos efetivamente armazenados no conjunto Grok v3. Indicadores, equações vinculadas ao ponto, curva de polarização e balanço de potência acompanham a seleção.
- O controle de inviabilidade revela os trechos simulados que violam as restrições; eles aparecem tracejados e com aviso, não como condições recomendadas.
- Uma varredura local de 40 pontos de ξs por combinação de fluido/estrutura alimenta um gráfico próprio. Parâmetros mantidos fixos ficam explícitos na tela.
- A demonstração de vazão do refrigerante atualiza a relação ṁcf = Q̇cool/(cp ΔTcf) para uma carga térmica informada pelo usuário. Essa carga não é inferida da pilha nem conectada ao calor do reator.
- O seletor PT/EN troca idioma e formatação numérica, mantendo português como padrão.

## Origem e limites dos dados

Os dados foram extraídos, sem alterar o original, do painel `Resultados Finais Grok/v2/VISUALIZACAO_ESTRUTURA_v3.html` (Grok v3, conjunto indicado como gerado em 02/10/2026 às 15:11). Esta versão inclui as oito curvas I–V/potência, a hierarquia de resultados e quatro refinamentos locais de ξs (40 pontos cada). O HTML-fonte informa 84.086 candidatos; a matriz completa não foi copiada para manter o simulador leve.

As curvas de operação são observações simuladas armazenadas: alterar o controle de corrente seleciona outro ponto, não reexecuta o solver Fortran. A carga térmica Al–água é pós-processada separadamente com 16,552 MJ/kg de Al e não é adicionada ao balanço da PEMFC. O painel não afirma validação experimental, fechamento de balanço ou ótimo global.

## Decisões de experiência do usuário

O fluxo privilegia primeiro a história do sistema, depois a progressão dos quatro níveis, a exploração de uma curva e, por fim, as equações e os limites. Títulos, unidades e anotações acompanham cada gráfico; a viabilidade não depende apenas da cor; controles têm rótulos e foco visível; a página se reorganiza para telas estreitas e respeita a preferência por movimento reduzido.

Essas escolhas foram informadas por:

- [Princípios de visualização de dados do GOV.UK](https://brand.design-system.service.gov.uk/data/)
- [Orientação do GOV.UK para gráficos — títulos, eixos, unidades e anotações](https://brand.design-system.service.gov.uk/data/charts/)
- [W3C WAI: dicas para conteúdo acessível](https://www.w3.org/WAI/tips/designing/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [GOV.UK: considerações para dashboards](https://brand.design-system.service.gov.uk/data/dashboards/)

## Arquivos

- `index.html` — página e estrutura semântica.
- `styles.css` — identidade visual, responsividade e acessibilidade.
- `app.js` — idioma, seletores, gráficos SVG e relações algébricas explícitas.
- `data/grok-v3.json` / `data/model-v3.js` — dados derivados do Grok v3 usados pelo painel.
- `CHANGELOG.md` — registro dos artefatos criados nesta versão.

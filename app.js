(() => {
  'use strict';

  const DATA = window.SIMULATOR_DATA;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const localeFor = (lang) => lang === 'en' ? 'en-US' : 'pt-BR';
  const formatter = (lang, digits = 2) => new Intl.NumberFormat(localeFor(lang), { minimumFractionDigits: digits, maximumFractionDigits: digits });
  const fmt = (value, digits = 2) => Number.isFinite(Number(value)) ? formatter(state.lang, digits).format(Number(value)) : '—';
  const fmtAuto = (value, digits = 2) => Number.isFinite(Number(value)) ? new Intl.NumberFormat(localeFor(state.lang), { maximumFractionDigits: digits }).format(Number(value)) : '—';
  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

  const TEXT = {
    pt: {
      skip: 'Pular para o conteúdo', navLevels: 'Quatro níveis', navExplore: 'Explorar dados', navEquations: 'Equações', navAbout: 'Sobre o modelo',
      heroEyebrow: 'LABORATÓRIO INTERATIVO · MODELO PEMFC', heroTitle: 'Do alumínio reciclado à potência líquida.', heroLede: 'Explore como o hidrogênio produzido pela reação Al–água alimenta uma pilha PEMFC — e como cada decisão geométrica altera o resultado simulado.', heroCta: 'Acompanhar a otimização', heroNote: 'Resultados simulados · volume de referência: 1 L', heroBadgeData: 'Base: dados simulados Grok v3', heroBadgeNotValidated: 'Visualizador educacional — não é validação experimental',
      storyKicker: 'A IDEIA EM UMA LINHA', storyTitle: 'Uma cadeia energética, quatro perguntas de projeto.', storyText: 'O alumínio reage com água em meio alcalino para gerar H₂; o hidrogênio é convertido eletroquimicamente em eletricidade. A otimização amplia, em etapas, o conjunto de variáveis de projeto. O calor da reação Al–água permanece no reator: não é transferido para o balanço térmico da pilha neste caso-base.', chainAl: 'Alumínio + água', chainH2: 'Hidrogênio sustentável', chainPower: 'Eletricidade na PEMFC',
      levelsKicker: 'A OTIMIZAÇÃO, PASSO A PASSO', levelsTitle: 'Quatro níveis. Um espaço de projeto cada vez maior.', levelsSub: 'Em cada nível, algumas decisões são liberadas enquanto as anteriores permanecem definidas.', coolantLabel: 'Refrigerante', structureLabel: 'Estrutura interna', chartKicker: 'POTÊNCIA LÍQUIDA REPORTADA', levelChartTitle: 'O ganho ao longo da hierarquia', levelChartNote: 'Valores do conjunto Grok v3 para a combinação selecionada; a linha mostra a sequência da otimização, não uma série temporal.', levelCaveat: 'Comparações entre água e ar são válidas dentro de cada configuração e das hipóteses desse conjunto. A troca de estrutura interna também altera as espessuras adotadas; não leia os dois ramos como uma única varredura controlada.',
      exploreKicker: 'MEXA NOS DADOS, NÃO NO SOLVER', exploreTitle: 'Explore um ponto de operação simulado.', exploreSub: 'Escolha a configuração e percorra a faixa de corrente. As curvas e os números vêm diretamente dos pontos simulados.', caseLabel: 'Caso de curva', currentControlTitle: 'Corrente de operação', currentControlCopy: 'Arraste para percorrer os pontos da curva simulada.', currentLabel: 'Corrente da pilha', infeasibleToggle: 'Mostrar também pontos inviáveis', caseSourceNote: 'Curva mostrada como registrada no conjunto; pontos inviáveis ficam destacados e não devem ser lidos como condições recomendadas.', netPowerKicker: 'BALANÇO ELÉTRICO', powerChartTitle: 'Potência bruta, líquida e consumos', polarizationKicker: 'RESPOSTA ELETROQUÍMICA', polarizationTitle: 'Polarização da pilha', polarizationNote: 'A tensão da curva já incorpora as perdas eletroquímicas modeladas; o arquivo de curvas não fornece a decomposição numérica individual de cada sobretensão.', tableSummary: 'Ver tabela de pontos',
      sweepKicker: 'REFINAMENTO LOCAL DE ξs', sweepTitle: 'Como a espessura adimensional altera a potência?', sweepCopy: 'Esta varredura mantém os demais parâmetros do caso indicados abaixo e seleciona cada ponto do refinamento.', selectedXi: 'ξs selecionado', xiControlLabel: 'Ponto da varredura', netPowerLabel: 'Potência líquida', selectedPoint: 'Ponto selecionado', sweepNote: 'O máximo dessa varredura local não substitui o máximo hierárquico. Grade, condições fixas e convergência limitam o que se pode concluir.',
      equationsKicker: 'ABRA A CAIXA-PRETA', equationsTitle: 'As equações por trás dos indicadores.', equationsSub: 'Os cartões ligados ao ponto de operação acompanham a curva selecionada. O dimensionamento do refrigerante é uma demonstração algébrica independente.', eqVoltageTitle: 'Tensão: potencial menos perdas', eqVoltageCopy: 'Ativação, concentração e resistência ôhmica reduzem a tensão reversível.', eqVoltageLive: 'Tensão no ponto selecionado', eqVoltageScope: 'Valor da simulação; perdas não decompostas nesta curva.', eqCurrentTitle: 'Corrente e consumo de H₂', eqCurrentCopy: 'A lei de Faraday liga a corrente total ao consumo estequiométrico no stack.', eqH2Live: 'Alimentação de H₂ no ponto', eqH2Scope: 'A alimentação inclui o fator estequiométrico usado no caso.', eqPowerTitle: 'Potência que sobra', eqPowerCopy: 'O resultado líquido desconta as potências parasitas modeladas.', eqAuxLive: 'Consumo auxiliar inferido da curva', eqAuxScope: 'Calculado como Wbruta − Wnet nos dados simulados.', eqGeometryTitle: 'Geometria e células em série', eqGeometryCopy: 'As proporções externas definem Lx; o passo da célula define quantas placas cabem.', eqGeometryLive: 'Número de células nesta curva', eqAlTitle: 'Alumínio → H₂: carga térmica no reator', eqAlCopy: 'O calor da reação é calculado à parte; ele não é transferido à PEMFC neste caso-base.', reactorHeatFormula: 'Estimativa no reator · ΔH = 16,552 MJ/kg Al', separateHeat: 'SEPARADO DA PILHA', eqAlScope: 'Estimativa pós-processada a partir do consumo de Al associado à alimentação simulada de H₂. Não é calor adicionado ao balanço térmico do stack.', eqCoolantTitle: 'Vazão de refrigerante independente', eqCoolantCopy: 'Escolher a elevação admissível de temperatura determina a vazão necessária para uma carga térmica definida.', qcoolLabel: 'Carga a remover (cenário)', deltaTLabel: 'Aumento admissível ΔT', requiredFlow: 'Vazão de água requerida', coolantDisclaimer: 'Demonstração da equação com Q̇cool definido pelo usuário (cp da água = 4,18 kJ kg⁻¹ K⁻¹). Não representa um novo cálculo do balanço térmico da pilha.',
      aboutKicker: 'LEIA OS RESULTADOS COM CONTEXTO', aboutTitle: 'O que este simulador mostra — e o que não mostra.', aboutFactTitle: 'O que está ancorado nos dados', aboutFactText: 'Hierarquia de máximos, curvas densas de corrente, tensão e potência, estados viáveis e quatro varreduras locais de ξs, extraídos do painel Grok v3. As curvas do ponto de operação são os pontos armazenados — não são regeneradas por um solver.', aboutLimitTitle: 'Limites e hipóteses', aboutLimitText: 'O conjunto registra VT = 1 L, Tmáx ≤ 353,15 K, ΔTcf ≤ 10 K, hcanal ≥ 0,1 mm no ramo físico e limites de perda de carga de 10% da pressão de entrada. Os máximos são resultados de simulação e grade, não evidência experimental nem prova de ótimo global.', aboutHeatTitle: 'Dois balanços térmicos', aboutHeatText: 'A carga térmica Al–água é exibida separadamente, a partir da massa de Al associada à demanda de H₂. A bancada de vazão do refrigerante ilustra ṁ = Q̇/(cpΔT) com uma carga informada pelo usuário; não a vincula à reação nem afirma fechamento do balanço do stack.', provenanceSummary: 'Procedência, versão e convenções', provSource: 'Origem', provGenerated: 'Conjunto indicado como gerado', provCases: 'Dados incluídos nesta V2', provCasesText: '8 curvas I–V / potência, hierarquia de resultados e 4 varreduras locais de 40 pontos para ξs. Os 84.086 candidatos tabulados do HTML-fonte não foram copiados integralmente para manter o simulador leve.', provStructure: 'MEA física', provStructureText: 'Camadas sólidas fixas totalizam 0,67 mm no arquivo-fonte; canais ocupam o restante de Ls.', provThermo: 'Calor específico da reação exibido', provThermoText: '16,552 MJ/kg de Al (valor da tese, usado apenas no pós-processamento independente).', provenanceWarning: 'A interface recalcula somente relações explícitas e marcadas como demonstração. Alterar controles não reexecuta o programa PEMfcell nem modifica os arquivos da pasta Grok.', footerText: 'Uma interface de exploração e ensino para resultados simulados — com procedência e limites à vista.', backTop: 'Voltar ao início ↑',
      levelNames: ['O ponto elétrico', 'A arquitetura interna', 'Canais e resfriamento', 'A forma externa'], levelBodies: ['A corrente equivalente à razão de alimentação ψAl é ajustada na geometria de referência.', 'A fração ξs define o passo da célula e altera o número de células e o espaço de canal.', 'São liberadas a espessura Lcc e a razão de alimentação do refrigerante fac_cf.', 'As razões externas ryx e rzx passam a integrar a busca geométrica.'], levelVars: ['ψAl · corrente', 'ξs · espessura / passo', 'Lcc · fac_cf', 'ryx · rzx'], levelKept: ['Geometria de referência fixa', 'Lcc e resfriamento conforme o estágio anterior', 'Proporções externas fixas em 0,3; 0,3', 'Demais variáveis dos estágios anteriores'], levelNew: ['Corrente / ψAl', 'ξs', 'Lcc e fac_cf', 'ryx e rzx'], levelDescriptions: ['máximo elétrico na referência', 'refina a estrutura da célula', 'refina canal e refrigerante', 'inclui forma externa na busca'], noValue: 'Sem resultado neste ramo', stageGain: 'variação em relação ao nível anterior', stageStart: 'nível de referência', detailFixed: 'Condições mantidas', detailReleased: 'Variáveis liberadas', detailParams: 'Parâmetros no candidato reportado', detailActive: 'Restrição ativa registrada', activeNames: { dp_ox: 'perda de carga de O₂', dp_cf: 'perda de carga do refrigerante', dp_f: 'perda de carga de H₂', dT_cf: 'ΔT do refrigerante', interior: 'ponto interior da busca' },
      curveNames: { otimo: 'configuração otimizada da curva', ref: 'configuração de referência' }, metricGross: 'Potência bruta', metricNet: 'Potência líquida', metricAux: 'Consumo auxiliar', metricVoltage: 'Tensão da célula', metricTemp: 'Temperatura máxima', metricH2: 'H₂ alimentado', metricAl: 'Al consumido', metricHeat: 'Calor Al–água*', metricUnits: { W: 'W', V: 'V', K: 'K', h2: 'kg/h', al: 'g/s', heat: 'kW · reator' }, axisCurrent: 'Corrente (A)', axisPower: 'Potência (W)', axisCurrentDensity: 'Densidade de corrente (A/cm²)', axisVoltage: 'Tensão (V)', axisXi: 'ξs (adimensional)', noFeasible: 'Esta curva não registra ponto viável.', infeasibleMessage: 'Ponto inviável no conjunto simulado. Não interpretar como condição operacional aceitável.', caseTags: { xi: 'ξs', lcc: 'Lcc', shape: 'ryx / rzx', coolantRatio: 'fac_cf', plates: 'npl' }, activeLabel: 'ativa', caseOptimum: 'otimizada', caseReference: 'referência', noConvergence: 'Sem convergência', feasible: 'viável', infeasible: 'inviável', stageChartAria: 'Gráfico da potência líquida dos quatro níveis de otimização', currentGraphAria: 'Gráfico da potência bruta e líquida, consumo auxiliar em função da corrente; pontos inviáveis em linha tracejada', polarizationGraphAria: 'Curva de polarização, tensão em função da densidade de corrente', sweepGraphAria: 'Potência líquida simulada em função de xi s', coolantGraphAria: 'Vazão de água requerida em função do aumento de temperatura escolhido', gross: 'Bruta (npl × I × V)', net: 'Líquida', aux: 'Auxiliar (bruta − líquida)', voltageSeries: 'Tensão da célula', currentPoint: 'ponto escolhido', validBoundary: 'limite viável na grade', tableCurrent: 'I (A)', tableVoltage: 'Vcel (V)', tableGross: 'Wbruta (W)', tableNet: 'Wlíquida (W)', tableAux: 'Waux (W)', tableValidity: 'Estado', chartNoData: 'Não há pontos disponíveis para esta combinação.',
      scanIndex: 'amostra', scanI: 'corrente', scanVol: 'tensão', scanT: 'T máx.', scanA: 'restrição', pointLabel: 'Ponto', sampleLabel: 'amostra', qcoolUnit: 'kW', deltaUnit: 'K', coolantFlowUnit: 'kg/s', status: 'Status',
    },
    en: {
      skip: 'Skip to content', navLevels: 'Four levels', navExplore: 'Explore data', navEquations: 'Equations', navAbout: 'About the model',
      heroEyebrow: 'INTERACTIVE LAB · PEMFC MODEL', heroTitle: 'From recycled aluminum to net power.', heroLede: 'Explore how hydrogen produced by the Al–water reaction feeds a PEM fuel cell — and how each geometric decision changes the simulated result.', heroCta: 'Follow the optimization', heroNote: 'Simulated results · reference volume: 1 L', heroBadgeData: 'Basis: Grok v3 simulated data', heroBadgeNotValidated: 'Educational viewer — not experimental validation',
      storyKicker: 'THE IDEA IN ONE LINE', storyTitle: 'One energy chain, four design questions.', storyText: 'Aluminum reacts with water in an alkaline medium to generate H₂; hydrogen is converted electrochemically into electricity. Optimization progressively releases more design variables. Al–water reaction heat remains in the reactor: it is not transferred into the fuel-cell thermal balance in this base case.', chainAl: 'Aluminum + water', chainH2: 'Sustainable hydrogen', chainPower: 'PEMFC electricity',
      levelsKicker: 'OPTIMIZATION, STEP BY STEP', levelsTitle: 'Four levels. An expanding design space.', levelsSub: 'At each level, some decisions are released while earlier ones remain fixed.', coolantLabel: 'Coolant', structureLabel: 'Internal structure', chartKicker: 'REPORTED NET POWER', levelChartTitle: 'Gain across the hierarchy', levelChartNote: 'Values from the Grok v3 dataset for the selected combination; the line shows the optimization sequence, not a time series.', levelCaveat: 'Water–air comparisons are valid within each configuration and the assumptions of this dataset. Changing the internal structure also changes the adopted layer thicknesses; do not read the two branches as one controlled sweep.',
      exploreKicker: 'CHANGE THE DATA VIEW, NOT THE SOLVER', exploreTitle: 'Explore a simulated operating point.', exploreSub: 'Choose a configuration and move across the current range. Curves and values come directly from stored simulation points.', caseLabel: 'Curve case', currentControlTitle: 'Operating current', currentControlCopy: 'Drag to move across the simulated curve points.', currentLabel: 'Stack current', infeasibleToggle: 'Also show infeasible points', caseSourceNote: 'Curve shown as recorded in the dataset; infeasible points are highlighted and are not recommended operating conditions.', netPowerKicker: 'ELECTRICAL BALANCE', powerChartTitle: 'Gross, net, and consumed power', polarizationKicker: 'ELECTROCHEMICAL RESPONSE', polarizationTitle: 'Fuel-cell polarization', polarizationNote: 'Curve voltage already includes modeled electrochemical losses; the curve file does not provide a numerical breakdown of each individual overpotential.', tableSummary: 'View point table',
      sweepKicker: 'LOCAL REFINEMENT OF ξs', sweepTitle: 'How does dimensionless thickness change power?', sweepCopy: 'This sweep holds the other case parameters listed below fixed and lets you inspect each refinement point.', selectedXi: 'Selected ξs', xiControlLabel: 'Sweep point', netPowerLabel: 'Net power', selectedPoint: 'Selected point', sweepNote: 'The maximum in this local sweep does not replace the hierarchical maximum. Grid, fixed conditions, and convergence limit what can be concluded.',
      equationsKicker: 'OPEN THE BLACK BOX', equationsTitle: 'The equations behind the indicators.', equationsSub: 'Cards linked to the operating point follow the selected curve. Coolant sizing is a separate algebraic demonstration.', eqVoltageTitle: 'Voltage: potential minus losses', eqVoltageCopy: 'Activation, concentration, and ohmic resistance lower the reversible voltage.', eqVoltageLive: 'Voltage at selected point', eqVoltageScope: 'Simulated value; losses are not decomposed in this curve.', eqCurrentTitle: 'Current and H₂ consumption', eqCurrentCopy: 'Faraday’s law links total current to stoichiometric consumption in the stack.', eqH2Live: 'H₂ feed at this point', eqH2Scope: 'Feed includes the stoichiometric factor used in this case.', eqPowerTitle: 'Power remaining', eqPowerCopy: 'Net output subtracts the modeled parasitic power.', eqAuxLive: 'Auxiliary load inferred from curve', eqAuxScope: 'Calculated as Wgross − Wnet from simulated data.', eqGeometryTitle: 'Geometry and cells in series', eqGeometryCopy: 'External proportions define Lx; cell pitch determines how many plates fit.', eqGeometryLive: 'Number of cells on this curve', eqAlTitle: 'Aluminum → H₂: reactor-side thermal load', eqAlCopy: 'Reaction heat is calculated separately; it is not transferred to the PEMFC in this base case.', reactorHeatFormula: 'Reactor estimate · ΔH = 16.552 MJ/kg Al', separateHeat: 'SEPARATE FROM STACK', eqAlScope: 'Post-processed estimate from Al consumption associated with simulated H₂ feed. It is not added to the stack thermal balance.', eqCoolantTitle: 'Independent coolant flow', eqCoolantCopy: 'Choosing the allowable temperature rise determines the flow required for a specified thermal load.', qcoolLabel: 'Heat to remove (scenario)', deltaTLabel: 'Allowable rise ΔT', requiredFlow: 'Required water flow', coolantDisclaimer: 'Equation demonstration using user-defined Q̇cool (water cp = 4.18 kJ kg⁻¹ K⁻¹). This is not a new fuel-cell thermal-balance calculation.',
      aboutKicker: 'READ THE RESULTS IN CONTEXT', aboutTitle: 'What this simulator does — and does not — show.', aboutFactTitle: 'Anchored in the data', aboutFactText: 'Maximum hierarchy, dense current/voltage/power curves, feasible states, and four local ξs sweeps extracted from Grok v3. Operating-curve values are stored points — they are not regenerated by a solver.', aboutLimitTitle: 'Limits and assumptions', aboutLimitText: 'The dataset records VT = 1 L, Tmax ≤ 353.15 K, ΔTcf ≤ 10 K, hchannel ≥ 0.1 mm in the physical branch, and pressure-drop limits of 10% of inlet pressure. Maxima are simulation/grid results, not experimental evidence or proof of a global optimum.', aboutHeatTitle: 'Two thermal balances', aboutHeatText: 'Al–water heat is shown separately, based on Al mass associated with H₂ demand. The coolant-flow sandbox illustrates ṁ = Q̇/(cpΔT) with a user-defined load; it neither couples to the reaction nor claims stack energy closure.', provenanceSummary: 'Provenance, version, and conventions', provSource: 'Source', provGenerated: 'Dataset generation time', provCases: 'Data included in this V2', provCasesText: '8 I–V / power curves, results hierarchy, and 4 local ξs sweeps with 40 points each. The 84,086 tabulated candidates in the source HTML were not copied in full to keep the simulator lightweight.', provStructure: 'Physical MEA', provStructureText: 'Fixed solid layers total 0.67 mm in the source file; channels occupy the remainder of Ls.', provThermo: 'Reaction enthalpy displayed', provThermoText: '16.552 MJ/kg Al (thesis value, used only in separate post-processing).', provenanceWarning: 'The interface recalculates only explicit relationships marked as demonstrations. Changing controls does not rerun PEMfcell or modify the Grok folder files.', footerText: 'An exploration and teaching interface for simulated results — with provenance and limitations in view.', backTop: 'Back to top ↑',
      levelNames: ['Electrical operating point', 'Internal architecture', 'Channels and cooling', 'External shape'], levelBodies: ['The current equivalent to feed ratio ψAl is adjusted for the reference geometry.', 'The ξs fraction defines cell pitch and changes cell count and channel space.', 'Channel thickness Lcc and coolant feed ratio fac_cf are released.', 'External proportions ryx and rzx join the geometric search.'], levelVars: ['ψAl · current', 'ξs · thickness / pitch', 'Lcc · fac_cf', 'ryx · rzx'], levelKept: ['Reference geometry fixed', 'Lcc and cooling as in the previous stage', 'External proportions fixed at 0.3; 0.3', 'Variables from earlier stages'], levelNew: ['Current / ψAl', 'ξs', 'Lcc and fac_cf', 'ryx and rzx'], levelDescriptions: ['electrical maximum at reference geometry', 'refines cell structure', 'refines channel and coolant', 'adds external shape to the search'], noValue: 'No result in this branch', stageGain: 'change from previous level', stageStart: 'reference level', detailFixed: 'Conditions held fixed', detailReleased: 'Variables released', detailParams: 'Parameters in reported candidate', detailActive: 'Recorded active constraint', activeNames: { dp_ox: 'O₂ pressure drop', dp_cf: 'coolant pressure drop', dp_f: 'H₂ pressure drop', dT_cf: 'coolant ΔT', interior: 'interior search point' },
      curveNames: { otimo: 'optimized curve configuration', ref: 'reference configuration' }, metricGross: 'Gross power', metricNet: 'Net power', metricAux: 'Auxiliary load', metricVoltage: 'Cell voltage', metricTemp: 'Maximum temperature', metricH2: 'H₂ feed', metricAl: 'Al consumed', metricHeat: 'Al–water heat*', metricUnits: { W: 'W', V: 'V', K: 'K', h2: 'kg/h', al: 'g/s', heat: 'kW · reactor' }, axisCurrent: 'Current (A)', axisPower: 'Power (W)', axisCurrentDensity: 'Current density (A/cm²)', axisVoltage: 'Voltage (V)', axisXi: 'ξs (dimensionless)', noFeasible: 'This curve has no recorded feasible point.', infeasibleMessage: 'This point is marked infeasible in the simulated dataset. Do not interpret it as an acceptable operating condition.', caseTags: { xi: 'ξs', lcc: 'Lcc', shape: 'ryx / rzx', coolantRatio: 'fac_cf', plates: 'npl' }, activeLabel: 'active', caseOptimum: 'optimized', caseReference: 'reference', noConvergence: 'No convergence', feasible: 'feasible', infeasible: 'infeasible', stageChartAria: 'Chart of net power at the four optimization levels', currentGraphAria: 'Gross and net power, auxiliary load versus current; infeasible points are dashed', polarizationGraphAria: 'Polarization curve, voltage versus current density', sweepGraphAria: 'Simulated net power versus xi s', coolantGraphAria: 'Required water flow versus selected temperature rise', gross: 'Gross (npl × I × V)', net: 'Net', aux: 'Auxiliary (gross − net)', voltageSeries: 'Cell voltage', currentPoint: 'selected point', validBoundary: 'last feasible grid point', tableCurrent: 'I (A)', tableVoltage: 'Vcell (V)', tableGross: 'Wgross (W)', tableNet: 'Wnet (W)', tableAux: 'Waux (W)', tableValidity: 'Status', chartNoData: 'No points available for this combination.',
      scanIndex: 'sample', scanI: 'current', scanVol: 'voltage', scanT: 'T max', scanA: 'constraint', pointLabel: 'Point', sampleLabel: 'sample', qcoolUnit: 'kW', deltaUnit: 'K', coolantFlowUnit: 'kg/s', status: 'Status',
    }
  };

  const LEVELS = [
    { key: 'm', number: '01', symbol: 'ψ', formula: 'W̃net,m = maxψ W̃net(ψ; ref)' },
    { key: 'mm', number: '02', symbol: 'ξ', formula: 'W̃net,mm = maxξs W̃net,m(ξs)' },
    { key: 'mmm', number: '03', symbol: 'L', formula: 'max over ψAl, ξs, Lcc, fac_cf' },
    { key: 'mmmm_D1', number: '04', symbol: '↗', formula: 'max over ψAl, ξs, Lcc, fac_cf, ryx, rzx' }
  ];
  const state = { lang: 'pt', fluid: 'agua', ig: '1', curveId: '4', point: 0, showInfeasible: false, levelIndex: 0, xiPoint: 7, qcool: 2, deltaT: 7.5 };

  if (!DATA) {
    document.body.insertAdjacentHTML('afterbegin', '<div class="no-data">Não foi possível carregar os dados locais do simulador.</div>');
    return;
  }

  const t = (key) => TEXT[state.lang][key] ?? TEXT.pt[key] ?? key;
  const curve = () => DATA.curves[state.curveId];
  const currentPoint = () => {
    const c = curve();
    const index = Math.max(0, Math.min(state.point, (c?.I_A?.length ?? 1) - 1));
    return c ? { c, i: index, feasible: Boolean(c.feasible[index]) } : null;
  };
  const curvesForContext = () => Object.entries(DATA.curves).filter(([, c]) => String(c.params.ig) === state.ig && c.params.fluid === state.fluid);
  const sweep = () => DATA.sweeps[`${state.fluid}_${state.ig}`];

  function applyLanguage() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'pt-BR';
    document.title = state.lang === 'en' ? 'AluH₂ PEMFC Explorer | Sustainable hydrogen fuel-cell simulator' : 'AluH₂ PEMFC Explorer | Simulador de pilha a combustível';
    $$('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (TEXT[state.lang][key]) el.textContent = TEXT[state.lang][key];
    });
    $('#lang-pt').classList.toggle('is-active', state.lang === 'pt');
    $('#lang-en').classList.toggle('is-active', state.lang === 'en');
    $('#lang-pt').setAttribute('aria-pressed', String(state.lang === 'pt'));
    $('#lang-en').setAttribute('aria-pressed', String(state.lang === 'en'));
    $('#fluid-select').options[0].textContent = state.lang === 'pt' ? 'Água' : 'Water';
    $('#fluid-select').options[1].textContent = state.lang === 'pt' ? 'Ar' : 'Air';
    $('#structure-select').options[0].textContent = state.lang === 'pt' ? 'MEA física' : 'Physical MEA';
    $('#structure-select').options[1].textContent = state.lang === 'pt' ? 'Proporções do estudo clássico' : 'Classic-study proportions';
    $('#current-slider').setAttribute('aria-label', t('currentControlTitle'));
    $('#xi-slider').setAttribute('aria-label', t('sweepTitle'));
    updateAll();
  }

  function levelBranch() {
    const fluid = DATA.hier[state.fluid];
    const structure = fluid?.[state.ig];
    const preferred = DATA.meta.principal[state.ig];
    return structure?.[preferred] ?? structure?.sem_hmin ?? structure?.hmin ?? {};
  }

  function levelRecords() {
    const branch = levelBranch();
    return LEVELS.map((level) => branch[level.key] ?? null);
  }

  function fmtParams(p) {
    if (!p) return [];
    const local = TEXT[state.lang].caseTags;
    return [
      `${local.xi} = ${fmtAuto(p.xis, 5)}`,
      `Lcc = ${fmtAuto(p.Lcc_mm, 3)} mm`,
      `${local.shape} = ${fmtAuto(p.ryx, 3)} / ${fmtAuto(p.rzx, 3)}`,
      `${local.coolantRatio} = ${fmtAuto(p.fac_cf, 2)}`
    ];
  }

  function activeName(code) { return TEXT[state.lang].activeNames[code] || (code || '—'); }

  function renderLevels() {
    const records = levelRecords();
    const values = records.map((r) => r?.Wnet_W);
    const cards = LEVELS.map((level, i) => {
      const record = records[i];
      const value = record?.Wnet_W;
      const gain = i === 0 || !Number.isFinite(value) || !Number.isFinite(values[i - 1]) ? null : ((value / values[i - 1]) - 1) * 100;
      const gainText = i === 0 ? t('stageStart') : gain === null ? '' : `${gain >= 0 ? '+' : ''}${fmt(gain, 1)}% · ${t('stageGain')}`;
      const title = `${state.lang === 'pt' ? 'Otimização Nível' : 'Optimization Level'} ${i + 1}`;
      return `<button class="level-card ${state.levelIndex === i ? 'is-selected' : ''}" type="button" data-level="${i}" aria-pressed="${state.levelIndex === i}" aria-label="${esc(title)}: ${esc(TEXT[state.lang].levelNames[i])}, ${Number.isFinite(value) ? fmt(value / 1000, 3) + ' kW' : esc(t('noValue'))}">
        <div class="level-card-head"><span class="level-step">${esc(title.toUpperCase())}</span><span class="level-symbol" aria-hidden="true">${level.symbol}</span></div>
        <h3>${esc(TEXT[state.lang].levelNames[i])}</h3>
        <div class="level-value">${Number.isFinite(value) ? fmt(value / 1000, 3) : '—'} <small>kW</small></div>
        <p>${esc(TEXT[state.lang].levelDescriptions[i])}</p><span class="stage-gain">${esc(gainText)}</span>
      </button>`;
    }).join('');
    $('#level-cards').innerHTML = cards;
    $$('#level-cards [data-level]').forEach((button) => button.addEventListener('click', () => {
      state.levelIndex = Number(button.dataset.level);
      renderLevels();
      renderLevelDetail();
    }));
    renderLevelChart(values);
    renderLevelDetail();
  }

  function renderLevelChart(values) {
    const box = { w: 700, h: 250, l: 48, r: 18, t: 18, b: 42 };
    const max = Math.max(1, ...values.filter(Number.isFinite)) * 1.12;
    const x = (i) => box.l + i * (box.w - box.l - box.r) / 3;
    const y = (v) => box.h - box.b - (v / max) * (box.h - box.t - box.b);
    let svg = `<svg viewBox="0 0 ${box.w} ${box.h}" role="img" aria-label="${esc(t('stageChartAria'))}"><title>${esc(t('stageChartAria'))}</title><desc>${esc(levelSummaryText(values))}</desc>`;
    for (let i = 0; i <= 4; i++) {
      const v = max * i / 4, yy = y(v);
      svg += `<line class="gridline" x1="${box.l}" y1="${yy}" x2="${box.w - box.r}" y2="${yy}"/><text class="tick-label" x="${box.l - 8}" y="${yy + 3}" text-anchor="end">${fmt(v / 1000, 1)}</text>`;
    }
    svg += `<line class="axis-line" x1="${box.l}" y1="${box.t}" x2="${box.l}" y2="${box.h - box.b}"/><line class="axis-line" x1="${box.l}" y1="${box.h - box.b}" x2="${box.w - box.r}" y2="${box.h - box.b}"/>`;
    const valid = values.map((v, i) => Number.isFinite(v) ? `${x(i)},${y(v)}` : '').filter(Boolean);
    if (valid.length > 1) svg += `<polyline points="${valid.join(' ')}" fill="none" stroke="#087b72" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    values.forEach((v, i) => {
      if (!Number.isFinite(v)) return;
      const selected = i === state.levelIndex;
      svg += `<circle cx="${x(i)}" cy="${y(v)}" r="${selected ? 6 : 4.5}" fill="${selected ? '#e6b34b' : '#087b72'}" stroke="#fff" stroke-width="2"/>`;
      svg += `<text x="${x(i)}" y="${y(v) - 11}" text-anchor="middle" fill="#214c4c" font-weight="700">${fmt(v / 1000, 2)}</text>`;
      svg += `<text class="tick-label" x="${x(i)}" y="${box.h - 19}" text-anchor="middle">N${i + 1}</text>`;
    });
    svg += `<text class="axis-label" x="${box.w - box.r}" y="${box.h - 3}" text-anchor="end">kW</text></svg>`;
    $('#level-chart').innerHTML = svg;
  }

  function levelSummaryText(values) { return values.map((v, i) => `${i + 1}: ${Number.isFinite(v) ? fmt(v / 1000, 3) + ' kW' : t('noValue')}`).join('; '); }

  function renderLevelDetail() {
    const i = state.levelIndex;
    const level = LEVELS[i];
    const record = levelRecords()[i];
    const params = record?.params;
    const stageName = `${state.lang === 'pt' ? 'Otimização Nível' : 'Optimization Level'} ${i + 1}`;
    const paramHtml = fmtParams(params).map((p) => `<span class="param-pill">${esc(p)}</span>`).join('');
    const valueLine = Number.isFinite(record?.Wnet_W) ? `${fmt(record.Wnet_W / 1000, 3)} kW` : t('noValue');
    const structureName = state.ig === '1' ? (state.lang === 'pt' ? 'MEA física · hcanal ≥ 0,1 mm' : 'Physical MEA · hchannel ≥ 0.1 mm') : (state.lang === 'pt' ? 'Proporções do estudo de 2004/2005 · sem hmin' : '2004/2005 study proportions · no hmin');
    $('#level-detail').innerHTML = `<div class="detail-topline"><span class="detail-number">${level.number}</span><span>${esc(stageName)} · ${esc(level.key.replace('_D1', ''))}</span></div>
      <h3>${esc(TEXT[state.lang].levelNames[i])}</h3>
      <p>${esc(TEXT[state.lang].levelBodies[i])} ${esc(level.formula)}</p>
      <dl class="detail-list">
        <div><dt>${esc(t('detailFixed'))}</dt><dd>${esc(TEXT[state.lang].levelKept[i])}</dd></div>
        <div><dt>${esc(t('detailReleased'))}</dt><dd>${esc(TEXT[state.lang].levelNew[i])}</dd></div>
        <div><dt>${esc(t('detailParams'))}</dt><dd>${valueLine} · ${esc(structureName)}</dd></div>
        <div><dt>${esc(t('detailActive'))}</dt><dd>${esc(activeName(record?.active))}</dd></div>
      </dl>
      <div class="case-parameters">${paramHtml || `<span class="param-pill">${esc(t('noValue'))}</span>`}</div>`;
  }

  function fillCurveOptions(preferredCase = null) {
    const options = curvesForContext();
    const select = $('#curve-select');
    if (!options.length) {
      select.innerHTML = '';
      return;
    }
    const preferred = preferredCase || curve()?.caso || 'otimo';
    const selected = options.find(([id, c]) => id === state.curveId) || options.find(([, c]) => c.caso === preferred) || options[0];
    state.curveId = selected[0];
    select.innerHTML = options.map(([id, c], idx) => {
      const type = c.caso === 'otimo' ? t('caseOptimum') : t('caseReference');
      const p = c.params;
      const label = `${type} · ξs ${fmtAuto(p.xis, 4)} · Lcc ${fmtAuto(p.Lcc_mm, 2)} mm · ${p.ryx}/${p.rzx}`;
      return `<option value="${esc(id)}" ${id === state.curveId ? 'selected' : ''}>${esc(label)}</option>`;
    }).join('');
    const c = curve();
    const lastFeasible = Math.max(0, c.feasible.map((ok, i) => ok ? i : -1).filter((i) => i >= 0).at(-1) ?? 0);
    const maxPoint = state.showInfeasible ? c.I_A.length - 1 : lastFeasible;
    $('#current-slider').max = String(maxPoint);
    state.point = Math.max(0, Math.min(state.point, maxPoint));
    $('#current-slider').value = String(state.point);
  }

  function renderCaseParams() {
    const p = curve().params;
    const tags = [
      `${t('caseTags').xi} = ${fmtAuto(p.xis, 5)}`,
      `Lcc = ${fmtAuto(p.Lcc_mm, 3)} mm`,
      `${t('caseTags').shape} = ${fmtAuto(p.ryx, 3)} / ${fmtAuto(p.rzx, 3)}`,
      `${t('caseTags').coolantRatio} = ${fmtAuto(p.fac_cf, 2)}`,
      `${t('caseTags').plates} = ${fmtAuto(curve().npl, 0)}`
    ];
    $('#case-parameters').innerHTML = tags.map((s) => `<span class="param-pill">${esc(s)}</span>`).join('');
  }

  function renderMetrics() {
    const pnt = currentPoint();
    if (!pnt) return;
    const { c, i, feasible } = pnt;
    const gross = c.Wg_W[i], net = c.Wnet_W[i], aux = gross - net;
    const heatKw = c.mAl_cons_kgs[i] * 16_552_000 / 1000;
    const metrics = [
      ['metricGross', gross, 'W', 0, false], ['metricNet', net, 'W', 0, true], ['metricAux', aux, 'W', 1, false],
      ['metricVoltage', c.Vcell[i], 'V', 3, false], ['metricTemp', c.Tmax[i] - 273.15, 'K', 1, false], ['metricH2', c.mH2_fed_kgs[i] * 3600, 'h2', 3, false],
      ['metricAl', c.mAl_cons_kgs[i] * 1000, 'al', 3, false], ['metricHeat', heatKw, 'heat', 2, false]
    ];
    $('#operating-metrics').innerHTML = metrics.map(([key, value, unitKey, digits, primary]) => `<div class="metric-card ${primary ? 'metric-primary' : ''}"><span class="metric-name">${esc(t(key))}</span><strong>${fmt(value, digits)}</strong><span class="metric-unit">${esc(t('metricUnits')[unitKey])}${key === 'metricHeat' ? '*' : ''}</span></div>`).join('');
    $('#current-output').textContent = `${fmt(c.I_A[i], 2)} A`;
    $('#current-min').textContent = `${fmt(c.I_A[0], 2)} A`;
    const maxIndex = Number($('#current-slider').max);
    $('#current-max').textContent = `${fmt(c.I_A[maxIndex], 2)} A`;
    const alert = $('#feasibility-alert');
    alert.hidden = feasible;
    if (!feasible) alert.textContent = t('infeasibleMessage');
  }

  function svgBase({ w, h, margin, xDomain, yDomain, xTicks = 5, yTicks = 4, xLabel, yLabel, aria, xFormat, yFormat }) {
    const iw = w - margin.l - margin.r, ih = h - margin.t - margin.b;
    const X = (v) => margin.l + (v - xDomain[0]) / ((xDomain[1] - xDomain[0]) || 1) * iw;
    const Y = (v) => h - margin.b - (v - yDomain[0]) / ((yDomain[1] - yDomain[0]) || 1) * ih;
    let svg = `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(aria)}"><title>${esc(aria)}</title><desc>${esc(aria)}</desc>`;
    for (let i = 0; i <= yTicks; i++) {
      const value = yDomain[0] + (yDomain[1] - yDomain[0]) * i / yTicks;
      const y = Y(value);
      svg += `<line class="gridline" x1="${margin.l}" y1="${y}" x2="${w - margin.r}" y2="${y}"/><text class="tick-label" x="${margin.l - 8}" y="${y + 3}" text-anchor="end">${esc(yFormat(value))}</text>`;
    }
    for (let i = 0; i <= xTicks; i++) {
      const value = xDomain[0] + (xDomain[1] - xDomain[0]) * i / xTicks;
      const x = X(value);
      svg += `<line class="gridline" x1="${x}" y1="${margin.t}" x2="${x}" y2="${h - margin.b}" opacity=".48"/><text class="tick-label" x="${x}" y="${h - margin.b + 16}" text-anchor="middle">${esc(xFormat(value))}</text>`;
    }
    svg += `<line class="axis-line" x1="${margin.l}" y1="${margin.t}" x2="${margin.l}" y2="${h - margin.b}"/><line class="axis-line" x1="${margin.l}" y1="${h - margin.b}" x2="${w - margin.r}" y2="${h - margin.b}"/>`;
    svg += `<text class="axis-label" x="${margin.l + iw / 2}" y="${h - 4}" text-anchor="middle">${esc(xLabel)}</text><text class="axis-label" transform="translate(12 ${margin.t + ih / 2}) rotate(-90)" text-anchor="middle">${esc(yLabel)}</text>`;
    return { svg, X, Y, margin, w, h };
  }

  function linePath(points, x, y) {
    let path = '', started = false;
    for (const point of points) {
      if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) { started = false; continue; }
      path += `${started ? 'L' : 'M'}${x(point.x).toFixed(1)},${y(point.y).toFixed(1)} `;
      started = true;
    }
    return path.trim();
  }

  function renderPowerChart() {
    const { c, i } = currentPoint();
    const x = c.I_A;
    const feasibleIndexes = c.feasible.map((ok, j) => ok ? j : -1).filter((j) => j >= 0);
    const lastOk = feasibleIndexes.at(-1) ?? 0;
    const includeInvalid = state.showInfeasible;
    const count = includeInvalid ? x.length : lastOk + 1;
    const allSeries = [
      { name: t('gross'), values: c.Wg_W, color: '#3d82a0', dash: '' },
      { name: t('net'), values: c.Wnet_W, color: '#087b72', dash: '' },
      { name: t('aux'), values: c.Wg_W.map((v, j) => v - c.Wnet_W[j]), color: '#7058a7', dash: '5 4' }
    ];
    const validValues = allSeries.flatMap((s) => s.values.slice(0, includeInvalid ? x.length : lastOk + 1).filter(Number.isFinite));
    const yMax = Math.max(1, ...validValues) * 1.13;
    const minX = Math.min(...x), maxX = x[includeInvalid ? x.length - 1 : lastOk] || x.at(-1);
    const chart = svgBase({ w: 760, h: 318, margin: { l: 57, r: 15, t: 14, b: 48 }, xDomain: [minX, maxX], yDomain: [0, yMax], xTicks: 5, yTicks: 4, xLabel: t('axisCurrent'), yLabel: t('axisPower'), aria: t('currentGraphAria'), xFormat: (v) => fmtAuto(v, 0), yFormat: (v) => fmtAuto(v, 0) });
    let svg = chart.svg;
    const boundaryX = chart.X(x[lastOk]);
    svg += `<line x1="${boundaryX}" y1="${chart.margin.t}" x2="${boundaryX}" y2="${chart.h - chart.margin.b}" stroke="#b88a32" stroke-width="1.3" stroke-dasharray="3 4"/>`;
    if (lastOk < x.length - 1) svg += `<text class="tick-label" x="${Math.min(boundaryX + 5, chart.w - 105)}" y="${chart.margin.t + 10}" fill="#97712e">${esc(t('validBoundary'))}</text>`;
    allSeries.forEach((s) => {
      const valid = [];
      for (let j = 0; j <= Math.min(lastOk, count - 1); j++) valid.push({ x: x[j], y: s.values[j] });
      svg += `<path d="${linePath(valid, chart.X, chart.Y)}" fill="none" stroke="${s.color}" stroke-width="${s.name === t('net') ? 2.9 : 2.1}" stroke-linecap="round" stroke-linejoin="round" ${s.dash ? `stroke-dasharray="${s.dash}"` : ''}/>`;
      if (includeInvalid && lastOk < x.length - 1) {
        const invalid = [];
        for (let j = lastOk; j < x.length; j++) invalid.push({ x: x[j], y: s.values[j] });
        svg += `<path d="${linePath(invalid, chart.X, chart.Y)}" fill="none" stroke="#919896" stroke-opacity=".72" stroke-width="1.6" stroke-dasharray="4 5"/>`;
      }
    });
    const activeX = chart.X(x[i]);
    svg += `<line x1="${activeX}" y1="${chart.margin.t}" x2="${activeX}" y2="${chart.h - chart.margin.b}" stroke="#d5a337" stroke-opacity=".54" stroke-width="1.2"/>`;
    allSeries.forEach((s) => svg += `<circle cx="${activeX}" cy="${chart.Y(s.values[i])}" r="4.5" fill="${s.color}" stroke="#fff" stroke-width="2"/>`);
    svg += '</svg>';
    $('#power-chart').innerHTML = svg;
    $('#power-legend').innerHTML = allSeries.map((s) => `<span class="legend-item"><i class="legend-line" style="background:${s.color};${s.dash ? `height:0;border-top:2px dashed ${s.color};` : ''}"></i>${esc(s.name)}</span>`).join('') + (includeInvalid ? `<span class="legend-item"><i class="legend-line legend-dashed"></i>${esc(t('infeasible'))}</span>` : '');
  }

  function renderPolarizationChart() {
    const { c, i } = currentPoint();
    const xs = c.j_Acm2;
    const okIdx = c.feasible.map((ok, j) => ok ? j : -1).filter((j) => j >= 0);
    const lastOk = okIdx.at(-1) ?? 0;
    const includeInvalid = state.showInfeasible;
    const maxIndex = includeInvalid ? xs.length - 1 : lastOk;
    const visibleX = xs.slice(0, maxIndex + 1).filter(Number.isFinite);
    const visibleV = c.Vcell.slice(0, maxIndex + 1).filter(Number.isFinite);
    const chart = svgBase({ w: 650, h: 318, margin: { l: 57, r: 15, t: 14, b: 48 }, xDomain: [0, Math.max(.01, ...visibleX) * 1.04], yDomain: [Math.max(0, Math.min(...visibleV) * .96), Math.max(1.25, ...visibleV) * 1.02], xTicks: 5, yTicks: 4, xLabel: t('axisCurrentDensity'), yLabel: t('axisVoltage'), aria: t('polarizationGraphAria'), xFormat: (v) => fmtAuto(v, 1), yFormat: (v) => fmtAuto(v, 2) });
    let svg = chart.svg;
    const valid = [];
    for (let j = 0; j <= lastOk; j++) valid.push({ x: xs[j], y: c.Vcell[j] });
    svg += `<path d="${linePath(valid, chart.X, chart.Y)}" fill="none" stroke="#087b72" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (includeInvalid && lastOk < xs.length - 1) {
      const invalid = [];
      for (let j = lastOk; j < xs.length; j++) invalid.push({ x: xs[j], y: c.Vcell[j] });
      svg += `<path d="${linePath(invalid, chart.X, chart.Y)}" fill="none" stroke="#8c9492" stroke-width="1.7" stroke-dasharray="5 5"/>`;
    }
    svg += `<circle cx="${chart.X(xs[i])}" cy="${chart.Y(c.Vcell[i])}" r="5.5" fill="#e6b34b" stroke="#fff" stroke-width="2.5"/>`;
    svg += '</svg>';
    $('#polarization-chart').innerHTML = svg;
    $('#polarization-legend').innerHTML = `<span class="legend-item"><i class="legend-line line-teal"></i>${esc(t('voltageSeries'))}</span><span class="legend-item"><i class="legend-dot dot-gold"></i>${esc(t('currentPoint'))}</span>${includeInvalid ? `<span class="legend-item"><i class="legend-line legend-dashed"></i>${esc(t('infeasible'))}</span>` : ''}`;
  }

  function renderTableIfOpen() {
    const details = $('.data-table-details');
    if (!details.open) return;
    const c = curve();
    const rows = c.I_A.map((current, i) => {
      const invalid = !c.feasible[i];
      const aux = c.Wg_W[i] - c.Wnet_W[i];
      return `<tr class="${invalid ? 'row-infeasible' : ''}"><td>${fmt(current, 2)}</td><td>${fmt(c.Vcell[i], 4)}</td><td>${fmt(c.Wg_W[i], 1)}</td><td>${fmt(c.Wnet_W[i], 1)}</td><td>${fmt(aux, 2)}</td><td>${esc(invalid ? t('infeasible') : t('feasible'))}</td></tr>`;
    }).join('');
    $('#power-table').innerHTML = `<table><thead><tr><th>${esc(t('tableCurrent'))}</th><th>${esc(t('tableVoltage'))}</th><th>${esc(t('tableGross'))}</th><th>${esc(t('tableNet'))}</th><th>${esc(t('tableAux'))}</th><th>${esc(t('tableValidity'))}</th></tr></thead><tbody>${rows}</tbody></table>`;
  }

  function renderSweep() {
    const set = sweep();
    if (!set) { $('#sweep-chart').innerHTML = `<div class="no-data">${esc(t('chartNoData'))}</div>`; return; }
    const pts = set.points;
    state.xiPoint = Math.max(0, Math.min(state.xiPoint, pts.length - 1));
    const slider = $('#xi-slider');
    slider.max = String(pts.length - 1);
    slider.value = String(state.xiPoint);
    const p = pts[state.xiPoint];
    $('#xi-output').textContent = Number.isFinite(p.xi) ? fmt(p.xi, 5) : '—';
    $('#xi-index-output').textContent = `${t('sampleLabel')} ${state.xiPoint + 1}/${pts.length}`;
    $('#xi-result').textContent = Number.isFinite(p.Wnet_W) ? `${fmt(p.Wnet_W / 1000, 3)} kW · ${esc(p.feasible ? t('feasible') : t('infeasible'))}` : t('noConvergence');
    $('#sweep-params').innerHTML = fmtParams(set.params).map((tag) => `<span class="param-pill">${esc(tag)}</span>`).join('') + `<span class="param-pill">Lx ${fmt(Math.pow(DATA.meta.VT_m3 / (set.params.ryx * set.params.rzx), 1 / 3) * 1000, 1)} mm</span>`;
    const validValues = pts.filter((point) => point.feasible && Number.isFinite(point.Wnet_W)).map((point) => point.Wnet_W);
    const ymax = Math.max(1, ...validValues) * 1.12;
    const minx = Math.min(...pts.map((point) => point.xi)), maxx = Math.max(...pts.map((point) => point.xi));
    const chart = svgBase({ w: 650, h: 245, margin: { l: 58, r: 15, t: 15, b: 47 }, xDomain: [minx, maxx], yDomain: [0, ymax], xTicks: 5, yTicks: 4, xLabel: t('axisXi'), yLabel: state.lang === 'pt' ? 'Potência líquida (kW)' : 'Net power (kW)', aria: t('sweepGraphAria'), xFormat: (v) => fmtAuto(v, 3), yFormat: (v) => fmtAuto(v / 1000, 1) });
    let svg = chart.svg;
    const good = pts.map((point) => ({ x: point.xi, y: point.feasible ? point.Wnet_W : null }));
    svg += `<path d="${linePath(good, chart.X, chart.Y)}" fill="none" stroke="#087b72" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;
    pts.forEach((point, index) => {
      const valueExists = Number.isFinite(point.Wnet_W) && Number.isFinite(point.xi);
      if (!valueExists) return;
      const cx = chart.X(point.xi), cy = chart.Y(point.Wnet_W);
      const selected = index === state.xiPoint;
      svg += `<circle cx="${cx}" cy="${cy}" r="${selected ? 6 : 3.1}" fill="${point.feasible ? (selected ? '#e6b34b' : '#087b72') : '#fff'}" stroke="${point.feasible ? (selected ? '#a8771c' : '#fff') : '#999'}" stroke-width="${selected ? 2 : 1.5}"/>`;
    });
    if (Number.isFinite(p.Wnet_W)) svg += `<line x1="${chart.X(p.xi)}" y1="${chart.margin.t}" x2="${chart.X(p.xi)}" y2="${chart.h - chart.margin.b}" stroke="#d3a140" stroke-dasharray="3 4"/>`;
    svg += '</svg>';
    $('#sweep-chart').innerHTML = svg;
  }

  function updateEquationCards() {
    const selected = currentPoint();
    if (!selected) return;
    const { c, i } = selected;
    const aux = c.Wg_W[i] - c.Wnet_W[i];
    $('#eq-voltage-live').textContent = `${fmt(c.Vcell[i], 4)} V`;
    $('#eq-h2-live').textContent = `${fmt(c.mH2_fed_kgs[i] * 3600, 3)} kg/h`;
    $('#eq-aux-live').textContent = `${fmt(aux, 2)} W`;
    $('#eq-geometry-live').textContent = `${fmt(c.npl, 0)} ${state.lang === 'pt' ? 'células' : 'cells'}`;
    const p = c.params;
    const Lx = Math.pow(DATA.meta.VT_m3 / (p.ryx * p.rzx), 1 / 3);
    const Ls = p.xis * Math.pow(DATA.meta.VT_m3, 1 / 3);
    $('#eq-geometry-scope').textContent = `Lx = ${fmt(Lx * 1000, 2)} mm · Ls = ${fmt(Ls * 1000, 3)} mm · Lcc = ${fmt(p.Lcc_mm, 3)} mm`;
    const heat = c.mAl_cons_kgs[i] * 16_552_000 / 1000;
    $('#eq-heat-live').textContent = `${fmt(heat, 2)} kW`;
  }

  function coolantCp() { return state.fluid === 'agua' ? 4.18 : 1.005; }
  function coolantFlow(qkw, deltaK) { return qkw / (coolantCp() * deltaK); }
  function renderCoolantDemo() {
    const q = Number($('#qcool-slider').value), dt = Number($('#deltat-slider').value);
    state.qcool = q; state.deltaT = dt;
    $('#coolant-result-label').textContent = state.lang === 'pt' ? `Vazão requerida de ${state.fluid === 'agua' ? 'água' : 'ar'}` : `Required ${state.fluid === 'agua' ? 'water' : 'air'} flow`;
    const cpText = state.lang === 'pt' ? `cp adotado para ${state.fluid === 'agua' ? 'água' : 'ar'} = ${fmt(coolantCp(), 3)} kJ kg⁻¹ K⁻¹` : `cp assumed for ${state.fluid === 'agua' ? 'water' : 'air'} = ${fmt(coolantCp(), 3)} kJ kg⁻¹ K⁻¹`;
    $('#coolant-disclaimer').textContent = state.lang === 'pt' ? `Demonstração algébrica com Q̇cool definido pelo usuário (${cpText}). Não representa um novo cálculo do balanço térmico da pilha.` : `Algebra demonstration with user-defined Q̇cool (${cpText}). This is not a new fuel-cell thermal-balance calculation.`;
    $('#qcool-output').textContent = `${fmt(q, 1)} ${t('qcoolUnit')}`;
    $('#deltat-output').textContent = `${fmt(dt, 1)} ${t('deltaUnit')}`;
    $('#coolant-flow-output').textContent = `${fmt(coolantFlow(q, dt), 4)} ${t('coolantFlowUnit')}`;
    const dts = Array.from({ length: 11 }, (_, i) => 5 + i * .5);
    const flows = dts.map((x) => coolantFlow(q, x));
    const chart = svgBase({ w: 690, h: 190, margin: { l: 65, r: 17, t: 12, b: 42 }, xDomain: [5, 10], yDomain: [0, Math.max(...flows) * 1.12], xTicks: 5, yTicks: 3, xLabel: state.lang === 'pt' ? 'ΔTcf (K)' : 'ΔTcf (K)', yLabel: state.lang === 'pt' ? 'ṁcf (kg/s)' : 'ṁcf (kg/s)', aria: t('coolantGraphAria'), xFormat: (v) => fmtAuto(v, 1), yFormat: (v) => fmtAuto(v, 3) });
    let svg = chart.svg;
    const line = dts.map((value, i) => ({ x: value, y: flows[i] }));
    svg += `<path d="${linePath(line, chart.X, chart.Y)}" fill="none" stroke="#3d82a0" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    svg += `<line x1="${chart.X(dt)}" y1="${chart.margin.t}" x2="${chart.X(dt)}" y2="${chart.h - chart.margin.b}" stroke="#d4a03b" stroke-dasharray="3 4"/><circle cx="${chart.X(dt)}" cy="${chart.Y(coolantFlow(q, dt))}" r="5" fill="#e6b34b" stroke="#fff" stroke-width="2"/>`;
    svg += '</svg>';
    $('#coolant-chart').innerHTML = svg;
  }

  function updateAll() {
    if (!DATA) return;
    renderLevels();
    fillCurveOptions();
    renderCaseParams();
    renderMetrics();
    renderPowerChart();
    renderPolarizationChart();
    renderTableIfOpen();
    renderSweep();
    updateEquationCards();
    renderCoolantDemo();
  }

  $('#lang-pt').addEventListener('click', () => { state.lang = 'pt'; applyLanguage(); });
  $('#lang-en').addEventListener('click', () => { state.lang = 'en'; applyLanguage(); });
  $('#fluid-select').addEventListener('change', (event) => {
    state.fluid = event.target.value;
    state.point = 0;
    state.xiPoint = 8;
    fillCurveOptions('otimo');
    updateAll();
  });
  $('#structure-select').addEventListener('change', (event) => {
    state.ig = event.target.value;
    state.point = 0;
    state.xiPoint = 8;
    fillCurveOptions('otimo');
    updateAll();
  });
  $('#curve-select').addEventListener('change', (event) => {
    state.curveId = event.target.value;
    state.point = 0;
    fillCurveOptions();
    updateAll();
  });
  $('#current-slider').addEventListener('input', (event) => {
    state.point = Number(event.target.value);
    renderMetrics(); renderPowerChart(); renderPolarizationChart(); renderTableIfOpen(); updateEquationCards();
  });
  $('#show-infeasible').addEventListener('change', (event) => {
    state.showInfeasible = event.target.checked;
    fillCurveOptions();
    updateAll();
  });
  $('#xi-slider').addEventListener('input', (event) => { state.xiPoint = Number(event.target.value); renderSweep(); });
  $('#qcool-slider').addEventListener('input', renderCoolantDemo);
  $('#deltat-slider').addEventListener('input', renderCoolantDemo);
  $('.data-table-details').addEventListener('toggle', renderTableIfOpen);

  $('#fluid-select').value = state.fluid;
  $('#structure-select').value = state.ig;
  $('#show-infeasible').checked = false;
  fillCurveOptions('otimo');
  applyLanguage();
})();

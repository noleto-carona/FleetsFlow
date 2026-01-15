# Memórias do Chat - FleetsFlow

## Histórico de Alterações Relevantes

### [2026-01-14] Refinamentos de Interface e Áudio
- **Sidebar**:
  - Adicionado efeito sonoro suave (`ui-click-menu...`) ao passar o mouse (hover) nos itens de navegação.
  - Ajustado estilo de hover para usar a cor verde do tema (`#64ffda`) com 10% de opacidade, substituindo o fundo sólido ou escuro anterior.
- **Página de Operações**:
  - **Áudio**: 
    - Corrigido problema de som residual após mute. Implementado reset agressivo (`pause`, `currentTime=0`, `volume=0`).
    - Sincronização bidirecional entre botão Mute e Slider de Volume.
    - Estado inicial definido como Mudo (`isMuted=true`, `volume=0`) para respeitar políticas de autoplay do navegador e preferência do usuário.
    - Volume padrão ao desmutar definido para 15% (`0.15`).
  - **Layout**:
    - Reduzido tamanho do `RadarMap` para 480px (simulando zoom de 80%).
    - Painel "Live Telemetry" ajustado para `w-64` (anteriormente maior), alinhando com a redução visual da página.

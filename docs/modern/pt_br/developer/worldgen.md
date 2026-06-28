---
title: Notas de Geração de Mundo
order: 6
---

## Configurações de Ruído

**Veios de minério**: Refere-se aos [grandes veios sinuosos](https://minecraft.wiki/w/Ore_vein) do vanilla. Desative-os! Você também desejará definir `vein_gap`, `vein_ridged` e `vein_toggle` como `0`.

**Nível do Mar**: Qualquer bloco de ar abaixo desta altura será substituído pelo que está em `default_fluid`.

**Fluido Padrão**: Usado com `sea_level`. Você sempre pode especificar `minecraft:air` como fluido se não quiser isto.

**Ruído**: `min_y` é a base da dimensão, mas isso não coloca bedrock por si só. `height` é a altura total contada a partir de min_y (portanto seu valor não é igual ao limite de construção). `size_horizontal`/`size_vertical` afeta o desempenho do ruído. Números maiores oferecem melhor desempenho, mas fazem o ruído parecer como artefatos jpg.

**Alvo de Spawn**: Especifica "boas condições" para um novo jogador fazer spawn em um mundo completamente novo, para que não seja colocado no meio do oceano (geralmente). Não estamos usando isto, pois o ad astra mantém suas coordenadas X/Z ao viajar entre dimensões.

### Roteador de Ruído

**Aquíferos:** Eles impedem que todo o subterrâneo seja inundado pelo fluido padrão. [Aqui](https://gist.github.com/jacobsjo/0ce1f9d02e5c3e490e228ac5ad810482) está um guia sobre como usá-los.

**Densidade Final**: Isto constrói as [cavernas enormes](https://cdn.discordapp.com/attachments/750811307925831841/1396244346927317064/2025-07-19_22.36.08.png?ex=687d6161&is=687c0fe1&hm=0dd064a1df91e32120720f2994fffce8da2e5e54d019c61f82b9d8b0d267783f&) com os pilares gigantes nelas.

**Temperatura** e **Vegetação**: Afetam o posicionamento de biomas.

**Lava**: defina como `0` se você não quiser lava no fundo de sua dimensão.

## Funções de Densidade

Todas afetam a geração inicial da dimensão, para o que é sólido e o que é ar.

Aqui está o que todos os padrões fazem:

- **Desvio**: Controla principalmente o nível Y.
- **Fator**: Controla quanto o ruído 3D subjacente afeta o terreno. Números baixos geram os pilares muito altos que você vê em biomas expostos ao vendo ou terras áridas.
- **Irregularidade**: Incerto, mas é zero em oceanos?
- **Cavernas/Pilares**: Afeta o tipo de "irregularidades" que você vê em encostas.

### Regra de Superfície

As funções de densidade constroem o que é sólido e o que é ar, enquanto a regra de superfície decide qual bloco colocar em toda a área sólida. Ela "executa" de cima para baixo (no arquivo, não no mundo), e uma vez que algo define um bloco, nada mais aqui pode afetá-lo.

## Escultores

Eles executam _após_ as configurações de ruído. São responsáveis pelos cânions e túneis finos colocados aleatoriamente. Eles também têm suas próprias configurações para preenchê-los com lava em um nível Y específico, se isso for algo que você queira controlar.

Há também um tipo de recurso de posicionamento que é executado para cada bloco que um esculpidor removeu. Útil para substituir os tetos por rocha endurecida. (Confira nosso próprio `hardening.json`)

## Estruturas

[Aqui](https://gist.github.com/GentlemanRevvnar/387f9ee28613715c187a36dbc1dff35d) há um excelente guia sobre como criar estruturas, incluindo como usar blocos jigsaws.
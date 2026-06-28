---
title: Scripts KubeJS
order: 3
---

# Scripts de Inicialização

## Informações Gerais

- Outros binders do KubeJS ainda funcionam com quaisquer destes métodos, por exemplo `.tagBlock()`.
- Salvo indicação em contrário, todos os novos métodos aceitam JSONs de estados de bloco com base cardinal para permitir rotação em torno do eixo Y. Exemplo abaixo.

Exemplo de um JSON de estado de bloco cardinal:

```json
{
  "variants": {
    "facing=east": {
      "model": "tfg:block/test",
      "y": 270
    },
    "facing=north": {
      "model": "tfg:block/test",
      "y": 180
    },
    "facing=south": {
      "model": "tfg:block/test"
    },
    "facing=west": {
      "model": "tfg:block/test",
      "y": 90
    }
  }
}
```

***

## Condições Personalizadas do GT

> :bulb: **Condições de Receita Personalizadas:** o TFG inclui várias condições de receita customizadas com bindings de esquema para os ambientes TFC e Ad Astra.

### Métodos de Condição

**Tipo:** `Condição de Oxigenação`

```js
.isOxygenated(event, oxygenated: Boolean)
```

> Define se a receita exige um ambiente oxigenado fornecido pela API de oxigênio do Ad Astra. Se `true`, a receita exige oxigênio. Se `false`, a receita não permite a presença de oxigênio.

***

**Tipo:** `Condição de Mês`

```js
.months(event, months: String[])
```

> Define se a receita pode ser executada apenas durante os meses listados (whitelist). Exemplo: `march, april, december`.

```js
.monthsRange(event, months: String start, String end)
```

> Define um intervalo de meses no qual a receita pode ser executada. Pode envolver índice circular (wrap). Exemplo: `december, june`

***

**Tipo:** `Condição de Estação`

```js
.seasons(event, seasons: String[])
```

> Define se a receita pode ser executada apenas durante as estações permitidas. Exemplo: `spring, fall`

```js
.seasonsRange(event, seasons: String start, String end)
```

> Define um intervalo de estações no qual a receita pode ser executada. Pode envolver índice circular (wrap). Exemplo: `summer, winter`

***

**Tipo:** `Condição de Temperatura`

```js
.climateAvgTemperatureRange(event, temperate: Float start, Float end)
```

> Define a faixa média de temperatura climática na qual a receita pode ser executada. Mínimo: `-1000C`, Máximo: `1000C`

```js
.climateAvgTemperatureGreaterThan(event, temperate: Float value)
```

> Define a temperatura média mínima necessária para a execução da receita.

```js
.climateAvgTemperatureLessThan(event, temperate: Float value)
```

> Define a temperatura média máxima permitida para a execução da receita.

***

**Tipo:** `Condição de Precipitação`

```js
.climateAvgRainfallRange(event, rainfall: Float start, Float end)
```

> Define a faixa média de precipitação climática na qual a receita pode ser executada. Mínimo: `0mm`, Máximo: `500mm`

```js
.climateAvgRainfallGreaterThan(event, rainfall: Float value)
```

> Define a precipitação média mínima necessária para a execução da receita.

```js
.climateAvgRainfallLessThan(event, rainfall: Float value)
```

> Define a precipitação média máxima permitida para a execução da receita.

***

**Tipo:** `Condição de Gravidade`

```js
.gravityRange(event, gravity: Float start, Float end)
```

> Define a faixa de gravidade local na qual a receita pode ser executada. Em m/s^2.

```js
.gravityGreaterThan(event, rainfall: Float value)
```

> Define a gravidade mínima local na qual as receitas irão rodar.

```js
.gravityLessThan(event, rainfall: Float value)
```

> Define a gravidade máxima local na qual as receitas irão rodar.

***

### Exemplo de Condição Personalizada

```js
let a = event.recipes.gtceu.greenhouse('tfg:example')
    .notConsumable(input)
    .itemOutputs(output)
    .duration(20)
    .EUt(20)

TFGRecipeSchemaBindings.isOxygenated(a, true)
```

## Builders Personalizados

> :bulb: **Builders de Partículas:** o TFG fornece alguns builders que permitem criar blocos emissores de partículas customizados `tfg:particle_emitter_decoration`, `tfg:particle_emitter` e `tfg:active_particle_emitter`. Blocos emissores usam `consumer<particles>`, permitindo múltiplos conjuntos de partículas por bloco.

### Tipos de Método

**Tipo:** `tfg:particle_emitter` & `tfg:particle_emitter_decoration`

**Métodos Adicionais:**

```js
.particles(particles: Consumer<ParticleSetBuilder>)
```

> Define as propriedades das partículas geradas.

```js
.hasTicker(ticker: Boolean)
```

> Indica se o bloco deve virar uma entidade de bloco e usar um ticker dedicado. Necessário para atrasos personalizados de partículas e para continuar gerando partículas fora do alcance imediato do jogador. Padrão: `false`.

```js
.emitDelay(delay: Int);
```

> Requer `ticker(true)`. Define o intervalo superior do atraso do ticker personalizado. Partículas surgirão em intervalos aleatórios até `Math.max(0, delay)`. Padrão: `0`.

***

**Consumidores Adicionais:** `Consumer<ParticleSetBuilder>`

**Métodos** de `ParticleSetBuilder`:

```js
.position(position: {Double x, Double y, Double z})
```

> Define a posição inicial do emissor de partícula relativa ao vértice inicial da posição do bloco. Padrão `(0.5, 0.5, 0.5)`.

```js
.range(range: {Double x, Double y, Double z})
```

> Define o raio de geração em cada eixo, tendo `position` como centro. Padrão `(0.25, 1.0, 0.25)`.

```js
.velocity(velocity: {Double x, Double y, Double z})
```

> Define a velocidade linear inicial da partícula. Padrão `(0, 0, 0)`.

```js
.particle(particle: {Supplier<SimpleParticleType> | "minecraft:dust"})
```

> Define o tipo de partícula `SimpleParticleType` a ser gerado. Se `minecraft:dust` for usado, o método `dust` fica disponível.

```js
.count(count: Int)
```

> Quantidade de partículas geradas a cada tick de emissão. Padrão: `1`.

```js
.forced(forced: Boolean)
```

> Define se a exibição de partículas deve ser "forçada". O que faz o renderizador do cliente ignorar configurações de partículas do usuário. Funciona apenas para alguns tipos de partículas, como `minecraft:campfire_signal_smoke`. Padrão: `false`.

```js
.dust(dust: {Float r, Float g, Float b, Float scale})
```

> Se `particle` = `minecraft:dust`, há um método extra para definir cor RGB e escala das partículas de poeira. Padrão `(1.0, 1.0, 1.0, 1.0)`.

**Exemplo:**

```js
StartupEvents.registry('block', event => {

 event.create('tfg:example_a', 'tfg:particle_emitter_decoration')
    .particles(a => a
        .position(0.5, 0.5, 0.5)
        .range(0.3, 2, 0.3)
        .velocity(0, 0.1, 0)
        .count(6)
        .forced(true)
        .particle('minecraft:dust')
        .dust(0.0, 1.0, 0.2, 1.5))
    .hasTicker(true)
    .emitDelay(5);

});

```

O exemplo acima cria um bloco decorativo que gera 6 partículas verdes `minecraft:dust` no centro do bloco com raio Y de 2 blocos. E um atraso médio entre 0-5 ticks. Este bloco é renderizado como uma entidade de bloco para que partículas apareçam mesmo à distância, e como um construtor decorativo, ele se comporta da mesma forma que um bloco de flor:

![particle_emitter_decoration_example](https://github.com/user-attachments/assets/82e6671e-acc6-4373-abfd-e4a4a03e1bc2)

**Tipo:** `tfg:active_particle_emitter`

**Métodos Adicionais:**

> 📝 **Nota:** consumidores de emissores de partículas ativos usam os mesmos métodos dos consumidores de emissores de partículas acima.

```js
.activeParticles(particles: Consumer<ParticleSetBuilder>)
```

> Define partículas geradas enquanto o bloco tem o blockstate `ACTIVE=TRUE`.

```js
.inactiveParticles(particles: Consumer<ParticleSetBuilder>)
```

> Define partículas geradas enquanto o bloco tem o blockstate `ACTIVE=FALSE`.

```js
.activeLight(active_light: Int)
```

> Define o nível de luz emitido enquanto o bloco está `ACTIVE=TRUE`. Valor entre `(0-15)`. Opcional.

```js
.inactiveLight(active_light: Int)
```

> Define o nível de luz emitido enquanto o bloco está `ACTIVE=FALSE`. Valor entre `(0-15)`. Opcional.

**Exemplo:**

```js
StartupEvents.registry('block', event => {

    event.create('tfg:example_b', 'tfg:active_particle_emitter')
        .activeLight(12)
        .inactiveLight(0)
        // First particle set
        .activeParticles(a => a
            .particle('tfg:fish_school')
            .position(0.5, 1.5, 0.5)
            .range(0.0, 2.0, 0.0)
            .velocity(0.0, 0.0, 0.0)
            .count(5)
            .forced(false)
        )
        // Second particle set
        .activeParticles(a => a
            .particle('minecraft:current_down')
            .position(0.0, 3.8, 0.0)
            .range(5.0, 0.0, 5.0)
            .velocity(0.0, 0.1, 0.0)
            .count(5)
            .forced(false)
        )
        // Third particle set
        .activeParticles(a => a
            .particle('minecraft:current_down')
            .position(0.0, 3.8, 0.0)
            .range(0.5, 0.0, 0.5)
            .velocity(0.0, 0.1, 0.0)
            .count(5)
            .forced(false)
        )
        .hasTicker(true)
        .emitDelay(20);

});
```

***

## Blocos Decorativos de Planta

Existem vários tipos de plantas decorativas.

O `tfg:decorative_plant` básico cria um bloco com atributos típicos de planta como deslocamento aleatório, quebra instantânea, não colocável em faces sem suporte e caixa de colisão reduzida. Suporta também preenchimento com água comum, água do mar, água de nascente e água de Marte. (Mais fluidos podem ser adicionados através do Core)

- Por padrão o builder gera tabelas de loot para colher a planta com facas, enxadas e foices. Para substituir o item resultante por algo diferente, use o método `lootItem()`, o que fará com que apenas tesouras possam recolher o bloco 'original'.
- Se você quiser dar ao jogador (e apenas o jogador) um efeito enquanto passa por esta planta, use o método `effect()`, que recebe uma string de ID de efeito de entidade como seu argumento. Enquanto o jogador estiver dentro do espaço da planta, 50 ticks do efeito dado serão constantemente aplicados.

O `tfg:tall_decorative_plant` é equivalente ao anterior, mas para plantas com altura n-blocos. Use o método `height()` para definir a altura máxima do bloco alto, até o máximo de 5.

`tfg:floating_decorative_plant` herda do básico, indicado para plantas flutuantes na água, como lírios d'água. Possui método booleano `xz_offset()` (`true` por padrão) que controla se esse bloco deve ter ou não um deslocamento XZ aleatório, para coisas como algas.

`tfg:attached_decorative_plant` herda do básico e é usado para plantas presas a outros blocos, como o fungo do artista do tfc. Só se prende a blocos com a tag `tfg:decorative_plant_attachable`. Também possui o método booleano `allowVertical()` (`false` por padrão) para permitir o posicionamento nas faces superior e inferior de blocos.

### Métodos

```js
event.create(string name, 'tfg:decorative_plant')      // Default box size (3, 0, 3, 13, 7, 13)
```

```js
event.create(string name, 'tfg:tall_decorative_plant') // Default box size (2, 0, 2, 14, 16, 14)
```

### Exemplos

```js
StartupEvents.registry('block', event => {
 event.create('tfg:test', 'tfg:decorative_plant')
  .soundType('nether_wart')        
  .tagItem('tfg:venus_plants')
  .box(3, 0, 3, 13, 14, 13)
  .speedFactor(0.85)
  .effect('minecraft:darkness')
  .lootItem('tfc:straw')
})
```

```js
StartupEvents.registry('block', event => {
 event.create('tfg:test', 'tfg:tall_decorative_plant')
  .soundType('nether_wart')
  .tagItem('tfg:venus_plants')
  .lightLevel(0.4)
  .renderType('translucent')
  .height(3) // 2 by default
})
```

Também é necessário fornecer um arquivo blockstate para o tall_decorative_plant, por exemplo:

É preciso ter estados para TODAS as alturas possíveis de 0 a 4, mesmo que alguns não sejam usados! Caso contrário, você receberá log de spam.

```json
{
  "variants": {
    "height=0": {
      "model": "tfg:block/test_bottom"
    },
    "height=1": {
      "model": "tfg:block/test_top"
    },
    "height=2": {
      "model": ""
    },
    "height=3": {
      "model": ""
    },
    "height=4": {
      "model": ""
    }
  }
}
```

Um exemplo de `tfg:decorative_plant`.
![exemplo_planta_decorativa](https://github.com/user-attachments/assets/dea8d5e2-e1f0-4c85-8600-17d6528b655d)
Um exemplo de `tfg:tall_decorative_plant`.
![exemplo_planta_decorativa_dupla](https://github.com/user-attachments/assets/56c6b828-e726-43c8-86eb-600af1830e22)
Notas:

- Blocos decorativos altos (tall) atualmente não suportam estados de bloco cardinais.

## Funcionalidades Configuradas de Plantas Decorativas Altas

Para ajudar no posicionamento das plantas altas, existe uma funcionalidade configurada `tfg:tall_decorative_plant`. Você pode usá-la assim:

```java
 "type": "tfg:tall_decorative_plant",
 "config": {
  "block": "betterend:lanceleaf",
  "plantHeight": 5,
  "minHeight": 4,
  "maxHeight": 7,
  "middle": 2
 }
```

- `block` especifica o ID do bloco a ser usado. Este deve ser um bloco `tfg:tall_decorative_plant`.
- `plantHeight` é a altura "normal" da planta e deve corresponder ao mesmo que o método `height()` definido no construtor de bloco.
- `minHeight` é altura mínima da planta que você deseja colocar. O menor que isto pode ser é `plantHeight - 1`.
- `maxHeight` é altura máxima possível da planta que pode ser colocada. O posicionador escolhe aleatoriamente um valor entre `minHeight` e `maxHeight`, inclusivo.
- `middle` é o ID do estado de bloco a repetir (para plantas mais altas) ou omitir (para plantas mais curtas).

Por exemplo, com a configuração acima, você pode obter plantas como [0, 1, 3, 4] ou [0, 1, 2, 2, 2, 3, 4].

O posicionador também lida com o log d'água para você.

![Funcionalidade de planta alta](https://github.com/user-attachments/assets/52882c45-d2de-4061-b60b-187905fddeea)

***

***

***
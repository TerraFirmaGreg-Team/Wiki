---
title: Folha de Dicas
order: 1
---

## Folha de Dicas

O objetivo desta página é permitir que desenvolvedores documentem funções úteis para uso futuro. Se você tiver qualquer código JavaScript ou Java que valha a pena compartilhar, coloque-o aqui.

***

# JavaScript:

## Tag para array

Aqui está um exemplo de como transformar uma tag de item em um array; você pode omitir qualquer parte conforme necessário.

```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);
```

- .itemIds
  Isso acessa a lista de IDs de itens dessa tag de ingrediente. O resultado é uma Coleção (Java Set).
- .toArray()
  Isso converte a lista (que é um Java Set) em um array JavaScript.
- .map(String)
  Isso converte cada ID de item no array para string. Necessário para a maioria das funções js, mas não para todas.

## Subtração de Tag

Aqui está um exemplo de usar um array em uma receita para produzir o mesmo array, exceto pelo item original. Útil para cortadores de pedra, tingimento, etc.

```js
	const tag_array = Ingredient.of('#forge:tag').itemIds.toArray().map(String);

	tag_array.forEach(item => {
		event.stonecutting(item, 
			Ingredient.of('#forge:tag').subtract(item)
		).id(`tfg:stonecutter/${item.replace(/:/g, "/")}`)
	})
```

Observação: se você estiver usando múltiplas entradas ou múltiplas subtrações, terá de formatar assim:

```js
	let example = Ingredient.of('#forge:tag').subtract('item:1').subtract('item:2').withCount(8)
```

## JavaScript para JSON

O exemplo abaixo é utilizado no construtor de acabamentos de armadura.

```js
     materials.forEach(material => {
         const trimfilepaths = [
           `kubejs/data/minecraft/trim_material/${material.materialName}.json`,
           `kubejs/data/tfc/trim_material/${material.materialName}.json`
         ];
  
         const newtrimdata = {
           asset_name: material.materialName,
           description: {
             color: material.nameColor,
             translate: `trim_material.tfc.${material.materialName}`
           },
           ingredient: material.itemName,
           item_model_index: material.indexNumber
         };
  
         trimfilepaths.forEach(trimfilepaths => {
           const existingData = JsonIO.read(trimfilepaths);
  
           // Only write if the file is missing or contents are different
           if (JSON.stringify(existingData) !== JSON.stringify(newtrimdata)) {
             JsonIO.write(trimfilepaths, newtrimdata);
           }
         });
       });
```

1. Declare os caminhos dos arquivos. (exemplo acima: `trimfilepaths`)
2. Crie uma versão const das informações do json. (exemplo acima: `newtrimdata`)
3. Para cada caminho de arquivo, leia seu conteúdo e escreva novos dados se estiver faltando. (exemplo acima: `existingData`)

## Mostrando JSONs de Receita no Log

Útil para ver como os Jsons de receita estão sendo escritos atualmente, para que você possa editá-los.

```js
	event.forEachRecipe({ id: string }, (recipe) => {
		console.log(recipe.json.toString());
	});
```

- Você pode substituir `{id: string}` por qualquer método de receita do KubeJS; como `{type: string}` ou `{mod: string}`, por exemplo.

## Adicionando Circuitos a Receitas Já Existentes

O script utilitário pronto pode ser encontrado em: [gtceu/utility.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/gregtech/utility.js)

E o array global em: [gtceu/constants.js](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/gtceu/constants.js)

Você pode adicionar números de circuito ao GTCEu sobrescrevendo o JSON assim:

```js
	event.findRecipes({ id: string }).forEach(recipe => {
		// Get the existing "inputs" JsonObject
		const inputs = recipe.json.get("inputs");

		// Get the current item array or create a new one
		const itemArray = inputs.has("item") ? Java.from(inputs.get("item")) : [];

		// Push the circuit input Json
		itemArray.push({
			content: {
				type: "gtceu:circuit",
				configuration: 1
			},
			chance: 0,
			maxChance: 10000,
			tierChanceBoost: 0
		});

		// Set the updated item array back into the inputs
		inputs.add("item", itemArray);

		// Re-apply modified inputs into recipe JSON
		recipe.json.add("inputs", inputs);
	});
```

Você também pode sobrescrever as entradas diretamente, isso removerá quaisquer outras entradas existentes:

```js
	event.findRecipes({ id: string }).forEach(recipe => {
			recipe.json.add("inputs", 
				{
					item: [
						{
							content: {
							type: "gtceu:circuit",
							configuration: 1
							},
							chance: 0,
							maxChance: 10000,
							tierChanceBoost: 0
						}
					]
				}
			)
		})
```

- Você pode substituir `{id: string}` por qualquer método de receita do kubejs; como `{type: string}` ou `{mod: string}` por exemplo.

## Entrada/Saída com Probabilidade

Como definir ingredientes de entrada/saída com probabilidade em receitas do gtceu.

```js
     .chancedOutput('minecraft:dirt', 100, 0)
     .chancedInput('minecraft:dirt', 100, 0)

     .chancedFluidInput(Fluid.of('minecraft:water', 100), 1000, 0)
     .chancedFluidOutput('minecraft:water 1000', 100, 0)
```

1. O primeiro número é a chance, sendo 1 igual a 0,01% e 10000 igual a 100%
2. O segundo número é o aumento a cada tier de energia (este recurso foi removido no GTm 7.0)

Se você quiser uma lógica de chance diferente, como XOR:

```js
const $ChanceLogic = Java.loadClass('com.gregtechceu.gtceu.api.recipe.chance.logic.ChanceLogic')

event.recipes.gtceu.chemical_reactor("test_and")
	.itemInputs('1x minecraft:stone')
	.chancedItemOutputLogic($ChanceLogic.AND)
	.chancedOutput('2x minecraft:dirt', 5000, 100)
	.chancedOutput('4x minecraft:dirt', 2500, 600)
	.duration(400)
	.EUt(25)

event.recipes.gtceu.chemical_reactor("test_xor")
	.itemInputs('1x minecraft:stone')
	.chancedFluidOutputLogic($ChanceLogic.XOR)
	.chancedFluidOutput('gtceu:oxygen 500', 5000, 0)
	.chancedFluidOutput('gtceu:fluorine 500', 2500, 0)
	.duration(400)
	.EUt(25) 
```

Saída variável:

```js
.itemOutputsRanged('#forge:crushed_ores/bauxite',1,10) 
```

***

# Java:

## Forge Registries: Obter Tipo de Partícula

Para usar tipos de partículas de outros mods sem torná-los dependências, você pode usar `ForgeRegistries.PARTICLE_TYPES.getValue()`. Aqui está um exemplo usando `ae2:lightning_fx`. Se o mod não estiver presente, ele usará `minecraft:end_rod` como fallback.

```java
@Override
		public void animateTick(BlockState state, Level level, BlockPos pos, RandomSource random) {
			for (int i = 0; i < 4; i++) {
				if (level.isClientSide) {
					ParticleType<?> pt = ForgeRegistries.PARTICLE_TYPES.getValue(new ResourceLocation("ae2", "lightning_fx"));
					if (pt instanceof SimpleParticleType) {
						level.addAlwaysVisibleParticle((SimpleParticleType) pt, true,
								pos.getX() + 0.5 + (random.nextFloat() - 0.5) * 0.5,
								pos.getY() + random.nextDouble(),
								pos.getZ() + 0.5 + (random.nextFloat() - 0.5) * 0.5,
								0.1, 0.1, 0.1);
					} else {
						// Fallback with vanilla particle
						level.addAlwaysVisibleParticle(ParticleTypes.END_ROD, true,
								pos.getX() + 0.5,
								pos.getY() + 0.5,
								pos.getZ() + 0.5,
								0.1, 0.1, 0.1);
					}
				}
			}
		}
```

## Mixins Extras

[Mixins Extras](https://github.com/LlamaLad7/MixinExtras/wiki)

Se o seu mixin sobrescreve algo no Minecraft ou injeta em um método herdado de algo do Minecraft, seu mixin precisa de `remap = true`. Todo o resto deve usar `remap = false`.

Para obter o caminho de remap de um mixin, clique com o botão direito no método no IntelliJ e use Copiar Especial > Mixin Target Reference

## Ferramentas Avançadas para Mixins

"Anotar a classe Mixin com @Pseudo nos permite atingir classes que podem não estar presentes em tempo de compilação, mas estão em tempo de execução; para isso, usamos o nome totalmente qualificado da classe para apontar para ela." -Kolja

Um bom exemplo disso está no Wormsignhandlermixin. Essa ferramenta só deve ser usada quando necessário, devido a mods/Maven serem problemáticos.

## Depuração

Você pode converter um objeto inteiro em string com `ReflectionStringBuilder.toString()`.

***

# JSON:

***

# Greate:

## Impedir Geração Automática

[Documentação](https://github.com/GreateBeyondTheHorizon/Greate/wiki)

Se você quiser gerar uma receita para uma máquina do GregTech _sem_ que o Greate gere uma receita (por exemplo, uma receita de Dobrador que você não quer na Prensa Mecânica), coloque `_electric_only` ou `_manual_only` no final do ID da receita.
(`_manual_only` é inspirado no Create base, onde esse sufixo impede o Create de gerar uma receita de bulk blasting a partir de uma receita de fundição, etc.)

# Firmalife

Você pode fazer canteiros crescerem instantaneamente clicando com o botão direito neles com um bloco de bedrock.

# GregTech

## Fórmulas Químicas Personalizadas

Se você tiver um material personalizado com uma fórmula química mais complexa, mas precisar informar ao GregTech que ele "é composto por X oxigênio, Y hidrogênio, Z qualquer coisa" para gerar receitas de decomposição, você pode usar:

```js
    material.setFormula("Al2Si2O5(OH)4", true)
```

para mudar o tooltip da fórmula química para o que você quiser! Acho que o `true` transforma os números em subscritos.

## Balanceando Fórmulas Químicas

O Discord do GregTech tem um bot para verificar se suas fórmulas químicas estão balanceadas. [Aqui está](https://discord.com/channels/701354865217110096/1186025944222269580/1392395245248974900) um exemplo.

Para itens sólidos, 1 mol = a quantidade de átomos presentes na molécula daquele item; então 1 mol de Al2O3 é 5 pós de safira.

Para itens líquidos, é o contrário: 1 mol = 1 balde. Então 1 mol de H2O é um balde.
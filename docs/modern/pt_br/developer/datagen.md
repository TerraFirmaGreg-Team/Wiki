---
title: Geração de Dados Java
order: 5
---
#### Configuração
Crie o arquivo `gradle-local.properties` e insira o seguinte:

> ⚠️Importante: Ao definir o instance_path, use barras normais (/), não barras invertidas (\\).

Se o arquivo JAR do TFG-Core na pasta mods do seu modpack deve ser substituído automaticamente pela versão mais recete do core, toda vez que o core for recompilado, ele deve ser reconstruído 
```properties
enable_copy_to_instance = true 
```

// Caminho para a pasta do modpack
```properties
instance_path = C:/caminho//para//modpack
```
## Geração de dados padrão

Por padrão, o registrate procurará por uma textura com o mesmo nome do ID do bloco e a usará como textura para todos os lados do bloco. Para itens, o registrate procurará por uma textura simples e a usará para o item.

Para desabilitar a geração de dados para um bloco:

```java
.setData(ProviderType.LOOT, NonNullBiConsumer.noop())
```

```java
.setData(ProviderType.BLOCKSTATE, NonNullBiConsumer.noop())
```

Para desabilitar a geração de dados para um item:

```java
.setData(ProviderType.ITEM_MODEL, NonNullBiConsumer.noop())
```

## Máquinas

Os construtores de máquinas possuem vários métodos, como `workableTieredHullModel` e `colorOverlayTieredHullModel`, que você chama para configurar um provedor de modelo para uma máquina.

## Itens

Chame `.model` em uma definição de item.

Exemplo com múltiplas camadas de modelo:
```java
.model(ModelUtils.layeredItemModel(
  TFGCore.id("item/wireless_card/wireless_card_base"),
  TFGCore.id("item/wireless_card/wireless_card_layer1"),
  TFGCore.id("item/wireless_card/wireless_card_layer2")))
```

## Blocos

### Estado de bloco e Modelos

Geração de dados é feita usando o método `.blockState` em uma definição de bloco registrate. O método blockState recebe uma função com dois argumentos: o contexto de geração de dados e o provedor de modelo. O arquivo `ModelUtils` possui métodos utilitários para criar os modelos de blocos mais comuns.

Por exemplo:

Cria um modelo de bloco ativo/inativo usando a textura fornecida, pressupondo que a textura ativa possui o sufixo _active
```java
ModelUtils.createActiveModel(TFGCore.id("block/casings/machine_casing_vacuum_engine_intake"))
```

Procura por um modelo ativo/inativo existente e cria um estado de bloco baseado nele.
```java
ModelUtils.existingActiveModel(TFGCore.id("block/casings/bioculture_rotor_secondary"))
```

Cria um modelo de bloco simples com a textura especificada.
```java
GTModels.cubeAllModel(TFGCore.id("block/casings/electromagnetic_accelerator"))
```

#### Usando modelos existentes e definindo texturas a serem utilizadas

```java
(datagenContext, modelProvider) -> modelProvider.models()
                .withExistingParent(datagenContext.getName(), GTCEu.id("block/cube_2_layer/all"))
                .texture("bot_all", textureResourceLocation)
                .texture("top_all", texture2ResourceLocation)
```

#### Definindo estados de bloco personalizados

```java
(ctx, prov) -> {
  /// Cria um novo modelo para o estado de bloco inativo
  var inactive = prov.models().cubeAll(ctx.getName(), inactiveTexture)
  /// Procura por um modelo existente para o estado de bloco ativo
  var active = prov.models().getExistingFile(activeModelPath);

  prov.getVariantBuilder(ctx.getEntry()).partialState().with(GTBlockStateProperties.ACTIVE, false)
                .modelForState().modelFile(inactive).addModel()
                .partialState().with(GTBlockStateProperties.ACTIVE, true)
                .modelForState().modelFile(active).addModel();
}
```

### Definindo itens dentro de definições de blocos

Cria um item de bloco que usa o modelo do bloco para renderização.
```java
.simpleItem()
``` 

Retorna um construtor de item de bloco
```java
.item()
``` 

### Definindo tabelas de loot e quedas de blocos

Por padrão, blocos se soltam a si mesmos. Use o método `.loot()` para definir quedas personalizadas

Exemplos:

Solta um item diferente
```java
.loot((ctx, b) -> ctx.dropOther(b, MARS_DIRT))
```
```java
.loot((ctx, b) -> ctx.createShearsOnlyDrop(b, ITEM))
```
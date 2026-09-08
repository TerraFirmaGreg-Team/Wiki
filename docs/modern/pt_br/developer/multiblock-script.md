---
title: Conversor Avançado de Multiblocos
order: 4
---

# Conversor Avançado de Multiblocos

## Passo 1) Prepare o Arquivo de Estrutura

### 1.

Com sua ferramenta de copiar/colar no modo de cópia, selecione a estrutura.

<p align="center">
<img width="1020" height="720" alt="copy" src="https://github.com/user-attachments/assets/3f9ac011-5081-49ea-ab52-e7483183e5eb" />
</p>

### 2.

Coloque sua ferramenta no gerenciador de templates. Você pode inserir um pedaço de papel e salvar para confirmar que é a estrutura correta. Em seguida, clique em copiar para salvar o JSON na área de transferência.

<p align="center">
<img width="1024" height="720" alt="manager" src="https://github.com/user-attachments/assets/cabdc85b-1986-4f4c-94a1-ac9981f0fd36" />
</p>

## Passo 2) Execute a Ferramenta

> O conversor avançado é uma ferramenta fortemente modificada originalmente criada pelo Phoenixvine.
> Esta ferramenta pega informações sobre a estrutura do mod Building Gadget e a converte em formato de estrutura do GT. Todos os arquivos devem permanecer na mesma pasta.

### Instruções

- Baixe [Advanced Multiblock Convert.exe](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/AdvancedMultiblockConverter/advanced-multiblock-converter) ou construa com um packager.
- Instale [Node.js](https://nodejs.org/pt-br/download) caso você não o tenha.

### Opção 1) Executando como um Aplicativo Electron

- Execute `Advanced Multiblock Converter.exe`
- Cole o json dentro do bloco de entrada.
- Selecione o botão iniciar.
- Aplique transformações, se necessárias.
- Copie a saída JS do bloco de saída.

### Opção 2) Executando em Lote

- Coloque o seu texto da estrutura no input.json e salve o arquivo.
- Use `Run.bat`
- Selecione resetar para gerar a estrutura inicial.
- Selecione suas transformações que desejar.
- Selecionar resetar denovo irá reiniciar as transformações.
- O resultado estará em output.js

### DEV) Executando o Empacotador

- Defina o diretorio:

`cd <advanced-multiblock-converter location>`

- Verifique a instalação do node:

`node -v`
`npm -v`

- Instale dependências:

`npm install`

- Construa os arquivos:

`npm run build`
`npm run dist`

- Inicie o aplicativo:

`npm start`

## Passo 3) Limpeza da Saída

Provavelmente será necessário reformatar um pouco o resultado. Aqui está o exemplo acima formatado em Java:

```java
			.pattern(definition -> FactoryBlockPattern.start()
				.aisle("       B   B       ", "       B   B       ", "       CCCCC       ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "     B       B     ", "    CC       CC    ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("       B   B       ", "       CCCCC       ", "   CC         CC   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "    CC       CC    ", "  C             C  ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("        CCC        ", "   CC         CC   ", " CC             CC ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle(" B B CC     CC B B ", " B C           C B ", " C               C ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     C       C     ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("B B               B", "B C             C B", "C                 C", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("    C   FFF   C B  ", "  C     B B     C  ", "C       B B       C", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        EEE        ", "        GGG        ", "        GGG        ", "        GGG        ")
				.aisle("    C   HIF   C    ", "  C      I      C  ", "C        I        C", "         I         ", "         I         ", "         I         ", "         I         ", "         I         ", "         I         ", "         I         ", "        EIE        ", "        GIG        ", "        GKG        ", "        GGG        ")
				.aisle("    C   FFF   C    ", "  C     B B     C  ", "C       B B       C", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        B B        ", "        EEE        ", "        GGG        ", "        GGG        ", "        GGG        ")
				.aisle("B B             B B", "B C             C B", "C                 C", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     C       C     ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle(" B B CC     CC B B ", " B C           C B ", " C               C ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("        CCC        ", "   CC         CC   ", " CC             CC ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "    CC       CC    ", "  C             C  ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("       B   B       ", "       CCCCC       ", "   CC         CC   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("     B       B     ", "     B       B     ", "    CC       CC    ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.aisle("       B   B       ", "       B   B       ", "       CCCCC       ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ", "                   ")
				.where("H", Predicates.controller(Predicates.blocks(definition.get())))
				.where("B", Predicates.frames(GTMaterials.StainlessSteel))
				.where("C", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(TFGCore.id("casings/machine_casing_red_solar_panel"))))
				.where("E", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(ResourceLocation.parse("ad_astra:iron_plateblock"))))
				.where("F", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(TFGCore.id("casings/machine_casing_iron_desh")))
					.or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setMaxGlobalLimited(2).setPreviewCount(1))
					.or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
					.or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(1))
					.or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setMaxGlobalLimited(2).setPreviewCount(1))
					.or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
					.or(Predicates.abilities(PartAbility.OUTPUT_ENERGY).setExactLimit(1))
				)
				.where("G", Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
				.where("I", Predicates.blocks(ForgeRegistries.BLOCKS.getValue(TFGCore.id("casings/machine_casing_iron_desh"))))
				.where("K", Predicates.blocks(ChemicalHelper.getBlock(TagPrefix.block, GTMaterials.Silver)))
				.where(" ", Predicates.any())
				.build()
			)
```

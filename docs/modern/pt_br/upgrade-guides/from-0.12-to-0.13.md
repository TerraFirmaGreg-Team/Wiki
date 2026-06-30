---
title: Guia de Atualização 0.12 → 0.13
order: 5
---

# Guia de Atualização 0.12 → 0.13

## Avisos e problemas conhecidos

**Por favor, lembre-se de criar uma nova instância do TFG e copiar seu mundo para ela, ao invés de atualizá-lo diretamente!** Isso é mais seguro e também permite que você visualize seu mundo atualizado, caso queira voltar e prepará-lo melhor.

Se você está atualizando a partir da 0.11, siga primeiro as [instruções de atualização para a 0.12](/modern/pt_br/upgrade-guides/from-0.11-to-0.12).

Mundos da versão 0.12 podem ser atualizados para a 0.13 com segurança, mas há algumas coisas importantes a saber:

# Geração de mundo do Overworld

Devido a alguns problemas com servidores, nós mudamos a geração padrão do mundo de mundos pré-0.12 para a **nova geração**.

- Se o seu mundo foi criado na versão 0.12, então você não precisa fazer nada.
- Se o seu mundo foi criado antes da 0.12 e você já o mudou para usar a nova geração, você não precisa fazer nada.
- Se seu mundo foi criado antes da 0.12 e você quer manter a antiga geração de mundo, você precisará mudar a configuração `worldgenOverrides` em `defaultconfigs/tfg-server.toml` para `["minecraft:overworld=0"]`.

Você não precisa fazer nada para obter as novas minas, apenas explore novos chunks.

No futuro (provavelmente em vários meses) podemos deixar de suportar a antiga geração de mundo, uma vez que está se tornando muito trabalhoso manter ambas disponíveis.

# Revisão completa das Profundezas

Nós reformulamos completamente as Profundezas. Agora é significativamente mais alto, então você precisará limpar a dimensão para não ser teleportado acima da bedrock.

Para fazer isso, primeiro faça um backup de seu salvamento, em seguida, certifique-se de ter saído das Profundezas e levado qualquer coisa com você que quer manter, depois salve e saia do seu jogo. Depois, simplesmente vá para a sua pasta de instância de minecraft e, em seguida, dentro de `saves`, depois vá para a pasta com o nome do seu mundo. Apague a pasta chamada `DIM-1`. Então inicie seu jogo normalmente. O processo é o mesmo para servidores.

⚠ ⚠ ⚠ **CRIE UM BACKUP ANTES DE FAZER ISSO** ⚠ ⚠ ⚠

Se você já abriu um Prospetor HV ou LuV no **Modo Fluído** nas Profundezas, ou usou uma **Perfuratriz de Fluido**, você também precisará apagar seu arquivo `.minecraft/saves/(nome do mundo)/data/gtceu_bedrock_fluid.dat`, já que os veios de fluidos também mudaram.

# Reformulação de alimentos

O TFC Gourmet foi removido. Se você tiver alguma comida ou fluidos desse mod, coma-os antes de atualizar, pois todos eles desaparecerão depois.

Continuaremos a adicionar novos alimentos (incluindo alguns que o TFC Gourmet acrescentou) como nossos próprios itens internos, para que tenhamos total controle sobre a sua implementação e balanceamento.

# Logística de Fluidos

_Create: Logística de Fábrica_ foi substituído por _Create Logística de Fluidos_, um complemento diferente para o sistema de logística do Create que é menos bugado.

Engarrafadores no seu mundo devem ser automaticamente substituídos pelos novos Embaladores de Fluido e os Medidores de Fluido devem ser automaticamente substituídos por Medidores de Fábrica comuns, que agora podem lidar com fluidos por conta própria. **Se você usar muitos deles, por favor, verifique 3x se você fez um backup antes de atualizar!**

# Shaders

Após atualizar, se As Profundezas estiverem completamente tingidas de vermelho/laranja, acesse as configurações do shader > Atmosfera > Dimensão do Nether > Modo de Cor, e altere a opção para "Baseado no Bioma", e _não_ "Baseado no Bioma (Modificado)". Como alternativa, selecione uma predefinição diferente se estiver dizendo que você tem uma "personalizada".

# Minérios

Naquadah foi removido das Profundezas. Ele foi temporariamente movido para o Acelerador Linear de Ostrum até que ele eventualmente encontre uma casa em um futuro planeta.

O Cromo foi completamente alterado. Devido à introdução de resíduo lamacento de gemas, o Rubí tornou-se o rei tanto do alumínio como do cromo, o que era um efeito colateral indesejado. Para resolver isto:

- Ruby é agora uma fonte significativamente pior de alumínio, mas continua a ser uma boa fonte de cromo. Também é agora uma fonte de Alumina para placas de circuitos.
- Areia Granada tem sido enormemente buffada com sua própria linha de processamento, envolvendo Granada Amarela e Uvarovita. Você pode encontrá-la em lugares de areia no overworld, ou em enormes quantidades na parte inferior das Profundezas.
- Cromita pode ser obtida através de algum processamento de minério, ou você pode encontrá-la em minérios de granada amarela na Lua.

Você desbloqueia maneiras mais fáceis de processar as três conforme avança.

# ComputerCraft

Adicionamos um mod para habilitar o suporte UTF-8 no ComputerCraft.

Programas existentes do ComputerCraft devem continuar a funcionar sem precisar de migração. Programas que já contêm texto UTF-8 válido devem ser exibidos corretamente após instalar o mod. Programas que foram previamente salvos com texto corrompido ou exibidos incorretamente (mojibake) exigirão a correção manual dos mesmos; simplesmente abrir e salvar o arquivo novamente não irá recuperar automaticamente os caracteres originais.
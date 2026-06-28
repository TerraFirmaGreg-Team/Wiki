---
title: Guia de Atualização 0.11 → 0.12
order: 4
---

# Guia de Atualização 0.11 → 0.12

## Avisos e problemas conhecidos

**Por favor, lembre-se de criar uma nova instância do TFG e copiar seu mundo para ela, ao invés de atualizá-lo diretamente!** Isso é mais seguro e também permite que você visualize seu mundo atualizado, caso queira voltar e prepará-lo melhor.

Se você está atualizando a partir da 0.10, por favor siga primeiro as [instruções de atualização para a 0.11](/modern/pt_br/upgrade-guides/from-0.10-to-0.11).

Mundos da versão 0.11 podem ser atualizados para a 0.12 com segurança, mas há algumas coias importantes a saber:

# Novos Veios de Fluido

Refizemos completamente os veios de fluido do Overworld, e agora alguns deles dependem do clima e do bioma. Como consequência, os veios próximos à sua base provavelmente serão diferentes de antes. Verifique a nova aba do EMI para descobrir onde encontrar novos veios promissores para onde você pode mover seus rigs de fluido.

Se seus chunks não tiverem nenhum fluido, tente fechar o jogo, excluir o arquivo `.minecraft/saves/(nome do mundo)/data/gtceu_bedrock_fluid.dat` e abrir o jogo novamente. Isso limpa o cache de veios de fluido do GregTech, forçando a geração de novos.

# Nova Geração de Mundo

A versão 0.12 traz uma **nova geração do Overworld**. Você não precisa criar um novo mundo para atualizar.

## Se você tem um mundo **antigo** e quer continuar usando a geração **antiga**

Você não precisa fazer nada. Seu mundo continuará gerando novos chunks com a geração antiga, mas ainda incluirá algumas novidades, como novas platações e recursos de veios de fluido.

## Se você tem um mundo **antigo** e quer usar a **nova** geração

Abra o arquivo `defaultconfigs/tfg-server.toml` e, no final, substitua `worldgenOverrides = []` por `worldgenOverrides = ["minecraft:overworld=1"]`. **Você precisará garantir essa linha esteja presente sempre que atualizar no futuro.**

Observe que isso _vai_ causar bordas de chunks visivelmente estranhas. O formato dos continentes é praticamente o mesmo, então, se isso for importante para você, gere todo o continente antes de atualizar, assim, as bordas ficarão no oceano.

⚠ ⚠ ⚠ **CRIE UM BACKUP ANTES DE FAZER ISSO** ⚠ ⚠ ⚠

## Se você quer criar um **novo** mundo com a **nova** geração

Basta criar um mundo normalmente. O jogo reconhecerá automaticamente que ele foi criado com a nova geração, sem necessidade de alterar configurações.

## Se você quer criar um **novo** mundo com a geração **antiga**

Crie seu mundo na versão 0.11.28 e depois atualize. Ou inicie na 0.12, mas defina `worldgenOverrides = ["minecraft:overworld=0"]` antes de gerar o mundo.

## Locais de Spawn Personalizados

Ao criar seu mundo, agora você pode selecionar onde será o ponto de spawn. Em servidores multiplayer, todos os jogadores aparecerão nesse ponto, como de costume.

***

Observe que o TFC ainda está modificando a geração de mundo da versão 1.21, e essas mudanças serão trazidas para versões anteriores futuramente.
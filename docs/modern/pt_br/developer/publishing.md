---
title: Publicação do Modpack
order: 7
---

# Como publicar uma nova versão do modpack

Aqui está um guia passo a passo de como publicar uma nova versão do modpack.

## 1. Meta pressão nos outros contribuidores se eles ainda estiverem devendo alguma coisa de última hora

A coordenação da equipe é importante!

Termine quaisquer revisões de PR e mescle-as. Se houver algo de última hora para finalizar, avalie se essas tarefas são muito arriscadas e se vale a pena deixá-las para a próxima versão, permitindo assim que você as teste de forma mais rigorosa. O TFG adora hotfixes, mas é ainda melhor se não precisarmos fazê-los.

## 2. Verificar se há atualizações de mods

Você pode fazer isso com a maioria dos launchers, mas **não** atualize estes mods:

- _Drippy Loading Screen & FancyMenu_ - eles possuem atualmente [um bug](https://github.com/Keksuccino/Drippy-Loading-Screen/issues/118) que fazem a barra de progresso da nossa tela de carregamento parecer estranha. Quando e se isso for corrigido, então eles devem estar prontos para atualizar.
- _KubeJS_ - Versão 2001.6.5-build.26 quebrou a API para itens comestíveis/bebíveis. Se eles alguma hora resolverem essa merda, está tudo bem em atualizar.
- _PandaLib & Panda's Falling Trees_ - **nunca atualizem isso!** Versões mais recentes mudaram completamente como detecta árvores, e quebraram o sistema com as do TFC. Isso foi corrigido na versão 1.21 destes mods, mas o autor não suporta mais 1.20 (para evitar quebrar mais qualquer coisa). Também temos um monte de TFG-Core mixins em torno desta versão
- _TFC Astikor Carts_ - **nunca atualizem isso!** Versões mais recentes não funcionam com os mixins TFG-Core, e mesmo assim, não contêm nada novo que queiramos.
- _ModernFix_ - Causa problemas com o empilhamento de itens e baldes de madeira que não funcionam depois da versão (5.27.51).
- _TooManyRecipeViewers_ - Causa picos de lag ao visualizar receitas após a versão (0.8.1).

Deve ser seguro atualizar qualquer outra coisa, mas certifique-se de executar o jogo e testá-lo um pouco antes de publicar.

Além disso, verifique se [AE2 Cosmolite](https://github.com/Frontiers-PackForge/Applied-Energistics-2-cosmolite) ou [pacote de recursos dele](https://github.com/Frontiers-PackForge/AE2-Midnight-and-Daybreak) teve uma atualização, pois estes não aparecerão no seu launcher.

Certifique-se de verificar se algum shader ou pacote de recursos também tem atualizações.

### 2a. Atualizar pakku-lock.json

Se você mantém a instância do seu minecraft separada do seu espaço de trabalho (como você deve), copie o arquivo pakku-lock.json do seu espaço de trabalho para sua instância. Em seguida, abra um prompt de comando/terminal em seu espaço de trabalho.

Se você nunca usou o Pakku antes, peça outro desenvolvedor para te guiar por ele. A documentação está [aqui](https://juraj-hrivnak.github.io/Pakku/home.html).

Na maior parte, você realmente irá usar só dois comandos:

- `java -jar pakku.jar update modid` para atualizar um mod (você pode usar o URL do site do Curseforge para obter o ID correto do mod)
- `java -jar pakku.jar fetch` para baixar atualizações e verificar/garantir que seu modpack tem as versões de mods listadas em pakku-lock.json

Depois de atualizar tudo, certifique-se de executar o jogo para testar as atualizações. Em seguida, copie o arquivo pakku-lock.json de volta para seu espaço de trabalho.

### 2b. Atualizar pakku.json

Para mudar entre os tipos de publicações, edite o arquivo `pakku.json` e procure a linha `release_type` perto do topo. Mude isto para `alpha`, `beta`, ou `release` se necessário.

Se você estiver adicionando mods "opcionais", você pode incluí-los aqui com `"export": false`, mas tenha em mente que apenas alguns launchers obedecem a isso. O CurseForge baixa tudo, mesmo que seja marcado como opcional aqui, então é por isso que temos a página da wiki "lista de mods opcionais".

Na maioria das vezes você não precisa atualizar este arquivo.

### 2c. Atualizar TFG-Core

Se algum dos mods atualizados também forem dependências do TFG-Core, você precisará atualizar esses também. Veja as dependências em `gradle.properties` e `gradle/scripts/dependencies.gradle`.

## 3. Publicar o TFG-Core

Basta abrir o arquivo `gradle.properties` e alterar o número da versão de `mod_version`, então enviar para `dev`. Os scripts de build publicarão automaticamente uma nova versão para o curseforge e modrinth. Depois de publicado, geralmente leva até 30 minutos para ambos os sites tornarem o lançamento público.

Note que a versão que está sendo visível no site não significa necessariamente que a versão está acessível ao Pakku.

Enquanto estiver esperando por isso, você pode continuar com algumas das etapas abaixo.

## 4. Atualize o changelog

Atualize o CHANGELOG.md no Modpack-Modern. Veja o histórico recente do modpack-modern, core-modern e tools-modern e adicione tudo. Se houver alguma atualização recente de mod com coisas que você queira destacar, ou atualizações de shader do tfg, escreva-as aqui também.

Até que todo o resto esteja pronto, mantenha o cabeçalho do topo como `## Unreleased`, pois alterar isso iniciará o processo de publicação do modpack.

## 5. Verificar por incompatibilidade da versão

Em Tools-Modern, há uma ferramenta chamada PakkuLockChecker. Ele vai analisar o seu arquivo pakku-lock.json para checar se há incompatibilidades de versão entre o CurseForge e o Modrinth, e se há mods faltando em algum dos sites.

É normal que muitos mods estejam faltando no Modrinth e que alguns tenham divergências de versão, então você só precisa se preocupar com os mais importantes, como o TFG-Core e assim por diante.

## 6. Execute o mesclador de idiomas

Sincronize o repositório Tools-Modern e execute a ferramenta LanguageMerger. Isso garantirá que o modpack tenha todas as alterações mais recentes do texto em inglês. Faça o commit dos arquivos json `en_us` no modpack posteriormente.

## 7. Esperar pelo TFG-Core

Continue rodando `java -jar pakku.jar update TerraFirmaGreg-Core` até que o arquivo pakku-lock.json tenha as versões corretas para o Curseforge e Modrinth. A ferramenta PakkuLockChecker também pode ser útil aqui.

## 8. Inicie o modpack uma última vez

Se sua instância do Minecraft e espaço de trabalho são pastas separadas (como elas devem ser), copie suas pastas config e defaultconfigs, sobrescreva na sua instância e inicie o jogo uma última vez.

Rode alguns testes rápidos como abrir o seu mundo de teste, rode `/kjs errors server_scripts` para checar se há avisos, conferir se o `minecraft:barrier` tem alguma receita de uso (o que indica tags vazias), tentar beber água do chão (isso pode acontecer se os dados do TFC estiverem quebrados), verificar se o guia de campo não está quebrado, tentar criar um novo mundo para garantir que funciona e checar se as novas missões não estão sendo completadas instantaneamente no primeiro carregamento...

Se tudo estiver certo, copie o arquivo `config/crash_assistant/modlist.json` de sua instância para seu espaço de trabalho. Este arquivo é usado em relatórios de erro do Assistente de Crash para dizer quais alterações de mod o usuário fez.

## 9. Execute um teste num servidor linux

Certifique-se de que tudo o que você mudou no modpack seja publicado em `dev`, depois espere o [build system](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/actions) terminar de construir uma compilação.

Consiga alguém com um servidor linux (tom e sakura podem ambos fazer isso) para baixar o serverpack construído e executá-lo. Alguns bugs e travamentos só aparecem nos servidores!

Talvez você possa pular esta etapa se estiver fazendo uma publicação pequena, mas urgente, com um monte de correções de receitas ou algo, mas se não é urgente, é bom testar isso.

## 10. Últimos passos

Se esta for a sua primeira vez publicando, certifique-se de que outro desenvolvedor experiente revise todos os seus passos antes de continuar!

No topo do CHANGELOG.md do modpack, faça uma nova seção `## Não lançado` e mude a já existente para ter um número e data de lançamento apropriados. Deve seguir um formato como `## [0.xx.yy] - DD-MM-YYYY`.

Dê um push nas suas alterações para a `dev`. Aguarde um pouco e o script de compilação criará um pull request. Revise tudo na descrição do pull request. Se tudo estiver correto, atribua o Xikaro como revisor e marque a solicitação como pronta para revisão.

Sempre que ele aprova, o processo de publicação começa. Espere mais 15 minutos ou mais e haverá um novo anúncio em `#modern-releases` no discord. Você pode encaminhar esta postagem para os nossos tópicos nos servidores do TFC e do GT (nos canais `Content` e `pack-advertisement`, respectivamente) e para o canal `tfg-announcements` no servidor do Flurben.

---
title: 整合包发布流程
order: 7
---

# 如何发布整合包的新版本

以下是发布整合包新版本的分步指南。

## 1. 与其他贡献者沟通，确认收尾工作

团队协调很重要！

完成所有 PR 的审阅并合并。 如果有待处理的收尾工作，请评估其风险：如果可能带来不稳定，不妨推迟到下一个版本，以便有更充足的时间测试。 TFG 虽然不排斥热修复，但最好还是能避免发布后紧急修补。

## 2. 检查模组更新

大多数启动器都能帮你检查更新，但**不要**更新以下模组：

- _Drippy Loading Screen & FancyMenu_ - 目前存在[一个 bug](https://github.com/Keksuccino/Drippy-Loading-Screen/issues/118)，会导致加载界面的进度条显示异常。等该问题修复后再考虑更新。 等该问题修复后再考虑更新。
- _EMI、EMI++ 和 Reliable Remover_ - EMI 的最新版本（1.1.24）会在 TFG 中崩溃。 如果它发布了更新，可以再试一次；如果仍然崩溃，需要找出是哪个模组导致的问题，并联系其作者修复。 EMI++ 和 Reliable Remover 是 EMI 的依赖模组。
- _KubeJS_ - 版本 2001.6.5-build.26 破坏了可食用/可饮用物品的 API。 等他们修复后再更新。
- _PandaLib & Panda's Falling Trees_ - **永远不要更新！** 新版本完全改变了树木检测逻辑，导致与 TFC 树木的兼容性被破坏。 这个问题在 1.21 版本中已修复，但作者不再支持 1.20（以免破坏更多内容）。 此外，我们在这个版本上有大量 TFG-Core 的 Mixin 代码。
- _TFC Astikor Carts_ - **永远不要更新！** 新版本与 TFG-Core 的混入不兼容，而且也没有我们需要的任何新功能。

更新其他模组通常是安全的，但发布前务必运行游戏并做一些简单测试。

另外，检查一下 [AE2 Cosmolite](https://github.com/Frontiers-PackForge/Applied-Energistics-2-cosmolite) 及其 [资源包](https://github.com/Frontiers-PackForge/AE2-Midnight-and-Daybreak) 是否有更新，因为它们不会显示在启动器中。

也别忘了检查光影和资源包是否有更新。

### 2a. 更新 pakku-lock.json

如果你将 Minecraft 实例和工作区分开（推荐这样做），请将工作区中的 `pakku-lock.json` 文件复制到你的实例中。 然后，在工作区中打开命令行/终端。

如果你是第一次使用 Pakku，请让其他开发者带你过一遍流程。 文档在[这里](https://juraj-hrivnak.github.io/Pakku/home.html)。

大多数情况下，你只会用到两个命令：

- `java -jar pakku.jar update modid` —— 更新指定模组（可以用 CurseForge 的 URL 来获取正确的模组 ID）
- `java -jar pakku.jar fetch` —— 下载所有更新，确保整合包使用 `pakku-lock.json` 中列出的版本

更新完成后，运行游戏测试。 然后把 `pakku-lock.json` 复制回工作区。

### 2b. 更新 pakku.json

要切换发布类型，编辑 `pakku.json` 文件，找到靠近顶部的 `release_type` 行。 视情况改为 `alpha`、`beta` 或 `release`。

如果你想添加“可选”模组，可以在这里以 `"export": false` 的方式包含它们，但请注意：只有部分启动器会遵守这个设置。 CurseForge 会下载所有内容，即使标记为可选，所以我们在 Wiki 上单独维护了“可选模组列表”页面。

大多数情况下，你不需要动这个文件。

### 2c. 更新 TFG-Core

如果更新后的模组恰好是 TFG-Core 的依赖项，你也需要同步更新它们。 在 `gradle.properties` 和 `gradle/scripts/dependencies.gradle` 中查找依赖项信息。

## 3. 发布 TFG-Core

只需打开 `gradle.properties`，修改 `mod_version` 的版本号，然后推送到 `dev`。 构建脚本会自动将新版本发布到 CurseForge 和 Modrinth。 发布后，通常需要等最多 30 分钟，两个平台才会公开该版本。

请注意：网页上显示已发布，并不代表 Pakku 能立即拉取到。

等待期间，你可以继续执行下面的步骤。

## 4. 更新更新日志

更新 Modpack-Modern 中的 `CHANGELOG.md`。 翻阅 Modpack-Modern、Core-Modern 和 Tools-Modern 的近期提交记录，把改动都加进去。 如果有值得一提的模组更新或光影更新，也一并记录下来。

在所有准备就绪之前，请保持最顶部的标题为 `## Unreleased`，因为更改它会触发发布流程。

## 5. 检查版本是否不匹配

Tools-Modern 中有一个叫 PakkuLockChecker 的工具。 它会扫描 `pakku-lock.json`，检查 CurseForge 和 Modrinth 之间是否存在版本不匹配，以及是否有模组在某个平台上缺失。

大量模组在 Modrinth 上缺失、少数模组版本不一致是正常的，你只需要关注像 TFG-Core 这样的核心模组即可。

## 6. 运行 LanguageMerger

同步 Tools-Modern 仓库并运行 LanguageMerger 工具。 这能确保整合包包含英文文本的最新更改。 随后把 `en_us` 的 JSON 文件提交到 Modpack-Modern。

## 7. 等待 TFG-Core

反复执行 `java -jar pakku.jar update TerraFirmaGreg-Core`，直到 `pakku-lock.json` 中 CurseForge 和 Modrinth 的版本都正确为止。 PakkuLockChecker 在这里也能用来帮忙确认。

## 8. 最后一次启动整合包

如果你的 Minecraft 实例和工作区分开（推荐做法），请将 config 和 defaultconfigs 文件夹复制到实例中，最后启动一次游戏。

做一些快速检查：打开测试世界，运行 `/kjs errors server_scripts` 查看是否有警告，检查 `minecraft:barrier` 是否出现在任何配方中（如果有，说明存在空标签），试着“喝”地面（如果 TFC 数据损坏可能会发生），检查野外指南是否正常，试着新建一个世界，确保新任务不会在首次加载时自动完成……

如果一切正常，把实例中的 `config/crash_assistant/modlist.json` 文件复制回工作区。 这个文件用于 Crash Assistant 错误报告，用来记录用户修改了哪些模组。

## 9. 测试 Linux 服务器

确保你在整合包中改动的内容都已推送到 `dev`，然后等待 [构建系统](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/actions) 完成构建。

请有 Linux 服务器的人（tom 或 sakura 都可以）下载构建好的服务端包并运行。 有些 bug 和崩溃只在服务器上才会出现！

如果只是发布一个包含配方热修复的小更新，这一步可以跳过；但如果不急，最好还是测一下。

## 10. 最后一步

如果你是第一次发布，请让有经验的开发者帮你检查所有步骤。

在整合包 `CHANGELOG.md` 的顶部，创建一个新的 `## Unreleased` 章节，把当前的那段改成一个正式的版本号和日期。 格式应遵循 `## [0.xx.yy] - DD-MM-YYYY`。

将改动推送到 `dev`。 稍等片刻，构建脚本会自动创建一个PR。 仔细检查 PR 描述中的内容。 如果确认无误，将 Xikaro 设为审阅人，并将 PR 标记为“Ready for Review”。

他批准后，发布流程就会开始。 再等大约 15 分钟，Discord 的 `#modern-releases` 频道会发布公告。 你可以把这条消息转发到 TFC 和 GT 服务器的相关频道（分别是 `Content` 和 `pack-advertisement`），以及 flurben 服务器的 `tfg-announcements` 频道。
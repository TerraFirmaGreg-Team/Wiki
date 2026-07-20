---
title: Contribution Guide
order: 10
---

# Contribution Guide

## <ModernHeader fade><GradientText> Quality Guidelines </GradientText></ModernHeader>

Please take some time to familiarize yourself with our quality guidelines before contributing to TerraFirmaGreg. This will help ensure that your contributions align with our standards and make the review process smoother for us all.

<details>
    <summary> List </summary>

### <span style="color:gray">a.</span> Style
<details open>
    <summary> Info </summary>

In general, we will not hold you accountable for personal stylistic choices in your work. However, please do not change others' work to suit your style standards unless you are actively working on that section of code. This is to ensure our programming environment feels less restrictive and prevents issues when reviewing code for redundant changes. We may ask you to change the style of your work if it is difficult to review, runs less efficienty, or conflicts with common conventions.

</details>

### <span style="color:gray">b.</span> Organization
<details open>
    <summary> Info </summary>

There are no strict organization principles in our repositories. For most purposes try to use common sense when deciding where things should go. But at the very least, please try to follow these rules:
- **No hard-coded text!** Lang strings should be used in all relevant places and submitted to our [Tools Repository](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/LanguageMerger) for translation.
- Custom GT machines/multiblocks should be submitted in our [Core Mod](https://github.com/TerraFirmaGreg-Team/Core-Modern) instead of done through KubeJS.
- Recipes, basic items/blocks, materials, data, assets, loot, etc. Should be submitted through [Kubejs](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs) instead of in our core mod when most convenient.
- All custom recipes, assets, items, blocks, etc. Should be in the `tfg:` namespace when possible.
- All custom recipes should be given an ID.
- Try to keep Kubejs scripts in folders under the relevant mod names.

</details>

### <span style="color:gray">c.</span> Pull Requests
<details open>
    <summary> Info </summary>

Please make a new branch for each pull request and keep submissions focused on one change at a time when possible. If you want to fix multiple issues at once, please make multiple pull requests unless the changes are tiny. When making a pull request, at the very least, please describe the outcome of your changes and link any issues it may solve. For example, adding `Fixes #123` to the PR description will automatically assign issue `#123` for closure. If you find that your PR includes many files that you did not change, it is likely that your branch has not been kept up to date with the one you are trying to merge into. We will ask you to fix any conflicts when present.

</details>

### <span style="color:gray">d.</span> AI Use/ Disclosure
<details open>
    <summary> Info </summary>

The use of Artificial Intelligence or more specifically LLM's is not allowed when contributing to TerraFirmaGreg-Modern, our core mod, or translations. We understand that LLM's may provide help in diagnosing issues or peer-reviewing translation work, and we may begrudgingly accept such use. But in general all code must be at least 90% written by you, 100% of assets must be man-made, and all work must be checked by you. If you do not understand programming when using AI, do not submit your work to us we do not want it. If you have used AI to assist in diagnosing issues or writing challenging sections of code, then you must always disclose of such use for us to review. We may ask for sections to be rewritten if they do not meet our standards for non-slop. And we may completely reject your pull requests if we feel there is enough evidence for AI use. If we find that you have used AI extensively without disclosing of such, you may be banned from our repository. We have a reputation to uphold; we will not allow non-human work to taint our quality standards.

</details>

### <span style="color:gray">e.</span> Art Direction
<details open>
    <summary> Info </summary>

We take our art direction and vision for our pack seriously. It is important to us that our assets follow a cohesive style and theme. In general all item textures must be 16x16. All blocks must follow 1.20.1 model contraints; OBJ models are only allowed when strictly necessary. And general pixel art best-practices will be expected. If we feel your assets are not up to our standards, please do not take them personally if we replace them. If you feel you cannot deliver quality assets but still want to contribute new items, please ask one of our dedicated artists if they can help you or contact Redeix on discord for advice. If you would like to try your hand at making assets, we recommend [Blockbench](https://www.blockbench.net) for making models, and [PixelComposer](https://pixel-composer.com) or [Aseprite](https://www.aseprite.org) for making textures. If you would like to help adjust your style to match our standards, please check out this [Style Guide](https://www.blockbench.net/wiki/guides/minecraft-style-guide).

</details>

### <span style="color:gray">f.</span> Coding Standards
<details open>
    <summary> Info </summary>

Although stylistic preferences are allowed to vary, it is important to maintain efficient coding practices within the codebase. Please try to use these principles when contributing to TFG. We reserve the right to reject contributions that do not adhere to these guidelines:
- When possible, you should attempt to use loops to reduce the amount of redundant code. This not only improves code readability but also enhances performance by minimizing unnecessary iterations. If you find yourself writing repetitive code, consider refactoring it into a `for`, `while`, or `switch` statement.
- Java--and to some extent--Kubejs are [OOP languages](https://en.wikipedia.org/wiki/Object-oriented_programming), which put an emphasis on building modular and reusable code. When possible, consider creating reusable functions or methods to be used in the future across the codebase.
- **Build in safety checks!** This includes validating inputs/outputs, handling exceptions, providing default values, and implementing error catching.
- Use [JSDocs](https://jsdoc.app), [Javadocs](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/javadoc.html), and Comments to document your code. This is mostly optional, but it does provide additional context for reviewers and future developers.
- When programming for our core mod, please use [Lombok](https://projectlombok.org/features/), which can help reduce common code and improve code accessibility.
- Try not to use ["magic-numbers"](https://en.wikipedia.org/wiki/Magic_number_(programming)). Separating hard-coded values into defined variables can make your code more readable and easier to maintain in the future. Also, sometimes it's helpful to split a number into its parts for readability. For example, If I had a recipe that took 10 minutes, either I could write the value as `12000` or as `20 * 60 * 10` (20 ticks * 60 seconds * 10 minutes).
- When creating recipes or functions, attempt to use [Tags](https://minecraft.wiki/w/Tag_(Java_Edition)) instead of hard-coded items. This can make your code more flexible and less prone to breaking as items change over time.

</details>
</details>

## <ModernHeader fade><GradientText> Outside Resources </GradientText></ModernHeader>

Listed here are resources that may be useful when contributing to TerraFirmaGreg. This is not an extensive list, but it should provide a good starting point for understanding modpack creation, mod making, and utilizing our dependencies.

<details>
    <summary> List </summary>

### Minecraft

<details open>
    <summary> List </summary>

- [Minecraft Wiki](https://minecraft.wiki): The best source online for information about Minecraft itself and its mechanics.
- [Minecraft Source](https://linkie.shedaniel.dev/mappings?namespace=mojang_raw&version=1.20.1&search=arrow&translateMode=none): A tool for exploring Minecraft's source code.
- [Data-pack Creation](https://minecraft.wiki/w/Data_pack): Information about Datapacks which control data-driven parts of the game like tags, loot, worldgen, etc.
- [Resource-Pack Creation](https://minecraft.wiki/w/Resource_pack): Information about Resource Packs which control visual aspects of the game like textures, models, and languages.
- [Jigsaw/ Structure Guide](https://gist.github.com/GentlemanRevvnar/98a8f191f46d28f63592672022c41497): Guide for creating custom structures in Minecraft using Jigsaw.
- [Color Codes](https://minecraft.wiki/w/Formatting_codes#Color_codes): Color codes used in Minecraft text.

</details>

### Kubejs

<details open>
    <summary> List </summary>

- [Kubejs Wiki](https://kubejs.com/wiki): Documentation for Kubejs. Although the wiki is not the best, and their [old site](https://wiki.latvian.dev/books/kubejs) often has slightly more information.
- [Kubejs Offline](https://hunter19823.github.io/kubejsoffline/1.20.1/forge/): A dump of internal Kubejs classes.
- [Kubejs TFC](https://notenoughmail.github.io/kubejs_tfc/1.20.1/): A comprehensive wiki for the Kubejs-TFC mod which details all of its events and utility. The main [TFC Wiki](https://terrafirmacraft.github.io/Documentation/1.20.x/) may also provide some help.
- [GTCEU Modern Wiki](https://gregtechceu.github.io/GregTech-Modern/1.20.1/Modpacks/): Provides in-depth documentation for Kubejs and Java functions that can be used by addon developers.
- [Vintage Kubejs](https://kubejs.com/wiki/addons/vintage-kubejs): Provides documentation for the Create Vintage-Improvements Kubejs addon.
- [Kubejs Create](https://kubejs.com/wiki/addons/create): Provides documentation for the Create Kubejs addon.
- [LootJs](https://github.com/AlmostReliable/lootjs/wiki/1.20.1): Documentation for LootJs; a Kubejs addon for complex loot table generation using JavaScript.
- [Greate](https://github.com/GreateBeyondTheHorizon/Greate/wiki): Repository documentation for the Greate mod.

</details>

### Java

<details open>
    <summary> List </summary>

- [Java API](https://docs.oracle.com/en/java/javase/20/docs/api/): Java API documentation for various classes and methods.
- [Forge Documentation](https://docs.minecraftforge.net/en/1.20.1/gettingstarted/): Online documentation for Forge, the modding framework used by our mod/ modpack.
- [Mixins Wiki](https://github.com/SpongePowered/Mixin/wiki): Information and links for Mixins, a library used for modifying Java classes at runtime.
- [Mixin Squared Wiki](https://github.com/Bawnorton/MixinSquared/wiki): Documentation for Mixin Squared, a library for modifying other mixins at runtime.
- [Mixin Example Sheet](https://wiki.fabricmc.net/tutorial:mixin_examples): A collection of examples for using Mixins in Java.
- [Hotswapping Plugin](https://plugins.jetbrains.com/plugin/14832-single-hotswap): A plugin for JetBrains IDEs that allows for hotswapping of Java classes during development.
- [ModDevGradle Guide](https://github.com/neoforged/ModDevGradle/blob/main/LEGACY.md): Documentation for ModDevGradle, a Gradle plugin for Minecraft mod development.
- [Maven Guide](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html): Documentation for Maven, a build automation tool for Java projects.
- [Spotless Source](https://github.com/diffplug/spotless): Repository for Spotless, a tool for formatting and linting code.

</details>

### Modpack Development
<details open>
    <summary> List </summary>

- [Pakku Source](https://github.com/juraj-hrivnak/Pakku): Repository for Pakku, a tool for managing modpack dependencies and imports.
- [Patchouli Documentation](https://vazkiimods.github.io/Patchouli/docs/intro): Documentation for Patchouli, the mod responsible for our Field Guide.
- [Phoenix's Material Previewer](https://p-h-o-e-n-i-x-packforge.github.io/PhoenixMaterialArchitect/): Web-based tool for previewing GTCeu materials.

</details>

</details>

---

## <ModernHeader fade><GradientText> Modpack Development </GradientText></ModernHeader>

A guide for setting up your development environment and contributing to the TerraFirmaGreg modpack. Including instructions on how to set up Git and an [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment). Information on setting up a Java environment for contributing to our core mod can be found in the [Java Development](#java-development) section.

### Video Guide:

<iframe width="720" height="420" src="https://www.youtube-nocookie.com/embed/vLL7jTtuOuw?si=zptuefwFEuxWtxyU"
 title="Contribution Guide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
</iframe>

<details open>
    <summary> Information </summary>

### 1. Required Software

Please download and install the following software to set up your development environment for contributing to the TerraFirmaGreg modpack.

<details>
    <summary> List </summary>

#### Software
- [Pakku](https://github.com/juraj-hrivnak/Pakku/releases): A tool for dependency management and modpack building.
- [Java 17+](https://www.azul.com/downloads/?package=jdk#zulu): Required for Forge and Pakku to function properly. You can also often download it directly from some MC Launchers like Prsim.
- [PrismLauncher](https://prismlauncher.org/download/windows/): An optimized launcher for Minecraft modifications, making it easier to create separate instances.
- [Visual Studio Code](https://code.visualstudio.com): A code editor with extensive capabilities for working with projects and integrating various plugins. (or any other proper IDE of your choice.)

</details>

---

### 2. Project Preparation & Management

To collaborate on your efforts and manage your project effectively, please follow the information provided in this section. As an open-source project, our codebase is hosted on GitHub and managed using Git. We will not accept loose files and zips shared to us on Discord or other platforms. Not only does this protect team members from malicious files, but it also tracks and gives credit to all users who contribute to us.

<details>
    <summary> Information </summary>

#### <GradientText>Step 1</GradientText>: Creating a New Instance in PrismLauncher
1. Open [PrismLauncher] and click on the **`Add Instance`** button.
2. In the **Name** field, enter the name **`TerraFirmaGreg-Modern`**.
3. Select Minecraft version **`1.20.1`** and Forge version **`47.4.13`** — these versions are necessary for the modpack to work correctly.

> [!TIP]  
> Creating instance (Select 47.4.13 for forge instead of pictured)
> ![Interface for creating a new instance in PrismLauncher](https://github.com/TerraFirmaGreg-Team/.github/blob/main/wiki/new_instances.png?raw=true)

#### <GradientText>Step 2</GradientText>: Finding the Prism Folder
1. Locate the instance folder in the PrismLauncher directory at **`TerraFirmaGreg-Modern/minecraft`**.

> [!TIP]  
> For quick access, right-click on the instance and select **`Folder`**.  
> ![Instance folder in PrismLauncher](https://github.com/TerraFirmaGreg-Team/.github/blob/main/wiki/prism_folder.png?raw=true)

#### <GradientText>Step 3</GradientText>: Make a fork of the Repository
You can do all of this in a web browser.
1. Open [TerraFirmaGreg-Modern] repository.
2. Make sure you are signed in, and press **`Fork`**.
3. Configure and press **`Create fork`**

#### <GradientText>Step 4</GradientText>: Cloning the Repository
First, create a new folder to store your development folder to prevent configs getting messed up.

**Method A: Visual Studio Code**
1. Open [Visual Studio Code] and ensure you are logged into GitHub. (Bottom left user)
2. Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open the Command Palette.
3. Search **`Git: Clone`** and select it.
4. Select **`Clone from Github`**.
5. Search your repository name ("YourNameHere/TerraFirmaGreg-Modern") and select it.
6. If you are prompted to open an existing clone, press **`Clone Again`**.
7. Select your development folder to clone into.

**Method B: GitHub Desktop**
1. Open [GitHub Desktop] and log in.
2. Select **File → Clone repository...**
3. On the **URL** tab, enter: **`https://github.com/YourNameHere/TerraFirmaGreg-Modern.git`**
4. In the **Local Path** field, select your development folder.
5. Click **Clone**.

**Method C: Terminal / cmd**
This can also be done inside VSCode, using the terminal at the bottom of your screen.
1. Open **terminal** or **cmd** in the root directory of your development folder.
2. Execute the command:
  ```bash
   git clone https://github.com/YourNameHere/TerraFirmaGreg-Modern.git
  ```

#### <GradientText>Step 5</GradientText>: Copying and linking development & instance folders
1. Copy all of your files from your development folder into the **`minecraft`** folder.
2. Delete any folders you are going to change. The most likely one is **`kubejs`**.
3. Symbolically link your development **`kubejs`** folder to your prism folder. There are a few ways to do this, the easiest being using `mklink Link Target` in a command prompt.

>[!TIP]
> <details>
>
> This is done so you can edit files in your development instance without your game messing up most files.
> If you update your development instance, you should also update your prism instance.
> It is technically possible to develop in your instance folder, but strongly discouraged.
> If you do, use `.git/info/exclude` like a local .gitignore.
>
> </details>

#### <GradientText>Step 6</GradientText>: Synchronizing Dependencies via Pakku
1. Open **terminal** or **cmd** in the root directory of your Prism instance folder.
2. Execute the following command:
```bash
  pakku fetch
```

> [!TIP]
> <details>
>
> This command downloads all necessary project files into the modpack's folder. Note that the command may differ depending on how Pakku was installed. If you find that the command does not work, you can try `java -jar pakku.jar fetch`.
>
> This will not update your TerraFirmaGreg-Core-Modern! Keep following.
>
> </details>

3. Open [TerraFirmaGreg-Core-Modern] and download the latest release.
4. In your mods folder, find the TerraFirmaGreg-Core-Modern jar file, delete it, and replace it with the one you just downloaded.

> Even newer releases may be available in GitHub Actions. Additionally, if you are developing [TerraFirmaGreg-Core-Modern], you can copy your built jars to test them.

#### <GradientText>Step 7</GradientText>: Working with Branches and Creating Pull Request
There are two approaches to creating a Pull Request: via terminal and via an IDE like Visual Studio Code.

**Branch Designation**
- **`main`:**
    - This branch contains the stable, tested, and released version of the project.
    - It should only contain changes that have passed the full review cycle.
    - Changes can be accepted by members of the **Project-Lead** team; at least one approval is required.
    - Never push directly to this branch. Or make a Pull Request to it unless you have permission.

- **`dev`:**
    - The main development branch where new features, bug fixes, and experimental changes are integrated.
    - After testing, changes from dev may be merged into the main branch for a new version release.
    - Changes can be accepted by members of the **Modern-Team** team; at least two approvals are required.

- **`feature/bugfix-branch`:**
    - For example, (`feature/add-custom-quest`) or (`bugfix/fix-launch-crash`).
    - It is recommended to create separate branches from dev for developing specific features or fixing bugs.
    - After completing the work, merge them back into dev.
    - Members of the **Modern-Team** team can create branches in the main repository.

>[!TIP]
> Remember, you can make branches in your fork freely! It makes pull requests a lot easier.

**Process of Creating Pull Request**

**Method A: Visual Studio Code**
>[!TIP]
>Most everything in VSCode can also be done through the command palette!
1. **Creating a New Branch:**
    - Open [Visual Studio Code] and ensure that you are in your development folder.
    - In the sidebar, open the **Source Control** menu.
    - Next to changes, click the three dots and click **`Branch > Create Branch`**
    - In the appearing window, enter a name for your new branch (e.g., **`feature/add-custom-quest`** or **`bugfix/fix-launch-crash`**).
    - Press <kbd>Enter</kbd> to confirm. Now you are in a new branch created from the dev branch.

2. **Making and Committing Changes:**
    - Make the necessary changes to the project.
    - Return to Source Control, where you will see a list of modified files.
    - Add a description of your changes, enter a commit message, and click **`Commit`**.

3. **Publishing the Branch:**
    - After committing changes, click the new **`Push`** button.
    - This will send your new branch to GitHub.

4. **Creating Pull Request:**
    - After a successful push, you can open the [Github Pull Requests] menu, if installed, and press **Create Pull Request**.
    - Ensure that:
        - The base branch for merging is set to **`dev`** of the main repository.
        - The title and description of the Pull Request contain detailed descriptions of the changes made, as well as links to related Issues if necessary.
    - Click **Create Pull Request** to send a request to merge your changes into the dev branch.

>[!TIP]
> You can also create a pull request using the website, if you prefer.

**Method B: GitHub Desktop**

1. **Creating a New Branch:**
    - Open [GitHub Desktop] and ensure that your local repository **`TerraFirmaGreg-Modern`** is selected.
    - In the top menu, select **`Branch → New Branch...`**.
    - In the appearing window, enter a name for your new branch (e.g., **`feature/add-custom-quest`** or **`bugfix/fix-launch-crash`**).
    - Click **`Create Branch`**. Now you are in a new branch created from the dev branch.

2. **Making and Committing Changes:**
    - Make the necessary changes to the project using your favorite code editor (e.g., [Visual Studio Code]).
    - Return to GitHub Desktop, go to the **`Changes`** tab, where you will see a list of modified files.
    - Add a description of your changes, enter a commit message, and click **`Commit to <branch_name>`**.

3. **Publishing the Branch:**
    - After committing changes, click the **`Push origin`** button in the top right corner of GitHub Desktop.
    - This will send your new branch to GitHub.

4. **Creating Pull Request:**
    - After a successful push, [GitHub Desktop] will offer you a **Create Pull Request** button or a link **View on GitHub**. Click it.
    - In the opened web interface of GitHub, ensure that:
        - The base branch for merging is set to **`dev`** of the main repository.
        - The title and description of the Pull Request contain detailed descriptions of the changes made, as well as links to related Issues if necessary.
    - Click **Create Pull Request** to send a request to merge your changes into the dev branch.

**Method C: Using terminal / cmd**

1. **Synchronizing with upstream:**
- Ensure that your local repository is up to date. If you have already set up a remote upstream (the official repository), execute:

  ```bash
    git checkout dev
    git pull upstream dev
  ```
2. **Creating a new branch for changes:**
- From the dev branch, create a new feature or bugfix branch:

  ```bash
  git checkout -b feature/name-of-feature
  ```
- Name your branch clearly (e.g., feature/add-custom-quest or bugfix/fix-crash-on-launch).

3. **Making changes:**
- Make changes to the code, accompanied by commits with clear messages:

  ```bash
  git add .
  git commit -m "Brief description of changes made"
  ```
4. **Pushing the branch to GitHub:**
- Push your branch to your fork:

  ```bash
  git push origin feature/name-of-feature
  ```

5. **Creating Pull Request:**
- Go to the page of your fork on GitHub.
- Click the Compare & Pull Request button next to the just pushed branch.
- Ensure that dev of the main repository is selected as the base branch.
- Fill in the title and description of the Pull Request, mention which problems this PR solves, and if possible, provide links to corresponding Issues.
- Send the request by clicking Create Pull Request.

> [!TIP]  
> If you have questions about formatting a Pull Request or are unsure with which branch to merge, refer to the project documentation or contact the team via [Discord].

#### <GradientText>Step 8</GradientText>: Processing and Merging Pull Request
1. Reviewing Pull Request:
- After creating a Pull Request, it enters a queue for review by members of the team. Please make sure to follow our [Quality Guidelines](#modernheader-fadegradienttext-quality-guidelines-gradienttextmodernheader) to reduce issues that may be brought up during review.
- Members of [Dev-Modern] (for merging into main) or [Contributor-Modern] (for merging into dev) review the changes made, leave comments, and request revisions if necessary.

2. Making Corrections:
- If corrections are required, the PR author makes them in their branch, and the updated commit automatically appears in the open request.

3. Approval:
- After making all necessary corrections and receiving positive feedback from reviewers, the PR is considered approved.
- To merge changes into main, at least one approval from members of the [Dev-Modern] team is required.
- For merging into dev – at least two approvals from members of the [Contributor-Modern] team are required.

4. Merging Pull Request:
- After approval, an authorized member or maintainer performs the merge PR (using Squash and Merge according to project rules).
- After successful merging, it is recommended to delete the branch to maintain repository cleanliness.

5. Post-Merge:
- The merge of PR triggers build and testing processes to ensure the stability of the changes made.
- If issues are discovered after merging, a new Pull Request is created for their resolution.

</details>

---

### 3. Feature Creation

This section provides information on how to create a new feature or manage existing issues in the TerraFirmaGreg modpack. Due to the sheer volume of possible changes that can be made, we will provide some basic examples of our project structure and available tools. For more in-depth information about specific utility available, please check out our [Outside Resources](#modernheader-fadegradienttext-outside-resources-gradienttextmodernheader) list.

We will also assume that you have at least a basic understanding of programming in JavaScript and editing JSON files.

<details>
    <summary> Information </summary>

#### <GradientText>Step 1</GradientText>: Finding a Project

a. If you have found a project you would like to work on contributing to the modpack please check in with the development team on Discord or make a GitHub issue first for us to decide if It's something we would accept into our repository.

b. If you do not have a project in mind but would still like to help out in some way, you can browse our [GitHub Issues](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/issues) to find something that interests you. Please make sure to only work on issues marked as `Status: Ready` and without any current `Assignees`. It is also good practice to leave a comment on the issue declaring that you are working on it to avoid confusion. Issues labeled as `Triage: Help wanted` are particularly helpful to us. If you are new to modpack creation and want a relatively easy task to handle, please check out issues marked as `Triage: Good first issue`.

#### <GradientText>Step 2</GradientText>: Navigating the Repository

The modpack side of TerraFirmaGreg is typically handled by KubeJS. KubeJS is a modding framework that allows you to create many aspects of Minecraft using JavaScript with the Rhino engine. KubeJS can function as a resource pack, data pack, and through class reflection--Can replicate some Mod behaviors.

The file structure of TFG is typically organized as follows:

<details open>
    <summary> File Structure </summary>

> [!TIP] 
> Hover over each entry to see a description of its purpose. Or click for a link to the repository. When folders are marked as `namespace/` it means that the folder is separated by the name of the related mod.

>🖿 <abbr title="Contains mod configuration files usually involving client modifications.">[`config`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/config)</abbr>\
>🖿 <abbr title="Contains mod configuration files usually involving server modifications.">[`defaultconfigs`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/defaultconfigs)</abbr>\
>🖿 <abbr title="Contains all files related to KubeJS registration.">[`kubejs`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs)</abbr>\
>&emsp;│&emsp;🖿 <abbr title="Contains resource pack assets. Can be reloaded in game with `F3 + T`">[`assets`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets)</abbr>\
>&emsp;│&emsp;│&emsp;🖿 `namespace/`\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Controls which models are used for a block depending on its current state.">[`blockstates`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/blockstates)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Holds model JSON files for use by blocks, items, etc.">[`models`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/models)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Holds molecule JSON files which show molecule display in GregTech item tooltips.">[`molecules`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/molecules)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Holds particle JSON files which determined the appearance of particles.">[`particles`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/particles)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Holds texture files for everything in the game.">[`textures`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfg/textures)</abbr>\
>&emsp;│&emsp;│&emsp;\
>&emsp;│&emsp;🖿 <abbr title="Contains client-side scripts. Can be reloaded in game with `/kubejs reload client_scripts` and/or `F3 + T`">[`client_scripts`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/client_scripts)</abbr>\
>&emsp;│&emsp;│&emsp;🗎 <abbr title="Main registry file for client-side scripts. All new scripts should be routed through here.">[`main_client_script.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/client_scripts/main_client_script.js)</abbr>\
>&emsp;│&emsp;│&emsp;🗎 <abbr title="Client script file used for making EMIXX groupings.">[`emixx.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/client_scripts/emixx.js)</abbr>\
>&emsp;│&emsp;│&emsp;🗎 <abbr title="Client script file used to add custom tooltips to items">[`tooltips.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/client_scripts/tooltips.js)</abbr>\
>&emsp;│&emsp;│&emsp;\
>&emsp;│&emsp;🖿 <abbr title="Contains data pack assets. Can be reloaded in game with `/reload`">[`data`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data)</abbr>\
>&emsp;│&emsp;│&emsp;🖿 `namespace/`\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Holds custom loot tables which control things like block drops and structure loot.">[`loot_tables`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data/tfg/loot_tables)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Holds custom structure nbt files.">[`structures`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data/tfg/structures)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🖿 <abbr title="Holds folders related to worldgen like placed_features and configured_features.">[`worldgen`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/data/tfg/worldgen)</abbr>\
>&emsp;│&emsp;│&emsp;\
>&emsp;│&emsp;🖿 <abbr title="Contains server-side scripts. Can be reloaded in game with `/kubejs reload server_scripts` + `/reload`">[`server_scripts`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/server_scripts)</abbr>\
>&emsp;│&emsp;│&emsp;🖿 `namespace/`\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Event script files handle server-side events like block interactions and item usage.">[`events.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/events.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Loot script files handle loot-table generation using LootJS.">[`loot.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/loot.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Recipe script files handle creating and removing recipes.">[`recipes.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/recipes.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Data script files handle Kubejs-TFC data generation like food-data, heat-data, size-data, etc.">[`data.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/data.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Tag script files handle creating and removing item, block, fluid, entity, and biome tags.">[`tags.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/tfg/tags.js)</abbr>\
>&emsp;│&emsp;│&emsp;🗎 <abbr title="Main server script which all server script files must be registered in to keep load order consistent.">[`main_server_script.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/server_scripts/main_server_script.js)</abbr>\
>&emsp;│&emsp;│&emsp;\
>&emsp;│&emsp;🖿 <abbr title="Contains startup scripts. Cannot be reloaded in game. Requires a restart.">[`startup_scripts`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/startup_scripts)</abbr>\
>&emsp;│&emsp;│&emsp;🖿 `namespace/`\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Block registry files handle creating new blocks.">[`blocks.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/blocks.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Item registry files handle creating new items.">[`items.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/items.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Material registry files handle creating new GregTech materials.">[`materials.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/materials.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Fluid registry files handle creating new fluids.">[`fluids.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/fluids.js)</abbr>\
>&emsp;│&emsp;│&emsp;│&emsp;🗎 <abbr title="Constants files are used to store variables to be declared all through out the codebas. Using then `global.` prefix for functions and constants lets you call them elsewhere.">[`constants.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/tfg/constants.js)</abbr>\
>&emsp;│&emsp;│&emsp;🗎 <abbr title="Main startup script which all startup script files must be registered in to keep load order consistent.">[`main_startup_script.js`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/kubejs/startup_scripts/main_startup_script.js)</abbr>\
>🗎 <abbr title="Markdown document detailing changes made to the modpack for each version.">[`CHANGELOG.md`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/CHANGELOG.md)</abbr>\
>🗎 <abbr title="JSON file used to lock pakku to hold our dependencies.">[`pakku-lock.json`](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/pakku-lock.json)</abbr>

</details>

#### <GradientText>Step 3</GradientText>: Creation Pipeline

Creation steps will vary wildly between different types of projects. However, for a general idea of how to create a new item with recipes, the following steps will typically be involved:

1. In `startup_scripts.js` create your new item. Follow the example of pre-existing item registration or read [KubeJS documentation](https://wiki.latvian.dev/books/kubejs/page/custom-items) for more details. You should also add item tags at this point. But you can do it in step 3 if you prefer.
2. Place assets for your new item in the appropriate folders within the `assets` directory. Ensure that the assets follow the same name and file path as the item itself or the custom path you specified in the item registration. KubeJS will automatically create basic models, so typically you only need to provide a texture.
3. In `server_scripts.js` create recipes for your new item. Make sure to use tags when possible and give each recipe a unique ID.
4. If you want to add a custom tooltip to your item, then you can do it in `client_scripts.js`.
5. Submit lang strings for your new item (and your custom tooltip if applicable) to our [Tools Repository](https://github.com/TerraFirmaGreg-Team/Tools-Modern/tree/dev/LanguageMerger).
6. Test all your changes and then commit them to your branch. Then submit a pull request to the TFG `dev` branch for review.

>[!TIP]
> If you would like to add a field guide entry for your item, then navigate to the [TFC Assets Folder](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/tree/dev/kubejs/assets/tfc/patchouli_books/field_guide/en_us/entries). Also consider if a quest entry may be useful for your item.

</details>

---

### 4. Additional Information

<details>
    <summary> Information </summary>

- #### Versioning Rules:
    - This project loosely follows [Semantic Versioning](https://semver.org/).
    - **Minor**: Bug fixes and minor changes (`0.10.0` → `0.10.1`)
    - **Major**: Large features that theme new updates (`0.10.0` → `0.11.0`)
    - **Release**: Final release of a content cycle. (`0.10.0` → `1.0.0`)
    - **alpha**: Released versions of the project that might not be stable. (`0.10.0` → `0.10.1 alpha`)

- #### Working with Git:
    - Create separate branches for each new functionality or bug fix.
    - Regularly synchronize your fork with the original repository to avoid conflicts.
    - Use clear commit messages for a better understanding of changes.

- #### Debugging and Testing:
    - Before making your changes, ensure that the project runs without errors.
    - Check PrismLauncher logs to identify potential issues.
    - Using Visual Studio Code with the [ProbeJs] extension helps quickly detect and fix errors.

- #### Documentation and Discussion:
    - If you have questions or problems, refer to the Issues or Discussions section of the GitHub project, as well as forums on [Discord](https://discord.com/invite/AEaCzCTUwQ).
    - Collective discussion often leads to finding optimal solutions and improving the project overall.

- #### Collaborative Development:
    - Always test the integration of your changes with the main project.
    - Before sending a Pull Request, it is important to ensure that your changes do not disrupt the modpack's operation and comply with [internal code of conduct](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/blob/dev/.github/CODE_OF_CONDUCT.md).

- #### Localization:
    - If you're looking for Localizing the modpack to a Language, please feel free to head to our [Crowdin](https://terrafirmagreg.crowdin.com).

- #### Linting & TypeScript support

  All development tools configuration is located in the `kubejs/` folder.

  **Installation:**

  ```bash
  # From the modpack root
  npm install --prefix kubejs

  # Or from the kubejs folder
  npm install
  ```

  **Running the linter:**

  ```bash
  # From the modpack root
  npm run lint --prefix kubejs
  npm run lint:fix --prefix kubejs

  # Or from the kubejs folder
  cd kubejs
  npm run lint
  npm run lint:fix
  ```

  **Code formatting:**

> Note: Do not run prettier or lint over an entire file. Or it will become difficult to review and will likely be rejected. Only run prettier over your own changes by using Format Selection instead of Format Document. Unless approved by a team member.

**TypeScript checking:**

1. Install dependencies (see above)
2. Run ProbeJS to generate types
3. Set `"noCheck": false` in `kubejs/tsconfig.json`

</details>

---

</details>
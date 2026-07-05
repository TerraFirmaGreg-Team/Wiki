---
title: Modpack Publishing
order: 7
---
# How to publish a new release of the modpack

Here's a step-by-step guide on how to publish a new version of the modpack.

## 1. Yell at other contributors if they've got any last minute things to finish

Team coordination is important!

Finish up any PR reviews and merge them in. If there's any last-minute things to finish, consider if they're too risky and if it's worth making them wait for the next version so you can test them more thoroughly. TFG loves hotfixes, but it's even better if we don't have to do them.

## 2. Check for any mod updates

You can do this with most launchers, but do **not** update these mods:
- *Drippy Loading Screen & FancyMenu* - they currently have [a bug](https://github.com/Keksuccino/Drippy-Loading-Screen/issues/118) that makes our loading screen's progress bar look weird. If/when that's fixed then these should be ok to update.
- *EMI, EMI++, and Reliable Remover* - the latest version of EMI (1.1.24) crashes on TFG. If it gets an update, try it again, or find out which one of our mods is crashing and get them to update too. EMI++ and Reliable Remover are dependencies on EMI.
- *KubeJS* - Version 2001.6.5-build.26 broke the API for edible/drinkable items. If they ever sort their shit out, it's ok to update this.
- *PandaLib & Panda's Falling Trees* - **never update this!** Newer versions completely changed how it detects trees, and broke it working with TFC ones. This is fixed on the 1.21 version of these mods, but the author doesn't support 1.20 any more (to avoid breaking anything else). We also have a lot of TFG-Core mixins around this version.
- *TFC Astikor Carts* - **never update this!** Newer versions don't work with the mixins TFG-Core has, and don't contain anything new that we'd want anyway.
- *ModernFix* - Causes issues with item stacking and wooden buckets not working after version (5.27.51).

It should be safe to update anything else, but be sure to run the game and test them a little before publishing.

Also, check if [AE2 Cosmolite](https://github.com/Frontiers-PackForge/Applied-Energistics-2-cosmolite) or [its resource pack](https://github.com/Frontiers-PackForge/AE2-Midnight-and-Daybreak) has had an update, because these won't show up on your launcher.

Be sure to check if any shaders or resource packs have updates too.

### 2a. Update pakku-lock.json

If you keep your minecraft instance separate from your workspace (as you should), copy the pakku-lock.json file from your workspace into your instance. Next, open a command prompt/terminal at your workspace.

If you've never used Pakku before, get another developer to walk you through it. The documentation is [here](https://juraj-hrivnak.github.io/Pakku/home.html).

For the most part, you'll only really be using two commands:
- `java -jar pakku.jar update modid` for updating a mod (you can use curseforge's website url to get the correct mod ID)
- `java -jar pakku.jar fetch` for downloading updates and ensuring your modpack has the versions of mods that are listed in pakku-lock.json

After updating everything, be sure to run the game to test updates. Then, copy the pakku-lock.json file back into your workspace.

### 2b. Update pakku.json

To change between types of publishes, edit the `pakku.json` file and look for the `release_type` line near the top. Change this to `alpha`, `beta`, or `release` if necessary.

If you're adding "optional" mods, you can include them here with `"export": false`, but keep in mind that only some launchers obey this. CurseForge downloads everything even if it's marked as optional here, so that's why we have that "optional mod list" wiki page instead.

Most of the time you don't need to update this file.

### 2c. Update TFG-Core

If any of the updated mods are also dependencies for TFG-Core, you'll need to update those as well. Look in `gradle.properties` and `gradle/scripts/dependencies.gradle` for the dependencies.

## 3. Publish TFG-Core

Simply open `gradle.properties` and change the version number of `mod_version`, then push to `dev`. The build scripts will automatically publish a new release to curseforge and modrinth. After it's published, it usually takes up to 30 mins for both sites to make the release public.

Note that the release being visible on the website does not necessarily mean the release is accessible to Pakku.

While waiting on this, you can continue with some of the below steps.

## 4. Update the changelog

Update the CHANGELOG.md in Modpack-Modern. Look through the recent history of modpack-modern, core-modern, and tools-modern and add it all. If there's been any recent mod updates with things you wanna shout out, or tfg shader updates, write them here too.

Until everything else is ready, keep the topmost header as `## Unreleased`, as changing this will start the modpack publishing process.

## 5. Check for version mismatches

In Tools-Modern, there's a tool named PakkuLockChecker. It will go through your pakku-lock.json file and check for any version mismatches between curseforge and modrinth, and if mods are missing on either site.

It's normal for a lot of mods to be missing from modrinth, and for a few mods to have version mismatches, so you only really need to look out for the important ones like TFG-Core and so on.

## 6. Run the language merger

Sync the Tools-Modern repo and run the LanguageMerger tool. This will ensure that the modpack has all of the latest changes to the english text. Commit the `en_us` json files in the modpack afterwards.

## 7. Wait for TFG-Core 

Keep doing `java -jar pakku.jar update TerraFirmaGreg-Core` until your pakku-lock.json file has the correct versions for both curseforge and modrinth. The PakkuLockChecker tool may also be useful here.

## 8. Launch the modpack a final time

If your minecraft instance and workspace are separate folders (as they should be), copy over your config and defaultconfigs folders to your instance and launch the game a final time.

Run some quick tests like opening your test world, checking `/kjs errors server_scripts` to check for any warnings, check if `minecraft:barrier` has any recipe uses (which indicates empty tags), try drinking the ground (this can happen if TFC's data is broken), check that the field guide isn't broken, try creating a new world to make sure that works, check that any new quests aren't instantly completing on first load...

If everything's all good, copy the `config/crash_assistant/modlist.json` file from your instance back into your workspace. This file is used in Crash Assistant error reports to say what mod changes the user has made.

## 9. Run a linux server test

Make sure everything you've changed in the modpack is published to `dev`, then wait for the [build system](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/actions) to finish making a build.

Get someone with a linux server (tom and sakura can both do this) to download the built serverpack and run it. Some bugs and crashes only show up on servers!

You can maybe skip this step if you're doing a small but urgent publish with a bunch of recipe hotfixes or something, but if it's not urgent, it's good to test this.

## 10. Final steps

If this is your first time publishing, make sure you have another experienced dev check all of your steps before continuing!

At the top of the modpack's CHANGELOG.md, make a new `## Unreleased` section and change the existing one to have a proper release number and date. It should follow a format like `## [0.xx.yy] - DD-MM-YYYY`.

Push your changes to `dev`. Wait a little bit and the build script will create a pull request. Review everything in the pull request description. If it all looks good, assign Xikaro as the reviewer and mark the pull request as Ready for Review.

Whenever he approves it, the publishing process begins. Wait another 15 or so minutes and there will be a new announcement in `#modern-releases` in the discord. You can forward this post to our threads in the TFC and GT servers (in the `Content` and `pack-advertisement` channels respectively), and to flurben's server's `tfg-announcements` channel.

---
title: Updating & Reinstalling the Modpack
order: 2
---
# Updating and Reinstalling the Modpack
When updating the modpack, it is always safest to do so through a **clean reinstall**. If your modpack launcher has an "update" button, this frequently does not update the modpack correctly, leading to broken recipes, the modpack failing to launch, and other issues.

If your modpack has a strange bug that nobody else seems to have, often a **clean reinstall** will fix the problem. It's a good idea to try this before [reporting it to us](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/issues).

## How to do a clean reinstall

### Prism
1. Click the "Add Instance" button at the top of the window.
2. Go to the CurseForge section and download TerraFirmaGreg-Modern.
3. Wait for the modpack to download and install.
4. If it asks if you want to create a new instance or to update, select **Create Instance**.
5. When you get a "Blocked mods found" window, follow the instructions to download the remaining mods.
6. After the download is finished, select the new instance and press the "Folder" button on the right. Select the old instance and do the same. Go inside the `minecraft` folders in each.

### CurseForge
1. Select your existing instance, then click the "Change Versions" button with the two arrows next to the orange Play button.
2. Make sure "Update to latest version" is selected, then tick the box for "Update to a separate modpack profile".
3. Wait for the modpack to download and install.
4. After the download is finished, select the new instance, then open the triple-dot menu on the top right, then select Open Folder. Select the old instance and do the same.

### Next Steps
1. Copy and paste these folders and files from your old folder into the new one:
	* `saves`
	* `xaero`
	* `backups` (optional)
	* `options.txt`
	* `emi.json` (if it exists)
	* `emi.css` (if it exists)
2. Change the new instance's maximum RAM allocation to what you had before (we recommend 6-8 GB)
3. Launch the new instance as normal. Check that everything works properly before deleting your old instance!

## Servers
1. Download and extract the server pack from our [GitHub](https://github.com/TerraFirmaGreg-Team/Modpack-Modern/releases).
2. Copy the new server pack files into your server, but into a separate folder from your current install.
3. Copy and paste the `saves` and `backups` (optional) folders from your old instance into your new one, as well as anything else server-specific like the player whitelist.
4. Launch the new instance as normal. Check that everything works properly before deleting your old instance!
5. Your players will need to be on the same version in order to connect to your server. If they have an error about mod version mismatches (even if the mod versions look the same), that usually means they did not update correctly, and you should send them a link to this guide.
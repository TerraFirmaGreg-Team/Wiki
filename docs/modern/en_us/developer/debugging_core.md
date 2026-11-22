---
title: Breakpoint Debugging TFGCore in the Modpack
order: 3
---
## Breakpoint Debugging TFGCore in a Modpack Instance

Sometimes during development of TFGCore you may end up in a situation where the behaviour is different between the Mod development environment, and the Modpack environment.
This guide covers how to attach a Debugger instance to a Modpack-Modern instance, which will give you the tools necessary for debugging complex issues.

Information taken from: https://www.jetbrains.com/help/idea/attach-to-process.html

### Setup

* Have a working instance of [Core-Modern](https://github.com/TerraFirmaGreg-Team/Core-Modern)
* A launcher that lets you modify JVM Arguments

### Steps

1. Ensure your instance of the Modpack is on the same branch as the Core-Modern branch
  * If you're debugging a modpack instance in branch dev, the Core-Modern branch needs to be in dev as well.
2. Build TFGCore so that the .jar file ends up in your modpack instance. You will need to setup a ``gradle-local.properties`` file, guide on how to do this can be found [here](https://wiki.terrafirmagreg.team/modern/en_us/developer/datagen)
3. Assign the following Java Arguments to the JVM on your modpack instance.
```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=127.0.0.1:5005
```
  * ``suspend=y`` halts the execution of the modpack until a debugger is attached. set this to ``n`` if you do not wish for this behaviour
  * You can find the Java Arguments in the Prism Launcher by right clicking your modpack instance, selecting ``Edit``, then clicking the ``Settings`` sidebar.
<img width="608" height="532" alt="image" src="https://github.com/user-attachments/assets/dd9e9b4e-8ce4-4f84-90f6-ac293b6f9ad5" />

4. Boot up your modpack instance.
5. On IntelliJ, go to ``Run/Attach to Process``
6. Select the option that contains the port number 5005
<img width="650" height="314" alt="image" src="https://github.com/user-attachments/assets/09c76555-abd8-4dc1-bd35-56a06348f9bb" />

7. This will attach the debugger to the modpack instance, and the modpack will boot up as normal
8. Setting up breakpoints within TFGCore will break the execution once that point is reached, allowing you to inspect the internals.

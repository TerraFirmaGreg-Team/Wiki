[Pixel Composer](https://pixel-composer.com) is a 2D and 3D art tool which is used in the pack to make various animated textures, including the new logo! Since there isn't much documentation online, I am creating this article to share what I know.

<h1 align="center">  Basics </h1>
<p align="center"> Lets break down the elements. </p>
<p align="center">
  <img width="1440" height="720" alt="full" src="https://github.com/user-attachments/assets/14cbcb75-e44b-4e5b-80ef-9c8ee8ed6472" />
</p>

<h2 align="center"> A) Preview Window </h2>
<p align="center"> 
The preview window is used to display what node is currently being targeted. You can bring up the preview for a node by double clicking on the node, or right-click and select "send to preview". The preview window is also where you will be drawing if you use the "canvas" tool.
</p>

<p align="center">
  <img width="420" height="740" alt="preview" src="https://github.com/user-attachments/assets/a52b6048-b9d3-4757-be48-24b7b98211ab" />
</p>

**1\) Tiling**
> The main thing to note is that you can preview tiling by enabling the tiling option.

<h2 align="center"> B) Workspace </h2>
<p align="center"> 
The workspace is where you will be linking nodes together in order to produce and image. You can add nodes by right-clicking the empty space and select a node you want. There are many nodes available but we will stick with the basics for 2D images.
</p>

<p align="center">
  <img width="1440" height="190" alt="basics" src="https://github.com/user-attachments/assets/50d08602-4ef3-4f03-97f8-ae4d2c7c08ba" />
</p>

**1\) Noise**
> Noise patterns are your best friend for making procedural textures. Some tile seamlessly while some don't, and some can be animated to loop cycles while some cant. Try out different noise patterns to get what you are looking for.

**2\) Transform**
> The transform node will allow you preform basic transformations, like translation, scaling, rotation, etc.

**3\) Colorize**
> The colorize node is used to manipulate color, you can use either a gradient or a palette to re-color your nodes.

**4\) Composite**
> The composite node works just like layers in photoshop or other art programs.

**5\) Color Adjust**
> The color adjust node allows you preform all types of basic image editing, like adjusting opacity, hue, saturation, contrast, etc.

**6\) Render Spritesheet**
> The render spritesheet node arranges all frames from your timeline into a single image. You can control the order of stacking in the node panel.

**7\) Export**
> The export node takes the input node and converts it to a file type to be saved to your PC.

<h2 align="center"> C) Node Panel </h2>
<p align="center"> 
The node panel is where you will be spending most of your time adjusting the settings of each of your nodes.
</p>

<p align="center">
<img width="480" height="872" alt="tools" src="https://github.com/user-attachments/assets/678684fd-d345-4cba-8f50-a9e37a78955d" />
</p>

**1\) Animation**
> The stopwatch looking button is used to enable animation of the current setting in the timeline.

**2\) Visibility**
> The eye looking button will prevent the current setting from being displayed in the preview

**3\) Mapping**
> The dice looking button will toggle mapping for the current setting, letting you change its values with nodes.

<h2 align="center"> D) Timeline </h2>
<p align="center"> 
The timeline controls your animation with the use of key-frames. You can play the time-line by pressing the space-key. The timeline needs to play for some nodes to work--Like "Render Spritesheet".
</p>

<p align="center">
<img width="1440" height="220" alt="timeline" src="https://github.com/user-attachments/assets/0de1a039-c9bf-4f56-9350-61c872a7f972" />
</p>

**1\) Settings**
> Something important to know is that you will control the timeline length and frame rate in the settings menu in the bottom right. Note that the framerate wont be applied to your export, just the preview. You control the framerate of the export in the export node panel.

> ### TODO: 
> Replace image files with links.
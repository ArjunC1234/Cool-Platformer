<h1>
  "Cool Platformer" Overview
</h1>

***By: Arjun Cattamanchi***

***
**<h3>Game Concept</h3>**

This game is about a person whose goal is to get to the end of the level.

***
**<h3>Dependencies/Packages</h3>**

The following dependencies are used in this project:
>Express.js
<br>
>Socket.IO

**Express.js**
This package adds an additional layer to node.js that allows developers to create web applications.

**Socket.IO**
This package allows developers to communicate between the back-end and front-end of a server-based application easily.
***

**<h3>Behind the Scenes</h3>**

This game makes use of HTML5 Canvas for graphics. The frame refresh rate is capped at around 60 fps.

**Tilemap** <br>
The tilemap is based off of a "grid" format. Different integers are inputted into a 2 dimensional array, where each number represents a different kind of tile. This is used to determine what collisions should be performed and what tile should be drawn.

**Physics** <br>
All physics algorithms are manually coded and do not use third-party packages. Jumping and gravity 
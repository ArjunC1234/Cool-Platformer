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
This package allows developers to communicate between the back-end and front-end of a server-based application easily. However, this uses TCP, hence why multiplayer is slow. I'll go more into this in the "Behind the Scenes" section.
***

**<h3>Behind the Scenes</h3>**

This game makes use of HTML5 Canvas for graphics. The frame refresh rate is capped at around 60 fps.

**Tilemap** <br>
The tilemap is based off of a "grid" format. Different integers are inputted into a 2 dimensional array, where each number represents a different kind of tile. This is used to determine what collisions should be performed and what tile should be drawn.

**Physics** <br>
All physics algorithms are manually coded and do not use third-party packages. Jumping and gravity is acceleration based and uses game-ticks to determine when to accelerate/deaccelerated the y-velocity of the player. Collisions are accomplished by saving the players old location every game loop, and performing an algorithm that checks whether the player is inside of the tile. Instead of checking for whether the player is touching the tile, the algorithm determines whether the player is "not outside" the tile. For some tiles however, the collision is based off of the center of the player so that completing levels is not too difficult. After determining this, I use the modulo operator (%) to place the player right beside the tile. I then use a series of scripts for each tile in order to tell the client what to do if there is a collision depending on the tile type.

**Multiplayer** <br>
Multiplayer sounds complicated, but after wrapping my brain around some concepts, I was able to get it working. Because Socket.IO uses TCP, transmitting data is very slow for game development. Unfortunately, there isn't an easy way to use UDP in JS, so I had to make do with what I had. I dealt with this issue by calculating physics client side, and transmitting coordinates across the server. This way, at least each player would be able to have smooth movement regardless of how much data was being transmitted at once. If I had processed game data and calculations server-side, game updates would happen for all clients at the exact same time. An example of this is in the following project (that I made) "fluffy-patch-finch.glitch.me".
***
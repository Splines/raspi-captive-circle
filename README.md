<p align="center">
  <img src="https://user-images.githubusercontent.com/37160523/159823049-125fac89-df4c-4908-a0c3-3c079c05132f.png" width="300px" />
  
  
  
  <h3 align="center">Captive Circle</h3>
  <p align="center">A captive portal game for the Raspberry Pi</p>
</p>

**Motivation**

Ever connected to a WiFi network in public space? You've probably been redirected to a page where you had to agree to the terms of use to gain access to the Internet. This web page is called "Captive Portal". Why not let users connect to your own WiFi network on a Raspberry Pi and play a game together? This is what "Captive Circle" is all about — a multi-player game for 3 or more people. Those who want to play only need a smartphone and must be physically in the same room.

**How the game works**

Players arrange themselves in a circle and everyone puts their smartphone in front of them. One player starts and swipes on the screen to pass on an imaginary impulse to the player to the left or right. The next player has to pass on the impulse within a certain time period. Not quick enough and you get eliminated. You swiped and it was not your turn? You also get eliminated. You play until there is only one player left. To make this more challenging, players can swipe with *one* finger to pass on the impulse to direct neighbors, or *two* fingers to skip direct neighbors and pass on to the next but one player.

<details>
    <summary><strong>Installation</strong></summary>
  
You, in the role of the game master, need a Raspberry Pi where you can install this game. The Raspi serves as an Access Point showing up as WiFi network on the player's smartphone. Once they connect, they get redirected to a web page that is also served on the Raspi (as Node.js Express app).

Run the script to install the game and be ready to go right away. Python is installed by default on a Raspberry Pi, so clone this repository and execute the script via:

<sub>Note that the script needs to run as sudo user. Make sure that you agree with the commands executed beforehand by looking into the `.sh` scripts in the folder `hotspot`.</sub>

```
git clone https://github.com/Splines/raspi-captive-circle.git
sudo python setup.py
```

The setup will guide you through the installation. Something not working? Open an issue.

</details>

<details>
    <summary><strong>About this project</strong></summary>

I wrote this game as a university project in the course "Distributed systems". It was supposed to help me understand how to deal with a client-server architecture and websockets. You are free to fork this project and improve it, just make sure you don't distribute this game as closed source, the community should profit from the changes you've made. I won't be able to continuously maintain this project but will probably answer/fix issues sporadically.

</details>


<details>
    <summary><strong>License</strong></summary>

```
Captive Circle - A group game with a Raspberry Pi serving as Access Point
Copyright (C) 2022 Dominic Plein

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
</details>


---

<p align="center">
  <img src="https://user-images.githubusercontent.com/37160523/160634131-9c22baf3-0093-4c44-86d6-4269e91367c3.png" alt="Captive Circle Logo with text" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/37160523/159823049-125fac89-df4c-4908-a0c3-3c079c05132f.png" width="300px" />
  
  
  
  <h3 align="center">Captive Circle</h3>
  <p align="center">A captive portal game for the Raspberry Pi</p>
</p>

**Motivation**

Ever connected to a WiFi network in public space? You've probably been redirected to a page where you had to agree to the terms of use to gain access to the Internet. This web page is called "Captive Portal". Why not let users connect to your own WiFi network on a Raspberry Pi and play a game together? This is what "Captive Circle" is all about — a multi-player game for 3 or more people. Those who want to play only need a smartphone and must be physically in the same room.

**How the game works**

Players arrange themselves in a circle and everyone puts their smartphone in front of them. One player starts and swipes on the screen to pass on an imaginary impulse to the player to the left or right. The next player has to pass on the impulse within a certain time period. Not quick enough and you get eliminated. You swiped and it was not your turn? You also get eliminated. You play until there is only one player left. To make this more challenging, players can swipe with *one* finger to pass on the impulse to direct neighbors, or *two* fingers to skip direct neighbors and pass on to the next but one player.

_Upcoming (soon): show GIF of how the game looks like and how it is played_

<details>
    <summary><strong>Installation</strong></summary>
  
You, in the role of the game master, need a Raspberry Pi where you can install this game. The Raspi serves as an Access Point showing up as WiFi network on the player's smartphone. Once they connect, they get redirected to a web page that is also served on the Raspi (as Node.js Express app). The Raspi does NOT provide Internet access to the users, it only serves the web page.

If you connect to the Raspberry Pi from remote, make sure to do so via Ethernet an NOT via WiFi as the setup script will create its own WiFi network and thus you won't be connected anymore (and maybe even lock yourself out of your Raspi).

Run the script to install the game and be ready to go right away. Python is installed by default on a Raspberry Pi, so clone this repository and execute the script via:

<sub>Note that the script needs to run as sudo user. Make sure that you agree with the commands executed beforehand by looking into the `.sh` scripts in the folder `hotspot`.Setup script tested with a fresh install of Raspbian GNU/Linux 11 (bullseye) on the Raspberry Pi 4.</sub>

```
git clone https://github.com/Splines/raspi-captive-circle.git
cd ./raspi-captive-circle/
sudo python setup.py
```

The setup will guide you through the installation. Feel free to open an issue if you encounter problems, but make sure to check out the troubleshooting section first.

</details>


<details>
    <summary><strong>Connection</strong></summary>

After the installation, tell users to connect to the WiFi network named "Captive Circle" using the password: `playgame`. Or simply scan this QR code to connect:
<br />

<p align="center">
  <img src="https://user-images.githubusercontent.com/37160523/164447578-45351a83-cf36-48b8-8645-9fd9555eb758.png" width="150px" />
</p>

The game should automatically open in a captive portal. However, it is _not_ recommended to use the browser that opened the captive portal as it may lack many features that are vital for the game to work. Therefore, if you encounter problems, open a "real" browser like "Google Chrome", "Safari" etc. and access the URL `captive.circle`. 

</details>

<details>
    <summary><strong>Start the game</strong></summary>

You - in the role of the gamemaster - navigate to the URL `captive.circle/admin` to control the flow of the game. The buttons on the page should then be self-explanatory. I will include more details here in the near future and show a walkthrough of how to play this game and what you are supposed to do as gamemaster.

</details>


<details>
    <summary><strong>Troubleshooting</strong></summary>

If this first assistance does not help, feel free to open a new issue.

**I can't connect to the "Captive Portal" WiFi or get thrown out**

Double check that you've entered the correct password: `playgame`. Also, the Raspberry Pi won't provide Internet acceess to you, it will just serve a static HTML page for the game. This is why you might get thrown out of the WiFi network. If this is the case, there is usually an option to "Use this network without Internet access" (or the like). It might also help to disable mobile data.

**How can I use a "normal" browser when I have to click "Cancel" in the captive portal?**

The Raspberry Pi serves as Access Point and does not provide Internet access to you. Therefore on the captive portal you might have to click "cancel" (e.g. on iOS) and then "Use this network without Internet access" (or the like). After that, you can open any "real" browser on your phone, e.g. Chrome, Firefox, Safari (and so forth), and go to the website `captive.circle`.

**The game does not work as expected in my browser**

Make sure you use a recent version of modern browsers. I have only tested on Google Chrome version 100 on a Windows laptop (and older versions on Android devices).

**I don't see the Captive Portal WiFi network**

Make sure that everything worked fine in the installation script. Check the output of hostapd (host access point daemon), has it started correctly? 

```
sudo systemctl status hostapd
```

If it failed try to restart it:

```
sudo systemctl restart hostapd
```

If this also fails, try to reboot the Raspberry Pi and check again:

```
sudo restart
```

**I see the Captive Portal WiFi network, but the game doesn't shows up**

Access the URL `captive.circle` in your browser. Also make sure that the server serving the static HTML pages is up and running:

```
sudo systemctl status captivecircle
```

The output should contain this line: "⚡ Raspberry Pi Circle Server listening on port 3000". Any error here? Try to restart the service:

```
sudo systemctl restart captivecircle
```


</details>



<details>
    <summary><strong>About this project</strong></summary>

I wrote this game as a university project in the course "Distributed systems". It was supposed to help me understand how to deal with a client-server architecture and websockets. You are free to fork this project and improve it, but please make sure you don't distribute this game as closed source, the community should profit from the changes you've made (see license for details). I won't be able to continuously maintain this project but will probably answer/fix issues sporadically.

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

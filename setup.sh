#!/bin/sh

# sudo apt update

# Sources
# https://www.raspberrypi.com/documentation/computers/configuration.html#setting-up-a-routed-wireless-access-point
# https://github.com/TomHumphries/RaspberryPiHotspot

# --- Install
# HostAPD access point software and DNS/DHCP via DNSMasq
sudo apt install -y dnsmasq
sudo apt install -y hostapd
# Utility to save firewall rules and restoring them when the Pi boots
sudo DEBIAN_FRONTEND=noninteractive apt install -y netfilter-persistent iptables-persistent

# Stop services since configuration files are not ready yet
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd

# Raspberry Pi acts as router on wirless network
# As it runs a DHCP Server, the Raspi needs a static IP address
cat ./hotspot/dhcpcd.conf | sudo tee -a /etc/dhcpcd.conf > /dev/null
sudo systemctl restart dhcpcd

# --- Configure DHCP server (dnsmasq)
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
sudo cp ./hotspot/dnsmasq.conf /etc/dnsmasq.conf
sudo systemctl restart dnsmasq

# --- Routing and masquerade
# Activate IPv4 package forwarding
sudo sed -i 's/#net.ipv4.ip_forward=1/net.ipv4.ip_forward=1/g' /etc/sysctl.conf
# Add redirect for all inbound http traffic for 192.168.4.1
# (which we defined earlier in dnsmasq.conf)
# to our Node.js server on port 3000 (192.168.4.1:3000)
sudo iptables -t nat -I PREROUTING -p tcp -m multiport --dports 80,443 -j DNAT --to-destination 192.168.4.1:3000
sudo iptables -t nat -I POSTROUTING -p tcp -m multiport --dport 80,443 -j MASQUERADE

# Save to be loaded at boot by the netfilter-persistent service
sudo netfilter-persistent save

# --- Configure access point (hostapd)
# Make sure wlan is not blocked on raspi
sudo rfkill unblock wlan
sudo cp ./hotspot/hostapd.conf /etc/hostapd/hostapd.conf
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd

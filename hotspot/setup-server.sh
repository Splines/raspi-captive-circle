sudo cp ./captivecircle.service /etc/systemd/system
sudo systemctl enable captivecircle

# Start service immediately
sudo systemctl start captivecircle

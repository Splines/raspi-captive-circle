import json
import os
import re
import subprocess
import sys

from setup.cli import *
from setup.colorConsole import *


def print_header():
    header = """
    #####################################################
    #########            Captive Circle         #########
    #########   A Raspberry Pi game by Splines  #########
    ######### GNU Affero General Public License #########
    #####################################################
    """
    ColorPrint.print(cyan, header)


def install_node():
    print()
    ColorPrint.print(cyan, '▶ Node.js & npm')

    # Already installed?
    installed = False
    data = {}
    try:
        res = subprocess.run(['npm', 'version', '--json'], capture_output=True)
        data = json.loads(res.stdout)
        if data['npm'] and data['node']:
            installed = True
    except:
        installed = False

    if installed:
        print(
            f'You have Node.js v{data["node"]} and npm v{data["npm"]} installed.')

        majorVersion = data["node"].split('.')[0]
        if (int(majorVersion) < 17):
            answer = query_yes_no(
                'Would you still like to try installing Node.js v17?', default='yes')
            installed = not answer

    # Install
    if not installed:
        # https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
        subprocess.run(
            'curl -fsSL https://deb.nodesource.com/setup_17.x | sudo -E bash -', shell=True)
        subprocess.run('sudo apt-get install -y nodejs', shell=True)


def setup_access_point():
    print()
    ColorPrint.print(cyan, '▶ Setup Access Point (WiFi)')

    print('We will now set up the Raspi as Access Point to connect to via WiFi.')
    print('The following commands will execute as sudo user.')
    print('Please make sure you look through the file "./hotspot/setup-hotspot.sh')
    print('first before approving.')
    answer = query_yes_no('Continue?', default='yes')

    if (not answer):
        return sys.exit(0)

    subprocess.run('sudo chmod a+x ./hotspot/setup-hotspot.sh', shell=True)
    subprocess.run('./hotspot/setup-hotspot.sh', shell=True)


def install_server_dependencies():
    print()
    ColorPrint.print(cyan, '▶ Install Node.js dependencies for build')

    subprocess.call('npm install', shell=True, cwd='./backend')


def build_server():
    print()
    ColorPrint.print(cyan, '▶ Build Node.js server (typescript)')

    print('This might take some time...')
    subprocess.call('npm run build', shell=True, cwd='./backend')


def setup_server_service():
    print()
    ColorPrint.print(cyan, '▶ Configure Node.js server to start at boot')

    # Replace path in file
    serverPath = os.path.join(os.getcwd(), 'backend')
    serviceConfigPath = './hotspot/captivecircle.service'
    with open(serviceConfigPath, 'r') as f:
        filedata = f.read()
    filedata = re.sub(r'WorkingDirectory=.*',
                      f'WorkingDirectory={serverPath}', filedata)
    with open(serviceConfigPath, 'w') as f:
        f.write(filedata)

    print('We will now register our Node.js app as a Linux service and configure')
    print('it to start at boot time.')
    print('The following commands will execute as sudo user.')
    print('Please make sure you look through the file "./hotspot/setup-server.sh')
    print('first before approving.')
    answer = query_yes_no('Continue?', default='yes')

    if (not answer):
        return sys.exit(0)

    subprocess.run('sudo chmod a+x ./setup-server.sh',
                   shell=True, cwd='./hotspot')
    subprocess.run('./setup-server.sh', shell=True, cwd='./hotspot')


def done():
    print()
    ColorPrint.print(cyan, '▶ Done')

    print('Awesome, we are done here. Grab your phone and look for the')
    print('"Captive Circle" WiFi. As gamemaster, you want to type in this URL')
    print('in your browser: captive.circle/admin')
    print('(Note that you will get a better experience if you use a "real" browser')
    print('instead of the built-in one when accessing the captive portal.)')
    print()
    print('When you reboot the Raspi, wait 2 minutes, then the WiFi network')
    print('and the server should be up and running again automatically.')
    print()
    print('If you like this project, consider giving a GitHub star ⭐')
    print()


def all():
    print_header()

    install_node()
    setup_access_point()

    install_server_dependencies()
    build_server()
    setup_server_service()

    done()


all()

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


def check_super_user():
    print()
    ColorPrint.print(cyan, '▶ Check sudo')

    # Is root?
    if os.geteuid() != 0:
        print('You need root privileges to run this script.')
        print('Please try again using "sudo"')
        sys.exit(1)
    else:
        print('Running as root user, continue.')


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
        if (int(majorVersion) < 16):
            answer = query_yes_no(
                'Would you still like to try installing Node.js v16.x (LTS)?', default='yes')
            installed = not answer

    # Install
    if not installed:
        # https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions
        subprocess.run(
            'curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo bash -', shell=True)
        subprocess.run('sudo apt-get install -y nodejs', shell=True)

        # npm might not be installed alongside Node.js
        # see: https://github.com/nodejs/help/issues/554#issuecomment-290041018
        subprocess.run('sudo apt-get install npm', shell=True)


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
    ColorPrint.print(cyan, '▶ Install Node.js dependencies for backend')

    subprocess.call('npm install', shell=True, cwd='./backend')


def build_server():
    print()
    ColorPrint.print(cyan, '▶ Build Node.js server (typescript)')

    print('This might take some time...')
    subprocess.call('npm run build', shell=True, cwd='./backend')


def install_frontend():
    print()
    ColorPrint.print(cyan, '▶ Install frontend dependencies')

    subprocess.call('npm install', shell=True, cwd='./frontend')


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

    print('We will now register the Node.js app as a Linux service and configure')
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

    final_msg = (
        'Awesome, we are done here. Grab your phone and look for the\n'
        '"Captive Circle" WiFi. As gamemaster, you want to type in this URL\n'
        'in your browser: captive.circle/admin\n'
        '(Note that you will get a better experience if you use a "real" browser\n'
        'instead of the built-in one when accessing the captive portal.)\n'
        '\n'
        'When you reboot the Raspi, wait 2 minutes, then the WiFi network\n'
        'and the server should be up and running again automatically.\n'
        '\n'
        'If you like this project, consider giving a GitHub star ⭐\n'
        'If there are any problems, checkout the troubleshooting section here:\n'
        'https://github.com/Splines/raspi-captive-circle or open a new issue\n'
        'on GitHub.'
    )
    ColorPrint.print(magenta, final_msg)


def all():
    print_header()
    check_super_user()

    install_node()
    setup_access_point()

    install_server_dependencies()
    build_server()
    install_frontend()
    setup_server_service()

    done()


all()

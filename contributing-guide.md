# Campus Roots Contributing Guide

Please be sure to read this guide thoroughly before contributing as it will lessen the chances of any issues arising during the process.

## Prerequisites

### Install WSL2 (if you're using Windows)

1. Open PowerShell in **administrator mode** by searching for it in your applications, right clicking the top option, and then selecting run as administrator. You might get a prompt asking if you want to allow Windows Powershell to make changes to your device: click yes.

2. Enter the following command:
    ```powershell
    wsl --install
    ```

3. After a few minutes you might be prompted to reboot your computer; do so.

4. You should see an open Powershell window, prompting you to enter a username and a password. Your username should be lowercase, but can otherwise be whatever suits you. You’ll also need to enter a new password.

> [!NOTE]
> When entering your password you might notice that you aren’t seeing any visual feedback. This is a standard security feature in Linux, and will also happen in all future cases where you need to enter a password. Just type your password and hit `Enter`.

5. Now close the terminal session.

6. Hereafter, just search for `WSL` or `Ubuntu` in the Windows search bar to open WSL2.

### Configure Visual Studio Code

1. Install VSCode, if you haven't already.

2. Install WSL extension.
    - Navigate to the extensions tab
    - Find and install the [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)

3. Ensure that WSL2 can correctly open VSCode.
    - Open a new WSL2 terminal.
    - Run the following command to open a new VSCode window.

      ```bash
      code
      ```
    - After a few moments a new VSCode window should open.
    - If a VSCode window opens, you've done things right.

4. Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

5. Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

6. Install [DotENV extension](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv).

7. Install [Prisma extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma).

### Install and configure Git

1. Open a WSL2 terminal, if you haven't already.
2. Run these commands in the terminal to update the Linux system.

    ```bash
    sudo apt update && sudo apt upgrade
    ```
3. You likely have git installed already, but to make sure that we have the most up to date version of git, run the following commands:

    ```bash
    sudo add-apt-repository ppa:git-core/ppa
    sudo apt update
    sudo apt install git
    ```
4. Make sure your Git version is **at least** 2.28 by running this command:

    ```bash
    git --version
    ```
5. Go to [GitHub.com](https://github.com/) and create an account if you haven't already.

6. Now, run the following commands to configure Git. Make sure to type your actual name and registered email address.

    ```bash
    git config --global user.name "Your Name"
    git config --global user.email "yourname@example.com"
    ```
7. Change the default branch for Git using this command:
    ```bash
    git config --global init.defaultBranch main
    ```
8. To verify that things are working properly, enter these commands and verify whether the output matches your name and email address.
    ```bash
    git config --get user.name
    git config --get user.email
    ```
9. GitHub uses SSH keys to allow you to upload to your repository without having to type in your username and password every time. First, we need to see if you have an Ed25519 algorithm SSH key already installed. Type this into the terminal and check the output with the information below:
    ```bash
    ls ~/.ssh/id_ed25519.pub
    ```
    If a message appears in the console containing the text “No such file or directory”, then you do not yet have an Ed25519 SSH key, and you will need to create one. If no such message has appeared in the console output, you can proceed to step 12.

10. To create a new SSH key, run the following command inside your terminal.
    ```bash
    ssh-keygen -t ed25519
    ```
    When it prompts you for a location to save the generated key, just push `Enter`.

11. Next, it will ask you for a password. This password is used to encrypt the private SSH key that is stored on your computer and you will be required to enter this password every time you use SSH with these keys. If you don’t use a password, the private key will be readable by anyone who has access to your computer and will be able to modify all your GitHub repositories. Enter one if you wish, but it’s not required. If you choose not to use a password, just hit `Enter` without typing anything.

12. Log into GitHub and click on your profile picture in the top right corner. Then, click on `Settings` in the drop-down menu.

13. Next, on the left-hand side, click `SSH and GPG keys`. Then, click the green button in the top right corner that says New SSH Key. Name your key something that is descriptive enough for you to remember what device this SSH key came from, for example `linux-ubuntu`. Leave this window open while you do the next steps.

14. Now run the following command in the WSL terminal:
    ```bash
    cat ~/.ssh/id_ed25519.pub
    ```
    Highlight and copy the entire output from the command. If you followed the instructions above, the output will likely begin with `ssh-ed25519` and end with your `username@hostname`.

15. Now, go back to GitHub in your browser window and paste the key you copied into the key field. Keep the key type as `Authentication Key` and then, click `Add SSH key`. You’re done! You’ve successfully added your SSH key!

### Install NVM (Node Version Manager)

1. Open a WSL2 terminal. To install `nvm` properly, you’ll need `curl`. Run the command below to install `curl`.

    ```bash
    sudo apt install curl
    ```
2. Run this command to install `nvm`:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    ```
3. Initialize `nvm`.
    ```bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    ```
4. You can verify nvm is installed by running the command:
    ```bash
    command -v nvm
    ```
    If this returns `nvm: command not found`, close the terminal and re-open it.

### Install Node

1. Ensure that you've installed `nvm`.
2. Now that we have `nvm` installed, we can install Node. Run:

    ```bash
    nvm install --lts
    ```

3. After the installation is finished, run:
    ```bash
    nvm use --lts
    ```

## Setting up a Local Clone

Before you begin working on anything, make sure you follow these steps in order to set up a clone on your local machine:

1. Fork the repo you would like to work on to your own GitHub account. If you don't know how to do so, follow the GitHub documentation on how to [fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

2. Clone the forked repo to your local machine with the command below. Be sure the `<your username>` text is replaced with your actual GitHub username. You can also read the GitHub documentation on [cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

    ```bash
    git clone git@github.com:<your username>/campus-roots.git
    ```

3. `cd` into the directory of your local clone.

    ```bash
    cd campus-roots
    ```
4. Set the upstream remote so you can keep your local clone synced with the original repo. The `<repo name>` below should be the same as the one you used when creating your local clone in the previous step.

    ```bash
    git remote add upstream git@github.com:Dev-OSAbhi/campus-roots.git
    ```
5. Install all the required dependencies:
    ```bash
    npm install
    ```
6. To run the development server:
    ```bash
    npm run dev
    ```

## Working on an Issue or a Feature

Once you have the repo forked and cloned, and the upstream remote has been set, you can begin working on your issue/feature:

1. Create a new branch, replacing the `<your branch name>` with an actual branch name that briefly explains the purpose of the branch in some way:

    ```bash
    git checkout -b <your branch name>
    ```

2. Add commits as you work on your issue, replacing the `<your commit message>` text with your actual commit message:

   ```bash
   git commit -m "<your commit message>"
   ```

3. When you're done working on a feature, checkout to the `main` branch:
    ```bash
    git checkout main
    ```
    Odds are that someone has made changes to the upstream repository in the meantime. That means that your `main` branch is probably out of date. Fetch and merge the most updated copy using:
    ```bash
    git pull upstream main
    ```
    Now that your main branch is up-to-date with upstream, you need to merge it into your feature branch.
    ```bash
    git checkout <your branch name>
    git merge main
    ```

4. You may have merge conflicts. Resolve those before proceeding. If you're unsure about what to do at this point or which changes to keep, take advice from the team.

5. Now if everything works well, push your branch to your forked repo, replacing the `<your branch name>` with the branch you've been working on locally:

    ```bash
    git checkout main
    git push origin <your branch name>
    ```

## Opening a Pull Request

1. After pushing your changes, go to your forked repo on GitHub and click the `Compare & pull request` button. If you have multiples of this button, be sure you click the one for the correct branch.
   * If you don't see this button, you can click the branch dropdown menu and then select the branch you just pushed from your local clone:

      ![GitHub branch dropdown menu](https://user-images.githubusercontent.com/70952936/150646139-bc080c64-db57-4776-8db1-6525b7b47be2.jpg)

   * Once you have switched to the correct branch on GitHub, click the `Contribute` dropdown and then click the `Open pull request` button.

2. Now sit back and relax.

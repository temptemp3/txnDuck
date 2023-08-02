<h1>
    <div style="font-size:1.7em">txn<span style="color:#0ebd9d">Duck</span> 🦆</div>
    Transaction Builder UI
</h1>

![Algorand badge](https://img.shields.io/badge/Algorand-006883?style=for-the-badge&logo=Algorand)&nbsp;
![Next.js badge](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)&nbsp;
![Tailwindcss badge](https://img.shields.io/badge/Tailwindcss-0ea5e9?style=for-the-badge&logo=tailwindcss&logoColor=white)&nbsp;
![License MIT badge](https://img.shields.io/github/license/No-Cash-7970/txnDuck?style=for-the-badge&color=8e5548)

A free and open source web-based tool that serves as a graphical user interface
(GUI) for easily creating and sending Algorand transactions without the need for
software development knowledge.

<!-- omit in toc -->
## :compass: Table of contents

- [:globe\_with\_meridians: Websites](#globe_with_meridians-websites)
- [:sparkles: Features](#sparkles-features)
- [:speech\_balloon: Supported languages](#speech_balloon-supported-languages)
- [:computer: Setting up and running locally](#computer-setting-up-and-running-locally)
  - [Requirements for local setup](#requirements-for-local-setup)
  - [Installing the local setup](#installing-the-local-setup)
  - [Uninstalling and removing local setup](#uninstalling-and-removing-local-setup)
- [:hammer\_and\_wrench: Installing for development](#hammer_and_wrench-installing-for-development)
- [:handshake: Contributing](#handshake-contributing)
- [:trophy: Acknowledgments](#trophy-acknowledgments)

## :globe_with_meridians: Websites

You can use txn<span style="color:#0ebd9d">Duck</span> for free (excluding any
Algorand network fees) at the following websites:

**Production:** <https://txnduck.vercel.app>  
Preview: <https://txnduck-preview.vercel.app>

The Production website hosts the latest stable release (the `stable` branch)
where are all of the features are considered complete and stable. On the other
hand, the Preview website usually hosts the unstable version (the `main` branch)
with the latest developments, so it may have incomplete and/or unstable features
that have yet to be released. There may be times when both websites are the
same.

## :sparkles: Features

- FUTURE: Specify custom algod node
- FUTURE: Export to a signed or unsigned transaction file that is compatible
  with Algorand's `goal` tool
- FUTURE: Import a transaction file
- FUTURE: Build transaction groups (atomic transactions)

## :speech_balloon: Supported languages

The <abbr title="user interface">UI</abbr> for txnDuck has multiple supported
languages. However, not all of the languages have the same amount of support.
The translations for some of the supported languages may be incomplete or
contain errors due to being a machine translation.

If you want to help by adding or fixing a translation, read about how you can do
so [in the Contributing Guidelines](.github/CONTRIBUTING.md#submitting-translations).

Language | Completeness | Machine translated?
---------|--------------|---------------------
English  | Full         | No
Spanish  | Full         | *Yes*

## :computer: Setting up and running locally

**:warning: This is not for development. To set up and run txnDuck for development,
follow the instructions for
[installing txnDuck for development](#hammer_and_wrench-installing-for-development).**

Instead of using one of the [official txnDuck websites](#globe_with_meridians-websites),
you can choose to download the source code and run a of the software "locally"
on your own computer that does not rely on an external website.

### Requirements for local setup

- Access to your machine's command line interface (CLI), such as Terminal,
  PowerShell or Command Prompt
- [Node.js](https://nodejs.org/en) version 18.0.0 or higher installed
- [Yarn](https://yarnpkg.com/getting-started/install) package manager installed

### Installing the local setup

1. Download the source code.
    - Production (`stable` branch):
      <https://github.com/No-Cash-7970/txnDuck/archive/refs/heads/stable.zip>
    - Preview (`main` branch):
      <https://github.com/No-Cash-7970/txnDuck/archive/refs/heads/main.zip>
2. Unzip the downloaded source code. You should now have a new folder that
   contains a bunch of files and folder, which include "public" and "yarn.lock".
3. Open the <abbr title="Command Line Interface">CLI</abbr> and go to the folder
   created in step #2 by running the following in the CLI. Of course, replace
   `PATH/TO/SOURCE_CODE/FOLDER` with the actual path to the folder.

    ```bash
    cd PATH/TO/SOURCE_CODE/FOLDER
    ```

4. Install and build the source code dependencies.

    ```bash
    yarn install --prod && yarn build
    ```

5. Run the web server.

    ```bash
    yarn start
    ```

6. Open a web browser and go to <http://localhost:3000> to start using your
   local txnDuck! :tada: The web server must be running in the
   <abbr title="Command Line Interface">CLI</abbr> to use your local txnDuck.
7. (Optional) If you are finished using your local txnDuck, stop the web server
   by closing the <abbr title="Command Line Interface">CLI</abbr> window or by
   pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> (or <kbd>Cmd</kbd>+<kbd>C</kbd> on Mac)
   while in the <abbr title="Command Line Interface">CLI</abbr>. You can restart
   the web server by following Steps #5 and #6.

### Uninstalling and removing local setup

1. Make sure the web server is not running. Stop the server if it is. Refer to
   step #7 in the ["Installing local setup" instructions](#installing-the-local-setup).
2. Delete the source code folder.

## :hammer_and_wrench: Installing for development

Refer to the [installation instructions in the Developers
Documentation](docs/DEVELOPERS.md#installing-the-development-environment).

## :handshake: Contributing

Contributions are highly welcomed and appreciated. Every little bit of help
counts, so do not hesitate! Please read the [Contributing Guidelines](.github/CONTRIBUTING.md)
to learn how to contribute to this project.

## :trophy: Acknowledgments

- [SilentRhetoric](https://github.com/SilentRhetoric) - Proposed the idea of a
  transaction builder for Algorand
- [Wes](https://github.com/WesleyMiller1998) - Recommended the name "txnDuck"

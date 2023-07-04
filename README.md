# LoL Power Ranking

[![](https://img.shields.io/security-headers?style=flat-square&url=https%3A%2F%2Flol-power-ranking.app%2F)](https://shields.io/)
[![](https://img.shields.io/github/deployments/arnaudmanaranche/lol-power-ranking/production?label=Vercel&style=flat-square)](https://shields.io/)

## Wiki

### [Documentation](https://github.com/arnaudmanaranche/lol-power-ranking/wiki/Documentation)

## How to run

Would you like to contribute? Awesome! 👏

    $ git clone git@github.com:your-github-username/lol-power-ranking

Install dependencies

    $ cd lol-power-ranking
    $ yarn install

Copy example env files without the .example extension

    $ cp apps/power-rankings/.env.example apps/power-rankings/.env
    $ cp packages/data-management/.env.example packages/data-management/.env

Use the Node version needed with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

    $ nvm use

Start the webapp and the storybook project by running the following command

    $ yarn dev

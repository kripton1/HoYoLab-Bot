# HoYoLab-Bot
Daily Check-In bot for HoYoLab Genshin Imapct
 

# Instalation

 1. Install [NodeJS version from 16.10](https://nodejs.org/en/download)
 2. Download [latest release](https://github.com/kripton1/HoYoLab-Bot/releases/latest)
 3. Install requirements: `npm install`
 4. Run bot: `npm start`

# Configuration
| Name | Required | Description |
| -- | -- | -- |
| `COOKIE` | **true** | Cookie for authorisation. Maybe get from [Daily Check-In page](https://act.hoyolab.com/ys/event/signin-sea-v3/index.html?act_id=e202102251931481)<br><br>Once you opened Check-In page open Developer Tools -> Network, then reload current page, wait few seconds till every request will be executed, paste in Filter search: `https://sg-hk4e-api.hoyolab.com/event/sol/info`, click on request it found, scroll down to **Request Headers** section there you will find **Cookie** key and right from it will be value, copy it all and paste into this configuration.|

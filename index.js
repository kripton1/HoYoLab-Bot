const axios = require('axios');
const qs = require('qs');
const CronJob = require('cron').CronJob;
const dotenv = require('dotenv');
dotenv.config();

const cookie = process.env.COOKIE || null;

// Создаем заголовки запроса
const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    'Referer': 'https://act.hoyolab.com/',
    'Cookie': cookie,
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// Функция для выполнения ежедневной проверки
async function dailyCheckIn() {
    try {
        const response = await axios.post(
            `https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us`,
            {
                act_id: "e202102251931481"
            },
            { headers }
        );

        console.log('--- dailyCheckIn', response.data);
    } catch (error) {
        console.error(error);
    }
}

// Функция для проверки выполнения ежедневной проверки
async function checkDailyCheckInStatus() {
    try {
        const response = await axios.get(
            'https://sg-hk4e-api.hoyolab.com/event/sol/info?lang=en-us&act_id=e202102251931481',
            { headers }
        );
        console.log('--- checkDailyCheckInStatus', response.data);

        const status = response.data.data.is_sign;
        return !status;
    } catch (error) {
        console.error(error);
    }
}

// Функция для проверки доступных дополнительных ежедневных проверок
async function checkResignDailyCheckInStatus() {
    try {
        const response = await axios.get(
            'https://sg-hk4e-api.hoyolab.com/event/sol/resign_info?act_id=e202102251931481&lang=en-us',
            { headers }
        );
        console.log('--- checkResignDailyCheckInStatus', response.data);

        const quality_cnt = response.data.data.quality_cnt;
        const resign_cnt_daily = response.data.data.resign_cnt_daily;

        return resign_cnt_daily === 0 && quality_cnt > 0;
    } catch (error) {
        console.error(error);
    }
}

// Функция для выполнения дополнительной ежедневной проверки
async function resignDailyCheckIn() {
    try {
        const response = await axios.post(
            'https://sg-hk4e-api.hoyolab.com/event/sol/resign?lang=en-us',
            qs.stringify({
                act_id: 'e202102251931481',
            }),
            { headers }
        );

        console.log('--- resignDailyCheckIn', response.data);
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    if (await checkDailyCheckInStatus()) {
        await dailyCheckIn();
    }
    if (await checkResignDailyCheckInStatus()) {
        await resignDailyCheckIn();
    }
}

new CronJob(
    '0 6 */1 * *',
    main,
    null,
    true,
    'Europe/Kiev'
);

const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU9iRnJiTlhlK0c4OURVUk1MSHUzd2xSQWFlMzdOUWNqSGdoZTJKZTZHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY3pnNDQrRWFVL0VFb2pPSE9NRjFNMXNZcUJSUGNaSlNDRWR0Zld6VjVFMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZTGlwaXVsWTR4NWc1S0UvR1o3TjVFcDZGL1lsNUh1Q0tyNUpYREtndzNnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoSVNOZHpTeG0zZXV5aUYrN3o2K3ViZFZ6blhEMU8wenpQWjV1a3Z4TG1jPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVKekdoUzcrMlppbWFPeThNMjA0cUEraHlWWVEwTzRkWEZySDVHYzN6MDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNHSkZhZWFmU05BWGIySE5jWk5zQ2x1dzlJQ2QyQkNHZWM5VWxVVGp1eEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK00rNWhGSWx3cndpRUFEU2VwMUlmaEpvZmZTM3BvRTBlV1V6aUg4MTJGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2dSSXhFblJQYUl3S0JobWhsZGdEdWRZRUR3bEdhSVlsc3hSZjhSRndsbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYvaHVvbStMdHRJVWNtWU1lM1ZQaFRyaU5BaDQxRlZmYWRzcldnU3RZM1g3ZFc4U2d5YzRaY1BvMTZEOStsSndONm85SExidXlya29sN0ZHeWF1eWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzMsImFkdlNlY3JldEtleSI6InlsVGw0SjBlVWVjZmV6eGs2MmJQRkZ4MVFtb1ZCaWhIQ2ZqWmVJZlZwWUU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjBwTXdhODh1VDR1RmUwTGhRWTVuR0EiLCJwaG9uZUlkIjoiOGYwZTczODctZDlmOS00NTc0LTk4NTgtM2MxZjYyZWMwZTk1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRtS05HUGtIM3Rna3B2bVFwdmJQbGdUNE5xWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxbEl2emhqVEc0OG5Qdy91SU5HbUtsYVVJQkk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRDczSjIzRzciLCJtZSI6eyJpZCI6IjIzNDkwMzM3Njk3Mjc6MTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ29hY2ggSm9zZXBoIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQaVYwSklFRVByNGdMVUdHQWtnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJocWREQkNPRm81cWVmSHdyQmhVcGc5K2VidnNUb25JYXdQY0lkcWFQdGlNPSIsImFjY291bnRTaWduYXR1cmUiOiJ6Mm94dVEvVmVSaTlKOU9RSUU3ZGNxTGJvOE1FRHJaWWdQdEs1bnNMdkFnOXBwN1ZPaVNmN2RKVzd1dTlaRDJKOHJJaXpCMk9sR0pncm1ZY2JSWThCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSzZaN1JtZm84UktmUCtuNzBmTlljNGNKbnNDMXk4Q1d5M0xvNnk3S1AwTGlxOUZOQkh1SVpSSStlNjRLdTlQM3NtTXk3VnpKUkhubGVKZzFrV1JhalE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDMzNzY5NzI3OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQllhblF3UWpoYU9hbm54OEt3WVZLWVBmbm03N0U2SnlHc0QzQ0hhbWo3WWoifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE3NzcyODcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR2NmIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Cod3Uchiha",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728842688",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

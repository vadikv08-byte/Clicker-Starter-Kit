const { Bot, webhookCallback } = require("grammy");

// Твой токен нового бота
const bot = new Bot("8382077398:AAGy-ftFiO_t3_s0RslBbB5bcLSINftCFmo");

bot.command("start", (ctx) => 
  ctx.reply("Здравствуйте! Я — Хранитель памяти. Нажмите кнопку меню, чтобы открыть ваш личный архив.")
);

// Это специальный формат для работы внутри Vercel
module.exports = webhookCallback(bot, "nextjs");

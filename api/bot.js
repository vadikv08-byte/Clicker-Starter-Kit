const { Bot, webhookCallback } = require("grammy");

// Токен твоего бота Store_Memory_bot
const bot = new Bot("8382077398:AAGy-ftFiO_t3_s0RslBbB5bcLSINftCFmo");

bot.command("start", (ctx) => 
  ctx.reply("Здравствуйте! Я — Хранитель памяти. Нажмите кнопку меню, чтобы открыть ваш личный архив.")
);

// Экспорт для Vercel
module.exports = webhookCallback(bot, "nextjs");

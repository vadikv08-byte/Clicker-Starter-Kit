const { Bot, webhookCallback } = require("grammy");

const bot = new Bot("8382077398:AAGy-ftFiO_t3_s0RslBbB5bcLSINftCFmo");

bot.command("start", (ctx) => 
  ctx.reply("Здравствуйте! Я — Хранитель памяти. Нажмите кнопку внизу, чтобы открыть архив.")
);

module.exports = webhookCallback(bot, "nextjs");

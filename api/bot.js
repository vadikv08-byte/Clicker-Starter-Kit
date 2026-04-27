const { Bot } = require("grammy");

// Твой токен, который ты получил от BotFather
const bot = new Bot("8382077398:AAGy-ftFiO_t3_s0RslBbB5bcLSINftCFmo");

bot.command("start", (ctx) => 
  ctx.reply("Здравствуйте! Я — Хранитель памяти. Нажмите кнопку ниже, чтобы открыть ваш личный архив.")
);

export default async function handler(request, response) {
  try {
    if (request.method === "POST") {
      await bot.handleUpdate(request.body);
    }
    response.status(200).send("OK");
  } catch (e) {
    response.status(500).send("Error");
  }
}

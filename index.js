import { TravestyClient } from 'travesty-userapi-test';
import fs from 'fs';

const client = new TravestyClient('https://api.travesty.chat', { debug: true });

//let triggers = JSON.parse(fs.readFileSync('./triggers.json', 'utf8'));
//let blacklist = JSON.parse(fs.readFileSync('./blacklist.json', 'utf8'));

await client.login(`${process.env.USER_EMAIL}`, `${process.env.USER_PASSWORD}`);

client.on('messageCreate', (msg) => {
  console.log(`New message in channel ${msg.channelId}: ${msg.text}`);
  console.log(`Message:`, msg)

  /*if (blacklist.users.includes(msg.user.id)) {
    console.log(`[BLOCKED] Message from blacklisted user ${msg.user.username}`);
    return;
  }*/

  if (msg.text === 'ping') {
    client.sendMessage(msg.channelId, 'pong');
  }

  if (msg.text.startsWith('echo ')) {
    client.sendMessage(msg.channelId, msg.text.slice(5));
  }

  if (msg.text === 'help') {
    client.sendMessage(msg.channelId, 'I\'m Created by BestLawEnforcement. This account is used for the bot and it\'s also used by BestLawEnforcement himself. Available commands: ping, echo <text>, help');
  }

  if (msg.text.startsWith('b!join-my-guild') && msg.channelId === '1964483715044216832') {
    const inviteMatch = msg.text.match(/https:\/\/alpha\.travesty\.chat\/(\w+)/);
    if (inviteMatch) {
      const inviteCode = inviteMatch[1];
      console.log(`Detected invite code: ${inviteCode} from message ${msg.id}`);
      client.joinServer(inviteCode);
    }
  }

  /*if (triggers.enabled) {
    const lowerMsg = msg.text.toLowerCase();
    for (const key of Object.keys(triggers.triggers)) {
      if (lowerMsg.includes(key.toLowerCase())) {
        client.sendMessage(msg.channelId, triggers.triggers[key]);
        break;
      }
    }
  }*/
});


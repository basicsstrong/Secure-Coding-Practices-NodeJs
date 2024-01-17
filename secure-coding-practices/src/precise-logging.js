import { DateTime } from 'luxon';
import fs from 'fs';


export function trigger(){
    const sender = "user123";
    const recipient = "user456";
    const amount = 100.0;
    transferFunds(sender, recipient, amount);
}

function writeLog(logMessage) {
  const timestamp = DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss");
  const logEntry = `[${timestamp}] ${logMessage}\n`
  fs.appendFile('application.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing log:', err);
    }
  });
}

function transferFunds(sender, recipient, amount) {
  // Perform the funds transfer
  // ...

  const logMessage = {
    action: "transfer",
    sender: sender,
    recipient: recipient,
    amount: amount
  };
  writeLog(JSON.stringify(logMessage));
}



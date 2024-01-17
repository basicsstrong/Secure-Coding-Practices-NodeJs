import readline from 'readline';
import crypto from 'crypto';

export function trigger() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter your username: ', (username) => {
    rl.question('Enter your password: ', (password) => {
      rl.close();
      if (username && password && authenticateUser(username, password)) {
        console.log('Authentication successful!');
      } else {
        console.log('Authentication failed!');
      }
    });
  });
}

function authenticateUser(username, password) {
  const passwordFromDatabase = getHashedPasswordFromDatabase(username);
    const salt =  generateSalt();
    const saltedPassword = password + salt;
    const hashedPassword = hashPassword(saltedPassword);
  return passwordFromDatabase === hashedPassword;
}

function hashPassword(saltedPassword){
    const hashedBytes = crypto.createHash('sha256').update(saltedPassword, 'utf8').digest();
   const hashedPassword = Buffer.from(hashedBytes).toString('hex');
   console.log(`password: ${hashedPassword}`);
   return hashedPassword;
}

function getHashedPasswordFromDatabase(username) {
    console.log(`Getting password from DB for ${username}`);
    return '94ab2eedd86300e5e92c9b35bbfd5e52dc49902f5e3ab3ff44792fd296e90120';
  }

function generateSalt(){
    return "somerandonsaltvalue";
}


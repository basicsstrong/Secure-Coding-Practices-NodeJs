import PG from 'pg';
import readline from 'readline';

export function trigger() {
  prompt('Enter the email: ')
    .then((email) => {
      return loginUser(email);
    })
    .then((user_data) => {
      console.log(user_data);
    })
    .catch((error) => {
      console.error('Error during login:', error);
    });
}

function loginUser(email) {
  const query = 'SELECT * FROM users WHERE email = $1;';
  const Pool = PG.Pool;
  const pool = new Pool({
    user: 'admin',
    password: 'admin',
    host: 'localhost',
    database: 'secure_coding',
  });

  return new Promise((resolve, reject) => {
    pool.connect((error, client, done) => {
      if (error) {
        console.error('Error connecting to the database:', error);
        reject(error);
        return;
      }

      client.query(query, [email], (error, result) => {
        done(); // Release the client back to the pool

        if (error) {
          console.error('Error executing the query:', error);
          reject(error);
        } else {
          const user_data = result.rows[0];
          resolve(user_data);
        }
      });
    });
  });
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}


/*
-- Create User table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  age INTEGER
);

-- Insert five users
INSERT INTO users (name, email, age) VALUES
  ('John Doe', 'john.doe@example.com', 25),
  ('Jane Smith', 'jane.smith@example.com', 30),
  ('Michael Johnson', 'michael.johnson@example.com', 35),
  ('Emily Davis', 'emily.davis@example.com', 28),
  ('David Wilson', 'david.wilson@example.com', 32);
  
  */


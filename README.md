# Remind Me Later API

This is a Node.js Express API for the Remind Me Later app. It provides an endpoint to save reminders with a date, time, message, and reminder method (SMS or Email) to a MySQL database.

## Features

- POST /reminders endpoint to save reminders
- Stores reminders in a MySQL database
- Supports reminder methods: SMS and Email

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a MySQL database named `remind_me_later`.

3. Update the MySQL connection credentials in `server.js`:
   ```js
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'your_mysql_root_password', // Replace with your MySQL root password
     database: 'remind_me_later'
   });
   ```

4. Start the server:
   ```
   npm start
   ```

## API Usage

Send a POST request to `http://localhost:3000/reminders` with JSON body:

```json
{
  "date": "YYYY-MM-DD",
  "time": "HH:MM:SS",
  "message": "Your reminder message",
  "method": "SMS" | "Email"
}
```

Example:

```json
{
  "date": "2024-06-30",
  "time": "14:30:00",
  "message": "Meeting with team",
  "method": "Email"
}
```

## License

MIT

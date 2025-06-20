import app from './src/app.js';
import connectDB from './src/config/db.js';
import 'dotenv/config';

const port = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});

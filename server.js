import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;
const __DIRNAME = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__DIRNAME, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__DIRNAME, 'dist/index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${PORT}!`);
});

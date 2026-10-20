require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5006;

app.listen(PORT, () => {
  console.log(`[Server] Image Upload API listening on port ${PORT}`);
  console.log(`[Server] Static uploads served from /uploads`);
});

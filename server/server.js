const app = require('./app');
const port = process.env.PORT || 3000;

const { syncAndSeed } = require('./db');



syncAndSeed();

app.listen(port, () => {
  console.log(`listening on port... ${port}`);
});

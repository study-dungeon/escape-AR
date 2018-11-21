const app = require('./app');

const { syncAndSeed } = require('./db');

syncAndSeed();

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`listening on port... ${port}`)
})

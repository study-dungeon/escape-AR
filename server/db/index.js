const conn = require('./conn');

const Images = require('./Image');



const syncAndSeed = () => {

  return conn.sync({ force: true })
    .then(() => {
      return Promise.all([
        Images.create({ image: 'https://picsum.photos/400/500/?image=1' }),
        Images.create({ image: 'https://picsum.photos/400/500/?image=2' }),
        Images.create({ image: 'https://picsum.photos/400/500/?image=3' })
      ])
    })

  }



module.exports = {
  syncAndSeed,
  models: {
    Images
  }
}

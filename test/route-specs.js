const supertest = require('supertest');
const app = supertest(require('../server/app'));

const expect = require('chai').expect;


describe('Escape ARoom main game route', () => {

  it('can reach the home page', () => {
    return app
      .get('/')
      .expect(200)
      .expect(response => {
          expect(response.text).to.contain('Escape')
          expect(response.text).not.to.contain('Grace Shopper')
      })
  })

})


describe('Error Handling', () => {

  it('displays a 404 error page', () => {
    return app
      .get('/grace-shopper')
      .expect(404)
      .expect(response => {
        expect(response.text).to.contain('')
      })
  })

})

const supertest = require('supertest');
const app = supertest(require('../server/app'));

const expect = require('chai').expect;


describe('main game routes', () => {

  it('can reach the home page', () => {
    return app
      .get('/')
      .expect(404)
  })

  it('displays home page content', () => {
    return app
      .get('/')
      .expect(response => {
          expect(response.text).to.contain('Escape')
          expect(response.text).not.to.contain('Grace Shopper')
      })
  })

  it('displays a 404 error page', () => {
    return app
      .get('/grace-shopper')
      .expect(404)
      .expect(response => {
        expect(response.text).to.contain('Page Not Found') // browser tab title text
        expect(response.text).not.to.contain('Escape')
      })
  })

})

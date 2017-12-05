

process.env.NODE_ENV = 'test';
const knex = require(__dirname + '/../knex').knex;
const chai = require('chai')
const expect = chai.expect;
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const request= chai.request

const app = require(__dirname + '/../server/_server');
const port = 4000;

 
describe('the user ', ()=>{
  before((done)=>{
    this.server = app(port, console.log(`server up on ${port}`))
    done()
  })
  after((done)=>{
    this.server.close(()=>{
      console.log(`closing server`);
      done()
    })
  })

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
    knex.migrate.latest()
    .then(function() {
    return knex.seed.run()
    .then(function() {
      done();
    });
  });
});
});

afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
        done();
    });
});


  it('should get the user route', (done)=>{
    request('http://localhost:4000')
    .get('/api/users')
    .end((err, res)=>{
      console.log(res.body);
      console.log(res.status);
      if(err){
        console.log(err);
      };
      done()
    })
  })


  it('should post to the user db', (done)=>{
    request('http://localhost:4000')
    .post('/api/users')
    .send({name:'Testy McTestface', email_address: 'mctestface@mctestface.com'})
    .end((err, res)=>{
      expect(err).to.eql(null)
      expect(res.status).to.eql(200)
      done()
    })
  })

  it('should update the user db', (done)=>{
    request('http://localhost:4000')
    .put('/api/users/1')
    .send({name:'TestPut', email_address: 'testput@testput.com'})
    .end((err, res)=>{
      expect(err).to.eql(null)
      expect(res.status).to.eql(200)
      done()
    })
  })

  it('should delete from the user db', (done)=>{
    request('http://localhost:4000')
    .delete('/api/users/1')
    .end((err, res)=>{
      expect(err).to.eql(null)
      expect(res.status).to.eql(200)
      done()
    })

  })
})

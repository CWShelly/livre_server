

process.env.NODE_ENV = 'test';
const knex = require(__dirname + '/../knex').knex;
const chai = require('chai')
const expect = chai.expect;
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const request= chai.request

const app = require(__dirname + '/../server/_server');
const port = 4000;


describe('the book ', ()=>{
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


it('should get the book route', (done)=>{
  request('http://localhost:4000')
  .get('/api/books')
  .end((err, res)=>{
    console.log(res.body);
    console.log(res.status);
    if(err){
      console.log(err);
    };
    done()
  })
})

it('should post to the book db', (done)=>{
  request('http://localhost:4000')
  .post('/api/books')
  .send({user_id: 1, title:'Test Title ', author: 'Test Author 2', currentlyWith: 'Test me 2', ownerEmail:'test@test.com', available: 'True'})
  .end((err, res)=>{
    console.log(res.status);
    console.log(res.body);
    expect(err).to.eql(null)
    expect(res.status).to.eql(200)
    done()
  })
})


it('should update the book db', (done)=>{
  request('http://localhost:4000')
  .put('/api/books/1')
  .send({title: 'testPut title'})
  .end((err, res)=>{
    expect(err).to.eql(null)
    expect(res.status).to.eql(200)
    done()
  })
})

it('should delete from the books db', (done)=>{
  request('http://localhost:4000')
  .delete('/api/books/1')
  .end((err, res)=>{
    expect(err).to.eql(null)
    expect(res.status).to.eql(200)
    done()
  })

})

})

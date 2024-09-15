const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Replace with your Express app
const should = chai.should();
chai.use(chaiHttp);

let token; // JWT token

describe('Product API', () => {
  
  // Step 1: Authenticate user to get JWT token
  before((done) => {
    chai.request(server)
      .post('/api/auth/signin')
      .send({ email: 'user1@example.com', password: 'password123' }) // Replace with your user credentials
      .end((err, res) => {
        token = res.body.token; // Extract the token
        done();
      });
  });

  // Step 2: Test creating a product
  it('should create a new product', (done) => {
    chai.request(server)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'Test Description',
        category: 'Test Category',
        price: 29.99,
        stockQuantity: 10,
        image: 'http://example.com/image.jpg'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql('Test Product');
        done();
      });
  });

  // Step 3: Test fetching all products
  it('should get all products', (done) => {
    chai.request(server)
      .get('/api/products')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  // Step 4: Test unauthorized user updating a product
  it('should not allow unauthorized user to update a product', (done) => {
    chai.request(server)
      .put('/api/products/12345') // Use a valid product ID
      .set('Authorization', `Bearer wrongToken`)
      .send({ name: 'Updated Product' })
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  // Step 5: Test deleting a product by owner
  it('should delete a product by the creator', (done) => {
    chai.request(server)
      .delete('/api/products/12345') // Use a valid product ID
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

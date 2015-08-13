/**
 * <%= modelName %> API Tests
 *
 * Tests the connectivity & responses of 
 * Discovery API for the <%= modelName %> Object
 */

var request = require('supertest');
var expect  = require('chai').expect;

describe('<%= role %> @ <%= modelName %> API', function() {
  const USERNAME = '<%= role %>@<%= modelName %>.com';
  const PASSWORD = 'password1234';
  
  var sessionCookie;
  var createdModel;

  before(function(done) {
    User.register({
      email: USERNAME,
      password: PASSWORD
    }).then(function(){
      PermissionService.addUsersToRole(USERNAME, '<%= role %>')
      .then(function () {
        request(sails.hooks.http.app)
          .post('/auth/local')
          .send({
            identifier : USERNAME,
            password   : PASSWORD
          })
          .end(function(err, res){
            sessionCookie = res.headers['set-cookie'];
            done();
          });
      });
    }).catch(done);
  });

  
  it('should create a model', function(done) {
    request(sails.hooks.http.app)
      .post('/<%= modelName %>')
      .set('cookie', sessionCookie)
      .send({
          name : 'test'
      })
      .expect(201)
      .end(function(err, res) {
        expect(err).to.not.exist;
        createdModel = res.body;

        <%= modelName %>.findOne(res.body.id, function(err, result) {
          expect(err).to.not.exist;
          expect(result).to.exist;
          // result.name.should.equal('Test Name');
          done();
        });
      });
  });
  
  it('should find all models', function(done) {
    request(sails.hooks.http.app)
      .get('/<%= modelName %>')
      .set('cookie', sessionCookie)
      .expect(200)
      .end(function(err, res) {
        expect(err).to.not.exist;
        expect(res.body.length).to.be.above(0);
        done();
      });
  });
  
  it('should find a model', function(done) {
    request(sails.hooks.http.app)
      .get('/<%= modelName %>/'+createdModel.id)
      .set('cookie', sessionCookie)
      .expect(200)
      .end(function(err, res) {
        expect(err).to.not.exist;
        expect(res.body.id).to.equal(createdModel.id);
        done();
      });
  });
  
  it('should update a model', function(done) {
    var updates = {name: 'new'};
    request(sails.hooks.http.app)
      .put('/<%= modelName %>/'+createdModel.id)
      .set('cookie', sessionCookie)
      .send(updates)
      .expect(200)
      .end(function(err, res) {
        expect(err).to.not.exist;

        <%= modelName %>.findOne(createdModel.id, function(err, result) {
          expect(err).to.not.exist;
          expect(result).to.exist;
          expect(updates.name).to.equal(result.name);
          done();
        });
      });
  });
  
  it('should delete a model', function(done) {
    request(sails.hooks.http.app)
      .delete('/<%= modelName %>/'+createdModel.id)
      .set('cookie', sessionCookie)
      .expect(200)
      .end(function(err, res) {
        expect(err).to.not.exist;

        <%= modelName %>.findOne(createdModel.id, function(err, result) {
          expect(err).to.not.exist;
          expect(result).to.not.exist;
          done();
        });
      });
  });

});


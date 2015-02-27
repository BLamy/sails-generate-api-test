/**
 * <%= modelName %> API Tests
 *
 * Tests the connectivity & responses of 
 * Discovery API for the <%= modelName %> Object
 */

var request = require('supertest');
var should  = require('chai').should();

describe('<%= modelName %> API', function() {
  var sessionCookie;
  var createdModel;

  before(function(done) {
    request(sails.hooks.http.app)
      .post('/auth/local')
      .send({
        identifier : 'user1@account1.com',
        password   : "password1234"
      })
      .end(function(err, res){
        sessionCookie = res.headers['set-cookie'];
        done();
      });
  });

  
  it('should create a model', function(done) {
    request(sails.hooks.http.app)
      .post('/<%= pluralModelName %>')
      .set('cookie', sessionCookie)
      .send({
        <%= camelModelName %> : {
          // insert attributes
          // name : 'Test Name'
        }
      })
      .expect(201)
      .end(function(err, res) {
        var reply = res.body;
        createdModel = reply.<%= camelModelName %>
        should.not.exist(err);
        // reply.<%= camelModelName %>.name.should.equal('Test Name');

        <%= modelName %>.findOne(createdModel.id, function(err, result) {
          should.not.exist(err);
          should.exist(result);
          // result.name.should.equal('Test Name');
          done();
        });
      });
  });
  
  it('should find all models', function(done) {
    request(sails.hooks.http.app)
      .get('/<%= pluralModelName %>')
      .set('cookie', sessionCookie)
      .expect(200)
      .end(function(err, res) {
        var reply = res.body;
        should.not.exist(err);
        reply.<%= pluralCamel %>.length.should.be.above(0);
        done();
      });
  });
  
  it('should find a model', function(done) {
    request(sails.hooks.http.app)
      .get('/<%= pluralModelName %>/'+createdModel.id)
      .set('cookie', sessionCookie)
      .expect(200)
      .end(function(err, res) {
        var reply = res.body;
        should.not.exist(err);
        reply.<%= camelModelName %>.id.should.equal(createdModel.id);
        done();
      });
  });
  
  it('should update a model', function(done) {
    request(sails.hooks.http.app)
      .put('/<%= pluralModelName %>/'+createdModel.id)
      .set('cookie', sessionCookie)
      .send({
        <%= camelModelName %> : {
          // insert attribute(s)
          // name: 'NEW'
        }
      })
      .expect(200)
      .end(function(err, res) {
        var reply = res.body;
        should.not.exist(err);
        // reply.<%= camelModelName %>.name.should.equal('NEW');

        <%= modelName %>.findOne(createdModel.id, function(err, result) {
          should.not.exist(err);
          should.exist(result);
          // result.name.should.equal('NEW');
          done();
        });
      });
  });
  
  it('should delete a model', function(done) {
    request(sails.hooks.http.app)
      .delete('/<%= pluralModelName %>/'+createdModel.id)
      .set('cookie', sessionCookie)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        (res.body || {}).should.be.empty;

        <%= modelName %>.findOne(createdModel.id, function(err, result) {
          should.not.exist(err);
          should.not.exist(result);
          done();
        });
      });
  });

});


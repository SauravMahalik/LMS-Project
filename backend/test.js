var assert = require('chai').assert;
var app = require('./index');
var app = require('./routes/users');
var app = require('./routes/course');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

console.log("inside test")
describe('get methods', function(){

    
    it('GET /quiz',function(){
        agent.get('/quiz/5ca802e712e6bf7f739000ac')

            .then(function(res){
                expect(res.body.count).to.equal(1);
            });
    });

    it('GET /assn',function(){
        agent.get('/assn/5cafea6f2986366e9d6da9a9')

            .then(function(res){
                expect(res.body.count).to.equal(1);
            });
    });
})

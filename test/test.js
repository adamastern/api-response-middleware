var sinon = require('sinon');

describe('apiMiddleware', function(){
	it('Should export a function', function(){
		var apiMiddleware = require('../index');
		apiMiddleware.should.be.instanceof(Function);
	});
	it('Should export a function that returns a function', function(){
		var apiMiddleware = require('../index');
		var returned = apiMiddleware();
		returned.should.be.instanceof(Function);
	});
	it('Should attach middleware functions to \'res\' object', function(done){
		var res = {
			status:function(){},
			json:function(){}
		};
		var next = function(){};
		require('../index')()(null, res, next);
		res.should.have.ownProperty('apiError');
		res.should.have.ownProperty('apiNotFound');
		res.should.have.ownProperty('apiResponse');
		done();
	});
	it('should call #next after attaching middleware', function(done){
		var res = {};
		var next = sinon.spy();
		require('../index')()(null, res, next);
		next.calledOnce.should.be.true();
		done();
	});
	describe('#apiResponse', function(){
		var data = {
			name:"Adam"
		};
		var json = sinon.spy();
		var status = sinon.spy();
		var res = {
			status:status,
			json:json
		};
		var next = function(){};
		require('../index')()(null, res, next);
		it('should call #res.json with correct JSON data', function(){
			res.apiResponse(data);
			json.calledWith({
				status:"success",
				payload:data
			}).should.be.ok()
		});
		it('should call #res.status with status code 200', function(){
			res.apiResponse(data);
			status.calledWith(200).should.be.ok()
		});
	});
});
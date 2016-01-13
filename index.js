module.exports = function(opts){
	if(!opts){
		opts = {};
	}
	
	var failCodes = opts.failCodes;
	if(!failCodes || !(failCodes instanceof Array)){
		failCodes = [
			400,
			401,
			403,
			404
		];
	}

	return function(req,res,next){
		res.apiResponse = function(response){
			res.status(200);
			res.json({
				status:"success",
				payload:response
			})
		};

		res.apiError = function(err, msg, code, forceFail){
			if(!msg){
				if(err && err.message){
					msg = err.message;
				}else{
					msg = "An unknown error occurred";
				}
			}

			if(!code){
				code = 500;
			}

			var failed = forceFail || failCodes.indexOf(code) >= 0;
			var status = failed ? "fail" : "error";

			res.status(code);
			res.json({
				status:status,
				message: msg
			});
		};

		res.apiNotFound = function(err, msg){
			if(!msg){
				if(err && err.message){
					msg = err.message;
				}else{
					msg = "The resource could not be found";
				}
			}
			res.apiError(err, msg, 404);
		};

		res.apiNotAllowed = function(err, msg){
			if(!msg){
				if(err && err.message){
					msg = err.message;
				}else{
					msg = "You are not authorized to access this resource";
				}
			}
			res.apiError(err, msg, 403);
		};

		next();
	}
};
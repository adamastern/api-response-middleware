
module.exports = function(opts){
	if(!opts){
		opts = {};
	}

	var failCodes = opts['failCodes'];
	if(!failCodes || !(failCodes instanceof Array)){
		failCodes = [
			400,
			401,
			403,
			404
		];
	}

	var statusCodeKey = opts['statusCodeKey'];
	if(!statusCodeKey || typeof statusCodeKey !== 'string'){
		statusCodeKey = "statusCode";
	}

	var errorProps = opts['errorProps'];
	if(!errorProps || errorProps === null || typeof errorProps !== 'object'){
		errorProps = {
			message: "An unknown error occurred"
		}
	}

	return function(req,res,next){

		res.apiResponse = function(response){
			res.status(200);
			res.json({
				status:"success",
				payload:response
			})
		};

		res.apiError = function(err){

			var response = {};

			var validErr = err instanceof Error;

			for(var key in errorProps) {
				if(validErr && err.hasOwnProperty(key)) {
					response[key] = err[key];
				}else if(errorProps.hasOwnProperty(key)) {
					response[key] = errorProps[key];
				}else{
					response[key] = null;
				}
			}

			var statusCode = 500;
			if(validErr && err.hasOwnProperty(statusCodeKey) && typeof err[statusCodeKey] === "number"){
				statusCode = err[statusCodeKey];
			}

			var failed = failCodes.indexOf(statusCode) >= 0;
			response.status = failed ? "fail" : "error";

			res.status(statusCode);
			res.json(response);

		};

		next();
	}
};
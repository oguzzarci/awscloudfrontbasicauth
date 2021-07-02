
exports.handler = async (event) => {

    let isAllowedAccess = false;
    const request = event.Records[0].cf.request;
    if (request && request.headers && request.headers.authorization){

        const basicAuthHeader = request.headers.authorization[0].value;
        const authString = 'Basic ' + new Buffer('test' + ':' + 'test').toString('base64');
        isAllowedAccess = (basicAuthHeader === authString);
    }

    if (!isAllowedAccess){
        const response = {
            status: 401,
            body: JSON.stringify('NO ACCESS'),
            headers: {'www-authenticate': [{key : 'WWW-authenticate', value: 'Basic'}]
            },
        };
        return response;
    }
    else {
        return request;
    }



};

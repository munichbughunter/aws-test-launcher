const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();
const { randomUUID } = require('crypto');

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.handler = async (event, context) => {

    const {package, class:classInput, method, stateMachine} = JSON.parse(event.body);

    const uuid = randomUUID()
    var params = {
        stateMachineArn: stateMachine,
        input: JSON.stringify({package, class:classInput, method}),
        name: uuid,
        traceHeader: ''
    };

    await stepfunctions.startExecution(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data); // successful response
    }).promise();

    response = {
        statusCode: 200,
        body: JSON.stringify(uuid),
    };
    
    return response;
};

import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as cognito from '@aws-cdk/aws-cognito';
interface ApplicationAPIProps {
    testService: lambda.IFunction;
    usersService: lambda.IFunction;
    userPool: cognito.IUserPool;
    userPoolClient: cognito.IUserPoolClient;
}
export declare class ApplicationAPI extends cdk.Construct {
    readonly httpApi: apigw.HttpApi;
    constructor(scope: cdk.Construct, id: string, props: ApplicationAPIProps);
}
export {};

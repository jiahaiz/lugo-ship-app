import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
import * as cognito from '@aws-cdk/aws-cognito';
import {CorsHttpMethod, HttpMethod} from '@aws-cdk/aws-apigatewayv2';
import {HttpUserPoolAuthorizer} from '@aws-cdk/aws-apigatewayv2-authorizers';
import * as apigi from '@aws-cdk/aws-apigatewayv2-integrations';
import * as iam from '@aws-cdk/aws-iam';
import * as sqs from '@aws-cdk/aws-sqs';

interface ApplicationAPIProps {
    testService: lambda.IFunction;
    // documentsService: lambda.IFunction;
    usersService: lambda.IFunction;
    userPool: cognito.IUserPool;
    userPoolClient: cognito.IUserPoolClient;
}

export class ApplicationAPI extends cdk.Construct {
    public readonly httpApi: apigw.HttpApi;

    constructor(scope: cdk.Construct, id: string, props: ApplicationAPIProps) {
        super(scope, id);

        const serviceMethods = [
            HttpMethod.GET,
            HttpMethod.POST,
            HttpMethod.DELETE,
            HttpMethod.PUT,
            HttpMethod.PATCH,
        ];

        // API Gateway ------------------------------------------------------

        this.httpApi = new apigw.HttpApi(this, 'HttpProxyApi', {
            apiName: 'serverless-api',
            createDefaultStage: true,
            corsPreflight: {
                allowHeaders: ['Authorization', 'Content-Type', '*'],
                allowMethods: [
                    CorsHttpMethod.GET,
                    CorsHttpMethod.POST,
                    CorsHttpMethod.DELETE,
                    CorsHttpMethod.PUT,
                    CorsHttpMethod.PATCH,
                ],
                allowOrigins: ['http://localhost:3000', 'https://*'],
                allowCredentials: true,
                maxAge: cdk.Duration.days(10),
            },
        });
        // Authorizer -------------------------------------------------------

        const authorizer = new HttpUserPoolAuthorizer({
            userPool: props.userPool,
            userPoolClient: props.userPoolClient,
        });

        // Test Service -------------------------------------------------

        const testServiceIntegration = new apigi.LambdaProxyIntegration({
            handler: props.testService,
        });

        this.httpApi.addRoutes({
            path: `/test/{proxy+}`,
            methods: serviceMethods,
            integration: testServiceIntegration,
            authorizer,
        });


        // Users Service ------------------------------------------------------

        const usersServiceIntegration = new apigi.LambdaProxyIntegration({
            handler: props.usersService,
        });

        this.httpApi.addRoutes({
            path: `/users/{proxy+}`,
            methods: serviceMethods,
            integration: usersServiceIntegration,
            authorizer,
        });

        // Outputs -----------------------------------------------------------

        new cdk.CfnOutput(this, 'URL', {
            value: this.httpApi.apiEndpoint
        });
    }


}
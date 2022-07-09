import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as cognito from '@aws-cdk/aws-cognito';
import * as apigw from '@aws-cdk/aws-apigatewayv2';
interface WebAppProps {
    hostingBucket: s3.IBucket;
    relativeWebAppPath: string;
    baseDirectory: string;
    httpApi: apigw.IHttpApi;
    userPool: cognito.IUserPool;
    userPoolClient: cognito.IUserPoolClient;
}
export declare class WebApp extends cdk.Construct {
    readonly webDistribution: cloudfront.CloudFrontWebDistribution;
    constructor(scope: cdk.Construct, id: string, props: WebAppProps);
}
export {};

import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
export declare class ApplicationAuth extends cdk.Construct {
    readonly userPool: cognito.IUserPool;
    readonly userPoolClient: cognito.IUserPoolClient;
    constructor(scope: cdk.Construct, id: string);
}

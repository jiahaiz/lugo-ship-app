import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cognito from '@aws-cdk/aws-cognito';
interface AppServicesProps {
    documentsTable: dynamodb.ITable;
    assetBucket: s3.IBucket;
    userPool: cognito.IUserPool;
}
export declare class AppServices extends cdk.Construct {
    readonly testService: PythonFunction;
    readonly usersService: NodejsFunction;
    constructor(scope: cdk.Construct, id: string, props: AppServicesProps);
}
export {};

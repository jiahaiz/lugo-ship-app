import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
export declare class AppDatabase extends cdk.Construct {
    readonly testTable: dynamodb.ITable;
    constructor(scope: cdk.Construct, id: string);
}

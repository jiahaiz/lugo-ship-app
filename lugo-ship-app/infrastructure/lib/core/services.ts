import * as cdk from '@aws-cdk/core';
import * as path from 'path';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import * as iam from '@aws-cdk/aws-iam';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import * as s3 from '@aws-cdk/aws-s3';
import * as cognito from '@aws-cdk/aws-cognito';
import { NodejsServiceFunction } from "../construcuts/nodejs-lambda";
import { ServiceFunction } from "../construcuts/lambda";

interface AppServicesProps {
    documentsTable: dynamodb.ITable;
    // uploadBucket: s3.IBucket;
    assetBucket: s3.IBucket;
    userPool: cognito.IUserPool;
}
export class AppServices extends cdk.Construct {
    public readonly testService: PythonFunction;

    public readonly usersService: NodejsFunction;

    constructor(scope: cdk.Construct, id: string, props: AppServicesProps) {
        super(scope, id);
        this.testService = new ServiceFunction(this, 'TestServiceLambda', {
            entry: path.join(__dirname, '../../../python-services'),
            index: 'handler.py'
        });

        props.documentsTable.grantReadWriteData(this.testService);

        this.testService.addToRolePolicy(
            new iam.PolicyStatement({
                resources: ['*'],
                actions: ['events:PutEvents'],
            }),
        );

        this.testService.addEnvironment('DYNAMO_DB_TABLE', props.documentsTable.tableName);

        // Users Service ------------------------------------------------------

        this.usersService = new NodejsServiceFunction(this, 'UsersServiceLambda', {
            entry: path.join(__dirname, '../../../services/users/index.js'),
        });

        this.usersService.addEnvironment('USER_POOL_ID', props.userPool.userPoolId);
        this.usersService.addEnvironment('ASSET_BUCKET', props.assetBucket.bucketName);
        props.assetBucket.grantReadWrite(this.usersService);

        this.usersService.addToRolePolicy(
            new iam.PolicyStatement({
                resources: [props.userPool.userPoolArn],
                actions: ['cognito-idp:*'],
            }),
        );
    }
}

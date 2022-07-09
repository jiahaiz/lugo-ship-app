import * as cdk from '@aws-cdk/core';
import {AssetStorage} from "./storage";
import {WebApp} from "./webapp";
import {AppDatabase} from "./dynamodb";
import {AppServices} from "./services";
import {ApplicationTargetGroup} from "@aws-cdk/aws-elasticloadbalancingv2";
import {ApplicationAPI} from "./api";
import {ApplicationAuth} from "./auth";

export class ApplicationStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const auth = new ApplicationAuth(this, 'Auth');

        const storage = new AssetStorage(this, "Storage");

        const database = new AppDatabase(this, 'Database');

        const services = new AppServices(this, 'Services', {
            documentsTable:  database.testTable,
            assetBucket: storage.assetBucket,
            userPool: auth.userPool,
        })

        const api = new ApplicationAPI(this,'API',{
            testService: services.testService,
            usersService: services.usersService,
            userPool: auth.userPool,
            userPoolClient: auth.userPoolClient,
        })

        const webapp = new WebApp(this, "WebApp", {
            hostingBucket: storage.hostingBucket,
            baseDirectory: '../',
            relativeWebAppPath: 'webapp',
            httpApi: api.httpApi,
            userPool: auth.userPool,
            userPoolClient: auth.userPoolClient,
        })
        webapp.node.addDependency(auth);
    }
}

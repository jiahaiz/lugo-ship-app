import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
export declare class AssetStorage extends cdk.Construct {
    readonly hostingBucket: s3.IBucket;
    readonly assetBucket: s3.IBucket;
    constructor(scope: cdk.Construct, id: string);
}

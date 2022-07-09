import * as cdk from '@aws-cdk/core';
import { NodejsFunction, NodejsFunctionProps } from '@aws-cdk/aws-lambda-nodejs';
declare type NodejsServiceFunctionProps = NodejsFunctionProps;
export declare class NodejsServiceFunction extends NodejsFunction {
    constructor(scope: cdk.Construct, id: string, props: NodejsServiceFunctionProps);
}
export {};

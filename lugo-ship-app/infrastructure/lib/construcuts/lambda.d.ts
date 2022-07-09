import * as cdk from '@aws-cdk/core';
import { PythonFunction, PythonFunctionProps } from '@aws-cdk/aws-lambda-python';
declare type ServiceFunctionProps = PythonFunctionProps;
export declare class ServiceFunction extends PythonFunction {
    constructor(scope: cdk.Construct, id: string, props: ServiceFunctionProps);
}
export {};

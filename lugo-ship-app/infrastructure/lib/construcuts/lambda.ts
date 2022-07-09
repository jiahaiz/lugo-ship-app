import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import { PythonFunction, PythonFunctionProps } from '@aws-cdk/aws-lambda-python';

import * as logs from '@aws-cdk/aws-logs';

type ServiceFunctionProps = PythonFunctionProps;

export class ServiceFunction extends PythonFunction {
    constructor(scope: cdk.Construct, id: string, props: ServiceFunctionProps) {
        const runtime = props.runtime ?? lambda.Runtime.PYTHON_3_8;
        const handler = 'handler';
        const logRetention = logs.RetentionDays.ONE_DAY;
        const tracing = lambda.Tracing.ACTIVE;
        super(scope, id, {
            ...props,
            tracing,
            runtime,
            handler,
            logRetention
        });
        this.addEnvironment('LOG_LEVEL', '40');
    }
}

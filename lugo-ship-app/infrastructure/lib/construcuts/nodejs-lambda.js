"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodejsServiceFunction = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const aws_lambda_nodejs_1 = require("@aws-cdk/aws-lambda-nodejs");
const logs = require("@aws-cdk/aws-logs");
class NodejsServiceFunction extends aws_lambda_nodejs_1.NodejsFunction {
    constructor(scope, id, props) {
        var _a;
        const runtime = (_a = props.runtime) !== null && _a !== void 0 ? _a : lambda.Runtime.NODEJS_14_X;
        const handler = 'handler';
        const bundling = {
            externalModules: ['aws-sdk'],
        };
        const logRetention = logs.RetentionDays.ONE_DAY;
        const tracing = lambda.Tracing.ACTIVE;
        super(scope, id, {
            ...props,
            tracing,
            runtime,
            handler,
            bundling,
            logRetention
        });
        this.addEnvironment('LOG_LEVEL', '40');
    }
}
exports.NodejsServiceFunction = NodejsServiceFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWpzLWxhbWJkYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGVqcy1sYW1iZGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBQThDO0FBQzlDLGtFQUFpRjtBQUNqRiwwQ0FBMEM7QUFJMUMsTUFBYSxxQkFBc0IsU0FBUSxrQ0FBYztJQUNyRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQWlDOztRQUMzRSxNQUFNLE9BQU8sU0FBRyxLQUFLLENBQUMsT0FBTyxtQ0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUM1RCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDMUIsTUFBTSxRQUFRLEdBQUc7WUFDYixlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7U0FDL0IsQ0FBQztRQUNGLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1FBQ2hELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ2IsR0FBRyxLQUFLO1lBQ1IsT0FBTztZQUNQLE9BQU87WUFDUCxPQUFPO1lBQ1AsUUFBUTtZQUNSLFlBQVk7U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFuQkQsc0RBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0IHsgTm9kZWpzRnVuY3Rpb24sIE5vZGVqc0Z1bmN0aW9uUHJvcHMgfSBmcm9tICdAYXdzLWNkay9hd3MtbGFtYmRhLW5vZGVqcyc7XG5pbXBvcnQgKiBhcyBsb2dzIGZyb20gJ0Bhd3MtY2RrL2F3cy1sb2dzJztcblxudHlwZSBOb2RlanNTZXJ2aWNlRnVuY3Rpb25Qcm9wcyA9IE5vZGVqc0Z1bmN0aW9uUHJvcHM7XG5cbmV4cG9ydCBjbGFzcyBOb2RlanNTZXJ2aWNlRnVuY3Rpb24gZXh0ZW5kcyBOb2RlanNGdW5jdGlvbiB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBOb2RlanNTZXJ2aWNlRnVuY3Rpb25Qcm9wcykge1xuICAgICAgICBjb25zdCBydW50aW1lID0gcHJvcHMucnVudGltZSA/PyBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWDtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9ICdoYW5kbGVyJztcbiAgICAgICAgY29uc3QgYnVuZGxpbmcgPSB7XG4gICAgICAgICAgICBleHRlcm5hbE1vZHVsZXM6IFsnYXdzLXNkayddLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBsb2dSZXRlbnRpb24gPSBsb2dzLlJldGVudGlvbkRheXMuT05FX0RBWTtcbiAgICAgICAgY29uc3QgdHJhY2luZyA9IGxhbWJkYS5UcmFjaW5nLkFDVElWRTtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCB7XG4gICAgICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgICAgIHRyYWNpbmcsXG4gICAgICAgICAgICBydW50aW1lLFxuICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgIGJ1bmRsaW5nLFxuICAgICAgICAgICAgbG9nUmV0ZW50aW9uXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFkZEVudmlyb25tZW50KCdMT0dfTEVWRUwnLCAnNDAnKTtcbiAgICB9XG59Il19
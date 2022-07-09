"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceFunction = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const aws_lambda_python_1 = require("@aws-cdk/aws-lambda-python");
const logs = require("@aws-cdk/aws-logs");
class ServiceFunction extends aws_lambda_python_1.PythonFunction {
    constructor(scope, id, props) {
        var _a;
        const runtime = (_a = props.runtime) !== null && _a !== void 0 ? _a : lambda.Runtime.PYTHON_3_8;
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
exports.ServiceFunction = ServiceFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDhDQUE4QztBQUM5QyxrRUFBaUY7QUFFakYsMENBQTBDO0FBSTFDLE1BQWEsZUFBZ0IsU0FBUSxrQ0FBYztJQUMvQyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQTJCOztRQUNyRSxNQUFNLE9BQU8sU0FBRyxLQUFLLENBQUMsT0FBTyxtQ0FBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUMzRCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDMUIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFDaEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDYixHQUFHLEtBQUs7WUFDUixPQUFPO1lBQ1AsT0FBTztZQUNQLE9BQU87WUFDUCxZQUFZO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBZkQsMENBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBQeXRob25GdW5jdGlvbiwgUHl0aG9uRnVuY3Rpb25Qcm9wcyB9IGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEtcHl0aG9uJztcblxuaW1wb3J0ICogYXMgbG9ncyBmcm9tICdAYXdzLWNkay9hd3MtbG9ncyc7XG5cbnR5cGUgU2VydmljZUZ1bmN0aW9uUHJvcHMgPSBQeXRob25GdW5jdGlvblByb3BzO1xuXG5leHBvcnQgY2xhc3MgU2VydmljZUZ1bmN0aW9uIGV4dGVuZHMgUHl0aG9uRnVuY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU2VydmljZUZ1bmN0aW9uUHJvcHMpIHtcbiAgICAgICAgY29uc3QgcnVudGltZSA9IHByb3BzLnJ1bnRpbWUgPz8gbGFtYmRhLlJ1bnRpbWUuUFlUSE9OXzNfODtcbiAgICAgICAgY29uc3QgaGFuZGxlciA9ICdoYW5kbGVyJztcbiAgICAgICAgY29uc3QgbG9nUmV0ZW50aW9uID0gbG9ncy5SZXRlbnRpb25EYXlzLk9ORV9EQVk7XG4gICAgICAgIGNvbnN0IHRyYWNpbmcgPSBsYW1iZGEuVHJhY2luZy5BQ1RJVkU7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwge1xuICAgICAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgICAgICB0cmFjaW5nLFxuICAgICAgICAgICAgcnVudGltZSxcbiAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICBsb2dSZXRlbnRpb25cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYWRkRW52aXJvbm1lbnQoJ0xPR19MRVZFTCcsICc0MCcpO1xuICAgIH1cbn0iXX0=
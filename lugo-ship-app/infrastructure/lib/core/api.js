"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationAPI = void 0;
const cdk = require("@aws-cdk/core");
const apigw = require("@aws-cdk/aws-apigatewayv2");
const aws_apigatewayv2_1 = require("@aws-cdk/aws-apigatewayv2");
const aws_apigatewayv2_authorizers_1 = require("@aws-cdk/aws-apigatewayv2-authorizers");
const apigi = require("@aws-cdk/aws-apigatewayv2-integrations");
class ApplicationAPI extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const serviceMethods = [
            aws_apigatewayv2_1.HttpMethod.GET,
            aws_apigatewayv2_1.HttpMethod.POST,
            aws_apigatewayv2_1.HttpMethod.DELETE,
            aws_apigatewayv2_1.HttpMethod.PUT,
            aws_apigatewayv2_1.HttpMethod.PATCH,
        ];
        // API Gateway ------------------------------------------------------
        this.httpApi = new apigw.HttpApi(this, 'HttpProxyApi', {
            apiName: 'serverless-api',
            createDefaultStage: true,
            corsPreflight: {
                allowHeaders: ['Authorization', 'Content-Type', '*'],
                allowMethods: [
                    aws_apigatewayv2_1.CorsHttpMethod.GET,
                    aws_apigatewayv2_1.CorsHttpMethod.POST,
                    aws_apigatewayv2_1.CorsHttpMethod.DELETE,
                    aws_apigatewayv2_1.CorsHttpMethod.PUT,
                    aws_apigatewayv2_1.CorsHttpMethod.PATCH,
                ],
                allowOrigins: ['http://localhost:3000', 'https://*'],
                allowCredentials: true,
                maxAge: cdk.Duration.days(10),
            },
        });
        // Authorizer -------------------------------------------------------
        const authorizer = new aws_apigatewayv2_authorizers_1.HttpUserPoolAuthorizer({
            userPool: props.userPool,
            userPoolClient: props.userPoolClient,
        });
        // Test Service -------------------------------------------------
        const testServiceIntegration = new apigi.LambdaProxyIntegration({
            handler: props.testService,
        });
        this.httpApi.addRoutes({
            path: `/test/{proxy+}`,
            methods: serviceMethods,
            integration: testServiceIntegration,
            authorizer,
        });
        // Users Service ------------------------------------------------------
        const usersServiceIntegration = new apigi.LambdaProxyIntegration({
            handler: props.usersService,
        });
        this.httpApi.addRoutes({
            path: `/users/{proxy+}`,
            methods: serviceMethods,
            integration: usersServiceIntegration,
            authorizer,
        });
        // Outputs -----------------------------------------------------------
        new cdk.CfnOutput(this, 'URL', {
            value: this.httpApi.apiEndpoint
        });
    }
}
exports.ApplicationAPI = ApplicationAPI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUVyQyxtREFBbUQ7QUFFbkQsZ0VBQXFFO0FBQ3JFLHdGQUE2RTtBQUM3RSxnRUFBZ0U7QUFZaEUsTUFBYSxjQUFlLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFHN0MsWUFBWSxLQUFvQixFQUFFLEVBQVUsRUFBRSxLQUEwQjtRQUNwRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sY0FBYyxHQUFHO1lBQ25CLDZCQUFVLENBQUMsR0FBRztZQUNkLDZCQUFVLENBQUMsSUFBSTtZQUNmLDZCQUFVLENBQUMsTUFBTTtZQUNqQiw2QkFBVSxDQUFDLEdBQUc7WUFDZCw2QkFBVSxDQUFDLEtBQUs7U0FDbkIsQ0FBQztRQUVGLHFFQUFxRTtRQUVyRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ25ELE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsa0JBQWtCLEVBQUUsSUFBSTtZQUN4QixhQUFhLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxHQUFHLENBQUM7Z0JBQ3BELFlBQVksRUFBRTtvQkFDVixpQ0FBYyxDQUFDLEdBQUc7b0JBQ2xCLGlDQUFjLENBQUMsSUFBSTtvQkFDbkIsaUNBQWMsQ0FBQyxNQUFNO29CQUNyQixpQ0FBYyxDQUFDLEdBQUc7b0JBQ2xCLGlDQUFjLENBQUMsS0FBSztpQkFDdkI7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsV0FBVyxDQUFDO2dCQUNwRCxnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixNQUFNLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2FBQ2hDO1NBQ0osQ0FBQyxDQUFDO1FBQ0gscUVBQXFFO1FBRXJFLE1BQU0sVUFBVSxHQUFHLElBQUkscURBQXNCLENBQUM7WUFDMUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLGNBQWMsRUFBRSxLQUFLLENBQUMsY0FBYztTQUN2QyxDQUFDLENBQUM7UUFFSCxpRUFBaUU7UUFFakUsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUM1RCxPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVc7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDbkIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixPQUFPLEVBQUUsY0FBYztZQUN2QixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFVBQVU7U0FDYixDQUFDLENBQUM7UUFHSCx1RUFBdUU7UUFFdkUsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUM3RCxPQUFPLEVBQUUsS0FBSyxDQUFDLFlBQVk7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7WUFDbkIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixPQUFPLEVBQUUsY0FBYztZQUN2QixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFVBQVU7U0FDYixDQUFDLENBQUM7UUFFSCxzRUFBc0U7UUFFdEUsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztTQUNsQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBR0o7QUEzRUQsd0NBMkVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ0Bhd3MtY2RrL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXBpZ3cgZnJvbSAnQGF3cy1jZGsvYXdzLWFwaWdhdGV3YXl2Mic7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2duaXRvJztcbmltcG9ydCB7Q29yc0h0dHBNZXRob2QsIEh0dHBNZXRob2R9IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5djInO1xuaW1wb3J0IHtIdHRwVXNlclBvb2xBdXRob3JpemVyfSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheXYyLWF1dGhvcml6ZXJzJztcbmltcG9ydCAqIGFzIGFwaWdpIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5djItaW50ZWdyYXRpb25zJztcbmltcG9ydCAqIGFzIGlhbSBmcm9tICdAYXdzLWNkay9hd3MtaWFtJztcbmltcG9ydCAqIGFzIHNxcyBmcm9tICdAYXdzLWNkay9hd3Mtc3FzJztcblxuaW50ZXJmYWNlIEFwcGxpY2F0aW9uQVBJUHJvcHMge1xuICAgIHRlc3RTZXJ2aWNlOiBsYW1iZGEuSUZ1bmN0aW9uO1xuICAgIC8vIGRvY3VtZW50c1NlcnZpY2U6IGxhbWJkYS5JRnVuY3Rpb247XG4gICAgdXNlcnNTZXJ2aWNlOiBsYW1iZGEuSUZ1bmN0aW9uO1xuICAgIHVzZXJQb29sOiBjb2duaXRvLklVc2VyUG9vbDtcbiAgICB1c2VyUG9vbENsaWVudDogY29nbml0by5JVXNlclBvb2xDbGllbnQ7XG59XG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkFQSSBleHRlbmRzIGNkay5Db25zdHJ1Y3Qge1xuICAgIHB1YmxpYyByZWFkb25seSBodHRwQXBpOiBhcGlndy5IdHRwQXBpO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBBcHBsaWNhdGlvbkFQSVByb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAgICAgY29uc3Qgc2VydmljZU1ldGhvZHMgPSBbXG4gICAgICAgICAgICBIdHRwTWV0aG9kLkdFVCxcbiAgICAgICAgICAgIEh0dHBNZXRob2QuUE9TVCxcbiAgICAgICAgICAgIEh0dHBNZXRob2QuREVMRVRFLFxuICAgICAgICAgICAgSHR0cE1ldGhvZC5QVVQsXG4gICAgICAgICAgICBIdHRwTWV0aG9kLlBBVENILFxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIEFQSSBHYXRld2F5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIHRoaXMuaHR0cEFwaSA9IG5ldyBhcGlndy5IdHRwQXBpKHRoaXMsICdIdHRwUHJveHlBcGknLCB7XG4gICAgICAgICAgICBhcGlOYW1lOiAnc2VydmVybGVzcy1hcGknLFxuICAgICAgICAgICAgY3JlYXRlRGVmYXVsdFN0YWdlOiB0cnVlLFxuICAgICAgICAgICAgY29yc1ByZWZsaWdodDoge1xuICAgICAgICAgICAgICAgIGFsbG93SGVhZGVyczogWydBdXRob3JpemF0aW9uJywgJ0NvbnRlbnQtVHlwZScsICcqJ10sXG4gICAgICAgICAgICAgICAgYWxsb3dNZXRob2RzOiBbXG4gICAgICAgICAgICAgICAgICAgIENvcnNIdHRwTWV0aG9kLkdFVCxcbiAgICAgICAgICAgICAgICAgICAgQ29yc0h0dHBNZXRob2QuUE9TVCxcbiAgICAgICAgICAgICAgICAgICAgQ29yc0h0dHBNZXRob2QuREVMRVRFLFxuICAgICAgICAgICAgICAgICAgICBDb3JzSHR0cE1ldGhvZC5QVVQsXG4gICAgICAgICAgICAgICAgICAgIENvcnNIdHRwTWV0aG9kLlBBVENILFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgYWxsb3dPcmlnaW5zOiBbJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsICdodHRwczovLyonXSxcbiAgICAgICAgICAgICAgICBhbGxvd0NyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgICAgICAgICAgIG1heEFnZTogY2RrLkR1cmF0aW9uLmRheXMoMTApLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEF1dGhvcml6ZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIGNvbnN0IGF1dGhvcml6ZXIgPSBuZXcgSHR0cFVzZXJQb29sQXV0aG9yaXplcih7XG4gICAgICAgICAgICB1c2VyUG9vbDogcHJvcHMudXNlclBvb2wsXG4gICAgICAgICAgICB1c2VyUG9vbENsaWVudDogcHJvcHMudXNlclBvb2xDbGllbnQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRlc3QgU2VydmljZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgY29uc3QgdGVzdFNlcnZpY2VJbnRlZ3JhdGlvbiA9IG5ldyBhcGlnaS5MYW1iZGFQcm94eUludGVncmF0aW9uKHtcbiAgICAgICAgICAgIGhhbmRsZXI6IHByb3BzLnRlc3RTZXJ2aWNlLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmh0dHBBcGkuYWRkUm91dGVzKHtcbiAgICAgICAgICAgIHBhdGg6IGAvdGVzdC97cHJveHkrfWAsXG4gICAgICAgICAgICBtZXRob2RzOiBzZXJ2aWNlTWV0aG9kcyxcbiAgICAgICAgICAgIGludGVncmF0aW9uOiB0ZXN0U2VydmljZUludGVncmF0aW9uLFxuICAgICAgICAgICAgYXV0aG9yaXplcixcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBVc2VycyBTZXJ2aWNlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIGNvbnN0IHVzZXJzU2VydmljZUludGVncmF0aW9uID0gbmV3IGFwaWdpLkxhbWJkYVByb3h5SW50ZWdyYXRpb24oe1xuICAgICAgICAgICAgaGFuZGxlcjogcHJvcHMudXNlcnNTZXJ2aWNlLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmh0dHBBcGkuYWRkUm91dGVzKHtcbiAgICAgICAgICAgIHBhdGg6IGAvdXNlcnMve3Byb3h5K31gLFxuICAgICAgICAgICAgbWV0aG9kczogc2VydmljZU1ldGhvZHMsXG4gICAgICAgICAgICBpbnRlZ3JhdGlvbjogdXNlcnNTZXJ2aWNlSW50ZWdyYXRpb24sXG4gICAgICAgICAgICBhdXRob3JpemVyLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBPdXRwdXRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1VSTCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLmh0dHBBcGkuYXBpRW5kcG9pbnRcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn0iXX0=
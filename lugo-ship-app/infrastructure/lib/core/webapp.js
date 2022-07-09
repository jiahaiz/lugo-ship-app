"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApp = void 0;
const cdk = require("@aws-cdk/core");
const cloudfront = require("@aws-cdk/aws-cloudfront");
const cwt = require("cdk-webapp-tools");
class WebApp extends cdk.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const oai = new cloudfront.OriginAccessIdentity(this, 'WebHostingOAI', {});
        const cloudfrontProps = {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: props.hostingBucket,
                        originAccessIdentity: oai,
                    },
                    behaviors: [{ isDefaultBehavior: true }],
                },
            ],
            errorConfigurations: [
                {
                    errorCachingMinTtl: 86400,
                    errorCode: 403,
                    responseCode: 200,
                    responsePagePath: '/index.html',
                },
                {
                    errorCachingMinTtl: 86400,
                    errorCode: 404,
                    responseCode: 200,
                    responsePagePath: '/index.html',
                },
            ],
        };
        this.webDistribution = new cloudfront.CloudFrontWebDistribution(this, 'AppHostingDistribution', cloudfrontProps);
        props.hostingBucket.grantRead(oai);
        // Deploy Web App ----------------------------------------------------
        const deployment = new cwt.WebAppDeployment(this, 'WebAppDeploy', {
            baseDirectory: props.baseDirectory,
            relativeWebAppPath: props.relativeWebAppPath,
            webDistribution: this.webDistribution,
            webDistributionPaths: ['/*'],
            buildCommand: 'yarn build',
            buildDirectory: 'build',
            bucket: props.hostingBucket,
            prune: false
        });
        new cdk.CfnOutput(this, 'URL', {
            value: `https://${this.webDistribution.distributionDomainName}/`
        });
        // Web App Config ------------------------------------------------------
        new cwt.WebAppConfig(this, 'WebAppConfig', {
            bucket: props.hostingBucket,
            key: 'config.js',
            configData: {
                apiEndpoint: props.httpApi.apiEndpoint,
                userPoolId: props.userPool.userPoolId,
                userPoolWebClientId: props.userPoolClient.userPoolClientId,
            },
            globalVariableName: 'appConfig'
        }).node.addDependency(deployment);
    }
}
exports.WebApp = WebApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2ViYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFxQztBQUVyQyxzREFBc0Q7QUFDdEQsd0NBQXdDO0FBWXhDLE1BQWEsTUFBTyxTQUFRLEdBQUcsQ0FBQyxTQUFTO0lBR3JDLFlBQVksS0FBb0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sZUFBZSxHQUFRO1lBQ3pCLGFBQWEsRUFBRTtnQkFDWDtvQkFDSSxjQUFjLEVBQUU7d0JBQ1osY0FBYyxFQUFFLEtBQUssQ0FBQyxhQUFhO3dCQUNuQyxvQkFBb0IsRUFBRSxHQUFHO3FCQUM1QjtvQkFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO2lCQUMzQzthQUNKO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCO29CQUNJLGtCQUFrQixFQUFFLEtBQUs7b0JBQ3pCLFNBQVMsRUFBRSxHQUFHO29CQUNkLFlBQVksRUFBRSxHQUFHO29CQUNqQixnQkFBZ0IsRUFBRSxhQUFhO2lCQUNsQztnQkFDRDtvQkFDSSxrQkFBa0IsRUFBRSxLQUFLO29CQUN6QixTQUFTLEVBQUUsR0FBRztvQkFDZCxZQUFZLEVBQUUsR0FBRztvQkFDakIsZ0JBQWdCLEVBQUUsYUFBYTtpQkFDbEM7YUFDSjtTQUNKLENBQUM7UUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksVUFBVSxDQUFDLHlCQUF5QixDQUMzRCxJQUFJLEVBQ0osd0JBQXdCLEVBQ3hCLGVBQWUsQ0FDbEIsQ0FBQztRQUVGLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBR25DLHNFQUFzRTtRQUV0RSxNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQzlELGFBQWEsRUFBRSxLQUFLLENBQUMsYUFBYTtZQUNsQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsa0JBQWtCO1lBQzVDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxvQkFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQztZQUM1QixZQUFZLEVBQUUsWUFBWTtZQUMxQixjQUFjLEVBQUUsT0FBTztZQUN2QixNQUFNLEVBQUUsS0FBSyxDQUFDLGFBQWE7WUFDM0IsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7UUFFSCxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUMzQixLQUFLLEVBQUUsV0FBVyxJQUFJLENBQUMsZUFBZSxDQUFDLHNCQUFzQixHQUFHO1NBQ25FLENBQUMsQ0FBQztRQUVILHdFQUF3RTtRQUV4RSxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN2QyxNQUFNLEVBQUUsS0FBSyxDQUFDLGFBQWE7WUFDM0IsR0FBRyxFQUFFLFdBQVc7WUFDaEIsVUFBVSxFQUFFO2dCQUNSLFdBQVcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVc7Z0JBQ3RDLFVBQVUsRUFBRSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVU7Z0JBQ3JDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsZ0JBQWdCO2FBQzdEO1lBQ0Qsa0JBQWtCLEVBQUUsV0FBVztTQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUV0QyxDQUFDO0NBRUo7QUF4RUQsd0JBd0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgczMgZnJvbSAnQGF3cy1jZGsvYXdzLXMzJztcbmltcG9ydCAqIGFzIGNsb3VkZnJvbnQgZnJvbSAnQGF3cy1jZGsvYXdzLWNsb3VkZnJvbnQnO1xuaW1wb3J0ICogYXMgY3d0IGZyb20gJ2Nkay13ZWJhcHAtdG9vbHMnO1xuaW1wb3J0ICogYXMgY29nbml0byBmcm9tICdAYXdzLWNkay9hd3MtY29nbml0byc7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheXYyJztcblxuaW50ZXJmYWNlIFdlYkFwcFByb3BzIHtcbiAgICBob3N0aW5nQnVja2V0OiBzMy5JQnVja2V0O1xuICAgIHJlbGF0aXZlV2ViQXBwUGF0aDogc3RyaW5nO1xuICAgIGJhc2VEaXJlY3Rvcnk6IHN0cmluZztcbiAgICBodHRwQXBpOmFwaWd3LklIdHRwQXBpO1xuICAgIHVzZXJQb29sOiBjb2duaXRvLklVc2VyUG9vbDtcbiAgICB1c2VyUG9vbENsaWVudDogY29nbml0by5JVXNlclBvb2xDbGllbnQ7XG59XG5leHBvcnQgY2xhc3MgV2ViQXBwIGV4dGVuZHMgY2RrLkNvbnN0cnVjdCB7XG4gICAgcHVibGljIHJlYWRvbmx5IHdlYkRpc3RyaWJ1dGlvbjogY2xvdWRmcm9udC5DbG91ZEZyb250V2ViRGlzdHJpYnV0aW9uO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBXZWJBcHBQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgICAgICBjb25zdCBvYWkgPSBuZXcgY2xvdWRmcm9udC5PcmlnaW5BY2Nlc3NJZGVudGl0eSh0aGlzLCAnV2ViSG9zdGluZ09BSScsIHt9KTtcbiAgICAgICAgY29uc3QgY2xvdWRmcm9udFByb3BzOiBhbnkgPSB7XG4gICAgICAgICAgICBvcmlnaW5Db25maWdzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzM09yaWdpblNvdXJjZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IHByb3BzLmhvc3RpbmdCdWNrZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogb2FpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcnM6IFt7IGlzRGVmYXVsdEJlaGF2aW9yOiB0cnVlIH1dLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZXJyb3JDb25maWd1cmF0aW9uczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDYWNoaW5nTWluVHRsOiA4NjQwMCxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JDb2RlOiA0MDMsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlQ29kZTogMjAwLFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVBhZ2VQYXRoOiAnL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBlcnJvckNhY2hpbmdNaW5UdGw6IDg2NDAwLFxuICAgICAgICAgICAgICAgICAgICBlcnJvckNvZGU6IDQwNCxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2VDb2RlOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6ICcvaW5kZXguaHRtbCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud2ViRGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbihcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAnQXBwSG9zdGluZ0Rpc3RyaWJ1dGlvbicsXG4gICAgICAgICAgICBjbG91ZGZyb250UHJvcHMsXG4gICAgICAgICk7XG5cbiAgICAgICAgcHJvcHMuaG9zdGluZ0J1Y2tldC5ncmFudFJlYWQob2FpKTtcblxuXG4gICAgICAgIC8vIERlcGxveSBXZWIgQXBwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICBjb25zdCBkZXBsb3ltZW50ID0gbmV3IGN3dC5XZWJBcHBEZXBsb3ltZW50KHRoaXMsICdXZWJBcHBEZXBsb3knLCB7XG4gICAgICAgICAgICBiYXNlRGlyZWN0b3J5OiBwcm9wcy5iYXNlRGlyZWN0b3J5LFxuICAgICAgICAgICAgcmVsYXRpdmVXZWJBcHBQYXRoOiBwcm9wcy5yZWxhdGl2ZVdlYkFwcFBhdGgsXG4gICAgICAgICAgICB3ZWJEaXN0cmlidXRpb246IHRoaXMud2ViRGlzdHJpYnV0aW9uLFxuICAgICAgICAgICAgd2ViRGlzdHJpYnV0aW9uUGF0aHM6IFsnLyonXSxcbiAgICAgICAgICAgIGJ1aWxkQ29tbWFuZDogJ3lhcm4gYnVpbGQnLFxuICAgICAgICAgICAgYnVpbGREaXJlY3Rvcnk6ICdidWlsZCcsXG4gICAgICAgICAgICBidWNrZXQ6IHByb3BzLmhvc3RpbmdCdWNrZXQsXG4gICAgICAgICAgICBwcnVuZTogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ1VSTCcsIHtcbiAgICAgICAgICAgIHZhbHVlOiBgaHR0cHM6Ly8ke3RoaXMud2ViRGlzdHJpYnV0aW9uLmRpc3RyaWJ1dGlvbkRvbWFpbk5hbWV9L2BcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gV2ViIEFwcCBDb25maWcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgbmV3IGN3dC5XZWJBcHBDb25maWcodGhpcywgJ1dlYkFwcENvbmZpZycsIHtcbiAgICAgICAgICAgIGJ1Y2tldDogcHJvcHMuaG9zdGluZ0J1Y2tldCxcbiAgICAgICAgICAgIGtleTogJ2NvbmZpZy5qcycsXG4gICAgICAgICAgICBjb25maWdEYXRhOiB7XG4gICAgICAgICAgICAgICAgYXBpRW5kcG9pbnQ6IHByb3BzLmh0dHBBcGkuYXBpRW5kcG9pbnQsXG4gICAgICAgICAgICAgICAgdXNlclBvb2xJZDogcHJvcHMudXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgICAgICAgICAgICB1c2VyUG9vbFdlYkNsaWVudElkOiBwcm9wcy51c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdsb2JhbFZhcmlhYmxlTmFtZTogJ2FwcENvbmZpZydcbiAgICAgICAgfSkubm9kZS5hZGREZXBlbmRlbmN5KGRlcGxveW1lbnQpO1xuXG4gICAgfVxuXG59Il19
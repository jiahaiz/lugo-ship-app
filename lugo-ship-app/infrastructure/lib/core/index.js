"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationStack = void 0;
const cdk = require("@aws-cdk/core");
const storage_1 = require("./storage");
const webapp_1 = require("./webapp");
const dynamodb_1 = require("./dynamodb");
const services_1 = require("./services");
const api_1 = require("./api");
const auth_1 = require("./auth");
class ApplicationStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const auth = new auth_1.ApplicationAuth(this, 'Auth');
        const storage = new storage_1.AssetStorage(this, "Storage");
        const database = new dynamodb_1.AppDatabase(this, 'Database');
        const services = new services_1.AppServices(this, 'Services', {
            documentsTable: database.testTable,
            assetBucket: storage.assetBucket,
            userPool: auth.userPool,
        });
        const api = new api_1.ApplicationAPI(this, 'API', {
            testService: services.testService,
            usersService: services.usersService,
            userPool: auth.userPool,
            userPoolClient: auth.userPoolClient,
        });
        const webapp = new webapp_1.WebApp(this, "WebApp", {
            hostingBucket: storage.hostingBucket,
            baseDirectory: '../',
            relativeWebAppPath: 'webapp',
            httpApi: api.httpApi,
            userPool: auth.userPool,
            userPoolClient: auth.userPoolClient,
        });
        webapp.node.addDependency(auth);
    }
}
exports.ApplicationStack = ApplicationStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsdUNBQXVDO0FBQ3ZDLHFDQUFnQztBQUNoQyx5Q0FBdUM7QUFDdkMseUNBQXVDO0FBRXZDLCtCQUFxQztBQUNyQyxpQ0FBdUM7QUFFdkMsTUFBYSxnQkFBaUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUMzQyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2hFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sSUFBSSxHQUFHLElBQUksc0JBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFL0MsTUFBTSxPQUFPLEdBQUcsSUFBSSxzQkFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVsRCxNQUFNLFFBQVEsR0FBRyxJQUFJLHNCQUFXLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRW5ELE1BQU0sUUFBUSxHQUFHLElBQUksc0JBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQy9DLGNBQWMsRUFBRyxRQUFRLENBQUMsU0FBUztZQUNuQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQzFCLENBQUMsQ0FBQTtRQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksb0JBQWMsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDO1lBQ3RDLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztZQUNqQyxZQUFZLEVBQUUsUUFBUSxDQUFDLFlBQVk7WUFDbkMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztTQUN0QyxDQUFDLENBQUE7UUFFRixNQUFNLE1BQU0sR0FBRyxJQUFJLGVBQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3RDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtZQUNwQyxhQUFhLEVBQUUsS0FBSztZQUNwQixrQkFBa0IsRUFBRSxRQUFRO1lBQzVCLE9BQU8sRUFBRSxHQUFHLENBQUMsT0FBTztZQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQ3RDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDSjtBQWpDRCw0Q0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQge0Fzc2V0U3RvcmFnZX0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuaW1wb3J0IHtXZWJBcHB9IGZyb20gXCIuL3dlYmFwcFwiO1xuaW1wb3J0IHtBcHBEYXRhYmFzZX0gZnJvbSBcIi4vZHluYW1vZGJcIjtcbmltcG9ydCB7QXBwU2VydmljZXN9IGZyb20gXCIuL3NlcnZpY2VzXCI7XG5pbXBvcnQge0FwcGxpY2F0aW9uVGFyZ2V0R3JvdXB9IGZyb20gXCJAYXdzLWNkay9hd3MtZWxhc3RpY2xvYWRiYWxhbmNpbmd2MlwiO1xuaW1wb3J0IHtBcHBsaWNhdGlvbkFQSX0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQge0FwcGxpY2F0aW9uQXV0aH0gZnJvbSBcIi4vYXV0aFwiO1xuXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb25TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgYXV0aCA9IG5ldyBBcHBsaWNhdGlvbkF1dGgodGhpcywgJ0F1dGgnKTtcblxuICAgICAgICBjb25zdCBzdG9yYWdlID0gbmV3IEFzc2V0U3RvcmFnZSh0aGlzLCBcIlN0b3JhZ2VcIik7XG5cbiAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBuZXcgQXBwRGF0YWJhc2UodGhpcywgJ0RhdGFiYXNlJyk7XG5cbiAgICAgICAgY29uc3Qgc2VydmljZXMgPSBuZXcgQXBwU2VydmljZXModGhpcywgJ1NlcnZpY2VzJywge1xuICAgICAgICAgICAgZG9jdW1lbnRzVGFibGU6ICBkYXRhYmFzZS50ZXN0VGFibGUsXG4gICAgICAgICAgICBhc3NldEJ1Y2tldDogc3RvcmFnZS5hc3NldEJ1Y2tldCxcbiAgICAgICAgICAgIHVzZXJQb29sOiBhdXRoLnVzZXJQb29sLFxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGFwaSA9IG5ldyBBcHBsaWNhdGlvbkFQSSh0aGlzLCdBUEknLHtcbiAgICAgICAgICAgIHRlc3RTZXJ2aWNlOiBzZXJ2aWNlcy50ZXN0U2VydmljZSxcbiAgICAgICAgICAgIHVzZXJzU2VydmljZTogc2VydmljZXMudXNlcnNTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlclBvb2w6IGF1dGgudXNlclBvb2wsXG4gICAgICAgICAgICB1c2VyUG9vbENsaWVudDogYXV0aC51c2VyUG9vbENsaWVudCxcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCB3ZWJhcHAgPSBuZXcgV2ViQXBwKHRoaXMsIFwiV2ViQXBwXCIsIHtcbiAgICAgICAgICAgIGhvc3RpbmdCdWNrZXQ6IHN0b3JhZ2UuaG9zdGluZ0J1Y2tldCxcbiAgICAgICAgICAgIGJhc2VEaXJlY3Rvcnk6ICcuLi8nLFxuICAgICAgICAgICAgcmVsYXRpdmVXZWJBcHBQYXRoOiAnd2ViYXBwJyxcbiAgICAgICAgICAgIGh0dHBBcGk6IGFwaS5odHRwQXBpLFxuICAgICAgICAgICAgdXNlclBvb2w6IGF1dGgudXNlclBvb2wsXG4gICAgICAgICAgICB1c2VyUG9vbENsaWVudDogYXV0aC51c2VyUG9vbENsaWVudCxcbiAgICAgICAgfSlcbiAgICAgICAgd2ViYXBwLm5vZGUuYWRkRGVwZW5kZW5jeShhdXRoKTtcbiAgICB9XG59XG4iXX0=
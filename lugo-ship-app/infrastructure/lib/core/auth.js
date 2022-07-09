"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationAuth = void 0;
const cdk = require("@aws-cdk/core");
const cognito = require("@aws-cdk/aws-cognito");
class ApplicationAuth extends cdk.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.userPool = new cognito.UserPool(this, 'UserPool', {
            selfSignUpEnabled: false,
            autoVerify: {
                email: true,
            },
            signInAliases: {
                email: true,
            },
            standardAttributes: {
                fullname: {
                    required: true,
                    mutable: true,
                },
                phoneNumber: {
                    required: false,
                    mutable: true,
                },
                profilePicture: {
                    required: false,
                    mutable: true,
                },
            },
        });
        this.userPoolClient = new cognito.UserPoolClient(this, 'UserPoolClient', {
            userPool: this.userPool,
            generateSecret: false,
            authFlows: {
                adminUserPassword: true,
                userSrp: true,
            },
        });
        // Groups -----------------------------------------------------------------------
        new cognito.CfnUserPoolGroup(this, 'AdminGroup', {
            userPoolId: this.userPool.userPoolId,
            groupName: 'admin',
            precedence: 1,
            description: 'Admin users',
        });
        new cognito.CfnUserPoolGroup(this, 'customGroup', {
            userPoolId: this.userPool.userPoolId,
            groupName: 'custom',
            precedence: 5,
            description: 'Users who are our custom',
        });
    }
}
exports.ApplicationAuth = ApplicationAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLGdEQUFnRDtBQUVoRCxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLFNBQVM7SUFLOUMsWUFBWSxLQUFvQixFQUFFLEVBQVU7UUFDeEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQ25ELGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsVUFBVSxFQUFFO2dCQUNSLEtBQUssRUFBRSxJQUFJO2FBQ2Q7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7YUFDZDtZQUNELGtCQUFrQixFQUFFO2dCQUNoQixRQUFRLEVBQUU7b0JBQ04sUUFBUSxFQUFFLElBQUk7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2hCO2dCQUNELFdBQVcsRUFBRTtvQkFDVCxRQUFRLEVBQUUsS0FBSztvQkFDZixPQUFPLEVBQUUsSUFBSTtpQkFDaEI7Z0JBQ0QsY0FBYyxFQUFFO29CQUNaLFFBQVEsRUFBRSxLQUFLO29CQUNmLE9BQU8sRUFBRSxJQUFJO2lCQUNoQjthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3JFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixjQUFjLEVBQUUsS0FBSztZQUNyQixTQUFTLEVBQUU7Z0JBQ1AsaUJBQWlCLEVBQUUsSUFBSTtnQkFDdkIsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDLENBQUM7UUFFSCxpRkFBaUY7UUFFakYsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUM3QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO1lBQ3BDLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFVBQVUsRUFBRSxDQUFDO1lBQ2IsV0FBVyxFQUFFLGFBQWE7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUM5QyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO1lBQ3BDLFNBQVMsRUFBRSxRQUFRO1lBQ25CLFVBQVUsRUFBRSxDQUFDO1lBQ2IsV0FBVyxFQUFFLDBCQUEwQjtTQUMxQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUF6REQsMENBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0ICogYXMgY29nbml0byBmcm9tICdAYXdzLWNkay9hd3MtY29nbml0byc7XG5cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbkF1dGggZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgdXNlclBvb2w6IGNvZ25pdG8uSVVzZXJQb29sO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IHVzZXJQb29sQ2xpZW50OiBjb2duaXRvLklVc2VyUG9vbENsaWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAgICAgdGhpcy51c2VyUG9vbCA9IG5ldyBjb2duaXRvLlVzZXJQb29sKHRoaXMsICdVc2VyUG9vbCcsIHtcbiAgICAgICAgICAgIHNlbGZTaWduVXBFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9WZXJpZnk6IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzaWduSW5BbGlhc2VzOiB7XG4gICAgICAgICAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgZnVsbG5hbWU6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwaG9uZU51bWJlcjoge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcm9maWxlUGljdHVyZToge1xuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIG11dGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudXNlclBvb2xDbGllbnQgPSBuZXcgY29nbml0by5Vc2VyUG9vbENsaWVudCh0aGlzLCAnVXNlclBvb2xDbGllbnQnLCB7XG4gICAgICAgICAgICB1c2VyUG9vbDogdGhpcy51c2VyUG9vbCxcbiAgICAgICAgICAgIGdlbmVyYXRlU2VjcmV0OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dGhGbG93czoge1xuICAgICAgICAgICAgICAgIGFkbWluVXNlclBhc3N3b3JkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZXJTcnA6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBHcm91cHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICBuZXcgY29nbml0by5DZm5Vc2VyUG9vbEdyb3VwKHRoaXMsICdBZG1pbkdyb3VwJywge1xuICAgICAgICAgICAgdXNlclBvb2xJZDogdGhpcy51c2VyUG9vbC51c2VyUG9vbElkLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiAnYWRtaW4nLFxuICAgICAgICAgICAgcHJlY2VkZW5jZTogMSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWRtaW4gdXNlcnMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBuZXcgY29nbml0by5DZm5Vc2VyUG9vbEdyb3VwKHRoaXMsICdjdXN0b21Hcm91cCcsIHtcbiAgICAgICAgICAgIHVzZXJQb29sSWQ6IHRoaXMudXNlclBvb2wudXNlclBvb2xJZCxcbiAgICAgICAgICAgIGdyb3VwTmFtZTogJ2N1c3RvbScsXG4gICAgICAgICAgICBwcmVjZWRlbmNlOiA1LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdVc2VycyB3aG8gYXJlIG91ciBjdXN0b20nLFxuICAgICAgICB9KTtcbiAgICB9XG59Il19
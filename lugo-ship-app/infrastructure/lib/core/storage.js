"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetStorage = void 0;
const cdk = require("@aws-cdk/core");
const s3 = require("@aws-cdk/aws-s3");
class AssetStorage extends cdk.Construct {
    constructor(scope, id) {
        super(scope, id);
        this.hostingBucket = new s3.Bucket(this, 'WebHostingBucket', {
            encryption: s3.BucketEncryption.S3_MANAGED,
        });
        this.assetBucket = new s3.Bucket(this, 'AssetBucket', {
            encryption: s3.BucketEncryption.S3_MANAGED,
        });
    }
}
exports.AssetStorage = AssetStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQXFDO0FBQ3JDLHNDQUFzQztBQUV0QyxNQUFhLFlBQWEsU0FBUSxHQUFHLENBQUMsU0FBUztJQU0zQyxZQUFZLEtBQW9CLEVBQUUsRUFBVTtRQUN4QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN6RCxVQUFVLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVU7U0FDN0MsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUNsRCxVQUFVLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVU7U0FDN0MsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBakJELG9DQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zMyc7XG5cbmV4cG9ydCBjbGFzcyBBc3NldFN0b3JhZ2UgZXh0ZW5kcyBjZGsuQ29uc3RydWN0IHtcblxuICAgIHB1YmxpYyByZWFkb25seSBob3N0aW5nQnVja2V0OiBzMy5JQnVja2V0O1xuXG4gICAgcHVibGljIHJlYWRvbmx5IGFzc2V0QnVja2V0OiBzMy5JQnVja2V0O1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5Db25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgICAgICB0aGlzLmhvc3RpbmdCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsICdXZWJIb3N0aW5nQnVja2V0Jywge1xuICAgICAgICAgICAgZW5jcnlwdGlvbjogczMuQnVja2V0RW5jcnlwdGlvbi5TM19NQU5BR0VELFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFzc2V0QnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCAnQXNzZXRCdWNrZXQnLCB7XG4gICAgICAgICAgICBlbmNyeXB0aW9uOiBzMy5CdWNrZXRFbmNyeXB0aW9uLlMzX01BTkFHRUQsXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=
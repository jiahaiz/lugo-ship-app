import boto3
import os
import json


def handler(event, context):
    print(event)
    print("from python service")
    body = json.loads(event['body'])
    table_name = os.environ['DYNAMO_DB_TABLE']
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(table_name)
    # created a router to handle get, post , put , delete method
    # currently just for testing
    response = table.put_item(
        Item={
            "PK": body['PK'],
            "SK": body['SK']
        }
    )

    return response

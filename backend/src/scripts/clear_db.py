import boto3
from src.core.settings import settings


def clear_database():
    print(
        f"Connecting to DynamoDB table: {settings.DYNAMODB_TABLE} in region: {settings.AWS_REGION}"
    )

    dynamodb = boto3.resource(
        "dynamodb",
        region_name=settings.AWS_REGION,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    )
    table = dynamodb.Table(settings.DYNAMODB_TABLE)

    # 1. Scan for all IDs
    print("Scanning for all items...")
    response = table.scan(ProjectionExpression="id")
    items = response.get("Items", [])

    if not items:
        print("Table is already empty.")
        return

    print(f"Found {len(items)} items. Starting deletion...")

    # 2. Delete each item
    # Note: For large tables, batch_writer is more efficient
    with table.batch_writer() as batch:
        for item in items:
            batch.delete_item(Key={"id": item["id"]})

    print("Done! All entries have been deleted.")


if __name__ == "__main__":
    confirm = input("Are you sure you want to delete ALL entries in the table? (y/n): ")
    if confirm.lower() == "y":
        clear_database()
    else:
        print("Operation cancelled.")

import boto3
from botocore.exceptions import ClientError
from app.core.config import settings
from app.schemas import Incident

class SRDatabase:
    def __init__(self):
        # We explicitly pass credentials if they exist in settings, 
        # otherwise boto3 falls back to environment variables/roles automatically.
        self.dynamodb = boto3.resource(
            'dynamodb', 
            region_name=settings.AWS_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
        )
        self.table = self.dynamodb.Table(settings.DYNAMODB_TABLE)

    def create_incident(self, incident: Incident) -> Incident:
        """
        Save a new incident to DynamoDB.
        """
        try:
            # Convert Pydantic model to dict, exclude None to avoid DynamoDB errors
            item = incident.model_dump(by_alias=True, exclude_none=True)
            self.table.put_item(Item=item)
            return incident
        except ClientError as e:
            print(f"Error saving incident: {e}")
            raise e

    def get_incidents(self) -> list[Incident]:
        """
        Scan table for all incidents (For PoC only. In prod, use Query).
        """
        try:
            response = self.table.scan()
            items = response.get('Items', [])
            return [Incident(**item) for item in items]
        except ClientError as e:
            print(f"Error fetching incidents: {e}")
            return []

db = SRDatabase()

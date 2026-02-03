import boto3
from botocore.exceptions import ClientError
from src.core.settings import settings
from src.models.incident import Incident


class SRDatabase:
    def __init__(self):
        self.dynamodb = boto3.resource(
            "dynamodb",
            region_name=settings.AWS_REGION,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        )
        self.table = self.dynamodb.Table(settings.DYNAMODB_TABLE)

    def create_incident(self, incident: Incident) -> Incident:
        try:
            item = incident.model_dump(by_alias=True, exclude_none=True)

            # Convert any floats to Decimal (DynamoDB requirement)
            item = self._ensure_decimal(item)

            self.table.put_item(Item=item)
            return incident
        except ClientError as e:
            print(f"Error saving incident: {e}")
            raise e

    def _ensure_decimal(self, obj):
        from decimal import Decimal

        if isinstance(obj, float):
            return Decimal(str(obj))
        if isinstance(obj, dict):
            return {k: self._ensure_decimal(v) for k, v in obj.items()}
        if isinstance(obj, list):
            return [self._ensure_decimal(v) for v in obj]
        return obj

    def get_incidents(self, severity: str = None, module: str = None) -> list[Incident]:
        try:
            response = self.table.scan()
            items = response.get("Items", [])
            incidents = [Incident(**item) for item in items]

            if severity:
                incidents = [
                    i for i in incidents if getattr(i, "aiSeverity", None) == severity
                ]
            if module:
                incidents = [i for i in incidents if i.module == module]

            return incidents
        except Exception as e:
            print(f"Error fetching incidents: {e}")
            return []

    def get_incident_by_id(self, incident_id: str) -> Incident | None:
        try:
            response = self.table.get_item(Key={"id": incident_id})
            item = response.get("Item")
            if item:
                return Incident(**item)
            return None
        except Exception as e:
            print(f"Error getting incident: {e}")
            return None

    def update_status(self, incident_id: str, status: str) -> bool:
        try:
            self.table.update_item(
                Key={"id": incident_id},
                UpdateExpression="set #s = :s",
                ExpressionAttributeNames={"#s": "status"},
                ExpressionAttributeValues={":s": status},
            )
            return True
        except Exception as e:
            print(f"Error updating status: {e}")
            return False


db = SRDatabase()

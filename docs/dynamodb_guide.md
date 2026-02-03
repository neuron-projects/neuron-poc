# DynamoDB: Concepts & Setup Guide

This guide covers the core concepts of Amazon DynamoDB and provides step-by-step instructions to set up the `NeuronIncidents` table required for this project.

---

## 📚 Core Concepts

### 1. What is DynamoDB?
DynamoDB is a **NoSQL, Serverless Key-Value database**.
*   **NoSQL**: Flexible schema. You don't define every column upfront. Only the Primary Key is mandatory.
*   **Serverless**: AWS manages the servers. You just create a table and read/write data.
*   **Performance**: Designed for consistent single-digit millisecond latency at any scale.

### 2. Key Components
*   **Table**: A collection of data (e.g., `NeuronIncidents`). Similar to a table in SQL.
*   **Item**: A single record in the table (e.g., one specific Incident). Similar to a "Row" in SQL or a "JSON object" in MongoDB.
*   **Attribute**: A data element (e.g., `Title`, `Severity`). Similar to a "Column".

### 3. Primary Key (PK)
This is the most critical concept. It uniquely identifies an item.
*   **Partition Key (HASH)**: A simple ID (e.g., `IncidentID`). DynamoDB uses this value to determine which physical partition stores the data.
*   **Composite Key (HASH + RANGE)**: A combination of two attributes (e.g., `CustomerID` + `OrderDate`). Useful for sorting data within a partition.

**For Neuron**, we use a simple Partition Key: `id` (String).

---

## 🚀 Setup Guide: Creating the Table

Follow these steps to create the table for the Neuron PoC.

### Step 1: Login to AWS Console
1.  Go to [aws.amazon.com](https://aws.amazon.com).
2.  Sign in to your account.
3.  Ensure you are in the region `us-east-1` (N. Virginia) or match the `AWS_REGION` in your `.env` file.

### Step 2: Navigate to DynamoDB
1.  In the top search bar, type `DynamoDB`.
2.  Click **DynamoDB** from the results.

### Step 3: Create Table
1.  Click the orange **Create table** button.
2.  **Table details**:
    *   **Table name**: `NeuronIncidents` (Must match `DYNAMODB_TABLE` in `.env`)
    *   **Partition key**: `id` (Type: `String`)
    *   Leave **Sort key** blank (Optional).
3.  **Table settings**:
    *   Select **Customize settings** (recommended for learning) or keep Default.
    *   **Read/Write capacity settings**:
        *   Select **On-demand**: Perfect for PoCs. You pay only for what you use ($1.25 per million writes).
        *   *Alternative*: **Provisioned** (Free Tier eligible). Set Read/Write capacity units to 5.
4.  **Tags (Optional)**: Add `Project: Neuron`.
5.  Click **Create table**.

### Step 4: Verify
1.  Wait for the table status to change from `Creating` to `Active`.
2.  Click on the table name `NeuronIncidents`.
3.  Click **Explore table items** (top right) to view or query data.

---

## 💡 Accessing from Local Machine

To allow your local Python backend to talk to this cloud table:

1.  **Create IAM User**:
    *   Go to **IAM** > **Users** > **Create user**.
    *   Name: `neuron-local-dev`.
    *   Permissions: Attach policies directly > `AmazonDynamoDBFullAccess` (or specific scoping).
    *   Create access keys: User details > Security credentials > Create access key (CLI/Local).
    
2.  **Configure Environment**:
    *   Copy the `Access Key ID` and `Secret Access Key`.
    *   Export them in your terminal running the backend:
        ```bash
        export AWS_ACCESS_KEY_ID=AKIA...
        export AWS_SECRET_ACCESS_KEY=wJalr...
        export AWS_REGION=us-east-1
        ```

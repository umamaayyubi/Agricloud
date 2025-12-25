const express = require("express");
const cors = require("cors");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand
} = require("@aws-sdk/lib-dynamodb");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ===== DynamoDB config =====
const REGION = process.env.AWS_REGION || "us-east-1";
const STORAGE_TABLE = process.env.STORAGE_TABLE || "AgriCloud_storage";
const WEATHER_TABLE = process.env.WEATHER_TABLE || "AgriCloud_weather";

const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

// ===== Login (simple mock) =====
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing credentials" });
  return res.json({ token: "demo-token" });
});

// ===== Weather from AgriCloud_weather table =====
app.get("/api/weather", async (req, res) => {
  try {
    // Simple pattern: Get single item with PK = "WEATHER#DEFAULT"
    const command = new GetCommand({
      TableName: WEATHER_TABLE,
      Key: {
        PK: "WEATHER#DEFAULT",
        SK: "CURRENT"
      }
    });

    const data = await ddbDocClient.send(command);

    if (data.Item) {
      res.json({
        location: data.Item.Location || "Demo Farm",
        temperature: data.Item.Temperature || 30,
        condition: data.Item.Condition || "Sunny"
      });
    } else {
      // Fallback if no data exists
      res.json({
        location: "Demo Farm",
        temperature: 30,
        condition: "Sunny"
      });
    }
  } catch (err) {
    console.error("Error reading weather from DynamoDB:", err);
    res.status(500).json({ error: "Failed to load weather" });
  }
});

// ===== Storage from AgriCloud_storage table =====
app.get("/api/storage", async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: STORAGE_TABLE
    });

    const data = await ddbDocClient.send(command);

    const items = (data.Items || [])
      .filter((i) => i.PK && i.PK.startsWith("STORAGE#"))
      .map((i) => ({
        id: i.Id,
        crop: i.Crop,
        quantityTons: i.QuantityTons,
        location: i.Location
      }));

    res.json(items);
  } catch (err) {
    console.error("Error reading storage from DynamoDB:", err);
    res.status(500).json({ error: "Failed to load storage" });
  }
});

// ===== Add storage item to AgriCloud_storage =====
app.post("/api/storage", async (req, res) => {
  const { crop, quantityTons, location } = req.body;
  if (!crop || !quantityTons || !location) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const id = Date.now().toString();
  const item = {
    PK: "STORAGE#DEFAULT",
    SK: `ITEM#${id}`,
    Id: id,
    Crop: crop,
    QuantityTons: quantityTons,
    Location: location
  };

  try {
    const command = new PutCommand({
      TableName: STORAGE_TABLE,
      Item: item
    });

    await ddbDocClient.send(command);
    res.status(201).json({
      id,
      crop,
      quantityTons,
      location
    });
  } catch (err) {
    console.error("Error writing storage to DynamoDB:", err);
    res.status(500).json({ error: "Failed to save storage" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


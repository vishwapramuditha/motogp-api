# 🏍️ MotoGP Community API

Welcome to the **MotoGP Community API**, a free and open-source project designed to empower developers, fans, and creators to build amazing MotoGP applications.

Whether you are building a **Discord Bot**, a **Fan Website**, or a **Mobile App**, this API provides the data you need.

## 🚀 Features

- **Riders & Teams**: Detailed rosters with stats.
- **Schedule**: Full calendar with session times (FP1, Quali, Sprint, Race).
- **Standings**: Live championship points.
- **Tracks**: Circuit details and layouts.
- **Premium Dashboard**: A built-in web portal to view data and upcoming races.
- **Secure**: API Key authentication enabled.

## 🛠️ Getting Started

### Prerequisites
- Node.js installed.

### Installation
1. Clone the repo.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Visit `http://localhost:3000` to see the **Developer Dashboard**.

## 🔑 API Keys
This API is secured. You need an API Key to fetch data.
- **Demo Key**: `demo-key`

**Example Request:**
```http
GET /api/riders?api_key=demo-key
```

## 🔮 Future Roadmap
We have big plans for the future of this project!
- [ ] **Real-time Updates**: Live timing integration via WebSockets.
- **Historical Data**: Archive of past seasons (2020-2023).
- **User Accounts**: Generate your own private API keys.
- **GraphQL Support**: For more flexible queries.

## ⚖️ License & Credits
This data is provided **Free to Use** for the community.

**Created by:** [Vishwa Pramuditha]
*Dedicated to all MotoGP Fans around the world.*

---
*Disclaimer: This is a community project and is not officially affiliated with Dorna Sports or MotoGP.*

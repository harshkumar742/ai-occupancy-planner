# AI-Enhanced Real-Time Occupancy Planning System

An Express.js API that recommends desks based on natural-language queries, integrating OpenAI-powered NLP, real-time occupancy data, and organizational policies.

---

## Prerequisites

- **Node.js** v18 or higher
- **OpenAI API Key** (for NLP parsing)

## Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/harshkumar742/ai-occupancy-planner.git
   cd ai-occupancy-planner
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

Add your openai api key in `.env` file in the project root:

   ```bash
    OPENAI_API_KEY=your_openai_api_key_here
   ```

## Running the Application

Start the server:

   ```bash
    npm start
   ```

The API will listen on `http://localhost:3000`

## API Documentation

Interactive docs powered by Swagger are available at:

   ```bash
    http://localhost:3000/docs
   ```

## Usage

### POST /api/match

Recommend desks based on a natural-language query.

- **Endpoint:** `/api/match`
- **Method:** `POST`
- **Request Body:** JSON

    ```json
    {
        "employeeId": "", // optional
        "query": "Find me an available standing desk near the marketing team on the 3rd floor." // required
    }
    ```
- **Response Body:**

    ```json
    {
        "success": true,
        "message": "Found 1 desk",
        "data": [
            {
                "id": "D-304",
                "type": "standing",
                "area_id": "area-002",
                "vergesense_area_id": "area-002",
                "floor": 3,
                "zone": "Marketing Zone",
                "location_description": "Near breakout area",
                "features": [
                    "dual-monitors",
                    "ergonomic-chair",
                    "adjustable-height"
                ],
                "status": "available",
                "last_used": "2025-05-06T16:45:00Z"
            }
        ]
    }
    ```


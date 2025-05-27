import dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const DEFAULT_PARSED = {
    team: "",
    desk_preferences: [],
    equipment_needs: [],
    preferred_days: [],
    preferred_location: "",
    accessibility_needs: null,
    adjacency_preferences: []
};

export async function parseQuery(q) {
    const prompt = `
  Return JSON with exactly these fields from the user’s text:
  {
    "desk_preferences": string[],         // e.g. ["standing","near-window"]
    "equipment_needs": string[],          // e.g. ["dual-monitors","ergonomic-chair"]
    "preferred_days": string[],           // e.g. ["Monday","Wednesday"]
    "preferred_location": string,         // e.g. "3rd Floor"
    "accessibility_needs": string|null,   // e.g. "wheelchair" or null
    "adjacency_preferences": string[]     // e.g. ["marketing team","design team"]
  }
  Text: """${q}"""
  `;
    let raw;
    try {
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }]
        });
        // 1. Grab the assistant’s reply and trim whitespace
        let jsonText = completion.choices[0].message.content.trim();

        // 2. If it’s wrapped in ``` or ```json fences, strip them out:
        if (jsonText.startsWith("```")) {
            // remove leading ```json (or ```) and trailing ```
            jsonText = jsonText
                .replace(/^```(?:json)?\r?\n/, "")
                .replace(/\r?\n```$/, "")
                .trim();
        }

        // 3. Now safe to parse
        raw = JSON.parse(jsonText);

    } catch (err) {
        console.warn("parseQuery failed, falling back to defaults:", err);
        raw = {};
    }

    return {
        team: typeof raw.team === "string" ? raw.team : DEFAULT_PARSED.team,
        desk_preferences: Array.isArray(raw.desk_preferences)
            ? raw.desk_preferences
            : DEFAULT_PARSED.desk_preferences,
        equipment_needs: Array.isArray(raw.equipment_needs)
            ? raw.equipment_needs
            : DEFAULT_PARSED.equipment_needs,
        preferred_days: Array.isArray(raw.preferred_days)
            ? raw.preferred_days
            : DEFAULT_PARSED.preferred_days,
        preferred_location: typeof raw.preferred_location === "string"
            ? raw.preferred_location
            : DEFAULT_PARSED.preferred_location,
        accessibility_needs:
            raw.accessibility_needs === null ||
                typeof raw.accessibility_needs === "string"
                ? raw.accessibility_needs
                : DEFAULT_PARSED.accessibility_needs,
        adjacency_preferences: Array.isArray(raw.adjacency_preferences)
            ? raw.adjacency_preferences
            : DEFAULT_PARSED.adjacency_preferences
    };
}
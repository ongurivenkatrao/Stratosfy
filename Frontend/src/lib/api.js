// src/lib/api.js
export async function fetchReadings() {
  try {
    const res = await fetch("/api/devices"); // ✅ no hardcoded port
    if (!res.ok) {
      throw new Error("Failed to fetch devices");
    }
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}

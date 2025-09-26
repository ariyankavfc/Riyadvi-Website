// src/api.js
import API_BASE from "./config";

/**
 * Build a public URL for an uploaded file saved as a relative path
 * (e.g. 'uploads/resumes/john.pdf' or 'resumes/john.pdf').
 * Backend serves uploaded files at: /api/uploads/<path>
 */
export function uploadUrlFromPath(savedPath) {
  if (!savedPath) return null;
  // Remove leading "uploads/" if present so final becomes /api/uploads/<remaining>
  const cleaned = savedPath.replace(/^\/?uploads\/?/, "");
  // API_BASE might include /api, so using it directly:
  return `${API_BASE.replace(/\/api$/, "")}/api/uploads/${cleaned}`;
}

/**
 * Generic fetch wrapper for JSON endpoints with simple error handling
 */
export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API GET ${path} failed: ${res.status} - ${text}`);
  }
  return res.json();
}

export async function apiPostJson(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API POST ${path} failed: ${res.status} - ${text}`);
  }
  return res.json();
}

export async function apiPostFormData(path, formData) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API FORM POST ${path} failed: ${res.status} - ${text}`);
  }
  return res.json();
}

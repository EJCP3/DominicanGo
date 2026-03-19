export const TYPE_LABELS: Record<string, string> = {
    playa: "Playa",
    naturaleza: "Naturaleza",
    aventura: "Aventura",
    cultura: "Cultura",
    museo: "Museo",
    comida: "Gastronomía",
    parque: "Parque",
    tienda: "Compras",
    montana: "Montaña",
};

export const TYPE_COLORS: Record<string, string> = {
    playa: "#0ea5e9",
    naturaleza: "#22c55e",
    aventura: "#f97316",
    cultura: "#8b5cf6",
    museo: "#6366f1",
    comida: "#f43f5e",
    parque: "#10b981",
    tienda: "#ec4899",
    montana: "#059669",
};

export const REGION_COLORS: Record<string, string> = {
    "Norte / Cibao": "#22c55e",
    "Sur": "#f59e0b",
    "Este": "#0ea5e9",
    "Suroeste": "#f97316",
    "Gran Santo Domingo": "#8b5cf6",
};

export const DEFAULT_HOURS: Record<string, { weekdays: string; weekend: string }> = {
    playa: { weekdays: "24 horas", weekend: "24 horas" },
    naturaleza: { weekdays: "6:00 AM - 6:00 PM", weekend: "6:00 AM - 6:00 PM" },
    aventura: { weekdays: "8:00 AM - 5:00 PM", weekend: "8:00 AM - 5:00 PM" },
    cultura: { weekdays: "9:00 AM - 6:00 PM", weekend: "9:00 AM - 4:00 PM" },
    museo: { weekdays: "9:00 AM - 5:00 PM", weekend: "10:00 AM - 4:00 PM" },
    comida: { weekdays: "11:00 AM - 11:00 PM", weekend: "11:00 AM - 12:00 AM" },
    parque: { weekdays: "6:00 AM - 8:00 PM", weekend: "6:00 AM - 8:00 PM" },
    tienda: { weekdays: "9:00 AM - 8:00 PM", weekend: "10:00 AM - 6:00 PM" },
    montana: { weekdays: "24 horas", weekend: "24 horas" },
};

export const TIPOS: string[] = [
    "playa",
    "naturaleza",
    "aventura",
    "cultura",
    "museo",
    "comida",
    "parque",
    "tienda",
    "montana",
];

export const ICONS: Record<string, string> = {
    playa: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>`,
    naturaleza: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>`,
    aventura: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A4 4 0 002 9.428V19a2 2 0 002 2h14a2 2 0 002-2v-8.664M9 13l3 2m3 2h0"></path></svg>`,
    cultura: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`,
    museo: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`,
    comida: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"></path></svg>`,
    parque: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>`,
    tienda: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>`,
    montana: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>`,
};

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
    playa: `<svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" idth="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-beach"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" /><path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196" /><path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" /><path d="M15 9l-3 5.196" /><path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" /></svg>`,
    naturaleza: ` <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-plant"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 15h10v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2v-4" /><path d="M12 9a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" /><path d="M12 11a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" /><path d="M12 15l0 -6" /></svg>`,
    aventura: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trekking"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 4a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M7 21l2 -4" /><path d="M13 21v-4l-3 -3l1 -6l3 4l3 2" /><path d="M10 14l-1.827 -1.218a2 2 0 0 1 -.831 -2.15l.28 -1.117a2 2 0 0 1 1.939 -1.515h1.439l4 1l3 -2" /><path d="M17 12v9" /><path d="M16 20h2" /></svg>`,
    cultura: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`,
    museo: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>`,
    comida: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-burger"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 15h16a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4" /><path d="M12 4c3.783 0 6.953 2.133 7.786 5h-15.572c.833 -2.867 4.003 -5 7.786 -5" /><path d="M5 12h14" /></svg>`,
    parque: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-fountain"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 16v-5a2 2 0 1 0 -4 0" /><path d="M15 16v-5a2 2 0 1 1 4 0" /><path d="M12 16v-10a3 3 0 0 1 6 0" /><path d="M6 6a3 3 0 0 1 6 0" /><path d="M3 16h18v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2" /></svg>`,
    tienda: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>`,
    montana: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-mountain"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 20h18l-6.921 -14.612a2.3 2.3 0 0 0 -4.158 0l-6.921 14.612" /><path d="M7.5 11l2 2.5l2.5 -2.5l2 3l2.5 -2" /></svg>`,
};

// Helper: slugify a string
export const slugify = (s: string) =>
    s.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

// Helper: imagen por seed determinista (usado por el mapper si falta imagen)
export const img = (seed: string) => `https://picsum.photos/seed/${seed}/600/400`;

// Estructura base de las provincias (sin los puntos de interés)
export const baseProvinces: Record<string, any> = {
    "santo-domingo": {
        name: "Santo Domingo", region: "Sur",
        description: "La capital vibrant y llena de historia, donde el pasado colonial se encuentra con la vida moderna del Caribe.",
        color: "#4a90d9", pois: []
    },
    "la-altagracia": {
        name: "La Altagracia", region: "Este",
        description: "Hogar de Punta Cana, el destino turístico más famoso del Caribe con playas paradisíacas.",
        color: "#e8c547", pois: []
    },
    "puerto-plata": {
        name: "Puerto Plata", region: "Norte",
        description: "La Costa de Ámbar, con playas doradas, montañas verdes y el encanto de una ciudad victoriana.",
        color: "#e67e22", pois: []
    },
    "samana": {
        name: "Samaná", region: "Noreste",
        description: "Naturaleza virgen, ballenas jorobadas y las playas más espectaculares del país.",
        color: "#27ae60", pois: []
    },
    "santiago": {
        name: "Santiago", region: "Norte",
        description: "La Ciudad Corazón, segunda ciudad más grande, centro cultural y capital del tabaco.",
        color: "#8e44ad", pois: []
    },
    "la-romana": {
        name: "La Romana", region: "Este",
        description: "Lujo caribeño con campos de golf, marinas exclusivas y la artística Altos de Chavón.",
        color: "#c0392b", pois: []
    },
    "barahona": {
        name: "Barahona", region: "Sur",
        description: "La Perla del Sur. Donde las montañas se encuentran con el mar en paisajes dramáticos.",
        color: "#16a085", pois: []
    },
    "la-vega": {
        name: "La Vega", region: "Norte",
        description: "Corazón cultural del Cibao con el mejor carnaval del país y naturaleza exuberante.",
        color: "#2980b9", pois: []
    },
    "pedernales": {
        name: "Pedernales", region: "Sur",
        description: "El último paraíso virgen del Caribe con ecosistemas únicos y belleza natural incomparable.",
        color: "#1abc9c", pois: []
    },
    "monte-cristi": {
        name: "Monte Cristi", region: "Noroeste",
        description: "El Morro y los cayos, historia de piratas y el salvaje noroeste dominicano.",
        color: "#d35400", pois: []
    },
    "azua": {
        name: "Azua", region: "Sur",
        description: "Tierra de historia y naturaleza, con playas tranquilas y montañas imponentes al sur del país.",
        color: "#c0d8e8", pois: []
    },
    "bahoruco": {
        name: "Bahoruco", region: "Sur",
        description: "Provincia de naturaleza virgen con picos montañosos y biodiversidad excepcional.",
        color: "#a0c8d8", pois: []
    },
    "dajabon": {
        name: "Dajabón", region: "Noroeste",
        description: "La provincia fronteriza por excelencia, puerta de comercio y cultura binacional.",
        color: "#b8cce0", pois: []
    },
    "duarte": {
        name: "Duarte", region: "Noreste",
        description: "La cuna del arroz dominicano, con paisajes tropicales y ríos de aguas cristalinas.",
        color: "#f8a0a0", pois: []
    },
    "elias-pina": {
        name: "Elías Piña", region: "Oeste",
        description: "Frontera y montaña, una provincia de contrastes entre la selva y el límite fronterizo.",
        color: "#c8d8e8", pois: []
    },
    "el-seibo": {
        name: "El Seibo", region: "Este",
        description: "Tierras ganaderas y de caña, con ríos, cuevas y la tranquilidad del oriente dominicano.",
        color: "#a0d0c0", pois: []
    },
    "espaillat": {
        name: "Espaillat", region: "Norte",
        description: "El municipio de Moca, tierra de cacaos, cafés y el famoso dulce de coco espaillateño.",
        color: "#f4b8b0", pois: []
    },
    "hato-mayor": {
        name: "Hato Mayor", region: "Este",
        description: "Territorio ganadero con ríos, cuevas y acceso a reservas naturales del este dominicano.",
        color: "#f0c8a0", pois: []
    },
    "hermanas-mirabal": {
        name: "Hermanas Mirabal", region: "Norte",
        description: "Homenaje eterno a las Mariposas, tierra de cacao, naturaleza y memoria histórica.",
        color: "#f47fb0", pois: []
    },
    "independencia": {
        name: "Independencia", region: "Sur",
        description: "Lago salado, iguanas gigantes y el parque nacional más grande del Caribe en su frontera.",
        color: "#c0b8d8", pois: []
    },
    "maria-trinidad-sanchez": {
        name: "María Trinidad Sánchez", region: "Noreste",
        description: "Costa atlántica salvaje con playas escondidas, manglares y acceso al Parque Los Haitises.",
        color: "#88d4bc", pois: []
    },
    "monsenor-nouel": {
        name: "Monseñor Nouel", region: "Norte",
        description: "Corazón del país, con ríos navegables, presa y conexión con la cordillera Central.",
        color: "#e8d4a0", pois: []
    },
    "monte-plata": {
        name: "Monte Plata", region: "Este",
        description: "Parque Los Haitises y una naturaleza exuberante de ríos, cuevas y manglares únicos.",
        color: "#d4c4e8", pois: []
    },
    "peravia": {
        name: "Peravia", region: "Sur",
        description: "Dunas de arena únicas en el Caribe, playas tranquilas y la alegre ciudad de Baní.",
        color: "#b4e0c8", pois: []
    },
    "san-cristobal": {
        name: "San Cristóbal", region: "Sur",
        description: "La cuna de la Constitución dominicana de 1844, con cuevas, playas y montañas.",
        color: "#d4dca0", pois: []
    },
    "san-jose-de-ocoa": {
        name: "San José de Ocoa", region: "Sur",
        description: "La tierra del aguacate y el café de altura, con cascadas y ecoturismo de montaña.",
        color: "#e8c8d0", pois: []
    },
    "san-juan": {
        name: "San Juan", region: "Oeste",
        description: "San Juan de la Maguana, portal al suroeste con el misterioso Corral de los Indios.",
        color: "#f0d870", pois: []
    },
    "san-pedro-de-macoris": {
        name: "San Pedro de Macorís", region: "Este",
        description: "La cuna del béisbol dominicano y de grandes jugadores de Grandes Ligas.",
        color: "#ccdcc4", pois: []
    },
    "santiago-rodriguez": {
        name: "Santiago Rodríguez", region: "Noroeste",
        description: "Tabaco artesanal, ríos salvajes y el Parque Nacional Nalga de Maco en las alturas del noroeste.",
        color: "#c8b4dc", pois: []
    },
    "valverde": {
        name: "Valverde", region: "Noroeste",
        description: "Tierra de arroz y plantaciones, capital del Noroeste con paisajes agrícolas únicos.",
        color: "#b8d4a0", pois: []
    },
    "distrito-nacional": {
        name: "Distrito Nacional", region: "Sur",
        description: "Santo Domingo, el corazón político y cultural de la nación dominicana.",
        color: "#e8a898", pois: []
    },
    "sanchez-ramirez": {
        name: "Sánchez Ramírez", region: "Norte",
        description: "Tierra del ámbar azul y la caoba, provincia central con ríos y tradiciones campesinas.",
        color: "#a8d8b0", pois: []
    },
    "salcedo": {
        name: "Hermanas Mirabal", region: "Norte",
        description: "Homenaje eterno a las Mariposas, tierra de cacao, naturaleza y memoria histórica.",
        color: "#f47fb0", pois: []
    }
};

/**
 * Realiza el fetch de destinos a la API backend.
 */
export const getDestinations = async () => {
    try {
        const url = import.meta.env.PUBLIC_API_URL 
            ? `${import.meta.env.PUBLIC_API_URL}/destinations?limit=50` 
            : 'http://localhost:3000/api/destinations?limit=50';
            
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        
        const json = await res.json();
        return json.success ? json.data : [];
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return [];
    }
};

/**
 * Realiza el fetch de blogs a la API backend.
 */
export const getBlogs = async (params: Record<string, string | number> = {}) => {
    try {
        const url = new URL(
            import.meta.env.PUBLIC_API_URL
                ? `${import.meta.env.PUBLIC_API_URL}/blogs`
                : 'http://localhost:3000/api/blogs'
        );
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value));
            }
        });

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

        const json = await res.json();
        return json.success ? json : { data: [], meta: {} };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { data: [], meta: {} };
    }
};

/**
 * Función adaptadora (Mapper)
 * Devuelve un objeto idéntico al antiguo provinces.js combinando
 * las provincias base con los destinos dinámicos.
 */
export const getProvincesWithDestinations = async () => {
    // 1. Clona la base para no mutar el original y crea arreglos limpios
    const mapped = JSON.parse(JSON.stringify(baseProvinces));
    
    // 2. Obtiene los destinos de la API
    const destinations = await getDestinations();
    
    // 3. Los inserta en su respectiva provincia
    destinations.forEach((dest: any) => {
        // En la BD de la API (Prisma), el ID de la provincia suele ser su slug
        const provSlug = dest.provinceId || dest.province?.id;
        
        if (provSlug && mapped[provSlug]) {
            // Mapeamos el destino de Prisma al formato de Vue (poi)
            mapped[provSlug].pois.push({
                id: dest.id,
                name: dest.name,
                type: dest.type,
                tags: dest.tags || [],
                price: dest.price,
                description: dest.description,
                image: dest.image || img(dest.slug || 'default'),
                images: dest.images || [],
                hours: { 
                    weekdays: dest.hoursWeekdays || "", 
                    weekend: dest.hoursWeekend || "" 
                },
                website: dest.website || null,
                slug: dest.slug // Added id and slug since Vue apps often need unique keys
            });
        }
    });
    
    return mapped;
};

/**
 * Server-side: Obtiene el usuario actual enviando el JWT como Bearer token.
 * Usar SOLO en el frontmatter de Astro (.astro files, server-side).
 * El token viene de Astro.cookies.get('auth_token')?.value
 */
export const getUser = async (token: string | undefined | null) => {
    if (!token) return null;
    try {
        const apiBase = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${apiBase}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json.success ? json.data : null;
    } catch {
        return null;
    }
};

/**
 * Server-side: Obtiene los IDs de los favoritos del usuario como un Set.
 * Usar en frontmatter de Astro para hidratar initialState de BotonFavorito.
 * Devuelve { destinationIds: Set<string>, blogIds: Set<string> }
 */
export const getFavoriteIds = async (token: string | undefined | null) => {
    const empty = { destinationIds: new Set<string>(), blogIds: new Set<string>() };
    if (!token) return empty;
    try {
        const apiBase = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';
        const res = await fetch(`${apiBase}/favorites`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return empty;
        const json = await res.json();
        const favorites: any[] = json.data ?? [];
        const destinationIds = new Set<string>(
            favorites.filter((f: any) => f.type === 'DESTINATION' && f.destinationId).map((f: any) => f.destinationId)
        );
        const blogIds = new Set<string>(
            favorites.filter((f: any) => f.type === 'BLOG' && f.blogId).map((f: any) => f.blogId)
        );
        return { destinationIds, blogIds };
    } catch {
        return empty;
    }
};



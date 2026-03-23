// Helper: imagen por seed determinista
const img = (seed) => `https://picsum.photos/seed/${seed}/600/400`;

// Slug a partir del nombre del POI
export const slugify = (s) =>
    s.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export const provinces = {
    "santo-domingo": {
        name: "Santo Domingo", region: "Sur",
        description: "La capital vibrant y llena de historia, donde el pasado colonial se encuentra con la vida moderna del Caribe.",
        color: "#4a90d9",
        pois: [
            { name: "Zona Colonial", type: "museo", tags: ["historia", "patrimonio", "arquitectura", "cultura"], price: "gratis", description: "Patrimonio de la Humanidad UNESCO. Primera ciudad del Nuevo Mundo con calles empedradas y arquitectura del siglo XVI.", image: img("zona-colonial"), images: [img("zona-colonial-2"), img("zona-colonial-3"), img("zona-colonial-4")], hours: { weekdays: "Lun–Vie 8:30 – 18:00", weekend: "Sáb–Dom 9:00 – 17:00" }, website: "https://www.ministeriodecultura.gob.do" },
            { name: "Malecón de Santo Domingo", type: "parque", tags: ["paseo", "costa", "atardecer", "ciudad"], price: "gratis", description: "El emblemático paseo marítimo, perfecto para caminar al atardecer con vista al Mar Caribe.", image: img("malecon-sd"), images: [img("malecon-sd-2"), img("malecon-sd-3"), img("malecon-sd-4")], hours: { weekdays: "Abierto 24 horas", weekend: "Abierto 24 horas" }, website: null },
            { name: "Los Tres Ojos", type: "naturaleza", tags: ["cueva", "lago", "ecoturismo", "aventura"], price: "pagado", description: "Impresionante sistema de cuevas con tres lagos subterráneos de aguas cristalinas.", image: img("tres-ojos"), images: [img("tres-ojos-2"), img("tres-ojos-3"), img("tres-ojos-4")], hours: { weekdays: "Mar–Vie 9:00 – 17:00", weekend: "Sáb–Dom 9:00 – 16:00" }, website: null }
        ]
    },
    "la-altagracia": {
        name: "La Altagracia", region: "Este",
        description: "Hogar de Punta Cana, el destino turístico más famoso del Caribe con playas paradisíacas.",
        color: "#e8c547",
        pois: [
            { name: "Playa Bávaro", type: "playa", tags: ["arena blanca", "resort", "snorkel", "familia"], price: "gratis", description: "Arena blanca interminable y aguas turquesas. Considerada una de las mejores playas del mundo.", image: img("playa-bavaro") },
            { name: "Isla Saona", type: "playa", tags: ["isla", "piscina natural", "coral", "naturaleza"], price: "pagado", description: "Isla paradisíaca con piscinas naturales, estrellas de mar y manglares vírgenes.", image: img("isla-saona") },
            { name: "Hoyo Azul", type: "naturaleza", tags: ["cenote", "aventura", "natación", "ecoturismo"], price: "pagado", description: "Cenote natural de aguas azul intenso rodeado de acantilados y vegetación tropical.", image: img("hoyo-azul") }
        ]
    },
    "puerto-plata": {
        name: "Puerto Plata", region: "Norte",
        description: "La Costa de Ámbar, con playas doradas, montañas verdes y el encanto de una ciudad victoriana.",
        color: "#e67e22",
        pois: [
            { name: "Teleférico Pico Isabel de Torres", type: "aventura", tags: ["teleférico", "mirador", "montaña", "naturaleza"], price: "pagado", description: "El único teleférico del Caribe, con vistas panorámicas espectaculares y un jardín botánico en la cima.", image: img("teleferico-pp") },
            { name: "27 Charcos de Damajagua", type: "aventura", tags: ["cascada", "canyoning", "adrenalina", "naturaleza"], price: "pagado", description: "Aventura de canyoning a través de 27 cascadas naturales en la selva tropical.", image: img("charcos-damajagua") },
            { name: "Playa Dorada", type: "playa", tags: ["resort", "deportes acuáticos", "arena dorada", "familia"], price: "gratis", description: "Hermosa playa de arena dorada con resorts de clase mundial y deportes acuáticos.", image: img("playa-dorada-pp") }
        ]
    },
    "samana": {
        name: "Samaná", region: "Noreste",
        description: "Naturaleza virgen, ballenas jorobadas y las playas más espectaculares del país.",
        color: "#27ae60",
        pois: [
            { name: "Playa Rincón", type: "playa", tags: ["virgen", "cocoteros", "tranquilo", "naturaleza"], price: "gratis", description: "Considerada la playa más bella de República Dominicana. Arena blanca, cocoteros y aguas cristalinas.", image: img("playa-rincon") },
            { name: "Salto El Limón", type: "naturaleza", tags: ["cascada", "senderismo", "caballo", "aventura"], price: "pagado", description: "Majestuosa cascada de 40 metros de altura escondida en la selva tropical.", image: img("salto-limon") },
            { name: "Avistamiento de Ballenas", type: "aventura", tags: ["ballenas", "marino", "tour", "ecoturismo"], price: "pagado", description: "De enero a marzo, miles de ballenas jorobadas llegan a la bahía para reproducirse.", image: img("ballenas-samana") }
        ]
    },
    "santiago": {
        name: "Santiago", region: "Norte",
        description: "La Ciudad Corazón, segunda ciudad más grande, centro cultural y capital del tabaco.",
        color: "#8e44ad",
        pois: [
            { name: "Monumento a los Héroes", type: "museo", tags: ["monumento", "historia", "mirador", "cultura"], price: "pagado", description: "Icónico monumento de 67 metros con mirador panorámico de toda la ciudad y el Valle del Cibao.", image: img("monumento-restauracion") },
            { name: "Centro León", type: "museo", tags: ["arte", "cultura", "museo", "contemporáneo"], price: "pagado", description: "Museo de arte contemporáneo y cultura dominicana de clase mundial.", image: img("centro-leon") },
            { name: "Fábricas de Cigarros", type: "tienda", tags: ["tabaco", "recorrido", "artesanía", "cultura"], price: "pagado", description: "Recorridos por las mejores fábricas de cigarros premium del mundo en la Zona Franca.", image: img("cigarros-stgo") }
        ]
    },
    "la-romana": {
        name: "La Romana", region: "Este",
        description: "Lujo caribeño con campos de golf, marinas exclusivas y la artística Altos de Chavón.",
        color: "#c0392b",
        pois: [
            { name: "Altos de Chavón", type: "museo", tags: ["arte", "arquitectura", "galería", "cultura"], price: "pagado", description: "Villa artística de estilo mediterráneo del siglo XVI con anfiteatro, galerías y vistas al río Chavón.", image: img("altos-chavon") },
            { name: "Isla Catalina", type: "playa", tags: ["isla", "snorkel", "buceo", "coral"], price: "pagado", description: "Isla virgen con arrecifes de coral perfectos para snorkel y buceo.", image: img("isla-catalina") },
            { name: "Teeth of the Dog Golf", type: "aventura", tags: ["golf", "lujo", "deporte", "resort"], price: "pagado", description: "Campo de golf de clase mundial diseñado por Pete Dye con 7 hoyos frente al mar.", image: img("golf-romana") }
        ]
    },
    "barahona": {
        name: "Barahona", region: "Sur",
        description: "La Perla del Sur. Donde las montañas se encuentran con el mar en paisajes dramáticos.",
        color: "#16a085",
        pois: [
            { name: "Bahía de las Águilas", type: "playa", tags: ["virgen", "arena blanca", "pristino", "naturaleza"], price: "pagado", description: "8 km de arena blanca virgen y aguas turquesas. La playa más prístina del país.", image: img("bahia-aguilas") },
            { name: "Laguna de Oviedo", type: "naturaleza", tags: ["flamencos", "aves", "fauna", "ecoturismo"], price: "pagado", description: "Laguna salada con flamencos rosados, iguanas y más de 130 especies de aves.", image: img("laguna-oviedo") },
            { name: "Minas de Larimar", type: "tienda", tags: ["artesanía", "joyería", "larimar", "compras"], price: "pagado", description: "Única fuente mundial de larimar, la hermosa piedra semipreciosa azul caribeña.", image: img("larimar-barahona") }
        ]
    },
    "la-vega": {
        name: "La Vega", region: "Norte",
        description: "Corazón cultural del Cibao con el mejor carnaval del país y naturaleza exuberante.",
        color: "#2980b9",
        pois: [
            { name: "Carnaval de La Vega", type: "cultura", tags: ["carnaval", "festival", "máscaras", "tradición"], price: "gratis", description: "El carnaval más colorido y famoso de República Dominicana con sus icónicas máscaras de diablos cojuelos.", image: img("carnaval-lavega") },
            { name: "Santo Cerro", type: "naturaleza", tags: ["religioso", "peregrinación", "mirador", "historia"], price: "gratis", description: "Lugar histórico y de peregrinación con vistas panorámicas del Valle del Cibao.", image: img("santo-cerro") },
            { name: "Jarabacoa", type: "aventura", tags: ["rafting", "parapente", "senderismo", "montaña"], price: "pagado", description: "Ciudad de la eterna primavera, perfecta para rafting, parapente y senderismo.", image: img("jarabacoa") }
        ]
    },
    "pedernales": {
        name: "Pedernales", region: "Sur",
        description: "El último paraíso virgen del Caribe con ecosistemas únicos y belleza natural incomparable.",
        color: "#1abc9c",
        pois: [
            { name: "Parque Nacional Jaragua", type: "parque", tags: ["parque nacional", "fauna", "playa virgen", "ecoturismo"], price: "pagado", description: "El área protegida más grande del Caribe insular con playas vírgenes y biodiversidad única.", image: img("jaragua-parque") },
            { name: "Hoyo de Pelempito", type: "naturaleza", tags: ["geología", "mirador", "montaña", "aventura"], price: "gratis", description: "Impresionante depresión geológica rodeada de montañas con vistas que cortan la respiración.", image: img("pelempito") },
            { name: "Lago Enriquillo", type: "naturaleza", tags: ["lago", "cocodrilos", "fauna", "ecoturismo"], price: "pagado", description: "El lago más grande del Caribe, hogar de cocodrilos americanos, iguanas y flamencos.", image: img("lago-enriquillo") }
        ]
    },
    "monte-cristi": {
        name: "Monte Cristi", region: "Noroeste",
        description: "El Morro y los cayos, historia de piratas y el salvaje noroeste dominicano.",
        color: "#d35400",
        pois: [
            { name: "El Morro de Monte Cristi", type: "naturaleza", tags: ["formación rocosa", "costa", "mirador", "fotografía"], price: "gratis", description: "Icónica formación rocosa de mesa plana que se eleva dramáticamente sobre el mar.", image: img("el-morro") },
            { name: "Cayos Siete Hermanos", type: "playa", tags: ["cayo", "buceo", "coral", "naturaleza"], price: "pagado", description: "Archipiélago de 7 cayos vírgenes con playas desiertas y arrecifes de coral.", image: img("cayos-7hermanos") },
            { name: "Parque Nacional Monte Cristi", type: "parque", tags: ["manglar", "biodiversidad", "laguna", "ecoturismo"], price: "pagado", description: "Manglares, lagunas y biodiversidad marina en un ecosistema costero protegido.", image: img("parque-mc") }
        ]
    },
    "azua": {
        name: "Azua", region: "Sur",
        description: "Tierra de historia y naturaleza, con playas tranquilas y montañas imponentes al sur del país.",
        color: "#c0d8e8",
        pois: [
            { name: "Playa Monte Río", type: "playa", tags: ["tranquila", "local", "arena", "caribe"], price: "gratis", description: "Playa serena y poco concurrida con aguas cálidas del Mar Caribe, ideal para el descanso.", image: img("playa-monte-rio") },
            { name: "Puerto Viejo de Azua", type: "museo", tags: ["historia", "colonial", "patrimonio", "ruinas"], price: "gratis", description: "Sitio histórico donde se fundó una de las primeras villas de la Hispaniola española.", image: img("puerto-viejo-azua") },
            { name: "Sierra Martín García", type: "naturaleza", tags: ["montaña", "senderismo", "naturaleza", "vistas"], price: "gratis", description: "Cadena montañosa con senderos y biodiversidad única entre el mar y la sierra.", image: img("sierra-martin") }
        ]
    },
    "bahoruco": {
        name: "Bahoruco", region: "Sur",
        description: "Provincia de naturaleza virgen con picos montañosos y biodiversidad excepcional.",
        color: "#a0c8d8",
        pois: [
            { name: "Sierra de Bahoruco", type: "parque", tags: ["orquídeas", "aves", "senderismo", "parque"], price: "pagado", description: "Parque nacional con la mayor diversidad de orquídeas del Caribe y aves endémicas.", image: img("sierra-bahoruco") },
            { name: "Polo Magnético", type: "aventura", tags: ["fenómeno", "ilusión óptica", "turismo", "curioso"], price: "gratis", description: "Fascinante fenómeno donde los autos parecen subir cuesta arriba por sí solos.", image: img("polo-magnetico") },
            { name: "Lago Enriquillo (orilla)", type: "naturaleza", tags: ["lago", "flamencos", "fauna", "natural"], price: "pagado", description: "Acceso al borde del mayor lago del Caribe con vistas a cocodrilos e iguanas.", image: img("lago-bahoruco") }
        ]
    },
    "dajabon": {
        name: "Dajabón", region: "Noroeste",
        description: "La provincia fronteriza por excelencia, puerta de comercio y cultura binacional.",
        color: "#b8cce0",
        pois: [
            { name: "Mercado Binacional", type: "tienda", tags: ["mercado", "cultura", "comercio", "frontera"], price: "gratis", description: "Vibrante mercado fronterizo donde dominicanos y haitianos comercian productos únicos.", image: img("mercado-dajabon") },
            { name: "Río Masacre", type: "naturaleza", tags: ["río", "historia", "frontera", "naturaleza"], price: "gratis", description: "El río que marca la frontera entre República Dominicana y Haití con historia y naturaleza.", image: img("rio-masacre") },
            { name: "Parque Nacional Nalga de Maco", type: "parque", tags: ["parque", "ecoturismo", "fauna", "sendero"], price: "pagado", description: "Parque nacional de alta montaña compartido con Haití, hogar de especies únicas.", image: img("nalga-maco-dj") }
        ]
    },
    "duarte": {
        name: "Duarte", region: "Noreste",
        description: "La cuna del arroz dominicano, con paisajes tropicales y ríos de aguas cristalinas.",
        color: "#f8a0a0",
        pois: [
            { name: "Río Yuna", type: "naturaleza", tags: ["río", "pesca", "naturaleza", "kayak"], price: "gratis", description: "El río más largo de la República Dominicana, ideal para kayak, pesca y naturaleza.", image: img("rio-yuna") },
            { name: "San Francisco de Macorís", type: "cultura", tags: ["ciudad", "gastronomía", "merengue", "cultura"], price: "gratis", description: "Alegre capital provincial conocida por su gastronomía, merengue típico y ambiente festivo.", image: img("sfm-cultura") },
            { name: "Presa de Hatillo", type: "aventura", tags: ["presa", "agua", "paisaje", "recreación"], price: "pagado", description: "La mayor reserva de agua dulce del país, perfecta para paseos en bote y ecoturismo.", image: img("presa-hatillo") }
        ]
    },
    "elias-pina": {
        name: "Elías Piña", region: "Oeste",
        description: "Frontera y montaña, una provincia de contrastes entre la selva y el límite fronterizo.",
        color: "#c8d8e8",
        pois: [
            { name: "Parque Nacional Nalga de Maco", type: "parque", tags: ["montaña", "flora", "fauna", "ecoturismo"], price: "pagado", description: "Parque de alta montaña con pinos, helechos arbóreos y aves endémicas.", image: img("nalga-maco-ep") },
            { name: "Comendador", type: "cultura", tags: ["frontera", "historia", "pueblo", "cultura"], price: "gratis", description: "Capital provincial con rico pasado colonial y ambiente de pueblo tranquilo en la cordillera.", image: img("comendador") },
            { name: "Nacimiento del Río Artibonito", type: "naturaleza", tags: ["río", "agua", "montaña", "origen"], price: "gratis", description: "El río más largo de La Española nace en las alturas de esta provincia.", image: img("artibonito-nacimiento") }
        ]
    },
    "el-seibo": {
        name: "El Seibo", region: "Este",
        description: "Tierras ganaderas y de caña, con ríos, cuevas y la tranquilidad del oriente dominicano.",
        color: "#a0d0c0",
        pois: [
            { name: "Reserva Lagunas Redonda y Limón", type: "naturaleza", tags: ["laguna", "aves", "ecoturismo", "paisaje"], price: "pagado", description: "Lagunas costeras de agua salada rodeadas de manglares con abundante vida silvestre.", image: img("laguna-redonda") },
            { name: "Ruta Gastronómica El Seibo", type: "cultura", tags: ["gastronomía", "costumbres", "historia", "pueblo"], price: "gratis", description: "Ruta gastronómica y cultural a través del campo dominicano con tradiciones vaqueras.", image: img("gastronomia-seibo") },
            { name: "Cueva de Arte Rupestre", type: "museo", tags: ["cueva", "taíno", "arte rupestre", "historia"], price: "pagado", description: "Cuevas con arte rupestre precolombino de valor histórico y espeleológico.", image: img("cueva-seibo") }
        ]
    },
    "espaillat": {
        name: "Espaillat", region: "Norte",
        description: "El municipio de Moca, tierra de cacaos, cafés y el famoso dulce de coco espaillateño.",
        color: "#f4b8b0",
        pois: [
            { name: "Moca — Ciudad del Cacao", type: "tienda", tags: ["cacao", "chocolate", "artesanía", "gastronomía"], price: "gratis", description: "Reconocida como capital del cacao, ofrece recorridos por fincas y talleres de chocolate artesanal.", image: img("moca-cacao") },
            { name: "Cascada del Norte", type: "naturaleza", tags: ["cascada", "naturaleza", "senderismo", "frescura"], price: "gratis", description: "Refrescante cascada escondida entre los cafetales y cacaoteros del Norte dominicano.", image: img("cascada-espaillat") },
            { name: "Catedral de Moca", type: "museo", tags: ["iglesia", "colonial", "historia", "arte"], price: "gratis", description: "Una de las iglesias más hermosas del país, símbolo histórico de la ciudad de Moca.", image: img("catedral-moca") }
        ]
    },
    "hato-mayor": {
        name: "Hato Mayor", region: "Este",
        description: "Territorio ganadero con ríos, cuevas y acceso a reservas naturales del este dominicano.",
        color: "#f0c8a0",
        pois: [
            { name: "Cueva de Las Maravillas", type: "museo", tags: ["cueva", "taíno", "patrimonio", "historia"], price: "pagado", description: "Sitio arqueológico con más de 471 pictografías y petroglifos taínos, Patrimonio Nacional.", image: img("cueva-maravillas") },
            { name: "Parque Nacional Los Haitises", type: "parque", tags: ["manglar", "cayos", "biodiversidad", "ecoturismo"], price: "pagado", description: "Acceso al espectacular parque con cayos, manglares y cuevas con arte taíno.", image: img("haitises-hm") },
            { name: "Río Soco", type: "aventura", tags: ["río", "kayak", "naturaleza", "adrenalina"], price: "pagado", description: "Río perfecto para kayak y rafting entre manglares hasta desembocar en el Mar Caribe.", image: img("rio-soco") }
        ]
    },
    "hermanas-mirabal": {
        name: "Hermanas Mirabal", region: "Norte",
        description: "Homenaje eterno a las Mariposas, tierra de cacao, naturaleza y memoria histórica.",
        color: "#f47fb0",
        pois: [
            { name: "Museo Hermanas Mirabal", type: "museo", tags: ["historia", "heroínas", "memoria", "cultura"], price: "pagado", description: "Casa museo donde vivieron las célebres hermanas Mirabal, mártires de la dictadura de Trujillo.", image: img("museo-mirabal") },
            { name: "Centro Histórico de Salcedo", type: "cultura", tags: ["pueblo", "historia", "paseo", "arte"], price: "gratis", description: "El casco histórico lleno de murales, arte urbano y homenajes a Las Mariposas.", image: img("salcedo-historico") },
            { name: "Fincas de Cacao Orgánico", type: "tienda", tags: ["cacao", "orgánico", "recorrido", "naturaleza"], price: "pagado", description: "Visita fincas productoras de cacao orgánico y aprende el proceso del chocolate dominicano.", image: img("cacao-mirabal") }
        ]
    },
    "independencia": {
        name: "Independencia", region: "Sur",
        description: "Lago salado, iguanas gigantes y el parque nacional más grande del Caribe en su frontera.",
        color: "#c0b8d8",
        pois: [
            { name: "Isla Cabritos — Lago Enriquillo", type: "naturaleza", tags: ["cocodrilo", "iguana", "lago", "fauna"], price: "pagado", description: "Isla dentro del lago habitada por las mayores iguanas rinocerontes y cocodrilos americanos.", image: img("isla-cabritos") },
            { name: "Parque Nacional Isla Cabritos", type: "parque", tags: ["patrimonio", "naturaleza", "fauna", "ecoturismo"], price: "pagado", description: "Reserva natural donde conviven cocodrilos, flamencos rosados e iguanas en ecosistema único.", image: img("parque-cabritos") },
            { name: "La Descubierta", type: "playa", tags: ["balneario", "lago", "local", "relajación"], price: "gratis", description: "Pintoresco pueblo junto al Lago Enriquillo con balneario y ambiente auténtico dominicano.", image: img("la-descubierta") }
        ]
    },
    "maria-trinidad-sanchez": {
        name: "María Trinidad Sánchez", region: "Noreste",
        description: "Costa atlántica salvaje con playas escondidas, manglares y acceso al Parque Los Haitises.",
        color: "#88d4bc",
        pois: [
            { name: "Playa Grande", type: "playa", tags: ["atlántico", "surf", "naturaleza", "virgen"], price: "gratis", description: "Espectacular playa de 2 km de arena dorada con olas del Atlántico, perfecta para surf.", image: img("playa-grande-mts") },
            { name: "Laguna Gri-Gri", type: "naturaleza", tags: ["manglar", "tour", "bote", "ecoturismo"], price: "pagado", description: "Laguna cubierta de manglares rojos donde los botes navegan entre raíces en paisaje de película.", image: img("laguna-grigri") },
            { name: "Río San Juan", type: "cultura", tags: ["pueblo", "cultura", "atardecer", "mariscos"], price: "gratis", description: "Acogedor pueblo con arquitectura tradicional, malecón y exquisita gastronomía de mariscos frescos.", image: img("rio-san-juan") }
        ]
    },
    "monsenor-nouel": {
        name: "Monseñor Nouel", region: "Norte",
        description: "Corazón del país, con ríos navegables, presa y conexión con la cordillera Central.",
        color: "#e8d4a0",
        pois: [
            { name: "Presa de Hatillo", type: "aventura", tags: ["embalse", "bote", "paisaje", "recreación"], price: "pagado", description: "El embalse artificial más grande del país, rodeado de colinas verdes, ideal para paseos en bote.", image: img("presa-bonao") },
            { name: "Mercado Artesanal de Bonao", type: "tienda", tags: ["artesanía", "larimar", "ámbar", "joyería"], price: "gratis", description: "El mayor mercado artesanal de la isla, famoso por larimar, ámbar y joyería dominicana.", image: img("artesania-bonao") },
            { name: "Valle del Cibao", type: "naturaleza", tags: ["campo", "agricultura", "paisaje", "fotografía"], price: "gratis", description: "El fértil valle agrícola más productivo del país, donde nacen el arroz y los vegetales dominicanos.", image: img("valle-cibao") }
        ]
    },
    "monte-plata": {
        name: "Monte Plata", region: "Este",
        description: "Parque Los Haitises y una naturaleza exuberante de ríos, cuevas y manglares únicos.",
        color: "#d4c4e8",
        pois: [
            { name: "Parque Nacional Los Haitises", type: "parque", tags: ["manglares", "cayos", "cuevas", "biodiversidad"], price: "pagado", description: "Uno de los parques naturales más espectaculares del Caribe con mogotes, manglares y arte taíno.", image: img("haitises-mp") },
            { name: "Cuevas Taínas Los Haitises", type: "museo", tags: ["taíno", "arte rupestre", "historia", "cuevas"], price: "pagado", description: "Impresionantes cuevas con pictografías taínas que narran la vida de los primeros habitantes.", image: img("cuevas-haitises") },
            { name: "Río Yabacao", type: "aventura", tags: ["río", "senderismo", "naturaleza", "fresco"], price: "gratis", description: "Río de aguas cristalinas que cruza la provincia, ideal para refrescarse y disfrutar la naturaleza.", image: img("rio-yabacao") }
        ]
    },
    "peravia": {
        name: "Peravia", region: "Sur",
        description: "Dunas de arena únicas en el Caribe, playas tranquilas y la alegre ciudad de Baní.",
        color: "#b4e0c8",
        pois: [
            { name: "Playa de Baní", type: "playa", tags: ["caribe", "tranquila", "local", "puesta de sol"], price: "gratis", description: "Hermosa playa caribeña con aguas cálidas y tranquilas, perfecta para familias y puestas de sol.", image: img("playa-bani") },
            { name: "Las Dunas de Baní", type: "naturaleza", tags: ["dunas", "desierto", "único", "fotografía"], price: "gratis", description: "Impresionantes dunas de arena en el Caribe, un paisaje desértico único en República Dominicana.", image: img("dunas-bani") },
            { name: "Monumento a Máximo Gómez", type: "museo", tags: ["historia", "héroe", "cultura", "plaza"], price: "gratis", description: "Homenaje al héroe de la independencia cubana nacido en Baní, en la plaza central.", image: img("maximo-gomez") }
        ]
    },
    "san-cristobal": {
        name: "San Cristóbal", region: "Sur",
        description: "La cuna de la Constitución dominicana de 1844, con cuevas, playas y montañas.",
        color: "#d4dca0",
        pois: [
            { name: "Cueva del Pomier", type: "museo", tags: ["taíno", "arte rupestre", "cueva", "historia"], price: "pagado", description: "El mayor conjunto de arte rupestre precolombino del Caribe con más de 6,000 petroglifos.", image: img("cueva-pomier") },
            { name: "Playa Najayo", type: "playa", tags: ["caribe", "popular", "brisa", "familia"], price: "gratis", description: "Una de las playas más visitadas del sur, con ambiente familiar y aguas cálidas del Mar Caribe.", image: img("playa-najayo") },
            { name: "La Toma", type: "naturaleza", tags: ["balneario", "río", "montaña", "naturaleza"], price: "pagado", description: "Balneario natural de agua fresca en la montaña, el favorito de los capitalinos para escapar del calor.", image: img("la-toma-sc") }
        ]
    },
    "san-jose-de-ocoa": {
        name: "San José de Ocoa", region: "Sur",
        description: "La tierra del aguacate y el café de altura, con cascadas y ecoturismo de montaña.",
        color: "#e8c8d0",
        pois: [
            { name: "Cascada El Limoncito", type: "naturaleza", tags: ["cascada", "agua", "frescura", "sendero"], price: "gratis", description: "Cascada de montaña de aguas cristalinas, accesible por un sendero a través del bosque de pinos.", image: img("limoncito-ocoa") },
            { name: "Fincas Cafetaleras de Altura", type: "tienda", tags: ["café", "orgánico", "recorrido", "gastronomía"], price: "pagado", description: "Visita plantaciones de café de altura y aprende el proceso de uno de los mejores cafés del país.", image: img("cafe-ocoa") },
            { name: "Ruta de la Montaña", type: "aventura", tags: ["ruta", "campo", "naturaleza", "aventura"], price: "pagado", description: "Ruta de montaña que revela paisajes espectaculares de la cordillera Central dominicana.", image: img("ruta-ocoa") }
        ]
    },
    "san-juan": {
        name: "San Juan", region: "Oeste",
        description: "San Juan de la Maguana, portal al suroeste con el misterioso Corral de los Indios.",
        color: "#f0d870",
        pois: [
            { name: "Corral de los Indios", type: "museo", tags: ["taíno", "ceremonial", "historia", "patrimonio"], price: "gratis", description: "El mayor centro ceremonial taíno del Caribe, con un círculo de piedras usado en rituales ancestrales.", image: img("corral-indios") },
            { name: "Presa de Sabaneta", type: "aventura", tags: ["embalse", "pesca", "bote", "paisaje"], price: "pagado", description: "Embalse rodeado de montañas con actividades de pesca deportiva y paseos en bote.", image: img("presa-sabaneta") },
            { name: "Las Matas de Farfán", type: "cultura", tags: ["cultura", "gastronomía", "pueblo", "frontera"], price: "gratis", description: "Animado pueblo fronterizo con mercado binacional, música típica y sabores del suroeste dominicano.", image: img("matas-farfan") }
        ]
    },
    "san-pedro-de-macoris": {
        name: "San Pedro de Macorís", region: "Este",
        description: "La cuna del béisbol dominicano y de grandes jugadores de Grandes Ligas.",
        color: "#ccdcc4",
        pois: [
            { name: "Estadio Tetelo Vargas", type: "cultura", tags: ["béisbol", "deporte", "historia", "estadio"], price: "pagado", description: "Estadio histórico donde crecieron decenas de peloteros dominicanos que llegaron a las Grandes Ligas.", image: img("estadio-tetelo") },
            { name: "Playa Juan Dolio", type: "playa", tags: ["resort", "caribe", "buceo", "snorkel"], price: "gratis", description: "Playa de aguas tranquilas con arrecifes de coral, resorts y actividades acuáticas para toda la familia.", image: img("juan-dolio") },
            { name: "Ingenio Azucarero Histórico", type: "museo", tags: ["azúcar", "historia", "industria", "patrimonio"], price: "pagado", description: "Uno de los históricos ingenios azucareros de la región, testigo del auge del azúcar dominicano.", image: img("ingenio-spm") }
        ]
    },
    "santiago-rodriguez": {
        name: "Santiago Rodríguez", region: "Noroeste",
        description: "Tabaco artesanal, ríos salvajes y el Parque Nacional Nalga de Maco en las alturas del noroeste.",
        color: "#c8b4dc",
        pois: [
            { name: "Parque Nacional Nalga de Maco", type: "parque", tags: ["parque", "montaña", "pino", "ecoturismo"], price: "pagado", description: "Parque de alta montaña con pinos, nubes y aves endémicas a lo largo de la frontera.", image: img("nalga-sr") },
            { name: "Monción — Tabaco Artesanal", type: "cultura", tags: ["tabaco", "artesanía", "cultura", "rural"], price: "gratis", description: "Pueblo conocido por la producción artesanal de tabaco y la calidez de su gente en el campo dominicano.", image: img("moncion-tabaco") },
            { name: "Río Guayubín", type: "naturaleza", tags: ["río", "pesca", "paisaje", "naturaleza"], price: "gratis", description: "Río de aguas cristalinas que desciende de las montañas, popular para pesca y baños en la naturaleza.", image: img("rio-guayubin") }
        ]
    },
    "valverde": {
        name: "Valverde", region: "Noroeste",
        description: "Tierra de arroz y plantaciones, capital del Noroeste con paisajes agrícolas únicos.",
        color: "#b8d4a0",
        pois: [
            { name: "Mao — Ciudad del Noroeste", type: "cultura", tags: ["ciudad", "gastronomía", "cultura", "mercado"], price: "gratis", description: "Animada capital del noroeste con mercado local, gastronomía típica y ambiente del campo dominicano.", image: img("mao-ciudad") },
            { name: "Arrozales del Valle", type: "naturaleza", tags: ["arroz", "campo", "fotografía", "agroturismo"], price: "gratis", description: "Extensos arrozales que pintan el paisaje de verde esmeralda, perfectos para fotografía y agroturismo.", image: img("arrozales-valverde") },
            { name: "Río Yaque del Norte", type: "aventura", tags: ["río", "rafting", "pesca", "aventura"], price: "pagado", description: "El río más largo de la isla atraviesa la provincia, ofreciendo rafting y deportes de aventura.", image: img("yaque-norte") }
        ]
    },
    "distrito-nacional": {
        name: "Distrito Nacional", region: "Sur",
        description: "Santo Domingo, el corazón político y cultural de la nación dominicana.",
        color: "#e8a898",
        pois: [
            { name: "Palacio Nacional", type: "museo", tags: ["gobierno", "historia", "arquitectura", "cultura"], price: "pagado", description: "Sede del poder ejecutivo, joya del neoclásico dominicano construida en 1947.", image: img("palacio-nacional") },
            { name: "Mercado Modelo", type: "tienda", tags: ["artesanía", "compras", "souvenir", "cultura"], price: "gratis", description: "Mercado tradicional con artesanías, pinturas, larimar, ámbar y recuerdos de República Dominicana.", image: img("mercado-modelo") },
            { name: "Parque Mirador del Sur", type: "parque", tags: ["parque", "jogging", "familia", "naturaleza"], price: "gratis", description: "Extenso parque urbano con cuevas, senderos y el favorito de la capital para hacer ejercicio.", image: img("mirador-sur") }
        ]
    },
    "sanchez-ramirez": {
        name: "Sánchez Ramírez", region: "Norte",
        description: "Tierra del ámbar azul y la caoba, provincia central con ríos y tradiciones campesinas.",
        color: "#a8d8b0",
        pois: [
            { name: "Minas de Ámbar Azul", type: "tienda", tags: ["ámbar azul", "minería", "joyería", "único"], price: "pagado", description: "El ámbar azul de Cotuí es único en el mundo — visita las minas donde se extrae esta gema extraordinaria.", image: img("ambar-azul") },
            { name: "Cotuí — Ciudad del Ámbar", type: "cultura", tags: ["ámbar", "joyería", "cultura", "artesanía"], price: "gratis", description: "Capital provincial famosa por sus talleres de joyería con ámbar azul y la cultura del monte dominicano.", image: img("cotui-ambar") },
            { name: "Río Yuna Tramo Central", type: "naturaleza", tags: ["río", "pesca", "naturaleza", "paisaje"], price: "gratis", description: "El tramo central del Río Yuna donde la pesca artesanal define la vida rural dominicana.", image: img("yuna-central") }
        ]
    }
};

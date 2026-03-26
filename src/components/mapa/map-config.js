/**
 * Map Configuration
 * Province name mappings, pastel colors, display names, and data province flags.
 */

/** GeoJSON province_name → slug */
export const nameToSlug = {
    'DISTRITO NACIONAL': 'distrito-nacional',
    'AZUA': 'azua',
    'BAHORUCO': 'bahoruco',
    'BAORUCO': 'bahoruco',
    'BARAHONA': 'barahona',
    'DAJABON': 'dajabon',
    'DAJABÓN': 'dajabon',
    'DUARTE': 'duarte',
    'ELIAS PIÑA': 'elias-pina',
    'ELÍAS PIÑA': 'elias-pina',
    'EL SEIBO': 'el-seibo',
    'ESPAILLAT': 'espaillat',
    'HATO MAYOR': 'hato-mayor',
    'HERMANAS MIRABAL': 'hermanas-mirabal',
    'INDEPENDENCIA': 'independencia',
    'LA ALTAGRACIA': 'la-altagracia',
    'LA ROMANA': 'la-romana',
    'LA VEGA': 'la-vega',
    'MARIA TRINIDAD SANCHEZ': 'maria-trinidad-sanchez',
    'MARÍA TRINIDAD SÁNCHEZ': 'maria-trinidad-sanchez',
    'MONSEÑOR NOUEL': 'monsenor-nouel',
    'MONTE CRISTI': 'monte-cristi',
    'MONTE PLATA': 'monte-plata',
    'PEDERNALES': 'pedernales',
    'PERAVIA': 'peravia',
    'PUERTO PLATA': 'puerto-plata',
    'SALCEDO': 'salcedo',
    'SAMANA': 'samana',
    'SAMANÁ': 'samana',
    'SANCHEZ RAMIREZ': 'sanchez-ramirez',
    'SÁNCHEZ RAMÍREZ': 'sanchez-ramirez',
    'SANCHEZ RAMÍREZ': 'sanchez-ramirez', // GeoJSON typo fix
    'SAN CRISTOBAL': 'san-cristobal',
    'SAN CRISTÓBAL': 'san-cristobal',
    'SAN JOSE DE OCOA': 'san-jose-de-ocoa',
    'SAN JOSÉ DE OCOA': 'san-jose-de-ocoa',
    'SAN JUAN': 'san-juan',
    'SAN PEDRO DE MACORIS': 'san-pedro-de-macoris',
    'SAN PEDRO DE MACORÍS': 'san-pedro-de-macoris',
    'SANTIAGO': 'santiago',
    'SANTIAGO RODRIGUEZ': 'santiago-rodriguez',
    'SANTIAGO RODRÍGUEZ': 'santiago-rodriguez',
    'SANTO DOMINGO': 'santo-domingo',
    'VALVERDE': 'valverde',
};

/** 
 * Paleta de Colores por Ecosistema (Tonos Pastel / Muted)
 * Diseñada para máxima legibilidad de etiquetas y estética moderna.
 */
export const provinceColors = {
    // 🏖️ TROPICAL / PLAYA
    'la-altagracia': '#6EE7B7', // emerald-300
    'samana': '#5EEAD4',        // teal-300
    'puerto-plata': '#7DD3FC',  // sky-300
    'barahona': '#38BDF8',      // sky-400
    'la-romana': '#99F6E4',     // teal-200
    'san-pedro-de-macoris': '#BAE6FD', // sky-200

    // ⛰️ FRÍO / MONTAÑA
    'la-vega': '#93C5FD',       // blue-300
    'monsenor-nouel': '#A5B4FC',// indigo-300
    'san-jose-de-ocoa': '#C4B5FD',// violet-300
    'san-juan': '#60A5FA',      // blue-400
    'elias-pina': '#A78BFA',    // violet-400

    // 🏜️ SECO / ÁRIDO (Corrección en Valverde)
    'pedernales': '#FCD34D',    // amber-300
    'independencia': '#FDE047', // yellow-300
    'bahoruco': '#FBBF24',      // amber-400
    'azua': '#FB923C',          // orange-400
    'peravia': '#FDBA74',       // orange-300
    'monte-cristi': '#FCA5A5',  // red-300
    'dajabon': '#FBBF24',       // amber-400
    'santiago-rodriguez': '#FACC15',// yellow-400
    'valverde': '#FDE047',      // yellow-300 (Garantizado diferente de Azua)

    // 🌿 SELVA / LLUVIOSO
    'maria-trinidad-sanchez': '#4ADE80', // green-400
    'duarte': '#BEF264',        // lime-300
    'hato-mayor': '#86EFAC',    // green-300
    'el-seibo': '#84CC16',      // lime-500
    'monte-plata': '#34D399',   // emerald-400
    'sanchez-ramirez': '#A3E635',// lime-400
    'espaillat': '#A3E635',     // lime-400
    'hermanas-mirabal': '#86EFAC', // green-300
    'salcedo': '#f44336',

    // 🏙️ METROPOLITANO
    'santiago': '#94A3B8',      // slate-400
    'distrito-nacional': '#93C5FD',// blue-300 (Más vibrante para DN)
    'santo-domingo': '#ea899a', // pink-400 (Como solicitaste)
    'san-cristobal': '#9CA3AF', // gray-400
};

/** Provinces that have POI data and are clickable */
export const dataProvinces = new Set([
    'santo-domingo',
    'la-altagracia',
    'puerto-plata',
    'samana',
    'santiago',
    'la-romana',
    'barahona',
    'la-vega',
    'pedernales',
    'monte-cristi',
    'distrito-nacional',
    'azua',
    'bahoruco',
    'dajabon',
    'duarte',
    'elias-pina',
    'el-seibo',
    'espaillat',
    'hato-mayor',
    'hermanas-mirabal',
    'independencia',
    'maria-trinidad-sanchez',
    'monsenor-nouel',
    'monte-plata',
    'peravia',
    'san-cristobal',
    'san-jose-de-ocoa',
    'san-juan',
    'san-pedro-de-macoris',
    'santiago-rodriguez',
    'valverde',
    'sanchez-ramirez',
    'salcedo',
]);

/** Short display names for map labels */
export const displayNames = {
    'santo-domingo': 'SANTO DOMINGO',
    'distrito-nacional': 'DN',
    'la-altagracia': 'LA ALTAGRACIA',
    'puerto-plata': 'PUERTO PLATA',
    'samana': 'SAMANÁ',
    'santiago': 'SANTIAGO',
    'la-romana': 'LA ROMANA',
    'barahona': 'BARAHONA',
    'la-vega': 'LA VEGA',
    'pedernales': 'PEDERNALES',
    'monte-cristi': 'MONTE CRISTI',
    'distrito-nacional': 'DN',
    'azua': 'AZUA',
    'duarte': 'DUARTE',
    'san-juan': 'SAN JUAN',
    'independencia': 'INDEPENDENCIA',
    'bahoruco': 'BAHORUCO',
    'san-cristobal': 'S. CRISTÓBAL',
    'monte-plata': 'MONTE PLATA',
    'hato-mayor': 'HATO MAYOR',
    'el-seibo': 'EL SEIBO',
    'san-pedro-de-macoris': 'S.P. MACORÍS',
    'peravia': 'PERAVIA',
    'espaillat': 'ESPAILLAT',
    'maria-trinidad-sanchez': 'MARÍA TRINIDAD SÁNCHEZ',
    'valverde': 'VALVERDE',
    'dajabon': 'DAJABÓN',
    'santiago-rodriguez': 'S. RODRÍGUEZ',
    'elias-pina': 'E. PIÑA',
    'sanchez-ramirez': 'S. RAMÍREZ',
    'monsenor-nouel': 'M. NOUEL',
    'san-jose-de-ocoa': 'S.J. OCOA',
    'hermanas-mirabal': 'H. MIRABAL',
    'salcedo': 'H. MIRABAL',
};

/** GeoJSON source URL */
export const GEOJSON_URL =
    'https://raw.githubusercontent.com/jeasoft/provinces_geojson/master/provinces_municipality_summary.geojson';

/** Featured destination province IDs (for the grid) */
export const featuredProvinceIds = [
    'la-altagracia',
    'samana',
    'puerto-plata',
    'santo-domingo',
    'santiago',
    'barahona',
];

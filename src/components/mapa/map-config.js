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
 * Paleta de Colores por Región Geográfica
 * Basada en la imagen de referencia del diseño "DESPUES".
 */
export const provinceColors = {
    // 🔵 REGIÓN NORTE (Cibao) — Grises azulados medios
    'puerto-plata': '#6D8E9A',   // medium slate
    'santiago': '#5E7D8C',       // steel blue
    'valverde': '#7A9DAA',       // light slate
    'monte-cristi': '#688A98',   // cadet
    'dajabon': '#627F8E',        // blue-gray
    'santiago-rodriguez': '#6F8D98', // dusty blue
    'espaillat': '#7D9BA6',      // silver blue
    'hermanas-mirabal': '#7898A3', // slate gray
    'salcedo': '#7898A3',        // slate gray
    'la-vega': '#6A8B9A',        // medium steel
    'monsenor-nouel': '#7494A2', // grayish blue
    'sanchez-ramirez': '#809FA9', // light steel
    'duarte': '#6E8C9A',         // cadet blue
    'maria-trinidad-sanchez': '#607A8A', // dark slate
    'samana': '#6B909E',         // teal-slate

    // 🟢 REGIÓN SUROESTE — Verdes suaves y frescos
    'azua': '#8AB87A',           // soft green
    'barahona': '#7DAE6E',       // sage
    'pedernales': '#96C486',     // light sage
    'independencia': '#85B475',  // fern
    'bahoruco': '#79A86A',       // meadow
    'san-juan': '#82B072',       // clover
    'elias-pina': '#74A465',     // spring green
    'peravia': '#9ECC8E',        // mint sage
    'san-jose-de-ocoa': '#8BBC7C', // pistachio
    'san-cristobal': '#92C082',  // seafoam green

    // 🔹 REGIÓN SURESTE/ESTE — Azules claros y cian
    'la-altagracia': '#7ABABE',  // turquoise
    'la-romana': '#88C4C0',      // soft teal
    'san-pedro-de-macoris': '#94CCC6', // light teal
    'hato-mayor': '#84C0B8',     // seafoam
    'el-seibo': '#78B6AE',       // muted cyan
    'monte-plata': '#8EC8C0',    // jade
    'distrito-nacional': '#80BABA', // cyan blue
    'santo-domingo': '#92C8C2',  // pale teal
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

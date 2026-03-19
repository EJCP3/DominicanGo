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

/** Soft pastel fill colors per province slug — each province clearly distinct */
export const provinceColors = {
    'monte-cristi': '#e8c49a',  // warm peach/orange
    'dajabon': '#b8cce0',  // blue-gray
    'valverde': '#b8d4a0',  // sage green
    'puerto-plata': '#7ecfc8',  // teal
    'santiago-rodriguez': '#c8b4dc',  // soft lavender
    'santiago': '#c8a0e0',  // purple
    'espaillat': '#f4b8b0',  // coral pink
    'maria-trinidad-sanchez': '#88d4bc',  // mint green
    'hermanas-mirabal': '#f47fb0',  // hot pink
    'duarte': '#f8a0a0',  // salmon
    'samana': '#70d4a8',  // sea green
    'elias-pina': '#c8d8e8',  // powder blue
    'san-juan': '#f0d870',  // golden yellow
    'la-vega': '#94bce8',  // cornflower blue
    'monsenor-nouel': '#e8d4a0',  // warm sand
    'sanchez-ramirez': '#a8d8b0',  // light green
    'monte-plata': '#d4c4e8',  // thistle/lilac
    'hato-mayor': '#f0c8a0',  // light apricot
    'el-seibo': '#a0d0c0',  // pale teal
    'la-altagracia': '#c8e8a0',  // yellow-green
    'azua': '#c0d8e8',  // light steel blue
    'san-jose-de-ocoa': '#e8c8d0',  // blush
    'peravia': '#b4e0c8',  // pale mint
    'san-cristobal': '#d4dca0',  // olive cream
    'santo-domingo': '#a0c8a0',  // medium sage
    'distrito-nacional': '#e8a898',  // terracotta pink
    'san-pedro-de-macoris': '#d8c4a8',  // warm beige
    'la-romana': '#d0e0b0',  // pale lime
    'bahoruco': '#a0c8d8',  // sky blue
    'independencia': '#c0b8d8',  // mid lavender
    'barahona': '#70c4b4',  // dark teal
    'pedernales': '#80b8a8',  // muted teal
    'salcedo': '#f47fb0',  // same as hermanas-mirabal (alias)
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
]);

/** Short display names for map labels */
export const displayNames = {
    'santo-domingo': 'SANTO DOMINGO',
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

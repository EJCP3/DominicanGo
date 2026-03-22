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
    // 🏖️ TROPICAL / PLAYA (Tonos Turquesa, Aqua y Celeste suaves)
    'la-altagracia': '#A7F3D0', 
    'samana': '#99F6E4',        
    'puerto-plata': '#BAE6FD',  
    'barahona': '#7DD3FC',      
    'la-romana': '#CFFAF6',     
    'san-pedro-de-macoris': '#E0F2FE', 

    // ⛰️ FRÍO / MONTAÑA (Tonos Azul Bruma, Índigo y Lavanda)
    'la-vega': '#BFDBFE',       
    'monsenor-nouel': '#C7D2FE',
    'san-jose-de-ocoa': '#E0E7FF',
    'san-juan': '#93C5FD',      
    'elias-pina': '#C4B5FD',    

    // 🏜️ SECO / ÁRIDO (Tonos Arena, Ocre, Melocotón y Amarillo suave)
    'pedernales': '#FDE68A',    
    'independencia': '#FEF08A', 
    'bahoruco': '#FCD34D',      
    'azua': '#FDBA74',          
    'peravia': '#FFEDD5',       
    'monte-cristi': '#FECACA',  
    'dajabon': '#FFD166',       
    'santiago-rodriguez': '#FDE047',
    'valverde': '#FEF9C3',      

    // 🌿 SELVA / LLUVIOSO (Tonos Verde Bosque claro y Lima suave)
    'maria-trinidad-sanchez': '#86EFAC',
    'duarte': '#D9F99D',        
    'hato-mayor': '#BBF7D0',    
    'el-seibo': '#A3E635',      
    'monte-plata': '#6EE7B7',   
    'sanchez-ramirez': '#BEF264',
    'espaillat': '#D9F99D',     
    'hermanas-mirabal': '#bbf7d0',
    'salcedo': '#bbf7d0', // Alias

    // 🏙️ METROPOLITANO (Tonos Gris Azulado y Acero limpios)
    'santiago': '#CBD5E1',      
    'distrito-nacional': '#E2E8F0',
    'santo-domingo': '#F1F5F9', 
    'san-cristobal': '#E5E7EB', 
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

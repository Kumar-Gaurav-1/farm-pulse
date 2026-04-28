/**
 * @fileOverview Definitive location registry for AgriPulse AI.
 * Defines the geophysical and operational parameters for different properties.
 */

export interface PropertyContext {
  id: string;
  name: string;
  type: string;
  location: string;
  coordinates: { lat: number; lng: number };
  primaryCrop: string;
  soilProfile: string;
  area: string;
  climateZone: string;
  baseElevation: string;
}

export const PROPERTIES: PropertyContext[] = [
  {
    id: 'valley-view',
    name: 'Valley View Estate',
    type: 'Main Commercial Sector',
    location: 'Central Valley, Kansas',
    coordinates: { lat: 38.5266, lng: -96.7265 },
    primaryCrop: 'Corn (Yellow Dent)',
    soilProfile: 'Silt Loam (Class I)',
    area: '185.7 Ha',
    climateZone: 'Humid Continental',
    baseElevation: '342m'
  },
  {
    id: 'north-meadow',
    name: 'North Meadow Labs',
    type: 'Precision Test Field',
    location: 'Riley County, Kansas',
    coordinates: { lat: 39.1836, lng: -96.5717 },
    primaryCrop: 'Experimental Soy',
    soilProfile: 'Clay Loam (Class II)',
    area: '42.5 Ha',
    climateZone: 'Humid Continental',
    baseElevation: '315m'
  },
  {
    id: 'highland-plains',
    name: 'Highland Plains',
    type: 'Commercial Wheat Sector',
    location: 'Western Kansas Plateau',
    coordinates: { lat: 38.9637, lng: -101.0441 },
    primaryCrop: 'Hard Red Winter Wheat',
    soilProfile: 'Sandy Loam (Aridisol)',
    area: '420.2 Ha',
    climateZone: 'Semi-Arid',
    baseElevation: '980m'
  }
];

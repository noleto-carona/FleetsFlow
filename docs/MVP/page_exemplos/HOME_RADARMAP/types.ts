
export interface VesselStats {
  speed: number;
  heading: number;
  distanceToPort: number;
  lat: number;
  lng: number;
  name: string;
  status: 'Normal' | 'Warning' | 'Critical';
}

export interface GroundingLink {
  web?: {
    uri: string;
    title: string;
  };
}

export interface SearchResult {
  text: string;
  links: GroundingLink[];
}

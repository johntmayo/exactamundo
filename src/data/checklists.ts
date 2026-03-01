import type {
  LossType,
  RoomId,
  SystemCategoryId,
} from '../types/session'

export const LOSS_TYPE_OPTIONS: { id: LossType; label: string }[] = [
  { id: 'fire', label: 'Fire or smoke' },
  { id: 'wind', label: 'Wind or storm' },
  { id: 'water', label: 'Water or flooding' },
  { id: 'earthquake', label: 'Earthquake' },
  { id: 'other', label: 'Something else' },
]

export const COVERAGE_OPTIONS: { id: string; label: string }[] = [
  { id: 'dwelling', label: 'Dwelling (the main home structure)' },
  { id: 'buildingCodeUpgrades', label: 'Building Code Upgrades' },
  { id: 'otherStructures', label: 'Other Structures (garage, fence, shed, etc.)' },
  { id: 'landscaping', label: 'Landscaping' },
  { id: 'treesAndShrubs', label: 'Trees and Shrubs' },
]

export const SYSTEM_GROUPS: {
  title: string
  items: { id: SystemCategoryId; label: string }[]
}[] = [
  {
    title: 'Before Work Begins',
    items: [
      { id: 'demolition', label: 'Demolition' },
      { id: 'debris-removal', label: 'Debris Removal / Debris Boxes' },
      { id: 'hazardous-material-testing', label: 'Hazardous Material Testing and Abatement' },
      { id: 'soils-report', label: 'Soils Report' },
      { id: 'land-survey', label: 'Land Survey' },
      { id: 'site-preparation', label: 'Site Preparation' },
      { id: 'temporary-power', label: 'Temporary Power and Utilities' },
      { id: 'temporary-toilet', label: 'Temporary Toilet' },
      { id: 'temporary-security-fencing', label: 'Temporary Security Fencing' },
      { id: 'temporary-job-trailer', label: 'Temporary Job Trailer or Storage' },
    ],
  },
  {
    title: 'Structure',
    items: [
      { id: 'foundation', label: 'Foundation' },
      { id: 'framing', label: 'Framing / Rough Carpentry' },
      { id: 'roofing', label: 'Roofing' },
      { id: 'gutters-downspouts', label: 'Gutters and Downspouts' },
      { id: 'exterior-siding-eaves-trim', label: 'Exterior Siding, Eaves, and Trim' },
      { id: 'stucco', label: 'Stucco' },
      { id: 'masonry', label: 'Masonry' },
      { id: 'steel', label: 'Steel' },
      { id: 'waterproofing', label: 'Waterproofing' },
      { id: 'sheet-metal-flashings', label: 'Sheet Metal and Flashings' },
      { id: 'erosion-control', label: 'Erosion Control' },
      { id: 'land-stabilization', label: 'Land Stabilization' },
    ],
  },
  {
    title: 'Systems',
    items: [
      { id: 'electrical', label: 'Electrical' },
      { id: 'plumbing', label: 'Plumbing (including fixtures and faucets)' },
      { id: 'hvac', label: 'HVAC (Heating, Ventilation, Air Conditioning)' },
      { id: 'fire-sprinklers', label: 'Fire Sprinklers' },
      { id: 'fire-safety-system', label: 'Fire Safety System' },
      { id: 'security-system', label: 'Security System' },
      { id: 'intercom', label: 'Intercom System' },
      { id: 'telephone-cable-internet', label: 'Telephone, Cable, and Internet Wiring' },
      { id: 'vacuum-system', label: 'Vacuum System' },
      { id: 'water-filtration', label: 'Water Filtration System' },
      { id: 'septic-sewer', label: 'Septic System or Sewer Tie-in' },
      { id: 'drainage', label: 'Drainage' },
    ],
  },
  {
    title: 'Interior',
    items: [
      { id: 'drywall', label: 'Drywall' },
      { id: 'insulation', label: 'Insulation' },
      { id: 'flooring', label: 'Flooring (hardwood, carpet, vinyl, tile)' },
      { id: 'ceramic-tile', label: 'Ceramic Tile' },
      { id: 'marble-granite', label: 'Marble and Granite' },
      { id: 'cabinets', label: 'Cabinets' },
      { id: 'cabinet-hardware', label: 'Cabinet Hardware' },
      { id: 'plastic-laminate-countertops', label: 'Plastic Laminate or Cultured Countertops' },
      { id: 'closet-packages', label: 'Closet Packages' },
      { id: 'stairs-railings', label: 'Stairs and Railings' },
      { id: 'millwork', label: 'Millwork (baseboards, moldings, trim)' },
      { id: 'finish-carpentry', label: 'Finish Carpentry' },
      { id: 'doors-trim', label: 'Doors and Trim' },
      { id: 'door-hardware', label: 'Door Hardware' },
      { id: 'windows-patio-doors', label: 'Windows and Patio Doors' },
      { id: 'window-trim', label: 'Window Trim' },
      { id: 'window-coverings', label: 'Window Coverings' },
      { id: 'skylights', label: 'Skylights' },
      { id: 'glass-mirrors-shower-doors', label: 'Glass, Mirrors, and Shower Doors' },
      { id: 'shower-pans', label: 'Shower Pans' },
      { id: 'bath-accessories', label: 'Bath Accessories' },
      { id: 'painting', label: 'Painting' },
      { id: 'wallpaper', label: 'Wallpaper' },
      { id: 'light-fixtures', label: 'Light Fixtures (interior and exterior)' },
      { id: 'work-benches-shelving', label: 'Work Benches and Shelving' },
      { id: 'weatherstripping', label: 'Weatherstripping' },
    ],
  },
  {
    title: 'Exterior and Site',
    items: [
      { id: 'driveway', label: 'Driveway' },
      { id: 'patios-walkways', label: 'Patios and Walkways' },
      { id: 'decks', label: 'Decks' },
      { id: 'fencing', label: 'Fencing' },
      { id: 'retaining-walls', label: 'Retaining Walls' },
      { id: 'landscaping', label: 'Landscaping' },
      { id: 'trees-shrubs', label: 'Trees and Shrubs' },
      { id: 'antenna-satellite', label: 'Antenna or Satellite Dish' },
    ],
  },
  {
    title: 'Special Features',
    items: [
      { id: 'fireplace', label: 'Fireplace and Fireplace Doors' },
      { id: 'garage-door-opener', label: 'Garage Door and Opener' },
      { id: 'appliances', label: 'Appliances' },
      { id: 'built-in-entertainment', label: 'Built-in Entertainment System' },
      { id: 'jacuzzi-hot-tub', label: 'Jacuzzi or Hot Tub' },
      { id: 'sauna', label: 'Sauna' },
    ],
  },
  {
    title: 'Professional Fees and Project Costs',
    items: [
      { id: 'architectural-engineering-fees', label: 'Architectural and Engineering Fees' },
      { id: 'permits-fees', label: 'Permits and Fees (including plan checking)' },
      { id: 'title-24', label: 'Title 24 Calculations' },
      { id: 'decorator', label: 'Decorator or Interior Designer' },
      { id: 'job-supervision', label: 'Job Supervision' },
      { id: 'scaffolding', label: 'Scaffolding' },
      { id: 'equipment', label: 'Equipment' },
      { id: 'interim-cleanup', label: 'Interim Job Clean-up' },
      { id: 'final-janitorial', label: 'Final Janitorial' },
      { id: 'material-tax', label: 'Material Tax' },
    ],
  },
]

export const ROOM_OPTIONS: { id: RoomId; label: string }[] = [
  { id: 'entry-foyer', label: 'Entry / Foyer' },
  { id: 'living-room', label: 'Living Room' },
  { id: 'dining-room', label: 'Dining Room' },
  { id: 'family-room-den', label: 'Family Room / Den' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'primary-bedroom', label: 'Primary Bedroom' },
  { id: 'other-bedrooms', label: 'Other Bedrooms' },
  { id: 'bathrooms', label: 'Bathrooms' },
  { id: 'hallways-stairs', label: 'Hallways and Stairs' },
  { id: 'laundry-room', label: 'Laundry Room' },
  { id: 'basement-crawl-space', label: 'Basement or Crawl Space' },
  { id: 'attic', label: 'Attic' },
  { id: 'attached-garage', label: 'Attached Garage' },
  { id: 'porch-deck-patio', label: 'Porch / Deck / Patio' },
  { id: 'other-interior', label: 'Other interior area' },
  { id: 'other-exterior', label: 'Other exterior area' },
]

export function roomLabel(roomId: RoomId): string {
  return ROOM_OPTIONS.find((room) => room.id === roomId)?.label ?? roomId
}

/**
 * Estimate Review Helper – Data model (v1)
 * Aligned with README.md and SCREENS-v1-dwelling.md.
 *
 * Product decisions (v1):
 * - Resume: Show Resume screen when returning users hit the app and we find
 *   a saved session (e.g. after Landing or when choosing "Continue" from Settings).
 *   They can continue that session, start new, or delete the saved one.
 * - PDF: Do not persist. PDF is view-only in memory for the current session.
 *   Persist only session JSON (localStorage). Reduces surface area and avoids
 *   storing large binaries; user can re-upload if they return later.
 * - State: React state + Context for current session and flow (no Zustand/Redux).
 */

// --- Screen 3: Quick Setup ---
export type LossType =
  | 'fire'
  | 'wind'
  | 'water'
  | 'earthquake'
  | 'other'

// --- Screen 6: Coverage Sections ---
export interface CoverageSections {
  dwelling: boolean
  buildingCodeUpgrades: boolean
  otherStructures: boolean
  landscaping: boolean
  treesAndShrubs: boolean
}

// --- Screen 7: Overhead and Profit ---
export type OpCheckChoice =
  | 'yes'
  | 'might-be'
  | 'cannot-find'
  | 'not-sure'

// --- Screen 8: Systems Check (category ids match checklist order) ---
export const SYSTEMS_BEFORE_WORK = [
  'demolition',
  'debris-removal',
  'hazardous-material-testing',
  'soils-report',
  'land-survey',
  'site-preparation',
  'temporary-power',
  'temporary-toilet',
  'temporary-security-fencing',
  'temporary-job-trailer',
] as const

export const SYSTEMS_STRUCTURE = [
  'foundation',
  'framing',
  'roofing',
  'gutters-downspouts',
  'exterior-siding-eaves-trim',
  'stucco',
  'masonry',
  'steel',
  'waterproofing',
  'sheet-metal-flashings',
  'erosion-control',
  'land-stabilization',
] as const

export const SYSTEMS_SYSTEMS = [
  'electrical',
  'plumbing',
  'hvac',
  'fire-sprinklers',
  'fire-safety-system',
  'security-system',
  'intercom',
  'telephone-cable-internet',
  'vacuum-system',
  'water-filtration',
  'septic-sewer',
  'drainage',
] as const

export const SYSTEMS_INTERIOR = [
  'drywall',
  'insulation',
  'flooring',
  'ceramic-tile',
  'marble-granite',
  'cabinets',
  'cabinet-hardware',
  'plastic-laminate-countertops',
  'closet-packages',
  'stairs-railings',
  'millwork',
  'finish-carpentry',
  'doors-trim',
  'door-hardware',
  'windows-patio-doors',
  'window-trim',
  'window-coverings',
  'skylights',
  'glass-mirrors-shower-doors',
  'shower-pans',
  'bath-accessories',
  'painting',
  'wallpaper',
  'light-fixtures',
  'work-benches-shelving',
  'weatherstripping',
] as const

export const SYSTEMS_EXTERIOR = [
  'driveway',
  'patios-walkways',
  'decks',
  'fencing',
  'retaining-walls',
  'landscaping',
  'trees-shrubs',
  'antenna-satellite',
] as const

export const SYSTEMS_SPECIAL = [
  'fireplace',
  'garage-door-opener',
  'appliances',
  'built-in-entertainment',
  'jacuzzi-hot-tub',
  'sauna',
] as const

export const SYSTEMS_PROFESSIONAL = [
  'architectural-engineering-fees',
  'permits-fees',
  'title-24',
  'decorator',
  'job-supervision',
  'scaffolding',
  'equipment',
  'interim-cleanup',
  'final-janitorial',
  'material-tax',
] as const

export type SystemCategoryId =
  | (typeof SYSTEMS_BEFORE_WORK)[number]
  | (typeof SYSTEMS_STRUCTURE)[number]
  | (typeof SYSTEMS_SYSTEMS)[number]
  | (typeof SYSTEMS_INTERIOR)[number]
  | (typeof SYSTEMS_EXTERIOR)[number]
  | (typeof SYSTEMS_SPECIAL)[number]
  | (typeof SYSTEMS_PROFESSIONAL)[number]

export type SystemsMissingFollowUp = 'yes' | 'no' | 'not-sure'

// --- Screen 9: Room Selection ---
export const ROOM_IDS = [
  'entry-foyer',
  'living-room',
  'dining-room',
  'family-room-den',
  'kitchen',
  'primary-bedroom',
  'other-bedrooms',
  'bathrooms',
  'hallways-stairs',
  'laundry-room',
  'basement-crawl-space',
  'attic',
  'attached-garage',
  'porch-deck-patio',
  'other-interior',
  'other-exterior',
] as const

export type RoomId = (typeof ROOM_IDS)[number]

// --- Screen 10: Room checklist (7 questions per room) ---
export type StandardUpgradedUnsure = 'standard' | 'upgraded' | 'not-sure'
export type YesNoUnsure = 'yes' | 'no' | 'not-sure'
export type YesNo = 'yes' | 'no'

export interface RoomAnswers {
  floors: { choice: StandardUpgradedUnsure; note?: string }
  wallsCeiling: { choice: StandardUpgradedUnsure; note?: string }
  builtIns: { choice: YesNoUnsure; note?: string }
  windows: { choice: StandardUpgradedUnsure; note?: string }
  lightFixtures: { choice: StandardUpgradedUnsure; note?: string }
  architecturalFeatures: { choice: YesNoUnsure; note?: string }
  anythingElse: { choice: YesNo; note?: string }
}

// --- Screen 11: Site and Access ---
export type SiteAccessChoice = YesNoUnsure

export interface SiteAccessAnswers {
  slopeOrHillside: { choice: SiteAccessChoice; note?: string }
  higherCostArea: { choice: SiteAccessChoice; note?: string }
  unusualConditions: { choice: SiteAccessChoice; note?: string }
  otherStructures: { choice: YesNo; note?: string }
}

// --- Screen 12: Global Issues ---
export type CodeUpgradesChoice =
  | 'yes-in-estimate'
  | 'mentioned-unsure'
  | 'no-one-mentioned'
  | 'not-sure'

export type PermitsChoice = 'yes' | 'not-sure' | 'cannot-find'

export type RebuildChoice = 'same' | 'different' | 'undecided'

export interface GlobalIssuesAnswers {
  codeUpgrades: CodeUpgradesChoice
  permitsEngineering: PermitsChoice
  rebuildSameOrDifferent: RebuildChoice
  anythingMissing: { choice: YesNoUnsure; note?: string }
}

// --- Session (README + all screens) ---
export interface EstimateSession {
  id: string
  nickname: string
  lossType: LossType
  /** User uploaded a PDF this session (file kept in memory only, not persisted). */
  hasPdf: boolean
  createdAt: string
  updatedAt: string
  // Screen 6
  coverageSections?: CoverageSections
  // Screen 7
  opCheck?: OpCheckChoice
  // Screen 8
  systemsChecked?: SystemCategoryId[]
  systemsMissingFollowUp?: { choice: SystemsMissingFollowUp; note?: string }
  // Screen 9
  roomsSelected?: RoomId[]
  // Screen 10
  answersByRoom?: Partial<Record<RoomId, RoomAnswers>>
  // Screen 11
  siteAccess?: SiteAccessAnswers
  // Screen 12
  globalIssues?: GlobalIssuesAnswers
}

// --- Helpers for creating blank / default session ---
export function createEmptyCoverageSections(): CoverageSections {
  return {
    dwelling: false,
    buildingCodeUpgrades: false,
    otherStructures: false,
    landscaping: false,
    treesAndShrubs: false,
  }
}

export function createEmptyRoomAnswers(): RoomAnswers {
  return {
    floors: { choice: 'standard' },
    wallsCeiling: { choice: 'standard' },
    builtIns: { choice: 'no' },
    windows: { choice: 'standard' },
    lightFixtures: { choice: 'standard' },
    architecturalFeatures: { choice: 'no' },
    anythingElse: { choice: 'no' },
  }
}

export function createEmptySiteAccessAnswers(): SiteAccessAnswers {
  return {
    slopeOrHillside: { choice: 'no' },
    higherCostArea: { choice: 'no' },
    unusualConditions: { choice: 'no' },
    otherStructures: { choice: 'no' },
  }
}

export function createEmptyGlobalIssuesAnswers(): GlobalIssuesAnswers {
  return {
    codeUpgrades: 'not-sure',
    permitsEngineering: 'not-sure',
    rebuildSameOrDifferent: 'undecided',
    anythingMissing: { choice: 'no' },
  }
}

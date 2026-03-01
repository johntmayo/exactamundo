export type LossType = 'fire' | 'wind' | 'water' | 'earthquake' | 'other'

export interface CoverageSectionAnswers {
  dwelling: boolean
  buildingCodeUpgrades: boolean
  otherStructures: boolean
  landscaping: boolean
  treesAndShrubs: boolean
}

export type OPCheckAnswer = 'yes-listed' | 'might-be' | 'cannot-find' | 'not-sure'

export const SYSTEM_CHECK_IDS = [
  'demolition',
  'debris-removal',
  'hazardous-material-testing',
  'soils-report',
  'land-survey',
  'site-preparation',
  'temporary-power',
  'temporary-utilities',
  'temporary-toilet',
  'temporary-security-fencing',
  'temporary-job-trailer-storage',
  'foundation',
  'framing-rough-carpentry',
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
  'electrical',
  'plumbing',
  'hvac',
  'fire-sprinklers',
  'fire-safety-system',
  'security-system',
  'intercom-system',
  'telephone-cable-internet-wiring',
  'vacuum-system',
  'water-filtration-system',
  'septic-system-sewer-tie-in',
  'drainage',
  'drywall',
  'insulation',
  'flooring',
  'ceramic-tile',
  'marble-granite',
  'cabinets',
  'cabinet-hardware',
  'plastic-laminate-cultured-countertops',
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
  'driveway',
  'patios-walkways',
  'decks',
  'fencing',
  'retaining-walls',
  'landscaping',
  'trees-and-shrubs',
  'antenna-satellite-dish',
  'fireplace-fireplace-doors',
  'garage-door-opener',
  'appliances',
  'built-in-entertainment-system',
  'jacuzzi-hot-tub',
  'sauna',
  'architectural-engineering-fees',
  'permits-fees-plan-checking',
  'title-24-calculations',
  'decorator-interior-designer',
  'job-supervision',
  'scaffolding',
  'equipment',
  'interim-job-clean-up',
  'final-janitorial',
  'material-tax',
] as const

export type SystemCheckId = (typeof SYSTEM_CHECK_IDS)[number]

export type SystemsMissingChoice = 'yes' | 'no' | 'not-sure'

export interface SystemsCheckAnswers {
  foundCategories: SystemCheckId[]
  missingApplied: {
    choice: SystemsMissingChoice
    note?: string
  }
}

export const AREA_IDS = [
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
  'other-interior-area',
  'other-exterior-area',
] as const

export type AreaSelection = (typeof AREA_IDS)[number]

export type StandardChoice = 'standard-basic' | 'upgraded-custom' | 'not-sure'
export type YesNoUnsureChoice = 'yes' | 'no' | 'not-sure'
export type YesNoChoice = 'yes' | 'no'

export interface AreaAnswers {
  floors: { choice: StandardChoice; note?: string }
  wallsCeilings: { choice: StandardChoice; note?: string }
  builtIns: { choice: YesNoUnsureChoice; note?: string }
  windows: { choice: StandardChoice; note?: string }
  lightFixtures: { choice: StandardChoice; note?: string }
  architecturalFeatures: { choice: YesNoUnsureChoice; note?: string }
  anythingElse: { choice: YesNoChoice; note?: string }
}

export interface SiteAccessAnswers {
  slopeHillsideOrAccessDifficulty: { choice: YesNoUnsureChoice; note?: string }
  highConstructionCostArea: { choice: YesNoUnsureChoice; note?: string }
  unusualSiteConditions: { choice: YesNoUnsureChoice; note?: string }
  otherStructuresOnProperty: { choice: YesNoChoice; note?: string }
}

export type CodeUpgradesChoice =
  | 'yes-discussed-and-in-estimate'
  | 'mentioned-but-unsure'
  | 'not-mentioned'
  | 'not-sure'

export type PermitsEngineeringChoice = 'yes-can-see' | 'not-sure' | 'cannot-find'
export type RebuildChoice = 'same-home' | 'different-home' | 'not-decided'

export interface GlobalAnswers {
  codeUpgrades: CodeUpgradesChoice
  permitsEngineeringInspections: PermitsEngineeringChoice
  rebuildPlan: RebuildChoice
  knownMissingOrWrongItems: { choice: YesNoUnsureChoice; note?: string }
}

export interface EstimateSession {
  id: string
  nickname: string
  lossType: LossType
  coverageSections: CoverageSectionAnswers
  opCheck: OPCheckAnswer
  systemsCheck: SystemsCheckAnswers
  areas: AreaSelection[]
  answersByArea: {
    [areaId: string]: AreaAnswers
  }
  siteAndAccess: SiteAccessAnswers
  globalAnswers: GlobalAnswers
  pdfFileName?: string
  createdAt: string
  updatedAt: string
}

export function createEmptyEstimateSession(
  seed: Partial<Pick<EstimateSession, 'nickname' | 'lossType'>> = {}
): EstimateSession {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    nickname: seed.nickname ?? 'Untitled Review',
    lossType: seed.lossType ?? 'other',
    coverageSections: {
      dwelling: false,
      buildingCodeUpgrades: false,
      otherStructures: false,
      landscaping: false,
      treesAndShrubs: false,
    },
    opCheck: 'not-sure',
    systemsCheck: {
      foundCategories: [],
      missingApplied: {
        choice: 'not-sure',
      },
    },
    areas: [],
    answersByArea: {},
    siteAndAccess: {
      slopeHillsideOrAccessDifficulty: { choice: 'not-sure' },
      highConstructionCostArea: { choice: 'not-sure' },
      unusualSiteConditions: { choice: 'not-sure' },
      otherStructuresOnProperty: { choice: 'no' },
    },
    globalAnswers: {
      codeUpgrades: 'not-sure',
      permitsEngineeringInspections: 'not-sure',
      rebuildPlan: 'not-decided',
      knownMissingOrWrongItems: { choice: 'not-sure' },
    },
    createdAt: now,
    updatedAt: now,
  }
}

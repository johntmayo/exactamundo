import { roomLabel } from '../data/checklists'
import type { EstimateSession, RoomId } from '../types/session'

function add(lines: string[], text: string) {
  lines.push(text)
}

function section(lines: string[], title: string) {
  if (lines.length > 0) lines.push('')
  lines.push(title.toUpperCase())
  lines.push('')
}

function roomFlags(session: EstimateSession, roomId: RoomId): string[] {
  const answer = session.answersByRoom?.[roomId]
  if (!answer) return []
  const flags: string[] = []

  if (answer.floors.choice === 'upgraded') {
    flags.push(`Upgraded/custom flooring noted${answer.floors.note ? `: ${answer.floors.note}` : ''}.`)
  } else if (answer.floors.choice === 'not-sure') {
    flags.push('Flooring details were uncertain; worth confirming the grade listed in the estimate.')
  }

  if (answer.wallsCeiling.choice === 'upgraded') {
    flags.push(
      `Special wall/ceiling finishes noted${answer.wallsCeiling.note ? `: ${answer.wallsCeiling.note}` : ''}.`
    )
  } else if (answer.wallsCeiling.choice === 'not-sure') {
    flags.push('Wall/ceiling finish details were uncertain; confirm finish assumptions in the estimate.')
  }

  if (answer.builtIns.choice === 'yes') {
    flags.push(`Built-ins were present${answer.builtIns.note ? `: ${answer.builtIns.note}` : ''}.`)
  } else if (answer.builtIns.choice === 'not-sure') {
    flags.push('Unclear if built-ins were included; confirm with the adjuster.')
  }

  if (answer.windows.choice === 'upgraded') {
    flags.push(`Specialty windows noted${answer.windows.note ? `: ${answer.windows.note}` : ''}.`)
  } else if (answer.windows.choice === 'not-sure') {
    flags.push('Window specifications were uncertain; confirm type and size assumptions.')
  }

  if (answer.lightFixtures.choice === 'upgraded') {
    flags.push(
      `Notable/custom lighting fixtures were present${
        answer.lightFixtures.note ? `: ${answer.lightFixtures.note}` : ''
      }.`
    )
  } else if (answer.lightFixtures.choice === 'not-sure') {
    flags.push('Lighting fixture scope was uncertain; confirm whether fixtures are builder-grade or upgraded.')
  }

  if (answer.architecturalFeatures.choice === 'yes') {
    flags.push(
      `Special architectural features were present${
        answer.architecturalFeatures.note ? `: ${answer.architecturalFeatures.note}` : ''
      }.`
    )
  } else if (answer.architecturalFeatures.choice === 'not-sure') {
    flags.push('Architectural feature details were uncertain; worth confirming in scope notes.')
  }

  if (answer.anythingElse.choice === 'yes' && answer.anythingElse.note) {
    flags.push(`Additional room notes: ${answer.anythingElse.note}.`)
  }

  return flags
}

export function buildSummary(session: EstimateSession): string {
  const lines: string[] = []
  add(lines, 'ESTIMATE REVIEW NOTES')
  add(lines, `Prepared: ${new Date().toLocaleDateString()}`)
  add(lines, `Property: ${session.nickname}`)

  const coverageFindings: string[] = []
  if (session.coverageSections && !session.coverageSections.buildingCodeUpgrades) {
    coverageFindings.push(
      'The "Building Code Upgrades" section does not appear in the estimate. Please confirm legally required code upgrades are included and itemized.'
    )
  }
  if (session.opCheck === 'cannot-find') {
    coverageFindings.push(
      'Overhead and Profit (O&P) was not found. Please confirm both are included at appropriate contractor rates.'
    )
  }
  if (session.opCheck === 'might-be' || session.opCheck === 'not-sure') {
    coverageFindings.push('Overhead and Profit was unclear. Please point me to where O&P is shown and how it is calculated.')
  }

  if (coverageFindings.length > 0) {
    section(lines, 'Coverage Sections')
    coverageFindings.forEach((finding) => add(lines, `- ${finding}`))
  }

  if (session.systemsMissingFollowUp) {
    section(lines, 'Systems')
    if (session.systemsMissingFollowUp.choice === 'yes') {
      add(
        lines,
        `- I believe some system categories are missing from the estimate${
          session.systemsMissingFollowUp.note ? `: ${session.systemsMissingFollowUp.note}` : '.'
        }`
      )
    } else if (session.systemsMissingFollowUp.choice === 'not-sure') {
      add(lines, '- I was unsure whether all relevant system categories were included; please confirm completeness.')
    } else {
      add(lines, '- Most system categories appeared present, but please confirm all applicable trades are fully scoped.')
    }
  }

  const selectedRooms = session.roomsSelected ?? []
  selectedRooms.forEach((roomId) => {
    const flags = roomFlags(session, roomId)
    if (flags.length === 0) return
    section(lines, roomLabel(roomId))
    flags.forEach((flag) => add(lines, `- ${flag}`))
  })

  if (session.siteAccess) {
    const site: string[] = []
    if (session.siteAccess.slopeOrHillside.choice === 'yes') {
      site.push(
        `Property has difficult access/slope${session.siteAccess.slopeOrHillside.note ? `: ${session.siteAccess.slopeOrHillside.note}` : ''}.`
      )
    }
    if (session.siteAccess.higherCostArea.choice === 'yes') {
      site.push(
        `Property is in a higher-cost area${session.siteAccess.higherCostArea.note ? `: ${session.siteAccess.higherCostArea.note}` : ''}.`
      )
    }
    if (session.siteAccess.unusualConditions.choice === 'yes') {
      site.push(
        `Unusual site conditions may add cost${session.siteAccess.unusualConditions.note ? `: ${session.siteAccess.unusualConditions.note}` : ''}.`
      )
    }
    if (session.siteAccess.otherStructures.choice === 'yes') {
      site.push(
        `Other structures were present${session.siteAccess.otherStructures.note ? `: ${session.siteAccess.otherStructures.note}` : ''}.`
      )
    }
    if (site.length > 0) {
      section(lines, 'Site and Access')
      site.forEach((item) => add(lines, `- ${item}`))
    }
  }

  if (session.globalIssues) {
    const global: string[] = []
    if (session.globalIssues.codeUpgrades === 'mentioned-unsure' || session.globalIssues.codeUpgrades === 'not-sure') {
      global.push('Code upgrade coverage was unclear; please confirm itemized code-related costs are included.')
    } else if (session.globalIssues.codeUpgrades === 'no-one-mentioned') {
      global.push('No one discussed code upgrades; please confirm required code compliance costs are included.')
    }

    if (session.globalIssues.permitsEngineering === 'cannot-find' || session.globalIssues.permitsEngineering === 'not-sure') {
      global.push('Engineering/permit/inspection costs were unclear; please confirm they are included.')
    }

    if (session.globalIssues.rebuildSameOrDifferent === 'different') {
      global.push('I may rebuild differently from prior design; please explain how policy settlement applies to this plan.')
    }

    if (session.globalIssues.anythingMissing.choice === 'yes' && session.globalIssues.anythingMissing.note) {
      global.push(`Additional concerns: ${session.globalIssues.anythingMissing.note}.`)
    }

    if (global.length > 0) {
      section(lines, 'Whole house / general')
      global.forEach((item) => add(lines, `- ${item}`))
    }
  }

  if (lines.length <= 3) {
    add(lines, '')
    add(
      lines,
      'Based on your answers, no major gaps stood out. If something still feels off, trust that instinct and ask your adjuster to walk line-by-line through the estimate with you.'
    )
  }

  add(lines, '')
  add(
    lines,
    'This review was prepared using the Estimate Review Helper, informed by guidance from United Policyholders (uphelp.org). This is not legal advice.'
  )
  return lines.join('\n')
}

import React from 'react'

/**
 * Render text with `**emphasized**` markers as bold-white spans, matching
 * the highlight treatment used in the Architect bio.
 *
 * Used in agent dialogues to anchor the reader's eye on key facts (numbers,
 * strategic terms, structural concepts) without bolding wholesale, providing
 * just enough contrast to make long paragraphs scannable.
 *
 * Example:
 *   renderEmphasized('I process **200 tickets a day**.')
 *   => "I process " + <span>200 tickets a day</span> + "."
 */
export function renderEmphasized(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 700 }}>
          {part.slice(2, -2)}
        </span>
      )
    }
    return <React.Fragment key={i}>{part}</React.Fragment>
  })
}

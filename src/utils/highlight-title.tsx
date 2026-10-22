import { Fragment, ReactNode } from 'react'

const MARKER_REGEX = /\*[^*]+\*/

/** True for CMS titles that mark highlighted words with *asterisks*. */
export const hasHighlightMarkers = (title: unknown): boolean =>
	typeof title === 'string' && MARKER_REGEX.test(title)

/**
 * Renders a CMS title where words wrapped in *asterisks* get the highlight class,
 * e.g. "*Reviews* by clients and experts". Titles containing HTML tags are
 * rendered as HTML. Returns undefined for empty titles so callers can fall back
 * to their default heading.
 */
export const renderHighlightedTitle = (title: ReactNode, highlightClassName?: string): ReactNode => {
	if (title === undefined || title === null || title === '') return undefined
	if (typeof title !== 'string') return title
	if (/<(span|b|strong)\b/i.test(title)) {
		return <span dangerouslySetInnerHTML={{ __html: title }} />
	}
	if (!hasHighlightMarkers(title)) return title

	return title
		.split(/(\*[^*]+\*)/g)
		.filter(Boolean)
		.map((part, index) =>
			MARKER_REGEX.test(part) && part.startsWith('*') && part.endsWith('*') ? (
				<span key={index} className={highlightClassName}>
					{part.slice(1, -1)}
				</span>
			) : (
				<Fragment key={index}>{part}</Fragment>
			)
		)
}

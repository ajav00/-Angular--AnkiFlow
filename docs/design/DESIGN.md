# AnkiFlow Design System

## Purpose

This document defines the visual and interaction language for the AnkiFlow web
application. It is the durable design reference for contributors and coding
agents. The application should be implementable from this document and the
source-controlled design tokens without requiring access to Google Stitch.

The runtime source of truth for exact token values is
[`src/styles/tokens.css`](../../src/styles/tokens.css). This document explains
how and why those tokens are used.

## Design Source

- Stitch project: **Smart Study Deck Hub**
- Stitch project ID: `3809194367545955293`
- Selected direction: **Playful**
- Dashboard source screen ID: `dc680d3c1bbb45278f8eab548abf6a77`
- Local React visual reference: `ui-reference`
- Last documented: July 25, 2026

Stitch remains a source for new explorations and visual references. Changes made
in Stitch are not authoritative until they are documented here and reflected in
the source-controlled tokens and components.

## Product Character

AnkiFlow is a study application that combines the clarity of a productivity
dashboard with the warmth and encouragement of a modern learning experience.
The interface should feel:

- Focused, without feeling clinical.
- Playful, without feeling childish.
- Structured, without feeling rigid.
- Encouraging, without distracting from study.
- Comfortable during long sessions.

The product is designed for adult learners and students who need clear
organization, visible progress, and positive reinforcement.

## Design Principles

### Clarity before decoration

Every screen must have an obvious purpose and a clear primary action. Decorative
elements may support hierarchy or emotion, but must never reduce readability.

### One primary action per section

Use one visually dominant action in each page section. Secondary and ghost
actions must not compete with it.

### Progress should feel rewarding

Progress, streaks, completed reviews, and mastery should be visible and
encouraging. Use color and subtle motion to acknowledge success.

### Content determines density

Use generous spacing for dashboards, summaries, and study experiences. Use a
more compact rhythm for card browsers, tables, and data-heavy management views.

### Familiar patterns with a distinct voice

Navigation, forms, dialogs, and feedback must follow familiar interaction
patterns. AnkiFlow's identity comes from typography, color, shape, illustration,
and motion rather than unusual controls.

## Color System

Use semantic tokens instead of literal color values in components.

| Role                | Token                         | Value     | Usage                                     |
| ------------------- | ----------------------------- | --------- | ----------------------------------------- |
| Primary             | `--color-primary`             | `#006f69` | Primary text, progress, active navigation |
| Primary container   | `--color-primary-container`   | `#79f3ea` | Primary actions and highlighted panels    |
| Secondary           | `--color-secondary`           | `#6d5e00` | Warm accent text and icons                |
| Secondary container | `--color-secondary-container` | `#ffe66d` | Warm actions, streaks, and highlights     |
| Tertiary            | `--color-tertiary`            | `#8f5662` | Review and accent text                    |
| Tertiary container  | `--color-tertiary-container`  | `#ffdee3` | Review and accent surfaces                |
| Surface             | `--color-surface`             | `#ffffff` | Main workspace background                 |
| Low surface         | `--color-surface-low`         | `#f3fbf3` | Navigation and grouped areas              |
| Container           | `--color-surface-container`   | `#e2eae2` | Secondary panels                          |
| High surface        | `--color-surface-high`        | `#dce5dd` | Heatmap and elevated tonal areas          |
| Text                | `--color-on-surface`          | `#161d19` | Primary text and strong borders           |
| Muted text          | `--color-on-surface-muted`    | `#4b4736` | Secondary text and metadata               |
| Outline             | `--color-outline`             | `#4b4736` | Secondary outlines                        |
| Soft outline        | `--color-outline-soft`        | `#161d19` | Strong component borders                  |
| Danger              | `--color-danger`              | `#ba1a1a` | Destructive actions and errors            |

### Color rules

- Use white for the workspace and pale green for navigation and grouped areas.
- Reserve saturated colors for actions, progress, categories, and feedback.
- Use white inside cards when separation from the page background is needed.
- Never communicate state using color alone. Pair color with text, icons, or
  shape.
- Do not introduce an arbitrary color when an existing semantic token fits.
- New tokens must describe a reusable semantic role, not a single screen.

## Typography

### Font families

- Headings: **Plus Jakarta Sans**
- Body, labels, controls, and data: **Be Vietnam Pro**

Plus Jakarta Sans provides bold, friendly display typography. Be Vietnam Pro
keeps controls and dense learning information highly legible.

### Type scale

| Style          | Font              | Size   | Weight | Line height |
| -------------- | ----------------- | ------ | ------ | ----------- |
| Display        | Plus Jakarta Sans | `48px` | `900`  | `1.2`       |
| Heading large  | Plus Jakarta Sans | `32px` | `800`  | `1.3`       |
| Heading medium | Plus Jakarta Sans | `24px` | `800`  | `1.4`       |
| Body large     | Be Vietnam Pro    | `18px` | `400`  | `1.6`       |
| Body           | Be Vietnam Pro    | `16px` | `400`  | `1.6`       |
| Body small     | Be Vietnam Pro    | `14px` | `400`  | `1.5`       |
| Label          | Be Vietnam Pro    | `14px` | `700`  | `1.2`       |
| Label small    | Be Vietnam Pro    | `12px` | `700`  | `1.2`       |

Scale large headings down on small screens. A desktop `48px` display heading
should normally become approximately `32px` on mobile.

### Typography rules

- Use the display family for page and section headings, not for dense controls.
- Use the sans-serif family for forms, navigation, tables, metadata, and study
  actions.
- Avoid using more than three font weights in one view.
- Keep paragraphs readable and reasonably narrow.
- Labels must remain legible against pastel and colored backgrounds.

## Spacing and Layout

The spacing system uses an `8px` base rhythm.

| Role                  | Value    |
| --------------------- | -------- |
| Base unit             | `8px`    |
| Mobile page margin    | `16px`   |
| Desktop page margin   | `40px`   |
| Standard grid gutter  | `24px`   |
| Standard card padding | `24px`   |
| Maximum content width | `1280px` |

### Desktop

- Use a 12-column fluid grid.
- Use a persistent sidebar where appropriate.
- Keep main content centered and constrained to the maximum content width.
- Allow dashboard cards to breathe; do not fill every available area.

### Mobile

- Use a single-column content flow with `16px` side margins.
- Replace the desktop sidebar with mobile navigation.
- Allow deliberate horizontal scrolling for compact card groups or chips.
- Keep primary actions within comfortable thumb reach when practical.

### Layout rules

- Prefer CSS Grid for page-level composition and Flexbox for component-level
  alignment.
- Avoid absolute positioning for primary layout.
- Use container-aware components where possible.
- Do not encode the original Stitch canvas dimensions into the implementation.
- The design must work from `320px` wide through large desktop displays.

## Shape

The shape language is compact, playful, and deliberately outlined.

| Role           | Token         | Value  |
| -------------- | ------------- | ------ |
| Controls       | `--radius-sm` | `8px`  |
| Small cards    | `--radius-md` | `12px` |
| Standard cards | `--radius-lg` | `14px` |
| Feature cards  | `--radius-xl` | `16px` |

- Buttons and inputs should normally use `8px` to `12px` radii.
- Large content cards may use `16px` to `24px` radii.
- Progress tracks and small status chips may use a full pill shape.
- Heatmap cells should use a restrained `2px` to `4px` radius.
- Avoid mixing sharp and highly rounded containers in the same hierarchy.

## Elevation and Borders

Depth is created through tonal layers, dark outlines, and solid offset shadows.

- Page background: warm surface with no shadow.
- Standard card: white or pastel surface, `2px` dark outline, and a `4px`
  solid offset shadow.
- Floating content: a `6px` solid offset shadow.
- Interactive hover: translate the element toward its shadow and reduce the
  shadow offset.
- Dividers: dark rules for major regions and tonal separation for minor groups.

The strong outline and offset shadow are core to the playful neo-brutalist
direction and must remain consistent across components.

## Core Components

The reusable visual primitives live in `src/app/shared/ui`.

### Button

Supported variants:

- `primary`
- `secondary`
- `ghost`
- `danger`

Rules:

- Use one primary button per logical section.
- Include visible hover, active, disabled, and focus states.
- Icon-only buttons require an accessible label.
- Touch targets should be at least `44px` in either dimension when practical.

### Card

Supported variants:

- `default`
- `primary`
- `success`
- `warning`

Rules:

- Use `24px` internal padding for standard desktop cards.
- Use tonal backgrounds to distinguish categories.
- Keep card actions predictable and consistently positioned.
- Do not make an entire card clickable when it contains other interactive
  controls unless the interaction is implemented accessibly.

### Badge and Chip

- Use for categories, states, counts, and compact metadata.
- Pair tinted backgrounds with readable text from the same semantic color
  family.
- Do not use badges for primary actions.

### Progress

- Use thick, fully rounded tracks for mastery and completion.
- Use the secondary color for successful completion.
- Always provide a text value or accessible name in addition to the visual bar.

### Input

- Prefer a soft filled surface or subtle outline.
- Focus must be visible and use the primary color.
- Labels remain visible; placeholders are not labels.
- Validation messages appear close to the related field.

### Dialog

- Build interaction and accessibility with Angular CDK.
- Trap focus while open and restore focus when closed.
- Use explicit action labels.
- Destructive confirmation must clearly name the affected object.

### Skeleton and Empty State

- Skeletons should approximate the final layout to reduce visual movement.
- Empty states must explain what is missing and offer a useful next action.
- Decorative empty-state art must not replace explanatory text.

## Dashboard Composition

The initial Playful dashboard is composed from:

- Application shell
- Sidebar
- Top bar
- Welcome banner
- Review summary
- Study statistics
- Deck progress grid
- Deck progress cards
- Activity heatmap
- Quick actions

The page component coordinates these sections. It must not reimplement their
internal presentation.

## Deck Library Composition

The deck library is composed from:

- Page header with import and creation actions
- Library summary
- Search and filter toolbar
- Responsive deck grid
- Deck library cards

The current controls are presentational and use typed fixtures. Search, sorting,
creation, import, and deck navigation remain intentionally disconnected until
their application contracts are defined.

## Deck Details Composition

The deck details screen is composed from:

- Deck identity header and primary study action
- Deck statistics
- Flashcard search and state controls
- Responsive flashcard list

Desktop uses a compact tabular card browser. Tablet and mobile layouts transform
each row into a labeled card so front, back, state, schedule, and actions remain
readable without horizontal scrolling. The route accepts a deck identifier, but
the current implementation intentionally renders typed fixture data.

## Study Session Composition

The study session is a focused route outside the standard application shell. It
is composed from:

- Session progress and exit header
- Front and revealed answer surfaces
- Recall rating controls
- Session summary
- Keyboard shortcut reference

The current screen deliberately shows the revealed state so both card faces and
all rating controls can be evaluated with fixture data. Card sequencing, answer
reveal, keyboard handling, scheduling, and persistence are deferred until the
study application contracts are defined.

## Create and Edit Deck Composition

Creation and editing share one reusable page with mode-specific headings and
actions. The screen is composed from:

- Deck metadata form
- Category and language selectors
- Tag editor
- Note type selector
- Ordered note fields
- Anki compatibility guidance
- Card template preview
- Responsive save and cancel actions

The current form is intentionally presentational. Note types and ordered fields
model the concepts required for future Anki imports, while validation,
reordering, template editing, dirty-state protection, and persistence remain
deferred.

## Create and Edit Flashcard Composition

Creation and editing share one reusable card editor with route-driven headings
and actions. The screen is composed from:

- Front, back, example, and hint fields
- Note type selector
- Tag editor
- Reverse-card option
- Possible duplicate notice
- Live study-card preview
- Responsive save and cancel actions

Desktop keeps the form and preview visible side by side. Mobile stacks the
sections and pins the primary actions above the application navigation. The
current editor uses typed fixture data only; field validation, duplicate
matching, template mapping, reverse-card generation, dirty-state protection,
and persistence remain deferred.

## Motion

Motion should communicate state and reinforce progress.

- Use short transitions, generally `150ms` to `250ms`.
- Buttons may use a subtle lift on hover and a slight press on activation.
- Progress changes may animate when first displayed.
- Success feedback may use a restrained bounce or scale effect.
- Avoid continuous decorative animation.
- Respect `prefers-reduced-motion` and provide a non-animated experience.

## Responsive Behavior

Start with the smallest supported layout and progressively enhance it.

- Mobile: single column, compact header, bottom or drawer navigation.
- Tablet: flexible one- or two-column composition.
- Desktop: persistent sidebar and multi-column dashboard.
- Large desktop: constrain content instead of indefinitely stretching cards.

Components own their internal responsiveness. Pages own only high-level
composition.

## Accessibility

Accessibility is a product requirement, not a later enhancement.

- Target WCAG 2.2 AA.
- All interactions must be keyboard accessible.
- Focus indicators must remain visible.
- Use semantic HTML before adding ARIA.
- Maintain sufficient text and control contrast.
- Provide labels for controls and alternative text for meaningful images.
- Do not rely on hover for essential information.
- Announce asynchronous feedback where appropriate.
- Support browser zoom and text enlargement without clipping content.

Angular CDK should be used for overlays, focus management, keyboard interaction,
and other complex accessibility behavior.

## Content and Language

- All source files, documentation, code comments, tests, fixtures, and initial UI
  copy are written in English.
- Product copy should be concise, supportive, and action-oriented.
- Avoid judgmental language about study performance.
- Prefer specific labels such as `Review 18 cards` over vague labels such as
  `Continue`.
- Visible text should eventually move into localization resources. English is
  the default locale.

## Dummy Data Phase

The first implementation phase uses typed fixtures only.

- Do not add HTTP calls, database connections, authentication, or OpenAPI
  clients.
- Keep fixtures under each feature's `data` directory.
- Components receive data through inputs and emit user intent through outputs.
- Dummy actions may navigate to placeholder screens or show local feedback.
- Model fixture shapes so they can later be mapped from backend contracts
  without changing component APIs.

## Implementation Rules

- Use Angular standalone components.
- Every component must keep TypeScript, template, and component styles in
  separate `.ts`, `.html`, and `.scss` files.
- Use signals for local reactive state.
- Prefer Angular CDK behavior over a fully styled component framework.
- Use Tailwind utilities and semantic design tokens.
- Do not use literal brand colors inside component templates.
- Keep business-specific components inside their feature.
- Keep `shared/ui` free of business terminology and backend models.
- Do not create a reusable component before it has a clear responsibility.
- Do not add PrimeNG, Angular Material components, or NgRx without a documented
  use case.

## Updating the Design System

When the design changes:

1. Record the decision and rationale in this document.
2. Update semantic values in `src/styles/tokens.css`.
3. Update affected shared UI components.
4. Add or update visual reference screenshots.
5. Verify responsive behavior, keyboard navigation, and contrast.
6. Record the Stitch screen ID when the change originated in Stitch.

Do not silently change tokens to match a single screen. Shared token changes must
be evaluated across the complete application.

### Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|:-----:|-------------|
| 1 | Accessibility | 1/4 | 0 modals have `role="dialog"`, no `Esc` key handling, pervasive text contrast < 2.8:1 on table headers |
| 2 | Performance | 2/4 | Raw `<img>` in hero without `next/image`, `lucide-react` unused in bundle, non-passive wheel listener |
| 3 | Theming | 1/4 | `primary` tokens in config are ignored; extensive hardcoded hex colors across 10+ files; 0 dark mode |
| 4 | Responsive Design | 2/4 | `AdminSidebar` has fixed `w-[220px]` with no mobile drawer (squishes content on mobile); touch targets < 28px |
| 5 | Implementation Integrity | 2/4 | Undefined CSS var `var(--font-jetbrains-mono)`, dead state in ProfileClient, unused props in CourtSlotCell |
| **Total** | | **8/20** | **Poor (Major overhaul required)** |

### Implementation Integrity Verdict
**FAIL / REQUIRES OVERHAUL.**
While the underlying application features a robust business layer and good Next.js standalone build stability, the frontend implementation displays significant technical debt across all 5 dimensions. There is no unified modal system (all modals are ad-hoc `div` overlays without dialog semantics or keyboard traps), typography contrast fails WCAG AA across all administrative tables and booking cards, touch target sizes consistently fail mobile usability standards (26-28px hitboxes), and design tokens are bypassed in favor of raw hex values. The mechanical detector also flagged elastic bounce easing in the chatbot component.

### Executive Summary
- **Audit Health Score:** **8/20** (Poor)
- **Total Issues Found:** **15** (2 P0, 5 P1, 6 P2, 2 P3)
- **Top Critical Issues:**
  1. [P0] Admin layout permanently collapses on mobile devices due to un-toggleable fixed `w-[220px]` sidebar.
  2. [P0] All modal dialogs lack `role="dialog"`, `aria-modal="true"`, focus trapping, and `Escape` key listeners.
  3. [P1] Pervasive low-contrast text (`slate-400`/`gray-400` with 2.6:1 contrast ratio) violating WCAG AA 4.5:1.
  4. [P1] Touch target sizes for table row action buttons and pagination are under 28px (WCAG target size failure).
  5. [P1] Total disarray between declared design tokens (`primary-*`) and implementation (`emerald-*` + raw hex).
- **Recommended Next Steps:** Implement unified accessible Modal shell, build responsive mobile drawer for Admin, elevate typography contrast to `slate-500` minimum, and standardize color tokens.

### Detailed Findings by Severity

#### [P0] Admin Layout Collapse on Mobile Viewports
- **Location:** `src/app/(admin)/layout.tsx:26`, `src/components/layout/AdminSidebar.tsx:64`
- **Category:** Responsive Design
- **Impact:** `AdminSidebar` has hardcoded `w-[220px] flex-shrink-0` with no collapsible mobile drawer or breakpoint toggle (`hidden md:flex`). On mobile screens (375px - 768px), the sidebar permanently consumes 220px of the viewport, squishing the admin content into an unusable sliver (~155px), preventing staff from managing bookings or payments on mobile devices.
- **Recommendation:** Implement a responsive drawer pattern (hamburger toggle on mobile, slide-over drawer with backdrop, persistent sidebar on `lg:` viewports).
- **Suggested command:** `$impeccable adapt`

#### [P0] Missing Modal Dialog Semantics & Lack of Escape Key Dismissal
- **Location:** `src/components/ui/ConfirmDialog.tsx:1-40`, `src/components/booking/BookingDetailModal.tsx`, `CourtOperationsModal.tsx`, `ConfirmBookingModal.tsx`, etc.
- **Category:** Accessibility
- **Impact:** Not a single modal dialog in the entire application has `role="dialog"` or `role="alertdialog"`, `aria-modal="true"`, or `aria-labelledby`. None of the modals listen for the `Escape` key to close. Screen reader users are unaware a modal has opened, and keyboard-only users suffer from keyboard trapping with no way to dismiss dialogs using the standard `Esc` key.
- **WCAG/Standard:** WCAG 2.1 SC 2.1.1 (Keyboard), SC 2.1.2 (No Keyboard Trap), SC 4.1.2 (Name, Role, Value).
- **Recommendation:** Standardize a reusable `Modal` component with `role="dialog"`, `aria-modal="true"`, focus trapping, and an `Escape` key listener.
- **Suggested command:** `$impeccable harden`

#### [P1] Widespread Low-Contrast Text (Fails WCAG AA 4.5:1)
- **Location:** `src/components/admin/CourtTable.tsx:399`, `BookingRequestsClient.tsx:47`, `AllBookingsClient.tsx:82`, `AuditsClient.tsx:226,361`, `InvoiceList.tsx:274`, `BookingCard.tsx:56,64,77,90`
- **Category:** Accessibility
- **Impact:** Table headers and metadata subtext extensively use `text-slate-400` (`#94a3b8`, contrast 2.6:1 on white) and `text-gray-400` (`#9ca3af`, contrast 2.8:1 on white), and in `AuditsClient.tsx:361` `text-[#b5b3ae]` (contrast 2.1:1). All fail the WCAG AA minimum contrast ratio of 4.5:1, making critical table column headers and booking timestamps illegible for users with low vision or under glare.
- **WCAG/Standard:** WCAG 2.1 SC 1.4.3 (Contrast Minimum - Level AA).
- **Recommendation:** Elevate all informational text from `slate-400`/`gray-400` to at least `slate-500`/`gray-600` (contrast > 4.8:1 on white). Reserve `*-400` strictly for decorative non-text icons or inactive placeholders.
- **Suggested command:** `$impeccable typeset`

#### [P1] Sub-Standard Touch Targets on Interactive Elements (<44x44px)
- **Location:** `src/components/admin/EmployeesClient.tsx:258-290`, `CourtTable.tsx:401`, `src/components/ui/Pagination.tsx:324`
- **Category:** Responsive Design
- **Impact:** Table action buttons (`p-1.5` with 14px icons in `EmployeesClient.tsx`) have a clickable target area of approximately 26x26px. Pagination buttons (`sm` button) and calendar day buttons are 28–32px. Users on touch devices frequently mis-tap or miss the target completely.
- **WCAG/Standard:** WCAG 2.1 SC 2.5.5 (Target Size - AAA), SC 2.5.8 (Target Size Minimum - AA 24x24px with spacing).
- **Recommendation:** Increase touch target hitboxes to at least 40–44px (using padding or `min-h-[40px] min-w-[40px] flex items-center justify-center`).
- **Suggested command:** `$impeccable adapt`

#### [P1] Token Chaos & Hard-Coded Colors Proliferation
- **Location:** `tailwind.config.mts:12`, `src/components/layout/CustomerNav.tsx:8`, `AdminSidebar.tsx:71-80`, `PricingTimeline.tsx:118-122`, `AuditsClient.tsx:31-62`, `SlotPopup.tsx:70-72`
- **Category:** Theming
- **Impact:** The project defines a `primary` scale in `tailwind.config.mts` based on `#22c55e`, but the UI overwhelmingly hardcodes hex colors (`#1a1f2e`, `#FBFBFA`, `#EDF3EC`, `#346538`, `#10b981`, `#1f2937`) or uses Tailwind's unaliased `emerald-*` palette. Zero dark mode tokens exist. This makes theming brittle, unpredictable, and prevents any unified dark mode or brand rebranding.
- **Recommendation:** Consolidate brand tokens in `tailwind.config.mts` around the official `emerald` palette, replace ad-hoc hex values with semantic tokens (`bg-brand-primary`, `bg-surface-admin`, `bg-surface-header`).
- **Suggested command:** `$impeccable colorize`

#### [P1] Missing Accessible Names on Icon-Only Buttons
- **Location:** `src/components/admin/EmployeesClient.tsx:256-291`
- **Category:** Accessibility
- **Impact:** Buttons for edit, lock/unlock, and delete inside employee table rows have only a `title` attribute and no `aria-label`. Screen reader users hearing "Button" without an accessible label cannot discern what action the button will execute.
- **WCAG/Standard:** WCAG 2.1 SC 4.1.2 (Name, Role, Value).
- **Recommendation:** Add descriptive `aria-label` attributes to every icon-only button (e.g. `aria-label="Chỉnh sửa nhân viên Nguyễn Văn A"`).
- **Suggested command:** `$impeccable clarify`

#### [P1] Missing Next.js Image Optimization on High-Impact Hero
- **Location:** `src/app/(customer)/courts/CourtsClient.tsx:28-33`
- **Category:** Performance
- **Impact:** The hero section of `/courts` loads a large Unsplash photo (`w=1400`) via a standard HTML `<img>` tag without Next.js `<Image>`, lacking AVIF/WebP responsive generation, lazy-loading, and blur placeholders, triggering higher LCP (Largest Contentful Paint) metrics.
- **Recommendation:** Migrate to `next/image` with proper `priority`, `fill`, and `sizes`.
- **Suggested command:** `$impeccable optimize`

#### [P2] Undefined Font Variable Reference in Revenue Chart
- **Location:** `src/components/admin/RevenueChart.tsx`
- **Category:** Implementation Integrity
- **Impact:** `RevenueChart` specifies `fontFamily: "var(--font-jetbrains-mono)"`, but `RootLayout` only exports `--font-jetbrains`. The chart axis falls back to system monospace font.
- **Recommendation:** Update font family reference to `var(--font-jetbrains)`.
- **Suggested command:** `$impeccable polish`

#### [P2] Unused Dependency in Production Bundle (`lucide-react`)
- **Location:** `package.json:20`
- **Category:** Performance
- **Impact:** `lucide-react` is installed as a direct dependency but is not imported in any file in `src/`. The project exclusively uses Google Material Symbols via CDN.
- **Recommendation:** Remove `lucide-react` from `dependencies` to keep lockfile and node_modules lean.
- **Suggested command:** `$impeccable distill`

#### [P2] Lack of Motion Preference Support (`prefers-reduced-motion`)
- **Location:** `src/app/globals.css`, `src/components/ui/Button.tsx:22`, `src/components/chatbot/ChatMessageItem.tsx:94`
- **Category:** Accessibility
- **Impact:** Spinners (`animate-spin`), bouncing dots (`animate-bounce`), and pulse animations (`animate-pulse`) do not respect users' system preference for reduced motion.
- **WCAG/Standard:** WCAG 2.1 SC 2.3.3 (Animation from Interactions).
- **Recommendation:** Add `motion-reduce:animate-none` utilities or a global reduced-motion query rule.
- **Suggested command:** `$impeccable animate`

#### [P2] Tacky Elastic Bounce in Chatbot Typing Indicator
- **Location:** `src/components/chatbot/ChatMessageItem.tsx:94`
- **Category:** Implementation Integrity / Motion
- **Impact:** Uses `animate-bounce` on typing dots. Detector flagged `[bounce-easing]`: "Bounce and elastic easing feel dated and tacky. Real objects decelerate smoothly — use exponential easing or gentle pulse instead."
- **Recommendation:** Replace `animate-bounce` with a subtle opacity pulse (`animate-pulse`) or smooth wave.
- **Suggested command:** `$impeccable quieter`

#### [P2] Dead State in Profile Client
- **Location:** `src/app/(customer)/profile/ProfileClient.tsx`
- **Category:** Implementation Integrity
- **Impact:** Contains state variables `showDeactivateModal` and handler `handleConfirmDeactivate` that have no UI trigger in the view.
- **Recommendation:** Remove dead state and handlers.
- **Suggested command:** `$impeccable distill`

#### [P2] Blocking Non-Passive Wheel Listener in Court Grid
- **Location:** `src/components/court/CourtGrid.tsx:67`
- **Category:** Performance
- **Impact:** `container.addEventListener("wheel", handleWheel, { passive: false });` flags non-passive scroll listener warning in browser devtools, delaying scroll dispatch.
- **Recommendation:** Only intercept wheel event when horizontal scroll bounds are not exceeded, or handle with CSS scroll-snap.
- **Suggested command:** `$impeccable optimize`

#### [P3] Unused Menu Overlay State in CustomerNav
- **Location:** `src/components/layout/CustomerNav.tsx`
- **Category:** Implementation Integrity
- **Impact:** Dead `menuOpen` state with an invisible backdrop.
- **Recommendation:** Clean up unused state or wire up to a functional mobile drawer.
- **Suggested command:** `$impeccable polish`

#### [P3] Mock Description Fallback in CourtTable
- **Location:** `src/components/admin/CourtTable.tsx`
- **Category:** Implementation Integrity
- **Impact:** Automatically inserts fake mock text ("Sân tiêu chuẩn... sàn gỗ composite") if court description is empty.
- **Recommendation:** Display "—" instead of inventing description copy.
- **Suggested command:** `$impeccable clarify`

### Patterns & Systemic Issues
1. **Ad-hoc Dialog Implementation:** Modals across the application are developed independently as custom fixed `div`s with custom z-index layers (`z-50`, `z-[100]`, `z-[110]`), without shared focus trapping, ARIA semantics, or keyboard dismissal (`Esc`).
2. **Color Token Disconnect:** Design tokens declared in `tailwind.config.mts` (`primary-*`) are disconnected from actual usage, where raw hex colors or `emerald-*` are applied inconsistently.
3. **Desktop-Biased Table UI:** Administrative interfaces were built primarily for desktop viewports without collapsible sidebar mechanisms or responsive touch-sized targets.

### Positive Findings
- Server-state caching and synchronization via TanStack Query v5 is well-architected with centralized query keys and automatic 30s refetch intervals for court grids.
- Rendering optimization on court slots using CSS `content-visibility: auto` and `contain-intrinsic-size` effectively alleviates layout calculation overhead for large grids.
- Strict Type-safety with `tsc --noEmit` passing with 0 errors across all 22 routes.
- Robust API error handling utility (`getErrorMessage`, `getStatusMessage`) with 17/17 test cases passing for Vietnamese error translation.

## Recommended Actions

1. **[P0] `$impeccable adapt`**: Re-engineer `AdminSidebar` with a responsive mobile drawer (hamburger menu + slide-over backdrop on `<lg` viewports).
2. **[P0] `$impeccable harden`**: Build a standardized, accessible `Modal` base component with `role="dialog"`, `aria-modal="true"`, focus management, and `Escape` key dismissal.
3. **[P1] `$impeccable typeset`**: Audit and upgrade all table headers, labels, and metadata text from `slate-400`/`gray-400` to `slate-500`/`gray-600` to pass WCAG AA contrast (≥ 4.5:1).
4. **[P1] `$impeccable adapt`**: Enlarge table action buttons and pagination hitboxes to minimum 40–44px for reliable touch interaction.
5. **[P1] `$impeccable colorize`**: Realign `tailwind.config.mts` tokens with the official `emerald` palette, replacing ad-hoc hex values across components.
6. **[P1] `$impeccable clarify`**: Add descriptive `aria-label`s to all icon-only buttons in employee and court management tables.
7. **[P1] `$impeccable optimize`**: Convert hero image in `CourtsClient.tsx` to Next.js `<Image>` with responsive sizing and optimization.
8. **[P2] `$impeccable animate`**: Add `motion-reduce:animate-none` support to `globals.css` and animation components.
9. **[P2] `$impeccable quieter`**: Replace `animate-bounce` in chatbot typing dots with a subtle opacity pulse.
10. **[P2] `$impeccable distill`**: Remove unused `lucide-react` dependency and purge dead state in `ProfileClient.tsx`.
11. **[P3] `$impeccable polish`**: Final polish pass on typography variables (`var(--font-jetbrains)`), subtle spacing, and component edge cases.


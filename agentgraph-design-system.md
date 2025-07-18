# AgentGraph Design System

This document outlines the design patterns, components, and guidelines for maintaining consistency across the AgentGraph application.

## Payment Modals

### Overview
Payment modals provide a consistent, secure, and user-friendly interface for all payment interactions in the application.

### Design Specifications

#### Modal Structure
- **Container**: Fixed overlay with black background at 50% opacity (`bg-black bg-opacity-50`)
- **Modal Window**: White background, rounded corners, max-width 448px (`max-w-md`), centered
- **Modal Header**: Title and close button (✕) aligned with space-between

#### Payment Form Layout
1. **Header Section**
   - Centered icon in blue circle background (`bg-blue-100`)
   - Credit card icon (`CreditCardIcon`) 32x32px (`h-8 w-8`)
   - Title: "Secure Payment" (text-lg, font-semibold)
   - Subtitle describing the payment purpose

2. **Payment Details Section**
   - Light gray background container (`bg-gray-50`)
   - Payment amount prominently displayed (text-lg, font-semibold)
   - Additional context information (text-sm, text-gray-500)

3. **Card Input Section**
   - Stripe CardElement with consistent styling
   - White background with gray border
   - Padding: 16px (p-4)

4. **Security Information**
   - Lock icon (`LockClosedIcon`) with "Secured by Stripe" text
   - Small text size (text-xs, text-gray-500)
   - Centered alignment

5. **Action Button**
   - Full width button
   - Blue background (`bg-blue-600`) with hover state (`hover:bg-blue-700`)
   - White text, medium font weight
   - Proper focus states and disabled states

6. **Legal Text**
   - Small disclaimers and terms (text-xs, text-gray-500)
   - Centered alignment

### Usage Guidelines

#### When to Use
- Initial deposit payments
- Final payments
- Any monetary transaction requiring card input

#### Consistency Requirements
- All payment modals must follow the same structure and styling
- Icons, colors, and spacing must be identical across all payment flows
- Button text should clearly indicate the payment type and amount
- Security messaging must be present in all payment forms

#### Implementation Notes
- Use the same Stripe CardElement configuration across all payment forms
- Maintain consistent error handling and loading states
- Ensure proper modal backdrop behavior (close on backdrop click if appropriate)
- Include proper accessibility attributes

### Code Examples

#### Modal Container
```jsx
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
    {/* Modal content */}
  </div>
</div>
```

#### Payment Form Header
```jsx
<div className="text-center mb-6">
  <div className="flex justify-center mb-4">
    <div className="p-3 bg-blue-100 rounded-full">
      <CreditCardIcon className="h-8 w-8 text-blue-600" />
    </div>
  </div>
  <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payment</h3>
  <p className="text-sm text-gray-600">
    Payment description
  </p>
</div>
```

#### Security Footer
```jsx
<div className="flex items-center justify-center text-xs text-gray-500 mb-4">
  <LockClosedIcon className="h-4 w-4 mr-1" />
  <span>Secured by Stripe • Your payment information is encrypted</span>
</div>
```

### Related Components
- `StripeCheckout` (src/components/payment/StripeCheckout.tsx)
- `FinalPaymentForm` (src/components/delivery/ProjectDelivery.tsx)
- `PaymentSetup` (src/components/payment/PaymentSetup.tsx)

### Future Considerations
- Consider extracting payment modal into a shared component to reduce duplication
- Standardize error message styling and positioning
- Implement consistent loading states across all payment forms

## Vertical Spacing Guidelines

### Consistent Spacing Approach
To maintain clean and predictable layouts, follow this vertical spacing pattern:

**Rule**: Add top padding/margin to stacked elements, avoid bottom padding/margin
- ✅ Use `mt-4`, `pt-2`, etc. for spacing between elements
- ❌ Avoid `mb-4`, `pb-6`, etc. for element separation

**Benefits**:
- Predictable spacing that doesn't compound
- Easier to maintain and debug layout issues
- Consistent visual rhythm throughout the application

**Example**:
```tsx
{/* Header section */}
<div className="p-6 border-b border-gray-200">
  {/* Header content */}
</div>

{/* Status notification - adds top margin only */}
<div className="px-6 mt-4">
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
    {/* Notification content */}
  </div>
</div>

{/* Content section - adds top padding only */}
<div className="px-6 pb-6 pt-2">
  {/* Content */}
</div>
```

**Implementation Notes**:
- Apply this pattern consistently across all components
- Use standard Tailwind spacing values (mt-2, mt-4, mt-6, etc.)
- Only use bottom padding/margin when needed for internal component spacing
- This approach prevents spacing from compounding and creates predictable layouts

## Button Design Guidelines

### Primary Action Buttons (Mint Green)
For primary actions and important submissions, use the mint green button style:

**Classes**: `bg-mint text-brand-black hover:bg-mint-dark`

**Usage**:
- Submit forms and primary actions
- "Submit Agent" buttons
- "Make Final Payment" buttons
- Other high-importance CTAs

**Example**:
```tsx
<button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full px-4 py-3 bg-mint text-brand-black text-base font-medium rounded-md hover:bg-mint-dark disabled:opacity-50 transition-colors"
>
  {loading ? 'Submitting...' : 'Submit Agent'}
</button>
```

### Secondary Action Buttons (Blue)
For secondary actions and navigation:

**Classes**: `bg-blue-600 text-white hover:bg-blue-700`

**Usage**:
- Secondary actions
- Navigation buttons
- Confirmation dialogs

### Button States
- **Disabled**: Add `disabled:opacity-50` class
- **Loading**: Show loading text and disable interaction
- **Transitions**: Use `transition-colors` for smooth hover effects

## Navigation Link Guidelines

### Directional Navigation Links
For navigation links that indicate direction (back/forward), use consistent arrow styling:

**Back Navigation** (← Back to Dashboard):
```tsx
<Link
  href="/dashboard"
  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
>
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
  Back to Dashboard
</Link>
```

**Forward Navigation** (View Profile →):
```tsx
<Link
  href={`/builder-profile/${builderId}`}
  className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
>
  View Profile
  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</Link>
```

**Usage Guidelines**:
- Use left arrow (←) for back/return navigation
- Use right arrow (→) for forward/view more navigation
- Consistent gray color scheme with hover states
- Icons positioned before text for back, after text for forward
- Include `transition-colors` for smooth hover effects

## Confirmation Modal Guidelines

### Standard Confirmation Pattern
For important actions that cannot be undone, use the `ConfirmationModal` component:

**Bid Selection Example**:
```tsx
<ConfirmationModal
  isOpen={confirmationModal.isOpen}
  onClose={handleCancelSelection}
  onConfirm={handleConfirmSelection}
  title="Select This Bid?"
  message={`Are you sure you want to select ${builderName}'s bid of $${bidAmount.toLocaleString()}? This will move the project to the claimed status and reject all other bids. This action cannot be undone.`}
  confirmText="Select Bid"
  cancelText="Cancel"
  type="warning"
/>
```

**Modal Types**:
- `danger` - Red styling for destructive actions (delete, remove)
- `warning` - Yellow styling for important decisions (select bid, publish)
- `info` - Blue styling for informational confirmations

**Usage Guidelines**:
- Always use for irreversible actions
- Provide clear, specific messaging about consequences
- Include relevant details (amounts, names, etc.) in the message
- Use appropriate type based on action severity
- Consistent button text that matches the action being confirmed 

## Dashboard Status Organization

### Status Granularity
The dashboard uses granular status categories to provide clear visibility into project progress:

**Buyer Dashboard Statuses:**
1. **Open Requests** - `status: 'open'` - Awaiting builder claims
2. **Setting Up** - `status: 'claimed'` with no payment setup - Pending initial payment
3. **In Development** - `status: 'in-progress'` - Active development phase
4. **Ready for Testing** - `status: 'qa'` - Preview available for buyer testing
5. **Under Review** - `status: 'submitted'` - Final review and approval
6. **Awaiting Payment** - `status: 'pending-final-payment'` - Final payment needed
7. **Completed** - `status: 'completed'` - Project delivered and paid

**Builder Dashboard Statuses:**
1. **Setting Up** - `status: 'claimed'` with no payment setup - Waiting for buyer payment
2. **In Development** - `status: 'in-progress'` - Active development work
3. **Ready for Testing** - `status: 'qa'` - Submitted for buyer testing
4. **Under Review** - `status: 'submitted'` - Awaiting buyer approval
5. **Awaiting Payment** - `status: 'pending-final-payment'` - Buyer needs to make final payment
6. **Completed** - `status: 'completed'` - Project delivered and completed

### Status Badge Colors
- **Green badges** (`bg-green-100 text-green-800`): Open requests, completed projects
- **Blue badges** (`bg-blue-100 text-blue-800`): Active development, testing, review phases
- **Yellow badges** (`bg-yellow-100 text-yellow-800`): Payment or setup required

### Benefits of Granular Status
- **Clear Action Items**: Users know exactly what's expected of them
- **Better Transparency**: No ambiguity about project phase
- **Improved Planning**: Accurate expectations for timeline and next steps
- **Enhanced User Experience**: Specific status information reduces confusion

### Implementation Notes
- Status badges appear on each request card in the dashboard
- Badge colors are consistent with the `getBuildStatusColor()` utility function
- Empty states are shown when no requests exist in a particular status category
- Status counts are displayed in the section headers for quick overview

### Project Deliverables Display
When builders submit their completed work, buyers need immediate access to project deliverables:

**Visibility Phases:**
- **Confirmation Step** (`status: 'submitted'`): Both buyers and builders see deliverables during review
- **Payment Step** (`status: 'pending-final-payment'`): Both buyers and builders can reference deliverables
- **Completion** (`status: 'completed'`): Deliverables remain accessible for future reference

**Deliverable Types:**
- **GitHub Repository** (Required): Source code and project files
- **Live Agent URL** (Optional): Deployed agent for testing
- **Documentation** (Optional): Usage guides and technical documentation

**Design Pattern:**
```tsx
{/* Project Deliverables Section */}
{isBuyer && Object.keys(projectLinks).length > 0 && (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <h3 className="text-sm font-medium text-gray-900 mb-3">Project Deliverables</h3>
    <div className="space-y-2">
      {/* Links with consistent styling */}
    </div>
  </div>
)}
```

**Benefits:**
- **For Buyers**: Can review deliverables before accepting delivery and during payment
- **For Builders**: Can verify their submitted deliverables and ensure accuracy
- **Mutual Transparency**: Both parties see the same deliverables information
- **Quality Assurance**: Builders can double-check their submissions
- **Professional Handoff**: Clean, organized presentation for both parties
- **Consistent Experience**: Same design pattern across all delivery phases

## API Routes

### Firebase SDK Selection Framework
When implementing new API routes, choose the correct Firebase SDK to avoid permission errors:

**Use Admin SDK (`firebase-admin/firestore`) when:**
- Writing data to Firestore (creating, updating, deleting)
- Reading data that requires elevated permissions
- Bypassing Firestore security rules for server operations

**Use Client SDK (`firebase/firestore`) when:**
- Simple read operations with existing security rules
- User context is required for data filtering

**Implementation Pattern:**
```ts
// Import Admin SDK for server-side operations
import { getFirestore } from 'firebase-admin/firestore';
import { getApps } from 'firebase-admin/app';

// Use Admin SDK to bypass rules
const adminDb = getFirestore(getApps()[0]);
await adminDb.collection('collection').add(data);
```

**Default Rule**: When in doubt, use Admin SDK for API routes.

### Critical Pattern: Standardized Firebase Initialization

**⚠️ ALWAYS use the standardized helper function pattern for Firebase Admin SDK access:**

#### ✅ CORRECT - Standard Pattern (Use This)
```typescript
import { getFirestore } from 'firebase-admin/firestore';
import { getApps } from 'firebase-admin/app';

// Get Admin SDK Firestore instance
function getAdminDb() {
  const adminApp = getApps()[0];
  if (!adminApp) {
    throw new Error('Firebase Admin SDK not initialized');
  }
  return getFirestore(adminApp);
}

export async function POST(request: NextRequest) {
  // Use the helper function
  const adminDb = getAdminDb();
  await adminDb.collection('bids').add(data);
}
```

#### ❌ WRONG - Direct Access (Never Do This)
```typescript
// DON'T DO THIS - Causes SSL/TLS compatibility issues
const adminDb = getFirestore(getApps()[0]);
```

**Why This Matters:**
- **Consistency**: All working APIs use the helper function pattern
- **Initialization**: Proper Firebase Admin SDK initialization is handled centrally in `auth-server.ts`
- **SSL Compatibility**: Direct access bypasses proper initialization, causing gRPC SSL errors in Node.js 18+
- **Error Prevention**: The helper function includes proper error handling for uninitialized apps

**Root Cause Example:**
```
// This error occurs when bypassing the standard pattern:
Firestore access failed: [Error: 2 UNKNOWN: Getting metadata from plugin failed with error: error:1E08010C:DECODER routines::unsupported]
```

**Implementation Checklist:**
- [ ] Import `getFirestore` and `getApps` from `firebase-admin`
- [ ] Create `getAdminDb()` helper function in your route file
- [ ] Use `getAdminDb()` instead of direct `getFirestore(getApps()[0])`
- [ ] Include proper error handling in the helper function
- [ ] Test both locally and in production

**Lesson Learned:**
Inconsistent Firebase initialization patterns can cause production failures even when the core functionality works. Always follow the established architectural patterns - they're not just for code style, they directly affect functionality and stability.

## Future Considerations

- Consider extracting payment modal components into reusable components
- Implement consistent loading states across all payment flows
- Add comprehensive error handling patterns
- Consider implementing a unified modal system for the entire application
- Add status transition animations for better visual feedback
- Implement dashboard filtering and sorting options
- Consider adding status history tracking for transparency
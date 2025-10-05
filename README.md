## Tech Stack

### Core Framework

- Next.js 15+ (App Router)
- Server Components for data fetching
- Client Components for interactivity
- File-based routing with dynamic routes
- Server Actions for data mutations

### UI & Styling

- React 18+ with TypeScript
- Tailwind CSS for styling
- shadcn/ui component library
- Lucide React for icons
- next/image for optimized image loading

### Data Management

- Zod for schema validation and type safety
- JSON files for mock data storage (reviews, properties)
- File system operations via Node.js fs/promises

### External APIs

- Google Places API for reviews and location data
- Custom REST API endpoints for internal data

## Getting Started

Access the platform on https://the-flex-three.vercel.app/

### Prerequisites

- Node.js: v18.17 or higher
- npm: v9 or higher (or yarn/pnpm)
- Git: Latest version

```bash
git clone https://github.com/jsskrh/the-flex.git
cd the-flex
```

Install dependencies
`npm install`

Create a .env.local file in the root directory:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=api-key
NEXT_PUBLIC_API_KEY=api-key
NEXT_PUBLIC_ACCOUNT_ID=account-id
```

Getting a Google Maps API Key:

- Go to Google Cloud Console
- Create a new project or select existing
- Enable "Places API" and "Maps JavaScript API"
- Create credentials (API Key)
- Restrict the key to your domain (optional for local dev)

Ensure these files exist in lib/data/:
`lib/data/properties.json`
`lib/data/reviews.json`

If the files do not exist, there's a seed file for mocking the data. Run with node.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Design & Logic Decisions

### 1. Server-First Architecture

Use Next.js Server Components as the default, with Client Components only when interactivity is needed.

- Better SEO with server-rendered content
- Reduced JavaScript bundle size
- Improved initial page load performance
- Data fetching happens on the server before rendering

### 2. Type-Safe Data Layer

Use Zod schemas for runtime validation and TypeScript type inference.

- Single source of truth for data shapes
- Runtime validation prevents invalid data
- Automatic TypeScript types from schemas
- Better developer experience with autocomplete

### 3. Prop Drilling

Use explicit prop drilling for property data instead of React Context.

- Clear data flow (easy to trace)
- Simpler mental model for shallow component trees

### 4. API Authentication

Mock authentication using header-based API keys.

```typescript
const apiKey = req.headers.get("x-api-key");
const accountId = req.headers.get("x-account-id");

if (apiKey !== expectedApiKey || accountId !== expectedAccountId) {
  return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
}
```

**Security Note**: Current implementation uses NEXT*PUBLIC* prefixed env variables which are exposed to the client. This is only done to mock authentiation and would not be implemented this way in production. Instead:

- Renamed to remove NEXT*PUBLIC* prefix
- Stored server-side only
- Replaced with proper JWT-based authentication

### 5. Review Display Strategy

Reviews can be toggled for display by the home icon on the table or from the table row actions.
Show only 3 reviews initially with a "Show all" toggle.

## Google Reviews Integration

### Implementation Approach

useGoogleReviews custom hook fetches Google reviews via an internal API endpoint.

```typescript
const { reviews, loading, error, metadata } = useGoogleReviews(
  placeId,
  listingName
);
```

### Key Findings

### 1. API Limitations

- Rate Limits: Google Places API has strict quotas
- Cost: Each request counts against billing quota
- Caching Strategy: Implemented to reduce API calls and costs

### 2. Data Mapping

Google Places API returns different data structure than internal reviews:

- rating (1-5 scale) vs overallRating (1-10 scale)
- relative_time_description vs formatted dates
- Different author information structure

**Normalization Required:**

```typescript
{
    id: review.time,
    guestName: review.author_name,
    publicReview: review.text,
    rating: review.rating,
    relativeTime: review.relative_time_description,
    authorPhoto: review.profile_photo_url,
    authorUrl: review.author_url
}
```

3. Display Strategy

- Limited to 3 reviews initially (same as internal reviews)
- Shows average rating and total count in header
- Includes author photos when available
- Links to Google profile for verification

4. Challenges Encountered

- Stale Data: Google reviews update slowly
- Limited Filtering: Can't filter by date range or rating via API

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

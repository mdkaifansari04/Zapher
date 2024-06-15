# Setting Up Clerk for Zypher

Clerk is an authentication solution for modern web applications. This guide will help you integrate Clerk into your Zypher project.

## Prerequisites

Make sure you have the following ready:
- A Clerk account: [Sign up here](https://clerk.dev/sign-up)
- Your Clerk API keys

## Getting Started

### Step 1: Install Clerk SDK

First, install the Clerk SDK in your Next.js project.

Using npm:
```bash
npm install @clerk/clerk-react @clerk/nextjs
```

Using yarn:
```bash
yarn add @clerk/clerk-react @clerk/nextjs
```

### Step 2: Set Up Environment Variables

Create a `.env` file in the root of your project (if you haven't already) and add your Clerk API keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

Replace the placeholders with your actual Clerk API keys.

### Step 3: Initialize Clerk in Your Project

In your `_app.js` or `_app.tsx` file, initialize Clerk:

```javascript
// _app.js or _app.tsx
import { ClerkProvider } from '@clerk/nextjs';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;
```

### Step 4: Protect Routes with Clerk

To protect routes and require authentication, use Clerk's `withAuth` higher-order component (HOC).

For example, to protect a dashboard page:

```javascript
// pages/dashboard.js or pages/dashboard.tsx
import { withAuth } from '@clerk/nextjs';

function Dashboard() {
  return <div>Welcome to the Dashboard!</div>;
}

export default withAuth(Dashboard);
```

### Step 5: Add Sign-In and Sign-Up Components

You can add sign-in and sign-up components to your pages:

```javascript
// pages/sign-in.js or pages/sign-in.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return <SignIn />;
}

// pages/sign-up.js or pages/sign-up.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return <SignUp />;
}
```

### Step 6: Customizing Clerk Components

You can customize Clerk components to fit your application's design. Check the [Clerk documentation](https://clerk.dev/docs) for more details.

## Learning Resources

### Clerk Video Tutorial

- **[Clerk Authentication Guide](https://youtu.be/u8zOxeFN36o?si=bBwWx_dLVqJglPZh)**

### Official Clerk Documentation

- **[Clerk Documentation](https://clerk.dev/docs)**

## Additional Resources

For more information on using Clerk with Next.js, check out the official Clerk documentation and guides.

## Support

If you encounter any issues or have questions, please open an issue on GitHub or contact Clerk support.

This guide provides detailed steps to set up Clerk in your Next.js project, includes a link to the video tutorial, and references the official Clerk documentation for further learning.

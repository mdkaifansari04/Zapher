# Zypher Setup Guide

Welcome to the Zypher setup guide! This document will help you set up the Zypher project on your local machine and provide resources to learn the necessary technologies.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (comes with Node.js) or **yarn**
- **Git**

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/zypher.git
   cd zypher
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of your project and add the following variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

   WEBHOOK_SECRET=your_webhook_secret

   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_uploadthing_app_id

   APP_URL=https://zapher.vercel.app

   NEXT_PUBLIC_MONGODBURL=your_mongodb_connection_url
   ```

   Replace the placeholders with your actual credentials.

4. **Run the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Using yarn:
   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application in action.

## Project Structure

- `components/`: Contains the React components.
- `pages/`: Contains the Next.js pages.
- `styles/`: Contains the CSS files.
- `utils/`: Contains utility functions.
- `public/`: Contains static files.

## Learning Resources

### JavaScript
- **[JavaScript Basics](https://youtu.be/W6NZfCO5SIk?si=inHWBDRNQ_ysH6Hg)**

### Next.js
- **[Next.js 14 Crash Course](https://youtu.be/ZVnjOPwW4ZA?si=zC7JwbaBJ-FKioOP)**

### Clerk
- **[Clerk Authentication Guide](https://youtu.be/u8zOxeFN36o?si=bBwWx_dLVqJglPZh)**

### Git and GitHub
- **[Git Documentation](https://git-scm.com/doc)**
- **[GitHub Guides](https://guides.github.com/)**

### MongoDB
- **[MongoDB Documentation](https://docs.mongodb.com/manual/)**

### Tailwind CSS
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**

## Additional Learning

If you want to dive deeper into any of the technologies used in this project, here are some more resources:

- **HTML/CSS:** [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **TypeScript:** [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **Node.js:** [Node.js Documentation](https://nodejs.org/en/docs/)

## Contribution Guidelines

We welcome contributions! If you're interested in contributing, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin my-feature-branch`
5. Create a pull request.

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) and [Contribution Guidelines](CONTRIBUTING.md) before contributing.

## Support

If you have any questions or need help, feel free to open an issue on GitHub or join our [Discord community](https://discord.gg/TAW9vC2Hu7).
Happy coding!

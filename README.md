This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```
thisorthat
├─ .eslintrc.json
├─ README.md
├─ components
│  ├─ Avatar.tsx
│  ├─ Button.tsx
│  ├─ Form.tsx
│  ├─ Header.tsx
│  ├─ ImageUpload.tsx
│  ├─ Input.tsx
│  ├─ Modal.tsx
│  ├─ layout
│  │  ├─ FollowBar.tsx
│  │  ├─ Sidebar.jsx
│  │  ├─ SidebarItem.tsx
│  │  ├─ SidebarLogo.tsx
│  │  └─ SidebarThisorThatButton.jsx
│  ├─ layout.tsx
│  ├─ modals
│  │  ├─ EditModal.tsx
│  │  ├─ LoginModal.tsx
│  │  └─ RegisterModal.tsx
│  ├─ posts
│  │  ├─ PostFeed.tsx
│  │  └─ PostItem.tsx
│  └─ users
│     ├─ UserBio.tsx
│     └─ UserHero.tsx
├─ hooks
│  ├─ useCurrentUser.ts
│  ├─ useEditModal.ts
│  ├─ useFollow.ts
│  ├─ useLike.ts
│  ├─ useLikeTwo.ts
│  ├─ useLoginModal.ts
│  ├─ usePost.ts
│  ├─ usePosts.ts
│  ├─ useRegisterModal.ts
│  ├─ useUser.ts
│  └─ useUsers.ts
├─ libs
│  ├─ fetcher.ts
│  ├─ prismadb.ts
│  └─ serverAuth.ts
├─ next.config.js
├─ node_modules
├─ package-lock.json
├─ package.json
├─ pages
│  ├─ _app.tsx
│  ├─ api
│  │  ├─ auth
│  │  │  └─ [...nextauth].ts
│  │  ├─ current.ts
│  │  ├─ edit.ts
│  │  ├─ follow.ts
│  │  ├─ like.ts
│  │  ├─ likeTwo.ts
│  │  ├─ posts
│  │  │  ├─ [postId].ts
│  │  │  └─ index.ts
│  │  ├─ register.ts
│  │  └─ users
│  │     ├─ [userId].ts
│  │     └─ index.ts
│  ├─ index.tsx
│  ├─ posts
│  │  └─ [postId].tsx
│  └─ users
│     └─ [userId].tsx
├─ postcss.config.js
├─ prisma
│  └─ schema.prisma
├─ private.key
├─ public
│  ├─ favicon.ico
│  ├─ images
│  │  └─ placeholder.png
│  ├─ next.svg
│  └─ vercel.svg
├─ public.key
├─ sessionSecretGenerator.js
├─ styles
│  └─ globals.css
├─ tailwind.config.js
└─ tsconfig.json

```
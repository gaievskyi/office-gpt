# OfficeGPT

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

1. Install [pnpm](https://pnpm.io/) globally (skip if you already have it installed)

   ```console
   foo@bar:~$ npm install -g pnpm
   ```

2. Install dependencies

   ```console
   foo@bar:office-gpt$ pnpm install
   ```

3. Create a `.env` file with your environment configurations using [template](/.env.example)

   ```console
   foo@bar:office-gpt$ grep -v '^#' .env.example | grep -v '^$' > .env
   ```

## Develop

Start the development server with hot reload

```console
foo@bar:office-gpt$ pnpm dev
```

## Preview

Create a production-ready build and run it locally

```console
foo@bar:office-gpt$ pnpm preview
```

## Lint

Lint your code using Next.js built-in eslint. Additional configuration: [`.eslintrc.json`](/.eslintrc.json)

```console
foo@bar:office-gpt$ pnpm lint
```

## Cleanup

Format your code using prettier. Additional configuration: [`prettier.config.js`](/prettier.config.js)

```console
foo@bar:office-gpt$ pnpm format:check
Checking formatting...
All matched files use Prettier code style!

foo@bar:office-gpt$ pnpm format:write
...
```

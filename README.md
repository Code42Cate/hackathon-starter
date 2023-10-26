# Hackathon Starter

This is my hackathon starter template, based on this [awesome turborepo template](https://github.com/dan5py/turborepo-shadcn-ui). 

It includes everything you need to get started in a single monorepo, including:

- [Next.js](https://nextjs.org/) for the frontend
- [Hono](https://hono.dev/) as lightweight backend
- [shadcn/ui](https://ui.shadcn.com/) for the UI component library
- [Prisma](https://www.prisma.io/) as ORM
- [PostgreSQL](https://www.postgresql.org/) as database
- [Docker](https://www.docker.com/) for containerization, with docker-compose watch for hot reloading
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Livecycle](http://livecycle.io/) for instant sharing of your local development environment
- And some more of the usual goodies such as prettier, eslint, etc.

> This is meant for hackathons, not for production apps! It's a great way to get started quickly, but you should probably not use it for anything serious.

## Using this template

Clone the repository:

```sh
git clone https://github.com/Code42Cate/hackathon-starter.git
```

Rename `packages/database/.env.example` to `packages/database/.env`

Start everything with docker-compose:

```sh
docker-compose watch
```

Push database schema:

```sh
pnpm turbo db:generate                             
```

### Add ui components

Use the pre-made script:

```sh
pnpm install # if you haven't already
pnpm ui:add <component-name>
```

> This works just like the add command in the `shadcn/ui` CLI.

### Docker

Both the api (`api.Dockerfile`) and the web app (`web.Dockerfile`) are dockerized and managed by docker-compose (`docker-compose.yml`). You can start everything with:
```sh
docker-compose watch
```
This will start the api, the web app, and the database. It also enables hot reloading for both the api and the web app.

### Database

The database is a Postgres database managed by Prisma. It is reachable through this connection: `postgres://postgres:postgres@localhost:5432/hackathon`.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: a [Hono](https://hono.dev/) app
- `database`: a stub Prisma library shared by both `web` and `api` apps
- `ui`: a stub React component library powered by **shadcn/ui**
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo


## Credits

Thanks to [dan5py](https://github.com/dan5py/turborepo-shadcn-ui) who created the original template :)


## License

MIT
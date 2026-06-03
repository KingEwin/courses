import "dotenv/config";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../lib/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "file:./cinetrack.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

type SeedUser = {
  username: string;
  displayName: string;
  password: string;
};

type SeedFilm = {
  title: string;
  year: number;
  director: string;
  synopsis: string;
  posterUrl: string;
  tmdbId: number;
};

type SeedReview = {
  username: string;
  filmTmdbId: number;
  status: "TO_WATCH" | "WATCHING" | "WATCHED";
  rating: number | null;
  comment: string | null;
};

const USERS: SeedUser[] = [
  { username: "alice", displayName: "Alice", password: "alice123" },
  { username: "bob", displayName: "Bob", password: "bob12345" },
  { username: "chiara", displayName: "Chiara", password: "chiara99" },
];

const FILMS: SeedFilm[] = [
  {
    title: "Le Voyage de Chihiro",
    year: 2001,
    director: "Hayao Miyazaki",
    synopsis:
      "Chihiro, dix ans, est en route pour sa nouvelle maison avec ses parents. Ils s'égarent dans un univers étrange où vivent dieux et créatures.",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    tmdbId: 129,
  },
  {
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    synopsis:
      "Dom Cobb est un voleur expérimenté, le meilleur dans l'art dangereux de l'extraction.",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg",
    tmdbId: 27205,
  },
  {
    title: "Dune : Deuxième partie",
    year: 2024,
    director: "Denis Villeneuve",
    synopsis:
      "Paul Atreides s'unit à Chani et aux Fremen pour mener la révolte contre ceux qui ont détruit sa famille.",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    tmdbId: 693134,
  },
  {
    title: "The Substance",
    year: 2024,
    director: "Coralie Fargeat",
    synopsis:
      "Une star du fitness vieillissante s'injecte un sérum mystérieux qui crée une version plus jeune d'elle-même.",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
    tmdbId: 933260,
  },
];

const REVIEWS: SeedReview[] = [
  {
    username: "alice",
    filmTmdbId: 129,
    status: "WATCHED",
    rating: 10,
    comment:
      "Le film qui m'a donné envie d'aimer le cinéma. Chaque plan est une carte postale.",
  },
  {
    username: "alice",
    filmTmdbId: 27205,
    status: "WATCHED",
    rating: 9,
    comment: "Un puzzle à tiroir auquel je repense encore quinze ans après.",
  },
  {
    username: "alice",
    filmTmdbId: 933260,
    status: "TO_WATCH",
    rating: null,
    comment: null,
  },
  {
    username: "bob",
    filmTmdbId: 27205,
    status: "WATCHED",
    rating: 8,
    comment: "Ambitieux et fun, mais Nolan en fait toujours un peu trop.",
  },
  {
    username: "bob",
    filmTmdbId: 693134,
    status: "WATCHED",
    rating: 9,
    comment: "Le sable, le score, les vers. Vu deux fois en IMAX.",
  },
  {
    username: "bob",
    filmTmdbId: 129,
    status: "WATCHING",
    rating: null,
    comment: null,
  },
  {
    username: "chiara",
    filmTmdbId: 933260,
    status: "WATCHED",
    rating: 7,
    comment:
      "Brutal, viscéral, hilarant par moments. Pas pour tout le monde mais inoubliable.",
  },
  {
    username: "chiara",
    filmTmdbId: 693134,
    status: "WATCHED",
    rating: 8,
    comment: "Chani vole le film. Vraiment.",
  },
];

async function main() {
  console.log("Seeding users…");
  for (const u of USERS) {
    const passwordHash = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { username: u.username },
      create: {
        username: u.username,
        displayName: u.displayName,
        passwordHash,
      },
      update: { displayName: u.displayName, passwordHash },
    });
  }

  console.log("Seeding films…");
  for (const f of FILMS) {
    await prisma.film.upsert({
      where: { tmdbId: f.tmdbId },
      create: { ...f },
      update: { ...f },
    });
  }

  console.log("Seeding reviews…");
  for (const r of REVIEWS) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { username: r.username },
    });
    const film = await prisma.film.findUniqueOrThrow({
      where: { tmdbId: r.filmTmdbId },
    });
    await prisma.review.upsert({
      where: { userId_filmId: { userId: user.id, filmId: film.id } },
      create: {
        userId: user.id,
        filmId: film.id,
        status: r.status,
        rating: r.rating,
        comment: r.comment,
      },
      update: {
        status: r.status,
        rating: r.rating,
        comment: r.comment,
      },
    });
  }

  const counts = {
    users: await prisma.user.count(),
    films: await prisma.film.count(),
    reviews: await prisma.review.count(),
  };
  console.log("Seed complete:", counts);
  console.log(
    "\nLogin avec : alice / alice123, bob / bob12345, chiara / chiara99",
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

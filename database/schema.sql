
CREATE TABLE "Users" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'MEMBER',
    "isVerified" BOOLEAN NOT NULL DEFAULT FALSE,
    "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "deletedAt" TIMESTAMP NULL
);

CREATE TABLE "Books" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "isbn" TEXT UNIQUE NOT NULL,
    "title" TEXT NOT NULL,
    "copiesAvailable" INT NOT NULL,
    "totalCopies" INT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "deletedAt" TIMESTAMP NULL
);

CREATE TABLE "Author" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "Categories" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "BorrowedBooks" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "bookId" UUID NOT NULL,
    "borrowDate" TIMESTAMP NOT NULL DEFAULT now(),
    "dueDate" TIMESTAMP NOT NULL,
    "returnDate" TIMESTAMP NULL,
    "fine" FLOAT NOT NULL DEFAULT 0,
    FOREIGN KEY ("userId") REFERENCES "Users" ("id"),
    FOREIGN KEY ("bookId") REFERENCES "Books" ("id")
);

CREATE TABLE "Transactions" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "amount" FLOAT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    FOREIGN KEY ("userId") REFERENCES "Users" ("id")
);

CREATE TABLE "AuthorsOnBooks" (
    "bookId" UUID NOT NULL,
    "authorId" UUID NOT NULL,
    PRIMARY KEY ("bookId", "authorId"),
    FOREIGN KEY ("bookId") REFERENCES "Books" ("id"),
    FOREIGN KEY ("authorId") REFERENCES "Author" ("id")
);

CREATE TABLE "CategoriesOnBooks" (
    "bookId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    PRIMARY KEY ("bookId", "categoryId"),
    FOREIGN KEY ("bookId") REFERENCES "Books" ("id"),
    FOREIGN KEY ("categoryId") REFERENCES "Categories" ("id")
);

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MEMBER');
CREATE TYPE "TransactionType" AS ENUM ('FINE', 'PAYMENT');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');
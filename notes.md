https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres
https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries
https://www.prisma.io/docs/concepts/database-connectors/mysql
https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express
> good setup for relation
https://www.prisma.io/docs/concepts/components/prisma-schema/relations#disambiguating-relations

set up prisma
hook up with express

npx prisma migrate dev --name init



generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model Post {
  id     Int    @id @default(autoincrement())
  author String
  tags   Tag[]
  title  String @db.VarChar(400)
  desc   String @db.Text
  links  Json
}

model Tag {
  id    Int    @id @default(autoincrement())
  posts Post[]
  name  String
}

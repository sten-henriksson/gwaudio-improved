
import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

app.post(`/scrapedata`, async (req, res) => {
  console.log("body", req.body);

  const { title, desc, tags, upvotes, name, postLink, links, time } = req.body
  tags.push({ name: name })

  try {
    const resp = await prisma.post.upsert({
      where: { postLink: postLink },
      create: {
        title,
        desc,
        unixtime: time,
        upvotes: parseInt(upvotes),
        postLink: postLink,
        author: {
          connectOrCreate: {
            where: {
              name: name,
            },
            create: {
              name: name,
            },
          },
        },
        links,
        tag: {
          create: tags
        },
      },
      update: {
      },
    })
    res.json(resp)
  } catch (error) {
    console.log(error);

    res.status(400)
  }

  // res.json(result)
})

app.get('/tag', async (req, res) => {
  const { inctag, disctag } = req.body

  try {
    const posts = await prisma.post.findMany({
      where: {
        tag: {
          none: {
            name: { in: disctag },
          },
          some: {
            name: { in: inctag },
          },
        },
      },
    })
    res.json(posts)
  } catch (error) {
    res.status(400)
  }
})

const server = app.listen(8999, () =>
  console.log(`
🚀 Server ready at: http://localhost:8999
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
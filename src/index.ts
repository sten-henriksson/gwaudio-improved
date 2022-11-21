
import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.use(express.json());

let test = async () => {

  // Ctrl-K + Ctrl-C - comment
  // Ctrl-K + Ctrl-U - uncomment




  // console.log(await prisma.post.findMany({
  //   where: {
  //     tag: {
  //       none: {
  //         name: { in: ['Cockwarming', 'M4F'] },
  //       },
  //       some: {
  //         name: { in: ['F4M', 'Incest'] },
  //       },
  //     },
  //   },
  // }))



  //console.log(await prisma.user.findMany())

}
console.log(test());



app.post(`/scrapedata`, async (req, res) => {
  console.log("body", req.body);

  const { title, desc, tags, upvotes, name, postLink, links } = req.body
  try {
    const resp = await prisma.post.upsert({
      where: { postLink: postLink },
      create: {
        title,
        desc,
        upvotes: parseInt(upvotes),
        postLink: postLink,
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

app.get('/users', async (req, res) => {
  const { inctag, disctag } = req.body
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
})
/*
app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(result)
})


app.put('/publish/:id', async (req, res) => {
  const { id } = req.params

  try {
    const postData = await prisma.post.findUnique({
      where: { id: Number(id) },
      select: {
        published: true,
      },
    })

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) || undefined },
      data: { published: !postData?.published },
    })
    res.json(updatedPost)
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` })
  }
})


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})


app.get(`/post/:id`, async (req, res) => {
  const { id }: { id?: string } = req.params

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  })
  res.json(post)
})
*/
const server = app.listen(8999, () =>
  console.log(`
🚀 Server ready at: http://localhost:8999
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
)
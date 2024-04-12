/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'

const app = new Frog({
  basePath: '/api',
  // hub: pinata(),
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {

  const buttonList = [
    {val: "Text One"},
    {val: "Text Two"},
  ]

  return c.res({
    action: '/picker',
    image: `http://localhost:3000/cat.jpg`,
    intents: buttonList.map(({val}) =>
      (<Button value={val}>{val}</Button>))
  })
})

app.frame('/picker', (c) => {
  const { buttonValue = '', verified } = c

  const newSearchParams = new URLSearchParams({
    text: buttonValue,
  })

  return c.res({
    action: '/',
    image: `http://localhost:3000/meme?${newSearchParams}`,
    intents: [<Button>Start Over 🔄</Button>],
  })
})

export const GET = handle(app)
export const POST = handle(app)

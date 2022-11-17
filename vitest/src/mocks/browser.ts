import { setupWorker } from 'msw';
import { rest } from 'msw';

const DELAY = 500;

let db = [
  { id: '0', title: 'delectus aut autem', completed: false },
  { id: '1', title: 'quis ut nam facilis et officia qui', completed: false },
  { id: '2', title: 'fugiat veniam minus', completed: false },
  { id: '3', title: 'et porro tempora', completed: true },
  { id: '4', title: 'laboriosam mollitia et enim quasi adipisci', completed: false },
];

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(db), ctx.delay(DELAY));
  }),

  rest.post('https://jsonplaceholder.typicode.com/todos', async (req, res, ctx) => {
    const title = await req.text();
    db.push({ id: new Date().toISOString(), title, completed: false });
    return res(ctx.status(200), ctx.delay(DELAY));
  }),

  rest.patch('https://jsonplaceholder.typicode.com/todos/:id', async (req, res, ctx) => {
    const attrs = await req.json();
    db = db.map((el) => (el.id !== req.params.id ? el : { ...el, ...attrs }));
    return res(ctx.status(200), ctx.delay(DELAY), ctx.json(db));
  }),

  rest.delete('https://jsonplaceholder.typicode.com/todos/:id', async (req, res, ctx) => {
    db = db.filter((el) => el.id !== req.params.id);
    return res(ctx.status(200), ctx.delay(DELAY));
  }),
];

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

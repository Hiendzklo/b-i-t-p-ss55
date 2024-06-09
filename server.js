const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use('/posts/:id', (req, res, next) => {
    const id = req.params.id;
    const post = router.db.get('posts').find({ id: Number(id) }).value();

    if (post) {
        res.json(post);
    } else {
        res.status(404).json({ error: 'Not Found' });
    }
});

server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on http://localhost:${PORT}`);
});

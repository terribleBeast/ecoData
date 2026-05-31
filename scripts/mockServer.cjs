// scripts/mockServer.cjs
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("src/test/db.json");
const middlewares = jsonServer.defaults();

// Envelope wrapper: wrap all GET array responses in { data: [...] }
router.render = (req, res) => {
  const data = res.locals.data;
  if (req.method === "GET") {
    res.jsonp({ data });
  } else {
    res.jsonp(data);
  }
};

// Custom filter: GET /researches?ids=1,2,3
server.get("/researches", (req, res, next) => {
  if (req.query.ids) {
    const ids = req.query.ids
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n));
    const db = router.db.getState();
    const filtered = db.researches.filter((r) =>
      r.researchers_id?.some((id) => ids.includes(id)),
    );
    return res.jsonp({ data: filtered });
  }
  next(); // fall through to default router
});

// Custom routes from routes.json still needed? Read the file manually
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/v1/researchers": "/researchers",
    "/api/v1/researchers/:id": "/researchers/:id",
    "/api/v1/researches": "/researches",
    "/api/v1/researches/:id": "/researches/:id",
    "/api/v1/researches/:id/predictions": "/predictions/:id",
    "/api/v1/plants/search/:genus": "/plants",
  }),
);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on port 3001");
});

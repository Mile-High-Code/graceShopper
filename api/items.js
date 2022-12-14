const itemsRouter = require("express").Router();

const prisma = require("../db/prisma");

itemsRouter.get("/", async (req, res, next) => {
  const { page } = req.query;
  const pageNum = +page;
  console.log("the page in the itemsRouter is: ", page);
  try {
    const items = await prisma.items.findMany({
      skip: 30 * pageNum - 30,
      take: 30,
      include: {
        orderitems: {
          include: {
            orders: true,
          },
        },
      },
    });
    res.send(items);
  } catch (error) {
    next(error);
  }
});

itemsRouter.get("/:id", async (req, res, next) => {
  try {
    const item = await prisma.items.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    res.send(item);
  } catch (error) {
    next(error);
  }
});

itemsRouter.get("/floor/:floorId", async (req, res, next) => {
  const { page } = req.query;
  const pageNum = +page;
  try {
    const item = await prisma.items.findMany({
      skip: 30 * pageNum - 30,
      take: 30,
      where: {
        floorId: +req.params.floorId,
      },
    });

    res.send(item);
  } catch (error) {
    next(error);
  }
});

itemsRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleteItem = await prisma.items.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.send(deleteItem);
  } catch (error) {
    next(error);
  }
});

itemsRouter.patch("/:id", async (req, res, next) => {
  const { name, type, description, price, stock, floorId } = req.body;
  try {
    const patchItem = await prisma.items.update({
      where: {
        id: +req.params.id,
      },
      data: { name, type, description, price, stock, floorId },
    });
    res.send(patchItem);
  } catch (error) {
    next(error);
  }
});

itemsRouter.post("/", async (req, res, next) => {
  const { name, type, description, price, stock, floorId, imgUrl } = req.body;
  try {
    const createItem = await prisma.items.create({
      data: { name, type, description, price, stock, floorId, imgUrl },
    });
    res.send(createItem);
  } catch (error) {
    next(error);
  }
});

module.exports = itemsRouter;

const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = require("../db/prisma");
const { users } = require("../db/prisma");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        reviews: true,
        orders: {
          include: {
            orderitems: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// /api/users/:id
usersRouter.get("/:id", async (req, res, next) => {
  const id = +req.params.id;
  console.log("the id from the params is: ", id);
  try {
    if (id) {
      const user = await prisma.users.findUnique({
        where: {
          id: id,
        },
        include: {
          reviews: true,
          orders: {
            include: {
              orderitems: {
                include: {
                  items: true,
                },
              },
            },
          },
        },
      });
      res.send(user);
    } else {
      res.status(404).send({
        name: "Not Found",
        message: "Please log in or register",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:id", async (req, res, next) => {
  try {
    const updatedUser = await prisma.users.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;

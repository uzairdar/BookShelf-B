const router = require("express").Router();
let Shelf = require("../models/Shelf.model");

router.route("/:uid").get((req, res) => {
  const userId = req.params.uid;
  Shelf.find({ userId })
    .then((books) => {
      if (books) {
        return res.json({ books, message: "books found" });
      } else {
        return res.json({ message: "No books found" });
      }
    })
    .catch((error) => {
      return res.json({ error });
    });
});
router.route("/deleteShelf/:sid").delete((req, res) => {
  console.log("here i am");
  const sid = req.params.sid;
  Shelf.findByIdAndDelete(sid)
    .then((shelf) => {
      if (shelf) {
        return res.json({ shelf, message: "shelf deleted successfully" });
      } else {
        return res.json({ message: "shelf not found for given id" });
      }
    })
    .catch((error) => {
      res.json({ error });
    });
});
router.route("/addbook").post((req, res) => {
  const {
    title,
    authorname,
    publicationH,
    publicationD,
    genre,
    publicationY,
    status,
    userId,
  } = req.body;
  //   const isVerified = false;
  console.log("body", req.body);
  const newShelf = new Shelf({
    title,
    authorname,
    publicationH,
    publicationD,
    genre,
    publicationY,
    status,
    userId,
  });
  newShelf
    .save()
    .then((shelf) => {
      if (shelf) {
        return res.status(200).json({
          message: "Book added successfully",
          shelf,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      res.status(400).json({ message: "Book cannot be added!", error });
    });
});
router.route("/update/:sid").post((req, res) => {
  const { sid } = req.params;
  const { title, authorname, publicationH, publicationD, genre, publicationY } =
    req.body;
  console.log("update received", req.body);
  Shelf.findByIdAndUpdate(
    sid,
    {
      title,
      authorname,
      publicationH,
      publicationD,
      genre,
      publicationY,
    },
    { new: true }
  )
    .then((shelf) => {
      res.json({ message: "Shelf updated successfully", shelf });
    })
    .catch((error) => {
      res.json({ error });
    });
});
router.route("/changeStatus/:sid").post((req, res) => {
  const { sid } = req.params;
  const { status } = req.body;
  console.log("status received", req.body);
  Shelf.findByIdAndUpdate(
    sid,
    {
      status: status,
    },
    { new: true }
  )
    .then((shelf) => {
      res.json({ message: "status changed successfully", shelf });
    })
    .catch((error) => {
      res.json({ error });
    });
});
module.exports = router;

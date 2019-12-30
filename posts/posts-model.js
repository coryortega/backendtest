const db = require("../database/dbConfig");

module.exports = {
  find,
  findById,
  findByPost,
  add,
  remove,
  update
};

function find() {
  return db("posts").select("id", "post_url", "post_description");
}

function findById(id) {
  return db("posts")
    .select("id", "post_url", "post_description")
    .orderBy("id")
    .where({ id })
    .first();
}

function findByPost(id) {
  return db("posts")
    .select(
      "posts.id",
      "posts.post_url",
      "posts.post_description",
      "posts.user_id",
      "users.username"
    )
    .join("users", function() {
      this.on({ "users.id": "posts.user_id" });
    })
    .orderBy("posts.id")
    .where({ "users.id": id });
}

function add(post) {
  return db("posts")
    .insert(post, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function remove(id) {
  return db("posts")
    .where({ id })
    .del();
}

function update(changes, id) {
  return db("posts")
    .where({ id })
    .update(changes);
}

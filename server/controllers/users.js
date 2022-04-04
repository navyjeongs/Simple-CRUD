import { v4 as uuid } from "uuid";

let users = [];

export const getUsers = (req, res) => {
  res.send(users);
};

export const createUser = (req, res) => {
  const user = req.body;
  users.push({ ...user, id: uuid() });
  console.log(users);
  res.send("Users Added Success!");
};

// uuid가 일치하는 한명만 보낸다.
export const getUser = (req, res) => {
  const singleUser = users.filter((user) => user.id === req.params.id);
  res.send(singleUser);
};

export const deleteUser = (req, res) => {
  // filter() : true면 요소를 유지한다. 즉, uuid가 일치하면 false이므로 user를 버린다.
  users = users.filter((user) => user.id !== req.params.id);
  res.send("User Delete Success!");
};

export const updateUser = (req, res) => {
  const user = users.find((user) => user.id === req.params.id);

  user.name = req.body.name;
  user.email = req.body.email;
  user.contact = req.body.contact;
  user.nickname = req.body.nickname;
  user.gender = req.body.gender;

  res.send("User Update Success!");
};

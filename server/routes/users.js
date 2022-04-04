import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/user", createUser);

// 유저 한명만 보내기
router.get("/user/:id", getUser);
// 유저 한명만 삭제
router.delete("/user/:id", deleteUser);
// 유저 한명만 업데이트
router.put("/user/:id", updateUser);

export default router;

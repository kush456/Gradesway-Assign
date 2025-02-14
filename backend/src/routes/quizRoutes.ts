import { Request, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create Quiz
router.post("/", async (req: Request, res: any) => {
  const { title, description } = req.body;
  const teacherId = "some-hardcoded-teacher-id"; // Replace with real user handling logic

  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" });
  }

  const quiz = await prisma.quiz.create({ data: { title, description, teacherId } });
  res.json(quiz);
});

// Get all quizzes
router.get("/", async (req, res) => {
  const quizzes = await prisma.quiz.findMany();
  res.json(quizzes);
});

// Get a single quiz
router.get("/:id", async (req: Request, res: any) => {
  const quiz = await prisma.quiz.findUnique({ where: { id: req.params.id } });
  if (!quiz) return res.status(404).json({ error: "Quiz not found" });
  res.json(quiz);
});

// Update a quiz
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const quiz = await prisma.quiz.update({
    where: { id: req.params.id },
    data: { title, description },
  });
  res.json(quiz);
});

// Delete a quiz
router.delete("/:id", async (req, res) => {
  await prisma.quiz.delete({ where: { id: req.params.id } });
  res.json({ message: "Quiz deleted" });
});

export default router;

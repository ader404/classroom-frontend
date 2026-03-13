import { Subject } from "../types";

export const MOCK_SUBJECTS: Subject[] = [
    {
        id: 1,
        code: "CS101",
        name: "Introduction to Computer Science",
        department: "CS",
        description: "An introductory course covering the fundamentals of programming, algorithms, and data structures using modern languages.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        code: "MATH201",
        name: "Advanced Calculus",
        department: "Math",
        description: "A deep dive into multivariable calculus, including partial derivatives, multiple integrals, and vector analysis.",
        createdAt: new Date().toISOString(),
    },
    {
        id: 3,
        code: "PHYS102",
        name: "General Physics II",
        department: "Physics",
        description: "Exploration of electricity, magnetism, optics, and introduction to modern physics for science and engineering majors.",
        createdAt: new Date().toISOString(),
    },
];

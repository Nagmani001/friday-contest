import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        student: "student";
    }>;
}, z.core.$strip>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const quizSchema: z.ZodObject<{
    title: z.ZodString;
    questions: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        options: z.ZodArray<z.ZodString>;
        correctOptionIndex: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const addQuestionSchema: z.ZodArray<z.ZodObject<{
    text: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    correctOptionIndex: z.ZodNumber;
}, z.core.$strip>>;
//# sourceMappingURL=auth.d.ts.map
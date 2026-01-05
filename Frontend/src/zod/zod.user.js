import z from "zod";

export const safeSignUpSchema = z.object({
        name: z.string().min(3, "Username should be atleast 3 characters").max(20, "Username must be under 20 characters"),
        email: z.email("Please enter a valid email address").toLowerCase(),
        password: z.string()
        .min(8, "Password must be atleast 8 characters long, including one uppercase letter and number")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password do not match",
        path: ["confirmPassword"]
    })


export const safeSignInSchema = z.object({
    email: z.email("Please enter a valid email address").toLowerCase(),
    password: z.string()
        .min(8, "Password must be atleast 8 characters long, including one uppercase letter and number")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number") 
})

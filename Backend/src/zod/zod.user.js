const z = require('zod')

const safeSignUpSchema = z.object({
        name: z.string().min(3, "Username should be atleast 3 characters").max(20, "Username must be under 20 characters"),
        email: z.email("Please enter a valid email address").toLowerCase(),
        password: z.string()
        .min(8, "Password must be atleast 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
    })


const safeSignInSchema = z.object({
    email: z.email("Please enter a valid email address").toLowerCase(),
    password: z.string()
        .min(8, "Password must be atleast 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number") 
})

const safeUrlSchema = z.object({
        url: z.url("Please provide a vaild URL, eg. 'https://app.oorly.in' "),
        customUrl: z.string().trim().nullish()
    })

module.exports = {
    safeSignUpSchema,
    safeSignInSchema,
    safeUrlSchema
}
'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import bcrypt from 'bcrypt';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: require });

const signUpSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignUpState = {
    errors?: {
        email?: string[];
        password?: string[];
        _form?: string[];
    };
    success?: boolean;
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return `Invalid credentials. ${Date.now()}`;
                default:
                    return `Something went wrong. ${Date.now()}`;
            }
        }
        throw error;
    }
}

export async function signUp(
    prevState: SignUpState,
    formData: FormData
): Promise<SignUpState> {
    const validatedFields = signUpSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

        if (existingUser.length > 0) {
            return {
                errors: { _form: ['An account with this email already exists.'] },
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
    `;
    } catch (error) {
        console.error('Sign up error:', error);
        return {
            errors: { _form: ['Something went wrong. Please try again.'] },
        };
    }

    return { success: true };
}
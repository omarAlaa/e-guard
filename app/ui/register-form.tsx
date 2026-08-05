'use client';

import { Button } from "@/components/ui/button"
import { useActionState, useEffect } from 'react';
import { signUp, SignUpState } from '@/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

const initialState: SignUpState = {};

export default function RegisterForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [state, formAction, pending] = useActionState(signUp, initialState);
    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast.add({
                type: "success",
                description: "Your account has been created.",
            })

            router.push('/login');
        }
        else if (state.errors) {
            toast.add({
                type: "error",
                description: `${state.errors._form}`,
                priority: "high",
            })
        }
    }, [state, router]);

    return (
        <form action={formAction}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create new account</CardTitle>
                    <CardDescription>
                        Enter your email and password to create new account
                    </CardDescription>
                    <CardAction>
                        <Link href='login'>
                            <Button variant="link">Login</Button>
                        </Link>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" name="password" required />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {pending ?
                        <Spinner className="size-8" />
                        :
                        <Button type="submit" className="w-full" aria-disabled={pending}>
                            Create account
                        </Button>}
                    <input type="hidden" name="redirectTo" value={callbackUrl} />
                </CardFooter>
            </Card>
        </form>
    );
}
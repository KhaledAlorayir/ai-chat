"use client";

import {authClient} from "@/auth/auth-client";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Loader2, LogOut} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";

export function NavBar() {
    const session = authClient.useSession();

    function googleSignIn() {
        authClient.signIn.social({provider: "google"});
    }

    return (
        <header
            className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 w-full">
                <h1 className="text-xl font-semibold tracking-tight">ChatAI</h1>

                <div>
                    {session.isPending ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin"/>
                            <span>Loading...</span>
                        </div>
                    ) : !!session.data ? (
                        <UserAvatar name={session.data.user.name} image={session.data.user.image}/>
                    ) : (
                        <Button onClick={googleSignIn} variant="default" size="sm">
                            Sign in
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
}

function UserAvatar(props: { name: string, image?: string | null }) {
    const router = useRouter();

    function signOut() {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    void router.push("/");
                }
            }
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                    <Avatar className="size-10">
                        <AvatarImage src={props.image!}/>
                        <AvatarFallback>{props.name}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="p-2">
                    <p className="leading-none font-medium">{props.name}</p>
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer" onSelect={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
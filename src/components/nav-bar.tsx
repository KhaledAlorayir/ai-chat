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

export function NavBar() {
    const session = authClient.useSession();

    function googleSignIn() {
        authClient.signIn.social({provider: "google"});
    }

    return (
        <header className="flex items-center justify-between w-full">
            <h1 className="text-xl font-semibold tracking-tight">ChatAI</h1>
            <section>
                {!!session.data ?
                    (
                        <UserAvatar name={session.data.user.name} image={session.data.user.image}/>
                    ) : session.isPending ?
                        (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin"/>
                                <span>Loading...</span>
                            </div>
                        ) :
                        (
                            <Button onClick={googleSignIn}>Sign In</Button>
                        )
                }
            </section>
        </header>
    );
}

function UserAvatar(props: { name: string, image?: string | null }) {
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
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{props.name}</p>
                    </div>
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer" onSelect={() => authClient.signOut()}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
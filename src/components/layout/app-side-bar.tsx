import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarTrigger
} from "@/components/ui/sidebar";
import {getAuthenticatedSession} from "@/auth/auth-server-helpers";
import {repository} from "@/db/repository";
import {SideBarLink} from "@/components/layout/side-bar-link";
import {Suspense} from "react";
import {Loader} from "@/components/ai-elements/loader";
import {Button} from "@/components/ui/button";
import Link from "next/link";

async function getChats() {
    const session = await getAuthenticatedSession();

    if (!session) {
        return [];
    }

    return repository.getChats(session.user.id);
}


export function AppSideBar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <SidebarTrigger/>
                    <h1 className="text-xl font-semibold tracking-tight">ChatAI</h1>
                </div>

                <Button variant="default" size="sm" asChild>
                    <Link href="/">New Chat</Link>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-base">conversions</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Suspense fallback={<Loader/>}>
                            <Conversions/>
                        </Suspense>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

async function Conversions() {
    const chats = await getChats();

    return (
        <SidebarMenu>
            {chats.map(chat => (
                <SideBarLink
                    key={chat.id}
                    label={chat.id}
                    href={`/${chat.id}`}
                />
            ))}
        </SidebarMenu>
    );
}
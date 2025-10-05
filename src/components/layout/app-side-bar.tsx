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
import {SideBarButton} from "@/components/layout/side-bar-button";

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
            <SidebarHeader className="pt-6">
                <SideBarButton/>
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
                    label={chat.title}
                    href={`/${chat.id}`}
                />
            ))}
        </SidebarMenu>
    );
}
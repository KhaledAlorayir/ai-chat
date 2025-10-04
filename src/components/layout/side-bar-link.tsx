'use client'

import {SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import Link from "next/link";
import {useParams} from "next/navigation";

interface Props {
    label: string;
    href: string;
}

export function SideBarLink({href,label}: Props) {
    const params = useParams();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={href.includes(params.chatId as string)}>
                <Link href={href}>{label}</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
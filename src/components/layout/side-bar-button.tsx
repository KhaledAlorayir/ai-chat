'use client';

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useSidebar} from "@/components/ui/sidebar";

export function SideBarButton() {
    const sidebar = useSidebar();

    return (
        <Button onClick={() => {
            if(sidebar.isMobile) {
                sidebar.toggleSidebar();
            }
        }} variant="default" size="sm" asChild>
            <Link href="/">New Chat</Link>
        </Button>
    );
}


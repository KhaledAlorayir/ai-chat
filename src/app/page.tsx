"use client";

import {authClient} from "@/auth/auth-client";

export default function Home() {
    const session = authClient.useSession();
    return (
        <div className="">
            {!!session.data ? (
                <div>
                    <p>{session.data.user.name}</p>
                    <button onClick={() => authClient.signOut()}>auth</button>
                </div>
            ) : (
                <button onClick={() => authClient.signIn.social({provider: "google"})}>auth</button>
            )}
        </div>
    );
}

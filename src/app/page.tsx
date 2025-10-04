import ChatContainer from "@/components/chat-ui/chat-container";

export default async function Home() {
    return (
        <div className="max-w-7xl mx-auto pt-12 pb-4 px-2 md:px-6 relative size-full h-screen">
            <ChatContainer />
        </div>
    );
}

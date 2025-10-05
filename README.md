# AI Chat App 🚀

A full-stack, ChatGPT-style AI chat application built with modern web technologies. It supports multiple large language models, real-time streaming responses, integrated search tools, and persistent chat history — all wrapped in a responsive, modern UI.

## 🧠 Features

- 🤖 **AI Chat:** Real-time streaming chat with two selectable LLMs:
    - OpenAI GPT-4.1
    - Google Gemini 2.5

- 🔎 **Web Search Integration:**  
  Built directly into the LLM’s toolset — the AI can seamlessly perform web searches when needed to enhance its responses with real-time information.

- 🖼️ **Custom Image Search Tool:**  
  A custom-built tool (supported **only by GPT-4.1**) that leverages **SerpAPI** to fetch and render image results inline when the user requests them.

- 💾 **Chat Persistence:** All conversations are stored in the database and retrievable for future sessions.

- 🔑 **Authentication:** Secure Google OAuth implemented with BetterAuth.

- 📱 **Responsive UI:** Clean, modern design optimized for both desktop and mobile.

- ⚙️ **Modern Tooling:** Environment-configurable API keys, structured backend routes, and strong type safety.

---

## 🛠️ Tech Stack

| Layer                  | Technology                                                                                                                                           |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend / Backend** | [Next.js](https://nextjs.org/) With Server Components And App Router                                                                                 |
| **AI Integration**     | [Vercel AI SDK](https://sdk.vercel.ai/) with OpenAi GPT-4.1 & Google Gemini 2.5                                                                      |
| **Database**           | [Turso](https://turso.tech/)                                                                                                                         |
| **ORM**                | [Drizzle ORM](https://orm.drizzle.team/)                                                                                                             |
| **Auth**               | [BetterAuth](https://www.better-auth.com/) with Google OAuth                                                                                         |
| **Styling**            | [Tailwind](https://tailwindcss.com/), [ShadcnUi](https://ui.shadcn.com/), [Vercel AI elements](https://vercel.com/changelog/introducing-ai-elements) |
| **Deployment**         | [Vercel](https://vercel.com/)                                                                                                                        |
---

## 🧪 Core Highlights

- 🔁 **LLM Streaming:** AI responses stream directly to the client for a smooth, real-time chat experience.
- 🧠 **Tool-Driven AI:** Enhanced capabilities through built-in and custom LLM tools, including search and image fetching.
- 🗂️ **Persistent Conversations:** All chats are stored and retrievable, enabling long-term context and history.

---

## ⚙️ Environment Configuration (Type-Safe ✅)

This project uses a **strongly-typed, validated environment configuration** powered by **Zod** to ensure all required variables are present and correctly formatted before runtime.  
This eliminates common runtime errors and provides autocomplete & type safety across the app.

```ts
import { z } from "zod";

const schema = z.object({
  TURSO_AUTH_TOKEN: z.string().trim(),
  TURSO_DATABASE_URL: z.string().trim(),
  BETTER_AUTH_SECRET: z.string().trim(),
  BETTER_AUTH_URL: z.string().url().trim(),
  GOOGLE_CLIENT_ID: z.string().trim(),
  GOOGLE_CLIENT_SECRET: z.string().trim(),
  OPENAI_API_KEY: z.string().trim(),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().trim(),
  SERP_API_KEY: z.string().trim(),
  MOCK_SERP: z.stringbool(),
});

export const env = schema.parse(process.env);
```
---
## 📥 Clone & Setup

Follow these steps to get the project running locally:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/KhaledAlorayir/ai-chat.git
cd ai-chat-app

# 2️⃣ Install dependencies
npm install

# 3️⃣ Create a `.env` file
# and add the above env variables
.env

# 4️⃣ Apply the database schema with Drizzle ORM
npm run db:push

# 5️⃣ Run the development server
npm run dev
```
---

### `POST /api/chat` – Main Chat API

This endpoint handles sending messages to the AI and streaming responses in real time.

**Flow & Responsibilities:**

1. **Authenticate User:**  
   Verifies the request comes from a logged-in user. Returns `401` if unauthenticated.

2. **Receive Required Parameters:**  
   Expects a JSON payload from the frontend containing:
    - `messages`: Array of `ChatMessage` objects
    - `useWebSearch`: Boolean — whether to enable the LLM’s web search tool and custom image search tool
    - `id`: Chat ID (for upserting in the database)
    - `model`: Which AI model to use (`GPT-4.1` or `Gemini 2.5`)

3. **Send Message to LLM:**  
   Converts messages to the model format, applies the selected tools if any, and streams the AI’s response in real time. Supports smooth streaming and optional stopping conditions.

4. **Persist Chat:**  
   Once the AI finishes, updates or inserts the chat in the database with the new messages, preserving history and context.

5. **Error Handling:**  
   Returns `500` with an error reason if anything fails during processing.

**Key Features:**
- Real-time streaming of AI responses
- Tool-driven AI (web search & custom Image search integration)
- Automatic chat persistence
- Strong type safety with TypeScript
- Error Handling

---
### Demo

1. **Web Search**:
   ![Demo Image 1](/demo/web-search.png)

2. **Custom Image Search Tool**:
   ![Demo Image 3](/demo/image-search.png)

3. **Changing Models**:
   ![Demo Image 4](/demo/gemini.png)
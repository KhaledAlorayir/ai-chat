import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";
import {ChatMessage, Model} from "@/lib/ai-models";

export const user = sqliteTable("user", {
    id: text().primaryKey(),
    name: text().notNull(),
    email: text().notNull().unique(),
    emailVerified: integer({mode: "boolean"})
        .default(false)
        .notNull(),
    image: text(),
    createdAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const session = sqliteTable("session", {
    id: text().primaryKey(),
    expiresAt: integer({mode: "timestamp_ms"}).notNull(),
    token: text().notNull().unique(),
    createdAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer({mode: "timestamp_ms"})
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: text()
        .notNull()
        .references(() => user.id, {onDelete: "cascade"}),
});

export const account = sqliteTable("account", {
    id: text().primaryKey(),
    accountId: text().notNull(),
    providerId: text().notNull(),
    userId: text()
        .notNull()
        .references(() => user.id, {onDelete: "cascade"}),
    accessToken: text(),
    refreshToken: text(),
    idToken: text(),
    accessTokenExpiresAt: integer({
        mode: "timestamp_ms",
    }),
    refreshTokenExpiresAt: integer({
        mode: "timestamp_ms",
    }),
    scope: text(),
    password: text(),
    createdAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer({mode: "timestamp_ms"})
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const verification = sqliteTable("verification", {
    id: text().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: integer({mode: "timestamp_ms"}).notNull(),
    createdAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const chat = sqliteTable("chat", {
    id: text().primaryKey(),
    messages: text({mode: "json"}).$type<ChatMessage[] | null>(),
    title: text().notNull().default(""),
    activeModel: text().notNull().$type<Model>(),
    webSearchActive: integer({mode: "boolean"}).notNull(),
    userId: text()
        .notNull()
        .references(() => user.id, {onDelete: "cascade"}),
    createdAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer({mode: "timestamp_ms"})
        .default(sql`(cast (unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
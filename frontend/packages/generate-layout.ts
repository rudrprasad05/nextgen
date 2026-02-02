import { PageSchema } from "@/lib/page-builder/types";
import { generateReactStyleObject } from "./generate-page";

export function generateLayout(schema: PageSchema): string {
  console.log(schema);
  return `
    import type { Metadata } from "next";
    import React from "react";

    export const metadata: Metadata = {
        title: "${schema.meta.title}",
        description: "${schema.meta.description}",
    };

    export default function RootLayout({
        children,
    }: {
        children: React.ReactNode
    }) {
        return (
            <html lang="en">
            <body style={ ${generateReactStyleObject(schema.root.styles)} }>
                {children}
            </body>
            </html>
        )
    }
    `;
}

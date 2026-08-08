import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal, safe renderer for CMS body copy.
 * Supports: headings (##, ###, ####), paragraphs, unordered/ordered lists,
 * blockquotes, horizontal rules, bold, italic, and links.
 * Raw HTML is never injected, so stored content cannot break out.
 */

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Order matters: links, bold, italic.
  const pattern = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      const [, , label, href] = match;
      const external = /^https?:\/\//i.test(href);
      nodes.push(
        <a
          key={`${keyPrefix}-${key++}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    } else if (match[4]) {
      nodes.push(<strong key={`${keyPrefix}-${key++}`}>{match[5]}</strong>);
    } else if (match[6]) {
      nodes.push(<em key={`${keyPrefix}-${key++}`}>{match[7]}</em>);
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

type Block =
  | { kind: "heading"; level: 2 | 3 | 4; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "hr" };

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ kind: "paragraph", text });
    paragraph = [];
  };
  const flushList = () => {
    if (list && list.items.length) blocks.push({ kind: "list", ...list });
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }
    if (/^(####|###|##)\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = trimmed.startsWith("####") ? 4 : trimmed.startsWith("###") ? 3 : 2;
      blocks.push({ kind: "heading", level: level as 2 | 3 | 4, text: trimmed.replace(/^#+\s+/, "") });
      continue;
    }
    if (trimmed === "---" || trimmed === "***") {
      flushParagraph();
      flushList();
      blocks.push({ kind: "hr" });
      continue;
    }
    if (trimmed.startsWith("> ")) {
      flushParagraph();
      flushList();
      blocks.push({ kind: "quote", text: trimmed.slice(2) });
      continue;
    }
    const unordered = /^[-*]\s+/.test(trimmed);
    const ordered = /^\d+[.)]\s+/.test(trimmed);
    if (unordered || ordered) {
      flushParagraph();
      const item = trimmed.replace(/^([-*]|\d+[.)])\s+/, "");
      if (list && list.ordered === ordered) {
        list.items.push(item);
      } else {
        flushList();
        list = { ordered, items: [item] };
      }
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  return blocks;
}

export function RichText({ content, className }: { content: string; className?: string }) {
  const blocks = parseBlocks(content);
  return (
    <div className={cn("prose-editorial", className)}>
      {blocks.map((block, index) => {
        const key = `block-${index}`;
        switch (block.kind) {
          case "heading": {
            const Tag = `h${block.level}` as "h2" | "h3" | "h4";
            return <Tag key={key}>{renderInline(block.text, key)}</Tag>;
          }
          case "paragraph":
            return <p key={key}>{renderInline(block.text, key)}</p>;
          case "quote":
            return <blockquote key={key}>{renderInline(block.text, key)}</blockquote>;
          case "list": {
            return block.ordered ? (
              <ol key={key}>
                {block.items.map((item, i) => (
                  <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
                ))}
              </ol>
            ) : (
              <ul key={key}>
                {block.items.map((item, i) => (
                  <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
                ))}
              </ul>
            );
          }
          case "hr":
            return <hr key={key} />;
        }
      })}
    </div>
  );
}

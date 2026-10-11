import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion } from "framer-motion";
import { MessageSquareText, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import assistantMark from "@/assets/chat-assistant.png";

const suggestions = [
  "What projects are here?",
  "Which tools does he know?",
  "Are the certifications verified?",
];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const { messages, sendMessage, status, stop, regenerate, clearError, error } =
    useChat({ transport });

  const panelRef = useRef<HTMLDivElement | null>(null);

  const focusComposer = useCallback(() => {
    window.requestAnimationFrame(() =>
      panelRef.current?.querySelector("textarea")?.focus(),
    );
  }, []);

  useEffect(() => {
    if (open) focusComposer();
  }, [open, focusComposer]);

  useEffect(() => {
    if (status === "ready" || status === "error") focusComposer();
  }, [status, focusComposer]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSubmit = useCallback(
    async ({ text }: { text: string }) => {
      const trimmed = text.trim();
      if (!trimmed || status === "submitted" || status === "streaming") return;
      clearError();
      await sendMessage({ text: trimmed });
      focusComposer();
    },
    [clearError, focusComposer, sendMessage, status],
  );

  const ask = useCallback(
    (text: string) => {
      void onSubmit({ text });
    },
    [onSubmit],
  );

  const retry = useCallback(() => {
    clearError();
    const last = messages.at(-1);
    if (last?.role === "assistant") {
      void regenerate();
      return;
    }
    if (last?.role === "user") {
      const text = last.parts.find((part) => part.type === "text")?.text;
      if (text) void sendMessage({ text, messageId: last.id });
    }
  }, [clearError, messages, regenerate, sendMessage]);

  const busy = status === "submitted" || status === "streaming";

  return (
    <>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed inset-x-3 bottom-3 z-50 flex h-[min(78vh,560px)] flex-col overflow-hidden rounded-md border border-border bg-card shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px]"
          role="dialog"
          aria-label="Ask about this portfolio"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <img
              src={assistantMark}
              alt=""
              width={816}
              height={816}
              loading="lazy"
              className="size-8 shrink-0 object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-lg leading-tight tracking-wide">
                Portfolio Assistant
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Projects, skills, certifications
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close assistant"
              onClick={() => setOpen(false)}
            >
              <X className="size-4" />
            </Button>
          </div>

          <Conversation className="min-h-0 flex-1">
            <ConversationContent className="gap-5 p-4">
              {messages.length === 0 && (
                <ConversationEmptyState
                  icon={
                    <img
                      src={assistantMark}
                      alt=""
                      width={816}
                      height={816}
                      loading="lazy"
                      className="size-10 object-contain"
                    />
                  }
                  title="Ask me anything about this portfolio"
                  description="Projects, tools, certifications, education — answered from what's on this page."
                />
              )}

              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent
                    className={
                      message.role === "user"
                        ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground"
                        : undefined
                    }
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return message.role === "user" ? (
                          <p className="whitespace-pre-wrap" key={index}>
                            {part.text}
                          </p>
                        ) : (
                          <MessageResponse
                            key={index}
                            isAnimating={
                              busy &&
                              message === messages.at(-1) &&
                              index === message.parts.length - 1
                            }
                          >
                            {part.text}
                          </MessageResponse>
                        );
                      }
                      if (part.type === "reasoning") {
                        return (
                          <p
                            className="text-xs leading-relaxed text-muted-foreground italic"
                            key={index}
                          >
                            {part.text}
                          </p>
                        );
                      }
                      return null;
                    })}
                  </MessageContent>
                </Message>
              ))}

              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer duration={1.2}>Thinking…</Shimmer>
                  </MessageContent>
                </Message>
              )}

              {error && (
                <div className="rounded-sm border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  <p role="alert">
                    {error.message || "The assistant could not answer."}
                  </p>
                  <button
                    className="mt-1 font-bold underline underline-offset-4"
                    onClick={retry}
                    type="button"
                  >
                    Try again
                  </button>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput
            className="border-t border-border bg-card p-3"
            onSubmit={onSubmit}
          >
            <PromptInputTextarea
              placeholder="Ask a question…"
              aria-label="Ask a question"
            />
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 px-1 pt-2">
                {suggestions.map((text) => (
                  <button
                    className="rounded-full border border-input px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
                    disabled={busy}
                    key={text}
                    onClick={() => ask(text)}
                    type="button"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}
            <PromptInputFooter className="justify-end pt-2">
              <PromptInputSubmit status={status} onStop={stop} disabled={status === "submitted"} />
            </PromptInputFooter>
          </PromptInput>
        </motion.div>
      )}

      <motion.button
        animate={open ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
        className={`fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-bold text-primary-foreground shadow-lg transition hover:opacity-90 sm:right-6 sm:bottom-6 ${open ? "pointer-events-none" : ""}`}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <>
            <MessageSquareText className="size-5" />
            <span className="hidden sm:inline">Ask about my work</span>
          </>
        )}
      </motion.button>
    </>
  );
}

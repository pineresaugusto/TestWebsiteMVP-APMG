"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  markThreadRead,
  sendMessage,
  useDemoState,
  type Thread,
} from "@/lib/demoState";

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function initials(name: string): string {
  return name
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function MessagesPage() {
  const state = useDemoState();
  const threads = useMemo<Thread[]>(
    () => state.dashboard?.messages ?? [],
    [state.dashboard?.messages],
  );
  const [filter, setFilter] = useState<"all" | "unread">("all");
  // Tracks the user's explicit selection. We derive the *effective* selected
  // id during render (falling back to the most-recent thread) so we don't
  // need a setState-in-effect to auto-select.
  const [userSelectedId, setUserSelectedId] = useState<string | null>(null);
  // On mobile, only one pane is visible at a time. Default to the inbox list;
  // tapping a thread switches to "thread"; the back button switches to "list".
  // Ignored on md+ (both panes always shown).
  const [mobileTab, setMobileTab] = useState<"list" | "thread">("list");
  const [draft, setDraft] = useState("");
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const sortedThreads = useMemo(
    () =>
      [...threads].sort(
        (a, b) =>
          new Date(b.lastTimestamp).getTime() -
          new Date(a.lastTimestamp).getTime(),
      ),
    [threads],
  );

  const filteredThreads = useMemo(
    () => (filter === "unread" ? sortedThreads.filter((t) => t.unread) : sortedThreads),
    [sortedThreads, filter],
  );

  // Effective selection: user's explicit pick (if it still exists), otherwise
  // the most-recent thread. Computed during render — no effect needed.
  const selectedId =
    (userSelectedId && threads.some((t) => t.id === userSelectedId)
      ? userSelectedId
      : sortedThreads[0]?.id) ?? null;

  // Mark as read when selected.
  useEffect(() => {
    if (!selectedId) return;
    const t = threads.find((x) => x.id === selectedId);
    if (t?.unread) markThreadRead(selectedId);
  }, [selectedId, threads]);

  const selected = selectedId
    ? threads.find((t) => t.id === selectedId) ?? null
    : null;

  // Scroll to bottom of thread body on thread change or new message.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [selectedId, selected?.messages.length]);

  const handleSend = () => {
    if (!selected || !draft.trim()) return;
    sendMessage(selected.id, draft.trim());
    setDraft("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const firstInitial = state.user?.firstName?.[0]?.toUpperCase() ?? "U";

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6">
        <h1 className="font-display text-[28px] font-medium leading-tight tracking-tight text-foreground">
          Messages
        </h1>
        <p className="mt-1 text-[15px] text-foreground/55">
          Communicate with your care team
        </p>
      </div>

      <div
        className="flex h-[calc(100vh-160px)] min-h-[480px] overflow-hidden rounded-2xl border border-secondary/40 bg-white shadow-sm md:grid md:h-[calc(100vh-180px)] md:grid-cols-[340px_1fr]"
      >
        {threads.length === 0 ? (
          <InboxEmpty />
        ) : (
          <>
            <div
              className={`${mobileTab === "list" ? "flex" : "hidden"} w-full md:flex`}
            >
              <ThreadList
                threads={filteredThreads}
                filter={filter}
                onFilterChange={setFilter}
                selectedId={selectedId}
                onSelect={(id) => {
                  setUserSelectedId(id);
                  setMobileTab("thread");
                }}
              />
            </div>
            <div
              className={`${mobileTab === "thread" ? "flex" : "hidden"} w-full md:flex`}
            >
              {selected ? (
                <ThreadView
                  thread={selected}
                  bodyRef={bodyRef}
                  textareaRef={textareaRef}
                  draft={draft}
                  onDraft={setDraft}
                  onSend={handleSend}
                  userInitial={firstInitial}
                  onBack={() => setMobileTab("list")}
                />
              ) : (
                <ThreadEmpty />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ThreadList({
  threads,
  filter,
  onFilterChange,
  selectedId,
  onSelect,
}: {
  threads: Thread[];
  filter: "all" | "unread";
  onFilterChange: (f: "all" | "unread") => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col border-r border-secondary/40 bg-background/60">
      <div className="flex items-center justify-between border-b border-secondary/30 px-5 pb-4 pt-5">
        <h2 className="text-base font-bold text-foreground">Inbox</h2>
      </div>
      <div className="flex gap-1 border-b border-secondary/20 px-4 pb-3 pt-2">
        <FilterButton
          active={filter === "all"}
          label="All"
          onClick={() => onFilterChange("all")}
        />
        <FilterButton
          active={filter === "unread"}
          label="Unread"
          onClick={() => onFilterChange("unread")}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {threads.map((t) => {
          const senderShort = t.sender.split(",")[0];
          const isActive = selectedId === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelect(t.id)}
              className={`relative flex w-full items-start gap-3 border-b border-secondary/20 px-5 py-4 text-left transition-colors ${
                isActive ? "bg-white" : "hover:bg-secondary/15"
              }`}
            >
              {isActive && (
                <span
                  className="absolute inset-y-0 left-0 w-[3px] bg-accent"
                  aria-hidden
                />
              )}
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {initials(t.sender)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex-1 truncate text-sm font-semibold text-foreground">
                    {senderShort}
                  </span>
                  <span className="flex-shrink-0 text-xs text-foreground/40">
                    {formatRelative(t.lastTimestamp)}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  {t.unread && (
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-accent" aria-hidden />
                  )}
                  <span className="truncate text-[13px] text-foreground/55">
                    {t.preview}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
        active
          ? "bg-foreground text-white"
          : "text-foreground/50 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function ThreadView({
  thread,
  bodyRef,
  textareaRef,
  draft,
  onDraft,
  onSend,
  userInitial,
  onBack,
}: {
  thread: Thread;
  bodyRef: React.RefObject<HTMLDivElement | null>;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  draft: string;
  onDraft: (v: string) => void;
  onSend: () => void;
  userInitial: string;
  onBack?: () => void;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-3 border-b border-secondary/30 px-4 py-4 md:px-6">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to threads"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-foreground/55 transition-colors hover:bg-secondary/30 hover:text-foreground md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
          {initials(thread.sender)}
        </span>
        <div>
          <div className="text-[15px] font-semibold text-foreground">
            {thread.sender}
          </div>
          <div className="text-[13px] text-foreground/45">Care team</div>
        </div>
        <div className="ml-auto hidden items-center gap-1.5 text-xs text-primary-dark/80 lg:flex">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Typical response: within 1 business day
        </div>
      </div>

      <div
        ref={bodyRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 md:px-6"
      >
        {thread.messages.map((m, i) => {
          const prev = thread.messages[i - 1];
          const showDate =
            i === 0 ||
            formatDateLabel(m.timestamp) !== formatDateLabel(prev.timestamp);
          return (
            <div key={i} className="flex flex-col gap-4">
              {showDate && (
                <div className="py-1 text-center text-xs font-medium text-foreground/40">
                  {formatDateLabel(m.timestamp)}
                </div>
              )}
              <Bubble
                from={m.from}
                text={m.text}
                time={m.timestamp}
                providerInitials={initials(thread.sender)}
                userInitial={userInitial}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-end gap-3 border-t border-secondary/30 px-4 py-4 md:px-6">
        <textarea
          ref={textareaRef}
          rows={1}
          value={draft}
          onChange={(e) => {
            onDraft(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Type a message..."
          className="min-h-[44px] max-h-[120px] flex-1 resize-none rounded-xl border-[1.5px] border-secondary bg-background/60 px-4 py-3 text-sm leading-snug text-foreground outline-none transition-colors placeholder:text-foreground/35 focus:border-primary"
        />
        <button
          type="button"
          onClick={onSend}
          disabled={!draft.trim()}
          aria-label="Send"
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden
          >
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22l-4-9-9-4z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Bubble({
  from,
  text,
  time,
  providerInitials,
  userInitial,
}: {
  from: "provider" | "user";
  text: string;
  time: string;
  providerInitials: string;
  userInitial: string;
}) {
  const isUser = from === "user";
  return (
    <div
      className={`flex max-w-[75%] gap-2 ${isUser ? "flex-row-reverse self-end" : "self-start"}`}
    >
      <span
        className={`mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
          isUser
            ? "bg-secondary text-foreground"
            : "bg-primary text-white"
        }`}
      >
        {isUser ? userInitial : providerInitials}
      </span>
      <div>
        <div
          className={`px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "rounded-[18px] rounded-br-[4px] bg-primary text-white"
              : "rounded-[18px] rounded-bl-[4px] bg-secondary/25 text-foreground"
          }`}
        >
          {text}
        </div>
        <div
          className={`mt-1 px-2 text-[11px] text-foreground/40 ${isUser ? "text-right" : ""}`}
        >
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
}

function ThreadEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-foreground/40">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mb-4 h-12 w-12"
        aria-hidden
      >
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
      <p className="text-[15px] font-medium">Select a conversation</p>
    </div>
  );
}

function InboxEmpty() {
  return (
    <div className="col-span-2 flex flex-col items-center justify-center px-12 py-20 text-center">
      <div className="relative mb-5 h-24 w-24">
        <div className="absolute left-5 top-0 h-14 w-14 rounded-full bg-primary/12" />
        <div className="absolute bottom-0 right-2.5 h-10 w-10 rounded-full bg-accent/10" />
        <div className="absolute bottom-5 left-0 h-1.5 w-12 rounded bg-secondary/40" />
      </div>
      <h3 className="text-base font-semibold text-foreground">No messages yet</h3>
      <p className="mt-1.5 text-sm text-foreground/50">
        Your care team will reach out here once your treatment begins
      </p>
    </div>
  );
}

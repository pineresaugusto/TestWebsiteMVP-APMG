---
name: save
description: >
  Commit changes and update the README session log. Analyzes the diff,
  previews the commit message and log entry for approval, then updates
  README.md and commits. Use instead of raw git commit.
disable-model-invocation: true
argument-hint: "[optional context note]"
allowed-tools: Read Edit Bash(git *) Bash(node *)
---

# /save — Commit + Session Log

You are committing changes to the Nuvela MVP repo. Follow these steps
exactly in order.

## Step 1: Check for changes

Run `git status` (never use `-uall`). If the working tree is clean and
there is nothing staged, tell the user:
> Nothing to save — working tree is clean.

Then stop.

## Step 2: Analyze changes

Run `git diff --stat` to see what changed and the scale. Then:
- If total lines changed <= 500: run `git diff` for full content
- If total lines changed > 500: use the stat overview + read specific
  changed files with the Read tool to understand the purpose

Also check `git status` for untracked files. If there are untracked files
that look relevant (not in .gitignore), list them and ask the user which
ones to include.

Check if files are already staged (`git diff --cached --stat`). If the user
has selectively staged files, respect that — only add README.md on top.

## Step 3: Detect user

Run `git config user.email` and `git config user.name`. Then read the
`## Team` table in README.md. The table maps GitHub usernames to roles:

```
| GitHub | Role |
|--------|------|
| adpineres-ef | Co-founder, initial MVP build |
| Mauger00 | Co-founder, ... |
```

Match the git identity to a GitHub username:
1. Check if git user.name or the email username (before @) partially
   matches a GitHub username in the Team table
2. Check `git log --format='%ae %an' -5` for the same email — see what
   name is associated with those commits
3. If no match, use git user.name as-is

## Step 4: Generate commit message and session log bullets

From the diff analysis, generate:

1. **Commit message** — Imperative mood, 1-2 concise sentences. What
   changed and why. Match the style in `git log --oneline -5`.
2. **Session log bullets** — 1-4 high-level bullets in plain language.
   Written for humans scanning the README, not for git forensics.

If `$ARGUMENTS` was provided (e.g. `/save "discussed pricing with partner"`),
add it as an additional bullet or incorporate the context into the bullets.

## Step 5: Preview and confirm

Show the user:

```
Proposed commit:
  Files: <list of files to be committed>
  Message: <commit message>

Session log entry:
  ### YYYY-MM-DD — username
  - bullet 1
  - bullet 2

Commit with these changes?
```

Wait for user confirmation. If they want edits, adjust and re-preview.
Do NOT proceed without confirmation.

## Step 6: Update README.md

Read README.md. Find the `## Session Log` section. The section starts
after the line beginning with `Format:` and ends at the line
`## Backlog / What's Next`.

Get today's date by running:
```bash
node -e "console.log(new Date().toISOString().slice(0,10))"
```

- **If `### YYYY-MM-DD — <username>` already exists for today and this
  user:** use the Edit tool to append new bullets below the last bullet in
  that entry. Find the last `- ` line under that header and add after it.
- **If no entry for today + this user:** use the Edit tool to insert a new
  block right after the `Format:` line, with a blank line before the first
  existing entry:

```markdown

### YYYY-MM-DD — github-username
- Bullet 1
- Bullet 2
```

Do NOT modify anything outside the Session Log section.

## Step 7: Stage and commit

1. Check if files were already staged before this skill ran:
   - **Yes (selective staging):** only add README.md to the existing staging
   - **No (nothing staged):** stage all modified tracked files + any
     user-approved untracked files + the updated README.md
2. **NEVER** stage `.claude/settings.local.json`
3. **NEVER** use `git add -A` or `git add .` — always use explicit paths
4. Commit using HEREDOC format:

```bash
git commit -m "$(cat <<'EOF'
<commit message>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

## Step 8: Report

Show:
- Commit hash (short)
- Files committed (list)
- Commit message used
- Session log entry added/updated (quote it)
- Note: `Run git push when ready to push to origin.`

Do NOT ask about pushing. Do NOT push unless the user explicitly asks.

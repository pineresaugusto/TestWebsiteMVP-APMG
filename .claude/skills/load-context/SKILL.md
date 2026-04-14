---
name: load-context
description: >
  Bootstrap a Nuvela work session. Loads project README, recent git history,
  current status, and uncommitted changes. Run this at the start of every
  work session.
disable-model-invocation: true
allowed-tools: Read Bash(git *) Bash(npm *)
---

# Nuvela Session Bootstrap

You are continuing work on the **Nuvela MVP** — a GLP-1 telehealth demo website.
Load the following context before proceeding.

## Project README (full context)
!`cat README.md`

## Agent Conventions
!`cat AGENTS.md`

## Recent Git History (last 15 commits)
!`git log --oneline -15`

## Current Branch & Remote Status
!`git branch -vv`

## Working Tree Status
!`git status`

## Latest Changelog Entry
!`cat CHANGELOG.md`

---

You now have full project context. Do the following:

1. Greet the user by name if you can infer it from the git config or recent commits
2. State which branch you're on and whether there are uncommitted changes
3. Summarize the most recent Session Log entry (who worked last, what they did)
4. List the top 3 items from the Backlog section
5. Ask what they'd like to work on today

**End-of-session reminder:** Before the user ends the session, remind them to:
- Add a Session Log entry to README.md
- Update CHANGELOG.md if they completed an iteration
- Commit their work

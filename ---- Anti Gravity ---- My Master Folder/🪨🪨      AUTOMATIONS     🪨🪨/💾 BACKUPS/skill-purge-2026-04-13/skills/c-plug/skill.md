---
name: c-plug
description: Plugin quickstart — how Claude Code plugins work, install, activate, manage
---

# /c-plug

Quick reference for the Claude Code plugin system. Show the info, done. No menus.

## Output

When invoked, print this inside the Hub Color Stack box:

```
🔵🟢🟣🔴🟠  claude  /reload-plugins
╭────────────────────────────────────────────────╮

   p l u g i n s  —  q u i c k  g u i d e

   WHAT ARE PLUGINS?
   Plugins extend Claude Code with extra skills,
   agents, hooks, and MCP servers — built by the
   community or official sources.

   INSTALL A PLUGIN
   /plugin install <name>@<source>
   Example:
   /plugin install frontend-design@claude-plugins-official

   ACTIVATE AFTER INSTALL
   /reload-plugins
   This hot-reloads everything without restarting
   your session. You'll see a summary like:
   "Reloaded: 1 plugin · 0 skills · 5 agents"

   LIST INSTALLED PLUGINS
   /plugin list

   REMOVE A PLUGIN
   /plugin uninstall <name>

   KEY FACTS
   - Plugins add tools that show up as skills,
     agents, hooks, or MCP servers
   - Always run /reload-plugins after install
   - No restart needed — it's instant
   - Plugin source = where it lives (registry)
   - Official source: claude-plugins-official

╰────────────────────────────────────────────────╯
```

## Rules
- One shot — print the guide, done
- No follow-up menus or prompts
- Always use the Hub Color Stack box

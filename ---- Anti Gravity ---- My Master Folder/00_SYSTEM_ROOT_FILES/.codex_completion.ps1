
using namespace System.Management.Automation
using namespace System.Management.Automation.Language

Register-ArgumentCompleter -Native -CommandName 'codex' -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)

    $commandElements = $commandAst.CommandElements
    $command = @(
        'codex'
        for ($i = 1; $i -lt $commandElements.Count; $i++) {
            $element = $commandElements[$i]
            if ($element -isnot [StringConstantExpressionAst] -or
                $element.StringConstantType -ne [StringConstantType]::BareWord -or
                $element.Value.StartsWith('-') -or
                $element.Value -eq $wordToComplete) {
                break
        }
        $element.Value
    }) -join ';'

    $completions = @(switch ($command) {
        'codex' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--remote', '--remote', [CompletionResultType]::ParameterName, 'Connect the TUI to a remote app server websocket endpoint')
            [CompletionResult]::new('--remote-auth-token-env', '--remote-auth-token-env', [CompletionResultType]::ParameterName, 'Name of the environment variable containing the bearer token to send to a remote app server websocket')
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--local-provider', '--local-provider', [CompletionResultType]::ParameterName, 'Specify which local provider to use (lmstudio or ollama). If not specified with --oss, will use config default or show selection')
            [CompletionResult]::new('-p', '-p', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('--profile', '--profile', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('-s', '-s', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('--sandbox', '--sandbox', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--add-dir', '--add-dir', [CompletionResultType]::ParameterName, 'Additional directories that should be writable alongside the primary workspace')
            [CompletionResult]::new('-a', '-a', [CompletionResultType]::ParameterName, 'Configure when the model requires human approval before executing a command')
            [CompletionResult]::new('--ask-for-approval', '--ask-for-approval', [CompletionResultType]::ParameterName, 'Configure when the model requires human approval before executing a command')
            [CompletionResult]::new('--oss', '--oss', [CompletionResultType]::ParameterName, 'Use open-source provider')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--search', '--search', [CompletionResultType]::ParameterName, 'Enable live web search. When enabled, the native Responses `web_search` tool is available to the model (no perΓÇæcall approval)')
            [CompletionResult]::new('--no-alt-screen', '--no-alt-screen', [CompletionResultType]::ParameterName, 'Disable alternate screen mode')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('-V', '-V ', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('--version', '--version', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('exec', 'exec', [CompletionResultType]::ParameterValue, 'Run Codex non-interactively')
            [CompletionResult]::new('e', 'e', [CompletionResultType]::ParameterValue, 'Run Codex non-interactively')
            [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Run a code review non-interactively')
            [CompletionResult]::new('login', 'login', [CompletionResultType]::ParameterValue, 'Manage login')
            [CompletionResult]::new('logout', 'logout', [CompletionResultType]::ParameterValue, 'Remove stored authentication credentials')
            [CompletionResult]::new('mcp', 'mcp', [CompletionResultType]::ParameterValue, 'Manage external MCP servers for Codex')
            [CompletionResult]::new('plugin', 'plugin', [CompletionResultType]::ParameterValue, 'Manage Codex plugins')
            [CompletionResult]::new('mcp-server', 'mcp-server', [CompletionResultType]::ParameterValue, 'Start Codex as an MCP server (stdio)')
            [CompletionResult]::new('app-server', 'app-server', [CompletionResultType]::ParameterValue, '[experimental] Run the app server or related tooling')
            [CompletionResult]::new('app', 'app', [CompletionResultType]::ParameterValue, 'Launch the Codex desktop app (opens the app installer if missing)')
            [CompletionResult]::new('completion', 'completion', [CompletionResultType]::ParameterValue, 'Generate shell completion scripts')
            [CompletionResult]::new('update', 'update', [CompletionResultType]::ParameterValue, 'Update Codex to the latest version')
            [CompletionResult]::new('sandbox', 'sandbox', [CompletionResultType]::ParameterValue, 'Run commands within a Codex-provided sandbox')
            [CompletionResult]::new('debug', 'debug', [CompletionResultType]::ParameterValue, 'Debugging tools')
            [CompletionResult]::new('execpolicy', 'execpolicy', [CompletionResultType]::ParameterValue, 'Execpolicy tooling')
            [CompletionResult]::new('apply', 'apply', [CompletionResultType]::ParameterValue, 'Apply the latest diff produced by Codex agent as a `git apply` to your local working tree')
            [CompletionResult]::new('a', 'a', [CompletionResultType]::ParameterValue, 'Apply the latest diff produced by Codex agent as a `git apply` to your local working tree')
            [CompletionResult]::new('resume', 'resume', [CompletionResultType]::ParameterValue, 'Resume a previous interactive session (picker by default; use --last to continue the most recent)')
            [CompletionResult]::new('fork', 'fork', [CompletionResultType]::ParameterValue, 'Fork a previous interactive session (picker by default; use --last to fork the most recent)')
            [CompletionResult]::new('cloud', 'cloud', [CompletionResultType]::ParameterValue, '[EXPERIMENTAL] Browse tasks from Codex Cloud and apply changes locally')
            [CompletionResult]::new('responses-api-proxy', 'responses-api-proxy', [CompletionResultType]::ParameterValue, 'Internal: run the responses API proxy')
            [CompletionResult]::new('stdio-to-uds', 'stdio-to-uds', [CompletionResultType]::ParameterValue, 'Internal: relay stdio to a Unix domain socket')
            [CompletionResult]::new('exec-server', 'exec-server', [CompletionResultType]::ParameterValue, '[EXPERIMENTAL] Run the standalone exec-server service')
            [CompletionResult]::new('features', 'features', [CompletionResultType]::ParameterValue, 'Inspect feature flags')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;exec' {
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('--local-provider', '--local-provider', [CompletionResultType]::ParameterName, 'Specify which local provider to use (lmstudio or ollama). If not specified with --oss, will use config default or show selection')
            [CompletionResult]::new('-p', '-p', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('--profile', '--profile', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('-s', '-s', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('--sandbox', '--sandbox', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--add-dir', '--add-dir', [CompletionResultType]::ParameterName, 'Additional directories that should be writable alongside the primary workspace')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--output-schema', '--output-schema', [CompletionResultType]::ParameterName, 'Path to a JSON Schema file describing the model''s final response shape')
            [CompletionResult]::new('--color', '--color', [CompletionResultType]::ParameterName, 'Specifies color settings for use in the output')
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('--output-last-message', '--output-last-message', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--oss', '--oss', [CompletionResultType]::ParameterName, 'Use open-source provider')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--skip-git-repo-check', '--skip-git-repo-check', [CompletionResultType]::ParameterName, 'Allow running Codex outside a Git repository')
            [CompletionResult]::new('--ephemeral', '--ephemeral', [CompletionResultType]::ParameterName, 'Run without persisting session files to disk')
            [CompletionResult]::new('--ignore-user-config', '--ignore-user-config', [CompletionResultType]::ParameterName, 'Do not load `$CODEX_HOME/config.toml`; auth still uses `CODEX_HOME`')
            [CompletionResult]::new('--ignore-rules', '--ignore-rules', [CompletionResultType]::ParameterName, 'Do not load user or project execpolicy `.rules` files')
            [CompletionResult]::new('--full-auto', '--full-auto', [CompletionResultType]::ParameterName, 'Legacy compatibility trap for the removed `--full-auto` flag')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Print events to stdout as JSONL')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('-V', '-V ', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('--version', '--version', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('resume', 'resume', [CompletionResultType]::ParameterValue, 'Resume a previous session by id or pick the most recent with --last')
            [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Run a code review against the current repository')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;e' {
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('--local-provider', '--local-provider', [CompletionResultType]::ParameterName, 'Specify which local provider to use (lmstudio or ollama). If not specified with --oss, will use config default or show selection')
            [CompletionResult]::new('-p', '-p', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('--profile', '--profile', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('-s', '-s', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('--sandbox', '--sandbox', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--add-dir', '--add-dir', [CompletionResultType]::ParameterName, 'Additional directories that should be writable alongside the primary workspace')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--output-schema', '--output-schema', [CompletionResultType]::ParameterName, 'Path to a JSON Schema file describing the model''s final response shape')
            [CompletionResult]::new('--color', '--color', [CompletionResultType]::ParameterName, 'Specifies color settings for use in the output')
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('--output-last-message', '--output-last-message', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--oss', '--oss', [CompletionResultType]::ParameterName, 'Use open-source provider')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--skip-git-repo-check', '--skip-git-repo-check', [CompletionResultType]::ParameterName, 'Allow running Codex outside a Git repository')
            [CompletionResult]::new('--ephemeral', '--ephemeral', [CompletionResultType]::ParameterName, 'Run without persisting session files to disk')
            [CompletionResult]::new('--ignore-user-config', '--ignore-user-config', [CompletionResultType]::ParameterName, 'Do not load `$CODEX_HOME/config.toml`; auth still uses `CODEX_HOME`')
            [CompletionResult]::new('--ignore-rules', '--ignore-rules', [CompletionResultType]::ParameterName, 'Do not load user or project execpolicy `.rules` files')
            [CompletionResult]::new('--full-auto', '--full-auto', [CompletionResultType]::ParameterName, 'Legacy compatibility trap for the removed `--full-auto` flag')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Print events to stdout as JSONL')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('-V', '-V ', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('--version', '--version', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('resume', 'resume', [CompletionResultType]::ParameterValue, 'Resume a previous session by id or pick the most recent with --last')
            [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Run a code review against the current repository')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;exec;resume' {
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the prompt sent after resuming')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the prompt sent after resuming')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('--output-last-message', '--output-last-message', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--last', '--last', [CompletionResultType]::ParameterName, 'Resume the most recent recorded session (newest) without specifying an id')
            [CompletionResult]::new('--all', '--all', [CompletionResultType]::ParameterName, 'Show all sessions (disables cwd filtering)')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--skip-git-repo-check', '--skip-git-repo-check', [CompletionResultType]::ParameterName, 'Allow running Codex outside a Git repository')
            [CompletionResult]::new('--ephemeral', '--ephemeral', [CompletionResultType]::ParameterName, 'Run without persisting session files to disk')
            [CompletionResult]::new('--ignore-user-config', '--ignore-user-config', [CompletionResultType]::ParameterName, 'Do not load `$CODEX_HOME/config.toml`; auth still uses `CODEX_HOME`')
            [CompletionResult]::new('--ignore-rules', '--ignore-rules', [CompletionResultType]::ParameterName, 'Do not load user or project execpolicy `.rules` files')
            [CompletionResult]::new('--full-auto', '--full-auto', [CompletionResultType]::ParameterName, 'Legacy compatibility trap for the removed `--full-auto` flag')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Print events to stdout as JSONL')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;e;resume' {
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the prompt sent after resuming')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the prompt sent after resuming')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('--output-last-message', '--output-last-message', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--last', '--last', [CompletionResultType]::ParameterName, 'Resume the most recent recorded session (newest) without specifying an id')
            [CompletionResult]::new('--all', '--all', [CompletionResultType]::ParameterName, 'Show all sessions (disables cwd filtering)')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--skip-git-repo-check', '--skip-git-repo-check', [CompletionResultType]::ParameterName, 'Allow running Codex outside a Git repository')
            [CompletionResult]::new('--ephemeral', '--ephemeral', [CompletionResultType]::ParameterName, 'Run without persisting session files to disk')
            [CompletionResult]::new('--ignore-user-config', '--ignore-user-config', [CompletionResultType]::ParameterName, 'Do not load `$CODEX_HOME/config.toml`; auth still uses `CODEX_HOME`')
            [CompletionResult]::new('--ignore-rules', '--ignore-rules', [CompletionResultType]::ParameterName, 'Do not load user or project execpolicy `.rules` files')
            [CompletionResult]::new('--full-auto', '--full-auto', [CompletionResultType]::ParameterName, 'Legacy compatibility trap for the removed `--full-auto` flag')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Print events to stdout as JSONL')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;exec;review' {
            [CompletionResult]::new('--base', '--base', [CompletionResultType]::ParameterName, 'Review changes against the given base branch')
            [CompletionResult]::new('--commit', '--commit', [CompletionResultType]::ParameterName, 'Review the changes introduced by a commit')
            [CompletionResult]::new('--title', '--title', [CompletionResultType]::ParameterName, 'Optional commit title to display in the review summary')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('--output-last-message', '--output-last-message', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--uncommitted', '--uncommitted', [CompletionResultType]::ParameterName, 'Review staged, unstaged, and untracked changes')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--skip-git-repo-check', '--skip-git-repo-check', [CompletionResultType]::ParameterName, 'Allow running Codex outside a Git repository')
            [CompletionResult]::new('--ephemeral', '--ephemeral', [CompletionResultType]::ParameterName, 'Run without persisting session files to disk')
            [CompletionResult]::new('--ignore-user-config', '--ignore-user-config', [CompletionResultType]::ParameterName, 'Do not load `$CODEX_HOME/config.toml`; auth still uses `CODEX_HOME`')
            [CompletionResult]::new('--ignore-rules', '--ignore-rules', [CompletionResultType]::ParameterName, 'Do not load user or project execpolicy `.rules` files')
            [CompletionResult]::new('--full-auto', '--full-auto', [CompletionResultType]::ParameterName, 'Legacy compatibility trap for the removed `--full-auto` flag')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Print events to stdout as JSONL')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;e;review' {
            [CompletionResult]::new('--base', '--base', [CompletionResultType]::ParameterName, 'Review changes against the given base branch')
            [CompletionResult]::new('--commit', '--commit', [CompletionResultType]::ParameterName, 'Review the changes introduced by a commit')
            [CompletionResult]::new('--title', '--title', [CompletionResultType]::ParameterName, 'Optional commit title to display in the review summary')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('--output-last-message', '--output-last-message', [CompletionResultType]::ParameterName, 'Specifies file where the last message from the agent should be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--uncommitted', '--uncommitted', [CompletionResultType]::ParameterName, 'Review staged, unstaged, and untracked changes')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--skip-git-repo-check', '--skip-git-repo-check', [CompletionResultType]::ParameterName, 'Allow running Codex outside a Git repository')
            [CompletionResult]::new('--ephemeral', '--ephemeral', [CompletionResultType]::ParameterName, 'Run without persisting session files to disk')
            [CompletionResult]::new('--ignore-user-config', '--ignore-user-config', [CompletionResultType]::ParameterName, 'Do not load `$CODEX_HOME/config.toml`; auth still uses `CODEX_HOME`')
            [CompletionResult]::new('--ignore-rules', '--ignore-rules', [CompletionResultType]::ParameterName, 'Do not load user or project execpolicy `.rules` files')
            [CompletionResult]::new('--full-auto', '--full-auto', [CompletionResultType]::ParameterName, 'Legacy compatibility trap for the removed `--full-auto` flag')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Print events to stdout as JSONL')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;exec;help' {
            [CompletionResult]::new('resume', 'resume', [CompletionResultType]::ParameterValue, 'Resume a previous session by id or pick the most recent with --last')
            [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Run a code review against the current repository')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;exec;help;resume' {
            break
        }
        'codex;exec;help;review' {
            break
        }
        'codex;exec;help;help' {
            break
        }
        'codex;e;help' {
            [CompletionResult]::new('resume', 'resume', [CompletionResultType]::ParameterValue, 'Resume a previous session by id or pick the most recent with --last')
            [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Run a code review against the current repository')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;e;help;resume' {
            break
        }
        'codex;e;help;review' {
            break
        }
        'codex;e;help;help' {
            break
        }
        'codex;review' {
            [CompletionResult]::new('--base', '--base', [CompletionResultType]::ParameterName, 'Review changes against the given base branch')
            [CompletionResult]::new('--commit', '--commit', [CompletionResultType]::ParameterName, 'Review the changes introduced by a commit')
            [CompletionResult]::new('--title', '--title', [CompletionResultType]::ParameterName, 'Optional commit title to display in the review summary')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--uncommitted', '--uncommitted', [CompletionResultType]::ParameterName, 'Review staged, unstaged, and untracked changes')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;login' {
            [CompletionResult]::new('--api-key', '--api-key', [CompletionResultType]::ParameterName, '(deprecated) Previously accepted the API key directly; now exits with guidance to use --with-api-key')
            [CompletionResult]::new('--experimental_issuer', '--experimental_issuer', [CompletionResultType]::ParameterName, 'EXPERIMENTAL: Use custom OAuth issuer base URL (advanced) Override the OAuth issuer base URL (advanced)')
            [CompletionResult]::new('--experimental_client-id', '--experimental_client-id', [CompletionResultType]::ParameterName, 'EXPERIMENTAL: Use custom OAuth client ID (advanced)')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--with-api-key', '--with-api-key', [CompletionResultType]::ParameterName, 'Read the API key from stdin (e.g. `printenv OPENAI_API_KEY | codex login --with-api-key`)')
            [CompletionResult]::new('--with-agent-identity', '--with-agent-identity', [CompletionResultType]::ParameterName, 'Read the experimental Agent Identity token from stdin (e.g. `printenv CODEX_AGENT_IDENTITY | codex login --with-agent-identity`)')
            [CompletionResult]::new('--device-auth', '--device-auth', [CompletionResultType]::ParameterName, 'device-auth')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show login status')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;login;status' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;login;help' {
            [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show login status')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;login;help;status' {
            break
        }
        'codex;login;help;help' {
            break
        }
        'codex;logout' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;mcp' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'list')
            [CompletionResult]::new('get', 'get', [CompletionResultType]::ParameterValue, 'get')
            [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'add')
            [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'remove')
            [CompletionResult]::new('login', 'login', [CompletionResultType]::ParameterValue, 'login')
            [CompletionResult]::new('logout', 'logout', [CompletionResultType]::ParameterValue, 'logout')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;mcp;list' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Output the configured servers as JSON')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;mcp;get' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Output the server configuration as JSON')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;mcp;add' {
            [CompletionResult]::new('--env', '--env', [CompletionResultType]::ParameterName, 'Environment variables to set when launching the server. Only valid with stdio servers')
            [CompletionResult]::new('--url', '--url', [CompletionResultType]::ParameterName, 'URL for a streamable HTTP MCP server')
            [CompletionResult]::new('--bearer-token-env-var', '--bearer-token-env-var', [CompletionResultType]::ParameterName, 'Optional environment variable to read for a bearer token. Only valid with streamable HTTP servers')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;mcp;remove' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;mcp;login' {
            [CompletionResult]::new('--scopes', '--scopes', [CompletionResultType]::ParameterName, 'Comma-separated list of OAuth scopes to request')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;mcp;logout' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;mcp;help' {
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'list')
            [CompletionResult]::new('get', 'get', [CompletionResultType]::ParameterValue, 'get')
            [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'add')
            [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'remove')
            [CompletionResult]::new('login', 'login', [CompletionResultType]::ParameterValue, 'login')
            [CompletionResult]::new('logout', 'logout', [CompletionResultType]::ParameterValue, 'logout')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;mcp;help;list' {
            break
        }
        'codex;mcp;help;get' {
            break
        }
        'codex;mcp;help;add' {
            break
        }
        'codex;mcp;help;remove' {
            break
        }
        'codex;mcp;help;login' {
            break
        }
        'codex;mcp;help;logout' {
            break
        }
        'codex;mcp;help;help' {
            break
        }
        'codex;plugin' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('marketplace', 'marketplace', [CompletionResultType]::ParameterValue, 'Manage plugin marketplaces for Codex')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;plugin;marketplace' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'add')
            [CompletionResult]::new('upgrade', 'upgrade', [CompletionResultType]::ParameterValue, 'upgrade')
            [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'remove')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;plugin;marketplace;add' {
            [CompletionResult]::new('--ref', '--ref', [CompletionResultType]::ParameterName, 'ref')
            [CompletionResult]::new('--sparse', '--sparse', [CompletionResultType]::ParameterName, 'sparse')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;plugin;marketplace;upgrade' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;plugin;marketplace;remove' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;plugin;marketplace;help' {
            [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'add')
            [CompletionResult]::new('upgrade', 'upgrade', [CompletionResultType]::ParameterValue, 'upgrade')
            [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'remove')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;plugin;marketplace;help;add' {
            break
        }
        'codex;plugin;marketplace;help;upgrade' {
            break
        }
        'codex;plugin;marketplace;help;remove' {
            break
        }
        'codex;plugin;marketplace;help;help' {
            break
        }
        'codex;plugin;help' {
            [CompletionResult]::new('marketplace', 'marketplace', [CompletionResultType]::ParameterValue, 'Manage plugin marketplaces for Codex')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;plugin;help;marketplace' {
            [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'add')
            [CompletionResult]::new('upgrade', 'upgrade', [CompletionResultType]::ParameterValue, 'upgrade')
            [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'remove')
            break
        }
        'codex;plugin;help;marketplace;add' {
            break
        }
        'codex;plugin;help;marketplace;upgrade' {
            break
        }
        'codex;plugin;help;marketplace;remove' {
            break
        }
        'codex;plugin;help;help' {
            break
        }
        'codex;mcp-server' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;app-server' {
            [CompletionResult]::new('--listen', '--listen', [CompletionResultType]::ParameterName, 'Transport endpoint URL. Supported values: `stdio://` (default), `unix://`, `unix://PATH`, `ws://IP:PORT`, `off`')
            [CompletionResult]::new('--ws-auth', '--ws-auth', [CompletionResultType]::ParameterName, 'Websocket auth mode for non-loopback listeners')
            [CompletionResult]::new('--ws-token-file', '--ws-token-file', [CompletionResultType]::ParameterName, 'Absolute path to the capability-token file')
            [CompletionResult]::new('--ws-token-sha256', '--ws-token-sha256', [CompletionResultType]::ParameterName, 'Hex-encoded SHA-256 digest of the capability token')
            [CompletionResult]::new('--ws-shared-secret-file', '--ws-shared-secret-file', [CompletionResultType]::ParameterName, 'Absolute path to the shared secret file for signed JWT bearer tokens')
            [CompletionResult]::new('--ws-issuer', '--ws-issuer', [CompletionResultType]::ParameterName, 'Expected issuer for signed JWT bearer tokens')
            [CompletionResult]::new('--ws-audience', '--ws-audience', [CompletionResultType]::ParameterName, 'Expected audience for signed JWT bearer tokens')
            [CompletionResult]::new('--ws-max-clock-skew-seconds', '--ws-max-clock-skew-seconds', [CompletionResultType]::ParameterName, 'Maximum clock skew when validating signed JWT bearer tokens')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--analytics-default-enabled', '--analytics-default-enabled', [CompletionResultType]::ParameterName, 'Controls whether analytics are enabled by default')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('proxy', 'proxy', [CompletionResultType]::ParameterValue, 'Proxy stdio bytes to the running app-server control socket')
            [CompletionResult]::new('generate-ts', 'generate-ts', [CompletionResultType]::ParameterValue, '[experimental] Generate TypeScript bindings for the app server protocol')
            [CompletionResult]::new('generate-json-schema', 'generate-json-schema', [CompletionResultType]::ParameterValue, '[experimental] Generate JSON Schema for the app server protocol')
            [CompletionResult]::new('generate-internal-json-schema', 'generate-internal-json-schema', [CompletionResultType]::ParameterValue, '[internal] Generate internal JSON Schema artifacts for Codex tooling')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;app-server;proxy' {
            [CompletionResult]::new('--sock', '--sock', [CompletionResultType]::ParameterName, 'Path to the app-server Unix domain socket to connect to')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;app-server;generate-ts' {
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Output directory where .ts files will be written')
            [CompletionResult]::new('--out', '--out', [CompletionResultType]::ParameterName, 'Output directory where .ts files will be written')
            [CompletionResult]::new('-p', '-p', [CompletionResultType]::ParameterName, 'Optional path to the Prettier executable to format generated files')
            [CompletionResult]::new('--prettier', '--prettier', [CompletionResultType]::ParameterName, 'Optional path to the Prettier executable to format generated files')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--experimental', '--experimental', [CompletionResultType]::ParameterName, 'Include experimental methods and fields in the generated output')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;app-server;generate-json-schema' {
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Output directory where the schema bundle will be written')
            [CompletionResult]::new('--out', '--out', [CompletionResultType]::ParameterName, 'Output directory where the schema bundle will be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--experimental', '--experimental', [CompletionResultType]::ParameterName, 'Include experimental methods and fields in the generated output')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;app-server;generate-internal-json-schema' {
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Output directory where internal JSON Schema artifacts will be written')
            [CompletionResult]::new('--out', '--out', [CompletionResultType]::ParameterName, 'Output directory where internal JSON Schema artifacts will be written')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;app-server;help' {
            [CompletionResult]::new('proxy', 'proxy', [CompletionResultType]::ParameterValue, 'Proxy stdio bytes to the running app-server control socket')
            [CompletionResult]::new('generate-ts', 'generate-ts', [CompletionResultType]::ParameterValue, '[experimental] Generate TypeScript bindings for the app server protocol')
            [CompletionResult]::new('generate-json-schema', 'generate-json-schema', [CompletionResultType]::ParameterValue, '[experimental] Generate JSON Schema for the app server protocol')
            [CompletionResult]::new('generate-internal-json-schema', 'generate-internal-json-schema', [CompletionResultType]::ParameterValue, '[internal] Generate internal JSON Schema artifacts for Codex tooling')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;app-server;help;proxy' {
            break
        }
        'codex;app-server;help;generate-ts' {
            break
        }
        'codex;app-server;help;generate-json-schema' {
            break
        }
        'codex;app-server;help;generate-internal-json-schema' {
            break
        }
        'codex;app-server;help;help' {
            break
        }
        'codex;app' {
            [CompletionResult]::new('--download-url', '--download-url', [CompletionResultType]::ParameterName, 'Override the app installer download URL (advanced)')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;completion' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;update' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;sandbox' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('macos', 'macos', [CompletionResultType]::ParameterValue, 'Run a command under Seatbelt (macOS only)')
            [CompletionResult]::new('seatbelt', 'seatbelt', [CompletionResultType]::ParameterValue, 'Run a command under Seatbelt (macOS only)')
            [CompletionResult]::new('linux', 'linux', [CompletionResultType]::ParameterValue, 'Run a command under the Linux sandbox (bubblewrap by default)')
            [CompletionResult]::new('landlock', 'landlock', [CompletionResultType]::ParameterValue, 'Run a command under the Linux sandbox (bubblewrap by default)')
            [CompletionResult]::new('windows', 'windows', [CompletionResultType]::ParameterValue, 'Run a command under Windows restricted token (Windows only)')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;sandbox;macos' {
            [CompletionResult]::new('--permissions-profile', '--permissions-profile', [CompletionResultType]::ParameterName, 'Named permissions profile to apply from the active configuration stack')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('--allow-unix-socket', '--allow-unix-socket', [CompletionResultType]::ParameterName, 'Allow the sandboxed command to bind/connect AF_UNIX sockets rooted at this path. Relative paths are resolved against the current directory. Repeat to allow multiple paths')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--include-managed-config', '--include-managed-config', [CompletionResultType]::ParameterName, 'Include managed requirements while resolving an explicit permissions profile')
            [CompletionResult]::new('--log-denials', '--log-denials', [CompletionResultType]::ParameterName, 'While the command runs, capture macOS sandbox denials via `log stream` and print them after exit')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;sandbox;seatbelt' {
            [CompletionResult]::new('--permissions-profile', '--permissions-profile', [CompletionResultType]::ParameterName, 'Named permissions profile to apply from the active configuration stack')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('--allow-unix-socket', '--allow-unix-socket', [CompletionResultType]::ParameterName, 'Allow the sandboxed command to bind/connect AF_UNIX sockets rooted at this path. Relative paths are resolved against the current directory. Repeat to allow multiple paths')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--include-managed-config', '--include-managed-config', [CompletionResultType]::ParameterName, 'Include managed requirements while resolving an explicit permissions profile')
            [CompletionResult]::new('--log-denials', '--log-denials', [CompletionResultType]::ParameterName, 'While the command runs, capture macOS sandbox denials via `log stream` and print them after exit')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;sandbox;linux' {
            [CompletionResult]::new('--permissions-profile', '--permissions-profile', [CompletionResultType]::ParameterName, 'Named permissions profile to apply from the active configuration stack')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--include-managed-config', '--include-managed-config', [CompletionResultType]::ParameterName, 'Include managed requirements while resolving an explicit permissions profile')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;sandbox;landlock' {
            [CompletionResult]::new('--permissions-profile', '--permissions-profile', [CompletionResultType]::ParameterName, 'Named permissions profile to apply from the active configuration stack')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--include-managed-config', '--include-managed-config', [CompletionResultType]::ParameterName, 'Include managed requirements while resolving an explicit permissions profile')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;sandbox;windows' {
            [CompletionResult]::new('--permissions-profile', '--permissions-profile', [CompletionResultType]::ParameterName, 'Named permissions profile to apply from the active configuration stack')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Working directory used for profile resolution and command execution')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--include-managed-config', '--include-managed-config', [CompletionResultType]::ParameterName, 'Include managed requirements while resolving an explicit permissions profile')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;sandbox;help' {
            [CompletionResult]::new('macos', 'macos', [CompletionResultType]::ParameterValue, 'Run a command under Seatbelt (macOS only)')
            [CompletionResult]::new('linux', 'linux', [CompletionResultType]::ParameterValue, 'Run a command under the Linux sandbox (bubblewrap by default)')
            [CompletionResult]::new('windows', 'windows', [CompletionResultType]::ParameterValue, 'Run a command under Windows restricted token (Windows only)')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;sandbox;help;macos' {
            break
        }
        'codex;sandbox;help;linux' {
            break
        }
        'codex;sandbox;help;windows' {
            break
        }
        'codex;sandbox;help;help' {
            break
        }
        'codex;debug' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('models', 'models', [CompletionResultType]::ParameterValue, 'Render the raw model catalog as JSON')
            [CompletionResult]::new('app-server', 'app-server', [CompletionResultType]::ParameterValue, 'Tooling: helps debug the app server')
            [CompletionResult]::new('prompt-input', 'prompt-input', [CompletionResultType]::ParameterValue, 'Render the model-visible prompt input list as JSON')
            [CompletionResult]::new('trace-reduce', 'trace-reduce', [CompletionResultType]::ParameterValue, 'Replay a rollout trace bundle and write reduced state JSON')
            [CompletionResult]::new('clear-memories', 'clear-memories', [CompletionResultType]::ParameterValue, 'Internal: reset local memory state for a fresh start')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;debug;models' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--bundled', '--bundled', [CompletionResultType]::ParameterName, 'Skip refresh and dump only the bundled catalog shipped with this binary')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;debug;app-server' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('send-message-v2', 'send-message-v2', [CompletionResultType]::ParameterValue, 'send-message-v2')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;debug;app-server;send-message-v2' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;debug;app-server;help' {
            [CompletionResult]::new('send-message-v2', 'send-message-v2', [CompletionResultType]::ParameterValue, 'send-message-v2')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;debug;app-server;help;send-message-v2' {
            break
        }
        'codex;debug;app-server;help;help' {
            break
        }
        'codex;debug;prompt-input' {
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the user prompt')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the user prompt')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;debug;trace-reduce' {
            [CompletionResult]::new('-o', '-o', [CompletionResultType]::ParameterName, 'Output path for reduced RolloutTrace JSON. Defaults to TRACE_BUNDLE/state.json')
            [CompletionResult]::new('--output', '--output', [CompletionResultType]::ParameterName, 'Output path for reduced RolloutTrace JSON. Defaults to TRACE_BUNDLE/state.json')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;debug;clear-memories' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;debug;help' {
            [CompletionResult]::new('models', 'models', [CompletionResultType]::ParameterValue, 'Render the raw model catalog as JSON')
            [CompletionResult]::new('app-server', 'app-server', [CompletionResultType]::ParameterValue, 'Tooling: helps debug the app server')
            [CompletionResult]::new('prompt-input', 'prompt-input', [CompletionResultType]::ParameterValue, 'Render the model-visible prompt input list as JSON')
            [CompletionResult]::new('trace-reduce', 'trace-reduce', [CompletionResultType]::ParameterValue, 'Replay a rollout trace bundle and write reduced state JSON')
            [CompletionResult]::new('clear-memories', 'clear-memories', [CompletionResultType]::ParameterValue, 'Internal: reset local memory state for a fresh start')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;debug;help;models' {
            break
        }
        'codex;debug;help;app-server' {
            [CompletionResult]::new('send-message-v2', 'send-message-v2', [CompletionResultType]::ParameterValue, 'send-message-v2')
            break
        }
        'codex;debug;help;app-server;send-message-v2' {
            break
        }
        'codex;debug;help;prompt-input' {
            break
        }
        'codex;debug;help;trace-reduce' {
            break
        }
        'codex;debug;help;clear-memories' {
            break
        }
        'codex;debug;help;help' {
            break
        }
        'codex;execpolicy' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('check', 'check', [CompletionResultType]::ParameterValue, 'Check execpolicy files against a command')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;execpolicy;check' {
            [CompletionResult]::new('-r', '-r', [CompletionResultType]::ParameterName, 'Paths to execpolicy rule files to evaluate (repeatable)')
            [CompletionResult]::new('--rules', '--rules', [CompletionResultType]::ParameterName, 'Paths to execpolicy rule files to evaluate (repeatable)')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--pretty', '--pretty', [CompletionResultType]::ParameterName, 'Pretty-print the JSON output')
            [CompletionResult]::new('--resolve-host-executables', '--resolve-host-executables', [CompletionResultType]::ParameterName, 'Resolve absolute program paths against basename rules, gated by any `host_executable()` definitions in the loaded policy files')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;execpolicy;help' {
            [CompletionResult]::new('check', 'check', [CompletionResultType]::ParameterValue, 'Check execpolicy files against a command')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;execpolicy;help;check' {
            break
        }
        'codex;execpolicy;help;help' {
            break
        }
        'codex;apply' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;a' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;resume' {
            [CompletionResult]::new('--remote', '--remote', [CompletionResultType]::ParameterName, 'Connect the TUI to a remote app server websocket endpoint')
            [CompletionResult]::new('--remote-auth-token-env', '--remote-auth-token-env', [CompletionResultType]::ParameterName, 'Name of the environment variable containing the bearer token to send to a remote app server websocket')
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--local-provider', '--local-provider', [CompletionResultType]::ParameterName, 'Specify which local provider to use (lmstudio or ollama). If not specified with --oss, will use config default or show selection')
            [CompletionResult]::new('-p', '-p', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('--profile', '--profile', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('-s', '-s', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('--sandbox', '--sandbox', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--add-dir', '--add-dir', [CompletionResultType]::ParameterName, 'Additional directories that should be writable alongside the primary workspace')
            [CompletionResult]::new('-a', '-a', [CompletionResultType]::ParameterName, 'Configure when the model requires human approval before executing a command')
            [CompletionResult]::new('--ask-for-approval', '--ask-for-approval', [CompletionResultType]::ParameterName, 'Configure when the model requires human approval before executing a command')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--last', '--last', [CompletionResultType]::ParameterName, 'Continue the most recent session without showing the picker')
            [CompletionResult]::new('--all', '--all', [CompletionResultType]::ParameterName, 'Show all sessions (disables cwd filtering and shows CWD column)')
            [CompletionResult]::new('--include-non-interactive', '--include-non-interactive', [CompletionResultType]::ParameterName, 'Include non-interactive sessions in the resume picker and --last selection')
            [CompletionResult]::new('--oss', '--oss', [CompletionResultType]::ParameterName, 'Use open-source provider')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--search', '--search', [CompletionResultType]::ParameterName, 'Enable live web search. When enabled, the native Responses `web_search` tool is available to the model (no perΓÇæcall approval)')
            [CompletionResult]::new('--no-alt-screen', '--no-alt-screen', [CompletionResultType]::ParameterName, 'Disable alternate screen mode')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('-V', '-V ', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('--version', '--version', [CompletionResultType]::ParameterName, 'Print version')
            break
        }
        'codex;fork' {
            [CompletionResult]::new('--remote', '--remote', [CompletionResultType]::ParameterName, 'Connect the TUI to a remote app server websocket endpoint')
            [CompletionResult]::new('--remote-auth-token-env', '--remote-auth-token-env', [CompletionResultType]::ParameterName, 'Name of the environment variable containing the bearer token to send to a remote app server websocket')
            [CompletionResult]::new('-i', '-i', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('--image', '--image', [CompletionResultType]::ParameterName, 'Optional image(s) to attach to the initial prompt')
            [CompletionResult]::new('-m', '-m', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--model', '--model', [CompletionResultType]::ParameterName, 'Model the agent should use')
            [CompletionResult]::new('--local-provider', '--local-provider', [CompletionResultType]::ParameterName, 'Specify which local provider to use (lmstudio or ollama). If not specified with --oss, will use config default or show selection')
            [CompletionResult]::new('-p', '-p', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('--profile', '--profile', [CompletionResultType]::ParameterName, 'Configuration profile from config.toml to specify default options')
            [CompletionResult]::new('-s', '-s', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('--sandbox', '--sandbox', [CompletionResultType]::ParameterName, 'Select the sandbox policy to use when executing model-generated shell commands')
            [CompletionResult]::new('-C', '-C ', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--cd', '--cd', [CompletionResultType]::ParameterName, 'Tell the agent to use the specified directory as its working root')
            [CompletionResult]::new('--add-dir', '--add-dir', [CompletionResultType]::ParameterName, 'Additional directories that should be writable alongside the primary workspace')
            [CompletionResult]::new('-a', '-a', [CompletionResultType]::ParameterName, 'Configure when the model requires human approval before executing a command')
            [CompletionResult]::new('--ask-for-approval', '--ask-for-approval', [CompletionResultType]::ParameterName, 'Configure when the model requires human approval before executing a command')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--last', '--last', [CompletionResultType]::ParameterName, 'Fork the most recent session without showing the picker')
            [CompletionResult]::new('--all', '--all', [CompletionResultType]::ParameterName, 'Show all sessions (disables cwd filtering and shows CWD column)')
            [CompletionResult]::new('--oss', '--oss', [CompletionResultType]::ParameterName, 'Use open-source provider')
            [CompletionResult]::new('--dangerously-bypass-approvals-and-sandbox', '--dangerously-bypass-approvals-and-sandbox', [CompletionResultType]::ParameterName, 'Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY DANGEROUS. Intended solely for running in environments that are externally sandboxed')
            [CompletionResult]::new('--search', '--search', [CompletionResultType]::ParameterName, 'Enable live web search. When enabled, the native Responses `web_search` tool is available to the model (no perΓÇæcall approval)')
            [CompletionResult]::new('--no-alt-screen', '--no-alt-screen', [CompletionResultType]::ParameterName, 'Disable alternate screen mode')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('-V', '-V ', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('--version', '--version', [CompletionResultType]::ParameterName, 'Print version')
            break
        }
        'codex;cloud' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('-V', '-V ', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('--version', '--version', [CompletionResultType]::ParameterName, 'Print version')
            [CompletionResult]::new('exec', 'exec', [CompletionResultType]::ParameterValue, 'Submit a new Codex Cloud task without launching the TUI')
            [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show the status of a Codex Cloud task')
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List Codex Cloud tasks')
            [CompletionResult]::new('apply', 'apply', [CompletionResultType]::ParameterValue, 'Apply the diff for a Codex Cloud task locally')
            [CompletionResult]::new('diff', 'diff', [CompletionResultType]::ParameterValue, 'Show the unified diff for a Codex Cloud task')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;cloud;exec' {
            [CompletionResult]::new('--env', '--env', [CompletionResultType]::ParameterName, 'Target environment identifier (see `codex cloud` to browse)')
            [CompletionResult]::new('--attempts', '--attempts', [CompletionResultType]::ParameterName, 'Number of assistant attempts (best-of-N)')
            [CompletionResult]::new('--branch', '--branch', [CompletionResultType]::ParameterName, 'Git branch to run in Codex Cloud (defaults to current branch)')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;cloud;status' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;cloud;list' {
            [CompletionResult]::new('--env', '--env', [CompletionResultType]::ParameterName, 'Filter tasks by environment identifier')
            [CompletionResult]::new('--limit', '--limit', [CompletionResultType]::ParameterName, 'Maximum number of tasks to return (1-20)')
            [CompletionResult]::new('--cursor', '--cursor', [CompletionResultType]::ParameterName, 'Pagination cursor returned by a previous call')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--json', '--json', [CompletionResultType]::ParameterName, 'Emit JSON instead of plain text')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;cloud;apply' {
            [CompletionResult]::new('--attempt', '--attempt', [CompletionResultType]::ParameterName, 'Attempt number to apply (1-based)')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;cloud;diff' {
            [CompletionResult]::new('--attempt', '--attempt', [CompletionResultType]::ParameterName, 'Attempt number to display (1-based)')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;cloud;help' {
            [CompletionResult]::new('exec', 'exec', [CompletionResultType]::ParameterValue, 'Submit a new Codex Cloud task without launching the TUI')
            [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show the status of a Codex Cloud task')
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List Codex Cloud tasks')
            [CompletionResult]::new('apply', 'apply', [CompletionResultType]::ParameterValue, 'Apply the diff for a Codex Cloud task locally')
            [CompletionResult]::new('diff', 'diff', [CompletionResultType]::ParameterValue, 'Show the unified diff for a Codex Cloud task')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;cloud;help;exec' {
            break
        }
        'codex;cloud;help;status' {
            break
        }
        'codex;cloud;help;list' {
            break
        }
        'codex;cloud;help;apply' {
            break
        }
        'codex;cloud;help;diff' {
            break
        }
        'codex;cloud;help;help' {
            break
        }
        'codex;responses-api-proxy' {
            [CompletionResult]::new('--port', '--port', [CompletionResultType]::ParameterName, 'Port to listen on. If not set, an ephemeral port is used')
            [CompletionResult]::new('--server-info', '--server-info', [CompletionResultType]::ParameterName, 'Path to a JSON file to write startup info (single line). Includes {"port": <u16>}')
            [CompletionResult]::new('--upstream-url', '--upstream-url', [CompletionResultType]::ParameterName, 'Absolute URL the proxy should forward requests to (defaults to OpenAI)')
            [CompletionResult]::new('--dump-dir', '--dump-dir', [CompletionResultType]::ParameterName, 'Directory where request/response dumps should be written as JSON')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('--http-shutdown', '--http-shutdown', [CompletionResultType]::ParameterName, 'Enable HTTP shutdown endpoint at GET /shutdown')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;stdio-to-uds' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;exec-server' {
            [CompletionResult]::new('--listen', '--listen', [CompletionResultType]::ParameterName, 'Transport endpoint URL. Supported values: `ws://IP:PORT` (default)')
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;features' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List known features with their stage and effective state')
            [CompletionResult]::new('enable', 'enable', [CompletionResultType]::ParameterValue, 'Enable a feature in config.toml')
            [CompletionResult]::new('disable', 'disable', [CompletionResultType]::ParameterValue, 'Disable a feature in config.toml')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;features;list' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;features;enable' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;features;disable' {
            [CompletionResult]::new('-c', '-c', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--config', '--config', [CompletionResultType]::ParameterName, 'Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`. Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed as TOML. If it fails to parse as TOML, the raw string is used as a literal')
            [CompletionResult]::new('--enable', '--enable', [CompletionResultType]::ParameterName, 'Enable a feature (repeatable). Equivalent to `-c features.<name>=true`')
            [CompletionResult]::new('--disable', '--disable', [CompletionResultType]::ParameterName, 'Disable a feature (repeatable). Equivalent to `-c features.<name>=false`')
            [CompletionResult]::new('-h', '-h', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            [CompletionResult]::new('--help', '--help', [CompletionResultType]::ParameterName, 'Print help (see more with ''--help'')')
            break
        }
        'codex;features;help' {
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List known features with their stage and effective state')
            [CompletionResult]::new('enable', 'enable', [CompletionResultType]::ParameterValue, 'Enable a feature in config.toml')
            [CompletionResult]::new('disable', 'disable', [CompletionResultType]::ParameterValue, 'Disable a feature in config.toml')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;features;help;list' {
            break
        }
        'codex;features;help;enable' {
            break
        }
        'codex;features;help;disable' {
            break
        }
        'codex;features;help;help' {
            break
        }
        'codex;help' {
            [CompletionResult]::new('exec', 'exec', [CompletionResultType]::ParameterValue, 'Run Codex non-interactively')
            [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Run a code review non-interactively')
            [CompletionResult]::new('login', 'login', [CompletionResultType]::ParameterValue, 'Manage login')
            [CompletionResult]::new('logout', 'logout', [CompletionResultType]::ParameterValue, 'Remove stored authentication credentials')
            [CompletionResult]::new('mcp', 'mcp', [CompletionResultType]::ParameterValue, 'Manage external MCP servers for Codex')
            [CompletionResult]::new('plugin', 'plugin', [CompletionResultType]::ParameterValue, 'Manage Codex plugins')
            [CompletionResult]::new('mcp-server', 'mcp-server', [CompletionResultType]::ParameterValue, 'Start Codex as an MCP server (stdio)')
            [CompletionResult]::new('app-server', 'app-server', [CompletionResultType]::ParameterValue, '[experimental] Run the app server or related tooling')
            [CompletionResult]::new('app', 'app', [CompletionResultType]::ParameterValue, 'Launch the Codex desktop app (opens the app installer if missing)')
            [CompletionResult]::new('completion', 'completion', [CompletionResultType]::ParameterValue, 'Generate shell completion scripts')
            [CompletionResult]::new('update', 'update', [CompletionResultType]::ParameterValue, 'Update Codex to the latest version')
            [CompletionResult]::new('sandbox', 'sandbox', [CompletionResultType]::ParameterValue, 'Run commands within a Codex-provided sandbox')
            [CompletionResult]::new('debug', 'debug', [CompletionResultType]::ParameterValue, 'Debugging tools')
            [CompletionResult]::new('execpolicy', 'execpolicy', [CompletionResultType]::ParameterValue, 'Execpolicy tooling')
            [CompletionResult]::new('apply', 'apply', [CompletionResultType]::ParameterValue, 'Apply the latest diff produced by Codex agent as a `git apply` to your local working tree')
            [CompletionResult]::new('resume', 'resume', [CompletionResultType]::ParameterValue, 'Resume a previous interactive session (picker by default; use --last to continue the most recent)')
            [CompletionResult]::new('fork', 'fork', [CompletionResultType]::ParameterValue, 'Fork a previous interactive session (picker by default; use --last to fork the most recent)')
            [CompletionResult]::new('cloud', 'cloud', [CompletionResultType]::ParameterValue, '[EXPERIMENTAL] Browse tasks from Codex Cloud and apply changes locally')
            [CompletionResult]::new('responses-api-proxy', 'responses-api-proxy', [CompletionResultType]::ParameterValue, 'Internal: run the responses API proxy')
            [CompletionResult]::new('stdio-to-uds', 'stdio-to-uds', [CompletionResultType]::ParameterValue, 'Internal: relay stdio to a Unix domain socket')
            [CompletionResult]::new('exec-server', 'exec-server', [CompletionResultType]::ParameterValue, '[EXPERIMENTAL] Run the standalone exec-server service')
            [CompletionResult]::new('features', 'features', [CompletionResultType]::ParameterValue, 'Inspect feature flags')
            [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Print this message or the help of the given subcommand(s)')
            break
        }
        'codex;help;exec' {
            [CompletionResult]::new('resume', 'resume', [CompletionResultType]::ParameterValue, 'Resume a previous session by id or pick the most recent with --last')
            [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Run a code review against the current repository')
            break
        }
        'codex;help;exec;resume' {
            break
        }
        'codex;help;exec;review' {
            break
        }
        'codex;help;review' {
            break
        }
        'codex;help;login' {
            [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show login status')
            break
        }
        'codex;help;login;status' {
            break
        }
        'codex;help;logout' {
            break
        }
        'codex;help;mcp' {
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'list')
            [CompletionResult]::new('get', 'get', [CompletionResultType]::ParameterValue, 'get')
            [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'add')
            [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'remove')
            [CompletionResult]::new('login', 'login', [CompletionResultType]::ParameterValue, 'login')
            [CompletionResult]::new('logout', 'logout', [CompletionResultType]::ParameterValue, 'logout')
            break
        }
        'codex;help;mcp;list' {
            break
        }
        'codex;help;mcp;get' {
            break
        }
        'codex;help;mcp;add' {
            break
        }
        'codex;help;mcp;remove' {
            break
        }
        'codex;help;mcp;login' {
            break
        }
        'codex;help;mcp;logout' {
            break
        }
        'codex;help;plugin' {
            [CompletionResult]::new('marketplace', 'marketplace', [CompletionResultType]::ParameterValue, 'Manage plugin marketplaces for Codex')
            break
        }
        'codex;help;plugin;marketplace' {
            [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'add')
            [CompletionResult]::new('upgrade', 'upgrade', [CompletionResultType]::ParameterValue, 'upgrade')
            [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'remove')
            break
        }
        'codex;help;plugin;marketplace;add' {
            break
        }
        'codex;help;plugin;marketplace;upgrade' {
            break
        }
        'codex;help;plugin;marketplace;remove' {
            break
        }
        'codex;help;mcp-server' {
            break
        }
        'codex;help;app-server' {
            [CompletionResult]::new('proxy', 'proxy', [CompletionResultType]::ParameterValue, 'Proxy stdio bytes to the running app-server control socket')
            [CompletionResult]::new('generate-ts', 'generate-ts', [CompletionResultType]::ParameterValue, '[experimental] Generate TypeScript bindings for the app server protocol')
            [CompletionResult]::new('generate-json-schema', 'generate-json-schema', [CompletionResultType]::ParameterValue, '[experimental] Generate JSON Schema for the app server protocol')
            [CompletionResult]::new('generate-internal-json-schema', 'generate-internal-json-schema', [CompletionResultType]::ParameterValue, '[internal] Generate internal JSON Schema artifacts for Codex tooling')
            break
        }
        'codex;help;app-server;proxy' {
            break
        }
        'codex;help;app-server;generate-ts' {
            break
        }
        'codex;help;app-server;generate-json-schema' {
            break
        }
        'codex;help;app-server;generate-internal-json-schema' {
            break
        }
        'codex;help;app' {
            break
        }
        'codex;help;completion' {
            break
        }
        'codex;help;update' {
            break
        }
        'codex;help;sandbox' {
            [CompletionResult]::new('macos', 'macos', [CompletionResultType]::ParameterValue, 'Run a command under Seatbelt (macOS only)')
            [CompletionResult]::new('linux', 'linux', [CompletionResultType]::ParameterValue, 'Run a command under the Linux sandbox (bubblewrap by default)')
            [CompletionResult]::new('windows', 'windows', [CompletionResultType]::ParameterValue, 'Run a command under Windows restricted token (Windows only)')
            break
        }
        'codex;help;sandbox;macos' {
            break
        }
        'codex;help;sandbox;linux' {
            break
        }
        'codex;help;sandbox;windows' {
            break
        }
        'codex;help;debug' {
            [CompletionResult]::new('models', 'models', [CompletionResultType]::ParameterValue, 'Render the raw model catalog as JSON')
            [CompletionResult]::new('app-server', 'app-server', [CompletionResultType]::ParameterValue, 'Tooling: helps debug the app server')
            [CompletionResult]::new('prompt-input', 'prompt-input', [CompletionResultType]::ParameterValue, 'Render the model-visible prompt input list as JSON')
            [CompletionResult]::new('trace-reduce', 'trace-reduce', [CompletionResultType]::ParameterValue, 'Replay a rollout trace bundle and write reduced state JSON')
            [CompletionResult]::new('clear-memories', 'clear-memories', [CompletionResultType]::ParameterValue, 'Internal: reset local memory state for a fresh start')
            break
        }
        'codex;help;debug;models' {
            break
        }
        'codex;help;debug;app-server' {
            [CompletionResult]::new('send-message-v2', 'send-message-v2', [CompletionResultType]::ParameterValue, 'send-message-v2')
            break
        }
        'codex;help;debug;app-server;send-message-v2' {
            break
        }
        'codex;help;debug;prompt-input' {
            break
        }
        'codex;help;debug;trace-reduce' {
            break
        }
        'codex;help;debug;clear-memories' {
            break
        }
        'codex;help;execpolicy' {
            [CompletionResult]::new('check', 'check', [CompletionResultType]::ParameterValue, 'Check execpolicy files against a command')
            break
        }
        'codex;help;execpolicy;check' {
            break
        }
        'codex;help;apply' {
            break
        }
        'codex;help;resume' {
            break
        }
        'codex;help;fork' {
            break
        }
        'codex;help;cloud' {
            [CompletionResult]::new('exec', 'exec', [CompletionResultType]::ParameterValue, 'Submit a new Codex Cloud task without launching the TUI')
            [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show the status of a Codex Cloud task')
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List Codex Cloud tasks')
            [CompletionResult]::new('apply', 'apply', [CompletionResultType]::ParameterValue, 'Apply the diff for a Codex Cloud task locally')
            [CompletionResult]::new('diff', 'diff', [CompletionResultType]::ParameterValue, 'Show the unified diff for a Codex Cloud task')
            break
        }
        'codex;help;cloud;exec' {
            break
        }
        'codex;help;cloud;status' {
            break
        }
        'codex;help;cloud;list' {
            break
        }
        'codex;help;cloud;apply' {
            break
        }
        'codex;help;cloud;diff' {
            break
        }
        'codex;help;responses-api-proxy' {
            break
        }
        'codex;help;stdio-to-uds' {
            break
        }
        'codex;help;exec-server' {
            break
        }
        'codex;help;features' {
            [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List known features with their stage and effective state')
            [CompletionResult]::new('enable', 'enable', [CompletionResultType]::ParameterValue, 'Enable a feature in config.toml')
            [CompletionResult]::new('disable', 'disable', [CompletionResultType]::ParameterValue, 'Disable a feature in config.toml')
            break
        }
        'codex;help;features;list' {
            break
        }
        'codex;help;features;enable' {
            break
        }
        'codex;help;features;disable' {
            break
        }
        'codex;help;help' {
            break
        }
    })

    $completions.Where{ $_.CompletionText -like "$wordToComplete*" } |
        Sort-Object -Property ListItemText
}

# c-notify

Sends a Windows native toast notification from any skill or workflow. Zero dependencies — uses built-in Windows Runtime APIs via PowerShell.

## Usage

Called programmatically by other skills (not user-invoked). Any skill can trigger a toast by following the pattern below.

---

## The Command

When you need to notify Chad, execute this two-step Bash pattern. Step 1 writes a temp .ps1 file (avoids bash eating PowerShell's $ signs). Step 2 runs it.

### Bash call:

```bash
cat > /tmp/claude-toast.ps1 << 'PSEOF'
[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] > $null
[Windows.Data.Xml.Dom.XmlDocument, Windows.Data.Xml.Dom, ContentType = WindowsRuntime] > $null

$iconPath = "$env:USERPROFILE\.claude\skills\c-notify\icon.png"

$xml = @"
<toast>
  <visual>
    <binding template="ToastGeneric">
      <text>{TITLE}</text>
      <text>{BODY}</text>
      <image placement="appLogoOverride" hint-crop="circle" src="file:///$($iconPath.Replace('\','/'))"/>
    </binding>
  </visual>
</toast>
"@

$s = New-Object Windows.Data.Xml.Dom.XmlDocument
$s.LoadXml($xml)
$n = [Windows.UI.Notifications.ToastNotification]::new($s)
$n.Tag = "ClaudeCode"
$n.Group = "ClaudeCode"
$n.ExpirationTime = [DateTimeOffset]::Now.AddMinutes(5)
[Windows.UI.Notifications.ToastNotificationManager]::CreateToastNotifier("Claude Code").Show($n)
PSEOF
powershell -ExecutionPolicy Bypass -File /tmp/claude-toast.ps1
```

Replace `{TITLE}` and `{BODY}` with your values before writing the .ps1 file. Never use em dashes in the values - use regular hyphens only.

The icon lives at `C:\Users\chad\.claude\skills\c-notify\icon.png` (64x64, Ahead hub color wheel with Claude orange center). The toast uses ToastGeneric with `appLogoOverride` placement and `hint-crop="circle"` for a round icon badge.

---

## When To Fire

**Trigger condition:** A background sub-agent returns a completed result.

**Determine these values before calling:**
- `{COMPLETED}` — how many jobs are now done
- `{TOTAL}` — how many total jobs were queued
- `{JOB_NAME}` — short name of the job that just finished

**Compose the notification:**
- TITLE: `Claude Code - Job {COMPLETED}/{TOTAL}`
- BODY: `{JOB_NAME} done - go check the update`

**Example:**
- TITLE: `Claude Code - Job 2/4`
- BODY: `Pricing Matrix done - go check the update`

---

## Integration Pattern

Any skill that runs background agents should fire this notification IMMEDIATELY after receiving a task-notification for a completed agent — before rendering the grid update or any other output.

**Sequence when an agent completes:**
1. Receive task-notification
2. Fire toast via Bash (run_in_background: true so it doesn't block your response)
3. Update the grid / respond to user

The toast runs in background so Chad sees the Windows notification pop up at the same moment the grid updates in terminal.

---

## Known Gotchas

- Bash eats `$` signs in inline PowerShell - always use the .ps1 file approach, never pass PowerShell inline
- Em dashes break PowerShell encoding when passed through bash/file encoding - use regular hyphens (`-`) only
- Always use `run_in_background: true` on the Bash call so the toast never blocks the response

---

## Rules

- Always use `run_in_background: true` on the Bash call — toast must never block response
- Tag is always 'ClaudeCode', Group is always 'ClaudeCode' — this lets Windows stack/replace notifications cleanly
- Expiration is 5 minutes — enough to see it, not enough to pile up
- Notifier name is 'Claude Code' — this shows as the app name in the Windows notification
- If PowerShell errors (rare), silently continue — the toast is nice-to-have, never a blocker
- Never send more than 1 toast per agent completion — no duplicates

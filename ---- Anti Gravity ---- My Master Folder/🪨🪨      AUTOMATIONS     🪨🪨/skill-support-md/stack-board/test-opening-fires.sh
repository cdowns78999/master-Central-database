#!/usr/bin/env bash
# test-opening-fires.sh
# Verification harness for the /stack-board opening sequence
# (banner + how-it-works + options panels + STEP 1 regression check)
#
# Usage:
#   bash test-opening-fires.sh            # run all 5 checks
#   bash test-opening-fires.sh --dry-run  # list what WOULD be checked
#
# Exit codes: 0 = 5/5 passed, 1 = anything less

set -u

SKILL_FILE="/c/Users/chad/.claude/skills/stack-board/skill.md"
PASS_MARK="✓"
FAIL_MARK="✗"

print_header() {
    echo "=== /stack-board opening verification ==="
    echo "Target: $SKILL_FILE"
    echo
}

# ---------- DRY RUN ----------
if [ "${1:-}" = "--dry-run" ]; then
    print_header
    echo "[DRY RUN] would check:"
    echo "  1. Section header matching 'STEP 0.5' OR 'Opening ceremony' OR 'STACK BOARD READY'"
    echo "  2. ASCII banner present (╔ AND ╗ in proximity, OR ██ block chars)"
    echo "  3. 'how it works' boxed panel (case-insensitive inside ╭─ ─╮ block)"
    echo "  4. 'options' boxed panel (case-insensitive inside ╭─ ─╮ block)"
    echo "     AND mentions NEW + EXISTING + VISUALIZE + BOARD + BUILD"
    echo "  5. Existing STEP 1 NEW/EXISTING question still present (regression check)"
    echo
    echo "[DRY RUN] no checks were run."
    exit 0
fi

print_header

# ---------- guard: file exists ----------
if [ ! -f "$SKILL_FILE" ]; then
    echo "$FAIL_MARK skill.md not found at $SKILL_FILE"
    echo "0/5 checks passed"
    exit 1
fi

PASS=0

# ---------- CHECK 1: opening section header ----------
if grep -qiE "STEP 0\.5|Opening ceremony|STACK BOARD READY" "$SKILL_FILE"; then
    echo "$PASS_MARK [1/5] opening section header found (STEP 0.5 / Opening ceremony / STACK BOARD READY)"
    PASS=$((PASS + 1))
else
    echo "$FAIL_MARK [1/5] no opening section header found — expected one of: STEP 0.5, Opening ceremony, STACK BOARD READY"
fi

# ---------- CHECK 2: ASCII banner ----------
# Either box-drawing corners (╔ AND ╗) within ~30 lines of each other,
# OR ██ block chars (Unicode FULL BLOCK).
BANNER_OK=0
if grep -q "╔" "$SKILL_FILE" && grep -q "╗" "$SKILL_FILE"; then
    # both corners exist — check proximity (within 30 lines)
    LINE_OPEN=$(grep -n "╔" "$SKILL_FILE" | head -1 | cut -d: -f1)
    LINE_CLOSE=$(grep -n "╗" "$SKILL_FILE" | head -1 | cut -d: -f1)
    if [ -n "$LINE_OPEN" ] && [ -n "$LINE_CLOSE" ]; then
        DIFF=$((LINE_CLOSE - LINE_OPEN))
        [ $DIFF -lt 0 ] && DIFF=$((-DIFF))
        if [ $DIFF -le 30 ]; then
            BANNER_OK=1
        fi
    fi
fi
if [ $BANNER_OK -eq 0 ] && grep -q "██" "$SKILL_FILE"; then
    BANNER_OK=1
fi
if [ $BANNER_OK -eq 1 ]; then
    echo "$PASS_MARK [2/5] ASCII banner detected (box-drawing corners or ██ block chars)"
    PASS=$((PASS + 1))
else
    echo "$FAIL_MARK [2/5] no ASCII banner found — expected ╔...╗ block or ██ chars"
fi

# ---------- CHECK 3: 'how it works' boxed panel ----------
# Look for ╭─ ... how it works ... ─╮ within a 25-line window.
# Use awk to scan: capture lines between ╭ and ╮ openers/closers, check if
# 'how it works' (case-insensitive) appears inside.
HOW_IT_WORKS_OK=$(awk '
    BEGIN { inblock=0; found=0 }
    /╭/ { inblock=1; buf=""; next }
    /╮/ { if (inblock && tolower(buf) ~ /how it works/) found=1; inblock=0; buf=""; next }
    { if (inblock) buf = buf " " $0 }
    END { print found }
' "$SKILL_FILE")
if [ "$HOW_IT_WORKS_OK" = "1" ]; then
    echo "$PASS_MARK [3/5] 'how it works' boxed panel found inside ╭─ ─╮ block"
    PASS=$((PASS + 1))
else
    echo "$FAIL_MARK [3/5] no 'how it works' panel inside a ╭─ ─╮ block"
fi

# ---------- CHECK 4: 'options' boxed panel + required keywords ----------
OPTIONS_BUF=$(awk '
    BEGIN { inblock=0; capture=0; out="" }
    /╭/ { inblock=1; buf=""; next }
    /╮/ {
        if (inblock && tolower(buf) ~ /options/) { out = out " " buf }
        inblock=0; buf=""; next
    }
    { if (inblock) buf = buf " " $0 }
    END { print out }
' "$SKILL_FILE")

if [ -n "$OPTIONS_BUF" ]; then
    MISSING=""
    for kw in NEW EXISTING VISUALIZE BOARD BUILD; do
        if ! echo "$OPTIONS_BUF" | grep -q "$kw"; then
            MISSING="$MISSING $kw"
        fi
    done
    if [ -z "$MISSING" ]; then
        echo "$PASS_MARK [4/5] 'options' panel found with all keywords (NEW EXISTING VISUALIZE BOARD BUILD)"
        PASS=$((PASS + 1))
    else
        echo "$FAIL_MARK [4/5] 'options' panel found BUT missing keywords:$MISSING"
    fi
else
    echo "$FAIL_MARK [4/5] no 'options' panel inside a ╭─ ─╮ block"
fi

# ---------- CHECK 5: regression — existing STEP 1 NEW/EXISTING question ----------
# The opening must ADD, not REPLACE. STEP 1 with NEW + EXISTING question must remain.
if grep -qE "STEP 1" "$SKILL_FILE" && grep -qiE "(new.*existing|existing.*new)" "$SKILL_FILE"; then
    echo "$PASS_MARK [5/5] STEP 1 NEW/EXISTING question still present (regression check ok)"
    PASS=$((PASS + 1))
else
    echo "$FAIL_MARK [5/5] STEP 1 NEW/EXISTING question MISSING — opening may have replaced it"
fi

echo
echo "$PASS/5 checks passed"
echo

if [ $PASS -eq 5 ]; then
    exit 0
else
    exit 1
fi

# Strict Scope Rule

**When applying the atomic step breakdown to a file or section:**
- **You must not modify, move, or delete any content outside the specifically requested step(s) or line range.**
- **All content before and after the specified steps must remain 100% unchanged.**
- If you are unsure whether a line is part of the requested step(s), err on the side of leaving it unchanged.
- If a step boundary is ambiguous, ask for clarification before making changes.

**Example Usage:**
> If asked to apply the breakdown to steps 49–54, only those steps may be split, reworded, or reformatted. Steps 48 and 55, and all other content, must remain exactly as they were.

**Purpose:**  
This rule ensures that atomic breakdown edits are always strictly scoped, preventing accidental loss or alteration of unrelated content.

# Atomic Step Breakdown for Section 2.1 (Chapter 2)

This document explains the process and reasoning used to convert the first two steps of section 2.1 in the OSRS Ironman Efficient Guide into atomic, actionable steps for the HTML guide.

---

## Principles Used

- **Split compound steps:** Each step containing multiple actions was divided into single-action steps.
- **Preserve order and context:** Steps were kept in the correct sequence, and dependencies or notes were included as sub-bullets or info notes.
- **Keep per-step resources:** Each atomic group of steps includes its own GP stack, items needed, skills/quests, and total time, as in the original markdown.
- **Maintain clarity:** Each step is a single, clear action (e.g., "Teleport to Yanille", "Buy 24 staves", "Alch staves").
- **Break down comma-separated actions:** When a step contains multiple actions separated by commas, split them into individual checkboxes. For example, "Run to Draynor, recruit Ned for Dragon Slayer I, buy 100 chronicle teleport cards, and continue Dragon Slayer I to get to Crandor" becomes four separate steps.
- **Separate distinct activities:** Even when actions are related, if they represent different activities or locations, split them. For example, "Teleport to Falador, deposit everything in the bank, and complete Black Knights' Fortress" becomes separate steps for teleporting, banking, and quest completion.
- **Fix inconsistent step labeling:** Ensure all steps follow the same format (e.g., "<!-- Step X (Atomic Breakdown) -->" not "<!-- Step X (continued, Atomic Breakdown) -->").
- **Use h3 headings for step titles:** Each main step should have its step number and title displayed as an `<h3>` heading outside the step container, with individual actions as checkboxes below. For example, "Step 1: Battlestaves in Yanille" becomes `<h3>Step 1: Battlestaves in Yanille</h3>` followed by individual action checkboxes.

---

## Example: Step 1 (Battlestaves in Yanille)

**Original Step:**
> Bring orbs with you to the Wizards’ Guild in Yanille, buy, make, and alch the staves in the shop while hopping and buying nature runes (50 per world until you have 500). Boost with a Wizard’s mind bomb to get in. Use your mushroom pies for this as needed for the first levels. Buy another inv of staves and make and alch them in the bank. Repeat the whole process a second time. This brings the cash stack up to ~162k (bring ~24 orbs, buy+alch everything slowly, then buy out another 26 staves and attach+alch in bank, repeat). After this buy staves with your entire cash stack, banking them.

**Atomic Steps:**
1. Teleport or travel to Yanille with your orbs and cash stack.
2. If needed, use a Wizard’s mind bomb to boost Magic and enter the Wizards’ Guild.
3. Buy 24 battlestaves from the Wizards’ Guild shop.
4. Buy up to 50 nature runes per world until you have 500.
5. Attach orbs to the battlestaves.
6. Alch the battlestaves in the shop.
7. Use mushroom pies as needed for Magic boosts.
8. Buy another inventory of staves and make/alch them in the bank.
9. Repeat the above process a second time (buy, attach, alch, bank).
10. After reaching ~162k cash, buy out another 26 staves, attach orbs, and alch in the bank.
11. Continue buying staves with your entire cash stack, banking them as needed.

**Resources for this group:**
- GP stack after: 162k gp
- Items needed: cash stack, 100 earth orbs, Wizard’s mind bomb, mushroom pies, nature runes
- Skills/quests met: Yes
- Total time: 9d10h

---

## Example: Step 2 (Piscarilius Artefacts & POH/Construction)

**Original Step:**
> Run artefacts in Piscarillius while attaching the staves to the orbs and alching them while running, using your Kharedst’s memoirs for transportation and dueling rings to Ferox Enclave to bank and/or restore run energy as needed. Repeat this process of buying staves in Yanille, attaching and alching orbs while running artefacts until all 1590 have been processed. Also buy 500 law runes and 500 soul runes (50 per world) in Yanille in between buying battlestaves. Grab coins, a rope, antipoison, barcrawl card, 15 oak logs, digsite teleport and run to the sawmill, make them into planks and buy 1 iron and 300 steel nails (if you have spares from Tempoross you can skip those items) as well as five bolts of cloth. Head to the Jolly Boar Inn, complete the barcrawl and speak with the third brother for Family Crest. Games’ necklace teleport to the barbarian outpost, show the barcrawl card to the Barbarian Guard to complete the barcrawl. Toggle vial smashing. Teleport to your POH and buy two bedrooms, then build a bed in each (Oak or Wooden is fine). Next buy a dining room and build a rope bell-pull. Teleport to Ardougne, pay the estate agent to swap your POH location to Rimmington, then hire the highest tier servant possible at the Servant’s Guild - Cook for levels 39 and below, Butler for levels 40 and up (you shouldn’t be level 50+ construction yet but if you are: good for you, and hire the Demon Butler).
> - You will need a grown cat at a future point, so if you do not have one make sure to grow one during this step and the following ones.

**Atomic Steps:**
1. Travel to Piscarilius.
2. Run artefacts in Piscarilius.
3. While running, attach orbs to battlestaves and alch them.
4. Use Kharedst’s memoirs for transportation as needed.
5. Use dueling rings to Ferox Enclave to bank/restore run energy as needed.
6. Repeat the Yanille battlestaff process (buy, attach, alch, bank) until all 1590 are processed.
7. In Yanille, buy 500 law runes and 500 soul runes (50 per world) in between buying battlestaves.
8. Gather coins, rope, antipoison, barcrawl card, 15 oak logs, digsite pendant, and games necklace.
9. Teleport to the sawmill, make 15 oak logs into planks.
10. Buy 1 iron and 300 steel nails (skip if you have spares from Tempoross).
11. Buy five bolts of cloth.
12. Go to the Jolly Boar Inn and complete the barcrawl.
13. Speak with the third brother for Family Crest.
14. Use games necklace to teleport to Barbarian Outpost.
15. Show the barcrawl card to the Barbarian Guard to complete the barcrawl.
16. Toggle vial smashing.
17. Teleport to your POH.
18. Buy two bedrooms, then build a bed in each (Oak or Wooden).
19. Buy a dining room and build a rope bell-pull.
20. Teleport to Ardougne.
21. Pay the estate agent to move your POH to Rimmington.
22. Hire the highest tier servant possible at the Servant’s Guild (Cook for 39-, Butler for 40+, Demon Butler for 50+).
23. If you do not have a grown cat, start growing one now.

**Resources for this group:**
- GP stack after: 3m gp
- Items needed: Kharedst’s memoirs, 300k gp, rings of dueling, earth orbs, battlestaves, rope, antipoison, barcrawl card, 15 oak logs, digsite pendant, games necklace, law runes, soul runes, iron, steel nails, bolts of cloth
- Skills/quests met: Yes
- Total time: 9d17h

---

## Handling Notes and Important Details

In addition to actionable steps, some instructions include important notes, tips, or contextual information that are not themselves steps. In the HTML guide (see chapter1.html), these are placed in a dedicated section—often styled as an 'info-note' or 'important detail'—to distinguish them from checkable actions.

**How to handle notes:**
- Identify any text in the original step that provides context, warnings, tips, or optional advice rather than a direct action.
- Place these in a visually distinct block (e.g., a <div class="info-note">...</div> in HTML) after the relevant steps or at the end of the group.
- Do not convert these into checkboxes; they are for reference only.

**Example:**

Original step:
> Buy 24 battlestaves from the Wizards’ Guild shop. (Note: If the shop is out of stock, world hop to find more. You can use mushroom pies for a Magic boost if needed.)

Atomic breakdown:
1. Buy 24 battlestaves from the Wizards’ Guild shop.

<div class="info-note">If the shop is out of stock, world hop to find more. You can use mushroom pies for a Magic boost if needed.</div>

**Purpose:**
- Keeps actionable steps clear and concise.
- Ensures important context or tips are not lost, but are easy to find and reference.

This process should be used for all sections: break out non-step notes into their own info-note blocks, just as in chapter1.html.

---

This process can be repeated for all steps in the guide to improve clarity and efficiency for the user. 
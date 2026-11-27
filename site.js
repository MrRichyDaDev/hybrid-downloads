"use strict";

const motion = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
for (const card of document.querySelectorAll("[data-tilt]")) {
  let bounds;
  card.addEventListener("pointerenter", () => { bounds = card.getBoundingClientRect(); });
  card.addEventListener("pointermove", (event) => {
    if (!motion.matches || !bounds || event.pointerType !== "mouse") return;
    const position = (value, start, length) => Math.max(-0.5, Math.min(0.5, (value - start) / length - 0.5));
    card.style.setProperty("--tilt-x", `${-12 * position(event.clientY, bounds.top, bounds.height)}deg`);
    card.style.setProperty("--tilt-y", `${12 * position(event.clientX, bounds.left, bounds.width)}deg`);
  });
  card.addEventListener("pointerleave", () => {
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
  });
}

const copy = document.querySelector("#copy-discord");
if (navigator.clipboard?.writeText) {
  const username = document.querySelector("#discord-name");
  const status = document.querySelector("#copy-status");
  copy.hidden = false;
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(username.textContent.trim());
      status.textContent = "Username copied.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(username);
      const selected = window.getSelection();
      selected.removeAllRanges();
      selected.addRange(range);
      status.textContent = "Username selected. Press Ctrl+C or Cmd+C to copy it.";
    }
  });
}

"use client";

import { useEffect } from "react";

/**
 * SiteProtection — lightweight, non-hostile copy/screenshot discouragement.
 *
 * What it does:
 *  - Disables the right-click context menu on public content (form fields exempt)
 *  - Blocks image dragging
 *  - Blocks copy/cut on body text (form fields remain fully usable)
 *  - Blocks common save/print/view-source shortcuts (Ctrl+S, Ctrl+P, Ctrl+U)
 *  - Renders a subtle, non-blocking ownership watermark
 *
 * What it deliberately does NOT break:
 *  - buttons, links, navigation, the contact form, WhatsApp link, CV download,
 *    admin functionality, or mobile usability.
 *
 * Note: true screenshot prevention is not possible on the web. This component
 * only discourages casual copying/screenshotting, as intended.
 */
export function SiteProtection() {
  useEffect(() => {
    const isFormField = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable
      );
    };

    const onContextMenu = (e: MouseEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const onDragStart = (e: DragEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.tagName === "IMG") {
        e.preventDefault();
      }
    };

    const onCopyCut = (e: ClipboardEvent) => {
      if (isFormField(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      // Block save (Ctrl/Cmd+S), print (Ctrl/Cmd+P), view-source (Ctrl/Cmd+U)
      if ((e.ctrlKey || e.metaKey) && (k === "s" || k === "p" || k === "u")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("copy", onCopyCut);
    document.addEventListener("cut", onCopyCut);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("copy", onCopyCut);
      document.removeEventListener("cut", onCopyCut);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="ownership-notice" aria-hidden="true">
      © OBASIOCHIE VINCENT CHIMAOBI
    </div>
  );
}

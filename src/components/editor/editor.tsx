"use client";

import { Tldraw } from "@tldraw/tldraw";
import 'tldraw/tldraw.css'

export default function editor() {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'white' }}>
      <Tldraw />
    </div>
  );
}
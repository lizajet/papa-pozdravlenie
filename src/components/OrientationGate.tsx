"use client";

import { useEffect, useState } from "react";

export function OrientationGate() {
  const [previewLandscape, setPreviewLandscape] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPreviewLandscape(params.get("preview") === "landscape");
  }, []);

  if (previewLandscape) return null;

  return (
    <aside className="orientation-gate" aria-label="Поверните телефон">
      <div className="phone-icon" aria-hidden="true"><span /></div>
      <p>Поверните телефон горизонтально</p>
      <small>Так дорога поместится целиком</small>
    </aside>
  );
}

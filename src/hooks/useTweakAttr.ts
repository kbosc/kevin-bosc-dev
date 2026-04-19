import { useState, useEffect } from 'react';

export function useTweakAttr(attr: string): string | null {
  const [value, setValue] = useState(() => document.body.getAttribute(attr));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setValue(document.body.getAttribute(attr));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: [attr] });
    return () => observer.disconnect();
  }, [attr]);

  return value;
}

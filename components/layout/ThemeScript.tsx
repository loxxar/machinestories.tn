'use client';

import { useEffect, useState } from 'react';

export default function ThemeScript() {
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', initial === 'dark');

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const handler = () => {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        localStorage.setItem('theme', newTheme);
      };
      toggle.addEventListener('click', handler);
      return () => toggle.removeEventListener('click', handler);
    }
  }, []);

  return null;
}

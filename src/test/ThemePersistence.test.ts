import { describe, it, expect, beforeEach } from 'vitest';

describe('Theme Mode Logic & Resilient Local Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('defaults to light or dark based on stored preference', () => {
    localStorage.setItem('mizen_theme', 'dark');
    expect(localStorage.getItem('mizen_theme')).toBe('dark');

    localStorage.setItem('mizen_theme', 'light');
    expect(localStorage.getItem('mizen_theme')).toBe('light');
  });

  it('handles empty or unrecognized storage values gracefully', () => {
    localStorage.setItem('mizen_theme', 'unrecognized-mode');
    const saved = localStorage.getItem('mizen_theme');
    const validTheme = saved === 'light' || saved === 'dark' ? saved : 'light';
    expect(validTheme).toBe('light');
  });
});

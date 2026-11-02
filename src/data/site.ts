/**
 * Everything about YOU that isn't a project lives here.
 * Edit the values; the layout picks them up automatically.
 */
export const site = {
  name: 'Your Name',
  handle: 'yourhandle',
  title: 'Your Name — security & game development',
  description: 'Portfolio of Your Name: CTF writeups, security tools and games.',
  tagline:
    'Offensive security and game development. Mapping attack surfaces, then building playable ones.',

  // "System status" panel on the home page. Remove any row you don't want.
  status: [
    { label: 'Status', value: 'Open to internships', highlight: true },
    { label: 'Base', value: 'Your city' },
    { label: 'Focus', value: 'Red team · Game dev' },
    { label: 'Platforms', value: 'HTB · TryHackMe · itch.io' },
  ],

  // About section. Each string is a paragraph.
  about: [
    'Two or three lines on who you are, what got you into security and games, and what you are working toward.',
    'What you are currently learning or building: a CTF season, a game jam, a certification, an engine deep-dive.',
  ],
  currently: 'Building a roguelike and grinding pwn challenges',
  // Put a photo in public/files/ and set e.g. '/files/me.jpg'. Leave empty to show a placeholder.
  photo: '',

  // Files in public/files/. Delete an entry to hide its button.
  documents: [
    { label: 'Resume', file: '/files/resume.pdf' },
    { label: 'Full CV', file: '/files/cv.pdf' },
  ],
  documentsUpdated: 'November 2026',

  // Header + contact buttons. `kind` picks the icon: github, itch, linkedin, email, youtube, steam, web
  socials: [
    { label: 'Email', url: 'mailto:you@example.com', kind: 'email' },
    { label: 'GitHub', url: 'https://github.com/yourhandle', kind: 'github' },
    { label: 'itch.io', url: 'https://yourhandle.itch.io', kind: 'itch' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yourhandle', kind: 'linkedin' },
  ],

  // Loadout. `icon` is a brand icon (see BRAND in src/components/Icon.astro)
  // or a generic one: code, terminal, cube, gamepad, shield, bug, network, branch
  loadout: [
    {
      group: 'Languages',
      items: [
        { name: 'Python', icon: 'python' },
        { name: 'C / C++', icon: 'cplusplus' },
        { name: 'C#', icon: 'code' },
        { name: 'Bash', icon: 'bash' },
      ],
    },
    {
      group: 'Engines',
      items: [
        { name: 'Unity', icon: 'unity' },
        { name: 'Godot', icon: 'godot' },
        { name: 'Blender', icon: 'blender' },
      ],
    },
    {
      group: 'Security',
      items: [
        { name: 'Burp Suite', icon: 'burpsuite' },
        { name: 'Wireshark', icon: 'wireshark' },
        { name: 'Ghidra', icon: 'bug' },
        { name: 'Nmap', icon: 'network' },
      ],
    },
    {
      group: 'Tooling',
      items: [
        { name: 'Linux', icon: 'linux' },
        { name: 'Git', icon: 'git' },
        { name: 'Docker', icon: 'docker' },
      ],
    },
  ],
};

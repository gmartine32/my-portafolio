import type { UiMessages } from "./es";

export const enUi: UiMessages = {
  world: {
    ariaLabel: "Developer World — exploratory portfolio",
    fallbackTitle: "World",
    roomLive: "Room: {title}",
  },
  directions: {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
  },
  hud: {
    goTo: "Go {direction} to {title}",
    go: "Go {direction}",
  },
  rooms: {
    home: "Home",
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    opensource: "Open Source",
  },
  home: {
    explore: "Explore",
    navHint: "Arrows, WASD, or swipe",
  },
  about: {
    titleBefore: "About",
    titleAccent: "me",
    years: "{location} · {years} years of experience",
  },
  projects: {
    title: "Projects",
    subtitle: "The heart of the portfolio. Use ← → to walk through each project.",
    countHint: "{count} projects · swipe right to open a project",
  },
  projectDetail: {
    notFound: "Project not found",
    problem: "Problem",
    solution: "Solution",
    learnings: "Learnings",
    github: "GitHub",
    demo: "Demo",
  },
  experience: {
    titleBefore: "My",
    titleAccent: "Experience",
    subtitle: "A walk through my career and the results along the way",
  },
  opensource: {
    titleBefore: "Open",
    titleAccent: "Source",
    subtitle: "Public projects, contributions, and resources",
  },
  contact: {
    title: "Shall we build something?",
    subtitle: "Write to me or look through my work. I'm available for new remote challenges.",
    email: "Email",
    cv: "CV",
    downloadCv: "Download CV",
  },
  map: {
    chip: "Map",
    openSr: "Open the world map. You are in {title}.",
    helpAria: "See how to navigate this portfolio",
    dialogAria: "World map",
    title: "World map",
    subtitle: "Pick any room to travel there directly.",
    close: "Close map",
    goTo: "Go to {title}",
    currentRoom: " (current room)",
    projectsCount: "{title}, {count} projects. {action} list",
    showList: "Show",
    hideList: "Hide",
    projectsHeading: "Projects",
    viewGallery: "View gallery",
    here: "You are here",
    visited: "Visited",
    unvisited: "Not visited",
    keyboardHint: "Arrows to move · Enter to travel · Esc to close",
  },
  onboarding: {
    progress: "How to navigate · {n} of {total}",
    skip: "Skip",
    next: "Next",
    done: "Got it",
    steps: {
      world: {
        title: "This portfolio is a world",
        body: "Each section is a room connected to the others. Move with the arrow keys, WASD, or by swiping.",
      },
      controls: {
        title: "Tap the screen to see the controls",
        body: "A short tap (or a click) shows and hides the navigation arrows, with the directions available from where you are.",
      },
      map: {
        title: "The map takes you anywhere",
        body: "Open the map in the corner to see the full layout and jump straight to any room. Shortcut: M. The button beside it shows this guide again.",
      },
    },
  },
  gallery: {
    dialog: "Gallery of {title}",
    close: "Close gallery",
    prev: "Previous image",
    next: "Next image",
    expand: "Enlarge image {n} of {title}",
    expandN: "Enlarge image {n}",
    capture: "{title} — screenshot {n}",
  },
  lang: {
    groupLabel: "Language",
    setTo: "Switch language to {name}",
  },
};

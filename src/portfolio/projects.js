// Portfolio content, taken from the Aurigin Media company profile (slides 15–62).
// Each slide number maps to src/assets/portfolio/slide-NN.jpg and slide-NN-thumb.jpg.

const FULL = import.meta.glob("../assets/portfolio/slide-[0-9][0-9].jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const THUMBS = import.meta.glob("../assets/portfolio/slide-*-thumb.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

export const GROUPS = ["Property", "3D", "Branding", "Other sectors"];

const RAW_PROJECTS = [
  {
    name: "Trizzone",
    group: "Property",
    slides: [
      [15, "Architecture website"],
      [16, "Service and mobile navigation"],
      [17, "Interior project portfolio"],
    ],
  },
  {
    name: "PotterzWheel Realty",
    group: "Property",
    slides: [
      [18, "Property website and mobile discovery"],
      [19, "Property services"],
      [20, "Project content and contact routes"],
    ],
  },
  {
    name: "Brassage",
    group: "Property",
    slides: [
      [21, "Architectural hardware catalogue"],
      [22, "Product discovery across devices"],
    ],
  },
  {
    name: "Sri Sri Homz",
    group: "Property",
    slides: [
      [23, "Real estate and construction website"],
      [24, "Brand presentation"],
    ],
  },
  {
    name: "Ever Rich Galleria",
    group: "3D",
    slides: [
      [26, "Exterior architectural renders"],
      [27, "Walkthrough presentation"],
      [28, "Street-level presentation"],
    ],
  },
  { name: "The Hair Cloak", group: "Branding", slides: [[30, "Business card design"]] },
  { name: "Gini Sachanandani", group: "Branding", slides: [[31, "Business card design"]] },
  { name: "Logo design", group: "Branding", slides: [[32, "Identities for education, fitness and a personal brand"]] },
  {
    name: "Socanomics",
    group: "Other sectors",
    slides: [
      [35, "Wellness website"],
      [36, "Programmes and events"],
    ],
  },
  {
    name: "Top Shelf Getaways",
    group: "Other sectors",
    slides: [
      [37, "Travel experiences on mobile"],
      [38, "Brand and merchandise"],
    ],
  },
  {
    name: "Anewow",
    group: "Other sectors",
    slides: [
      [39, "Online store and campaign creative"],
      [40, "Product categories and editorial content"],
    ],
  },
  {
    name: "Locafella",
    group: "Other sectors",
    slides: [
      [41, "Service and product website"],
      [42, "Portfolio and service information"],
    ],
  },
  { name: "Tao of Hemp", group: "Other sectors", slides: [[43, "Brand and product discovery"]] },
  {
    name: "Global Vault Group",
    group: "Other sectors",
    slides: [
      [44, "Corporate website"],
      [45, "Service information on mobile"],
    ],
  },
  {
    name: "The Date House",
    group: "Other sectors",
    slides: [
      [46, "Food and gifting website"],
      [47, "Gifting catalogue on mobile"],
    ],
  },
  {
    name: "Holy Cow",
    group: "Other sectors",
    slides: [
      [48, "Community and visitor website"],
      [49, "Visit planning and participation"],
      [50, "Event enquiry journey"],
    ],
  },
  {
    name: "Candid",
    group: "Other sectors",
    slides: [
      [51, "Healthcare consultancy website"],
      [52, "Company information and credentials"],
      [53, "Articles and enquiry routes"],
      [54, "Knowledge and project pages"],
    ],
  },
  {
    name: "WebMobHut",
    group: "Other sectors",
    slides: [
      [55, "Events company website"],
      [56, "Company and careers pages"],
      [57, "Service presentation"],
    ],
  },
  {
    name: "Shakti Global",
    group: "Other sectors",
    slides: [
      [58, "Education consultancy website"],
      [59, "Destination and programme information"],
    ],
  },
  {
    name: "Kundkund Stationers",
    group: "Other sectors",
    slides: [
      [60, "Stationery website"],
      [61, "Mobile catalogue"],
    ],
  },
  { name: "Course campaign landing page", group: "Other sectors", slides: [[62, "Education campaign creative"]] },
];

function slideImage(number, caption) {
  const id = String(number).padStart(2, "0");
  return {
    full: FULL[`../assets/portfolio/slide-${id}.jpg`],
    thumb: THUMBS[`../assets/portfolio/slide-${id}-thumb.jpg`],
    caption,
  };
}

export const PROJECTS = RAW_PROJECTS.map((project, index) => ({
  name: project.name,
  group: project.group,
  category: project.slides[0][1],
  number: String(index + 1).padStart(2, "0"),
  slides: project.slides.map(([number, caption]) => slideImage(number, caption)),
}));

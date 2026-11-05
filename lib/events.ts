export interface DistrictEvent {
  albumId: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string; // empty string = no photo yet
}

// TMCWD district events and activities
export const districtEvents: DistrictEvent[] = [
  {
    albumId: "launching-project-tmcwd-2026",
    title: "Launching of Project T.M.C.W.D",
    year: "2026",
    category: "Milestones",
    description: "The official launch of Project T.M.C.W.D, marking a new chapter in the district's commitment to improved water services and community development.",
    image: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_1482.jpg",
  },
  {
    albumId: "28th-founding-anniversary-2026",
    title: "28th Founding Anniversary",
    year: "2026",
    category: "Milestones",
    description: "TMCWD celebrates its 28th founding anniversary on July 17, 2026, commemorating nearly three decades of dedicated water service to Trece Martires City.",
    image: "",
  },
  {
    albumId: "civil-service-anniversary-2026",
    title: "TMCWD joins the 126th Philippine Civil Service Anniversary",
    year: "2026",
    category: "Government",
    description: "TMCWD participates in the 126th Philippine Civil Service Anniversary celebration on September 28, 2026, honoring public service excellence.",
    image: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/1.png",
  },
  {
    albumId: "cpawd-general-membership-2026",
    title: "2nd General Membership Meeting — Cavite Province Association of Water Districts, Inc.",
    year: "2026",
    category: "Government",
    description: "TMCWD attends the 2nd General Membership Meeting of the Cavite Province Association of Water Districts held on September 23, 2026, strengthening inter-district coordination.",
    image: "/gallery/2026 2ND GENERAL MEMBERSHIP MEETING CAVITE PROVINCE ASSOCIATION OF WATER DISTRICTS, INC/IMG_20260923_112604932.jpg",
  },
  {
    albumId: "plumbing-training-cpawd-2026",
    title: "Plumbing and Pipe Fitting Training of CPAWD Hosted by Trece Martires City Water District",
    year: "2026",
    category: "Training",
    description: "TMCWD hosts a comprehensive plumbing and pipe fitting training program for CPAWD from October 13–16, 2026, promoting skills development and inter-district cooperation.",
    image: "/gallery/2026 CPAWD PLUMBING AND PIPE FITTING TRAINING/IMG_2612.jpg",
  },
  {
    albumId: "spooktacular-halloween-2026",
    title: "TMCWD Spooktacular Halloween Celebration",
    year: "2026",
    category: "Community",
    description: "TMCWD employees and their families celebrate Halloween with a fun-filled Spooktacular event, fostering camaraderie and team spirit within the district.",
    image: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_1482.jpg",
  },
  { albumId: "disaster-preparedness-2019", title: "Disaster Preparedness and Awareness", year: "2019", category: "Training", description: "A look back at TMCWD's disaster preparedness and awareness activities, including its fire drill. Explore moments from the district's safety activities.", image: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/firedrill_orig.jpg" },
  { albumId: "founding-anniversary-2018", title: "20th Founding Anniversary", year: "2018", category: "Milestones", description: "A milestone in the district's history. Revisit photographs from TMCWD's 20th founding anniversary celebration.", image: "/gallery/2018 20TH FOUNDING ANNIVERSARY/img-3842_orig.jpg" },
  { albumId: "water-safety-plan-2018", title: "Water Safety Plan", year: "2018", category: "Training", description: "Photographs from the district's 2018 Water Safety Plan activities, preserved in the TMCWD gallery.", image: "/gallery/2018 WATER SAFETY PLAN/dsc06715_orig.jpg" },
  { albumId: "elderly-fitness-2015", title: "Elderly Physical Fitness", year: "2015", category: "Community", description: "Community moments from the 2015 Elderly Physical Fitness activity. Browse the photo album from this gathering.", image: "/gallery/2015 Elderly Physical Fitness/dsc06875_orig.jpg" },
  { albumId: "clean-green-2014", title: "Clean and Green Program", year: "2014", category: "Environment", description: "Revisit the district's 2014 Clean and Green Program through photographs from the activity.", image: "/gallery/2014 CLEAN AND GREEN PROGRAM/1.jpg" },
  { albumId: "world-water-day-2012", title: "World Water Day", year: "2012", category: "Environment", description: "A look back at TMCWD's 2012 World Water Day activity, celebrating the importance of water in our community.", image: "/gallery/2012 WORLD WATER DAY/dsc08707_orig.jpg" },
];

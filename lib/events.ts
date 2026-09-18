export interface DistrictEvent {
  albumId: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string;
}

// Based on existing gallery records; exact dates and venues await confirmation.
export const districtEvents: DistrictEvent[] = [
  { albumId: "disaster-preparedness-2019", title: "Disaster Preparedness and Awareness", year: "2019", category: "Training", description: "A look back at TMCWD’s disaster preparedness and awareness activities, including its fire drill. Explore moments from the district’s safety activities.", image: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/firedrill_orig.jpg" },
  { albumId: "founding-anniversary-2018", title: "20th Founding Anniversary", year: "2018", category: "Milestones", description: "A milestone in the district’s history. Revisit photographs from TMCWD’s 20th founding anniversary celebration.", image: "/gallery/2018 20TH FOUNDING ANNIVERSARY/img-3842_orig.jpg" },
  { albumId: "water-safety-plan-2018", title: "Water Safety Plan", year: "2018", category: "Training", description: "Photographs from the district’s 2018 Water Safety Plan activities, preserved in the TMCWD gallery.", image: "/gallery/2018 WATER SAFETY PLAN/dsc06715_orig.jpg" },
  { albumId: "elderly-fitness-2015", title: "Elderly Physical Fitness", year: "2015", category: "Community", description: "Community moments from the 2015 Elderly Physical Fitness activity. Browse the photo album from this gathering.", image: "/gallery/2015 Elderly Physical Fitness/dsc06875_orig.jpg" },
  { albumId: "clean-green-2014", title: "Clean and Green Program", year: "2014", category: "Environment", description: "Revisit the district’s 2014 Clean and Green Program through photographs from the activity.", image: "/gallery/2014 CLEAN AND GREEN PROGRAM/1.jpg" },
  { albumId: "world-water-day-2012", title: "World Water Day", year: "2012", category: "Environment", description: "A look back at TMCWD’s 2012 World Water Day activity, celebrating the importance of water in our community.", image: "/gallery/2012 WORLD WATER DAY/dsc08707_orig.jpg" },
];

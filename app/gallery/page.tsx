import type { Metadata } from "next";
import AnnouncementHero from "@/components/layout/AnnouncementHero";
import TransparencyWaveBackground from "@/components/TransparencyWaveBackground";
import GalleryAlbums, { type GallerySection } from "./GalleryAlbums";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of events, activities, and programs of the Trece Martires City Water District.",
};

const sections: GallerySection[] = [
  {
    id: "spooktacular-halloween-2026",
    title: "2026 TMCWD Spooktacular Halloween Celebration",
    images: [
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_1482.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_1204.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_1380.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_1480.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_1516.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3253_1.jpg", alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3257_1.jpg", alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3274_1.jpg", alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3372.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3374.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3376.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3377.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3380.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3383.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3394.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3397.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
      { src: "/gallery/2026 TMCWD SPOOKTACULAR HALLOWEEN CELEBRATION/IMG_3406.jpg",   alt: "2026 TMCWD Spooktacular Halloween Celebration" },
    ],
  },
  {
    id: "civil-service-anniversary-2026",
    title: "2026 TMCWD Joins the 126th Philippine Civil Service Anniversary",
    images: [
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/1.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/2.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/3.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/4.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/5.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/6.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/7.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/8.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/9.png",  alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/10.png", alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/11.png", alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/12.png", alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/13.png", alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/14.png", alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
      { src: "/gallery/2026 TMCWD JOINS THE 126TH PHILIPPINE CIVIL SERVICE ANNIVERSARY/15.png", alt: "2026 TMCWD 126th Philippine Civil Service Anniversary" },
    ],
  },
  {
    id: "cpawd-general-membership-2026",
    title: "2026 2nd General Membership Meeting — Cavite Province Association of Water Districts, Inc.",
    images: [
      { src: "/gallery/2026 2ND GENERAL MEMBERSHIP MEETING CAVITE PROVINCE ASSOCIATION OF WATER DISTRICTS, INC/IMG_20260923_112604932.jpg",     alt: "2026 2nd General Membership Meeting CPAWD" },
      { src: "/gallery/2026 2ND GENERAL MEMBERSHIP MEETING CAVITE PROVINCE ASSOCIATION OF WATER DISTRICTS, INC/IMG_20260923_113002649.jpg",     alt: "2026 2nd General Membership Meeting CPAWD" },
      { src: "/gallery/2026 2ND GENERAL MEMBERSHIP MEETING CAVITE PROVINCE ASSOCIATION OF WATER DISTRICTS, INC/IMG_20260923_123310632.jpg",     alt: "2026 2nd General Membership Meeting CPAWD" },
      { src: "/gallery/2026 2ND GENERAL MEMBERSHIP MEETING CAVITE PROVINCE ASSOCIATION OF WATER DISTRICTS, INC/IMG_20260923_123407227 (1).jpg", alt: "2026 2nd General Membership Meeting CPAWD" },
      { src: "/gallery/2026 2ND GENERAL MEMBERSHIP MEETING CAVITE PROVINCE ASSOCIATION OF WATER DISTRICTS, INC/IMG_20260923_123552427.jpg",     alt: "2026 2nd General Membership Meeting CPAWD" },
      { src: "/gallery/2026 2ND GENERAL MEMBERSHIP MEETING CAVITE PROVINCE ASSOCIATION OF WATER DISTRICTS, INC/IMG_20260923_135903868.jpg",     alt: "2026 2nd General Membership Meeting CPAWD" },
    ],
  },
  {
    id: "cpawd-plumbing-training-2026",
    title: "2026 CPAWD Plumbing and Pipe Fitting Training",
    images: [
      { src: "/gallery/2026 CPAWD PLUMBING AND PIPE FITTING TRAINING/IMG_2612.jpg", alt: "2026 CPAWD Plumbing and Pipe Fitting Training" },
      { src: "/gallery/2026 CPAWD PLUMBING AND PIPE FITTING TRAINING/IMG_2667.jpg", alt: "2026 CPAWD Plumbing and Pipe Fitting Training" },
      { src: "/gallery/2026 CPAWD PLUMBING AND PIPE FITTING TRAINING/IMG_2681.jpg", alt: "2026 CPAWD Plumbing and Pipe Fitting Training" },
      { src: "/gallery/2026 CPAWD PLUMBING AND PIPE FITTING TRAINING/IMG_2711.jpg", alt: "2026 CPAWD Plumbing and Pipe Fitting Training" },
      { src: "/gallery/2026 CPAWD PLUMBING AND PIPE FITTING TRAINING/IMG_4756.jpg", alt: "2026 CPAWD Plumbing and Pipe Fitting Training" },
      { src: "/gallery/2026 CPAWD PLUMBING AND PIPE FITTING TRAINING/IMG_4767.jpg", alt: "2026 CPAWD Plumbing and Pipe Fitting Training" },
    ],
  },
  {
    id: "disaster-preparedness-2019",
    title: "2019 Disaster Preparedness and Awareness",
    images: [
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/1.jpg",               alt: "Disaster preparedness activity 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/firedrill_orig.jpg",   alt: "Fire drill 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6957_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6965_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6966_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6967_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6968_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6972_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6973_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-6997_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-7002_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-7003_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-7006_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
      { src: "/gallery/2019 DISASTER PREPAREDNESS AND AWARENESS/img-7009_orig.jpg",    alt: "Disaster preparedness and awareness 2019" },
    ],
  },
  {
    id: "pawd-convention",
    title: "40th PAWD Convention — Service Awards Night for General Managers and Board of Directors",
    images: [
      { src: "/gallery/40th PAWD CONVENTION SERVICE AWARDS NIGHT FOR GENERAL MANAGERS AND BOARD OF DIRECTORS/img-6878_orig.jpg", alt: "40th PAWD Convention service awards night" },
      { src: "/gallery/40th PAWD CONVENTION SERVICE AWARDS NIGHT FOR GENERAL MANAGERS AND BOARD OF DIRECTORS/img-6885_orig.jpg", alt: "40th PAWD Convention service awards night" },
    ],
  },
  {
    id: "christmas-party-2018",
    title: "2018 Christmas Party",
    images: [
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6025_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6033_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6037_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6047_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6062_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6066_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6072_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6078_orig.jpg",       alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6097_orig (1).jpg",   alt: "2018 Christmas Party" },
      { src: "/gallery/2018 CHRISTMAS PARTY/img-6097_orig.jpg",       alt: "2018 Christmas Party" },
    ],
  },
  {
    id: "karakol-2018",
    title: "2018 Karakol",
    images: [
      { src: "/gallery/2018 KARAKOL/img-5137_orig.jpg", alt: "2018 Karakol" },
      { src: "/gallery/2018 KARAKOL/img-5144_orig.jpg", alt: "2018 Karakol" },
      { src: "/gallery/2018 KARAKOL/img-5156_orig.jpg", alt: "2018 Karakol" },
      { src: "/gallery/2018 KARAKOL/img-5196_orig.jpg", alt: "2018 Karakol" },
      { src: "/gallery/2018 KARAKOL/img-5243_orig.jpg", alt: "2018 Karakol" },
    ],
  },
  {
    id: "halloween-2018",
    title: "2018 JV Halloween Party",
    images: [
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-0508_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5354_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5366_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5384_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5410_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5416_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5418_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5447_orig.jpg", alt: "2018 JV Halloween Party" },
      { src: "/gallery/2018 JV HALLOWEEN PARTY/img-5462_orig.jpg", alt: "2018 JV Halloween Party" },
    ],
  },
  {
    id: "founding-anniversary-2018",
    title: "2018 20th Founding Anniversary",
    images: [
      { src: "/gallery/2018 20TH FOUNDING ANNIVERSARY/img-3842_orig.jpg", alt: "2018 20th Founding Anniversary" },
      { src: "/gallery/2018 20TH FOUNDING ANNIVERSARY/img-3855_orig.jpg", alt: "2018 20th Founding Anniversary" },
      { src: "/gallery/2018 20TH FOUNDING ANNIVERSARY/img-3876_orig.jpg", alt: "2018 20th Founding Anniversary" },
    ],
  },
  {
    id: "csdc-2017",
    title: "2017 CSDC",
    images: [
      { src: "/gallery/2017 CSDC/img-1993_orig.jpg", alt: "2017 CSDC" },
      { src: "/gallery/2017 CSDC/img-1999_orig.jpg", alt: "2017 CSDC" },
      { src: "/gallery/2017 CSDC/img-2002_orig.jpg", alt: "2017 CSDC" },
    ],
  },
  {
    id: "cheers-code-red-2017",
    title: "2017 Cheers Code Red",
    images: [
      { src: "/gallery/2017 CHEERS CODE RED/img-1886_orig.jpg", alt: "2017 Cheers Code Red" },
      { src: "/gallery/2017 CHEERS CODE RED/img-1895_orig.jpg", alt: "2017 Cheers Code Red" },
      { src: "/gallery/2017 CHEERS CODE RED/img-1897_orig.jpg", alt: "2017 Cheers Code Red" },
      { src: "/gallery/2017 CHEERS CODE RED/img-1903_orig.jpg", alt: "2017 Cheers Code Red" },
      { src: "/gallery/2017 CHEERS CODE RED/img-1904_orig.jpg", alt: "2017 Cheers Code Red" },
      { src: "/gallery/2017 CHEERS CODE RED/img-1907_orig.jpg", alt: "2017 Cheers Code Red" },
      { src: "/gallery/2017 CHEERS CODE RED/img-1908_orig.jpg", alt: "2017 Cheers Code Red" },
      { src: "/gallery/2017 CHEERS CODE RED/img-1992_orig.jpg", alt: "2017 Cheers Code Red" },
    ],
  },
  {
    id: "automotive-training-2017",
    title: "2017 Basic Automotive Training Course",
    images: [
      { src: "/gallery/2017 BASIC AUTOMOTIVE TRAINING COURSE/img-1452_orig.jpg", alt: "2017 Basic Automotive Training Course" },
      { src: "/gallery/2017 BASIC AUTOMOTIVE TRAINING COURSE/img-1454_orig.jpg", alt: "2017 Basic Automotive Training Course" },
      { src: "/gallery/2017 BASIC AUTOMOTIVE TRAINING COURSE/img-1456_orig.jpg", alt: "2017 Basic Automotive Training Course" },
      { src: "/gallery/2017 BASIC AUTOMOTIVE TRAINING COURSE/img-1469_orig.jpg", alt: "2017 Basic Automotive Training Course" },
      { src: "/gallery/2017 BASIC AUTOMOTIVE TRAINING COURSE/img-1480_orig.jpg", alt: "2017 Basic Automotive Training Course" },
      { src: "/gallery/2017 BASIC AUTOMOTIVE TRAINING COURSE/img-1482_orig.jpg", alt: "2017 Basic Automotive Training Course" },
      { src: "/gallery/2017 BASIC AUTOMOTIVE TRAINING COURSE/img-1485_orig.jpg", alt: "2017 Basic Automotive Training Course" },
    ],
  },
  {
    id: "water-safety-plan-2018",
    title: "2018 Water Safety Plan",
    images: [
      { src: "/gallery/2018 WATER SAFETY PLAN/dsc06715_orig.jpg", alt: "2018 Water Safety Plan" },
      { src: "/gallery/2018 WATER SAFETY PLAN/dsc06720_orig.jpg", alt: "2018 Water Safety Plan" },
      { src: "/gallery/2018 WATER SAFETY PLAN/dsc06726_orig.jpg", alt: "2018 Water Safety Plan" },
      { src: "/gallery/2018 WATER SAFETY PLAN/dsc06727_orig.jpg", alt: "2018 Water Safety Plan" },
      { src: "/gallery/2018 WATER SAFETY PLAN/dsc06730_orig.jpg", alt: "2018 Water Safety Plan" },
      { src: "/gallery/2018 WATER SAFETY PLAN/dsc06747_orig.jpg", alt: "2018 Water Safety Plan" },
    ],
  },
  {
    id: "elderly-fitness-2015",
    title: "2015 Elderly Physical Fitness",
    images: [
      { src: "/gallery/2015 Elderly Physical Fitness/dsc06875_orig.jpg", alt: "2015 Elderly Physical Fitness" },
      { src: "/gallery/2015 Elderly Physical Fitness/dsc06878_orig.jpg", alt: "2015 Elderly Physical Fitness" },
      { src: "/gallery/2015 Elderly Physical Fitness/dsc06879_orig.jpg", alt: "2015 Elderly Physical Fitness" },
      { src: "/gallery/2015 Elderly Physical Fitness/dsc06882_orig.jpg", alt: "2015 Elderly Physical Fitness" },
      { src: "/gallery/2015 Elderly Physical Fitness/dsc06890_orig.jpg", alt: "2015 Elderly Physical Fitness" },
      { src: "/gallery/2015 Elderly Physical Fitness/dsc06896_orig.jpg", alt: "2015 Elderly Physical Fitness" },
      { src: "/gallery/2015 Elderly Physical Fitness/dsc06902_orig.jpg", alt: "2015 Elderly Physical Fitness" },
    ],
  },
  {
    id: "clean-green-2014",
    title: "2014 Clean and Green Program",
    images: [
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/1.jpg",             alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05497_orig.jpg", alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05498_orig.jpg", alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05502_orig.jpg", alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05503_orig.jpg", alt: "2014 Clean and Green Program" },
    ],
  },
  {
    id: "team-building-2013",
    title: "2013 TMCWD Team Building",
    images: [
      { src: "/gallery/2013 TMCWD TEAM BUILDING/copy-of-dsc05499_orig.jpg", alt: "2013 TMCWD Team Building" },
      { src: "/gallery/2013 TMCWD TEAM BUILDING/dsc03609_orig.jpg",         alt: "2013 TMCWD Team Building" },
      { src: "/gallery/2013 TMCWD TEAM BUILDING/dsc03610_orig.jpg",         alt: "2013 TMCWD Team Building" },
      { src: "/gallery/2013 TMCWD TEAM BUILDING/dsc03611_orig.jpg",         alt: "2013 TMCWD Team Building" },
      { src: "/gallery/2013 TMCWD TEAM BUILDING/dsc03617_orig.jpg",         alt: "2013 TMCWD Team Building" },
      { src: "/gallery/2013 TMCWD TEAM BUILDING/dsc03621_orig.jpg",         alt: "2013 TMCWD Team Building" },
    ],
  },
  {
    id: "world-water-day-2012",
    title: "2012 World Water Day",
    images: [
      { src: "/gallery/2012 WORLD WATER DAY/dsc08707_orig.jpg", alt: "2012 World Water Day" },
      { src: "/gallery/2012 WORLD WATER DAY/dsc08711_orig.jpg", alt: "2012 World Water Day" },
      { src: "/gallery/2012 WORLD WATER DAY/dsc08746_orig.jpg", alt: "2012 World Water Day" },
      { src: "/gallery/2012 WORLD WATER DAY/dsc08757_orig.jpg", alt: "2012 World Water Day" },
      { src: "/gallery/2012 WORLD WATER DAY/dsc08759_orig.jpg", alt: "2012 World Water Day" },
      { src: "/gallery/2012 WORLD WATER DAY/dsc08760_orig.jpg", alt: "2012 World Water Day" },
    ],
  },
];

export default function GalleryPage() {
  return (
    <>
      <AnnouncementHero
        slug="gallery"
        eyebrow="Announcements"
        title="Gallery"
        description="Browse photos from TMCWD events, programs, and activities through the years."
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <div className="relative isolate overflow-hidden bg-[#EEF4F8]">
        <TransparencyWaveBackground animated />
        <main className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <GalleryAlbums sections={sections} />
        </main>
      </div>
    </>
  );
}

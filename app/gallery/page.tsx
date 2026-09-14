import type { Metadata } from "next";
import Image from "next/image";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of events, activities, and programs of the Trece Martires City Water District.",
};

interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySection {
  id: string;
  title: string;
  images: GalleryImage[];
}

const sections: GallerySection[] = [
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
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/1.jpg",                     alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/copy-of-dsc05499_orig.jpg", alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc03609_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc03610_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc03611_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc03617_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc03621_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05497_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05498_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05502_orig.jpg",         alt: "2014 Clean and Green Program" },
      { src: "/gallery/2014 CLEAN AND GREEN PROGRAM/dsc05503_orig.jpg",         alt: "2014 Clean and Green Program" },
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

/* ── Empty-state placeholder ───────────────────────────────────────── */
function EmptySection() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[#D6E8F4] bg-[#F4FAFD] py-14 px-6 text-center">
      <svg
        className="size-10 text-[#A1CBE1]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 21h18M3.75 3h16.5A.75.75 0 0121 3.75v16.5a.75.75 0 01-.75.75H3.75A.75.75 0 013 20.25V3.75A.75.75 0 013.75 3z"
        />
      </svg>
      <p className="text-sm text-[#2A2A29]/45 leading-relaxed max-w-xs">
        Photos for this section will be added soon.
      </p>
    </div>
  );
}

/* ── Single photo card ─────────────────────────────────────────────── */
function PhotoCard({ image }: { image: GalleryImage }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl bg-[#E8EEF2] shadow-sm hover:shadow-md transition-shadow duration-200">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

/* ── Full gallery page ─────────────────────────────────────────────── */
export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Gallery"
        description="Browse photos from TMCWD events, programs, and activities through the years."
      >
        <Breadcrumb current="Gallery" />
      </PageHeader>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {sections.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`heading-${section.id}`}>
            {/* Section heading */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-7 w-1 rounded-full bg-[#0591D4] shrink-0" aria-hidden="true" />
              <h2
                id={`heading-${section.id}`}
                className="font-heading text-xl font-semibold text-[#370A77] leading-snug"
              >
                {section.title}
              </h2>
            </div>

            {/* Photo grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {section.images.length > 0 ? (
                section.images.map((img, idx) => (
                  <PhotoCard key={idx} image={img} />
                ))
              ) : (
                <EmptySection />
              )}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

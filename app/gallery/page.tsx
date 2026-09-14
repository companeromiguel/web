import type { Metadata } from "next";
import Image from "next/image";
import PageHeader, { Breadcrumb } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of events, activities, and programs of the Trece Martires City Water District.",
};

/* ─────────────────────────────────────────────────────────────────────
   Gallery data — add image filenames to the `images` array of each
   section when photos are ready. Each entry:
     { src: "/gallery/<filename>", alt: "<caption>" }
───────────────────────────────────────────────────────────────────── */
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
    images: [],
  },
  {
    id: "pawd-convention",
    title: "40th PAWD Convention — Service Awards Night for General Managers and Board of Directors",
    images: [],
  },
  {
    id: "christmas-party-2018",
    title: "2018 Christmas Party",
    images: [],
  },
  {
    id: "karakol-2018",
    title: "2018 Karakol",
    images: [],
  },
  {
    id: "halloween-2018",
    title: "2018 JV Halloween Party",
    images: [],
  },
  {
    id: "founding-anniversary-2018",
    title: "2018 20th Founding Anniversary",
    images: [],
  },
  {
    id: "csdc-2017",
    title: "2017 CSDC",
    images: [],
  },
  {
    id: "cheers-code-red-2017",
    title: "2017 Cheers Code Red",
    images: [],
  },
  {
    id: "automotive-training-2017",
    title: "2017 Basic Automotive Training Course",
    images: [],
  },
  {
    id: "water-safety-plan-2018",
    title: "2018 Water Safety Plan",
    images: [],
  },
  {
    id: "elderly-fitness-2015",
    title: "2015 Elderly Physical Fitness",
    images: [],
  },
  {
    id: "clean-green-2014",
    title: "2014 Clean and Green Program",
    images: [],
  },
  {
    id: "team-building-2013",
    title: "2013 TMCWD Team Building",
    images: [],
  },
  {
    id: "world-water-day-2012",
    title: "2012 World Water Day",
    images: [],
  },
];

/* ─── Empty-state placeholder shown when a section has no images yet ── */
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

/* ─── Single photo card ─────────────────────────────────────────────── */
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
      {image.alt && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <p className="text-xs text-white line-clamp-2 leading-snug">{image.alt}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Full gallery page ─────────────────────────────────────────────── */
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

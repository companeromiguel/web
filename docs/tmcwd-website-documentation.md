# TMCWD Website Documentation

## For Reporting to the Division Head and General Manager

**Organization:** Trece Martires City Water District (TMCWD)
**Document type:** Website overview and management report
**Prepared:** October 12, 2026
**Website:** https://tmcwd.gov.ph

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Website Objectives](#2-website-objectives)
3. [Primary Stakeholders and Users](#3-primary-stakeholders-and-users)
4. [Main Website Sections](#4-main-website-sections)
5. [Public Contact Information Displayed](#5-public-contact-information-displayed)
6. [Accessibility and User Experience Features](#6-accessibility-and-user-experience-features)
7. [Technology and Hosting Overview](#7-technology-and-hosting-overview)
8. [Third-Party Integrations](#8-third-party-integrations)
9. [Search Engine Optimization](#9-search-engine-optimization)
10. [Error Pages](#10-error-pages)
11. [Performance Optimizations](#11-performance-optimizations)
12. [Website Content Management Responsibilities](#12-website-content-management-responsibilities)
13. [Recommended Content Publication Workflow](#13-recommended-content-publication-workflow)
14. [Transparency Document Controls](#14-transparency-document-controls)
15. [Quality Assurance and Monitoring](#15-quality-assurance-and-monitoring)
16. [Risks and Controls](#16-risks-and-controls)
17. [Current Maintenance References](#17-current-maintenance-references)
18. [Management Review and Approval](#18-management-review-and-approval)

---

## 1. Executive Summary

The TMCWD website is the District's official public information and service platform. It gives customers, residents, partner agencies and other stakeholders access to essential water-service information, public announcements, transparency records, procurement information, events, contact channels and selected district activities.

The website is designed to support the District's commitment to accessible public service, transparency, timely communication and reliable access to official information. It is built using Next.js with server-side rendering and API routes, deployed on Vercel, and served globally via Vercel's content delivery network (CDN).

The site is registered with Google Search Console and a sitemap has been submitted covering all 29 public pages, ensuring the website is discoverable through Google Search.

---

## 2. Website Objectives

The website supports the following objectives:

1. Provide the public with a reliable official source of TMCWD information.
2. Explain customer services, requirements and service procedures in an organized manner.
3. Publish announcements, advisories and relevant District updates automatically from the official TMCWD Facebook page.
4. Provide access to transparency, Freedom of Information, Citizen's Charter, bidding and procurement materials.
5. Display contact information and channels for customer assistance.
6. Present the District's programs, events and historical gallery materials.
7. Improve access through responsive design, keyboard navigation and accessibility controls.
8. Maintain good search engine visibility through proper SEO, sitemap submission and Google Search Console monitoring.

---

## 3. Primary Stakeholders and Users

| Stakeholder | Website use |
| --- | --- |
| Water consumers | Review services, billing information, requirements, advisories and contact details |
| Residents of Trece Martires City | Access announcements, water-quality information and public notices |
| TMCWD management and employees | Publish and maintain official information and documents |
| Division Head and General Manager | Monitor the public information platform and approve official content |
| Government oversight offices | Review transparency, procurement and public disclosure materials |
| Suppliers and prospective bidders | Access bidding and procurement information |
| Media and community organizations | Verify official announcements and District information |

---

## 4. Main Website Sections

### 4.1 Home

The homepage provides the primary public entry point. It includes:

- the TMCWD service message and main calls to action;
- live water advisories and announcements fetched automatically from the TMCWD Facebook page;
- an overview of the District including mission and vision;
- key statistics (year established, barangays served, active connections);
- quick access to payment, transparency, Citizen's Charter and senior citizen discount information;
- an embedded Google Maps location;
- links to other public service areas.

### 4.2 Services

The Services section presents customer-facing procedures and information, including:

- new water application;
- meter reading and statement information;
- payment of water bills;
- change of ball valve;
- leak repair requests;
- water supply operations;
- temporary disconnection and reconnection;
- change of name or address;
- change meter requests;
- senior citizen discount;
- feedback and complaints.

Each service page presents the applicable requirements, procedure, service expectations and related information in a consistent format.

### 4.3 Transparency and Public Disclosure

The Transparency section provides access to:

- Transparency Seal documents;
- Freedom of Information materials;
- Citizen's Charter documents;
- bidding and procurement information;
- budgets and financial or operational records;
- rankings, certifications and related public documents.

PDF files can be opened or downloaded. The document library uses a manifest and content hashes so that approved descriptions are not accidentally retained when a source PDF is replaced.

### 4.4 Announcements and Events

The Announcements section displays posts fetched automatically from the official TMCWD Facebook page (fb.com/tmcwdCMUHelpDesk) through the Facebook Graph API. Posts appear on the website within 5 minutes of being published on Facebook. The Events section provides information about District activities, while the Gallery preserves selected images from TMCWD programs, training, milestones and community activities.

### 4.5 Water Quality

The Water Quality section provides a dedicated public location for water-quality information and related public communication.

### 4.6 Board Meetings and Contact

The Board Meetings section provides a public location for board-related information. The Contact section and website footer provide the District address, telephone numbers, email address, social media channel and office hours.

### 4.7 Online Bill Inquiry

The Online Bill Inquiry section provides links to the external bill inquiry portal (bills.pinas.app), instructions on how to pay online, and Statement of Account information.

---

## 5. Public Contact Information Displayed

The website currently displays the following contact information in the footer:

- **Address:** 2nd Floor, TMCWD Building, Governor's Drive, Barangay San Agustin, Trece Martires City, Cavite 4109
- **Telephone:** (046) 419-2664 and (046) 419-0054
- **Fax:** (046) 419-0378
- **Email:** tmcwd@yahoo.com
- **Facebook:** facebook.com/tmcwdCMUHelpDesk
- **Office hours:** Monday to Friday, 8:00 AM to 5:00 PM

This information should be verified periodically by the responsible office before each formal website review or major publication.

---

## 6. Accessibility and User Experience Features

The website includes the following user-facing features:

- responsive layouts for desktop and mobile devices;
- a skip link to help keyboard users reach the main content;
- visible focus states for interactive controls;
- an accessibility widget (font size, grayscale, high contrast, negative contrast, light background, links underline, readable font, reduce motion);
- a data privacy modal (shown once per user, with acknowledgement checkbox);
- a back-to-top control on long pages;
- semantic headings and page landmarks;
- PDF preview and download options using PDF.js;
- optimized image loading with Next.js image optimization;
- animated hero slideshow with five rotating images.

Accessibility should be checked whenever new pages, documents, images or interactive controls are added.

---

## 7. Technology and Hosting Overview

### Stack

| Component | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19 |
| Styling | Tailwind CSS v4 + CSS Modules |
| PDF viewer | PDF.js |
| Deployment | Vercel (Hobby plan) |
| Source control | GitHub (github.com/companeromiguel/web) |
| Domain | tmcwd.gov.ph (redirects to www.tmcwd.gov.ph) |

### Hosting

The website is hosted on **Vercel** and deployed automatically whenever changes are pushed to the `master` branch on GitHub. Vercel serves the site from its global CDN, ensuring fast delivery to users in the Philippines and worldwide.

The site uses **server-side rendering** with API routes for dynamic features (announcements feed). Static pages are pre-rendered at build time for fast delivery.

### Deployment Storage

Vercel Hobby plan allows up to 10 GB of deployment storage. Old deployments should be deleted periodically from the Vercel dashboard to keep storage usage low. As of October 2026, current deployment storage is approximately 191 MB.

---

## 8. Third-Party Integrations

### 8.1 Facebook Graph API (Announcements Feed)

The website fetches posts automatically from the TMCWD Facebook page using the Facebook Graph API. Posts appear on the homepage Announcements section and the News page within 5 minutes of being published on Facebook.

| Detail | Value |
| --- | --- |
| Facebook Page | fb.com/tmcwdCMUHelpDesk |
| Page ID | 107672617284821 |
| Meta App | tmcwd (App ID: 2195398564653661) |
| API Version | v21.0 |
| Token type | Long-lived Page Access Token (~60 days) |
| Cache duration | 5 minutes |
| Auto-refresh | Enabled — token refreshes automatically on expiry |

**Token maintenance:** The Page Access Token expires approximately every 60 days. The API route includes automatic token refresh logic. If the announcements feed stops working, a new User Access Token must be generated from [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer) using the tmcwd app and provided to the website administrator to update the environment variable.

### 8.2 Google Maps

An embedded Google Maps iframe displays the TMCWD office location on the homepage and contact page, linked to the verified Google Business listing (CID: 10092507030261381943).

### 8.3 Online Bill Inquiry (bills.pinas.app)

The Online Bill Inquiry button links to the external portal at bills.pinas.app, operated by a third-party provider. TMCWD does not control the availability of this external service.

---

## 9. Search Engine Optimization

### 9.1 Google Search Console

The website is verified with Google Search Console using the HTML meta tag method. Ownership was verified in October 2026.

- **Property:** https://tmcwd.gov.ph
- **Verification method:** HTML meta tag in layout.tsx
- **Sitemap submitted:** https://tmcwd.gov.ph/sitemap.xml

### 9.2 Sitemap

An automatically generated sitemap covers 29 public pages including the homepage, all service pages, transparency pages, news, events, gallery, water quality, board meetings, contact and online bill inquiry pages. The sitemap is accessible at `https://tmcwd.gov.ph/sitemap.xml`.

### 9.3 Robots.txt

A robots.txt file is accessible at `https://tmcwd.gov.ph/robots.txt`. It allows all public pages and blocks `/private/`, `/api/` and test routes.

### 9.4 Metadata

Each page includes:
- a unique title using the template `[Page Name] | TMCWD`;
- a meta description;
- Open Graph tags for social sharing;
- Twitter card tags;
- Google site verification meta tag.

---

## 10. Error Pages

The website includes custom branded error pages consistent with the TMCWD visual identity:

| Error | File | Description |
| --- | --- | --- |
| 404 Not Found | `app/not-found.tsx` | Animated leaking pipe SVG with water jets, drips and puddle. Tagline: "This page has sprung a leak." |
| 500 Server Error | `app/global-error.tsx` | Deep indigo/purple theme with animated water waves. Includes "Try Again" and "Back to Home" buttons. |

---

## 11. Performance Optimizations

The following performance improvements have been applied as of October 2026:

| Optimization | Detail |
| --- | --- |
| Hero image compression | All 5 hero slideshow images compressed from a total of ~20 MB to ~4.4 MB |
| First image preload | `imgv3.jpg` (first hero image) is preloaded with high fetch priority |
| Privacy modal delay | Data Privacy modal is delayed by 1 second to allow the page to render first, improving LCP measurement |
| Announcement caching | Facebook API responses cached for 5 minutes via `Cache-Control` headers |
| Unused files removed | Unused components, SVGs, images, video and tmp files removed from repository |

**PageSpeed scores (mobile, October 2026):**

| Metric | Score |
| --- | --- |
| Performance | 58 (improving) |
| Accessibility | 93 |
| Best Practices | 100 |
| SEO | 100 |

Further improvements planned: Google Analytics 4, additional image compression, FAQ page.

---

## 12. Website Content Management Responsibilities

Website information should be reviewed and approved according to the following responsibilities:

| Responsibility | Recommended accountable role |
| --- | --- |
| Confirm accuracy of official announcements and advisories | Concerned Division or originating office |
| Confirm service requirements and procedures | Customer service or responsible operating Division |
| Approve public wording and publication timing | Authorized management representative |
| Review transparency and procurement records | Records, procurement or designated transparency personnel |
| Verify contact information | Administration or designated communications personnel |
| Upload and technically publish approved changes | Website administrator or technical support |
| Perform final public-site inspection | Website administrator with the originating office |
| Monitor Facebook API token and announcements feed | Website administrator |
| Monitor Vercel deployment storage | Website administrator |

The Division Head and General Manager should remain the approving authorities for material changes that affect public service commitments, official statements, compliance disclosures or management-level announcements.

---

## 13. Recommended Content Publication Workflow

1. The originating office prepares the announcement, service update or document.
2. The originating office checks dates, names, contact details, attachments and applicable approvals.
3. The responsible Division Head reviews the content for operational accuracy.
4. Management approval is obtained when the content is a formal policy, public advisory, compliance disclosure or management announcement.
5. For announcements: post on the official TMCWD Facebook page — the website will update automatically within 5 minutes.
6. For documents and page updates: the website administrator publishes the approved content in the appropriate section and deploys to production.
7. The website administrator checks the published page on desktop and mobile views.
8. The originating office confirms that the public version is accurate and readable.
9. The publication date, source office and review date are recorded for internal monitoring.

---

## 14. Transparency Document Controls

Transparency documents are maintained through a document manifest and an import script. The import process:

- reads PDFs from the approved source folders;
- calculates a SHA-256 hash for each PDF;
- records page count and file size;
- identifies identical documents and avoids duplicate publication;
- copies approved documents into the public document directory;
- adds a content-hash query to document links for cache refresh purposes.

Before replacing a transparency document, the responsible office should confirm that:

- the file is the final approved version;
- the filename and document category are correct;
- the document is readable and complete;
- the applicable title and summary have been reviewed;
- outdated or superseded public files have been assessed;
- the updated page has been checked after publication.

The detailed technical procedure is documented in [docs/transparency-maintenance.md](transparency-maintenance.md). Pending wording and document decisions are recorded in [docs/transparency-wording-review.md](transparency-wording-review.md).

---

## 15. Quality Assurance and Monitoring

Before a major publication or deployment, the following checks are recommended:

- confirm that the homepage loads correctly;
- test the main navigation and submenu links;
- verify announcement, service, transparency and contact pages;
- check that the Facebook announcements feed is loading posts;
- open and download a sample of newly published PDFs;
- inspect the website on a mobile device and desktop browser;
- check spelling, dates, names, office titles and telephone numbers;
- confirm that external government links open correctly;
- test keyboard navigation and focus visibility;
- run the project lint check and production build;
- retain the approved source files and publication record.

For routine governance, a monthly content review and a quarterly full website review are recommended. A full review should include contact information, service procedures, public documents, advisories, links, accessibility behavior, mobile presentation, Facebook API token validity and Vercel deployment storage.

### Recommended Monitoring Tools

| Tool | Purpose | URL |
| --- | --- | --- |
| Google Search Console | Indexing, sitemap, Core Web Vitals | search.google.com/search-console |
| PageSpeed Insights | Performance score | pagespeed.web.dev |
| GTmetrix | Detailed load waterfall | gtmetrix.com |
| WAVE | Accessibility checker | wave.webaim.org |
| UptimeRobot | Uptime monitoring (recommended) | uptimerobot.com |
| Vercel Dashboard | Deployment status and storage | vercel.com |

---

## 16. Risks and Controls

| Risk | Control |
| --- | --- |
| Outdated service or contact information | Assign an accountable office and conduct scheduled reviews |
| Incorrect or unapproved public statement | Require originating-office and management approval before publication |
| Wrong or incomplete transparency file | Use the controlled import process and inspect the published PDF |
| Broken links or missing media | Perform post-publication link and browser checks |
| Accessibility barriers | Use semantic content, keyboard checks and the accessibility widget |
| Browser cache showing an old document | Use the document hash versioning process and rebuild the static site |
| Unrecorded website changes | Keep approved source material and a publication/change log |
| Facebook announcements feed stops working | Check token expiry; generate new User Access Token and update environment variable |
| Vercel deployment storage exceeds 10 GB | Delete old deployments from Vercel dashboard monthly |
| Website downtime | Set up UptimeRobot monitoring; check Vercel status page |

---

## 17. Current Maintenance References

The project contains the following supporting references:

- [README.md](../README.md): developer setup, project structure and deployment commands;
- [transparency-maintenance.md](transparency-maintenance.md): transparency document maintenance and PDF preview behavior;
- [transparency-wording-review.md](transparency-wording-review.md): document wording decisions and editorial review notes.

### Key Environment Variables

The following environment variables are required for the website to function correctly. They are stored in `.env.local` (local development) and in the Vercel project settings (production):

| Variable | Purpose |
| --- | --- |
| `FB_PAGE_ID` | TMCWD Facebook Page numeric ID |
| `FB_PAGE_ACCESS_TOKEN` | Facebook Page Access Token for announcements API |
| `FB_APP_ID` | Facebook App ID |
| `FB_APP_SECRET` | Facebook App Secret |

---

## 18. Management Review and Approval

This document may be used as the accompanying technical and operational overview for management reporting. The following items should be completed during formal review:

- confirm the current website URL and hosting status;
- confirm the displayed contact information;
- identify the responsible website administrator;
- identify the responsible content owners for each major section;
- confirm the review schedule;
- record approved changes and management instructions.

**Reviewed by:** ____________________________________
**Position:** _______________________________________
**Date:** ___________________________________________

**Approved by:** ___________________________________
**Position:** General Manager
**Date:** ___________________________________________

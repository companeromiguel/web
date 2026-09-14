export interface SummaryCard {
  label: string;
  title: string;
  detail: string;
}

interface ServiceGuideBase {
  title: string;
  description: string;
  requirements: string[];
  requirementsNote?: string;
  steps: { title: string; detail: string }[];
  pages: number[];
  note?: string;
  sourcePages?: { page: number; title: string; src: string; width: number; height: number }[];
  extraSection?: { title: string; description: string; items: { title: string; detail: string; note?: string }[] };
}

export type ServiceGuide = ServiceGuideBase & (
  | { pageType?: "transactional"; fee: string; time: string; highlights?: SummaryCard[] }
  | { pageType: "informational"; highlights: [SummaryCard, SummaryCard, SummaryCard]; fee?: never; time?: never }
);

export const serviceGuides: Record<string, ServiceGuide> = {
  "new-water-application": {
    title: "New Water Application",
    description: "Apply for a new water meter connection with Trece Martires City Water District. Review the requirements and process before visiting the office.",
    requirements: ["Valid ID with signature", "Barangay permit for water installation", "Proof of address or property documents, as applicable", "Other supporting documents listed in the full checklist below"],
    requirementsNote: "The charter's checklist includes additional documents for renters, representatives, commercial applicants, subdivisions, and other circumstances. Check page 5 for the complete list.",
    steps: [
      { title: "Submit the application", detail: "Customer Service checks the submitted requirements and prepares a new connection Job Order after confirming the documents are complete." },
      { title: "Site inspection and assessment", detail: "Maintenance staff inspect the property. Customer Accounts uses the inspection details to assess materials and charges, then informs you when payment is ready." },
      { title: "Pay and arrange installation", detail: "Pay the assessed amount at the cashier and keep the Official Receipt. Maintenance staff install the new water meter and Customer Accounts records the meter number." },
    ],
    fee: "Estimated amount of ₱5,000 and above; final amount depends on assessed materials and charges",
    time: "10 hours and 54 minutes",
    pages: [5, 6, 7, 8, 9],
    highlights: [
      { label: "Before you apply", title: "Prepare your documents", detail: "Bring a valid ID with signature and the barangay permit for water installation. The checklist below covers other documents that may apply to your property or application." },
      { label: "At the office", title: "Submit and arrange inspection", detail: "Customer Service checks your documents, then an inspector visits the proposed connection site. The office advises you of the assessed charges before payment." },
      { label: "Fees and timing", title: "See the official schedule", detail: "The charter lists an estimated application amount of ₱5,000 and above and a total processing time of 10 hours and 54 minutes. Final charges depend on the inspection and materials required." },
    ],
    sourcePages: [
      { page: 5, title: "Application requirements", src: "/New%20Water/1.png", width: 948, height: 638 },
      { page: 6, title: "Application process, part 1", src: "/New%20Water/2.png", width: 949, height: 617 },
      { page: 7, title: "Application process, part 2", src: "/New%20Water/3.png", width: 950, height: 620 },
      { page: 8, title: "Application process, part 3", src: "/New%20Water/4.png", width: 948, height: 627 },
      { page: 9, title: "Schedule of water rates", src: "/New%20Water/5.png", width: 948, height: 627 },
    ],
  },
  "meter-reading": {
    title: "Meter Reading & Statement",
    description: "Learn when your meter is read, how your Statement of Account is issued, and what to check when you receive it.",
    requirements: ["No documents required"],
    steps: [
      { title: "Meter reading", detail: "Be aware of your area's monthly reading schedule. A meter reader records the consumption on your water meter." },
      { title: "Statement of Account", detail: "The meter reader gives you the printed statement during the reading for normal consumption. If the account shows a sudden increase or decrease, it may be issued the same day or the following day. Check its details and due date." },
    ],
    fee: "No separate fee",
    time: "5 minutes",
    pages: [10, 11],
    highlights: [
      { label: "Monthly reading", title: "Know your reading day", detail: "Meter readers visit each area once a month and record the water consumption shown on each meter." },
      { label: "Your statement", title: "Check the details", detail: "When you receive your Statement of Account, check the meter reading, consumption, and due date. Ask about any reading or charge that looks unexpected." },
      { label: "Requirements and time", title: "No documents or fee", detail: "The Citizen's Charter lists no requirements or separate fee for this service. It gives a total processing time of five minutes." },
    ],
    sourcePages: [
      { page: 10, title: "Meter reading", src: "/Meter%20Reading/1.png", width: 1684, height: 1191 },
      { page: 11, title: "Issuance of Statement of Account", src: "/Meter%20Reading/2.png", width: 1684, height: 1191 },
    ],
  },
  payment: {
    title: "Payment of Water Bill",
    description: "Pay your monthly water bill at the TMCWD cashier or review the other payment platforms listed in the Citizen's Charter.",
    requirements: ["Statement of Account or water bill", "Old receipt if the Statement of Account is unavailable", "Complete account name and address if the Statement of Account is unavailable"],
    steps: [
      { title: "Join the queue", detail: "Go to the cashier area and wait in the designated seating area." },
      { title: "Pay your bill", detail: "Give the cashier your Statement of Account. If it is unavailable, provide your complete account name and address. The cashier receives payment and issues an Official Receipt." },
      { title: "Check the receipt", detail: "Confirm that the receipt details are correct and count any change you receive." },
    ],
    fee: "The charter lists a bill amount of ₱170 and above; pay the amount on your statement",
    time: "7 minutes, as printed in the charter total",
    pages: [12, 13],
    note: "The charter lists one minute for queueing and seven minutes for cashier payment, while its printed total is seven minutes.",
    highlights: [
      { label: "Before you pay", title: "Bring your bill", detail: "Bring your Statement of Account or water bill. If you do not have it, the charter lists an old receipt as an alternative; give the cashier your complete account name and address." },
      { label: "At the cashier", title: "Pay and check your receipt", detail: "Wait in the cashier area, pay when called, and check the Official Receipt and any change before leaving." },
      { label: "Charter details", title: "Amount and time", detail: "The charter lists a bill amount of ₱170 and above and a total on-site processing time of seven minutes. Pay the amount shown on your own statement." },
    ],
    extraSection: {
      title: "Payment platforms",
      description: "Options listed in the 2025 Citizen's Charter.",
      items: [
        { title: "TMCWD Cashier", detail: "2nd Floor, TMCWD Building, Brgy. San Agustin, Trece Martires City, Cavite.", note: "Monday–Friday, 8:00 AM–4:30 PM, except holidays" },
        { title: "ECPAY Collecting Partners", detail: "The charter lists 7-Eleven, Cebuana Lhuillier, Home Credit, Tambunting, and other collecting partners. Availability follows store hours." },
        { title: "Online payment", detail: "The charter lists GCash as an online payment partner through its mobile application." },
      ],
    },
    sourcePages: [
      { page: 12, title: "On-site payment process", src: "/Payment%20of%20Water%20Bill/1.png", width: 1684, height: 1191 },
      { page: 13, title: "Payment platforms", src: "/Payment%20of%20Water%20Bill/2.png", width: 1684, height: 1191 },
    ],
  },
  "change-ball-valve": {
    title: "Change Ball Valve",
    description: "Request replacement of a defective ball valve with lockwing on your water connection.",
    requirements: ["Statement of Account or water bill", "Service connection details: account name, number, address, and location", "General Services Request Form from the TMCWD Customer Service Area"],
    steps: [
      { title: "Report the problem", detail: "Visit Customer Service or report the defective valve by phone, hotline, or social media. Staff record your account details and prepare the service request." },
      { title: "Pay for the replacement", detail: "Proceed to the cashier for the ball valve with lockwing. The cashier issues a sales invoice for release of the material." },
      { title: "Valve replacement", detail: "The Supplies Custodian releases the material to Construction and Maintenance, whose staff replace the defective valve." },
    ],
    fee: "Weighted average cost of the ball valve at payment, plus 10%",
    time: "3 hours and 25 minutes",
    pages: [14, 15],
  },
  "leak-repair": {
    title: "Leak Repair Request",
    description: "Report a leak in a main line or service line for assessment and repair.",
    requirements: ["Statement of Account or water bill", "Service connection details: account name, number, address, and location", "General Services Request Form from the TMCWD Customer Service Area"],
    steps: [
      { title: "Report the leak", detail: "Visit Customer Service or report the leak by phone, hotline, or social media. Staff document the request and create a Leak Repair Job Order." },
      { title: "Assessment and materials", detail: "Maintenance staff assess the leak and request the materials needed for repair. The Supplies Custodian releases them." },
      { title: "Repair and close the request", detail: "Maintenance staff repair the line and document the work. Customer Service closes the completed Job Order." },
    ],
    fee: "None listed",
    time: "8 hours and 35 minutes",
    pages: [16, 17],
    note: "The charter lists two hours for a service line leak and eight hours for a main line leak.",
  },
  "water-supply": {
    title: "Water Supply Operation",
    description: "Request investigation of dirty water, low or high pressure, unusual taste or odor, or no water supply.",
    requirements: ["Statement of Account or water bill", "Service connection details: account name, number, address, and location", "General Services Request Form from the TMCWD Customer Service Area"],
    steps: [
      { title: "Report the issue", detail: "Visit Customer Service or report the concern by phone, hotline, or social media. Staff document the request and create an inspection Job Order." },
      { title: "Site inspection", detail: "An inspection team checks the affected area and informs you of the findings." },
      { title: "Follow-up action", detail: "The charter lists flushing for water quality issues and a pumping-station check for pressure or no-water concerns." },
    ],
    fee: "None listed in the charter total",
    time: "4 hours and 15 minutes",
    pages: [18, 19],
    note: "The process also says to pay any necessary fee if applicable; no specific amount is given.",
  },
  "temporary-disconnection": {
    title: "Temporary Disconnection",
    description: "Request a voluntary temporary disconnection of your water service.",
    requirements: ["Service connection details: account name, number, address, and location", "Current or previous water bill, if available", "Other Services Request Form from the TMCWD Customer Service Area"],
    steps: [
      { title: "Request disconnection", detail: "Customer Service verifies your account and checks for an outstanding bill, then prepares the request form for your signature." },
      { title: "Settle any balance", detail: "If there is an unpaid water bill, pay it at the cashier and keep the Official Receipt." },
      { title: "Physical disconnection", detail: "Staff create a Job Order, disconnect the connection, and update your account once the work is completed." },
    ],
    fee: "Any unsettled water bill, if applicable",
    time: "55 minutes",
    pages: [22, 23],
  },
  reconnection: {
    title: "Reconnection Service",
    description: "Restore a temporarily disconnected water service after settling applicable bills and the reconnection fee.",
    requirements: ["Official Receipt", "General Services Request Form from the TMCWD Customer Service Area"],
    requirementsNote: "Bring your water bill or account details when requesting reconnection.",
    steps: [
      { title: "Verify the account", detail: "Customer Service checks the account status and payment details, then prepares the service request for your signature." },
      { title: "Pay at the cashier", detail: "Submit the request form and pay the reconnection fee, outstanding water bill, and any applicable charges. Keep the Official Receipt." },
      { title: "Reconnect the service", detail: "Maintenance staff physically reconnect the water service. Customer Accounts updates the account status after reconnection." },
    ],
    fee: "₱350 reconnection fee, plus outstanding water bill and other charges, if any",
    time: "28 minutes",
    pages: [20, 21],
  },
  "change-name-address": {
    title: "Change Name/Address",
    description: "Update the name or address on an active water service account.",
    requirements: ["Service connection details", "Land title, deed of sale, land award, or other proof of ownership or relationship to the owner", "Government-issued ID", "Other Services Request Form from TMCWD", "Current or previous water bill, if available", "HDMF authority to move in (one photocopy), where applicable"],
    steps: [
      { title: "Ask Customer Service", detail: "Present your bill or account details. Staff verify the account and prepare the request form for your signature." },
      { title: "Submit the documents", detail: "Give the signed form and required documents to the Customer Accounts Officer." },
      { title: "Account update", detail: "The officer checks the documents and updates the account information in the system." },
    ],
    fee: "None listed",
    time: "15 minutes",
    pages: [24, 25],
  },
  "change-meter": {
    title: "Change Meter Request",
    description: "Request replacement of a destroyed, worn-out, or defective water meter.",
    requirements: ["Service connection details: account name, number, address, and location", "Other Services Request Form from the TMCWD Customer Service Area", "Current or previous water bill, if available"],
    steps: [
      { title: "Request and inspection", detail: "Customer Service prepares your request. Customer Accounts creates a Job Order and Maintenance inspects the meter." },
      { title: "Payment and materials", detail: "After inspection, pay the assessed meter cost at the cashier. The Supplies Custodian releases the replacement meter." },
      { title: "Meter replacement", detail: "Maintenance installs the new meter and records its number. Customer Accounts updates your account." },
    ],
    fee: "Weighted average meter cost at payment, plus 10%, less accumulated meter maintenance fees paid",
    time: "4 hours and 27 minutes",
    pages: [26, 27, 28],
  },
  "senior-citizen-discount": {
    title: "Senior Citizen Discount",
    description: "Apply for the annual senior citizen discount on an eligible residential water account.",
    requirements: ["Senior Citizen Discount Availment Form", "Photocopy of valid Senior Citizen ID", "Recent picture (any size)", "Barangay clearance or proof of residence", "Authorization letter and representative’s government ID, if applying through a representative"],
    requirementsNote: "The charter requires the meter to have been registered in the senior citizen's name for one year, the senior citizen to live in the household, residential use, and consumption of no more than 30 cubic meters. It allows one discount per household and one discounted service connection per senior citizen. Present the valid Senior Citizen ID upon payment.",
    steps: [
      { title: "Complete the form", detail: "Get and fill out the Senior Citizen Discount Availment Form at Customer Service." },
      { title: "Submit requirements", detail: "Customer Service checks the documents and forwards the application for approval." },
      { title: "Account update", detail: "After approval, Customer Accounts registers the discount in the account system." },
    ],
    fee: "None listed",
    time: "17 minutes",
    pages: [31, 32],
  },
  feedback: {
    pageType: "informational",
    title: "Feedback & Complaints",
    description: "Send feedback or file a complaint through the channels listed in the TMCWD Citizen's Charter.",
    requirements: ["Facebook: TMCWD CMU Help Desk", "Email: tmcwd@yahoo.com or tmcwd98@gmail.com", "Hotline: 0917-805-0391 or (046) 419-2664", "In person: Public Assistance & Complaints Desk or Customer Service Area", "Written letter addressed to the Office of the General Manager"],
    requirementsNote: "A feedback form is available at the Public Assistance & Complaints Desk and can be placed in the Customer Service Area drop box.",
    steps: [
      { title: "Submit feedback or a complaint", detail: "Use the official Facebook page, email, hotline, visit the desk, or send a letter. Walk-in complaints are documented and signed by the complainant." },
      { title: "Investigation and response", detail: "Customer Service or the Office of the General Manager forwards complaints to the concerned division for investigation, then relays a response or findings." },
    ],
    highlights: [
      { label: "Contact TMCWD", title: "Choose a channel", detail: "Send a message, call the hotline, visit the assistance desk, or write to the Office of the General Manager." },
      { label: "What happens next", title: "Your concern is documented", detail: "Customer Service or the Office of the General Manager forwards complaints to the concerned division and relays its response or findings." },
      { label: "Feedback form", title: "Share your experience", detail: "You can complete a feedback form at the Public Assistance & Complaints Desk and place it in the Customer Service Area drop box." },
    ],
    pages: [44, 45, 46],
    note: "Contact information and procedures shown here are from the 2025 Citizen's Charter.",
  },
};

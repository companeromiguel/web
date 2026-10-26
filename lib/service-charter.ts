export interface SummaryCard {
  label: string;
  title: string;
  detail: string;
}

/* ── Charter table data types ─────────────────────────────────────────────── */

export interface ServiceInfoData {
  officeDivision: string;
  classification: string;
  typeOfTransaction: string;
  whoMayAvail: string;
}

export interface ChecklistRowData {
  requirement: string;
  whereToSecure: string;
}

export interface ProcessRowData {
  /** Text for the CLIENT STEPS cell. null = sub-row (cell covered by rowspan above). */
  clientStep: string | null;
  /** Rows this client-step cell spans. Set only on the first row of a group. */
  clientStepRowspan?: number;
  agencyAction: string;
  feesToBePaid: string;
  processingTime: string;
  personResponsible: string;
}

export interface CharterTables {
  serviceInfo: ServiceInfoData;
  checklist: ChecklistRowData[];
  process: ProcessRowData[];
  processTotalFees: string;
  processTotalTime: string;
  /** Optional extra table shown after the process table (e.g. Payment Platforms). */
  extraTable?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
}

/* ── Base service guide ───────────────────────────────────────────────────── */

interface ServiceGuideBase {
  title: string;
  description: string;
  requirements: string[];
  requirementsNote?: string;
  steps: { title: string; detail: string }[];
  pages: number[];
  note?: string;
  /** Structured charter table data — replaces sourcePages image references. */
  charterTables?: CharterTables;
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
    charterTables: {
      serviceInfo: {
        officeDivision:      "Customer Accounts and Services Division",
        classification:      "Simple Transaction",
        typeOfTransaction:   "G2C, G2B, G2G",
        whoMayAvail:         "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Valid ID with Signature (photocopy with specimen signature)",            whereToSecure: "1. BIR, Post Office, DFA, PSA, SSS, GSIS, Pag-Ibig, LTO, PHIC, Comelec, OWWA, other government agency that issues Identification Card" },
        { requirement: "2. Barangay permit for water installation (original, photocopy)",           whereToSecure: "2. Barangay hall where the property is located" },
        { requirement: "3. Official receipt or water bill of neighbor (photocopy)",                 whereToSecure: "3. Any neighbor near the house/establishment being applied" },
        { requirement: "4. Proof of billing with the same address",                                 whereToSecure: "4. Concessionaire" },
        { requirement: "5. Move in/title/deed of sale (photocopy)",                                 whereToSecure: "5. Developer of subdivision/personal record" },
        { requirement: "6. Certification from NHA Dasmariñas (NHA Housing Project)",               whereToSecure: "6. NHA Dasmariñas" },
        { requirement: "7. Certification from Crame (AFP/PNP Personnel)",                          whereToSecure: "7. Crame" },
        { requirement: "8. HOA Certification",                                                      whereToSecure: "8. HOA Office where house is situated" },
        { requirement: "9. Authorization letter from the owner (Renter/Representative)",            whereToSecure: "9. Owner of resident/establishment" },
        { requirement: "10. Valid ID of authorized person with signature",                          whereToSecure: "10. Any government office that issue ID" },
        { requirement: "11. Business Permit (Commercial)",                                          whereToSecure: "11. From City Hall - Treasurer's Office" },
        { requirement: "12. Contract to Lease (Commercial)",                                        whereToSecure: "12. From owner of establishment" },
        { requirement: "13. Request letter for additional water meter",                             whereToSecure: "13. From owner of residential house/establishment" },
        { requirement: "14. Building Permit",                                                       whereToSecure: "14. From City Hall - City Engineer's Office" },
        { requirement: "15. Location Map",                                                          whereToSecure: "15. From applicant/drawing" },
        { requirement: "16. Contract number and email address",                                     whereToSecure: "16. From applicant" },
      ],
      process: [
        {
          clientStep:          "1. Fall in line thru the use of seating arrangement",
          agencyAction:        "1. Queuing in the form of line",
          feesToBePaid:        "None",
          processingTime:      "1 minute",
          personResponsible:   "Customer Service Assistant for New Water Application",
        },
        {
          clientStep:          "2. Proceed to Customer Service Assistant once you are first in line. Concessionaires provide the necessary requirements for the water service application.",
          clientStepRowspan:   2,
          agencyAction:        "2.a The Customer Service Assistant will request the submission of requirements for a new application and verify the accuracy and completeness of the submitted documents.",
          feesToBePaid:        "None",
          processingTime:      "10 minutes",
          personResponsible:   "Customer Service Assistant for New Water Application",
        },
        {
          clientStep:          null,
          agencyAction:        "2.b After confirming that all requirements are complete, the CSA will transmit the documents to the Customer Accounts Officer and prepare New Connection Job Order for inspection of Construction and Maintenance Division.",
          feesToBePaid:        "None",
          processingTime:      "5 minutes",
          personResponsible:   "Customer Accounts Officer",
        },
        {
          clientStep:          "3. Concessionaire will wait for the inspection of their applied account",
          clientStepRowspan:   3,
          agencyAction:        "3.a The Inspector or Maintenance personnel will visit the applicant's address to conduct an inspection and assess the materials required for the tapping. The details of the estimate will then be recorded on the Inspection Slip.",
          feesToBePaid:        "None",
          processingTime:      "2 hours",
          personResponsible:   "Inspector/Maintenance Man",
        },
        {
          clientStep:          null,
          agencyAction:        "3.b Inspection slip will be submitted to CAO. CAO will retrieve the Job Order and encode the necessary list of fees and materials. After updating the Job Order, the client will be informed of the total amount due. Both the Kasunduan Para sa Pagpapakabit ng Tubig and the Service and Construction Order will be presented and explained to the customer for their signature. Once signed, payment will be ready to proceed.",
          feesToBePaid:        "None",
          processingTime:      "10 minutes",
          personResponsible:   "Customer Accounts Officer",
        },
        {
          clientStep:          null,
          agencyAction:        "3.c Customer Accounts Officer will reach out to the applicant via their provided contact details to inform them that the water application is ready for payment.",
          feesToBePaid:        "None",
          processingTime:      "2 minutes",
          personResponsible:   "Customer Accounts Officer",
        },
        {
          clientStep:          "4. Fall in line thru the use of seating arrangement",
          agencyAction:        "4. Queuing in the form of line for payment",
          feesToBePaid:        "None",
          processingTime:      "1 minute",
          personResponsible:   "Customer Service Assistant",
        },
        {
          clientStep:          "5. Proceed to the Cashier once you are first in line, pay the necessary fees for new service application.",
          clientStepRowspan:   3,
          agencyAction:        "5.a Cashier will receive payment for the new application and issue the official receipt for the payment made by client",
          feesToBePaid:        "Estimated amount of Php5,000 and above",
          processingTime:      "5 minutes",
          personResponsible:   "Cashier",
        },
        {
          clientStep:          null,
          agencyAction:        "5.b Cashier will notify the Customer Accounts Officer once the payment has been completed. CAO will update the Job Order status to \"For Installation\" and forward the List of Material for Tapping/Inspection Slip and Xerox copy of OR to Supplies Custodian",
          feesToBePaid:        "None",
          processingTime:      "18 minutes",
          personResponsible:   "Customer Accounts Officer",
        },
        {
          clientStep:          null,
          agencyAction:        "5.c Supplies Custodian shall get and release the materials needed including the job order and forward it to Maintenance Men. Maintenance men sign a log book for proof of receipt of materials and job order",
          feesToBePaid:        "None",
          processingTime:      "2 minutes",
          personResponsible:   "Supplies Custodian, Maintenance Men",
        },
        {
          clientStep:          "6. Assist the maintenance man in locating the area of the water installation",
          agencyAction:        "6. Maintenance men shall install new water meter taking note of the meter number. Job order will be returned to Customer Accounts Officer for closing of transaction and recording of meter number",
          feesToBePaid:        "None",
          processingTime:      "8 hours",
          personResponsible:   "Maintenance Men, Customer Accounts Officer",
        },
      ],
      processTotalFees: "Estimated amount of Php5,000 and above",
      processTotalTime: "10 hours and 54 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. None", whereToSecure: "1. None" },
      ],
      process: [
        {
          clientStep:        "1. Client must be aware of the schedule of reading days in their area, reading is done once a month",
          agencyAction:      "1. Meter readers will read the water consumption of each meter of the concessionaire.",
          feesToBePaid:      "None",
          processingTime:    "3 minutes",
          personResponsible: "Meter Reader",
        },
        {
          clientStep:        "2. Receive the Statement of Account from the meter reader, double check the necessary data in the SOA including the reading of water meter, the client can be double check it especially if he/she has questions in their consumption. Check also due date so that it will not incur penalty.",
          agencyAction:      "2. Statement of Account will be given once printed by the Meter Reader. For accounts with normal consumption, it will be given during the reading. As per accounts with findings (with sudden increase or decrease in consumption) it shall be given the same or the following day.",
          feesToBePaid:      "None",
          processingTime:    "2 minutes",
          personResponsible: "Meter Reader",
        },
      ],
      processTotalFees: "None",
      processTotalTime: "5 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Statement of account or water bill",  whereToSecure: "1. SOA issued to customer during reading" },
        { requirement: "2 Old receipts in absence of SOA",       whereToSecure: "2 Personal copy of customer" },
      ],
      process: [
        {
          clientStep:        "1. Move to the Cashier area and take a seat in the designated seating arrangement to maintain the queue.",
          agencyAction:      "None",
          feesToBePaid:      "None",
          processingTime:    "1 minute",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        "2. Proceed to the Cashier once you are first in line and give your Statement of Account to the cashier. If SOA is not available, provide complete name and address of account.",
          agencyAction:      "2. Cashier will receive the payment for water bill and issue the Official Receipt",
          feesToBePaid:      "Php 170.00 and above.",
          processingTime:    "7 minutes",
          personResponsible: "Cashier",
        },
        {
          clientStep:        "3. Check the accuracy of the Official Receipt issued and count the change, if there are any",
          agencyAction:      "",
          feesToBePaid:      "None",
          processingTime:    "",
          personResponsible: "",
        },
      ],
      processTotalFees: "Php 170.00 and above.",
      processTotalTime: "7 Minutes",
      extraTable: {
        caption: "TABLE 2. Payment Platforms",
        headers: ["Platform", "Location", "Schedule of Availability"],
        rows: [
          [
            "1. TMCWD Cashier (On-site)",
            "2nd Floor, Trece Martires City Water District, Brgy. San Agustin, Trece Martires City, Cavite",
            "8:00 AM to 4:30 PM, Monday to Friday except Holidays",
          ],
          [
            "2. ECPAY Collecting Partners",
            "Nationwide thru 7-11, Cebuana Lhuillier, Home Credit, Tambunting, Palaway Pay",
            "Store Hours",
          ],
          [
            "3. Online Payment Partners",
            "Nationwide thru GCash",
            "Online thru the downloadable mobile application",
          ],
        ],
      },
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Statement of account or water bill",                                                                          whereToSecure: "1. SOA issued to customer during reading" },
        { requirement: "2. Information of service connection such as Account Name, Account Number, Address, Location",                   whereToSecure: "2. Customer Service Area, 2nd Floor, TMCWD Building" },
        { requirement: "3. Service Request Form - General Services (1 original)",                                                        whereToSecure: "3. Customer Service Area, 2nd Floor, TMCWD Building" },
      ],
      process: [
        {
          clientStep:        "1.a Proceed to the Customer Service Area",
          clientStepRowspan: 3,
          agencyAction:      "1.a Receive the request for change ball valve with lockwing and interview the concessionaire for the details of the account",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Services Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.b Answer the message or call promptly. Interview and ask the concessionaire regarding the details of the request",
          feesToBePaid:      "",
          processingTime:    "",
          personResponsible: "",
        },
        {
          clientStep:        null,
          agencyAction:      "1.c Prepare the Service Request Form - General Services. Forward the request to Construction and Maintenance.",
          feesToBePaid:      "None",
          processingTime:    "10 minutes",
          personResponsible: "Customer Services Assistant",
        },
        {
          clientStep:        "2. Proceed to the cashier area to complete the payment process for the ball valve with lockwing",
          clientStepRowspan: 3,
          agencyAction:      "2.a Issue Sales Invoice corresponding to the inspection slip. Forward the xerox copy of Sales invoice to Supplies Custodian for releasing of materials.",
          feesToBePaid:      "Weighted average cost of ball valve at the time of payment plus 10%",
          processingTime:    "5 minutes",
          personResponsible: "Cashier",
        },
        {
          clientStep:        null,
          agencyAction:      "2.b Release the lockwing to the Construction and Maintenance Division",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Supplies Custodian",
        },
        {
          clientStep:        null,
          agencyAction:      "2.c Acknowledge release of materials and proceed to the replacement of defective ball valve with lockwing to address the service request.",
          feesToBePaid:      "None",
          processingTime:    "3 hours",
          personResponsible: "Water Maintenance Man",
        },
      ],
      processTotalFees: "Weighted average cost of ball valve at the time of payment plus 10%",
      processTotalTime: "3 hours and 25 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Statement of account or water bill",                                                                        whereToSecure: "1. SOA issued to customer during reading" },
        { requirement: "2. Information of service connection such as Account Name, Account Number, Address, Location",                 whereToSecure: "2. Customer Service Area, 2nd Floor, TMCWD Building" },
        { requirement: "3. Service Request Form - General Services (1 original)",                                                      whereToSecure: "3. Customer Service Area, 2nd Floor, TMCWD Building" },
      ],
      process: [
        {
          clientStep:        "1.a Proceed to the Customer Service Area",
          clientStepRowspan: 4,
          agencyAction:      "1.a Interview and ask the concessionaire regarding the details the account",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Services Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.b Answer the message or call promptly. Interview and ask the concessionaire regarding the details of the request",
          feesToBePaid:      "",
          processingTime:    "",
          personResponsible: "",
        },
        {
          clientStep:        null,
          agencyAction:      "1.c Prepare the Service Request Form - General Services and create Leak Repair Job Order. Forward the request and Job Order to Construction and Maintenance Division.",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.d Assess the service request and fill up the Requisition and Issue Slip with the materials needed for the repair of leak. Forward the RIS to Supplies Custodian.",
          feesToBePaid:      "None",
          processingTime:    "10 minutes",
          personResponsible: "Water Maintenance Man",
        },
        {
          clientStep:        "2. Assist the Water Maintenance Man in locating the area of the leak",
          clientStepRowspan: 3,
          agencyAction:      "2.b Release the materials needed in accordance to the RIS",
          feesToBePaid:      "None",
          processingTime:    "10 minutes",
          personResponsible: "Supplies Custodian",
        },
        {
          clientStep:        null,
          agencyAction:      "2.c Acknowledge release of materials and proceed to the leak repair to address the service request. Accomplish the Job Order with full documentation and submit the JO to Customer Services Assistant. Service Line Leak - 2 hours\nMain Line Leak - 8 hours",
          feesToBePaid:      "None",
          processingTime:    "8 hours",
          personResponsible: "Water Maintenance Man",
        },
        {
          clientStep:        null,
          agencyAction:      "2.d Acknowledge the accomplished JO and close the Job Order in the system",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Services Assistant",
        },
      ],
      processTotalFees: "None",
      processTotalTime: "8 hours and 35 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Statement of account or water bill",                                                                        whereToSecure: "1. SOA issued to customer during reading" },
        { requirement: "2. Information of service connection such as Account Name, Account Number, Address, Location",                 whereToSecure: "2. Customer Service Area, 2nd Floor, TMCWD Building" },
        { requirement: "3. Service Request Form - General Services (1 original)",                                                      whereToSecure: "3. Customer Service Area, 2nd Floor, TMCWD Building" },
      ],
      process: [
        {
          clientStep:        "1.a Proceed to the Customer Service Area",
          clientStepRowspan: 3,
          agencyAction:      "1.a Interview and ask the concessionaire regarding the details of the request",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Services Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.b Answer the message or call promptly. Interview and ask the concessionaire regarding the details of the request",
          feesToBePaid:      "",
          processingTime:    "",
          personResponsible: "",
        },
        {
          clientStep:        null,
          agencyAction:      "1.c Prepare the Service Request Form - General Services and create Job Order for inspection. Forward the request and Job Order to Construction and Maintenance Division for dispatch of Inspection Team.",
          feesToBePaid:      "None",
          processingTime:    "10 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        "2. Assist the Inspection Team",
          agencyAction:      "2. Site inspection in the concerned area. Inform the concessionaire on the results of the inspection.",
          feesToBePaid:      "None",
          processingTime:    "4 hours",
          personResponsible: "Water Maintenance Man, Pump Operator, Cashier",
        },
        {
          clientStep:        "3. Proceed to cashier and pay necessary fee if there are any",
          agencyAction:      "3. For Water Quality Issue: Flushing activity in the service area will be performed.\nFor Low/High Pressure/No Water: Pump operator will check if the pumping station in area is operational",
          feesToBePaid:      "None",
          processingTime:    "",
          personResponsible: "",
        },
      ],
      processTotalFees: "None",
      processTotalTime: "4 hours and 15 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Information of service connection such as Account Name, Account Number, Address, Location", whereToSecure: "1. Customer Service Area, 2nd Floor, TMCWD Building" },
        { requirement: "2. Current/Previous Water Bill (if available)",                                                whereToSecure: "2. Concessionaire" },
        { requirement: "3. Service Request Form - Other Services",                                                     whereToSecure: "3. Customer Service Area, 2nd Floor, TMCWD Building" },
      ],
      process: [
        {
          clientStep:        "1. Proceed to Customer Service Assistant once your first in line. Present water bill, or other information needed for the request",
          clientStepRowspan: 2,
          agencyAction:      "1.a Customer Service Assistant will ask for the details of the concessionaire's account. Verify the status of the account in the system and check if there is unsettled bill. Concessionaire shall pay first the balance or unsettled bill",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.b Prepare and fill out Service Request Form - Other Services and have it signed by the concessionaire.",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        "2. Proceed to the Cashier once you are first in line. Submit the Service Request Form and settle any outstanding water bills, if applicable",
          clientStepRowspan: 4,
          agencyAction:      "2.a Cashier will receive payment for the unsettled bill and issue the official receipt for the payment made by client. Cashier will forward the xerox copy of the Official Receipt and Service Request Form to Customer Accounts Officer.",
          feesToBePaid:      "Unsettled bill if applicable",
          processingTime:    "7 minutes",
          personResponsible: "Cashier",
        },
        {
          clientStep:        null,
          agencyAction:      "2.b Customer Accounts Officer will create a Temporary Disconnection Job Order based on the Service Request and forward to Construction and Maintenance Division for disconnection of water service",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Accounts Officer",
        },
        {
          clientStep:        null,
          agencyAction:      "2.c Disconnect the water service connection by applying a bolt seal or twist seal, then submit the finalized Job Order to the Customer Accounts Officer for processing.",
          feesToBePaid:      "None",
          processingTime:    "30 minutes",
          personResponsible: "Maintenance Men, Meter Reader",
        },
        {
          clientStep:        null,
          agencyAction:      "2.d Update concessionaires' information on the system upon receipt of accomplished job order",
          feesToBePaid:      "None",
          processingTime:    "3 minutes",
          personResponsible: "Customer Accounts Officer",
        },
      ],
      processTotalFees: "Unsettled bill if applicable",
      processTotalTime: "55 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Official Receipt",                      whereToSecure: "1. None" },
        { requirement: "2. Service Request Form - General Services", whereToSecure: "2. Customer Service Area, 2nd Floor, TMCWD Building" },
      ],
      process: [
        {
          clientStep:        "1. Proceed to Customer Service Assistant once your first in line. Present water bill, or other information needed for the request for reconnection.",
          clientStepRowspan: 2,
          agencyAction:      "1.a Customer Service Assistant will ask for the details of the concessionaire's account. Verify the status of the account in the system and inform the concessionaire regarding the payment details.",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.b Prepare and fill out Service Request Form - General Services and have it signed by the concessionaire.",
          feesToBePaid:      "None",
          processingTime:    "3 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        "2. Proceed to the Cashier once you are first in line. Submit the Service Request Form and pay the necessary water bill and fees for reconnection.",
          clientStepRowspan: 4,
          agencyAction:      "2.a Cashier will receive payment for the reconnection and water bill and issue the official receipt for the payment made by client. Cashier will forward the xerox copy of the Official Receipt and Service Request Form to Customer Accounts Officer.",
          feesToBePaid:      "Reconnection Fee - Php350.00 plus outstanding water bill balance and other charges if there are any.",
          processingTime:    "7 minutes",
          personResponsible: "Cashier",
        },
        {
          clientStep:        null,
          agencyAction:      "2.b Customer Accounts Officer will create a Reconnection Job Order and forward it to Maintenance men for Reconnection.",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Accounts Officer",
        },
        {
          clientStep:        null,
          agencyAction:      "2.c Maintenance Men will reconnect the water service.",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Maintenance Man",
        },
        {
          clientStep:        null,
          agencyAction:      "2.c Maintenance Men will return the Job Order to the CAO once reconnection is done. CAO will then change the status of the account in the system only if the water service is physically connected.",
          feesToBePaid:      "None",
          processingTime:    "3 minutes",
          personResponsible: "Customer Accounts Officer, Maintenance Man",
        },
      ],
      processTotalFees: "Reconnection Fee - Php350.00 plus outstanding water bill balance and other charges if there are any.",
      processTotalTime: "28 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Information of service connection such as Account Name, Account Number, Address, Location", whereToSecure: "1. Concessionaire" },
        { requirement: "2. Land Title/Deed of Sale/Land Award or any proof of ownership/proof of relationship to the owner", whereToSecure: "2. Concessionaire/Local Assessor's Office" },
        { requirement: "3. Government Issued ID",                                                                        whereToSecure: "3. BIR, Post Office, DFA, PSA, SSS, GSIS, Pag-Ibig, LTO, PHIC, Comelec, OWWA" },
        { requirement: "4. Service Request Form - Other Services",                                                       whereToSecure: "4. Customer Service Area, 2nd Floor, TMCWD Building" },
        { requirement: "5. Current/Previous Water Bill (if available)",                                                  whereToSecure: "5. Concessionaire" },
        { requirement: "6. Authority to move in from HDMF (1 photocopy)",                                               whereToSecure: "6. HDMF" },
      ],
      process: [
        {
          clientStep:        "1. Proceed to Customer Service Assistant once your first in line. Present water bill, or other information needed for the request",
          clientStepRowspan: 2,
          agencyAction:      "1.a Customer Service Assistant will ask for the details of the concessionaire's account. Verify the status of the account in the system.",
          feesToBePaid:      "None",
          processingTime:    "3 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.b Prepare and fill out Service Request Form - Other Services and have it signed by the concessionaire. Inform the concessionaire regarding the requirements",
          feesToBePaid:      "None",
          processingTime:    "2 minutes",
          personResponsible: "Customer Accounts Officer",
        },
        {
          clientStep:        "2. Proceed to the Customer Accounts Officer and submit the Service Request Form and all the necessary requirements",
          agencyAction:      "2.a Accept Service Request Form and verify the submitted requirements. Update in the information in the system according to the service request",
          feesToBePaid:      "None",
          processingTime:    "10 minutes",
          personResponsible: "Customer Accounts Officer",
        },
      ],
      processTotalFees: "None",
      processTotalTime: "15 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Information of service connection such as Account Name, Account Number, Address, Location", whereToSecure: "1. Concessionaire" },
        { requirement: "2. Service Request Form - Other Services",                                                     whereToSecure: "2. Customer Service Area, 2nd Floor, TMCWD Building" },
        { requirement: "3. Current/Previous Water Bill (if available)",                                                whereToSecure: "3. Concessionaire" },
      ],
      process: [
        {
          clientStep:        "1. Proceed to Customer Service Assistant once your first in line. Present water bill, or other information needed for the request",
          clientStepRowspan: 2,
          agencyAction:      "1.a Customer Service Assistant will ask for the details of the concessionaire's account. Verify the status of the account in the system.",
          feesToBePaid:      "None",
          processingTime:    "3 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "1.b Prepare and fill out Service Request Form - Other Services and have it signed by the concessionaire. Inform the concessionaire regarding the requirements",
          feesToBePaid:      "None",
          processingTime:    "2 minutes",
          personResponsible: "Customer Accounts Officer",
        },
        {
          clientStep:        "2. Proceed to the Customer Accounts Officer and submit the Service Request Form and all the necessary requirements",
          clientStepRowspan: 2,
          agencyAction:      "2.a Accept Service Request Form and verify the submitted requirements. Customer Accounts Officer will create a Change Meter Job Order based on the Service Request and forward it to Construction and Maintenance Division for inspection",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Accounts Officer",
        },
        {
          clientStep:        null,
          agencyAction:      "2.b Inspect and validate the change meter request job order.",
          feesToBePaid:      "None",
          processingTime:    "2 hours",
          personResponsible: "Maintenance Men",
        },
        {
          clientStep:        "3. Proceed to the cashier area to complete the payment process for the water meter",
          clientStepRowspan: 4,
          agencyAction:      "3.a Issue Sales Invoice. Forward the xerox copy of Sales invoice to Supplies Custodian for releasing of water meter.",
          feesToBePaid:      "Weighted average cost of the water meter at the time of payment, plus an additional 10%, minus the total accumulated water meter maintenance fees paid by the concessionaire",
          processingTime:    "7 minutes",
          personResponsible: "Cashier",
        },
        {
          clientStep:        null,
          agencyAction:      "3.b Receive xerox copy of Sales Invoice and release water meter to Maintenance Men for installation",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Supplies Custodian",
        },
        {
          clientStep:        null,
          agencyAction:      "3.c Install water meter and remove old water meter replacement. Record the meter number of the newly installed water meter and forward it to Customer Accounts Officer",
          feesToBePaid:      "None",
          processingTime:    "2 hours",
          personResponsible: "Maintenance Men",
        },
        {
          clientStep:        null,
          agencyAction:      "3.d Update the system to reflect the new water meter number by recording it in the account information of the concessionaire",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Accounts Officer",
        },
      ],
      processTotalFees: "Weighted average cost of the water meter at the time of payment, plus an additional 10%, minus the total accumulated water meter maintenance fees paid by the concessionaire",
      processTotalTime: "4 hours and 27 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "1. Senior Citizen Discount Availment Form (1 original)",                                          whereToSecure: "1. Customer Services Area, 2nd Floor, TMCWD Building" },
        { requirement: "2. Valid Senior Citizen ID (1 photocopy)",                                                        whereToSecure: "2. Senior Citizen Concessionaire" },
        { requirement: "3. Latest Picture (any size, 1 original)",                                                        whereToSecure: "3. Senior Citizen Concessionaire" },
        { requirement: "4. Barangay Clearance/Proof of residence",                                                        whereToSecure: "4. Barangay Hall of concessionaire's residence" },
        { requirement: "5. Authorization Letter (if applying through representative)",                                     whereToSecure: "5. Senior Citizen Concessionaire" },
        { requirement: "6. Government Issued ID of the representative (if applying through representative, 1 photocopy)", whereToSecure: "6. BIR, Post Office, DFA, PSA, SSS, GSIS, Pag-Ibig, LTO, PHIC, Comelec, OWWA, other government agency that issues ID" },
        { requirement: "Conditions: 1. Water meter registration should be in the name of the senior citizen for a period of 1 year. 2. The Senior Citizen must be a resident of the household. 3. Consumption should not exceed 30 cubic meter to avail the discount. 4. Discount is granted per household regardless of the number of Senior Citizens living therein. 5. A Senior Citizen can only avail of one service connection discount. 6. Water connection must be residential. 7. Valid Senior Citizen ID must be presented upon payment.", whereToSecure: "7. Customer Services Area, 2nd Floor, TMCWD Building" },
      ],
      process: [
        {
          clientStep:        "1. Proceed to the Customer Service Area and fill up the Senior Citizen Discount Availment Form",
          agencyAction:      "1. Provide Senior Citizen Discount Availment Form with the list of requirements and discuss to the client on how to avail the discount",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        "2. Submit the form together with the requirements",
          clientStepRowspan: 3,
          agencyAction:      "2. Accept and check the completeness of the Senior Citizen Discount Availment Form and the necessary requirements. Record the application to the Logbook of Service Request and submit to the CASD head for approval of the application",
          feesToBePaid:      "None",
          processingTime:    "5 minutes",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        null,
          agencyAction:      "2.b Approve the application of the concessionaire and forward to Customer Accounts Officer",
          feesToBePaid:      "None",
          processingTime:    "3 minutes",
          personResponsible: "CASD Head",
        },
        {
          clientStep:        null,
          agencyAction:      "2.c Register and update the concessionaire's account in the system.",
          feesToBePaid:      "None",
          processingTime:    "4 minutes",
          personResponsible: "Customer Accounts Officer",
        },
      ],
      processTotalFees: "None",
      processTotalTime: "17 minutes",
    },
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
    charterTables: {
      serviceInfo: {
        officeDivision:    "Customer Accounts and Services Division",
        classification:    "Simple",
        typeOfTransaction: "G2C, G2B, G2G",
        whoMayAvail:       "Concessionaires/client of Trece Martires City Water District",
      },
      checklist: [
        { requirement: "Facebook: TMCWD CMU Help Desk (https://www.facebook.com/tmcwdCMUHelpDesk)", whereToSecure: "Direct message through official Facebook Page" },
        { requirement: "Email: tmcwd@yahoo.com or tmcwd98@gmail.com",                               whereToSecure: "Electronic mail" },
        { requirement: "Written letter to the Office of the General Manager",                        whereToSecure: "Endorsed to the secretary of the OGM" },
        { requirement: "Feedback Form at the PACD drop box (Customer Services Area)",               whereToSecure: "Public Assistance & Complaints Desk (PACD)" },
        { requirement: "Hotlines: 0917-805-0391 and landline (046) 419-2664",                       whereToSecure: "Call or text" },
      ],
      process: [
        {
          clientStep:        "Submit feedback or a complaint",
          agencyAction:      "Through Official Facebook Page: Dedicated Customer Services Assistant checks and answers all Facebook messages before the day ends and will be endorsed to the Management or to the concerned Division. Through electronic mail: CSA will collate feedbacks for documentation and endorsed the documents to the Office of the General Manager.",
          feesToBePaid:      "None",
          processingTime:    "",
          personResponsible: "Customer Service Assistant",
        },
        {
          clientStep:        "File a complaint (walk-in)",
          agencyAction:      "Walk-in concessionaires may file complaint personally to the PACD Officer on duty who will document the concessionaire's statement. The personnel will then print and let the concessionaire sign the printed complaint. Submit written complaint to PACD Officer addressed to the General Manager, which will be endorsed to the secretary of the OGM.",
          feesToBePaid:      "None",
          processingTime:    "",
          personResponsible: "PACD Officer",
        },
        {
          clientStep:        "Investigation and response",
          agencyAction:      "CSA checks all FB messages, records and initially verifies complaints. Initially verified complaints will be endorsed to the concerned Division. The concerned division will conduct investigation and provide appropriate response. The CSA will then update/respond to the complaint of the concessionaire.",
          feesToBePaid:      "None",
          processingTime:    "",
          personResponsible: "Customer Service Assistant, Concerned Division",
        },
      ],
      processTotalFees: "None",
      processTotalTime: "Varies by channel",
      extraTable: {
        caption: "Contact Information — CCB, PCC, ARTA",
        headers: ["Agency", "Channel", "Details"],
        rows: [
          ["Contact Center ng Bayan (CCB)", "Mag-text sa", "0908-881-6565 (Lunes–Biyernes, 8am–5pm)"],
          ["Presidential Complaints Center (PCC)", "E-mail", "pcc@malacanang.gov.ph"],
          ["Presidential Complaints Center (PCC)", "Postal Office", "PCC Official address: Bahay Ugnayan, J.P. Laurel Street, Malacañang, Manila"],
          ["Presidential Complaints Center (PCC)", "Fax", "(02)-8736-8621"],
          ["Presidential Complaints Center (PCC)", "Tumawag sa", "(02)-8736-8645 / (02)-8736-8603 / (02)-8736-8629 / (02)-8736-8621"],
          ["Anti-Red Tape Authority (ARTA)", "Tumawag sa", "(02)-8478-5091 / (02)-8478-5093 / (02)-8478-5099"],
        ],
      },
    },
  },
};

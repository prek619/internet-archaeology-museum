import "dotenv/config";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const db = new PrismaClient({ adapter });

const artifacts = [
  {
    exhibitSequence: 1,
    exhibitNumber: "Exhibit #0001",
    name: "The Disposable Boomerang",
    releaseYear: 2012,
    inventor: "Gerald Finch",
    purpose: "A boomerang designed for single use.",
    failureReason: "This was later recognized as \"a stick.\"",
    historicalImpact: "Negligible.",
    curatorNote:
      "This exhibit has been handled by four curators. Two requested transfers.",
    status: "DISCONTINUED" as const,
  },
  {
    exhibitSequence: 2,
    exhibitNumber: "Exhibit #0002",
    name: "The Reverse Umbrella",
    releaseYear: 1999,
    inventor: "Dr. Patricia Wole",
    purpose: "Collect rain instead of blocking it.",
    failureReason: "Researchers eventually realized they had invented a bucket.",
    historicalImpact: "Negligible.",
    curatorNote: "Patent dispute lasted longer than the product.",
    status: "DISCONTINUED" as const,
  },
  {
    exhibitSequence: 3,
    exhibitNumber: "Exhibit #0003",
    name: "The Wireless Extension Cord",
    releaseYear: 2016,
    inventor:
      "Unknown. Three teams claimed credit. All three later denied it.",
    purpose: "Freedom from wires.",
    failureReason:
      "Scientists spent six years trying to understand the proposal.",
    historicalImpact:
      "Redefined the lower boundary of viable crowdfunding campaigns.",
    curatorNote:
      "The prototype is stored offsite. No one has gone to retrieve it.",
    status: "ON_LOAN" as const,
  },
  {
    exhibitSequence: 4,
    exhibitNumber: "Exhibit #0004",
    name: "The Pet Fish Dryer",
    releaseYear: 2010,
    inventor: "Marcus Blint",
    purpose: "Dry wet fish.",
    failureReason:
      "Extensive customer feedback indicated a fundamental misunderstanding of fish.",
    historicalImpact: "Negligible.",
    curatorNote: "Three units were sold. We have accounted for two.",
    status: "DISCONTINUED" as const,
  },
  {
    exhibitSequence: 5,
    exhibitNumber: "Exhibit #0005",
    name: "Bluetooth Socks",
    releaseYear: 2011,
    inventor: "Dr. Yuen Parris, Institute of Textile Connectivity",
    purpose: "Ensure the left and right sock remained paired at all times.",
    failureReason: "Users continued losing exactly one sock.",
    historicalImpact:
      "The product correctly identified the missing sock problem. It offered no guidance on where they had gone.",
    curatorNote:
      "The last known paired set is on display. The left sock is a reproduction.",
    status: "DISCONTINUED" as const,
  },
  {
    exhibitSequence: 6,
    exhibitNumber: "Exhibit #0006",
    name: "The USB Banana Warmer",
    releaseYear: 2004,
    inventor: "Prof. Dale Hutchins",
    purpose: "Keep bananas at optimal operating temperature.",
    failureReason:
      "Bananas already possess satisfactory thermal characteristics.",
    historicalImpact:
      "Researchers described it as \"a solution searching desperately for a problem.\" The search was unsuccessful.",
    curatorNote:
      "The device still functions. The banana it came with does not.",
    status: "ACTIVE" as const,
  },
  {
    exhibitSequence: 7,
    exhibitNumber: "Exhibit #0007",
    name: "The Indoor Sundial",
    releaseYear: 2009,
    inventor: "Frederick Oast",
    purpose: "Tell the time indoors, using sunlight.",
    failureReason:
      "Required a window. If a window was available, the user could look outside and determine it was daytime, which was considered sufficient.",
    historicalImpact: "Negligible.",
    curatorNote:
      "This exhibit has no moving parts. It also has no fixed parts. Its current form is under discussion.",
    status: "DISCONTINUED" as const,
  },
  {
    exhibitSequence: 8,
    exhibitNumber: "Exhibit #0008",
    name: "The Calorie Counter Fork",
    releaseYear: 2014,
    inventor: "NutriTech Solutions (dissolved 2014)",
    purpose:
      "Count calories as the user ate by measuring fork velocity and bite frequency.",
    failureReason:
      "Clinical trials found users simply ate faster. Average weight across the trial group increased. The fork was not consulted about the findings.",
    historicalImpact:
      "Cited once, in a footnote, in a paper about something else.",
    curatorNote:
      "The fork has been weighed. Results were not shared with the fork.",
    status: "DESTROYED" as const,
  },
  {
    exhibitSequence: 9,
    exhibitNumber: "Exhibit #0009",
    name: "The Offline Social Network",
    releaseYear: 2013,
    inventor: "Commune Dynamics LLC",
    purpose:
      "A social networking platform with no internet connection. Users updated their status by mailing a postcard to a central processing office in Delaware.",
    failureReason: "Delaware did not respond.",
    historicalImpact: "Negligible. Delaware has not commented.",
    curatorNote:
      "Several postcards are still in transit. We are monitoring the situation.",
    status: "ACTIVE" as const,
  },
  {
    exhibitSequence: 10,
    exhibitNumber: "Exhibit #0010",
    name: "The Transparent Briefcase",
    releaseYear: 2007,
    inventor: "ClearCarry International",
    purpose:
      "Eliminate the need to search through a briefcase by making all contents visible at all times.",
    failureReason:
      "Users reported feeling observed. A focus group described it as \"aggressively honest.\" Sales staff described the feedback as unexpected.",
    historicalImpact:
      "Sparked a minor philosophical debate within the luggage industry that was never resolved and is no longer discussed.",
    curatorNote:
      "The museum's own transparent briefcase is on display. It is empty. This was not a curatorial decision.",
    status: "DISCONTINUED" as const,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing artifacts to allow re-seeding cleanly
  await db.artifact.deleteMany({});
  await db.visitorCount.deleteMany({});

  for (const artifact of artifacts) {
    await db.artifact.create({ data: artifact });
    console.log(`  Created: ${artifact.exhibitNumber} — ${artifact.name}`);
  }

  // Initialise visitor counter
  await db.visitorCount.create({ data: { count: 47291 } });

  console.log(`\nDone. ${artifacts.length} artifacts seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

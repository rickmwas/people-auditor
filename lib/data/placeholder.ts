// Placeholder data for counties, exposes, and national metrics

export const nationalMetrics = {
  debt: 11500000000000, // KSh 11.5 Trillion
  debtLastUpdated: new Date('2025-12-01'),
  budget2024: 3500000000000, // KSh 3.5 Trillion
  gdp: 115000000000000, // KSh 115 Trillion
  population: 56500000,
};

export const counties = [
  {
    slug: 'nairobi',
    name: 'Nairobi',
    code: '047',
    region: 'Nairobi',
    population: 4756786,
    area_km2: 696.1,
    budget_2024: 42800000000,
    budget_2023: 40150000000,
    pending_bills: 32500000000,
    absorption_rate: 65.5,
    debt: 12500000000,
    corruption_index: 45,
  },
  {
    slug: 'kisumu',
    name: 'Kisumu',
    code: '042',
    region: 'Nyanza',
    population: 1155574,
    area_km2: 2085.9,
    budget_2024: 12700000000,
    budget_2023: 11900000000,
    pending_bills: 4500000000,
    absorption_rate: 72.3,
    debt: 3200000000,
    corruption_index: 38,
  },
  {
    slug: 'mombasa',
    name: 'Mombasa',
    code: '001',
    region: 'Coast',
    population: 1208333,
    area_km2: 294.7,
    budget_2024: 15200000000,
    budget_2023: 14450000000,
    pending_bills: 6800000000,
    absorption_rate: 58.2,
    debt: 5100000000,
    corruption_index: 52,
  },
  {
    slug: 'nakuru',
    name: 'Nakuru',
    code: '032',
    region: 'Rift Valley',
    population: 2162203,
    area_km2: 7489.1,
    budget_2024: 18700000000,
    budget_2023: 17500000000,
    pending_bills: 9200000000,
    absorption_rate: 68.7,
    debt: 6700000000,
    corruption_index: 41,
  },
];

// Sample exposés from @MwangiBonnie
export const sampleExposes = [
  {
    title: 'Mysterious Disappearance of KSh 2.1 Billion Nairobi County Road Fund',
    slug: 'nairobi-road-fund-disappearance',
    summary: 'Investigative report reveals how Nairobi County road maintenance funds vanished without trace, leaving critical infrastructure in disrepair.',
    content: `In a shocking revelation, Nairobi County's KSh 2.1 billion road maintenance fund has mysteriously vanished from the county coffers. The funds, allocated for the 2023/2024 financial year, were meant for critical road repairs across the capital city.

Sources within the county government reveal that the funds were transferred to multiple accounts in a complex web of transactions that spanned three months. Despite multiple audits and investigations, the trail has gone cold.

The disappearance has left major roads in areas like Mathare, Kibera, and Eastleigh in a deplorable state, with potholes so deep they've become a safety hazard. Residents have resorted to organizing protests, but their cries have fallen on deaf ears.

Key questions remain unanswered:
- Who authorized the transfers?
- Where did the money go?
- Why has there been no accountability?

This exposé follows months of investigative work, cross-referencing county financial records, bank statements, and interviews with whistleblowers. The evidence points to a well-orchestrated scheme involving county officials and private contractors.

We demand immediate action from the Ethics and Anti-Corruption Commission (EACC) and the Office of the Director of Public Prosecutions (ODPP).`,
    author: 'MwangiBonnie',
    county: 'Nairobi',
    category: 'Misappropriation',
    amount_involved: 2100000000,
    created_at: new Date('2024-11-15'),
  },
  {
    title: 'Kisumu County Health Fund Scandal: Medicines Paid For But Never Delivered',
    slug: 'kisumu-health-fund-scandal',
    summary: 'Kisumu County health department paid KSh 850 million for medicines that were never delivered to public hospitals, leaving patients without essential drugs.',
    content: `A deep dive into Kisumu County's health procurement records has uncovered a massive scandal involving KSh 850 million paid for pharmaceutical supplies that were never delivered.

The investigation, spanning six months, reveals that between January 2023 and June 2024, the county health department processed payments to three companies for essential medicines. However, hospital inventory records show these medicines never arrived at any public health facility.

Documents obtained show purchase orders for:
- Antibiotics and anti-malarial drugs
- HIV/AIDS medications
- Maternity and child health supplies
- Medical equipment and consumables

When contacted, the three companies either denied receiving the payments or claimed the supplies were delivered to "undisclosed locations." County health officials have been evasive, refusing to provide delivery notes or receipts.

The impact has been devastating. Public hospitals across Kisumu have been experiencing chronic drug shortages, forcing patients to buy medicines from private pharmacies at inflated prices. In some cases, critical surgeries have been postponed due to lack of supplies.

A nurse at Jaramogi Oginga Odinga Teaching and Referral Hospital, speaking on condition of anonymity, revealed: "We've been improvising for months. Patients are suffering, but the county keeps saying there's no money. Yet we know these payments were made."

The County Assembly has launched its own probe, but progress has been slow. Meanwhile, those responsible continue to walk free.`,
    author: 'MwangiBonnie',
    county: 'Kisumu',
    category: 'Procurement Fraud',
    amount_involved: 850000000,
    created_at: new Date('2024-10-28'),
  },
  {
    title: 'Mombasa Port Land Grabbing: How Public Land Was Illegally Allocated',
    slug: 'mombasa-port-land-grabbing',
    summary: 'Exclusive investigation exposes how 50 acres of prime Mombasa port land were illegally allocated to private developers, costing taxpayers billions.',
    content: `An explosive investigation has revealed how 50 acres of prime land near Mombasa Port were illegally allocated to private developers, in a scheme that has cost Kenyan taxpayers over KSh 3.2 billion in lost revenue.

The land, officially designated as port expansion area, was mysteriously reclassified and parceled out to three companies with connections to powerful political figures. The allocation happened without public participation, environmental impact assessments, or proper due diligence.

Our investigation traced the paper trail:
1. Land initially surveyed for port expansion (2018)
2. Sudden reclassification to "residential/commercial" (2020)
3. Allocation to three companies within 48 hours
4. Construction begins immediately, blocking port expansion plans

The National Land Commission (NLC) claims no knowledge of the reclassification. The Mombasa County government denies involvement. The Kenya Ports Authority (KPA) says it was "caught by surprise."

Meanwhile, the developers have already built shopping malls, hotels, and residential apartments on the land, making it politically and economically costly to reverse the allocation.

Local residents, who were promised jobs and development, have been pushed out. The port expansion, critical for Kenya's economic growth, has been indefinitely delayed.

This is a classic case of land grabbing in Kenya - where public resources are privatized for the benefit of a few, while the majority suffers. The individuals behind this scheme must be held accountable, and the land must be returned to public use.`,
    author: 'MwangiBonnie',
    county: 'Mombasa',
    category: 'Land Grabbing',
    amount_involved: 3200000000,
    created_at: new Date('2024-09-20'),
  },
  {
    title: 'Nakuru County Water Project: KSh 1.5 Billion for Non-Existent Dams',
    slug: 'nakuru-water-project-scam',
    summary: 'Nakuru County paid KSh 1.5 billion for water dams that were never constructed, while residents continue to face severe water shortages.',
    content: `Residents of Nakuru County have been paying the price for a massive water infrastructure scam that saw KSh 1.5 billion allocated for dam construction - but no dams were ever built.

The project, launched with much fanfare in 2022, promised to construct five mega-dams across the county to address chronic water shortages. Two years later, not a single dam has been constructed, but the funds have been fully disbursed.

Our investigation uncovered:
- Payments made to contractors for "site preparation" and "materials"
- No evidence of construction work at any of the five sites
- Contractors who cannot be located
- County officials who approved payments without verifying progress

Site visits to all five locations revealed untouched land. Local residents confirm no construction ever took place. "They came, took some photos with machines, and left. We never saw them again," said a farmer from Naivasha.

The water crisis in Nakuru has worsened. Women and children walk kilometers daily to fetch water from contaminated sources. Schools and hospitals lack reliable water supply. Agricultural activities have been severely affected.

The county government has remained silent, refusing to respond to our inquiries. The County Assembly's oversight committee appears to have been compromised, as it has failed to raise any red flags.

This is not just about stolen money - it's about the lives of thousands of Nakuru residents who continue to suffer due to the greed of a few individuals. We demand immediate action and accountability.`,
    author: 'MwangiBonnie',
    county: 'Nakuru',
    category: 'Infrastructure Fraud',
    amount_involved: 1500000000,
    created_at: new Date('2024-08-12'),
  },
  {
    title: 'The Great Nairobi School Feeding Program Heist',
    slug: 'nairobi-school-feeding-heist',
    summary: "How KSh 980 million meant for feeding 200,000 school children in Nairobi's informal settlements was diverted to ghost suppliers.",
    content: `In what can only be described as a heartless crime against children, KSh 980 million allocated for feeding 200,000 school children in Nairobi's informal settlements has been systematically stolen through a network of ghost suppliers.

The school feeding program, launched to ensure children from poor backgrounds receive at least one meal a day, has been running for three years. However, our investigation reveals that most children have never seen the promised meals.

The scheme was simple yet devastating:
1. Create shell companies registered as "food suppliers"
2. Submit fake invoices for food supplies never delivered
3. County officials approve payments
4. Money disappears into personal accounts
5. Children go hungry

We cross-referenced supplier invoices with actual deliveries to 150 schools across Mathare, Kibera, Mukuru, and Korogocho. Only 12 schools confirmed receiving any supplies, and even those were sporadic and of poor quality.

A headteacher from a school in Mathare, speaking anonymously, broke down in tears: "We were promised daily meals for our children. We prepared storage facilities, hired cooks. But the food never came. Our children are hungry, and we feel helpless."

The impact on education has been severe. School attendance has dropped, concentration levels are low, and malnutrition cases have increased. These children are being robbed of their future.

Meanwhile, the individuals behind this scheme live in luxury, driving expensive cars and sending their own children to expensive private schools. The irony is not lost on anyone.

The Nairobi County education department has failed in its duty. The county assembly has failed in its oversight role. The children continue to suffer.

This exposé is a call to action. We cannot allow those who steal from children to go unpunished. Justice must be served, and the school feeding program must be restructured with proper oversight and accountability.`,
    author: 'MwangiBonnie',
    county: 'Nairobi',
    category: 'Social Program Fraud',
    amount_involved: 980000000,
    created_at: new Date('2024-07-05'),
  },
];


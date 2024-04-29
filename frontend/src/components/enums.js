import {
    FaBalanceScale,
    FaBatteryHalf, FaBuilding, FaBus, FaBusinessTime, FaCalculator,
    FaDigitalOcean, FaExchangeAlt, FaExpandArrowsAlt, FaFish, FaGlobeEurope, FaHandshake, FaHandsHelping,
    FaHardHat, FaHeartbeat, FaMapMarkedAlt, FaMoneyBill,
    FaMusic, FaSchool, FaShoppingCart,
    FaStoreAlt,
    FaStreetView,
    FaTractor, FaTree,
    FaUserFriends,
    FaUserSecret, FaUtensils, FaVials,
    FaWallet
} from "react-icons/fa";

export const UserRole = {
    NO_ROLE_ASSIGNED: 'No Role Assigned',
    LEGAL_EXPERT: 'Legal Expert',
    EDITOR: 'Editor',
    MANAGER: 'Manager',
    CITIZEN: 'Citizen',
};

export const roles = Object.values(UserRole);

export const UserRoleIntToStringMapping = {
    null: 'No Role Assigned',
    1: 'Legal Expert',
    2: 'Editor',
    3: 'Manager',
    4: 'Citizen',
};

export const UserRoleStringToIntMapping = {
    'No Role Assigned': 4, // default
    'Legal Expert': 1,
    'Editor': 2,
    'Manager': 3,
    'Citizen': 4,
};

export const SummaryStatus = {
    NEW: 'New',
    REVISED: 'Revised',
    PENDING_APPROVAL: 'Pending Approval',
    PUBLISHED: 'Published',
};

export const SummaryStatuses = Object.values(SummaryStatus);

export const TopicFilters = [
    {
        name: 'Agriculture',
        icon: <FaTractor/>,
        filter: 'agriculture',
        subcategories: ['common-agricultural-policy-(cap)', 'funding-&-support-schemes', 'agricultural-products', 'genetically-modified-organisms-(gmos)---rules-&-consumers-protection', 'pesticides-&-fertilisers', 'interaction-with-other-policies:-competition-&-trade', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Audiovisual and media',
        icon: <FaMusic/>,
        filter: 'audiovisual-and-media',
        subcategories: ['archived-summaries']
    },
    {
        name: 'Budget',
        icon: <FaWallet/>,
        filter: 'budget',
        subcategories: ['where-does-the-money-come-from?-the-eus-own-resources', 'where-does-the-money-go?-the-multiannual-financial-framework', 'budget-adoption-and-discharge', 'financial-rules,-controls-and-audits', 'archived-summaries']
    },
    {
        name: 'Competition',
        icon: <FaStoreAlt/>,
        filter: 'competition',
        subcategories: ['competition---general-rules', 'competition-rules-by-sector', 'antitrust-law', 'anticompetitive-practices-&-abuse-of-a-dominant-position', 'exemptions', 'cartels', 'mergers', 'state-aid', 'state-aid---general-rules', 'rules-applicable-to-specific-sectors', 'archived-summaries']
    },
    {
        name: 'Consumers',
        icon: <FaUserFriends/>,
        filter: 'consumers',
        subcategories: ['consumers---general-rules', 'new-deal-for-consumers', 'protecting-consumers-interests', 'preventing-unfair-commercial-practices-&-unfair-pricing', 'preventing-unfair-contract-terms', 'legal-redress-&-dispute-settlement', 'travel-rights', 'air-transport-rules-&-rights', 'financial-services', 'product-labelling', 'consumer-representation', 'consumer-safety', 'health', 'product-safety-rules', 'safety-of-services', 'consumers---food', 'food-safety-rules', 'genetically-modified-organisms-(gmos)---rules-&-consumers-protection', 'food-categories---specific-rules', 'food-labelling-&-organic-products', 'food-packaging-&-containers', 'archived-summaries']
    },
    {
        name: 'Culture',
        icon: <FaStreetView/>,
        filter: 'culture',
        subcategories: ['culture-policy', 'culture-programmes', 'archived-summaries']
    },
    {
        name: 'Customs',
        icon: <FaUserSecret/>,
        filter: 'customs',
        subcategories: ['customs---general-rules', 'customs-cooperation', 'tariffs,-controls-&-exemptions', 'customs-specific-schemes-&-rules', 'agreements---customs', 'archived-summaries']
    },
    {
        name: 'Development',
        icon: <FaHardHat/>,
        filter: 'development',
        subcategories: ['development---general-rules', 'european-development-policy', 'international-development-dialogue', 'instruments-&-funding', 'sectors', 'human-rights-and-democratic-governance', 'food-&-agriculture', 'economic-growth---trade-and-customs', 'human-development', 'environment-&-climate-change', 'migration-&-asylum-issues-in-origin-countries', 'african,-caribbean-and-pacific-states-(acp)', 'agreements---development', 'overseas-countries-and-territories-(oct)', 'archived-summaries']
    },
    {
        name: 'Digital single market',
        icon: <FaDigitalOcean/>,
        filter: 'digital-single-market',
        subcategories: ['digital-single-market---general-rules', 'regulatory-framework', 'competition-rules', 'electronic-communication-networks', 'internet-networks', 'mobile-networks', 'radio-networks', 'eu-data-economy-&-data-protection', 'personal-data-&-privacy-rules', 'eu-copyright-&-audiovisual-rules', 'copyright-and-related-rights', 'eu-audiovisual-rules', 'archived-summaries']
    },
    {
        name: 'Economic and monetary affairs',
        icon: <FaMoneyBill/>,
        filter: 'economic-and-monetary-affairs',
        subcategories: ['economic-and-monetary-union-(emu)', 'euro-area', 'the-euro', 'adopting-the-euro---the-euro-in-practice', 'convergence-reports---progress-of-non-euro-area-countries-on-meeting-euro-adoption-criteria', 'economic-and-monetary-union-(emu)---key-institutions', 'council-of-the-european-union---role-in-emu', 'eurogroup-(meetings-of-the-euro-area-finance-ministers)', 'european-commission---role-in-emu', 'european-central-bank-(ecb)---role-in-emu', 'counterfeiting,-fraud-&-the-euro', 'the-euro-as-a-world-currency', 'eu-economic-governance', 'stability-and-growth-pact', 'macroeconomic-imbalance-procedure', 'economic-forecasts', 'the-eu-as-borrower', 'european-financial-stabilisation-mechanism-(efsm)', 'financial-assistance-in-eu-countries', 'macro-financial-assistance-to-non-eu-countries', 'investment-and-financing', 'coordination-with-the-eib-group-and-the-ebrd', 'banking-and-financial-services', 'capital-markets-union', 'financial-supervision-and-risk-management', 'banking-union', 'supervision-of-financial-institutions', 'ecb-banking-supervision', 'managing-risks-to-banks-and-financial-institutions', 'consumer-finance-and-payments', 'consumer-finance', 'payment-services', 'digital-finance', 'financial-markets,-financial-instruments', 'securities-markets', 'investment-funds', 'post-trade-services', 'capital-movements', 'insurance-and-pensions', 'company-reporting-and-auditing', 'european-statistics', 'eurostat', 'other-statistics', 'archived-summaries']
    },
    {
        name: 'Education, training, youth, sport',
        icon: <FaSchool/>,
        filter: 'education-training-youth-sport',
        subcategories: ['education-and-training', 'youth', 'sport', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Employment and social policy',
        icon: <FaHandshake/>,
        filter: 'employment-and-social-policy',
        subcategories: ['european-employment-strategy', 'skills-&-vocational-education-and-training', 'health-&-safety-at-work', 'workplaces-&-equipment', 'chemical,-physical-&-biological-agents', 'labour-law', 'protection-of-specific-categories-of-workers', 'working-conditions', 'working-time-rules', 'protection-against-discrimination', 'equality-between-women-and-men', 'work-life-balance', 'other-forms-of-discrimination-at-work', 'social-inclusion-&-social-protection', 'social-investment---fight-against-poverty', 'pensions-&-health-care', 'social-dialogue-&-employee-participation', 'social-dialogue', 'employee-participation', 'moving-&-working-in-the-eu', 'european-union-agencies', 'funding', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Energy',
        icon: <FaBatteryHalf/>,
        filter: 'energy',
        subcategories: ['energy---general-rules', 'financial-rules', 'internal-energy-market', 'gas', 'energy-efficiency', 'electricity', 'oil/hydrocarbons', 'renewables', 'trans-european-networks', 'nuclear', 'nuclear-safety-&-radiation-protection', 'nuclear-spent-fuel-and-waste', 'nuclear-safeguards', 'nuclear-other', 'decommissioning-assistance', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Enlargement',
        icon: <FaExpandArrowsAlt/>,
        filter: 'enlargement',
        subcategories: ['enlargement:-strategy-and-reports', 'archived-summaries']
    },
    {
        name: 'Enterprise',
        icon: <FaBusinessTime/>,
        filter: 'enterprise',
        subcategories: ['competitive-industrial-policy', 'industry-sectors', 'space', 'defence-industry', 'environmental-responsibility', 'intellectual-property', 'copyright-and-related-rights', 'inventions,-trade-marks-&-designs', 'entrepreneurship-&-small-businesses', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Environment and climate change',
        icon: <FaTree/>,
        filter: 'environment-and-climate-change',
        subcategories: ['european-green-deal', 'tackling-climate-change', 'eu-climate-change-policy', 'long-term-climate-policy', 'reducing-greenhouse-gases', 'monitoring-&-adapting-to-climate-change', 'space', 'international-agreements', 'clean,-efficient-energy', 'secure-&-sustainable-energy', 'energy-efficiency', 'renewable-energy', 'cleaner-transport', 'transport-targets', 'road-&-air-transport', 'rail,-maritime-&-waterway-transport', 'business:-environmental-responsability', 'agriculture-&-land-use-planning', 'innovation-framework', 'air', 'chemicals', 'nature-&-biodiversity', 'noise', 'soil-&-forests', 'waste', 'recycling', 'water', 'coastal-&-marine-environment', 'industry-&-pollution', 'pollution-from-vehicles', 'environmental-agencies-&-bodies', 'environmental-controls-&-assessments', 'environmental-crime', 'agreements---environment', 'conventions-protecting-specific-areas', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'External relations',
        icon: <FaGlobeEurope/>,
        filter: 'external-relations',
        subcategories: ['foreign-and-security-policy---key-institutional-actors', 'european-external-action-service-&-eu-delegations', 'eu-special-representatives', 'council-of-the-european-union---role-in-foreign-and-security-policy', 'european-council---role-in-foreign-and-security-policy', 'common-foreign-and-security-policy-(cfsp)', 'legal-instruments-&-financing', 'conflict-prevention,-peace-building,-mediation-&-stabilisation', 'sanctions-policy', 'non-proliferation-and-disarmament', 'counter-terrorism', 'eu-relations-with-international-organisations-and-bodies', 'the-common-security-and-defence-policy-(csdp)', 'european-defence-policy', 'defence-industry', 'agencies-under-common-security-and-defence-policy', 'csdp-operations-(military-and-civilian)', 'assistance-and-other-instruments/mechanisms', 'archived-summaries']
    },
    {
        name: 'External trade',
        icon: <FaExchangeAlt/>,
        filter: 'external-trade',
        subcategories: ['exporting-from-the-eu', 'exports---specific-rules', 'importing-into-the-eu', 'imports---specific-rules', 'trade-defence', 'common-trade-policy', 'agreements---trade', 'eu-and-the-wto', 'countries-and-regions', 'development-and-sustainability', 'european-trade-statistics', 'archived-summaries']
    },
    {
        name: 'Food safety',
        icon: <FaUtensils/>,
        filter: 'food-safety',
        subcategories: ['food', 'food---general-rules', 'food-safety-bodies', 'labelling-and-nutrition', 'food-labelling-legislation', 'food-supplements', 'natural-mineral-waters', 'food-for-specific-groups', 'nutrition-and-health-claims', 'food-improvement-agents', 'new-foodstuff-types', 'biological-safety', 'antimicrobial-resistance', 'food-hygiene', 'food-irradiation', 'crisis-preparedness-and-management', 'chemical-safety', 'chemical-safety---general-rules', 'contaminants', 'food-packaging-&-containers', 'hormones-in-meat', 'animal-feed', 'feed-hygiene', 'feed-marketing', 'feed-additives', 'medicated-feed', 'undesirable-substances', 'genetically-modified-feed', 'animal-health', 'animal-diseases', 'other-diseases', 'animal-welfare', 'livestock-farming', 'animal-welfare-during-transport', 'slaughter', 'other-animal-welfare-issues', 'trade-and-imports', 'live-animals', 'animal-products', 'identification', 'cattle', 'semen,-ova-and-embryos', 'plant-health', 'plant-health-and-biosecurity', 'genetically-modified-organisms-(gmos)---rules-&-consumers-protection', 'pesticides-&-fertilisers', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Fraud and corruption',
        icon: <FaUserSecret/>,
        filter: 'fraud-and-corruption',
        subcategories: ['fraud-and-corruption---general-rules', 'fraud-against-eu-funds', 'fraud-against-eu-revenue', 'taxes', 'agreements---customs', 'counterfeiting-&-fraud', 'piracy,-intellectual-property-violations', 'counterfeiting,-fraud-&-the-euro', 'corruption', 'anti-fraud-offices', 'archived-summaries']
    },
    {
        name: 'Human rights',
        icon: <FaBalanceScale/>,
        filter: 'human-rights',
        subcategories: ['human-rights-in-the-eu:-fundamental-rights', 'institutions,-agencies-&-bodies', 'the-charter-of-fundamental-rights', 'dignity', 'freedoms', 'equality', 'racism-and-xenophobia', 'equality-between-women-and-men', 'minorities', "children's-rights", 'rights-of-the-elderly', 'integration-of-persons-with-disabilities', 'solidarity', 'consumer-protection', "citizens'-rights", 'justice', 'human-rights-in-non-eu-countries', 'guidelines-on-human-rights', 'promoting-human-rights-in-non-eu-countries', "children's-rights-in-non-eu-countries", 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Humanitarian Aid and Civil Protection',
        icon: <FaHandsHelping/>,
        filter: 'humanitarian-aid-and-civil-protection',
        subcategories: ['humanitarian-aid', 'general-rules-and-principles', 'sectoral-issues', 'emergency-aid', 'food-assistance', "children's-rights-in-non-eu-countries", 'civil-protection', 'dg-european-civil-protection-and-humanitarian-aid-operations-(echo)', 'archived-summaries']
    },
    {
        name: 'Institutional affairs',
        icon: <FaBuilding/>,
        filter: 'institutional-affairs',
        subcategories: ['eu-treaties', 'treaties-in-force', 'founding-and-amending-treaties', 'eu-accession-and-withdrawal', 'eu-competencies', 'eu-institutions,-bodies-and-agencies', 'institutions', 'inter-institutional-cooperation', 'access-to-documents-and-data-protection', 'european-parliament', 'european-council', 'council-of-the-european-union', 'european-commission', 'court-of-justice-of-the-european-union-(cjeu)', 'european-central-bank-(ecb)', 'european-court-of-auditors-(eca)', 'bodies', 'interinstitutional-entities', 'agencies', 'decentralised-agencies', 'agencies-under-common-security-and-defence-policy', 'euratom-agencies-and-bodies', 'executive-agencies', 'eu-law', 'types-of-legal-acts', 'how-is-eu-law-made?', 'simplification-of-eu-law', 'transposition,-implementation-and-enforcement', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Internal market',
        icon: <FaShoppingCart/>,
        filter: 'internal-market',
        subcategories: ['single-market:-general-rules-&-strategies', 'living-and-working-in-the-internal-market', "free-movement-of-workers-&-citizens'-rights", 'skills-&-mobility', 'social-protection', 'employment-for-non-eu-citizens', 'agreements---internal-market', 'product-conformity-agreements-with-non-eu-countries', 'single-market-for-goods', 'free-movement-of-goods---general-rules', 'technical-harmonisation', 'measurement-instruments-&-units', 'market-surveillance---ensuring-product-safety', 'machinery-&-related-tools---safety-&-accuracy', 'medical-devices', 'electrical-&-electronic-devices', 'transport---aligning-systems-&-safety', 'pharmaceutical-and-cosmetic-products', 'medicines-for-human-use', 'medicines-for-veterinary-use', 'chemical-products', 'dangerous-substances-&-preparations', 'pesticides-&-fertilisers', 'risk-management---chemicals', 'managing-pollution-&-waste', 'motor-vehicles', 'motor-vehicles,-trailers-&-other-vehicles', 'aligning-technical-standards---general-market-surveillance', 'pollution-from-vehicles', 'technical-implications-of-road-safety', 'construction-sector', 'single-market-for-services', 'businesses-in-the-internal-market', 'company-law', 'public-procurement', 'intellectual-property', 'copyright-and-related-rights', 'inventions,-trade-marks-&-designs', 'banking-and-financial-services', 'capital-markets-union', 'financial-supervision-and-risk-management', 'banking-union', 'supervision-of-financial-institutions', 'ecb-banking-supervision', 'managing-risks-to-banks-and-financial-institutions', 'consumer-finance-and-payments', 'consumer-finance', 'payment-services', 'digital-finance', 'financial-markets,-financial-instruments', 'securities-markets', 'investment-funds', 'post-trade-services', 'capital-movements', 'insurance-and-pensions', 'company-reporting-and-auditing', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Justice, freedom and security',
        icon: <FaBalanceScale/>,
        filter: 'justice-freedom-and-security',
        subcategories: ['free-movement-of-persons,-asylum-and-immigration', 'free-movement-of-european-citizens-within-the-union', 'schengen-information-system-ii', 'penetrating-external-borders', 'visas', 'asylum', 'immigration-and-rights-of-nationals-of-non-eu-countries', 'immigration-policy', 'illegal-immigration', 'relations-with-non-eu-countries', 'horizontal-and-general-matters', 'judicial-cooperation-in-civil-matters', 'civil-and-commercial-matters', 'litigation', 'applicable-law', 'european-procedures', 'alternative-(out-of-court)-dispute-resolution', 'family-law-&-succession-law', 'cooperation-between-eu-countries-on-civil-justice', 'judicial-cooperation-in-criminal-matters', 'mutual-recognition', 'war-crimes', 'agreements---justice-&-security', 'police-and-customs-cooperation', 'police-cooperation', 'agreements---customs', 'citizenship-of-the-union', 'democratic-rights', 'free-movement-rights', 'consular-protection', 'fundamental-rights-&-discrimination', 'institutions,-agencies-&-bodies', 'equality-between-women-and-men', 'other-forms-of-discriminations', 'fight-against-terrorism', 'access-to-and-exchange-of-information', 'prevention-&-protection', 'pursuit', 'institutions-and-agencies', 'fight-against-organised-crime', 'crime-prevention', 'arms-trafficking', 'money-laundering', 'financial-crime', 'cyber-crime', 'trafficking-in-human-beings', 'environmental-crime', 'combating-drugs', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Oceans and fisheries',
        icon: <FaFish/>,
        filter: 'oceans-and-fisheries',
        subcategories: ['maritime-affairs---general-rules', 'fisheries-sector', 'common-fisheries-policy-(cfp):-rules,-markets-&-surveillance', 'common-fisheries-policy-(cfp)---institutions,-agencies-&-bodies', 'worker-protection', 'preserving-&-managing-fisheries-stocks', 'aquaculture-(fish-farming)', 'data-collection', 'environmental-protection', 'relations-outside-the-eu:-agreements-&-strategies', 'arctic-ocean', 'atlantic-ocean', 'baltic-sea', 'mediterranean-sea', 'outermost-eu-regions', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Public health',
        icon: <FaHeartbeat/>,
        filter: 'public-health',
        subcategories: ['steering-eu-public-health', 'state-of-health-in-the-eu', 'health-programmes', 'ensuring-health-security', 'preparedness-and-response', 'blood,-tissues-and-organs', 'improving-healthcare-systems', 'cross-border-healthcare', 'healthcare-workforce', 'patient-safety', 'health-technology-assessment', 'ehealth', 'risk-assessment', 'scientific-committees', 'disease-prevention', 'antimicrobial-resistance', 'communicable-diseases', 'vaccination', 'major-and-chronic-diseases', 'rare-diseases', 'endocrine-disruptors', 'health-in-society', "workers'-health", 'promoting-good-health', 'nutrition-and-physical-activity', 'alcohol', 'tobacco', 'pharmaceuticals', 'medicines-for-human-use', 'medicines-for-veterinary-use', 'archived-summaries']
    },
    {
        name: 'Regional policy',
        icon: <FaMapMarkedAlt/>,
        filter: 'regional-policy',
        subcategories: ['regional-policy---rules-&-funds', 'regional-policy-2021-2027', 'regional-policy-2014-2020', 'regional-policy---management-&-implementation', 'funding-period-2021-2027', 'eu-structural-&-investment-funds,-2014-2020', 'related-instruments', 'regional-policy-and-eu-economy', 'territorial-strategies', 'the-eus-outermost-regions', 'macro-regional-strategies', 'urban-strategies', 'european-statistics', 'archived-summaries']
    },
    {
        name: 'Research and innovation',
        icon: <FaVials/>,
        filter: 'research-and-innovation',
        subcategories: ['what-is-horizon-europe?', 'who-implements-horizon-europe?', 'research-&-innovation-policy', 'space', 'funding-opportunities', 'agreements---science-&-technology', 'archived-summaries']
    },
    {
        name: 'Taxation',
        icon: <FaCalculator/>,
        filter: 'taxation',
        subcategories: ['direct-taxation', 'company-taxation', 'indirect-taxation', 'value-added-tax-(vat)', 'excise-duties', 'tax-exemptions', 'administrative-cooperation', 'archived-summaries']
    },
    {
        name: 'Transport',
        icon: <FaBus/>,
        filter: 'transport',
        subcategories: ['air-transport', 'road-transport', 'rail-transport', 'maritime-&-inland-waterways', 'agreements---transport', 'security-&-safety', 'clean-&-urban-transport-and-sustainable-transport', 'infrastructure,-ten-t,-connecting-europe', 'intelligent-transport-systems', 'research-&-innovation', 'space', 'public-service-obligations', 'logistics-and-multimodal-transport', 'passenger-rights-&-social-issues', 'european-statistics', 'archived-summaries']
    }
]
// Mock Database for MedBridge Platform

export const DEPARTMENTS = [
  {
    id: 'general',
    name: 'General Medicine',
    hindiName: 'सामान्य चिकित्सा',
    icon: 'Stethoscope',
    color: '#0ea5e9',
    badge: 'Most Visited',
    symptoms: ['Fever', 'Cold & Cough', 'Body Pain', 'Weakness', 'Vomiting', 'Bukhar', 'Sardi', 'Khansi'],
    description: 'Comprehensive primary care for common illnesses, fever, infections, and preventative health checks.',
    doctorCount: 42
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    hindiName: 'हृदय रोग विशेषज्ञ',
    icon: 'HeartPulse',
    color: '#ef4444',
    badge: 'Critical Care',
    symptoms: ['Chest Pain', 'High Blood Pressure', 'Shortness of Breath', 'Palpitations', 'Chhati me dard', 'Ghabrahat'],
    description: 'Heart specialists diagnosing coronary diseases, arrhythmias, hypertension, and post-cardiac recovery.',
    doctorCount: 18
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    hindiName: 'त्वचा एवं बाल रोग',
    icon: 'Sparkles',
    color: '#ec4899',
    badge: 'Popular',
    symptoms: ['Acne', 'Skin Rash', 'Hair Fall', 'Itching', 'Psoriasis', 'Khujli', 'Chehre pe daane', 'Baal jhadna'],
    description: 'Specialists in skincare, eczema, fungal infections, acne management, and hair loss therapies.',
    doctorCount: 26
  },
  {
    id: 'neurology',
    name: 'Neurology',
    hindiName: 'तंत्रिका व मस्तिष्क रोग',
    icon: 'Brain',
    color: '#8b5cf6',
    badge: 'Specialist',
    symptoms: ['Migraine', 'Severe Headache', 'Dizziness', 'Numbness', 'Seizures', 'Chakkar aana', 'Sar dard', 'Adha sar dard'],
    description: 'Expert care for neurological disorders, stroke prevention, chronic migraines, and nerve health.',
    doctorCount: 14
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    hindiName: 'हड्डी एवं जोड़ रोग',
    icon: 'Activity',
    color: '#f97316',
    badge: 'Trauma & Bone',
    symptoms: ['Knee Pain', 'Fracture', 'Back Pain', 'Arthritis', 'Joint Swelling', 'Kamar dard', 'Ghutne ka dard', 'Haddi tootna'],
    description: 'Bone, joint, spinal issues, fracture management, joint replacement, and sports physiotherapy.',
    doctorCount: 22
  },
  {
    id: 'psychiatry',
    name: 'Counseling & Mental Health',
    hindiName: 'मानसिक स्वास्थ्य एवं परामर्श',
    icon: 'Smile',
    color: '#10b981',
    badge: 'Student Special',
    symptoms: ['Exam Stress', 'Anxiety', 'Depression', 'Sleep Issues', 'Panic Attack', 'Padhai ka tention', 'Neend na aana', 'Depressed'],
    description: 'Confidential online & in-person therapy, student counseling, stress management, and emotional support.',
    doctorCount: 31
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    hindiName: 'शिशु एवं बाल रोग',
    icon: 'Baby',
    color: '#06b6d4',
    badge: 'Child Care',
    symptoms: ['Child Fever', 'Vaccination', 'Infant Cough', 'Growth Milestones', 'Bacche ko bukhar', 'Tika karana'],
    description: 'Holistic healthcare for newborns, children, and teens with pediatric vaccinations and growth monitoring.',
    doctorCount: 20
  },
  {
    id: 'dentistry',
    name: 'Dental Care',
    hindiName: 'दंत चिकित्सा',
    icon: 'ShieldCheck',
    color: '#14b8a6',
    badge: 'Quick Appointments',
    symptoms: ['Toothache', 'Cavity', 'Bleeding Gums', 'RCT', 'Daant me dard', 'Masoode me khoon'],
    description: 'Painless root canals, dental cleaning, braces, implants, and emergency tooth relief.',
    doctorCount: 19
  }
];

export const DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Rajesh Vardhan',
    degree: 'MBBS, MD (Medicine), DM (Cardiology) - AIIMS',
    specialty: 'Cardiologist',
    departmentId: 'cardiology',
    experienceYears: 16,
    hospitalName: 'Apollo City Hospital & Care Clinic',
    address: 'Near Metro Gate 3, South Extension, New Delhi',
    distanceKm: 1.8,
    consultationFee: 750,
    rating: 4.9,
    reviewCount: 342,
    trustScore: 980,
    isBoosted: true,
    badgeText: 'Top Rated Cardiologist',
    availableToday: true,
    availableOnline: true,
    nextSlot: '11:30 AM Today',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    about: 'Senior interventional cardiologist with over 5,000 successful procedures. Known for empathetic patient listening and evidence-based cardiac therapies.',
    services: ['ECG & 2D Echo', 'Angiography Consultation', 'Hypertension & BP Control', 'Preventative Heart Screening']
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Sen',
    degree: 'MBBS, MD (Dermatology & Venereology)',
    specialty: 'Dermatologist & Cosmetologist',
    departmentId: 'dermatology',
    experienceYears: 11,
    hospitalName: 'GlowSkin Advanced Clinical Dermatology',
    address: '2nd Floor, Green Park Market, New Delhi',
    distanceKm: 2.4,
    consultationFee: 600,
    rating: 4.85,
    reviewCount: 275,
    trustScore: 890,
    isBoosted: true,
    badgeText: 'Skincare Specialist of the Month',
    availableToday: true,
    availableOnline: true,
    nextSlot: '02:00 PM Today',
    image: 'https://images.unsplash.com/photo-1594824813583-a4175b2257d0?w=400&auto=format&fit=crop&q=80',
    about: 'Specialist in clinical acne, stubborn eczema, scalp disorders, and modern laser therapies. Promotes affordable generic treatments.',
    services: ['Acne Scar Treatment', 'Allergy Patch Testing', 'Hair Fall PRP', 'Eczema Management']
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikram Malhotra',
    degree: 'MBBS, MS (Ortho), M.Ch (Orthopedics) - UK',
    specialty: 'Orthopedic Surgeon',
    departmentId: 'orthopedics',
    experienceYears: 19,
    hospitalName: 'Fortis Health Point & Joint Clinic',
    address: 'Sector 62, Near Cyber City Road',
    distanceKm: 3.1,
    consultationFee: 800,
    rating: 4.92,
    reviewCount: 418,
    trustScore: 1120,
    isBoosted: true,
    badgeText: '#1 Joint Specialist in Area',
    availableToday: true,
    availableOnline: false,
    nextSlot: '04:15 PM Today',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    about: 'Pioneer in minimally invasive joint surgery and non-surgical knee preservation. Dedicated to helping elderly patients walk pain-free.',
    services: ['Robotic Knee Replacement', 'Spine & Sciatica Therapy', 'Sports Injury Rehab', 'Bone Density DEXA Scan']
  },
  {
    id: 'doc-4',
    name: 'Dr. Meera Kulkarni',
    degree: 'MBBS, MD (Psychiatry), PG Diploma in Adolescent Psychology',
    specialty: 'Clinical Psychiatrist & Student Counselor',
    departmentId: 'psychiatry',
    experienceYears: 9,
    hospitalName: 'MindCare Student Wellness Center',
    address: 'University Enclave, North Campus',
    distanceKm: 0.9,
    consultationFee: 500,
    studentDiscountFee: 199,
    rating: 4.96,
    reviewCount: 310,
    trustScore: 940,
    isBoosted: true,
    badgeText: 'Student Friendly Counselor',
    availableToday: true,
    availableOnline: true,
    nextSlot: '12:00 PM Today (Virtual)',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    about: 'Passionate mental wellness advocate specializing in college student stress, career burnout, insomnia, and ADHD support with complete confidentiality.',
    services: ['Student Exam Anxiety Session', 'Depression & CBT Therapy', 'Sleep Architecture Restoration', 'Relationship Counseling']
  },
  {
    id: 'doc-5',
    name: 'Dr. Amitav Chatterjee',
    degree: 'MBBS, DM (Neurology) - NIMHANS',
    specialty: 'Neurologist',
    departmentId: 'neurology',
    experienceYears: 14,
    hospitalName: 'NeuroSpine Multi-Speciality Clinic',
    address: 'B-Block, Saket District Centre',
    distanceKm: 4.2,
    consultationFee: 900,
    rating: 4.88,
    reviewCount: 192,
    trustScore: 820,
    isBoosted: false,
    badgeText: 'Migraine & Stroke Expert',
    availableToday: false,
    availableOnline: true,
    nextSlot: 'Tomorrow 10:00 AM',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
    about: 'Expert in persistent headaches, neurological tremors, epilepsy, and post-COVID brain fog syndromes.',
    services: ['Migraine Infusion Protocol', 'EEG & Nerve Conduction Study', 'Vertigo & Dizziness Rehab', 'Memory & Dementia Care']
  },
  {
    id: 'doc-6',
    name: 'Dr. Sunita Bansal',
    degree: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
    specialty: 'Pediatrician & Child Health Expert',
    departmentId: 'pediatrics',
    experienceYears: 12,
    hospitalName: 'LittleAngels Child & Mother Clinic',
    address: 'Near Central Market, Model Town',
    distanceKm: 2.1,
    consultationFee: 500,
    rating: 4.9,
    reviewCount: 220,
    trustScore: 780,
    isBoosted: false,
    badgeText: 'Child Gentle Care',
    availableToday: true,
    availableOnline: true,
    nextSlot: '03:30 PM Today',
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop&q=80',
    about: 'Warm and gentle pediatrician trusted by over 4,000 families for timely vaccination, child immunity nutrition, and infant infections.',
    services: ['Complete Child Immunization', 'Newborn Screening', 'Pediatric Asthma Care', 'Growth & Diet Consultation']
  },
  {
    id: 'doc-7',
    name: 'Dr. Arvind Gupta',
    degree: 'MBBS, MD (General Medicine) - Maulana Azad Medical College',
    specialty: 'General Physician',
    departmentId: 'general',
    experienceYears: 18,
    hospitalName: 'Gupta Medical Clinic & Primary Care',
    address: 'Main Road, Pocket A, Green Park, New Delhi',
    distanceKm: 1.2,
    consultationFee: 400,
    rating: 4.9,
    reviewCount: 410,
    trustScore: 920,
    isBoosted: true,
    badgeText: 'Top General Physician',
    availableToday: true,
    availableOnline: true,
    nextSlot: '10:15 AM Today',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    about: 'Experienced internal medicine practitioner specializing in diagnostic fever management, chronic diabetes, seasonal viral illnesses, and lifestyle health checkups.',
    services: ['Fever & Infection Triage', 'Diabetes & Hypertension Management', 'Preventive Health Checkup', 'Geriatric Primary Care']
  },
  {
    id: 'doc-8',
    name: 'Dr. R. K. Sharma',
    degree: 'BDS, MDS (Conservative Dentistry & Endodontics)',
    specialty: 'Dental Surgeon & Implantologist',
    departmentId: 'dentistry',
    experienceYears: 14,
    hospitalName: 'SmileCraft Advanced Dental & Implant Center',
    address: 'Near Metro Station Gate 2, Lajpat Nagar, New Delhi',
    distanceKm: 2.4,
    consultationFee: 450,
    rating: 4.8,
    reviewCount: 295,
    trustScore: 860,
    isBoosted: false,
    badgeText: 'Painless Dental Care',
    availableToday: true,
    availableOnline: true,
    nextSlot: '04:00 PM Today',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&auto=format&fit=crop&q=80',
    about: 'Leading endodontist specializing in painless single-sitting root canal treatments, cosmetic teeth aligners, laser tooth whitening, and dental implants.',
    services: ['Single-Sitting Root Canal', 'Zirconia Crowns & Bridges', 'Painless Tooth Extraction', 'Dental Implants & Aligners']
  }
];

export const HOSPITALS = [
  {
    id: 'hosp-1',
    name: 'MaxCure Super Speciality Hospital',
    type: 'Hospital',
    emergency24x7: true,
    distanceKm: 1.5,
    rating: 4.8,
    address: 'Ring Road, Near Metro Pillar 142, New Delhi',
    phone: '+91 11 4567 8900',
    emergencyPhone: '108 / +91 11 4567 8999',
    departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Emergency Trauma', 'ICU'],
    icuBedsAvailable: 8,
    ambulanceResponseTime: '9 mins avg',
    facilities: ['24/7 Trauma Unit', 'In-house Pharmacy', 'Cashless TPA Desk', 'Robotic OT']
  },
  {
    id: 'hosp-2',
    name: 'LifeLine Community Multi-Speciality Clinic',
    type: 'Clinic',
    emergency24x7: false,
    distanceKm: 0.8,
    rating: 4.7,
    address: 'Shop 14-16, Local Shopping Complex, Pocket B',
    phone: '+91 11 2987 6543',
    emergencyPhone: '+91 98765 43210',
    departments: ['General Medicine', 'Dermatology', 'Pediatrics', 'Dentistry'],
    icuBedsAvailable: 0,
    ambulanceResponseTime: 'N/A (Day Clinic)',
    facilities: ['Digital X-Ray', 'Diagnostic Pathology Lab', 'Affordable OPD', 'Vaccination Desk']
  },
  {
    id: 'hosp-3',
    name: 'City Trauma & Neuro Care Center',
    type: 'Hospital',
    emergency24x7: true,
    distanceKm: 3.8,
    rating: 4.9,
    address: 'Main Outer Bypass Road, Industrial Area Phase 1',
    phone: '+91 11 3344 5566',
    emergencyPhone: '102 / +91 11 3344 5599',
    departments: ['Neurology', 'Cardiology', 'Orthopedics', 'Burn Unit'],
    icuBedsAvailable: 14,
    ambulanceResponseTime: '7 mins avg',
    facilities: ['State-of-art MRI 3T', 'Catheterization Lab', 'Blood Bank (A+, B+, O-, AB+ in stock)']
  }
];

export const MEDICINES = [
  {
    id: 'med-1',
    brandName: 'Dolo 650 Tablet',
    genericName: 'Paracetamol 650mg',
    category: 'Fever & Pain',
    department: 'general',
    form: 'Strip of 15 Tablets',
    mrp: 34.00,
    prescriptionRequired: false,
    uses: 'Fever, Body ache, Headache, Mild arthritis',
    dosageInfo: '1 tablet every 6-8 hours after meals (Max 3 tabs/day)',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra (Govt. Generic Store)',
        price: 12.00,
        discountPercent: 65,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center, Block C',
        isBestPrice: true
      },
      {
        pharmacyName: 'MedPlus Pharmacy',
        price: 29.00,
        discountPercent: 15,
        distanceKm: 1.1,
        inStock: true,
        address: 'Main Market, Shop 4'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 32.00,
        discountPercent: 6,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square, Ground Floor'
      }
    ]
  },
  {
    id: 'med-2',
    brandName: 'Augmentin 625 Duo',
    genericName: 'Amoxicillin & Potassium Clavulanate (500mg+125mg)',
    category: 'Antibiotics',
    department: 'general',
    form: 'Strip of 10 Tablets',
    mrp: 204.00,
    prescriptionRequired: true,
    uses: 'Bacterial chest infections, Sinusitis, Dental abscess, Skin infections',
    dosageInfo: '1 tablet twice daily for 5 days with meals',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Generic Hub',
        price: 68.00,
        discountPercent: 67,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center, Block C',
        isBestPrice: true
      },
      {
        pharmacyName: 'Care & Cure Medical Store',
        price: 175.00,
        discountPercent: 14,
        distanceKm: 0.9,
        inStock: true,
        address: 'Main Bazaar Road'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 188.00,
        discountPercent: 8,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square'
      }
    ]
  },
  {
    id: 'med-3',
    brandName: 'Pan 40 Tablet',
    genericName: 'Pantoprazole Gastro-resistant 40mg',
    category: 'Acidity & Digestion',
    department: 'general',
    form: 'Strip of 15 Tablets',
    mrp: 155.00,
    prescriptionRequired: false,
    uses: 'GERD, Heartburn, Acid reflux, Peptic ulcer relief',
    dosageInfo: '1 tablet empty stomach in the morning 30 mins before breakfast',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra',
        price: 24.00,
        discountPercent: 84,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true
      },
      {
        pharmacyName: 'Sanjeevani Medicos',
        price: 125.00,
        discountPercent: 19,
        distanceKm: 1.2,
        inStock: true,
        address: 'Sector 4 Corner'
      },
      {
        pharmacyName: 'Wellness Forever Chemist',
        price: 139.00,
        discountPercent: 10,
        distanceKm: 2.0,
        inStock: true,
        address: 'Civil Lines'
      }
    ]
  },
  {
    id: 'med-4',
    brandName: 'Allegra 120mg',
    genericName: 'Fexofenadine Hydrochloride 120mg',
    category: 'Allergy & Skin',
    department: 'dermatology',
    form: 'Strip of 10 Tablets',
    mrp: 218.00,
    prescriptionRequired: false,
    uses: 'Allergic rhinitis, Skin hives, Sneezing, Itchy eyes',
    dosageInfo: '1 tablet daily at bedtime',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra (Generic Fexo)',
        price: 38.00,
        discountPercent: 82,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true
      },
      {
        pharmacyName: 'MedPlus Pharmacy',
        price: 185.00,
        discountPercent: 15,
        distanceKm: 1.1,
        inStock: true,
        address: 'Main Market'
      },
      {
        pharmacyName: 'City Care Chemist',
        price: 192.00,
        discountPercent: 12,
        distanceKm: 1.4,
        inStock: true,
        address: 'Near Metro Gate 2'
      }
    ]
  },
  {
    id: 'med-5',
    brandName: 'Atorva 10 Tablet',
    genericName: 'Atorvastatin Calcium 10mg',
    category: 'Cardiac & Cholesterol',
    department: 'cardiology',
    form: 'Strip of 15 Tablets',
    mrp: 142.00,
    prescriptionRequired: true,
    uses: 'Lowers bad cholesterol (LDL), protects heart health',
    dosageInfo: '1 tablet at night after food',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra',
        price: 28.00,
        discountPercent: 80,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 122.00,
        discountPercent: 14,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square'
      }
    ]
  },
  {
    id: 'med-6',
    brandName: 'Azithral 500 Tablet',
    genericName: 'Azithromycin 500mg',
    category: 'Antibiotics',
    department: 'general',
    form: 'Strip of 5 Tablets',
    formType: 'Tablet',
    availableForms: ['Tablet 500mg', 'Tablet 250mg', 'Suspension 200mg/5ml (Syrup)'],
    substitutes: [
      { name: 'Jan Aushadhi Azithromycin 500mg', price: 38.00, type: 'Govt Generic' },
      { name: 'Azee 500 (Cipla)', price: 119.00, type: 'Brand' },
      { name: 'Zithrox 500 (Macleods)', price: 110.00, type: 'Brand' }
    ],
    mrp: 128.00,
    prescriptionRequired: true,
    uses: 'Throat infection, Tonsillitis, Chest congestion, Typhoid',
    dosageInfo: '1 tablet once daily for 3 to 5 days, 1 hour before or 2 hours after meals',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Generic Store #104',
        price: 38.00,
        discountPercent: 70,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center, Block C',
        isBestPrice: true,
        phone: '+91 98112 34501'
      },
      {
        pharmacyName: 'MedPlus Pharmacy',
        price: 108.00,
        discountPercent: 15,
        distanceKm: 1.1,
        inStock: true,
        address: 'Main Market, Shop 4',
        phone: '+91 11 2678 1234'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 118.00,
        discountPercent: 8,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square',
        phone: '+91 11 4567 8900'
      }
    ]
  },
  {
    id: 'med-7',
    brandName: 'Glycomet GP 1 Tablet',
    genericName: 'Glimepiride 1mg + Metformin Hydrochloride 500mg',
    category: 'Diabetes Care',
    department: 'general',
    form: 'Strip of 15 Tablets',
    formType: 'Tablet',
    availableForms: ['Tablet 1mg/500mg', 'Tablet 2mg/500mg (Forte)', 'Plain Metformin 500mg'],
    substitutes: [
      { name: 'Jan Aushadhi Glimepiride+Metformin 1/500', price: 22.00, type: 'Govt Generic' },
      { name: 'Gemer 1 (Sun Pharma)', price: 125.00, type: 'Brand' },
      { name: 'Zoryl M 1 (Intas)', price: 118.00, type: 'Brand' }
    ],
    mrp: 138.00,
    prescriptionRequired: true,
    uses: 'Type 2 Diabetes mellitus, Blood sugar stabilization',
    dosageInfo: '1 tablet once daily with morning breakfast',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra (South Ext)',
        price: 22.00,
        discountPercent: 84,
        distanceKm: 0.6,
        inStock: true,
        address: 'Near Metro Gate 3',
        isBestPrice: true,
        phone: '+91 98112 34502'
      },
      {
        pharmacyName: 'LifeLine Community Chemist',
        price: 110.00,
        discountPercent: 20,
        distanceKm: 0.8,
        inStock: true,
        address: 'Pocket B Local Shopping Complex',
        phone: '+91 11 2987 6543'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 125.00,
        discountPercent: 9,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square',
        phone: '+91 11 4567 8900'
      }
    ]
  },
  {
    id: 'med-8',
    brandName: 'Telma 40 Tablet',
    genericName: 'Telmisartan 40mg',
    category: 'Cardiac & BP',
    department: 'cardiology',
    form: 'Strip of 30 Tablets',
    formType: 'Tablet',
    availableForms: ['Tablet 40mg', 'Tablet 20mg', 'Tablet 80mg', 'Telma-H (with Hydrochlorothiazide)'],
    substitutes: [
      { name: 'Jan Aushadhi Telmisartan 40mg', price: 45.00, type: 'Govt Generic' },
      { name: 'Telpres 40 (Abbott)', price: 195.00, type: 'Brand' },
      { name: 'Telmikind 40 (Mankind)', price: 140.00, type: 'Brand' }
    ],
    mrp: 225.00,
    prescriptionRequired: true,
    uses: 'High blood pressure (Hypertension), Cardiovascular risk reduction',
    dosageInfo: '1 tablet daily at fixed morning time, with or without food',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra',
        price: 45.00,
        discountPercent: 80,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true,
        phone: '+91 98112 34503'
      },
      {
        pharmacyName: 'Sanjeevani Medicos',
        price: 185.00,
        discountPercent: 18,
        distanceKm: 1.2,
        inStock: true,
        address: 'Sector 4 Corner Market',
        phone: '+91 98765 43210'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 205.00,
        discountPercent: 9,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square',
        phone: '+91 11 4567 8900'
      }
    ]
  },
  {
    id: 'med-9',
    brandName: 'Ascoril D Plus Syrup',
    genericName: 'Dextromethorphan HBr 10mg + Chlorpheniramine Maleate 2mg + Phenylephrine 5mg / 5ml',
    category: 'Cough & Cold',
    department: 'general',
    form: 'Bottle of 100ml Syrup',
    formType: 'Syrup',
    availableForms: ['Syrup 100ml Bottle', 'Syrup 60ml Bottle', 'Chewable Lozenges'],
    substitutes: [
      { name: 'Jan Aushadhi Dry Cough Formula Syrup', price: 35.00, type: 'Govt Generic' },
      { name: 'Benadryl DR Syrup (J&J)', price: 135.00, type: 'Brand' },
      { name: 'Chericof Syrup (Sun)', price: 128.00, type: 'Brand' }
    ],
    mrp: 142.00,
    prescriptionRequired: false,
    uses: 'Dry cough, Running nose, Sneezing, Throat irritation, Seasonal allergy',
    dosageInfo: '10ml (2 teaspoons) three times daily after meals',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra',
        price: 35.00,
        discountPercent: 75,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true,
        phone: '+91 98112 34504'
      },
      {
        pharmacyName: 'City Care Chemist',
        price: 118.00,
        discountPercent: 17,
        distanceKm: 1.4,
        inStock: true,
        address: 'Near Metro Gate 2',
        phone: '+91 11 3344 5566'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 132.00,
        discountPercent: 7,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square',
        phone: '+91 11 4567 8900'
      }
    ]
  },
  {
    id: 'med-10',
    brandName: 'Volini Pain Relief Gel',
    genericName: 'Diclofenac Diethylamine 1.16% + Virgin Linseed Oil 3% + Methyl Salicylate 10% + Menthol 5%',
    category: 'Fever & Pain',
    department: 'orthopedics',
    form: 'Tube of 50g Gel',
    formType: 'Gel',
    availableForms: ['Gel 50g Tube', 'Gel 30g Tube', 'Fast Action Spray 55g', 'Pain Relief Roll-On'],
    substitutes: [
      { name: 'Jan Aushadhi Diclofenac Pain Gel 50g', price: 40.00, type: 'Govt Generic' },
      { name: 'Moov Pain Relief Cream', price: 155.00, type: 'Brand' },
      { name: 'Omnigel 50g (Cipla)', price: 145.00, type: 'Brand' }
    ],
    mrp: 165.00,
    prescriptionRequired: false,
    uses: 'Lower back pain, Joint stiffness, Muscle strain, Sports sprain, Knee arthritis',
    dosageInfo: 'Gently apply 3-4 times daily on affected painful area without vigorous rubbing',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Generic Store',
        price: 40.00,
        discountPercent: 76,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true,
        phone: '+91 98112 34505'
      },
      {
        pharmacyName: 'Care & Cure Medical Store',
        price: 138.00,
        discountPercent: 16,
        distanceKm: 0.9,
        inStock: true,
        address: 'Main Bazaar Road',
        phone: '+91 98765 12345'
      },
      {
        pharmacyName: 'MedPlus Pharmacy',
        price: 148.00,
        discountPercent: 10,
        distanceKm: 1.1,
        inStock: true,
        address: 'Main Market, Shop 4',
        phone: '+91 11 2678 1234'
      }
    ]
  },
  {
    id: 'med-11',
    brandName: 'Combiflam Tablet',
    genericName: 'Ibuprofen 400mg + Paracetamol 325mg',
    category: 'Fever & Pain',
    department: 'orthopedics',
    form: 'Strip of 20 Tablets',
    formType: 'Tablet',
    availableForms: ['Tablet (20 Tabs)', 'Combiflam Icy Hot Gel', 'Combiflam Suspension (Syrup)'],
    substitutes: [
      { name: 'Jan Aushadhi Ibuprofen+Paracetamol', price: 14.00, type: 'Govt Generic' },
      { name: 'Ibugesic Plus (Cipla)', price: 42.00, type: 'Brand' },
      { name: 'Flexon (Aristo)', price: 40.00, type: 'Brand' }
    ],
    mrp: 48.00,
    prescriptionRequired: false,
    uses: 'Toothache, Headache, Menstrual cramps, Musculoskeletal pain, Fever',
    dosageInfo: '1 tablet after food with water (Max 3 tablets daily)',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra',
        price: 14.00,
        discountPercent: 71,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true,
        phone: '+91 98112 34506'
      },
      {
        pharmacyName: 'LifeLine Community Chemist',
        price: 39.00,
        discountPercent: 19,
        distanceKm: 0.8,
        inStock: true,
        address: 'Pocket B Shopping Complex',
        phone: '+91 11 2987 6543'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 44.00,
        discountPercent: 8,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square',
        phone: '+91 11 4567 8900'
      }
    ]
  },
  {
    id: 'med-12',
    brandName: 'Becosules Z Capsule',
    genericName: 'Vitamin B-Complex + Vitamin C 50mg + Elemental Zinc 41.4mg',
    category: 'Vitamins & Supplements',
    department: 'general',
    form: 'Strip of 20 Capsules',
    formType: 'Capsule',
    availableForms: ['Capsule (Strip of 20)', 'Becosules Syrup 100ml', 'Zincovit Tablet'],
    substitutes: [
      { name: 'Jan Aushadhi B-Complex + Zinc Capsule', price: 18.00, type: 'Govt Generic' },
      { name: 'Zincovit (Apex)', price: 110.00, type: 'Brand' },
      { name: 'Cobadex CZS (GlaxoSmithKline)', price: 95.00, type: 'Brand' }
    ],
    mrp: 58.00,
    prescriptionRequired: false,
    uses: 'Mouth ulcers, Post-fever weakness, Immunity booster, Hair and nail strength',
    dosageInfo: '1 capsule daily after lunch or breakfast',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra',
        price: 18.00,
        discountPercent: 69,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true,
        phone: '+91 98112 34507'
      },
      {
        pharmacyName: 'MedPlus Pharmacy',
        price: 49.00,
        discountPercent: 15,
        distanceKm: 1.1,
        inStock: true,
        address: 'Main Market, Shop 4',
        phone: '+91 11 2678 1234'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 54.00,
        discountPercent: 7,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square',
        phone: '+91 11 4567 8900'
      }
    ]
  },
  {
    id: 'med-13',
    brandName: 'Montair LC Tablet',
    genericName: 'Montelukast Sodium 10mg + Levocetirizine Dihydrochloride 5mg',
    category: 'Allergy & Skin',
    department: 'dermatology',
    form: 'Strip of 10 Tablets',
    formType: 'Tablet',
    availableForms: ['Tablet 10mg/5mg', 'Kid Montair LC Syrup 60ml', 'Montair LC Chewable'],
    substitutes: [
      { name: 'Jan Aushadhi Montelukast+Levocetirizine', price: 32.00, type: 'Govt Generic' },
      { name: 'Montek LC (Sun)', price: 185.00, type: 'Brand' },
      { name: 'Telekast L (Lupin)', price: 178.00, type: 'Brand' }
    ],
    mrp: 195.00,
    prescriptionRequired: true,
    uses: 'Allergic asthma, Persistent hay fever, Chronic urticaria hives, Night coughing',
    dosageInfo: '1 tablet daily at bedtime with a glass of water',
    pharmacies: [
      {
        pharmacyName: 'Jan Aushadhi Kendra',
        price: 32.00,
        discountPercent: 84,
        distanceKm: 0.6,
        inStock: true,
        address: 'Opposite Community Center',
        isBestPrice: true,
        phone: '+91 98112 34508'
      },
      {
        pharmacyName: 'Sanjeevani Medicos',
        price: 156.00,
        discountPercent: 20,
        distanceKm: 1.2,
        inStock: true,
        address: 'Sector 4 Corner',
        phone: '+91 98765 43210'
      },
      {
        pharmacyName: 'Apollo 24/7 Chemist',
        price: 178.00,
        discountPercent: 9,
        distanceKm: 1.5,
        inStock: true,
        address: 'Hospital Square',
        phone: '+91 11 4567 8900'
      }
    ]
  }
];

export const FORUM_POSTS = [
  {
    id: 'post-1',
    authorName: 'Rohan Sharma',
    authorRole: 'Patient / Student (DU)',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    title: 'Semester Exams mein severe migraine aur sleeplessness ho raha hai, kya karu?',
    content: 'Pichle 4 dino se continuous screen study ke baad left side sir me bohot tez dard ho raha hai. Paracetamol se thoda hi aaram mil raha hai. Koi safe routine ya medicine batayein please.',
    category: 'Neurology & Student Wellness',
    createdAt: '3 hours ago',
    upvotes: 28,
    commentsCount: 6,
    verifiedAnswer: {
      doctorName: 'Dr. Meera Kulkarni (Clinical Psychiatrist)',
      doctorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
      badge: 'Verified Doctor Answer',
      answer: 'Rohan, yeh classic "Tension-type / Screen-induced Cephalea" hai. 1) Har 45 minute baad 20-20-20 eye rest rule follow karein. 2) Water intake kam se kam 3 liters rakhein. 3) Agar throbbing pain aur vomiting sensation ho toh prescription-based anti-migraine medicine consult karein. Student counseling tab se free assessment book kar sakte ho.'
    }
  },
  {
    id: 'post-2',
    authorName: 'Dr. Rajesh Vardhan',
    authorRole: 'Senior Cardiologist (Apollo)',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    title: 'Health Article: 5 Early Warning Signs of High Blood Pressure that Young Indians Ignore',
    content: 'Hypertension is no longer an old-age disease. We are seeing 22-30 year olds in OPD with 150/95 BP. Key symptoms: Morning heaviness in the back of head, sudden breathlessness during climbing 2 flights of stairs, and unexplained irritability. Check your BP once every 3 months.',
    category: 'Cardiology Article',
    createdAt: '1 day ago',
    upvotes: 94,
    commentsCount: 19,
    isArticle: true
  },
  {
    id: 'post-3',
    authorName: 'Priya Mehra',
    authorRole: 'Patient',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Monsoon ke baad stubborn fungal itching on feet: Jan Aushadhi cream vs branded?',
    content: 'Doctor ne Luliconazole cream prescribe ki thi. Branded cream ₹240 ki hai jabki nearby Jan Aushadhi store pe ₹45 me available hai. Kya quality same hoti hai?',
    category: 'Dermatology & Medicine Radar',
    createdAt: '2 days ago',
    upvotes: 45,
    commentsCount: 12,
    verifiedAnswer: {
      doctorName: 'Dr. Ananya Sen (Dermatologist)',
      doctorAvatar: 'https://images.unsplash.com/photo-1594824813583-a4175b2257d0?w=150&auto=format&fit=crop&q=80',
      badge: 'Verified Doctor Answer',
      answer: 'Haan Priya! Indian Pharmacopoeia standard dono medicines par barabar apply hota hai. Active molecule Luliconazole 1% w/w dono me 100% same efficacy deta hai. Aap bina jhijhak Jan Aushadhi generic le sakti hain.'
    }
  }
];

export const INITIAL_USER = {
  name: 'Aman Sharma',
  email: 'aman.student@campus.edu',
  isStudent: true,
  healthCredits: 350, // 1 Credit = ₹1 value in medicines/OPD
  completedTreatments: 3,
  medReminders: [
    {
      id: 'rem-1',
      name: 'Pantoprazole 40mg',
      dosage: '1 Tab',
      timeSlot: 'Morning (Empty Stomach)',
      takenToday: true,
      time: '08:00 AM'
    },
    {
      id: 'rem-2',
      name: 'Multivitamin & Zinc',
      dosage: '1 Capsule',
      timeSlot: 'Afternoon (Post Lunch)',
      takenToday: false,
      time: '02:00 PM'
    },
    {
      id: 'rem-3',
      name: 'Fexofenadine 120mg',
      dosage: '1 Tab',
      timeSlot: 'Night (Before Bed)',
      takenToday: false,
      time: '10:00 PM'
    }
  ],
  vitals: {
    bloodPressure: '120/80 mmHg',
    waterIntakeLiters: 2.2,
    waterGoalLiters: 3.5,
    streakDays: 6
  }
};

// 1. REVERSE BIDDING / CUSTOM PRICE BIDDING
export const REVERSE_BIDS = [
  {
    id: 'bid-1',
    patientName: 'Aman Sharma',
    treatmentTitle: 'Root Canal Treatment with Zirconia Crown (Molar)',
    specialty: 'Dentistry',
    targetBudget: 7500,
    preferredLocation: 'South Extension, New Delhi',
    preferredDate: 'Within 3 Days',
    urgency: 'Moderate Pain',
    status: 'Bidding Active',
    bidsCount: 3,
    clinicOffers: [
      {
        id: 'offer-1',
        clinicName: 'Dr. Rajesh Dental Clinic & Implant Center',
        doctorName: 'Dr. R. K. Sharma (MDS)',
        offeredPrice: 7000,
        distanceKm: 1.2,
        rating: 4.9,
        turnaround: 'Can accommodate Tomorrow 11:00 AM',
        inclusions: ['Rotary RCT', 'CAD/CAM Zirconia Crown (5-Yr Warranty)', 'Digital X-Rays (Pre & Post)', '2 Free Checkups'],
        isPriceGuaranteed: true
      },
      {
        id: 'offer-2',
        clinicName: 'Apollo City Dental Suite',
        doctorName: 'Dr. Neha Agarwal',
        offeredPrice: 7400,
        distanceKm: 2.1,
        rating: 4.8,
        turnaround: 'Slot available Today 04:30 PM',
        inclusions: ['Painless Laser RCT', 'Zirconia Crown', 'Antibiotic & Pain Meds Kit', 'Free Scaling'],
        isPriceGuaranteed: true
      },
      {
        id: 'offer-3',
        clinicName: 'LifeLine Community Dental',
        doctorName: 'Dr. Sunita Jain',
        offeredPrice: 6600,
        distanceKm: 0.9,
        rating: 4.7,
        turnaround: 'Slot available Tomorrow 02:00 PM',
        inclusions: ['Standard Rotary RCT', 'Zirconia Cap', '1 Follow-up Consultation'],
        isPriceGuaranteed: true
      }
    ]
  },
  {
    id: 'bid-2',
    patientName: 'Vikram Joshi',
    treatmentTitle: 'Diagnostic MRI Brain with Contrast (3 Tesla)',
    specialty: 'Neurology / Radiology',
    targetBudget: 3500,
    preferredLocation: 'Saket / Malviya Nagar',
    preferredDate: 'Immediate / 24 Hours',
    urgency: 'High',
    status: 'Bidding Active',
    bidsCount: 2,
    clinicOffers: [
      {
        id: 'offer-4',
        clinicName: 'City Trauma Neuro Diagnostics',
        doctorName: 'Dr. A. Chatterjee Review',
        offeredPrice: 3200,
        distanceKm: 2.8,
        rating: 4.9,
        turnaround: 'Scan in 2 hours • Verified Report in 4 hours',
        inclusions: ['3T Siemens High-Res MRI', 'Contrast Agent Included', 'Digital Cloud Access & DICOM Film'],
        isPriceGuaranteed: true
      },
      {
        id: 'offer-5',
        clinicName: 'MetroScan Advanced Imaging Center',
        doctorName: 'Dr. Priya V. (Radiologist)',
        offeredPrice: 3400,
        distanceKm: 1.5,
        rating: 4.8,
        turnaround: 'Scan Slot Tonight 08:00 PM',
        inclusions: ['Silent Scan Technology', 'Senior Radiologist Sign-off', 'Free Home Delivery of Film'],
        isPriceGuaranteed: true
      }
    ]
  }
];

// 2. GROUP / COMMUNITY SURGERY POOLING
export const SURGERY_POOLS = [
  {
    id: 'pool-1',
    surgeryName: 'Cataract Micro-Incision Phaco Surgery (Hydrophobic Foldable IOL)',
    department: 'Ophthalmology',
    hospitalName: 'Apollo City Hospital & Vision Suite',
    individualCost: 32000,
    pooledGroupCost: 22400,
    savingsPercent: 30,
    targetCohortSize: 5,
    currentJoinedCount: 4,
    surgeryDate: '5th October 2026',
    status: '1 Slot Remaining to Lock 30% Off',
    inclusions: [
      'Pre-Op Biometry & A-Scan',
      'Operating Theater Bulk Block Rate',
      'Hydrophobic Foldable Monofocal Lens',
      'Daycare Suite & 3 Post-Op Visits'
    ]
  },
  {
    id: 'pool-2',
    surgeryName: 'Single-Port Laparoscopic Cholecystectomy (Gallbladder Removal)',
    department: 'General & Laparoscopic Surgery',
    hospitalName: 'MaxCure Super Speciality Hospital',
    individualCost: 55000,
    pooledGroupCost: 39500,
    savingsPercent: 28,
    targetCohortSize: 6,
    currentJoinedCount: 4,
    surgeryDate: '12th October 2026',
    status: '2 Slots Remaining',
    inclusions: [
      'Senior Laparoscopic Surgeon Team',
      '1 Night Private Room Stay',
      'OT Consumables & Anesthesia Package',
      '14-Day Free Wound Care Follow-up'
    ]
  },
  {
    id: 'pool-3',
    surgeryName: 'Bladeless Femto-Lasik Vision Correction (Both Eyes)',
    department: 'Ophthalmology',
    hospitalName: 'City Trauma & Neuro Vision Center',
    individualCost: 65000,
    pooledGroupCost: 45000,
    savingsPercent: 31,
    targetCohortSize: 8,
    currentJoinedCount: 6,
    surgeryDate: '8th October 2026',
    status: '2 Slots Remaining',
    inclusions: [
      'Wavefront Guided Custom Treatment',
      'Corneal Topography & Pachymetry',
      'Protective Eye Shield & Meds Kit',
      '6 Months Free Vision Follow-ups'
    ]
  }
];

// 3. ALL-INCLUSIVE PROCEDURE COST ESTIMATOR & ITEMIZED BREAKDOWNS
export const PROCEDURE_ESTIMATES = [
  {
    id: 'proc-1',
    procedureName: 'Normal Vaginal Delivery & Newborn Care',
    category: 'Maternity & Childbirth',
    averageHospitalCost: 52000,
    maxGuaranteedCost: 38500,
    savingsAmount: 13500,
    hospitalName: 'MaxCure Super Speciality Hospital',
    priceGuaranteeCovered: true,
    emiOptions: {
      months: 6,
      monthlyAmount: 6416,
      isZeroCost: true
    },
    itemizedBreakdown: [
      { component: 'Senior Obstetrician & Pediatrician Delivery Fee', amount: 16000, note: 'Round-the-clock attending specialist' },
      { component: 'Room & Nursing Charges (2 Days AC Semi-Private)', amount: 11000, note: 'Includes patient meals & dedicated nurse' },
      { component: 'Mandatory Lab Diagnostics & Newborn Blood Screening', amount: 4500, note: 'Bilirubin, Blood Grouping, Infection Screen' },
      { component: 'Standard Medications, IV Fluids & Consumables', amount: 4500, note: 'No surprise consumables bill' },
      { component: 'Post-Natal Follow-up Visits (14 Days Window)', amount: 2500, note: '100% Free / Bundled in package' }
    ]
  },
  {
    id: 'proc-2',
    procedureName: 'Unilateral Total Knee Replacement (TKR) with Robotic Precision',
    category: 'Orthopedics',
    averageHospitalCost: 215000,
    maxGuaranteedCost: 165000,
    savingsAmount: 50000,
    hospitalName: 'Fortis Health Point & Joint Clinic',
    priceGuaranteeCovered: true,
    emiOptions: {
      months: 12,
      monthlyAmount: 13750,
      isZeroCost: true
    },
    itemizedBreakdown: [
      { component: 'Senior Orthopedic Surgeon & Surgical Team', amount: 60000, note: 'Dr. Vikram Malhotra (19 Yrs Exp)' },
      { component: 'Imported US-FDA Approved Titanium Joint Implant', amount: 45000, note: 'With 20-Year Manufacturer Warranty Card' },
      { component: 'Modular OT, Robotic Navigation & 3 Days Room', amount: 32000, note: 'Zero infection controlled environment' },
      { component: 'Pre-op Vitals, Anesthesia & In-hospital Pharmacy', amount: 18000, note: 'Fixed capped consumables' },
      { component: 'Post-Op Home Physiotherapy (5 Personalized Sessions)', amount: 10000, note: 'Doorstep certified therapist included' }
    ]
  },
  {
    id: 'proc-3',
    procedureName: 'Single Sitting Root Canal + High-Strength Zirconia Crown',
    category: 'Dental',
    averageHospitalCost: 10500,
    maxGuaranteedCost: 6800,
    savingsAmount: 3700,
    hospitalName: 'LifeLine Community Multi-Speciality Clinic',
    priceGuaranteeCovered: true,
    emiOptions: {
      months: 3,
      monthlyAmount: 2266,
      isZeroCost: true
    },
    itemizedBreakdown: [
      { component: 'Endodontic Specialist Biomechanical RCT', amount: 3200, note: 'Apex locator assisted, single visit' },
      { component: 'CAD/CAM Milled Zirconia Monolithic Crown', amount: 2400, note: 'Natural shade match, 5-yr warranty' },
      { component: 'Digital RVG Diagnostic Radiographs (3 Exposures)', amount: 600, note: 'Immediate digital record' },
      { component: 'Post-Procedural Antibiotic & Anti-inflammatory Kit', amount: 600, note: 'Complete 3-day recovery pack' }
    ]
  }
];

// 4. PEER-VERIFIED BILL UPLOADS (CROWD-SOURCED HISTORICAL TRANSPARENCY)
export const PEER_BILLS = [
  {
    id: 'bill-1',
    procedureName: 'Coronary Angiography (Radial Route)',
    hospitalName: 'Apollo Hospital, Sarita Vihar',
    city: 'New Delhi',
    amountPaid: 14200,
    quotedInitialAmount: 19500,
    dateUploaded: '18 Sep 2026',
    verifiedStamp: 'MedBridge Verified Invoice #MB-VER-891',
    daysAdmitted: 'Daycare (5 Hours)',
    patientReviewSnippet: 'Booked via MedBridge package. Initial counter asked for extra sheath fee, but MedBridge Price Guarantee held it at ₹14,200. Zero hidden costs.',
    isAnonymized: true,
    billType: 'Cardiology'
  },
  {
    id: 'bill-2',
    procedureName: 'Laparoscopic Appendix Removal',
    hospitalName: 'Max Healthcare, Saket',
    city: 'South Delhi',
    amountPaid: 48500,
    quotedInitialAmount: 64000,
    dateUploaded: '12 Sep 2026',
    verifiedStamp: 'MedBridge Verified Invoice #MB-VER-944',
    daysAdmitted: '1 Night / 2 Days',
    patientReviewSnippet: 'Discharged on time. All pharmacy medications were billed at Jan Aushadhi generic equivalents, saving over ₹15,000.',
    isAnonymized: true,
    billType: 'Surgery'
  },
  {
    id: 'bill-3',
    procedureName: 'Clinical Acne Therapy & Chemical Peel Session',
    hospitalName: 'GlowSkin Advanced Clinical Dermatology',
    city: 'New Delhi',
    amountPaid: 2900,
    quotedInitialAmount: 4200,
    dateUploaded: '22 Sep 2026',
    verifiedStamp: 'MedBridge Verified Invoice #MB-VER-102',
    daysAdmitted: 'Outpatient (45 Mins)',
    patientReviewSnippet: 'Used student health credits to lower bill from ₹3,500 down to ₹2,900. Doctor provided full itemized receipt on app.',
    isAnonymized: true,
    billType: 'Dermatology'
  }
];

// 5. LIVE OPD QUEUE TRACKER
export const LIVE_QUEUE_DATA = {
  'doc-1': {
    doctorName: 'Dr. Rajesh Vardhan (Cardiology)',
    clinicLocation: 'Apollo City Hospital, Room 204',
    currentlyServingToken: 14,
    yourToken: 18,
    estimatedMinutesWait: 14,
    estimatedTime: '11:35 AM Today',
    doctorStatus: 'In Consultation Room',
    statusColor: '#059669',
    patientsAhead: 3,
    avgConsultationMins: 9,
    delayAlert: 'No delays • Running precisely on schedule'
  },
  'doc-2': {
    doctorName: 'Dr. Ananya Sen (Dermatology)',
    clinicLocation: 'GlowSkin Advanced Clinic, Cabin B',
    currentlyServingToken: 8,
    yourToken: 11,
    estimatedMinutesWait: 12,
    estimatedTime: '02:18 PM Today',
    doctorStatus: 'In Consultation Room',
    statusColor: '#059669',
    patientsAhead: 2,
    avgConsultationMins: 8,
    delayAlert: 'Running 4 mins ahead of schedule'
  },
  'doc-3': {
    doctorName: 'Dr. Vikram Malhotra (Orthopedics)',
    clinicLocation: 'Fortis Health Point, OPD-3',
    currentlyServingToken: 21,
    yourToken: 24,
    estimatedMinutesWait: 22,
    estimatedTime: '04:42 PM Today',
    doctorStatus: 'Attending Minor Dressing',
    statusColor: '#d97706',
    patientsAhead: 2,
    avgConsultationMins: 11,
    delayAlert: '+6 Mins slight delay due to emergency trauma triage'
  }
};

// 6. DOORSTEP SAMPLE COLLECTION & TELE-CONSULT HYBRID BUNDLES
export const HYBRID_BUNDLES = [
  {
    id: 'bundle-1',
    bundleTitle: 'Complete Metabolic & Diabetes Care Bundle',
    tag: 'Most Booked Hybrid Care',
    standaloneValue: 1850,
    bundledPrice: 899,
    savingsPercent: 51,
    deliveryWindow: 'Tomorrow 07:00 AM - 09:00 AM (Fasting)',
    inclusions: [
      'Senior Physician 1-on-1 Virtual Tele-Consult',
      'Doorstep Home Phlebotomy Sample Collection',
      'HbA1c, Fasting Blood Sugar & Lipid Profile (12 Tests)',
      'Digital Lab Report within 10 Hours',
      'Post-Report Medication & Diet Follow-up Review'
    ]
  },
  {
    id: 'bundle-2',
    bundleTitle: 'Cardiac Preventive Shield & Home ECG Bundle',
    tag: 'Heart Care Package',
    standaloneValue: 2400,
    bundledPrice: 1199,
    savingsPercent: 50,
    deliveryWindow: 'Tomorrow 08:00 AM - 10:00 AM',
    inclusions: [
      'Cardiologist Tele-Consultation (AIIMS Alum)',
      'At-Home 12-Lead Digital ECG Recording by Certified Tech',
      'Lipid Profile, Serum Creatinine & Uric Acid',
      'Cardiovascular Risk Assessment Scorecard',
      'Personalized Sodium & BP Diet Protocol'
    ]
  },
  {
    id: 'bundle-3',
    bundleTitle: 'Student Fatigue, Stress & Immunity Panel',
    tag: 'Campus Wellness Subsidized',
    standaloneValue: 1650,
    bundledPrice: 649,
    savingsPercent: 61,
    deliveryWindow: 'Within 24 Hours Doorstep Slot',
    inclusions: [
      'Student Wellness Counselor / Doctor Video Call',
      'Home Blood Sample (Vitamin D3, B12, CBC & Thyroid TSH)',
      'Exam Stress & Sleep Quality Digital Assessment',
      'Generic Micronutrient Supplement Prescription Delivered'
    ]
  }
];

// 7. SECOND OPINION MARKETPLACE
export const SECOND_OPINION_SPECIALISTS = [
  {
    id: 'sec-1',
    doctorName: 'Dr. Rajesh Vardhan',
    specialty: 'Senior Interventional Cardiologist',
    credentials: 'MBBS, MD, DM (Cardiology) - AIIMS New Delhi',
    fixedFee: 499,
    turnaroundHours: 24,
    casesReviewed: 1420,
    rating: 4.95,
    hospital: 'Apollo City Hospital',
    suitableFor: ['Angiography CD Review', 'Bypass vs Stent Opinions', 'Hypertension / Heart Failure Plans']
  },
  {
    id: 'sec-2',
    doctorName: 'Dr. Vikram Malhotra',
    specialty: 'Senior Joint & Spine Surgeon',
    credentials: 'MBBS, MS (Ortho), M.Ch (UK) - 19 Yrs Exp',
    fixedFee: 599,
    turnaroundHours: 24,
    casesReviewed: 2180,
    rating: 4.94,
    hospital: 'Fortis Health Point',
    suitableFor: ['Knee Surgery Necessity Check', 'Spine MRI Disc Bulge', 'Sports ACL / Meniscus Validation']
  },
  {
    id: 'sec-3',
    doctorName: 'Dr. Amitav Chatterjee',
    specialty: 'Senior Neurologist & Stroke Specialist',
    credentials: 'MBBS, DM (Neurology) - NIMHANS Bengaluru',
    fixedFee: 499,
    turnaroundHours: 24,
    casesReviewed: 980,
    rating: 4.92,
    hospital: 'NeuroSpine Multi-Speciality Clinic',
    suitableFor: ['Chronic Migraine Protocols', 'Brain MRI Second Look', 'Epilepsy / Seizure Medication Review']
  }
];

// 8. MULTI-HOSPITAL "COST VS QUALITY" COMPARISON MATRIX
export const HOSPITAL_COMPARISON_MATRIX = [
  {
    feature: 'Package Cost (Angiography)',
    maxCure: '₹15,000 (Guaranteed)',
    apollo: '₹14,200 (Guaranteed)',
    cityTrauma: '₹13,500 (Guaranteed)'
  },
  {
    feature: 'ICU Bed Availability',
    maxCure: '8 Beds (Live)',
    apollo: '12 Beds (Live)',
    cityTrauma: '14 Beds (Live)'
  },
  {
    feature: 'Doctor Team Experience',
    maxCure: '15+ Years Avg (AIIMS/PGI)',
    apollo: '16+ Years Avg (Apollo Faculty)',
    cityTrauma: '14+ Years Avg (Trauma Board)'
  },
  {
    feature: 'Avg Hospital Stay',
    maxCure: '4.5 Hours (Radial Daycare)',
    apollo: '5 Hours (Radial Daycare)',
    cityTrauma: '6 Hours (Daycare)'
  },
  {
    feature: 'Cashless TPA & Ayushman (PM-JAY)',
    maxCure: '100% Cashless (38 TPAs)',
    apollo: '100% Cashless (42 TPAs)',
    cityTrauma: '100% Cashless (30 TPAs)'
  },
  {
    feature: 'MedBridge Price Guarantee',
    maxCure: 'Active (100% Shield)',
    apollo: 'Active (100% Shield)',
    cityTrauma: 'Active (100% Shield)'
  }
];


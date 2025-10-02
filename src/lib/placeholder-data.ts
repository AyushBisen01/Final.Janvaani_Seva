
import type { Issue, User } from './types';

// This file now acts as a mock database.
// The API routes will use these arrays as their data source.

let users: User[] = [
  {
    id: 'user-1',
    name: 'Admin User',
    email: 'admin@civic.gov',
    role: 'Super Admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=admin@civic.gov',
  },
  {
    id: 'user-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@civic.gov',
    role: 'Department Head',
    avatarUrl: 'https://i.pravatar.cc/150?u=priya.sharma@civic.gov',
    department: 'Sanitation Dept.'
  },
  {
    id: 'user-3',
    name: 'Amit Patel',
    email: 'amit.patel@civic.gov',
    role: 'Staff',
    avatarUrl: 'https://i.pravatar.cc/150?u=amit.patel@civic.gov',
    department: 'Public Works Dept.'
  },
   {
    id: 'user-4',
    name: 'Sunita Rao',
    email: 'sunita.rao@civic.gov',
    role: 'Department Head',
    avatarUrl: 'https://i.pravatar.cc/150?u=sunita.rao@civic.gov',
    department: 'Water Dept.'
  },
   {
    id: 'user-5',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@civic.gov',
    role: 'Staff',
    avatarUrl: 'https://i.pravatar.cc/150?u=rajesh.kumar@civic.gov',
    department: 'Electricity Dept.'
  },
];

let issues: Issue[] = [
  {
    id: 'CIV-001',
    category: 'Pothole',
    description: 'Large pothole at the entrance of the main market, causing traffic issues.',
    location: { address: 'Sitabuldi Main Rd, Nagpur', lat: 21.1463, lng: 79.0822 },
    status: 'Pending',
    priority: 'High',
    reportedAt: '2024-07-20T09:00:00Z',
    citizen: { name: 'Aarav Gupta', contact: 'aarav.g@email.com' },
    imageUrl: 'https://picsum.photos/seed/pothole1/800/600',
    imageHint: 'pothole road',
    greenFlags: 25,
    redFlags: 2,
    redFlagReasons: [
        { reason: 'This is a duplicate of issue CIV-005', user: 'ConcernedCitizen1' },
        { reason: 'The pothole is much bigger than it looks in the photo', user: 'LocalShopkeeper' }
    ]
  },
  {
    id: 'CIV-002',
    category: 'Garbage',
    description: 'Garbage bin overflowing for three days near the park.',
    location: { address: 'Dharampeth, Nagpur', lat: 21.1434, lng: 79.0622 },
    status: 'inProgress',
    priority: 'Medium',
    reportedAt: '2024-07-19T14:30:00Z',
    assignedTo: 'Sanitation Dept.',
    citizen: { name: 'Saanvi Sharma', contact: 'saanvi.s@email.com' },
    imageUrl: 'https://picsum.photos/seed/garbage1/800/600',
    imageHint: 'garbage overflow',
    greenFlags: 15,
    redFlags: 0,
    redFlagReasons: []
  },
  {
    id: 'CIV-003',
    category: 'Water Leakage',
    description: 'Clean water pipe leakage on the sidewalk.',
    location: { address: 'Koregaon Park, Pune', lat: 18.5362, lng: 73.8939 },
    status: 'Resolved',
    priority: 'High',
    reportedAt: '2024-07-18T11:00:00Z',
    resolvedAt: '2024-07-19T17:00:00Z',
    assignedTo: 'Water Dept.',
    citizen: { name: 'Vihaan Reddy', contact: 'vihaan.r@email.com' },
    imageUrl: 'https://picsum.photos/seed/water1/800/600',
    imageHint: 'water leak',
    proofUrl: 'https://picsum.photos/seed/proof1/800/600',
    proofHint: 'pipe repaired',
    greenFlags: 50,
    redFlags: 1,
    redFlagReasons: [
        { reason: 'The repair was temporary and is leaking again.', user: 'Resident22'}
    ]
  },
  {
    id: 'CIV-004',
    category: 'Streetlight Outage',
    description: 'Streetlight not working for a week, causing safety concerns at night.',
    location: { address: 'Bandra West, Mumbai', lat: 19.0544, lng: 72.8400 },
    status: 'Approved',
    priority: 'Medium',
    reportedAt: '2024-07-21T08:00:00Z',
    citizen: { name: 'Ananya Singh', contact: 'ananya.s@email.com' },
    imageUrl: 'https://picsum.photos/seed/light1/800/600',
    imageHint: 'street light',
    greenFlags: 8,
    redFlags: 22,
    redFlagReasons: [
        { reason: 'This has been reported multiple times already.', user: 'NightWalker'},
        { reason: 'Not an issue, the light is working fine now.', user: 'LocalVendor'}
    ]
  },
    {
    id: 'CIV-005',
    category: 'Pothole',
    description: 'Multiple small potholes on the highway exit ramp.',
    location: { address: 'Mumbai-Pune Expressway, Navi Mumbai', lat: 19.0330, lng: 73.0297 },
    status: 'Pending',
    priority: 'Medium',
    reportedAt: '2024-07-22T10:15:00Z',
    citizen: { name: 'Advait Joshi', contact: 'advait.j@email.com' },
    imageUrl: 'https://picsum.photos/seed/pothole2/800/600',
    imageHint: 'pothole highway',
    greenFlags: 5,
    redFlags: 1,
    redFlagReasons: []
  },
  {
    id: 'CIV-006',
    category: 'Garbage',
    description: 'Construction debris dumped illegally by the river bank.',
    location: { address: 'Ramdaspeth, Nagpur', lat: 21.1352, lng: 79.0645 },
    status: 'inProgress',
    priority: 'High',
    reportedAt: '2024-07-21T18:45:00Z',
    assignedTo: 'Sanitation Dept.',
    citizen: { name: 'Myra Das', contact: 'myra.d@email.com' },
    imageUrl: 'https://picsum.photos/seed/garbage2/800/600',
    imageHint: 'debris dumped',
    greenFlags: 30,
    redFlags: 3,
    redFlagReasons: []
  },
  {
    id: 'CIV-007',
    category: 'Broken Park Bench',
    description: 'A wooden bench in the central park is broken and has sharp edges.',
    location: { address: 'Central Park, Delhi', lat: 28.6139, lng: 77.2090 },
    status: 'Approved',
    priority: 'Low',
    reportedAt: '2024-07-23T11:00:00Z',
    citizen: { name: 'Ishaan Verma', contact: 'ishaan.v@email.com' },
    imageUrl: 'https://picsum.photos/seed/bench1/800/600',
    imageHint: 'broken bench',
    greenFlags: 12,
    redFlags: 0,
    redFlagReasons: []
  },
  {
    id: 'CIV-008',
    category: 'Faded Crosswalk',
    description: 'The zebra crossing near the school is barely visible. It needs repainting.',
    location: { address: 'Anna Nagar, Chennai', lat: 13.085, lng: 80.2104 },
    status: 'Resolved',
    priority: 'Medium',
    reportedAt: '2024-07-15T09:20:00Z',
    resolvedAt: '2024-07-22T16:00:00Z',
    assignedTo: 'Public Works Dept.',
    citizen: { name: 'Diya Mehta', contact: 'diya.m@email.com' },
    imageUrl: 'https://picsum.photos/seed/crosswalk1/800/600',
    imageHint: 'faded crosswalk',
    proofUrl: 'https://picsum.photos/seed/proof2/800/600',
    proofHint: 'crosswalk painted',
    greenFlags: 45,
    redFlags: 0,
    redFlagReasons: []
  },
  {
    id: 'CIV-009',
    category: 'Illegal Hoarding',
    description: 'A large advertisement banner is blocking the view of a traffic signal.',
    location: { address: 'Indiranagar, Bangalore', lat: 12.9784, lng: 77.6408 },
    status: 'Rejected',
    priority: 'Medium',
    reportedAt: '2024-07-22T15:00:00Z',
    citizen: { name: 'Kabir Kumar', contact: 'kabir.k@email.com' },
    imageUrl: 'https://picsum.photos/seed/hoarding1/800/600',
    imageHint: 'illegal banner',
    greenFlags: 2,
    redFlags: 10,
    redFlagReasons: [{reason: "This is a permitted banner for a local event.", user: "EventOrganizer"}]
  },
  {
    id: 'CIV-010',
    category: 'Clogged Drain',
    description: 'The main storm drain on the street is clogged, causing waterlogging after rain.',
    location: { address: 'Salt Lake, Kolkata', lat: 22.5851, lng: 88.4202 },
    status: 'Pending',
    priority: 'High',
    reportedAt: '2024-07-24T07:45:00Z',
    citizen: { name: 'Rohan Bose', contact: 'rohan.b@email.com' },
    imageUrl: 'https://picsum.photos/seed/drain1/800/600',
    imageHint: 'clogged drain',
    greenFlags: 18,
    redFlags: 1,
    redFlagReasons: []
  },
];

// Functions to interact with the mock database
export const _getIssues = () => issues;

export const _getUsers = () => users;

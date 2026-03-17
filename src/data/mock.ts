export const facilities = [
  { id: 'fitness', name: 'Fitness Center', bookings: 24, openSlots: 8, status: 'Open', utilization: 78, color: '#38bdf8' },
  { id: 'fields', name: 'Outdoor Fields', bookings: 12, openSlots: 6, status: 'Open', utilization: 65, color: '#34d399' },
  { id: 'community', name: 'Community Rooms', bookings: 9, openSlots: 3, status: 'Open', utilization: 72, color: '#a78bfa' },
  { id: 'event', name: 'Event Hall', bookings: 4, openSlots: 2, status: 'Reserved', utilization: 88, color: '#fb923c' },
  { id: 'aquatics', name: 'Aquatics Area', bookings: 16, openSlots: 4, status: 'Open', utilization: 82, color: '#22d3ee' },
  { id: 'recreation', name: 'Recreation Office/Rental Desk', bookings: 8, openSlots: 5, status: 'Open', utilization: 56, color: '#f472b6' },
];

export const staffUsers = [
  { id: 1, name: 'Col. Marcus Webb', email: 'admin@thekeeper.mil-demo', role: 'System Administrator', status: 'Active', facility: 'All Facilities', lastLogin: '2026-03-17 08:12' },
  { id: 2, name: 'SSgt. Diana Torres', email: 'staff@thekeeper.mil-demo', role: 'Front Desk Staff', status: 'Active', facility: 'Fitness Center', lastLogin: '2026-03-17 07:45' },
  { id: 3, name: 'TSgt. Brian Caldwell', email: 'b.caldwell@thekeeper.mil-demo', role: 'Recreation Manager', status: 'Active', facility: 'All Facilities', lastLogin: '2026-03-17 08:30' },
  { id: 4, name: 'A1C Megan Park', email: 'm.park@thekeeper.mil-demo', role: 'POS Operator', status: 'Active', facility: 'Recreation Office/Rental Desk', lastLogin: '2026-03-17 09:05' },
  { id: 5, name: 'SrA. Kevin Nguyen', email: 'k.nguyen@thekeeper.mil-demo', role: 'Finance Reviewer', status: 'Active', facility: 'All Facilities', lastLogin: '2026-03-16 16:22' },
  { id: 6, name: 'MSgt. Laura Jennings', email: 'l.jennings@thekeeper.mil-demo', role: 'Facility Coordinator', status: 'Active', facility: 'Event Hall', lastLogin: '2026-03-17 07:58' },
];

export const customers = [
  { id: 1, name: 'James R. Patterson', email: 'j.patterson@moody.af.mil', phone: '(229) 555-0142', status: 'Active Member', type: 'Active Duty', household: 3, visits: 47, lastVisit: '2026-03-17', waivers: true, balance: 0 },
  { id: 2, name: 'Sarah M. Collins', email: 's.collins@moody.af.mil', phone: '(229) 555-0198', status: 'Active Member', type: 'Spouse', household: 4, visits: 32, lastVisit: '2026-03-16', waivers: true, balance: 0 },
  { id: 3, name: 'Michael T. Brooks', email: 'm.brooks@moody.af.mil', phone: '(229) 555-0167', status: 'Active Member', type: 'Active Duty', household: 2, visits: 58, lastVisit: '2026-03-17', waivers: true, balance: 12.50 },
  { id: 4, name: 'Emily J. Vasquez', email: 'e.vasquez@gmail.com', phone: '(229) 555-0213', status: 'Walk-in Visitor', type: 'Dependent', household: 1, visits: 3, lastVisit: '2026-03-15', waivers: false, balance: 0 },
  { id: 5, name: 'Robert L. Chen', email: 'r.chen@moody.af.mil', phone: '(229) 555-0189', status: 'Active Member', type: 'Active Duty', household: 5, visits: 91, lastVisit: '2026-03-17', waivers: true, balance: 0 },
  { id: 6, name: 'Amanda K. Wright', email: 'a.wright@moody.af.mil', phone: '(229) 555-0234', status: 'Active Member', type: 'Spouse', household: 3, visits: 24, lastVisit: '2026-03-14', waivers: true, balance: 8.00 },
  { id: 7, name: 'David W. Thompson', email: 'd.thompson@moody.af.mil', phone: '(229) 555-0156', status: 'Frequent Renter', type: 'Retired', household: 2, visits: 67, lastVisit: '2026-03-17', waivers: true, balance: 0 },
  { id: 8, name: 'Jessica A. Morales', email: 'j.morales@yahoo.com', phone: '(229) 555-0178', status: 'Active Member', type: 'Active Duty', household: 4, visits: 39, lastVisit: '2026-03-16', waivers: true, balance: 0 },
  { id: 9, name: 'Christopher N. Davis', email: 'c.davis@moody.af.mil', phone: '(229) 555-0201', status: 'Active Member', type: 'Active Duty', household: 2, visits: 15, lastVisit: '2026-03-13', waivers: true, balance: 25.00 },
  { id: 10, name: 'Lisa M. Anderson', email: 'l.anderson@moody.af.mil', phone: '(229) 555-0145', status: 'Active Member', type: 'Spouse', household: 3, visits: 28, lastVisit: '2026-03-17', waivers: true, balance: 0 },
  { id: 11, name: 'Mark S. Robinson', email: 'm.robinson@moody.af.mil', phone: '(229) 555-0223', status: 'Walk-in Visitor', type: 'Civilian', household: 1, visits: 5, lastVisit: '2026-03-12', waivers: false, balance: 0 },
  { id: 12, name: 'Karen P. Foster', email: 'k.foster@moody.af.mil', phone: '(229) 555-0190', status: 'Active Member', type: 'Active Duty', household: 2, visits: 44, lastVisit: '2026-03-17', waivers: true, balance: 0 },
  { id: 13, name: 'Daniel H. Garcia', email: 'd.garcia@moody.af.mil', phone: '(229) 555-0167', status: 'Active Member', type: 'Active Duty', household: 6, visits: 73, lastVisit: '2026-03-16', waivers: true, balance: 0 },
  { id: 14, name: 'Rachel E. Kim', email: 'r.kim@moody.af.mil', phone: '(229) 555-0211', status: 'Frequent Renter', type: 'Spouse', household: 4, visits: 52, lastVisit: '2026-03-17', waivers: true, balance: 15.00 },
  { id: 15, name: 'Andrew J. Martinez', email: 'a.martinez@moody.af.mil', phone: '(229) 555-0183', status: 'Active Member', type: 'Active Duty', household: 3, visits: 19, lastVisit: '2026-03-15', waivers: true, balance: 0 },
];

export const programs = [
  { id: 1, name: 'Youth Spring Adventure Camp', category: 'Youth', ageGroup: '6-12', facility: 'Outdoor Fields', instructor: 'TSgt. Brian Caldwell', startDate: '2026-04-06', endDate: '2026-04-17', capacity: 30, enrolled: 28, waitlist: 3, price: 85, discountPrice: 65, status: 'Open', source: { online: 18, walkIn: 10 } },
  { id: 2, name: 'Morning Power Fitness', category: 'Fitness', ageGroup: '18+', facility: 'Fitness Center', instructor: 'SSgt. Diana Torres', startDate: '2026-03-02', endDate: '2026-05-29', capacity: 25, enrolled: 25, waitlist: 7, price: 45, discountPrice: 35, status: 'Full', source: { online: 15, walkIn: 10 } },
  { id: 3, name: 'Community Art Workshop', category: 'Community', ageGroup: 'All Ages', facility: 'Community Rooms', instructor: 'Mrs. Claudia Reeves', startDate: '2026-03-21', endDate: '2026-03-21', capacity: 20, enrolled: 14, waitlist: 0, price: 25, discountPrice: 15, status: 'Open', source: { online: 9, walkIn: 5 } },
  { id: 4, name: 'Lap Swim Sessions', category: 'Aquatics', ageGroup: '16+', facility: 'Aquatics Area', instructor: 'A1C Megan Park', startDate: '2026-03-01', endDate: '2026-05-31', capacity: 40, enrolled: 33, waitlist: 0, price: 30, discountPrice: 20, status: 'Open', source: { online: 22, walkIn: 11 } },
  { id: 5, name: 'Weekend Family Fun Day', category: 'Events', ageGroup: 'All Ages', facility: 'Event Hall', instructor: 'MSgt. Laura Jennings', startDate: '2026-03-28', endDate: '2026-03-28', capacity: 150, enrolled: 112, waitlist: 0, price: 10, discountPrice: 5, status: 'Open', source: { online: 78, walkIn: 34 } },
  { id: 6, name: 'Intramural Basketball League', category: 'Sports', ageGroup: '18+', facility: 'Fitness Center', instructor: 'SrA. Kevin Nguyen', startDate: '2026-04-01', endDate: '2026-06-15', capacity: 60, enrolled: 54, waitlist: 2, price: 40, discountPrice: 30, status: 'Open', source: { online: 36, walkIn: 18 } },
  { id: 7, name: 'Kids Swim Lessons — Beginner', category: 'Aquatics', ageGroup: '4-8', facility: 'Aquatics Area', instructor: 'Mrs. Hannah Fields', startDate: '2026-04-07', endDate: '2026-04-25', capacity: 15, enrolled: 15, waitlist: 5, price: 55, discountPrice: 40, status: 'Full', source: { online: 11, walkIn: 4 } },
  { id: 8, name: 'Outdoor Bootcamp', category: 'Fitness', ageGroup: '18+', facility: 'Outdoor Fields', instructor: 'TSgt. Brian Caldwell', startDate: '2026-03-10', endDate: '2026-05-16', capacity: 35, enrolled: 29, waitlist: 0, price: 50, discountPrice: 40, status: 'Open', source: { online: 17, walkIn: 12 } },
  { id: 9, name: 'Family Movie Night', category: 'Events', ageGroup: 'All Ages', facility: 'Event Hall', instructor: 'MSgt. Laura Jennings', startDate: '2026-03-22', endDate: '2026-03-22', capacity: 200, enrolled: 143, waitlist: 0, price: 5, discountPrice: 0, status: 'Open', source: { online: 98, walkIn: 45 } },
  { id: 10, name: 'Yoga & Mindfulness', category: 'Fitness', ageGroup: '16+', facility: 'Community Rooms', instructor: 'Mrs. Elena Marsh', startDate: '2026-03-03', endDate: '2026-05-26', capacity: 20, enrolled: 18, waitlist: 1, price: 35, discountPrice: 25, status: 'Open', source: { online: 13, walkIn: 5 } },
  { id: 11, name: 'Teen Game Tournament', category: 'Youth', ageGroup: '13-17', facility: 'Community Rooms', instructor: 'A1C Megan Park', startDate: '2026-04-12', endDate: '2026-04-12', capacity: 32, enrolled: 21, waitlist: 0, price: 10, discountPrice: 5, status: 'Open', source: { online: 16, walkIn: 5 } },
  { id: 12, name: 'Pavilion Rental — Private Events', category: 'Rentals', ageGroup: 'N/A', facility: 'Outdoor Fields', instructor: 'N/A', startDate: '2026-03-01', endDate: '2026-09-30', capacity: 50, enrolled: 8, waitlist: 0, price: 150, discountPrice: 120, status: 'Open', source: { online: 5, walkIn: 3 } },
  { id: 13, name: 'Water Aerobics', category: 'Aquatics', ageGroup: '18+', facility: 'Aquatics Area', instructor: 'Mrs. Hannah Fields', startDate: '2026-03-05', endDate: '2026-05-28', capacity: 25, enrolled: 19, waitlist: 0, price: 40, discountPrice: 30, status: 'Open', source: { online: 12, walkIn: 7 } },
  { id: 14, name: 'Equipment Rental Checkout', category: 'Rentals', ageGroup: 'N/A', facility: 'Recreation Office/Rental Desk', instructor: 'N/A', startDate: '2026-01-01', endDate: '2026-12-31', capacity: 999, enrolled: 47, waitlist: 0, price: 15, discountPrice: 10, status: 'Open', source: { online: 12, walkIn: 35 } },
];

export const posItems = [
  { id: 'ret-1', name: 'Gatorade 20oz', category: 'Retail', price: 2.50 },
  { id: 'ret-2', name: 'Clif Bar — Chocolate Chip', category: 'Retail', price: 2.00 },
  { id: 'ret-3', name: 'Trail Mix Pack', category: 'Retail', price: 3.50 },
  { id: 'ret-4', name: 'Water Bottle 16oz', category: 'Retail', price: 1.50 },
  { id: 'ret-5', name: 'Moody AFB T-Shirt', category: 'Retail', price: 18.00 },
  { id: 'ret-6', name: 'Moody AFB Cap', category: 'Retail', price: 14.00 },
  { id: 'ret-7', name: 'Protein Shake — Vanilla', category: 'Retail', price: 4.50 },
  { id: 'ret-8', name: 'Sunscreen SPF50', category: 'Retail', price: 8.00 },
  { id: 'adm-1', name: 'Day Pass — Adult', category: 'Admissions', price: 8.00 },
  { id: 'adm-2', name: 'Day Pass — Youth', category: 'Admissions', price: 5.00 },
  { id: 'adm-3', name: 'Day Pass — Family (4)', category: 'Admissions', price: 22.00 },
  { id: 'adm-4', name: 'Pool Entry — Adult', category: 'Admissions', price: 6.00 },
  { id: 'adm-5', name: 'Pool Entry — Child', category: 'Admissions', price: 4.00 },
  { id: 'adm-6', name: 'Guest Pass', category: 'Admissions', price: 10.00 },
  { id: 'ren-1', name: 'Basketball Rental (2hr)', category: 'Rentals', price: 5.00 },
  { id: 'ren-2', name: 'Tennis Racket Rental', category: 'Rentals', price: 8.00 },
  { id: 'ren-3', name: 'Kayak Rental (Half Day)', category: 'Rentals', price: 25.00 },
  { id: 'ren-4', name: 'Camping Gear Kit', category: 'Rentals', price: 35.00 },
  { id: 'ren-5', name: 'Pavilion Reservation', category: 'Rentals', price: 75.00 },
  { id: 'ren-6', name: 'Community Room (2hr)', category: 'Rentals', price: 50.00 },
  { id: 'prg-1', name: 'Youth Spring Camp Registration', category: 'Programs', price: 85.00 },
  { id: 'prg-2', name: 'Fitness Class — Monthly', category: 'Programs', price: 45.00 },
  { id: 'prg-3', name: 'Swim Lessons Registration', category: 'Programs', price: 55.00 },
  { id: 'prg-4', name: 'Intramural Basketball Signup', category: 'Programs', price: 40.00 },
  { id: 'prg-5', name: 'Art Workshop Fee', category: 'Programs', price: 25.00 },
  { id: 'prg-6', name: 'Family Fun Day Tickets (4)', category: 'Programs', price: 40.00 },
];

export const inventoryItems = [
  { id: 1, sku: 'SNK-001', name: 'Gatorade 20oz (Assorted)', category: 'Snacks/Beverages', onHand: 48, reorderAt: 24, location: 'Fitness Center', trend: 'High', status: 'ok' },
  { id: 2, sku: 'SNK-002', name: 'Clif Bar — Chocolate Chip', category: 'Snacks/Beverages', onHand: 36, reorderAt: 20, location: 'Fitness Center', trend: 'Medium', status: 'ok' },
  { id: 3, sku: 'SNK-003', name: 'Trail Mix Packs', category: 'Snacks/Beverages', onHand: 15, reorderAt: 20, location: 'Recreation Office', trend: 'Medium', status: 'low' },
  { id: 4, sku: 'SNK-004', name: 'Water Bottles 16oz (Case)', category: 'Snacks/Beverages', onHand: 72, reorderAt: 36, location: 'Aquatics Area', trend: 'High', status: 'ok' },
  { id: 5, sku: 'SNK-005', name: 'Protein Shakes — Vanilla', category: 'Snacks/Beverages', onHand: 8, reorderAt: 12, location: 'Fitness Center', trend: 'High', status: 'low' },
  { id: 6, sku: 'EQP-001', name: 'Basketball (Wilson Official)', category: 'Equipment Rentals', onHand: 14, reorderAt: 6, location: 'Recreation Office', trend: 'Medium', status: 'ok' },
  { id: 7, sku: 'EQP-002', name: 'Tennis Racket (Adult)', category: 'Equipment Rentals', onHand: 8, reorderAt: 4, location: 'Recreation Office', trend: 'Low', status: 'ok' },
  { id: 8, sku: 'EQP-003', name: 'Kayak — Single Person', category: 'Equipment Rentals', onHand: 6, reorderAt: 3, location: 'Outdoor Fields', trend: 'Medium', status: 'ok' },
  { id: 9, sku: 'EQP-004', name: 'Camping Gear Kit', category: 'Equipment Rentals', onHand: 3, reorderAt: 4, location: 'Recreation Office', trend: 'Low', status: 'low' },
  { id: 10, sku: 'APP-001', name: 'Moody AFB T-Shirt (Asst. Sizes)', category: 'Apparel/Merchandise', onHand: 42, reorderAt: 15, location: 'Recreation Office', trend: 'Medium', status: 'ok' },
  { id: 11, sku: 'APP-002', name: 'Moody AFB Cap — Navy', category: 'Apparel/Merchandise', onHand: 28, reorderAt: 10, location: 'Recreation Office', trend: 'Medium', status: 'ok' },
  { id: 12, sku: 'APP-003', name: 'Sunscreen SPF50', category: 'Apparel/Merchandise', onHand: 5, reorderAt: 10, location: 'Aquatics Area', trend: 'High', status: 'low' },
  { id: 13, sku: 'EVT-001', name: 'Folding Chairs (Set of 10)', category: 'Event Materials', onHand: 12, reorderAt: 4, location: 'Event Hall', trend: 'Low', status: 'ok' },
  { id: 14, sku: 'EVT-002', name: 'Banquet Tables (6ft)', category: 'Event Materials', onHand: 8, reorderAt: 3, location: 'Event Hall', trend: 'Low', status: 'ok' },
  { id: 15, sku: 'EVT-003', name: 'PA System — Portable', category: 'Event Materials', onHand: 2, reorderAt: 2, location: 'Event Hall', trend: 'Low', status: 'low' },
  { id: 16, sku: 'SNK-006', name: 'Powerade 20oz (Assorted)', category: 'Snacks/Beverages', onHand: 30, reorderAt: 24, location: 'Aquatics Area', trend: 'Medium', status: 'ok' },
];

export const activityFeed = [
  { time: '14:32', text: 'Walk-in admission — Day Pass (Adult) processed at Fitness Center', type: 'transaction' },
  { time: '14:28', text: 'Online registration: Sarah M. Collins → Youth Spring Adventure Camp', type: 'registration' },
  { time: '14:25', text: 'Pavilion reservation approved — Thompson family, Mar 29', type: 'reservation' },
  { time: '14:21', text: 'POS void processed — Terminal 2, $8.00 (duplicate charge)', type: 'alert' },
  { time: '14:18', text: 'Equipment returned: Kayak — Single Person by Robert L. Chen', type: 'transaction' },
  { time: '14:15', text: 'Waitlist notification sent: Kids Swim Lessons (slot available)', type: 'registration' },
  { time: '14:10', text: 'Low stock alert: Protein Shakes — 8 remaining (threshold: 12)', type: 'alert' },
  { time: '14:05', text: 'Community Room B reserved — Unit FRG Meeting, Mar 20 1400-1600', type: 'reservation' },
  { time: '14:01', text: 'Online payment received: Intramural Basketball — $40.00', type: 'transaction' },
  { time: '13:55', text: 'Check-in: Michael T. Brooks — Fitness Center', type: 'transaction' },
  { time: '13:48', text: 'Refund issued: $25.00 — Christopher N. Davis (program cancellation)', type: 'alert' },
  { time: '13:42', text: 'New customer profile created: Emily J. Vasquez (Walk-in)', type: 'registration' },
];

export const revenueByFacility = [
  { name: 'Fitness Center', revenue: 2847, transactions: 89 },
  { name: 'Outdoor Fields', revenue: 1235, transactions: 34 },
  { name: 'Community Rooms', revenue: 890, transactions: 28 },
  { name: 'Event Hall', revenue: 1560, transactions: 42 },
  { name: 'Aquatics Area', revenue: 1180, transactions: 56 },
  { name: 'Rec Office/Rental', revenue: 535, transactions: 38 },
];

export const weeklyRevenue = [
  { day: 'Mon', revenue: 7245, registrations: 28, walkIns: 145 },
  { day: 'Tue', revenue: 6890, registrations: 32, walkIns: 138 },
  { day: 'Wed', revenue: 8120, registrations: 41, walkIns: 167 },
  { day: 'Thu', revenue: 7560, registrations: 35, walkIns: 152 },
  { day: 'Fri', revenue: 9340, registrations: 48, walkIns: 198 },
  { day: 'Sat', revenue: 11250, registrations: 56, walkIns: 287 },
  { day: 'Sun', revenue: 8247, registrations: 34, walkIns: 212 },
];

export const reconciliationData = [
  { terminal: 'Terminal 1 — Fitness', staff: 'SSgt. Torres', expected: 2847.00, actual: 2847.00, variance: 0, status: 'Reconciled' },
  { terminal: 'Terminal 2 — Rec Office', staff: 'A1C Park', expected: 1535.50, actual: 1527.50, variance: -8.00, status: 'Variance' },
  { terminal: 'Terminal 3 — Aquatics', staff: 'SrA. Nguyen', expected: 1180.00, actual: 1180.00, variance: 0, status: 'Reconciled' },
  { terminal: 'Terminal 4 — Event Hall', staff: 'MSgt. Jennings', expected: 1560.00, actual: 1560.00, variance: 0, status: 'Reconciled' },
  { terminal: 'Online Portal', staff: 'System', expected: 1124.50, actual: 1124.50, variance: 0, status: 'Reconciled' },
];

export const auditLog = [
  { time: '14:32:15', user: 'A1C Park', action: 'POS Transaction', detail: 'Sale #4821 — $22.00 (Family Day Pass)', ip: '10.23.45.102' },
  { time: '14:28:03', user: 'System', action: 'Online Registration', detail: 'Youth Spring Camp — Sarah Collins', ip: '—' },
  { time: '14:21:47', user: 'A1C Park', action: 'POS Void', detail: 'Void #4819 — $8.00 (duplicate)', ip: '10.23.45.102' },
  { time: '14:15:22', user: 'TSgt. Caldwell', action: 'Reservation Approved', detail: 'Pavilion — Thompson family, Mar 29', ip: '10.23.45.108' },
  { time: '14:10:05', user: 'System', action: 'Alert Generated', detail: 'Low stock: Protein Shakes (8 remaining)', ip: '—' },
  { time: '14:01:33', user: 'System', action: 'Payment Received', detail: 'Online — Intramural Basketball $40.00', ip: '—' },
  { time: '13:48:19', user: 'SrA. Nguyen', action: 'Refund Issued', detail: 'Refund #R-0247 — $25.00 to C. Davis', ip: '10.23.45.105' },
  { time: '13:42:11', user: 'SSgt. Torres', action: 'Customer Created', detail: 'New profile: Emily J. Vasquez', ip: '10.23.45.101' },
];

export const calendarEvents = [
  { id: 1, title: 'Morning Power Fitness', facility: 'Fitness Center', start: 6, end: 7, day: 0, color: '#38bdf8' },
  { id: 2, title: 'Lap Swim — Open', facility: 'Aquatics Area', start: 6, end: 8, day: 0, color: '#22d3ee' },
  { id: 3, title: 'Youth Camp Check-in', facility: 'Outdoor Fields', start: 8, end: 9, day: 0, color: '#34d399' },
  { id: 4, title: 'Community Art Workshop', facility: 'Community Rooms', start: 10, end: 12, day: 0, color: '#a78bfa' },
  { id: 5, title: 'Intramural Basketball', facility: 'Fitness Center', start: 17, end: 19, day: 0, color: '#38bdf8' },
  { id: 6, title: 'Unit FRG Meeting', facility: 'Community Rooms', start: 14, end: 16, day: 0, color: '#a78bfa' },
  { id: 7, title: 'Outdoor Bootcamp', facility: 'Outdoor Fields', start: 6, end: 7, day: 1, color: '#34d399' },
  { id: 8, title: 'Water Aerobics', facility: 'Aquatics Area', start: 9, end: 10, day: 1, color: '#22d3ee' },
  { id: 9, title: 'Yoga & Mindfulness', facility: 'Community Rooms', start: 11, end: 12, day: 1, color: '#a78bfa' },
  { id: 10, title: 'Family Movie Night', facility: 'Event Hall', start: 18, end: 21, day: 5, color: '#fb923c' },
  { id: 11, title: 'Weekend Family Fun Day', facility: 'Event Hall', start: 10, end: 16, day: 6, color: '#fb923c' },
  { id: 12, title: 'Pavilion — Thompson', facility: 'Outdoor Fields', start: 12, end: 17, day: 6, color: '#34d399' },
  { id: 13, title: 'Kids Swim Lessons', facility: 'Aquatics Area', start: 10, end: 11, day: 1, color: '#22d3ee' },
  { id: 14, title: 'Morning Power Fitness', facility: 'Fitness Center', start: 6, end: 7, day: 1, color: '#38bdf8' },
  { id: 15, title: 'Teen Game Tournament', facility: 'Community Rooms', start: 13, end: 17, day: 6, color: '#a78bfa' },
];

export const portalActivity = [
  { id: 1, type: 'Registration', name: 'Sarah M. Collins', program: 'Youth Spring Adventure Camp', time: '14:28', status: 'Completed', amount: 85.00 },
  { id: 2, type: 'Reservation', name: 'David W. Thompson', facility: 'Pavilion', time: '14:15', status: 'Pending Approval', amount: 75.00 },
  { id: 3, type: 'Registration', name: 'Online User #2847', program: 'Intramural Basketball League', time: '14:01', status: 'Completed', amount: 40.00 },
  { id: 4, type: 'Registration', name: 'Amanda K. Wright', program: 'Family Fun Day Tickets', time: '13:42', status: 'Completed', amount: 40.00 },
  { id: 5, type: 'Reservation', name: 'Robert L. Chen', facility: 'Community Room A', time: '13:30', status: 'Completed', amount: 50.00 },
  { id: 6, type: 'Registration', name: 'Online User #2845', program: 'Swim Lessons — Beginner', time: '13:15', status: 'Waitlisted', amount: 0 },
  { id: 7, type: 'Registration', name: 'Lisa M. Anderson', program: 'Yoga & Mindfulness', time: '12:58', status: 'Completed', amount: 35.00 },
  { id: 8, type: 'Account', name: 'Emily J. Vasquez', program: 'New Account Registration', time: '12:40', status: 'Pending Verification', amount: 0 },
];

export const getStudents=async(req,res)=>{
    res.send([
  {
    "id": 1,
    "name": "Aarav Patel",
    "email": "aarav.patel@example.com",
    "phone": "+1-202-555-0101",
    "class": "10A",
    "status": "active",
    "createdAt": "2026-08-01T09:15:00Z"
  },
  {
    "id": 2,
    "name": "Sophia Martinez",
    "email": "sophia.martinez@example.com",
    "phone": "+1-202-555-0102",
    "class": "9B",
    "status": "active",
    "createdAt": "2026-08-01T10:20:00Z"
  },
  {
    "id": 3,
    "name": "Liam Johnson",
    "email": "liam.johnson@example.com",
    "phone": "+1-202-555-0103",
    "class": "11A",
    "status": "inactive",
    "createdAt": "2026-08-02T08:30:00Z"
  },
  {
    "id": 4,
    "name": "Emma Wilson",
    "email": "emma.wilson@example.com",
    "phone": "+1-202-555-0104",
    "class": "10B",
    "status": "active",
    "createdAt": "2026-08-02T11:45:00Z"
  },
  {
    "id": 5,
    "name": "Noah Brown",
    "email": "noah.brown@example.com",
    "phone": "+1-202-555-0105",
    "class": "9A",
    "status": "active",
    "createdAt": "2026-08-03T09:10:00Z"
  },
  {
    "id": 6,
    "name": "Olivia Davis",
    "email": "olivia.davis@example.com",
    "phone": "+1-202-555-0106",
    "class": "11B",
    "status": "inactive",
    "createdAt": "2026-08-03T13:05:00Z"
  },
])
}
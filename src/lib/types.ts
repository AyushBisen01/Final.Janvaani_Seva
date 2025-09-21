

export type IssueStatus = "Pending" | "Approved" | "Assigned" | "Resolved" | "Rejected" | "In Progress";
export type IssuePriority = "High" | "Medium" | "Low";

export interface Issue {
  id: string;
  category: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  status: IssueStatus;
  priority: IssuePriority;
  reportedAt: Date | string;
  resolvedAt?: Date | string;
  assignedTo?: string; // Department name or staff ID
  citizen: {
    name: string;
    contact: string;
  };
  imageUrl: string;
  imageHint: string;
  proofUrl?: string;
  proofHint?: string;
  statusHistory?: { status: IssueStatus | string, date: Date | string }[];
}

export type UserRole = "Super Admin" | "Department Head" | "Staff" | "Citizen";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  department?: string;
}

export interface Department {
  id: string;
  name: string;
  head: string; // User ID
}

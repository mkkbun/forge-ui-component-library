/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Sample dataset for testing components like DataTable
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "Active" | "Inactive" | "On Leave";
  avatar: string;
}

export const sampleTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Aria Sterling",
    role: "Design System Lead",
    email: "aria.s@forgeui.dev",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "2",
    name: "Kaelen Vance",
    role: "Senior Frontend Engineer",
    email: "kaelen.v@forgeui.dev",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  },
  {
    id: "3",
    name: "Elena Rostova",
    role: "Accessibility Expert",
    email: "elena.r@forgeui.dev",
    status: "On Leave",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
  },
  {
    id: "4",
    name: "Marcus Thorne",
    role: "DevOps Architect",
    email: "marcus.t@forgeui.dev",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
  },
  {
    id: "5",
    name: "Sienna Brook",
    role: "Product Designer",
    email: "sienna.b@forgeui.dev",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
  {
    id: "6",
    name: "Julian Cross",
    role: "Security Analyst",
    email: "julian.c@forgeui.dev",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  },
  {
    id: "7",
    name: "Norah Vance",
    role: "Technical Writer",
    email: "norah.v@forgeui.dev",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
  },
];

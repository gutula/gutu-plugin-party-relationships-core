import {
  defineAdminNav,
  defineCommand,
  definePage,
  defineWorkspace,
  type AdminContributionRegistry
} from "@platform/admin-contracts";

import { BusinessAdminPage } from "./admin/main.page";

export const adminContributions: Pick<AdminContributionRegistry, "workspaces" | "nav" | "pages" | "commands"> = {
  workspaces: [
    defineWorkspace({
      id: "business-foundations",
      label: "Business Foundations",
      icon: "briefcase-business",
      description: "Canonical shared masters and governed reference data.",
      permission: "party.parties.read",
      homePath: "/admin/business/parties",
      quickActions: ["party-relationships-core.open.control-room"]
    })
  ],
  nav: [
    defineAdminNav({
      workspace: "business-foundations",
      group: "control-room",
      items: [
        {
          id: "party-relationships-core.overview",
          label: "Control Room",
          icon: "briefcase-business",
          to: "/admin/business/parties",
          permission: "party.parties.read"
        }
      ]
    })
  ],
  pages: [
    definePage({
      id: "party-relationships-core.page",
      kind: "dashboard",
      route: "/admin/business/parties",
      label: "Party Control Room",
      workspace: "business-foundations",
      group: "control-room",
      permission: "party.parties.read",
      component: BusinessAdminPage
    })
  ],
  commands: [
    defineCommand({
      id: "party-relationships-core.open.control-room",
      label: "Open Party & Relationships Core",
      permission: "party.parties.read",
      href: "/admin/business/parties",
      keywords: ["party & relationships core","business foundations","business"]
    })
  ]
};

import { ActivatedRoute } from "@angular/router";
import { DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { promiseBalance } from "../../core/services/business-metrics";
import { PermissionService } from "../../core/services/permission.service";
import { RecordDomainService } from "../../core/services/record-domain.service";
import { Directive, inject } from "@angular/core";
import { CrmStore } from "../../core/services/crm-store.service";
import { AuthService } from "../../core/services/auth.service";
import { MODULES, Tab, Field } from "../../core/models/crm.config";
@Directive()
export abstract class RecordPageController {
  route = inject(ActivatedRoute, { optional: true });
  destroyRef = inject(DestroyRef);
  access = inject(PermissionService);
  store = inject(CrmStore);
  auth = inject(AuthService);
  readonly key: string;
  readonly config;
  tab: Tab;
  constructor(
    moduleKey: string,
    tabKey: string,
    readonly domain: RecordDomainService,
  ) {
    this.key = moduleKey;
    this.config = MODULES[moduleKey];
    const tab = this.config.tabs.find((item) => item.key === tabKey);
    if (!tab)
      throw new Error("Unknown CRM screen: " + moduleKey + "/" + tabKey);
    this.tab = tab;
  }

  ngOnInit() {
    this.route?.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get("record");
        if (id) {
          const row = this.rows.find((r) => r.id === id);
          if (row) this.show(row);
        }
      });
  }
  saving = false;
  query = "";
  status = "";
  page = 1;
  view = "list";
  modal = false;
  detail: any = null;
  draft: any = {};
  error = "";
  confirmDelete: any = null;
  detailTab = "Overview";
  refs: Record<string, string> = {
    lead: "leads",
    customer: "customers",
    project: "projectDirectory",
    employee: "directory",
    "employee-list": "directory",
    invoice: "invoiceDirectory",
    installment: "installments",
    plan: "plans",
    visit: "visits",
    campaign: "campaigns",
    subscription: "subscriptions",
    promise: "promises",
  };
  roles = [
    "owner",
    "admin",
    "sales",
    "telecaller",
    "project_manager",
    "developer",
    "designer",
    "video_editor",
    "digital_marketing",
    "hr",
    "accounts",
    "support",
  ];
  get canEdit() {
    return this.access.can(this.tab.key, "update");
  }
  get canCreate() {
    return this.access.can(this.tab.key, "create");
  }
  get canDelete() {
    return (
      !["users", "payments", "invoices", "installments"].includes(
        this.tab.key,
      ) && this.access.can(this.tab.key, "delete")
    );
  }
get canExport() {
  return this.access.can(this.tab.key, "export");
}

get showStatusField() {
  return true;
}

get visibleFields() {
  return this.tab.fields.filter((f) =>
    this.access.canField(this.tab.key, f.key),
  );
}
  canEditRecord(row: any) {
    return this.access.visible(
      this.tab.key,
      row,
      this.store.records(),
      "update",
    );
  }

  get relatedKeys() {
    return [
      "projects",
      "tasks",
      "files",
      "meetings",
      "calls",
      "followups",
      "tickets",
      "renewals",
      "quotations",
      "invoices",
      "visits",
      "promises",
      "subscriptions",
      "campaigns",
      "campaignLeads",
      "payments",
      "installments",
    ].filter((k) => this.access.can(k));
  }
  get commercial() {
    return ["invoices", "quotations"].includes(this.tab.key);
  }
  get workload() {
    return this.store
      .list("employees")
      .map((e) => ({
        ...e,
        tasks: this.store
          .list("tasks")
          .filter((t) => String(t.assignedTo || "").includes(e.name)),
        projects: this.store
          .list("projects")
          .filter((t) => String(t.assignedEmployees || "").includes(e.name)),
      }));
  }
  calcItems() {
    this.draft.subtotal = (this.draft.items || []).reduce(
      (s: number, i: any) =>
        s + Number(i.quantity || 0) * Number(i.unitPrice || 0),
      0,
    );
  }
  addItem() {
    this.draft.items = [
      ...(this.draft.items || []),
      { description: "", quantity: 1, unitPrice: 0 },
    ];
  }
  removeItem(index: number) {
    this.draft.items.splice(index, 1);
    this.calcItems();
  }
  async billNextCycle(row: any) {
    if (!this.access.can("invoices", "create") || !this.canEditRecord(row))
      return;
    try {
      await this.store.createCycleInvoice(row);
      this.detail = null;
      this.store.toast(
        "Service invoice created. Earlier balances are unchanged.",
      );
    } catch (error: any) {
      this.store.toast(
        error?.error?.message || "Invoice could not be created.",
      );
    }
  }
  renew(x: any) {
    this.open({
      ...x,
      startDate: x.expiryDate,
      expiryDate: "",
      status: "RENEWED",
    });
    this.store.toast(
      "Enter the new expiry date after confirming the renewal payment.",
    );
  }

  get rows() {
    return this.domain
      .list(this.tab.key)
      .filter(
        (x) =>
          this.access.visible(this.tab.key, x, this.store.records()) &&
          (!this.status || this.recordStatus(x) === this.status) &&
          (!this.query ||
            JSON.stringify(x).toLowerCase().includes(this.query.toLowerCase())),
      );
  }
  get paged() {
    return this.rows.slice((this.page - 1) * 8, this.page * 8);
  }
  get pages() {
    return Math.max(1, Math.ceil(this.rows.length / 8));
  }
  get columns() {
    return this.visibleFields
      .filter((f) => !["textarea", "url", "password"].includes(f.type))
      .slice(0, 5);
  }
  get boardEnabled() {
    return ["leads", "tasks", "content", "tickets", "projects"].includes(
      this.tab.key,
    );
  }
  get overdue() {
    return this.rows.filter((x) => {
      const d =
        x.dueDate ||
        x.deadline ||
        x.expiryDate ||
        x.promisedDate ||
        x.nextBillingDate ||
        x.nextFollowUpDate;
      return (
        d &&
        d < new Date().toISOString().slice(0, 10) &&
        !["COMPLETED", "PAID", "CLOSED", "DELIVERED"].includes(
          this.recordStatus(x),
        )
      );
    }).length;
  }
  get summaryAmount() {
    return this.rows.reduce(
      (s, x) => s + Number(x.amount || x.budget || this.store.total(x) || 0),
      0,
    );
  }
  changeTab(t: Tab) {
    this.tab = t;
    this.query = "";
    this.status = "";
    this.page = 1;
    this.view = "list";
    this.detail = null;
  }
  pretty(v: any) {
    return String(v || "—")
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  tone(s: string) {
    return /COMPLETED|PAID$|APPROVED|ACTIVE|PUBLISHED|WON|RESOLVED|DELIVERED/.test(
      s,
    ) && !s.includes("PARTIALLY")
      ? "green"
      : /OVERDUE|LOST|REJECTED|EXPIRED|CHANGES/.test(s)
        ? "red"
        : /REVIEW|PENDING|NEGOTIATION|FOLLOW|DUE|PARTIALLY/.test(s)
          ? "amber"
          : "blue";
  }
  recordStatus(x: any) {
    if (this.tab.key === "promises" && x.status !== "CANCELLED") {
      const remaining = promiseBalance(x, this.store.list("payments"));
      return remaining <= 0
        ? "FULFILLED"
        : x.promisedDate < new Date().toISOString().slice(0, 10)
          ? "BROKEN"
          : remaining < Number(x.amount)
            ? "PARTIALLY_FULFILLED"
            : "OPEN";
    }
    if (this.tab.key === "invoices" && x.status !== "DRAFT") {
      if (this.store.balance(x) <= 0) return "PAID";
      if (x.dueDate < new Date().toISOString().slice(0, 10)) return "OVERDUE";
      if (this.store.paid(x.id) > 0) return "PARTIALLY_PAID";
    }
    if (this.tab.key === "installments") {
      const paid = this.store
        .list("payments")
        .filter((p) => p.installmentId === x.id)
        .reduce((s, p) => s + Number(p.amount), 0);
      return paid >= Number(x.amount)
        ? "PAID"
        : x.dueDate < new Date().toISOString().slice(0, 10)
          ? "OVERDUE"
          : paid > 0
            ? "PARTIALLY_PAID"
            : "PENDING";
    }
    return x.status;
  }
  value(x: any, f: Field) {
    if (f.type === "password") return "••••••••";
    if (f.type === "employee-list")
      return (
        (x[f.key] || [])
          .map((id: string) => this.store.label("directory", id))
          .join(", ") || "—"
      );
    return this.refs[f.type]
      ? this.store.label(this.refs[f.type], x[f.key])
      : f.type === "number"
        ? Number(x[f.key] || 0).toLocaleString("en-IN")
        : x[f.key] || "—";
  }
  options(f: Field) {
    return this.store.list(this.refs[f.type] || "");
  }
  label(x: any) {
    return (
      x.businessName ||
      x.projectName ||
      x.invoiceNumber ||
      x.installmentName ||
      x.name ||
      x.title ||
      x.serviceName ||
      x.id
    );
  }
  open(x: any = null) {
    if (x ? !this.canEditRecord(x) : !this.canCreate) return;
    this.draft = x ? structuredClone(x) : { status: this.tab.statuses[0] };
    if (this.commercial && !this.draft.items)
      this.draft.items = [
        {
          description: this.draft.description || "",
          quantity: 1,
          unitPrice: Number(this.draft.subtotal || 0),
        },
      ];
    this.error = "";
    this.modal = true;
    setTimeout(
      () => document.querySelector<HTMLInputElement>(".modal input")?.focus(),
      30,
    );
  }
  close() {
    this.modal = false;
    this.error = "";
  }
  show(x: any) {
    this.detail = x;
    this.detailTab = "Overview";
  }
  async save() {
    if (this.draft.id ? !this.canEditRecord(this.draft) : !this.canCreate)
      return;
    this.error = "";
    const first = this.tab.fields[0];
    if (!String(this.draft[first.key] || "").trim()) {
      this.error = first.label + " is required.";
      return;
    }
    if (this.commercial) {
      if (
        !this.draft.items?.length ||
        this.draft.items.some(
          (i: any) =>
            !i.description?.trim() ||
            Number(i.quantity) <= 0 ||
            Number(i.unitPrice) < 0,
        )
      ) {
        this.error =
          "Add at least one line item with a description, positive quantity and valid price.";
        return;
      }
      this.calcItems();
      if (Number(this.draft.discount || 0) > Number(this.draft.subtotal)) {
        this.error = "Discount cannot exceed subtotal.";
        return;
      }
    }
    for (const f of this.tab.fields) {
      const v = this.draft[f.key];
      if (f.required && (v === undefined || v === null || v === "")) {
        this.error = f.label + " is required.";
        return;
      }
      if (f.options && v && !f.options.includes(v)) {
        this.error = "Choose a valid " + f.label.toLowerCase();
        return;
      }
      if (
        f.type === "number" &&
        v !== undefined &&
        v !== "" &&
        (!Number.isFinite(Number(v)) || Number(v) < 0)
      ) {
        this.error = f.label + " must be a non-negative number.";
        return;
      }
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        this.error = "Enter a valid email address.";
        return;
      }
      if (f.type === "url" && v && !/^https?:\/\//.test(v)) {
        this.error = "File links must start with https:// or http://.";
        return;
      }
    }
    if (
      this.tab.key === "campaigns" &&
      Number(this.draft.conversions) > Number(this.draft.leadCount)
    ) {
      this.error = "Conversions cannot exceed reported leads.";
      return;
    }
    if (Number(this.draft.progress || 0) > 100) {
      this.error = "Progress cannot exceed 100%.";
      return;
    }
    if (
      this.draft.startDate &&
      ((this.draft.endDate && this.draft.endDate < this.draft.startDate) ||
        (this.draft.deadline && this.draft.deadline < this.draft.startDate))
    ) {
      this.error = "End date must follow the start date.";
      return;
    }
    if (this.tab.key === "payments") {
      const inv = this.store
        .list("invoices")
        .find((i) => i.id === this.draft.invoiceId);
      const old = this.store
        .list("payments")
        .find((p) => p.id === this.draft.id);
      const available = inv
        ? this.store.balance(inv) +
          (old?.invoiceId === inv.id ? Number(old.amount) : 0)
        : 0;
      if (
        !inv ||
        Number(this.draft.amount) <= 0 ||
        Number(this.draft.amount) > available
      ) {
        this.error =
          "Choose an invoice and enter an amount within its outstanding balance.";
        return;
      }
      if (this.draft.installmentId) {
        const inst = this.store
          .list("installments")
          .find((i) => i.id === this.draft.installmentId);
        const paid = this.store
          .list("payments")
          .filter((p) => p.installmentId === inst?.id && p.id !== this.draft.id)
          .reduce((s, p) => s + Number(p.amount), 0);
        if (
          !inst ||
          inst.invoiceId !== inv.id ||
          Number(this.draft.amount) > Number(inst.amount) - paid
        ) {
          this.error =
            "Payment must match the installment invoice and remaining amount.";
          return;
        }
      }
    }
    if (
      this.tab.key === "renewals" &&
      (!this.draft.expiryDate || this.draft.expiryDate <= this.draft.startDate)
    ) {
      this.error = "Enter an expiry date after the service start date.";
      return;
    }
    this.saving = true;
    try {
      await this.domain.save(
        this.tab.key,
        this.draft,
        this.auth.user()?.name || "Admin",
      );
      this.modal = false;
      this.detail = null;
      this.store.toast("Record saved successfully.");
    } catch (error: any) {
      this.error =
        error?.error?.message || "The record could not be saved. Please retry.";
    } finally {
      this.saving = false;
    }
  }
  async remove() {
    if (!this.canDelete || !this.confirmDelete) return;
    const id = this.confirmDelete.id;
    const related = Object.values(this.store.records()).some((rows) =>
      rows.some(
        (x) =>
          x.id !== id &&
          Object.entries(x).some(([k, v]) => k.endsWith("Id") && v === id),
      ),
    );
    if (related) {
      this.store.toast(
        "This record has linked records. Update its status instead.",
      );
      this.confirmDelete = null;
      return;
    }
    try {
      await this.domain.remove(
        this.tab.key,
        id,
        this.auth.user()?.name || "Admin",
      );
      this.confirmDelete = null;
      this.detail = null;
      this.page = 1;
      this.store.toast("Record deleted.");
    } catch (error: any) {
      this.store.toast(error?.error?.message || "Delete failed.");
    }
  }
  async convert(x: any) {
    if (!this.access.can("customers", "create") || !this.canEditRecord(x))
      return;
    try {
      this.store.toast(
        await this.domain.convertLead(x, this.auth.user()?.name || "Admin"),
      );
    } catch (error: any) {
      this.store.toast(error?.error?.message || "Conversion failed.");
    }
  }
  async move(x: any, status: string) {
    if (!this.canEditRecord(x) || !this.tab.statuses.includes(status)) return;
    try {
      await this.domain.save(
        this.tab.key,
        { ...x, status },
        this.auth.user()?.name || "Admin",
      );
      this.store.toast("Status updated.");
    } catch (error: any) {
      this.store.toast(error?.error?.message || "Update failed.");
    }
  }
  exportCsv() {
    if (!this.canExport) return;
    const fs = this.visibleFields;
    const esc = (v: any) =>
      '"' +
      String(v ?? "")
        .replace(/^[=+@-]/, "' $&")
        .replace(/"/g, '""') +
      '"';
    const text = [
      [...fs.map((f) => f.label), "Status"],
      ...this.rows.map((x) => [
        ...fs.map((f) => this.value(x, f)),
        this.recordStatus(x),
      ]),
    ]
      .map((r) => r.map(esc).join(","))
      .join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(
      new Blob(["\ufeff" + text], { type: "text/csv;charset=utf-8" }),
    );
    a.download = "AMI-HUB-" + this.tab.key + ".csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }
  async importCsv(event: any) {
    if (!this.canCreate) return;
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const records: string[][] = [];
    let row: string[] = [],
      cell = "",
      quoted = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (quoted && text[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = !quoted;
      } else if (c === "," && !quoted) {
        row.push(cell);
        cell = "";
      } else if (c === "\n" && !quoted) {
        row.push(cell.replace(/\r$/, ""));
        records.push(row);
        row = [];
        cell = "";
      } else cell += c;
    }
    if (cell || row.length) {
      row.push(cell);
      records.push(row);
    }
    if (quoted) {
      this.store.toast("Invalid CSV: a quoted field is not closed.");
      return;
    }
    const headers =
      records.shift()?.map((h) => h.replace(/^\ufeff/, "").trim()) || [];
    const nameIndex = headers.findIndex((h) =>
      ["businessName", "Business name"].includes(h),
    );
    if (nameIndex < 0) {
      this.store.toast("CSV needs a businessName or Business name column.");
      return;
    }
    let count = 0;
    try {
      for (const r of records.filter((r) => r[nameIndex]?.trim())) {
        const obj: any = { status: "NEW" };
        headers.forEach((h, i) => {
          const f = this.tab.fields.find((f) => f.key === h || f.label === h);
          if (f) obj[f.key] = r[i]?.trim();
        });
        await this.store.save("leads", obj, this.auth.user()?.name);
        count++;
      }
    } catch (error: any) {
      this.store.toast(
        count +
          " imported; import stopped: " +
          (error?.error?.message || "request failed"),
      );
      return;
    }
    this.store.toast(count + " leads imported.");
    event.target.value = "";
  }
  related(key: string) {
    return this.store.list(key).filter((x) => {
      if (!this.access.visible(key, x, this.store.records())) return false;
      const invoice = x.invoiceId
        ? this.store.list("invoices").find((i) => i.id === x.invoiceId)
        : null;
      return (
        x.customerId === this.detail?.id ||
        x.projectId === this.detail?.id ||
        x.leadId === this.detail?.id ||
        invoice?.customerId === this.detail?.id
      );
    });
  }

  print() {
    window.print();
  }
}

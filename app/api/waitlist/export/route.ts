import { NextRequest, NextResponse } from "next/server";
import { listWaitlist, storageConfigured } from "../../../../lib/waitlist";

// GET /api/waitlist/export  (header: Authorization: Bearer <WAITLIST_ADMIN_TOKEN>)
const COLUMNS = ["position", "createdAt", "email", "name", "company", "role", "teamSize", "dataTypes", "useCase", "lang", "source"];

const csvCell = (v: string | undefined) => {
  const s = (v ?? "").replace(/^[=+\-@]/, "'$&"); // avoid spreadsheet formula injection
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET(request: NextRequest) {
  const token = process.env.WAITLIST_ADMIN_TOKEN;
  const auth = request.headers.get("authorization");
  if (!token || auth !== `Bearer ${token}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!storageConfigured()) {
    return NextResponse.json({ error: "storage_not_configured" }, { status: 503 });
  }
  const rows = await listWaitlist();
  const csv = [COLUMNS.join(","), ...rows.map((r) => COLUMNS.map((c) => csvCell(r[c])).join(","))].join("\n");
  return new NextResponse(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="datasimplr-waitlist-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}

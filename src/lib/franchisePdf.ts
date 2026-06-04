import jsPDF from "jspdf";

export interface PdfSection {
  title: string;
  intro?: string;
  items?: string[];
  notes?: string[];
}

export interface FranchisePdfData {
  packageName: string; // e.g. "₹3 Lakh Package"
  tagline: string;     // e.g. "1 Year Franchise Agreement"
  investment: string;  // "₹3,00,000"
  duration: string;    // "12 Months"
  sections: PdfSection[];
}

const BRAND = {
  name: "SHALIMAR JUICE SHOP",
  legal: "Shalimar Juices & Shakes",
  owner: "Sameer Ahmad",
  address: "Perfect Complex, Jamil Colony, Walgaon Road,\nAmravati, Maharashtra – 444601, India",
  phone: "+91 98527 79933",
  whatsapp: "+91 98527 79933",
  email: "shalimarjuiceshop@gmail.com",
  website: "shalimars-pineapple-paradise.lovable.app",
};

// Colors
const C = {
  ink: [22, 22, 22] as [number, number, number],
  muted: [110, 110, 110] as [number, number, number],
  rule: [210, 210, 210] as [number, number, number],
  accent: [184, 134, 11] as [number, number, number],   // dark gold
  accentSoft: [252, 246, 224] as [number, number, number],
  band: [27, 27, 27] as [number, number, number],
};

export function generateFranchisePdf(data: FranchisePdfData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;

  const docId = `SJS-FR-${Date.now().toString().slice(-8)}`;
  const issued = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

  const drawHeader = () => {
    // top brand band
    doc.setFillColor(...C.band);
    doc.rect(0, 0, pageW, 70, "F");
    // gold rule under band
    doc.setFillColor(...C.accent);
    doc.rect(0, 70, pageW, 3, "F");

    // monogram
    doc.setFillColor(...C.accent);
    doc.circle(margin + 16, 35, 16, "F");
    doc.setTextColor(27, 27, 27);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("S", margin + 16, 40, { align: "center" });

    // brand name
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(BRAND.name, margin + 44, 32);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(200, 200, 200);
    doc.text("Franchise Package Information  •  Official Document", margin + 44, 46);

    // right side: doc id
    doc.setFontSize(8);
    doc.setTextColor(200, 200, 200);
    doc.text(`Doc No: ${docId}`, pageW - margin, 32, { align: "right" });
    doc.text(`Issued: ${issued}`, pageW - margin, 46, { align: "right" });
  };

  const drawFooter = () => {
    const y = pageH - 38;
    doc.setDrawColor(...C.rule);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C.muted);
    doc.text(`${BRAND.legal}  |  ${BRAND.address.replace(/\n/g, " ")}`, margin, y + 12);
    doc.text(`${BRAND.phone}  •  ${BRAND.email}`, margin, y + 23);
    const pageNo = doc.getCurrentPageInfo().pageNumber;
    const totalPages = doc.getNumberOfPages();
    doc.text(`Page ${pageNo} of ${totalPages}`, pageW - margin, y + 23, { align: "right" });
    doc.setTextColor(...C.accent);
    doc.setFont("helvetica", "bold");
    doc.text("CONFIDENTIAL", pageW - margin, y + 12, { align: "right" });
  };

  let y = 90;

  const ensureSpace = (need: number) => {
    if (y + need > pageH - 60) {
      doc.addPage();
      drawHeader();
      y = 90;
    }
  };

  drawHeader();

  // ===== Title block =====
  doc.setTextColor(...C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("FRANCHISE PACKAGE", margin, y);
  y += 14;
  doc.setTextColor(...C.ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(data.packageName, margin, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...C.muted);
  doc.text(data.tagline, margin, y);
  y += 18;

  // info card
  const cardY = y;
  const cardH = 64;
  doc.setFillColor(...C.accentSoft);
  doc.setDrawColor(...C.accent);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, cardY, contentW, cardH, 6, 6, "FD");

  const colW = contentW / 3;
  const drawKV = (label: string, value: string, cx: number) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...C.muted);
    doc.text(label.toUpperCase(), cx + 14, cardY + 22);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...C.ink);
    doc.text(value, cx + 14, cardY + 44);
  };
  drawKV("Investment", data.investment, margin);
  drawKV("Duration", data.duration, margin + colW);
  drawKV("Issued To", "Prospective Partner", margin + colW * 2);
  y = cardY + cardH + 22;

  // ===== Owner / contact block =====
  ensureSpace(110);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...C.ink);
  doc.text("Issuing Authority", margin, y);
  doc.setDrawColor(...C.accent);
  doc.setLineWidth(1.2);
  doc.line(margin, y + 4, margin + 70, y + 4);
  y += 16;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...C.ink);
  const ownerLines = [
    [`Owner / Proprietor:`, BRAND.owner],
    [`Brand:`, BRAND.legal],
    [`Main Branch:`, BRAND.address.split("\n")[0]],
    [``, BRAND.address.split("\n")[1]],
    [`Phone:`, BRAND.phone],
    [`WhatsApp:`, BRAND.whatsapp],
    [`Email:`, BRAND.email],
    [`Website:`, BRAND.website],
  ];
  ownerLines.forEach(([k, v]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...C.muted);
    doc.text(k, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...C.ink);
    doc.text(v, margin + 90, y);
    y += 13;
  });
  y += 10;

  // ===== Sections =====
  data.sections.forEach((sec, idx) => {
    ensureSpace(60);
    // section heading
    doc.setFillColor(...C.ink);
    doc.rect(margin, y, 3, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...C.ink);
    doc.text(`${String(idx + 1).padStart(2, "0")}.  ${sec.title.toUpperCase()}`, margin + 12, y + 11);
    y += 22;

    if (sec.intro) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...C.ink);
      const wrapped = doc.splitTextToSize(sec.intro, contentW);
      ensureSpace(wrapped.length * 13);
      doc.text(wrapped, margin, y);
      y += wrapped.length * 13 + 4;
    }

    if (sec.items && sec.items.length) {
      sec.items.forEach((item) => {
        const wrapped = doc.splitTextToSize(item, contentW - 18);
        ensureSpace(wrapped.length * 13 + 2);
        doc.setFillColor(...C.accent);
        doc.circle(margin + 4, y - 3, 1.6, "F");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(...C.ink);
        doc.text(wrapped, margin + 14, y);
        y += wrapped.length * 13 + 2;
      });
      y += 4;
    }

    if (sec.notes && sec.notes.length) {
      sec.notes.forEach((n) => {
        const wrapped = doc.splitTextToSize(n, contentW - 16);
        const blockH = wrapped.length * 13 + 12;
        ensureSpace(blockH);
        doc.setFillColor(...C.accentSoft);
        doc.roundedRect(margin, y - 9, contentW, blockH, 4, 4, "F");
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9.5);
        doc.setTextColor(...C.ink);
        doc.text(wrapped, margin + 10, y);
        y += blockH;
      });
    }
    y += 8;
  });

  // ===== Signature block =====
  ensureSpace(120);
  y = Math.max(y, pageH - 180);
  doc.setDrawColor(...C.rule);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 24;

  const sigW = (contentW - 40) / 2;
  doc.setDrawColor(...C.ink);
  doc.setLineWidth(0.8);
  doc.line(margin, y + 30, margin + sigW, y + 30);
  doc.line(margin + sigW + 40, y + 30, margin + sigW + 40 + sigW, y + 30);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text("For Shalimar Juice Shop", margin, y + 44);
  doc.text("Authorised Signatory", margin, y + 56);
  doc.text("Franchise Partner", margin + sigW + 40, y + 44);
  doc.text("Signature & Date", margin + sigW + 40, y + 56);

  // Footer all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter();
  }

  doc.save(`Shalimar-Juice-${data.packageName.replace(/[^a-z0-9]+/gi, "-")}.pdf`);
}

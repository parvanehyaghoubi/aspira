"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CvData {
    fullName: string;
    email: string;
    phone: string;
    summary: string;
    education: string;
    experience: string;
    skills: string;
}

const initial: CvData = {
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    education: "",
    experience: "",
    skills: "",
};

export default function CvBuilderPage() {
    const { t } = useLanguage();
    const [data, setData] = useState<CvData>(initial);
    const [generating, setGenerating] = useState(false);

    function update<K extends keyof CvData>(key: K, value: CvData[K]) {
        setData((prev) => ({ ...prev, [key]: value }));
    }

    async function downloadPdf() {
        setGenerating(true);
        try {
            const { jsPDF } = await import("jspdf");
            const doc = new jsPDF({ unit: "pt", format: "a4" });
            const margin = 48;
            let y = margin;
            const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;

            doc.setFont("helvetica", "bold");
            doc.setFontSize(22);
            doc.text(data.fullName || "Your Name", margin, y);
            y += 22;

            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(90);
            doc.text([data.email, data.phone].filter(Boolean).join("  ·  "), margin, y);
            y += 22;
            doc.setDrawColor(217, 119, 6);
            doc.setLineWidth(1.2);
            doc.line(margin, y, margin + pageWidth, y);
            y += 22;
            doc.setTextColor(20);

            const section = (title: string, body: string) => {
                if (!body) return;
                doc.setFont("helvetica", "bold");
                doc.setFontSize(12);
                doc.text(title.toUpperCase(), margin, y);
                y += 16;
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10.5);
                const lines = doc.splitTextToSize(body, pageWidth);
                doc.text(lines, margin, y);
                y += lines.length * 14 + 16;
            };

            section(t("summary"), data.summary);
            section(t("experience"), data.experience);
            section(t("education"), data.education);
            section(
                t("skills"),
                data.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .join("   •   ")
            );

            doc.save(`${(data.fullName || "cv").replace(/\s+/g, "_")}.pdf`);
        } finally {
            setGenerating(false);
        }
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-10">
            <h1 className="font-display text-3xl font-semibold text-lapis-900 dark:text-sand-50">
                {t("cv_title")}
            </h1>
            <p className="mt-1 text-sm text-lapis-500 dark:text-sand-300">{t("cv_subtitle")}</p>

            <div className="card-surface mt-6 space-y-4 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="label-text">{t("full_name")}</label>
                        <input className="input-field" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} />
                    </div>
                    <div>
                        <label className="label-text">{t("your_email")}</label>
                        <input className="input-field" value={data.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="label-text">{t("phone")}</label>
                        <input className="input-field" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="label-text">{t("summary")}</label>
                    <textarea rows={3} className="input-field" value={data.summary} onChange={(e) => update("summary", e.target.value)} />
                </div>
                <div>
                    <label className="label-text">{t("experience")}</label>
                    <textarea rows={4} className="input-field" value={data.experience} onChange={(e) => update("experience", e.target.value)} />
                </div>
                <div>
                    <label className="label-text">{t("education")}</label>
                    <textarea rows={3} className="input-field" value={data.education} onChange={(e) => update("education", e.target.value)} />
                </div>
                <div>
                    <label className="label-text">{t("skills")}</label>
                    <input className="input-field" placeholder="React, Next.js, Tailwind CSS" value={data.skills} onChange={(e) => update("skills", e.target.value)} />
                </div>
                <button onClick={downloadPdf} disabled={generating} className="btn-primary w-full">
                    <FileDown size={16} /> {generating ? "…" : t("download_pdf")}
                </button>
            </div>
        </div>
    );
}

"use client";
import { useTranslations } from "next-intl";

export default function DivBrowse() {
  const t = useTranslations("BrowsePage");
  return <div className="text-3xl font-medium text-900 mb-3">{t("div")}</div>;
}

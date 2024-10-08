"use client";
import { getSinglePostWithUserEmail } from "@/actions/actions";
import type { TgetSinglePostWithUserEmail } from "@/actions/actions";
import Footer from "@/app/_HomePageComponents/Footer";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { useEffect, useState } from "react";



function DisplayPostType({ type }: { type: string }) {
  const t = useTranslations("browse")
  function getSeverityType(type: string) {
    switch (type) {
      case "Plasma":
        return "success";
  
      case "Blood":
        return "danger";
  
      case "Platelets":
        return "info";
  
      default:
        return null;
    }
  }
  return (
    <>
      <div className="col-6">
        <h1 className="text-3xl font-semibold capitalize">{t("Type")}</h1>
        <Tag
          className="h-fit"
          value={type}
          severity={getSeverityType(type)}  
        ></Tag>{" "}
      </div>
    </>
  );
}

function DisplayPostData({ title, data }: any) {
  
  return (
    <div className="col-6">
      <h1 className="text-3xl font-semibold capitalize">{title}</h1>
      <div>{data}</div>
    </div>
  );
}

export default function PostCard({
  post,
  locale,
}: {
  post: TgetSinglePostWithUserEmail;
  locale: string;
}) {
  //     user: {
  //         email: string | null;
  //     };
  // } & {
  //     id: string;
  //     criterias: string;
  //     city: string;
  //     type: string;
  //     location: string;
  //     date: Date;
  //     userId: string;
  // }) | null
  const t = useTranslations("browse")
  if (post) {
    const dateString = post.date;
    const dateObject = new Date(dateString);
    const humanReadableDate = dateObject.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const formattedTime = dateObject.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return (
      <>
        {" "}
        <div className="m-5">
          <a href="/">
            {" "}
            <Button
              label="Home"
              icon="pi pi-home"
              className=" sm:min-h-[58px]"
            />
          </a>

          <Link href={`/${locale}/browse`}>
            {" "}
            <Button
              label={t("Browse")}
              icon="pi pi-search"
              className=" sm:min-h-[58px]"
            /> 
          </Link>
          <div className="container my-20">
            <Card>
              <div className="grid">
                {/* <DisplayPostData title={"Contact"} data={post.user.email} /> */}

                {/* <DisplayPostData title={"id"} data={post.id} /> */}
                <DisplayPostData title={t("Criterias")} data={post.criterias} />
                <DisplayPostData title={t("City")} data={post.city} />
                <DisplayPostType type={post.type} />
                <DisplayPostData title={t("Location")} data={post.location} />
                <DisplayPostData
                  title={t("Date")}
                  data={`${humanReadableDate} ${formattedTime}`}
                />
                <div className="col-6">
                  <Link href={"mailto:" + post.user.email}>
                    <Button className="text-3xl font-semibold capitalize">
                      {" "}
                      {t("Contact")}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
          {/* @ts-ignore */}
          <Footer></Footer>
        </div>
      </>
    );
  }
}

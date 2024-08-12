//  @ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import getData from "./getData";
import { useRouter } from "next/navigation";
import { getAllPosts } from "@/actions/actions";
import { Button } from "primereact/button";
import { useTranslations } from "next-intl";

export default function BrowseTable({ locale }: { locale: string }) {
  const router = useRouter();
  const t = useTranslations("BrowsePage");

  const [posts, setPosts] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    city: { value: null, matchMode: FilterMatchMode.IN },
    location: { value: null, matchMode: FilterMatchMode.IN },
    type: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const city = [
    { name: "Amy Elsner", image: "amyelsner.png" },
    { name: "Anna Fali", image: "annafali.png" },
    { name: "Asiya Javayant", image: "asiyajavayant.png" },
    { name: "Bernardo Dominic", image: "bernardodominic.png" },
    { name: "Elwin Sharvill", image: "elwinsharvill.png" },
    { name: "Ioni Bowcher", image: "ionibowcher.png" },
    { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
    { name: "Onyama Limba", image: "onyamalimba.png" },
    { name: "Stephen Shaw", image: "stephenshaw.png" },
    { name: "XuXue Feng", image: "xuxuefeng.png" },
  ];
  const statuses = [
    "unqualified",
    "qualified",
    "new",
    "negotiation",
    "renewal",
  ];

  const getSeverity = (status) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  };

  useEffect(() => {
    getAllPosts().then((posts) => setPosts(posts));
  }, []);

  const countryBodyTemplate = (rowData) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={rowData.country.code}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`flag flag-${rowData.country.code}`}
          style={{ width: "24px" }}
        />
        <span>{rowData.country.name}</span>
      </div>
    );
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.representative;

    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={representative.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`}
          width="32"
        />
        <span>{representative.name}</span>
      </div>
    );
  };

  const representativeFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={representatives}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => options.filterCallback(e.value)}
        optionLabel="name"
        className="p-column-filter"
      />
    );
  };

  const representativesItemTemplate = (option) => {
    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={option.name}
          src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`}
          width="32"
        />
        <span>{option.name}</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="sm:flex sm:gap-3">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            type="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
          />
        </IconField>
        <a href={`/${locale}`}>
          {" "}
          <Button
            label={t("Home")}
            icon="pi pi-home"
            className=" sm:min-h-[58px]"
          />
        </a>
      </div>
    );
  };

  const header = renderHeader();

  function getSeverityType(rowData) {
    switch (rowData.type) {
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

  function typeBodyTemplate(rowData) {
    return <Tag value={rowData.type} severity={getSeverityType(rowData)}></Tag>;
  }
  function dateBodyTemplate(rowData) {
    // Given date string
    const dateString = rowData.date;
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
        {humanReadableDate} {formattedTime}
      </>
    );
  }

  return (
    <div className="card">
      <DataTable
        value={posts}
        paginator
        rows={15}
        header={header}
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        selection={selectedPost}
        onSelectionChange={(e) => {
          console.log(e.value.id);

          router.push(`/${locale}/browse/${e.value.id}`);
          setSelectedPost(e.value);
        }}
        selectionMode="single"
        dataKey="id"
        // stateStorage="session"
        // stateKey="dt-state-demo-local"
        emptyMessage={" "}
        tableStyle={{ minWidth: "50rem" }}
      >
        {/* <Column
          field="id"
          header="id"
          sortable
          style={{ width: "25%" }}
        ></Column> */}

        <Column
          field="criterias"
          header={t("Criterias")}
          className="text-overflow-ellipsis"
          sortable
          // style={{ width: "25%" }}
        ></Column>

        <Column
          field="city"
          header={t("City")}
          filter
          filterField="city"
          filterPlaceholder="Filter city"
          sortable
          // style={{ width: "25%" }}
        ></Column>
        <Column
          field="type"
          header={t("Type")}
          body={typeBodyTemplate}
          filter
          filterField="type"
          filterPlaceholder="Filter type"
          sortable
          // style={{ width: "25%" }}
        ></Column>
        <Column
          field="location"
          header={t("Location")}
          filter
          className="text-overflow-ellipsis"
          filterField="location"
          filterPlaceholder="Search Location"
          sortable
          // style={{ width: "25%" }}
        ></Column>
        <Column
          field="date"
          header={t("Date")}
          sortable
          body={dateBodyTemplate}
          // style={{ width: "40%" }}
        ></Column>
        {/* <Column
          field="email"
          header="email"
          sortable
          style={{ width: "25%" }}
        ></Column> */}
        {/* <Column
          field="user.email"
          header="Contact"
          sortable
          style={{ width: "25%" }}
        ></Column> */}

        {/* <Column
          field="name"
          header="Name"
          sortable
          filter
          filterPlaceholder="Search"
          style={{ width: "25%" }}
        ></Column>
        <Column
          header="Country"
          body={countryBodyTemplate}
          sortable
          sortField="country.name"
          filter
          filterField="country.name"
          filterPlaceholder="Search"
          style={{ width: "25%" }}
        ></Column>
        <Column
          header="Agent"
          body={representativeBodyTemplate}
          sortable
          sortField="representative.name"
          filter
          filterField="representative"
          showFilterMatchModes={false}
          filterElement={representativeFilterTemplate}
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
          filter
          filterElement={statusFilterTemplate}
          filterMenuStyle={{ width: "14rem" }}
          style={{ width: "25%" }}
        ></Column> */}
      </DataTable>
    </div>
  );
}

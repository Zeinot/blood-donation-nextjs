"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { createPost } from "@/actions/actions";
import { postSchema } from "@/zod/Schemas";
import { Label, Listbox, ListboxButton } from "@headlessui/react";

import { useState } from "react";
import { ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/store";
import { useTranslations } from "next-intl";

const types = [
  { id: 1, name: "Blood" },
  { id: 2, name: "Platelets" },
  { id: 3, name: "Plasma" },
];

const formSchema = postSchema;

export default function CreatePostForm({locale} : {locale: string}) {
  const router = useRouter();

  const t = useTranslations("Dashboard.table");
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const response = await createPost(values);
    if (response !== "success") {
      response.map((issue) => {
        setError(issue.path[0] as any, { message: issue.message });
      });
    } else router.push(`/${locale}/dashboard`);
  }

  const [selected, setSelected] = useState(types[2]);

  useEffect(() => {
    setValue("type", selected.name as string);
  }, [selected]);
  return (
    <>
      {/*    <form className="flex flex-col">
        {/* register your input into the hook by invoking the "register" function  / }
        <textarea placeholder="Email" className="px-4 py-2 rounded" />
        {errors.criterias?.message}
        {errors.location?.message}
        {isSubmitting && <div>Loading ...</div>}
        <button type="submit">Submit</button>
      </form> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-sm:flex max-sm:flex-col sm:grid sm:grid-cols-2 gap-3"
      >
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {t("City")}
          </label>
          <div className="mt-2">
            <input
              {...register("city")}
              id="city"
              name="city"
              type="text"
               
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600"> {errors.city?.message}</p>
          </div>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {t("Location")}
          </label>
          <div className="mt-2">
            <input
              {...register("location")}
              id="location"
              name="location"
              type="text"
             
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600"> {errors.location?.message}</p>
          </div>
        </div>
        <div>
          <input hidden {...register("type")} />
          <Listbox value={selected} onChange={setSelected}>
            <Label className="block text-sm font-medium leading-6 text-gray-900">
              {t("Type")}
            </Label>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
              >
                {types.map((type) => (
                  <ListboxOption
                    key={type.id}
                    value={type}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                  >
                    <span className="block truncate font-normal group-data-[selected]:font-semibold">
                      {type.name}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                      <CheckIcon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
          <p className="text-red-600"> {errors.type?.message}</p>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {t("Date")}
          </label>
          <div className="mt-2">
            <input
              {...register("date")}
              type="datetime-local"
              id="date"
              name="date" 
              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <p className="text-red-600"> {errors.date?.message}</p>
          </div>
        </div>
        <div className="col-span-2">
          <label
            htmlFor="criterias"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {t("Criterias")}
          </label>
          <div className="mt-2">
            <textarea
              {...register("criterias")}
              id="criterias"
              name="criterias"
              rows={4}
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
            <p className="text-red-600"> {errors.criterias?.message}</p>
          </div>
        </div>
        {!isSubmitting ? (
          <button
            type="submit"
            className="sm:w-fit rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t("Create")}
          </button>
        ) : (
          <span className="sm:w-fit rounded-md bg-indigo-300 px-3 py-2 text-sm font-semibold text-white shadow-sm   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
           {t("Loading")}
          </span>
        )}
      </form>
    </>
  );
}

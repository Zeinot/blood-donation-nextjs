import { useTranslations } from "next-intl";



export default function Stats({locale} : {locale : string}) {

  const t = useTranslations("HomePage");

  const stats = [
    { id: 1, name: t("centers"), value: "8,000+" },
    { id: 2, name: t("lives"), value: "1M+" },
    { id: 3, name: t("Employees"), value: "37" },
    { id: 4, name: t("countries"), value: "12" },
  ];

  return (
    <div className="bg-white ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
         { t("StatsTitle")  }  
            </h2>
            {/* <p className="mt-4 text-lg leading-8 text-gray-600">
              Lorem ipsum dolor sit amet consect adipisicing possimus.
            </p> */}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

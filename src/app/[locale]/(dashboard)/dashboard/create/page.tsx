import { getLocale } from "next-intl/server";
import CreatePostForm from "./CreatePostForm";

export default async function page() {
  const locale = await getLocale();
  return (
    <div>
      <CreatePostForm locale={locale} />
    </div>
  );
}

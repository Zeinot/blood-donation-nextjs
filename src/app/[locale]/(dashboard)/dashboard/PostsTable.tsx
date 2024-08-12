import { deletePost } from "@/actions/actions";
import { Post } from "@prisma/client";
import Link from "next/link";
import Pagination from "./Pagination";

export default function PostsTable({ posts }: { posts: Post[] }) {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Criterias
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      City
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {posts.map((post) => {
                    const isoDateString = post.date;
                    const dateObject = new Date(isoDateString);
                    const humanReadableDate = dateObject.toLocaleString(
                      "en-US",
                      {
                        timeZone: "GMT",
                        hour: "numeric",
                        minute: "numeric",
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    );

                    return (
                      <tr key={post.id}>
                        <td className="font-medium whitespace-nowrap py-4 pl-4 pr-3 text-sm  text-gray-900 sm:pl-0">
                          {humanReadableDate}
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          style={{
                            maxWidth: "220px" /* Adjust the width as needed */,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {post.criterias}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {post.city}
                        </td>
                        <td
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          style={{
                            maxWidth: "220px" /* Adjust the width as needed */,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {post.location}
                        </td>
                        <td className="flex justify-end gap-3 relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Link
                            href={`/dashboard/edit/${post.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {post.id}</span>
                          </Link>
                          <form
                            action={async () => {
                              "use server";
                              await deletePost(post.id);
                            }}
                          >
                            <button
                              type="submit"
                              className="text-red-600 hover:text-indigo-900"
                            >
                              Delete<span className="sr-only">, {post.id}</span>
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <Pagination /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

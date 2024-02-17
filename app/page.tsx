"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [sections, SetSections] = useState<string[]>(["Introduction"]);
  const AddSection = (index: number) => {
    const sectoinTitle = `New section ${sections.length + 1}`;
    const updatedSections = [...sections];
    updatedSections.splice(index + 1, 0, sectoinTitle);
    SetSections(updatedSections);
  };
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24  max-w-7xl bg-white m-auto">
      {session?.user.name}
      {session ? (
        <div className="">
          {sections.map((section, index) => (
            <div key={index} className=" flex flex-col">
              <textarea
                className="block w-screen max-w-6xl text-center m-6  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={section}
              ></textarea>
              {session.user.role == "author" && (
                <button onClick={() => AddSection(index)} className="">
                  +
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="" onClick={() => signIn()}>
          Please SignIn
        </div>
      )}
    </main>
  );
}

"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
type Props = {
  category: Category[];
};

const CategoriesTabs = ({ category }: Props) => {
  const [tab, setTab] = useState("all");
  const router = useRouter();

  return (
    <div className="md:w-[70vw] lg:w-[70vw] xl:w-[70vw] w-full md:py-0 py-5 mx-auto md:bg-gray-400">
      {/* <ScrollArea className="w-[70vw] overflow-auto whitespace-nowrap rounded-md border"> */}
      <Tabs
        onValueChange={(val) => {
          setTab(val);
          router.push(`/?category=${val}`);
        }}
        defaultValue={tab}
        className="w-full "
      >
        <TabsList className="justify-start w-full overflow-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {category.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {/* </ScrollArea> */}
    </div>
  );
};

export default CategoriesTabs;

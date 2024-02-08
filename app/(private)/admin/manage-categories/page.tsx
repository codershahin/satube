"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const loaddata = async () => {
    try {
    } catch (error) {}
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!categoryName) {
        toast({
          title: "Category Name is required.",
          className: "text-red-500",
        });
      }
      setLoading(true);
      await axios.post(`/api/categories`, { name: categoryName });
      toast({
        title: "Success.",
        className: "text-green-500",
        description: "Category has been added successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong.",
        className: "text-red-500",
        description: error?.response?.data || error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loaddata();
  }, []);
  return (
    <div className="border">
      <Card className="max-w-md mx-auto my-10">
        <CardHeader>Add new category</CardHeader>
        <CardContent>
          <form className="p-2" onSubmit={onsubmit}>
            <Input
              required
              placeholder="enter category name"
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full my-2"
              variant={"default"}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

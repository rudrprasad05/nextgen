import { Loader, Loader2 } from "lucide-react";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "../ui/card";

export function LoadingContainer() {
  return (
    <div className="w-full h-48 rounded-lg grid place-items-center">
      <div className="text-center text-sm">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="flex flex-col space-y-3  bg-white rounded-lg">
      <Skeleton className="h-full aspect-square w-full rounded-t-xl rounded-b-none bg-gray-300" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-full  bg-gray-300" />
        <Skeleton className="h-4 w-full  bg-gray-300" />
        <Skeleton className="h-4 w-3/5  bg-gray-300" />
      </div>
    </div>
  );
}

export function SiteCardSkeleton() {
  return (
    <Card className="p-4 animate-pulse">
      {/* Preview */}
      <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-muted">
        <div className="w-full h-full rounded-md bg-muted-foreground/20" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        {/* Site name */}
        <div className="h-4 w-3/4 rounded bg-muted-foreground/20" />

        {/* Date + badge */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 rounded bg-muted-foreground/20" />
          <div className="h-5 w-16 rounded-full bg-muted-foreground/20" />
        </div>
      </div>
    </Card>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-4 rounded bg-gray-200" />
            </CardHeader>
            <CardContent>
              <div className="h-7 w-20 rounded bg-gray-300 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* BOTTOM SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RECENT ACTIVITY */}
        <Card className="pb-0">
          <CardHeader>
            <div className="h-5 w-40 rounded bg-gray-200" />
          </CardHeader>

          <CardContent className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-300" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/3 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </CardContent>

          <div className="border-t p-2">
            <div className="h-8 w-full rounded bg-gray-200" />
          </div>
        </Card>

        {/* QUICK ACTIONS */}
        <Card>
          <CardHeader>
            <div className="h-5 w-32 rounded bg-gray-200" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[88px] rounded border border-gray-200 bg-gray-100"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function NoDataContainer() {
  return (
    <div className="w-full h-48 border border-dashed border-gray-300 rounded-lg grid place-items-center">
      <div className="text-center text-sm">No Data to show</div>
    </div>
  );
}

export function SmallMediaLoadingCard() {
  return (
    <div className="flex flex-col space-y-3  bg-white rounded-lg">
      <Skeleton className="h-full aspect-square w-full rounded-t-xl rounded-b-none bg-gray-300" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-2 w-full  bg-gray-300" />
      </div>
    </div>
  );
}

export function LoadingHorizontialCard() {
  return (
    <div className="flex gap-4 my-4">
      <div>
        <Skeleton className="h-8 rounded-full w-8  bg-gray-300" />
      </div>
      <div className="grow flex flex-col gap-2">
        <Skeleton className="h-4  bg-gray-300" />
        <Skeleton className="h-4  bg-gray-300" />
        <Skeleton className="h-4 w-3/5  bg-gray-300" />
      </div>
    </div>
  );
}

export function SmallLoadingHorizontialCard() {
  return (
    <div className="flex gap-4 my-4">
      <div>
        <Skeleton className="h-6 rounded-full w-6  bg-gray-300" />
      </div>
      <div className="grow flex flex-col gap-2">
        <Skeleton className="h-3  bg-gray-300" />
        <Skeleton className="h-3 w-3/5  bg-gray-300" />
      </div>
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="flex gap-2 items-center">
        Loading <Loader className="animate-spin" />
      </div>
    </div>
  );
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  showHeader = true,
}: TableSkeletonProps) {
  return (
    <Table>
      {showHeader && (
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="h-4 w-[100px]" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex} className="py-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton
                  className={`h-4 ${
                    colIndex === 0
                      ? "w-[120px]"
                      : colIndex === 1
                        ? "w-[80px]"
                        : colIndex === 2
                          ? "w-[100px]"
                          : "w-[90px]"
                  }`}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client";

import {
  DashboardSkeleton,
  LoadingCard,
  SmallLoadingHorizontialCard,
} from "@/components/global/LoadingContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardData, FIVE_MINUTE_CACHE } from "@/lib/models";
import {
  Cake,
  Database,
  FileText,
  Loader2,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QuickActions } from "./quick-actions";
import { GetDashboardData } from "@/actions/dash";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/UserContext";
import { formatFileSize } from "@/lib/utils";

export function DashboardStats() {
  const { user } = useAuth();
  const defaultDashboardData: DashboardData = {
    totalSites: 0,
    totalMedia: 0,
    activeUsers: 0,
    unreadNotifications: 0,
    notifications: [],
  };
  const query = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: () => GetDashboardData({ userId: user?.id }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  if (query.isError) {
    return <div className="text-red-500">Error loading sites.</div>;
  }

  const data = query.data?.data ?? defaultDashboardData;
  const loading = query.isLoading;
  const meta = query.data?.meta;

  console.log(data);

  if (query.isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Total Sites</CardTitle>
            <Cake className="h-4 w-4 " />
          </CardHeader>
          <CardContent className="mt-auto">
            {loading && <Loader2 className="text-2xl  animate-spin" />}
            <div className="text-2xl font-bold ">{data?.totalSites}</div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">
              Total Messages
            </CardTitle>
            <MessageCircle className="h-4 w-4 " />
          </CardHeader>
          <CardContent className="mt-auto">
            {loading && <Loader2 className="text-2xl  animate-spin" />}
            <div className="text-2xl font-bold ">
              {data?.unreadNotifications}
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Total Media</CardTitle>
            <Database className="h-4 w-4 " />
          </CardHeader>
          <CardContent className="mt-auto">
            {loading && <Loader2 className="text-2xl  animate-spin" />}
            <div className="text-2xl font-bold ">
              {formatFileSize(data?.totalMedia)}
            </div>
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium ">Total Users</CardTitle>
            <Users className="h-4 w-4 " />
          </CardHeader>
          <CardContent className="mt-auto">
            {loading && <Loader2 className="text-2xl  animate-spin" />}
            <div className="text-2xl font-bold ">{data?.totalMedia}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className=" pb-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold ">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <div className="space-y-4 grow h-full">
              {loading &&
                Array.from({ length: 4 }, (_, i) => (
                  <SmallLoadingHorizontialCard key={i} />
                ))}
              {data?.notifications?.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={activity.user?.email}
                    />
                    <AvatarFallback className="bg-rose-100 text-rose-700 text-xs">
                      US
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm ">
                      <span className="font-medium">
                        {activity.user?.email}
                      </span>
                      {activity.message}
                    </p>
                    <p className="text-xs ">
                      {formatFullDate(activity.createdOn)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="border-t border-border">
            <Link href="/admin/notifications">
              <Button
                variant="ghost"
                className="cursor-pointer w-full justify-center text-xs"
              >
                See All Notifications
              </Button>
            </Link>
          </div>
        </Card>
        <QuickActions />
      </div>
    </div>
  );
}

const formatFullDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

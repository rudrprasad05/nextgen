"use client";

import { GetOneUser } from "@/actions/user";
import { NoDataContainer } from "@/components/global/LoadingContainer";
import { PasswordSection } from "@/components/profile/PasswordSection";
import { ProfilePictureSection } from "@/components/profile/ProfilePicture";
import { UsernameSection } from "@/components/profile/UserameSection";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { FIVE_MINUTE_CACHE, User } from "@/lib/models";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();

  console.log("user in profile page:", user);

  if (!user) {
    return <Loader2 className="animate-spin" />;
  }

  return <ProfileContainer user={user} />;
}

const ProfileContainer = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();
  const userId = user.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["editUser", userId],
    queryFn: () => GetOneUser({ userId: userId, uuid: user.id }),
    staleTime: FIVE_MINUTE_CACHE,
  });

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error || !data?.success || !data.data) {
    toast.error("Failed to fetch product data");
    return <NoDataContainer />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto ">
        <header className="border-b border-border ">
          <div className="flex items-center justify-between h-16 px-6 mx-auto">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold text-foreground">
                Profile Settings
              </h1>
            </div>
          </div>
        </header>

        <div className="mt-8 space-y-6">
          <ProfilePictureSection user={data.data} />
          <UsernameSection user={data.data} />

          {/* <RoleWrapper allowedRoles={[UserRoles.ADMIN]}> */}
          <PasswordSection user={data.data} />
          {/* </RoleWrapper> */}
        </div>
      </div>
    </div>
  );
};


import React from "react";
import { SupportUser } from "@/types/support";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface UserDetailsProps {
  user: SupportUser;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
};

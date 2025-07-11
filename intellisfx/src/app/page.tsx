"use client"

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth';
import { Auth } from '@/components/auth/auth';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const { user, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!user) {
    return <Auth />;
  }

  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <Button onClick={logout}>Logout</Button>
      {/* The original dashboard content can be rendered here */}
    </div>
  );
}

"use client";
import { Button } from '@/components/ui/button';
import { auth, provider } from '@/lib/firebase/firebaseClient';
import { error } from 'console';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react';

const LoginPage = () => {
  const router = useRouter(); // useRouterをコンポーネントのトップレベルで呼び出し

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        router.push("/conversation");
      }).catch((error) =>{
        console.log(error);
      })
     
  }

  return (
    <Button onClick={handleLogin}>Login</Button>
  );
};

export default LoginPage;

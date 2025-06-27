'use client'
import { SignedOut, SignedIn, useUser, SignInButton, UserButton } from '@clerk/nextjs';
import Breadcrumbs from './Breadcrumbs';

function Header() {
  const { user } = useUser();
  console.log(user);
  return (
    <div className='flex items-center justify-between p-5'>
      {user && (
        <h1 className='text-2xl'>Hello {user?.firstName}{`'s`} Space</h1>
      )}

      <Breadcrumbs />

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>

    </div>
  )
}

export default Header
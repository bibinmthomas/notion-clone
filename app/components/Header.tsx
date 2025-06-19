'use client'
import { SignedOut, SignedIn, useUser, SignInButton, UserButton } from '@clerk/nextjs';

function Header() {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      {user && (
        <h1>Hello {user?.firstName}{`'s`} Space</h1>
      )}

      {/* Breadcrumbs */}
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
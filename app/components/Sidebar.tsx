"use client";

import { useCollection } from "react-firebase-hooks/firestore";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { collectionGroup } from "firebase/firestore";
import { db } from "@/firebase";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/components/ui/sheet"
import NewDocumentButton from "./NewDocumentButton";

function Sidebar() {
    const {user} = useUser(); 
    // const {data,loading,error} = useCollection(
    //     user && {
    //         collectionGroup(db, "rooms")
    //     }
    // );


    const menuOptions = (
        <>
            <NewDocumentButton />
            {/* My Docs */}
            {/* List..... */}

            {/* Shared with me */}
            {/* List..... */}
        </>
    );

    return (
        <div className="p-2 md:p-5 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>{menuOptions}</div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:inline">
                {menuOptions}
            </div>
        </div>
    )
}
export default Sidebar
"use client";

// library imports
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, query, where, DocumentData } from "firebase/firestore";
import { MenuIcon } from "lucide-react";
// component imports
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import NewDocumentButton from "./NewDocumentButton";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
    id: string;
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string;
}

function Sidebar() {
    const { user } = useUser();
    const [groupedData, setGroupedData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: []
    });

    const [data, loading, error] = useCollection(
        user && (
            query(collectionGroup(db, "rooms"), where("userId", "==", user.emailAddresses[0].toString()))
        )
    );

    useEffect(() => {
        if (!data) return;
        const grouped = data.docs.reduce<{  // reduce the documents to a grouped object
            owner: RoomDocument[];
            editor: RoomDocument[];
        }>((acc, curr) => {
            const roomData = curr.data() as RoomDocument;

            if (roomData.role === "owner") {
                acc.owner.push({
                    ...roomData,
                    id: curr.id
                })
            } else {
                acc.editor.push({
                    ...roomData,
                    id: curr.id
                })
            }
            return acc;
        }, { owner: [], editor: [] });
        setGroupedData(grouped);
    }, [data]);


    const menuOptions = (
        <>
            <NewDocumentButton />

            {/* My Docs */}
            <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                {groupedData.owner.length === 0 ? (
                    <h2 className="text-grey-500 font-semibold text-sm">
                        No Documents found
                    </h2>
                ) : (
                    <>
                        <h2 className="text-grey-500 font-semibold text-sm">My Documents</h2>
                        {groupedData.owner.map((doc) => (
                            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
            </div>

            {/* Shared with me */}
            <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                {groupedData.editor.length === 0 && (
                    <>
                        <h2 className="text-grey-500 font-semibold text-sm">Shared with me</h2>
                        {groupedData.editor.map((doc) => (
                            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                        ))}
                    </>
                )}
            </div>
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
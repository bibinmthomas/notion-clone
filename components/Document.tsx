'use client'

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input"
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";

function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));

    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();

    useEffect(() => {
        if (data) {
            setInput(data.title);
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault(); // prevents screen from refreshing.

        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                })
            })
        }
    }

    return (
        <div>
            <div className="flex max-w-6xl mx-auto justify-between pb-5">
                <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
                    {/* Update title */}
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button disabled={isUpdating} type="submit">{isUpdating ? "Updating" : "Update"}</Button>

                    {/* If isOwner then Invite users, Delete Document */}
                </form>
            </div>

            <div>
                {/* Manage Users */}
                {/* Manage Users */}
            </div>

            {/* Collab editor */}
        </div>
    )
}
export default Document
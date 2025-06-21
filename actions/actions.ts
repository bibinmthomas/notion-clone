'use server';

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    auth.protect(); // protect the api route
    const { sessionClaims } = await auth(); // get the session claims set in cloudflare session 

    const docCollectionRef = adminDb.collection("documents"); // get the documents collection reference
    const docRef = await docCollectionRef.add({ // add a new document to the documents collection
        title: "New Document"
    })

    await adminDb.collection("users").doc(sessionClaims?.email!) // get the user document reference
        .collection("rooms").doc(docRef.id) // get the rooms collection reference
        .set({
            userId: sessionClaims?.email,
            role: "owner", // owner / editor
            roomId: docRef.id, // for indexing
            createdAt: new Date(),
            updatedAt: new Date(),
        }, { merge: true }) // merge the document with the existing one

    return { docId: docRef.id };
}
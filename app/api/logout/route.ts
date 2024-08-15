import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/app/lib/kysely";

export async function POST() {
  const sessionId = cookies().get("sessionId")
  if(sessionId){
    const result = await db.updateTable("sessions").set({is_exp:true}).where("sessions.token","=",sessionId.value).executeTakeFirstOrThrow()
    console.log(result)
  }


  cookies().delete("sessionId");
  return NextResponse.json({ message: "Déconnexion réussie" });
}

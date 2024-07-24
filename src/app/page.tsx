import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Link as LucideLink, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FileUpload from "@/components/FileUpload";
//import FileUpload from "@/components/FileUpload"; // Assuming FileUpload is a component in the same project

export default async function Home() {
  const { userId } = await auth();
  const isAuth =!!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <SignOutButton />
          </div>
          <div className="flex mt-2">
            {isAuth && (
              <Link href="/chats">
                <Button>
                  Go to Chats <ArrowRight className="ml-2" />
                </Button>
              </Link>
            )}
            <p className="max-w-xl mt-1 text-lg text-slate-600">
              Join millions of students, researchers and professionals to instantly
              answer questions and understand research with AI
            </p>
          </div>
          <div className="w-full mt-4">
            {isAuth? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
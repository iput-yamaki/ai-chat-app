import Link from "next/link";
import Image from "next/image";
export default function NotFound(){
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image alt="NotFound" fill src= {"/not-found.svg"}/>
            </div>
            <p className="text-muted-foreground text-sm text-center">
                ページが見つかりません
            </p>
            <Link href={"/conversation"}>conversationページに戻る</Link>
        </div>
    );
}

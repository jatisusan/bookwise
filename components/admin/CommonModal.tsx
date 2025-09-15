import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface Props {
  type: "delete" | "approve" | "deny";
  onConfirm: () => void;
}

const CommonModal = ({ type, onConfirm }: Props) => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="cursor-pointer">
          {type === "approve" ? (
            <p>Approve Account</p>
          ) : (
            <Image
              src={
                type === "delete"
                  ? "/icons/admin/trash.svg"
                  : "/icons/admin/close-circle.svg"
              }
              alt="delete"
              width={18}
              height={18}
            />
          )}
        </DialogTrigger>
        <DialogContent className="p-8">
          <DialogHeader className="flex justify-center flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center  rounded-full w-24 h-24 border-10",
                type === "approve"
                  ? "bg-green-400 border-green-50"
                  : "bg-red-400 border-red-50"
              )}
            >
              <Image
                src={
                  type === "delete"
                    ? "/icons/admin/trash.svg"
                    : type === "approve"
                    ? "/icons/admin/tick.svg"
                    : "/icons/admin/info.svg"
                }
                alt="icon"
                width={28}
                height={28}
                className={cn(type === "delete" && "invert brightness-0")}
              />
            </div>
            <DialogTitle className="font-semibold text-xl text-dark-400">
              {type === "delete"
                ? "Are you absolutely sure?"
                : type === "approve"
                ? "Approve Account Request"
                : "Deny Account Request"}
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600 text-center">
              {type === "delete"
                ? "This action cannot be undone. This will permanently delete the selected book."
                : type === "approve"
                ? "Approve the student's account request and grant access. A confirmation email will be sent upon approval."
                : "Denying this request will notify the student they are not eligible due to unsuccessful ID card verification."}
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              onClick={onConfirm}
              className={cn(
                "min-h-12 text-white",
                type === "approve"
                  ? "bg-green-400 hover:bg-green-400/90"
                  : "bg-red-400 hover:bg-red-400/90"
              )}
            >
              {type === "delete"
                ? "Delete Book"
                : type === "approve"
                ? "Approve & Send Confirmation"
                : "Deny & Notify Student"}
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommonModal;

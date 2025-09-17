import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import config from "@/lib/config";
import { Image } from "@imagekit/next";

const CardView = ({ universityCard }: { universityCard: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer gap-1 items-center">
        <p className="text-blue-100 font-medium">View ID Card</p>
        <img src="/icons/admin/link.svg" alt="link" className="w-3 h-3" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl text-dark-200">
            University Card Preview
          </DialogTitle>
        </DialogHeader>

        <div className="w-full h-80 -mt-8 flex items-end justify-center">
          <Image
            urlEndpoint={config.env.imagekit.urlEndpoint}
            src={universityCard}
            alt="card"
            width={1000}
            height={1000}
            className="object-contain rounded-xl block"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardView;

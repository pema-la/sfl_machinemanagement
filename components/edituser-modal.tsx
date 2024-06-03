import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { MdModeEdit } from "react-icons/md"

export function EditUser() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#fff] border border-[#496EA4] hover:bg-[#496EA4]">
            <MdModeEdit className="text-[#496EA4] hover:text-white" size={18}/>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-10">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
        </DialogHeader>
        <Separator className="" />
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-1">
            <Label htmlFor="name" className="">
              Name :
            </Label>
            <Input id="name" className="" />
          </div>
          <div className="grid items-center gap-1">
            <Label htmlFor="email" className="">
              Email :
            </Label>
            <Input id="email" className="" />
          </div>
          <div className="grid items-center gap-1">
            <Label htmlFor="contact" className="">
              Contact :
            </Label>
            <Input id="contact" className="" />
          </div>
          <div className="grid items-center gap-1">
            <Label htmlFor="cid" className="">
              CID :
            </Label>
            <Input id="cid" className="" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


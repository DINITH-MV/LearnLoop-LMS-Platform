import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import AssistantFunction from "@/app/Features/(routes)/code-assistant/AssistantFunction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Aperture, Send } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function AIAssistant() {
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button onClick={() => setIsDialogOpen(true)}>
          <div>
            <div className="z-[20] fixed bottom-20 right-[105px] h-[70px] w-[70px] rounded-[30px]">
              <span
                className="fa-stack fa-2x fa-shake"
                style={
                  {
                    fontSize: "24pt",
                    top: "3px",
                    left: "-4.5px",
                  } as React.CSSProperties
                }
              >
                <i
                  className="fa-solid fa-square fa-stack-2x"
                  style={
                    {
                      color: "#fb5d5d",
                      borderRadius: "30px",
                    } as React.CSSProperties
                  }
                ></i>
                <i
                  className="fa-duotone fa-solid fa-message-bot z-[102]"
                  style={
                    {
                      "--fa-primary-color": "#fff",
                      "--fa-secondary-color": "#fff",
                      "--fa-secondary-opacity": "0.8",
                      fontSize: "24pt",
                      top: "0px",
                      left: "0px",
                    } as React.CSSProperties
                  }
                ></i>
              </span>
            </div>
          </div>
        </button>
      </DialogTrigger>
      {isDialogOpen && (
        <DialogContent className="sm:max-w-[600px] rounded-[30px] bg-gradient-to-r border-white border-[3px] bg-[#fff0] min-h-[200px]">
          <div className="px-4 lg:px-8 ">
            <AssistantFunction />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

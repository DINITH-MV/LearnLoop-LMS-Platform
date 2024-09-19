import { SignIn } from "@clerk/nextjs";
import { useAuth } from '@clerk/nextjs'
 
export default function Page() {
  return(
    <div >
      <div className="flex justify-center items-center">
      <div className="text-center">

        <SignIn appearance={{
          variables: {
            colorPrimary: "rgb(247 201 115)",
            colorTextOnPrimaryBackground: "black",
            colorText: "black"
          }
        }} /></div>
      </div>
    </div>
  )
}
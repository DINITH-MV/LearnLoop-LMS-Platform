import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="flex justify-center items-center">
    <div className="text-center">

      <SignUp appearance={{
        variables: {
          colorPrimary: "rgb(247 201 115)",
          colorTextOnPrimaryBackground: "black",
          colorText: "black"
        }
      }} /></div>
    </div>
  );
}
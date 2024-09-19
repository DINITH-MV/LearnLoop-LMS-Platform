import { UserButton } from "@clerk/nextjs";


export default function Page() {
    return (
        <div className="text-[40px]">
            <UserButton
          afterSignOutUrl="/Dashboard"
          appearance={{
            variables: {
              colorPrimary: 'blue',
              colorText: 'black',
              fontSize: '18px',
            },
          }} />        
        </div>
    );
}
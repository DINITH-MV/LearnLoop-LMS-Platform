
export default function Header() {
  return (
    <div className="w-full pt-[30px] z-[199] relative">
      <div className="text-center text-[16pt] m-auto w-[600px] flex justify-around">
        <span><div>HOME</div></span>
        <span onClick={() => window.scrollTo({ top: 5210, behavior: 'smooth' })}>FEATURES</span>
        <span>COURSES</span>
        <span>ABOUT US</span>
      </div>
    </div>
  );
}

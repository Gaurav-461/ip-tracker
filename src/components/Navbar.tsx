import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl">IP Tracker</h1>
      </div>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;

import ActionAreaCard from "@/components/custom/ActionCard";
import { NavBarComponent } from "@/components/custom/NavBar";

function WelcomePage() {
  return (
    <>
      <NavBarComponent />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
        <ActionAreaCard />
      </div>
    </>
  );
}

export default WelcomePage
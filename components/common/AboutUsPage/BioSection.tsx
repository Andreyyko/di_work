import BioBlockBottom from "./BioBlockBottom";
import BioBlockMidBottom from "./BioBlockMidBottom";
import BioBlockMidTop from "./BioBlockMidTop";
import BioBlockTop from "./BioBlockTop";

const BioSection = () => {
  return (
    <div>
      <h2 className="heading-2 uppercase">
        <span className="first-letter" data-first-letter="Б">огдана <span className="first-letter" data-first-letter="А">ндрейко</span></span>
        <span className="first-letter translate-x-1/4 hidden md:block" data-first-letter="А">втор 60 фахофих</span>
        <span className="first-letter translate-x-1/2 block md:hidden" data-first-letter="А">втор</span>
        <span className="block md:hidden">60 фахофих</span>
        <span className="first-letter" data-first-letter="п">ублікацій по світу</span>
      </h2>
      <BioBlockTop/>
      <BioBlockMidTop/>
      <BioBlockMidBottom/>
      <BioBlockBottom/>
    </div>
  );
};

export default BioSection;

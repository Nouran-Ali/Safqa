import { useEffect } from 'react';
import AboutFirstSection from "../comps/AboutFirstSection";
import AboutSecondSection from "../comps/AboutSecondSection";
import AboutThirdSection from "../comps/AboutThirdSection";
import {i18n} from '../comps/i18n';
import AboutFourthSection from '../comps/AboutFourthSection';
import AboutFifthSection from '../comps/AboutFifthSection';

function About() {

  return (
    <div className="container aboutPage mt-5">
      <AboutFirstSection/>
      <AboutSecondSection/>
      <AboutThirdSection />
      <AboutFourthSection />
      <AboutFifthSection />
    </div>
  );
}

export default About;

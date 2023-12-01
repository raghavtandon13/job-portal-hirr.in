import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./testimonials.css";

const Testimonials = () => {
  const { mode } = useContext(ThemeContext);
  const theme = mode === "dark" ? "test-dark" : "test-light";
  return (
    <div className={`test ${theme}`}>
      <div className="test-div">
        <h3>Sarah's Success Story</h3>
        <p>
          "I couldn't have asked for a better job search experience. This job portal's user-friendly interface made finding and applying for jobs a
          breeze. Within weeks, I landed an interview and aced it with the help of their interview resources. Grateful to have found my dream job
          through this platform."
        </p>
      </div>
      <div className="test-div middle-test-div">
        <h3>James' Journey to Employment</h3>
        <p>
          "This job portal streamlined my post-grad job hunt. Personalized job suggestions and practical interview tips boosted my confidence. Thanks
          to them, I secured an entry-level position at a top company quickly and effortlessly."
        </p>
      </div>
      <div className="test-div">
        <h3>Emily's Exceptional Experience</h3>
        <p>
          "After a career hiatus, this job portal was a game-changer. Its resources helped me build a strong application. I connected with industry
          professionals, and their job listings led me to the perfect role. Thrilled to be back in the workforce, all thanks to this platform."
        </p>
      </div>
    </div>
  );
};

export default Testimonials;

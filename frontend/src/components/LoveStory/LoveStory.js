import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./LoveStory.css";

gsap.registerPlugin(ScrollTrigger);

const LoveStory = () => {
  const sectionsRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    // Animation for each section
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
            id: `section-${index}`,
          },
        }
      );
    });

    // Parallax effect for images
    gsap.utils.toArray(".story-image").forEach((image) => {
      gsap.fromTo(
        image,
        { y: 100 },
        {
          y: -50,
          scrollTrigger: {
            trigger: image,
            scrub: true,
          },
        }
      );
    });

    // Background color changes
    const colors = ["#ff9a9e", "#fad0c4", "#a1c4fd", "#c2e9fb", "#ffecd2"];
    sectionsRef.current.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(containerRef.current, {
            backgroundColor: colors[index % colors.length],
            duration: 1,
          });
        },
        onEnterBack: () => {
          gsap.to(containerRef.current, {
            backgroundColor: colors[index % colors.length],
            duration: 1,
          });
        },
      });
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="love-story-container" ref={containerRef}>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Start talked about our Rishta</h2>
          <p>
            It all began when my brother sent me his photo for a rishta. Soon,
            both our families planned to meet. Initially, we decided to meet at
            a café, but plans changed and we met at his Bua’s house instead.
            That was the first time I saw him — we sat and talked for about half
            an hour, and it felt special right from the start
          </p>
        </div>
        <div className="story-image">
          <img src="/images/first-meet.jpg" alt="First meeting" />
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>The Roka Ceremony</h2>
          <p>
            Our families came together to celebrate our commitment to each
            other. The traditional rituals, the blessings, and the joy in your
            eyes made it one of the most memorable days of my life. That's when
            we officially started our journey together.
          </p>
        </div>
        <div className="story-image">
          <img src="/images/roka.jpg" alt="Roka ceremony" />
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Our First Trip Together</h2>
          <p>
            Exploring the mountains, we discovered how well we travel together.
            From getting lost on hiking trails to sharing hot chocolate by the
            fireplace, every moment was magical. You're my perfect travel
            partner in every adventure.
          </p>
        </div>
        <div className="story-image">
          <img src="/images/trip.jpg" alt="First trip" />
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Everyday Moments</h2>
          <p>
            From lazy Sundays to cooking disasters, these are the moments that
            truly matter. Your laughter when I burn the toast, the way you steal
            blankets in your sleep, and our silly dance parties in the kitchen -
            these ordinary moments are my favorite.
          </p>
        </div>
        <div className="story-image">
          <img src="/images/everyday.jpg" alt="Everyday moments" />
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Looking Forward</h2>
          <p>
            So many adventures still to come, so many memories yet to make. I
            can't wait to grow old with you, to build a life together, and to
            keep falling in love with you every single day. Happy birthday to my
            favorite person!
          </p>
        </div>
        <div className="story-image">
          <img src="/images/future.jpg" alt="Future together" />
        </div>
      </div>
    </div>
  );
};

export default LoveStory;

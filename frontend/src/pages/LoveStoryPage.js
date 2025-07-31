import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/LoveStoryPage.css";

gsap.registerPlugin(ScrollTrigger);

const LoveStoryPage = () => {
  const sectionsRef = useRef([]);
  const containerRef = useRef();

  useEffect(() => {
    // Section animations
    sectionsRef.current.forEach((section, index) => {
      const content = section.querySelector(".story-content");
      const image = section.querySelector(".story-image");

      gsap.fromTo(
        content,
        { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            id: `content-${index}`,
          },
        }
      );

      gsap.fromTo(
        image,
        { opacity: 0, x: index % 2 === 0 ? 100 : -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
            id: `image-${index}`,
          },
        }
      );

      // Hover effect for images
      gsap.to(image, {
        scale: 1.05,
        duration: 0.3,
        scrollTrigger: {
          trigger: image,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Floating hearts animation
    const hearts = [];
    for (let i = 0; i < 10; i++) {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = "❤️";
      containerRef.current.appendChild(heart);
      hearts.push(heart);

      gsap.to(heart, {
        x: gsap.utils.random(-100, 100),
        y: gsap.utils.random(-50, 50),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      hearts.forEach((heart) => heart.remove());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="love-story-page" ref={containerRef}>
      <div className="love-story-header">
        <h1>Our Love Story</h1>
        <div className="header-decoration"></div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Start talked about our Rishta and first meeting</h2>
          <p>
            It all began when my brother sent me his photo for a rishta. Soon,
            both our families planned to meet. Initially, we decided to meet at
            a café, but plans changed and we met at his Bua’s house instead.
            That was the first time I saw him — we sat and talked for about half
            an hour, and it felt special right from the start
          </p>
          <div className="story-date">April 04, 2023</div>
        </div>
        <div className="story-image">
          <img src="/images/hisfirstphoto.jpg" alt="First meeting" />
          <div className="image-overlay"></div>
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>The Roka Ceremony</h2>
          <p>
            A few days later, my family visited his hometown Shinghana, and
            after that, his whole family came to meet us at my home. Suddenly,
            Golu Pandit ji suggested we do the Roka then and there! With
            blessings, we did Ganesh Pooja together, and our Roka was finalized
            on 11th April 2023 — a day that changed everything. 💍.
          </p>
          <div className="story-date">April 11, 2023</div>
        </div>
        <div className="story-image">
          <img src="/images/roka1.jpg" alt="Roka ceremony" />
          <div className="image-overlay"></div>
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>First Meeting After Roka</h2>
          <p>
            Just two days after our Roka, we exchanged phone numbers and started
            chatting on WhatsApp. Slowly, our conversations turned into long
            phone calls, often lasting till 4 AM. Our first meeting after Roka
            was on 23rd April 2023. He came on his TVS bike and took me to
            Annapurna Mandir and then to a café — and that day, he held my hand
            for the very first time. 💕
          </p>
          <div className="story-date">April 23, 2023</div>
        </div>
        <div className="story-image">
          <img src="/images/firstmeeting.jpg" alt="First trip" />
          <div className="image-overlay"></div>
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>House Inauguration Visit</h2>
          <p>
            Soon after, I visited his home again in Shinghana for his house
            inauguration. I stayed there for 4 days, met his family again, and
            we spent some lovely time together. Our bond grew stronger with
            every moment we shared.
          </p>
          <div className="story-date">June</div>
        </div>
        <div className="story-image">
          <img src="/images/houseIn1.jpg" alt="Everyday moments" />
          <div className="image-overlay"></div>
        </div>
      </div>

      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>First Birthday Together</h2>
          <p>
            On 1st August 2023, we celebrated his birthday together with a
            special trip to Okhleshwar. It was me, him, my brother and bhabhi.
            That day was full of joy, surprises, and sweet memories.
          </p>
          <div className="story-date">August 01 ,2023</div>
        </div>
        <div className="story-image">
          <img src="/images/firstBirthday.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>A Special Birthday Surprise</h2>
          <p>
            One of the most unforgettable moments of our journey was the
            birthday surprise he planned for me. 💝 He gave me some beautiful
            gifts that truly touched my heart. But the most special part was
            when we went together to Panchkuiya Mandir and did Shiv Abhishek
            side by side.(one time done on his birthday) That peaceful moment of
            prayer and togetherness made my birthday feel even more meaningful
            and sacred. It wasn’t just a celebration — it was a memory filled
            with love, blessings, and a deeper connection between us. 🕯️🛕💖
          </p>
          <div className="story-date">August 19 ,2023</div>
        </div>
        <div className="story-image">
          <img src="/images/Mybirthday.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Gangaur Festival</h2>
          <p>
            In 2024, I got the chance to celebrate Gangaur at his home. Being
            part of his traditions and seeing how warmly his family welcomed me
            made me feel like I already belonged.
          </p>
          <div className="story-date">2024</div>
        </div>
        <div className="story-image">
          <img src="/images/gangour2.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Roka Anniversary</h2>
          <p>
            We celebrated our Roka anniversary twice — just to relive the
            happiness of that beautiful beginning. Those celebrations reminded
            us how far we’ve come and how much we’ve grown together. In 2025, he
            gave me the most beautiful surprise. First, we visited Baglamukhi
            Mata Mandir together — a peaceful and divine start to our special
            day. After that, he surprised me with a gorgeous dress as a gift.
            The day ended with our first candlelight dinner — a romantic evening
            I’ll never forget. ✨🕯️💛 It was truly one of the most magical dates
            of our journey.
          </p>
          <div className="story-date">April 11 ,2024 and 2025</div>
        </div>
        <div className="story-image">
          <img src="/images/1anniversary.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Ujjain Jyotirling (Mahakaleshwar)</h2>
          <p>
            We started traveling together, and one of the most spiritual trips
            we took was to Mahakaleshwar Jyotirling in Ujjain. Praying together
            brought a special kind of peace and connection to our journey.
          </p>
          <div className="story-date">Sep 30 ,2023</div>
        </div>
        <div className="story-image">
          <img src="/images/ujjain2024.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2> Omkareshwar Jyotirling</h2>
          <p>
            Another divine destination was Omkareshwar Jyotirling. These sacred
            visits deepened our bond and gave us memories that we’ll cherish
            forever.
          </p>
          <div className="story-date"></div>
        </div>
        <div className="story-image">
          <img src="/images/omkareshwar1.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Dwarka, Gujarat — 1 Dham & More Jyotirlingas</h2>
          <p>
            Before our wedding, we went on a special trip to Gujarat and
            Rajasthan. It was full of love, faith, and family time. We visited
            holy places like Dwarka (one of the Char Dham), and two Jyotirlingas
            — Somnath and Nageshwar. We also went to Ambaji and Shrinathji
            temples, and made beautiful memories with our families. This trip
            wasn’t just about travel — it was about growing together, feeling
            blessed, and sharing moments that brought us all closer. 🛕💑✨
          </p>
          <div className="story-date">Future</div>
        </div>
        <div className="story-image">
          <img src="/images/dwarka.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <h2>Wedding Date Fixed</h2>
          <p>
            After two beautiful years of growing closer and falling in love,
            both our families decided on our wedding date — 30th November 2025.
            💒 We also attended his best friend Abhinav’s wedding in June, which
            made us even more excited for our own.
          </p>
          <div className="story-date">Future</div>
        </div>
        <div className="story-image">
          <img src="/images/weddingdate.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
      <div className="story-section" ref={addToRefs}>
        <div className="story-content">
          <p>
            Every step of our journey has been filled with love, laughter,
            support, and endless memories. From random phone calls to temple
            visits, long rides, surprises, festivals, and trips — our hearts
            have grown closer with each passing day. And now, we're counting
            down the days until we begin the next chapter — forever together.
            💑✨
          </p>
          <div className="story-date">Future</div>
        </div>
        <div className="story-image">
          <img src="/images/All.jpg" alt="Future together" />
          <div className="image-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default LoveStoryPage;

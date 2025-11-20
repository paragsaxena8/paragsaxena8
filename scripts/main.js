(function () {
  "use strict";

  /* ------------------------------------- */

  /* animations mixin */

  /* ------------------------------------- */
  const animationsMixin = {
    mounted() {
      /* preloader screen */
      this.animPreloaderScreen(); // initialize animation effects
      window.addEventListener("load", () => this.initAnimation());
    },

    methods: {
      // preloader screen
      animPreloaderScreen() {
        let count = 0;
        const preloader = this.$refs.preloader;

        if (!preloader) {
          return;
        }

        const preloaderContent = preloader.querySelector(".preloader-content");
        const imgs = [...document.images];
        const imgsLength = imgs.length;

        const hidePreloader = () => {
          preloader.setAttribute("style", "--loading-percentage: 100%");
          gsap
            .timeline()
            .set(".hide-in-preloading", {
              autoAlpha: 1,
            })
            .to(preloaderContent, {
              delay: 0.5,
              autoAlpha: 0,
            })
            .to(
              preloader,
              {
                y: "-100%",
                duration: 1,
                ease: "expo.in",
              },
              "-=0.5"
            )
            .set(preloader, {
              autoAlpha: 0,
            });
        };

        const imgLoaded = () => {
          count++;
          this.loadingPercentage = ((100 / imgsLength) * count) << 0;
          preloader.setAttribute(
            "style",
            `--loading-percentage: ${this.loadingPercentage}%`
          );

          if (count === imgsLength) {
            hidePreloader();
          }
        };

        if (imgsLength) {
          // setup preloader indicator
          imgs.forEach((img) => {
            const tImg = new Image();
            tImg.onload = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src = img.src;
          });
        } else {
          hidePreloader();
        }
      },

      // initialize animation effects
      initAnimation() {
        gsap.registerPlugin(ScrollTrigger);
        /* back to top scroll indicator */

        this.animBackTopScrollIndicator();
        /* statistics items */

        this.animStatisticsItems();
        /* section text box */

        this.animSectionTextBox();
        /* about image */

        this.animAboutImage();
        /* skills items */

        this.animSkillsItems();
        /* experience items timeline */

        this.animExperienceItemsTimeline();
        /* testimonials section title */

        this.animTestimonialsSectionTitle();
        /* testimonials items */

        this.animTestimonialsItems();
        /* contact info */

        this.animContactInfo();
        /* contact form */

        this.animContactForm();
      },

      // back to top scroll indicator
      animBackTopScrollIndicator() {
        const backTopBtn = this.$refs.scrollTopBtn;

        if (!backTopBtn) {
          return;
        }

        const showAt = backTopBtn.getAttribute("data-show-at");
        const backTopBtnPath = backTopBtn.querySelector("path");
        const backTopBtnPathLength = backTopBtnPath.getTotalLength();
        gsap.from(backTopBtn, {
          ease: "none",
          duration: 0.3,
          autoAlpha: 0,
          y: 10,
          scrollTrigger: {
            trigger: "#app-inner",
            start: `${showAt}px top`,
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        });
        gsap.set(backTopBtnPath, {
          strokeDasharray: backTopBtnPathLength,
          strokeDashoffset: backTopBtnPathLength,
          scrollTrigger: {
            trigger: "#app-inner",
            start: `${showAt}px top`,
            end: "bottom bottom",
            onUpdate: (self) =>
              (backTopBtnPath.style.strokeDashoffset =
                backTopBtnPathLength - self.progress * backTopBtnPathLength),
          },
        });
      },

      // statistics items
      animStatisticsItems() {
        const statisticsItems = gsap.utils.toArray(
          ".statistics-section .statistics-items li"
        );

        if (!statisticsItems.length) {
          return;
        }

        const statisticsItemsTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".statistics-items",
            start: "top 82%",
            end: "top 50%",
            scrub: 0.3,
          },
        });
        statisticsItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          statisticsItemsTL
            .from(
              el,
              {
                autoAlpha: 0,
              },
              pos
            )
            .from(
              el,
              {
                y: 50,
              },
              "<"
            );
        });
      },

      // section text box
      animSectionTextBox() {
        const textBoxes = gsap.utils.toArray(".text-box-inline");

        if (!textBoxes.length) {
          return;
        }

        textBoxes.forEach((box) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: box,
                start: "top 85%",
                end: "top 35%",
                scrub: 0.3,
              },
            })
            .from(box.querySelector(".subtitle"), {
              autoAlpha: 0,
              top: 50,
            })
            .from(
              box.querySelector("h2"),
              {
                autoAlpha: 0,
                y: 50,
              },
              "-=0.2"
            )
            .from(
              box.querySelectorAll("h2 ~ *"),
              {
                autoAlpha: 0,
                y: 50,
                stagger: 0.2,
              },
              "-=0.2"
            );
        });
      },

      // about image
      animAboutImage() {
        if (!this.$refs.aboutSection) {
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".about-section .about-img",
              start: "top 80%",
              end: "top 50%",
              scrub: 0.3,
            },
          })
          .from(".about-section .about-img", {
            autoAlpha: 0,
            scale: 0.5,
          });
      },

      // skills items
      animSkillsItems() {
        const skillsGroups = gsap.utils.toArray(
          ".skills-section .skills-items ul"
        );

        if (!skillsGroups.length) {
          return;
        }

        skillsGroups.forEach((group) => {
          const skillsItemsTL = gsap.timeline({
            scrollTrigger: {
              trigger: ".skills-section .skills-items",
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3,
            },
          });
          group.querySelectorAll("li").forEach((el, i) => {
            const pos = i === 0 ? "" : "< +=0.2";
            skillsItemsTL
              .from(
                el,
                {
                  autoAlpha: 0,
                },
                pos
              )
              .from(
                el,
                {
                  y: 50,
                },
                "<"
              );
          });
        });
      },

      // experience items timeline
      animExperienceItemsTimeline() {
        const experienceTimepath = this.$refs.experienceTimepath;
        const experienceItems = gsap.utils.toArray(
          ".experience-timeline .timeline-items li"
        );
        let experienceTimepathTL;
        let experienceItemsTL;
        let mainExperienceTL;

        if (experienceTimepath || experienceItems.length) {
          mainExperienceTL = gsap.timeline({
            scrollTrigger: {
              trigger: ".experience-section .experience-timeline",
              start: "top 85%",
              end: "top 35%",
              scrub: 0.3,
            },
          });
        }

        if (experienceTimepath) {
          const experienceTimepathItems = gsap.utils.toArray(
            ".experience-timeline .timepath span"
          );
          experienceTimepathTL = gsap.timeline();
          const docDir = document.documentElement.dir;
          const fromDir = docDir === "rtl" ? "reverse" : "from";
          const reverseDir = docDir === "rtl" ? "from" : "reverse";
          const coords = {
            x: {
              from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              reverse: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
              to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            },
            c: {
              from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 75%, 0% 75%, 0% 75%, 0% 75%)",
              reverse:
                "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 75%, 100% 75%, 100% 75%, 100% 75%)",
              to: {
                from: {
                  st1: "polygon(0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 75% 25%, 75% 25%, 0% 25%)",
                  st2: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 75% 75%, 75% 75%, 75% 25%, 0% 25%)",
                  st3: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 75%, 75% 75%, 75% 25%, 0% 25%)",
                },
                reverse: {
                  st1: "polygon(100% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 25% 25%, 25% 25%, 100% 25%)",
                  st2: "polygon(100% 0%, 0% 0%, 0% 100%, 0% 100%, 25% 75%, 25% 75%, 25% 25%, 100% 25%)",
                  st3: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 75%, 25% 75%, 25% 25%, 100% 25%)",
                },
              },
            },
          };
          const lineOdd = [
            ...experienceTimepath.querySelectorAll(".line:nth-of-type(4n + 1)"),
          ];
          const lineEven = [
            ...experienceTimepath.querySelectorAll(".line:nth-of-type(4n + 3)"),
          ];
          const semicircleOdd = [
            ...experienceTimepath.querySelectorAll(
              ".semicircle:nth-of-type(4n + 2)"
            ),
          ];
          const semicircleEven = [
            ...experienceTimepath.querySelectorAll(
              ".semicircle:nth-of-type(4n + 4)"
            ),
          ];
          experienceTimepathTL
            .set(experienceTimepathItems, {
              autoAlpha: 1,
            })
            .set(lineOdd, {
              clipPath: coords.x[fromDir],
            })
            .set(lineEven, {
              clipPath: coords.x[reverseDir],
            })
            .set(semicircleOdd, {
              clipPath: coords.c[fromDir],
            })
            .set(semicircleEven, {
              clipPath: coords.c[reverseDir],
            });
          experienceTimepathItems.forEach((el) => {
            if (lineOdd.includes(el) || lineEven.includes(el)) {
              experienceTimepathTL.to(el, {
                clipPath: coords.x.to,
              });
            } else if (semicircleOdd.includes(el)) {
              experienceTimepathTL
                .to(el, {
                  clipPath: coords.c.to[fromDir].st1,
                })
                .to(el, {
                  clipPath: coords.c.to[fromDir].st2,
                })
                .to(el, {
                  clipPath: coords.c.to[fromDir].st3,
                });
            } else if (semicircleEven.includes(el)) {
              experienceTimepathTL
                .to(el, {
                  clipPath: coords.c.to[reverseDir].st1,
                })
                .to(el, {
                  clipPath: coords.c.to[reverseDir].st2,
                })
                .to(el, {
                  clipPath: coords.c.to[reverseDir].st3,
                });
            }
          });
          mainExperienceTL.add(experienceTimepathTL);
        }

        if (experienceItems.length) {
          experienceItemsTL = gsap.timeline();
          experienceItems.forEach((el) => {
            experienceItemsTL
              .from(el, {
                autoAlpha: 0,
              })
              .from(
                el,
                {
                  scale: 0.2,
                },
                "<"
              );
          });
          mainExperienceTL.add(experienceItemsTL, "< +=0.5");
        }
      },

      // load all blog posts

      // testimonials section title
      animTestimonialsSectionTitle() {
        if (!this.$refs.testimonialsSection) {
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".testimonials-section .section-title",
              start: "top 90%",
              end: "top 40%",
              scrub: 0.3,
            },
          })
          .from(".testimonials-section .section-title .subtitle", {
            autoAlpha: 0,
            top: 50,
          })
          .from(
            ".testimonials-section .section-title .title",
            {
              autoAlpha: 0,
              y: 50,
            },
            "< +=0.2"
          );
      },

      // testimonials items
      animTestimonialsItems() {
        if (!this.$refs.testimonialsSection) {
          return;
        }

        const testimonialsItems = gsap.utils.toArray(
          ".testimonials-section .testimonials-item"
        );
        const testimonialsItemsTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".testimonials-section .testimonials-items",
            start: "top 75%",
            end: "top 25%",
            scrub: 0.3,
          },
        });
        testimonialsItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          testimonialsItemsTL
            .from(
              el,
              {
                autoAlpha: 0,
              },
              pos
            )
            .from(
              el,
              {
                scale: 0.2,
              },
              "<"
            );
        });
      },

      // contact info
      animContactInfo() {
        const contactInfoItems = gsap.utils.toArray(
          ".contact-section .contact-info li"
        );

        if (!contactInfoItems.length) {
          return;
        }

        const contactInfoTL = gsap.timeline({
          scrollTrigger: {
            trigger: ".contact-section .contact-info",
            start: "top 80%",
            end: "top 50%",
            scrub: 0.3,
          },
        });
        contactInfoItems.forEach((el, i) => {
          const pos = i === 0 ? "" : "< +=0.2";
          contactInfoTL
            .from(
              el,
              {
                autoAlpha: 0,
              },
              pos
            )
            .from(
              el,
              {
                y: 50,
              },
              "<"
            );
        }); // social icons animation

        contactInfoTL
          .from(".contact-section .contact-text .social li", {
            autoAlpha: 0,
          })
          .from(
            ".contact-section .contact-text .social li",
            {
              y: 50,
              stagger: 0.2,
            },
            "<"
          );
      },

      // contact form
      animContactForm() {
        if (!this.$refs.contactForm) {
          return;
        }

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".contact-section .contact-form",
              start: "top 80%",
              end: "top 50%",
              scrub: 0.3,
            },
          })
          .from(".contact-section .contact-form", {
            autoAlpha: 0,
            scale: 0.7,
          });
      },
    },
  };

  /* ------------------------------------- */
  const app = Vue.createApp({
    mixins: [animationsMixin],

    data() {
      return {
        // the date my career started (change to yours)
        careerStartDate: 2020,
        // the date copyright started (change to yours)
        copyrightStartDate: 2020,
        // for the template theme
        appTheme: "dark_theme",
        savedTheme: null,
        themeOptions: ["light_theme", "dark_theme"],
        // flag to toggle the preloader
        isPreloading: true,
        // toast notifications array
        notifications: [],
        // manage loading spinner status
        ajaxLoading: [],
        // for minimizing the header on scrolling down
        startMinimizingHeaderAt: 100,
        isHeaderBig: true,
        // for toggling the header on scrolling down
        lastScrollPosition: 0,
        isHeaderHidden: false,
        // flag to toggle focus style class
        isAnyFocus: false,
        // flag to toggle nav menu
        isNavMenuOpen: false,
        // list of nav links to loop through it
        navLinks: [
          {
            url: "#hero",
            title: {
              en: "Home",
            },
          },
          {
            url: "#about",
            title: {
              en: "About",
            },
          },
          {
            url: "#skills",
            title: {
              en: "Skills",
            },
          },
          {
            url: "#portfolio",
            title: {
              en: "Portfolio",
            },
          },
          {
            url: "#blogs",
            title: {
              en: "Blogs",
            },
          },
          {
            url: "#contact",
            title: {
              en: "Contact",
            },
          },
        ],
        // flag to toggle between skills types in skills section
        skillsType: "",
        aboutSection: {
          aboutMeText: `Hi, I'm Parag Saxena, a Full Stack Developer with around ${
            new Date().getFullYear() - 2020 + 1
          } years of experience building clean, scalable, and user-focused web applications. I specialize in Angular, TypeScript, Node.js, GraphQL, and MongoDB, and I enjoy turning complex ideas into simple, usable, and reliable digital experiences.<br><br>Over the years, I've worked across the stack-leading UI modules, improving application performance, and building features that are both intuitive and efficient. I care about clean code, thoughtful architecture, and creating systems that teams can maintain and scale with confidence.<br>I'm comfortable working end-to-end: designing smooth front-end experiences, building solid backend APIs, improving performance, mentoring developers, and collaborating closely with teams. I'm also a big believer in using AI-assisted development tools to write smarter code, boost productivity, and explore better solutions.<br><br>At my core, I'm someone who enjoys learning, experimenting, and improving a little every day. Whether it's building new features, solving performance bottlenecks, or exploring emerging tech, I love the process of creating things that work well and make a real difference.`,
        },

        //social-accounts
        socialAccounts: [
          {
            title: "GitHub",
            link: "https://github.com/paragsaxena8",
            icon: "fa fa-github",
          },
          {
            title: "Twitter",
            link: "https://twitter.com/ParagXd",
            icon: "fa fa-twitter",
          },
          {
            title: "LinkedIn",
            link: "https://linkedin.com/in/iparagsaxena",
            icon: "fa fa-linkedin",
          },
          {
            title: "Instagram",
            link: "https://instagram.com/iparagsaxena",
            icon: "fa fa-instagram",
          },
        ],
        // list of skills items to loop through it
        skillsItems: [
          {
            imgUrl: "../assets/images/skills/angular.png",
            title: "Angular",
          },
          {
            imgUrl: "../assets/images/skills/javascript.png",
            title: "JavaScript",
          },
          {
            imgUrl: "../assets/images/skills/html5.png",
            title: "HTML5",
          },
          {
            imgUrl: "../assets/images/skills/css3.png",
            title: "CSS3",
          },

          {
            imgUrl: "../assets/images/skills/typescript.png",
            title: "TypeScript",
          },
          {
            imgUrl: "../assets/images/skills/bootstrap.png",
            title: "Bootstrap",
          },
          {
            imgUrl: "../assets/images/skills/react.png",
            title: "React",
          },
          {
            imgUrl: "../assets/images/skills/sass.png",
            title: "SASS",
          },
        ],
        // list of tools items to loop through it
        toolsItems: [
          {
            imgUrl: "../assets/images/tools/git.png",
            title: "Git (Github)",
          },
          {
            imgUrl: "../assets/images/tools/npm.png",
            title: "NPM",
          },
          {
            imgUrl: "../assets/images/tools/command.png",
            title: "Command Line",
          },
          {
            imgUrl: "../assets/images/tools/vs-code.png",
            title: "VS Code",
          },
          {
            imgUrl: "../assets/images/tools/adobe-xd.png",
            title: "Adobe XD",
          },
        ],
        // list of experience items to loop through it
        experienceItems: [
          {
            date: "2019",
            period: "05/2019 - 08/2019",
            companyName: {
              en: "Get Popularity",
            },
            jobTitle: {
              en: "Web Intern",
            },
            desc: {
              en: "Responsibilities of core designing and development of Digital Marketing Solutions.",
            },
          },
          {
            date: "2020",
            period: "01/2020 - 08/2020",
            companyName: {
              en: "Confluxsys",
            },
            jobTitle: {
              en: "Associate Software Developer",
            },
            desc: {
              en: "Responsibilities that included developing User Interfaces (UI) using AngularJS and JavaScript.",
            },
          },
          {
            date: "2021",
            period: "05/2021 - 05/2023",
            companyName: {
              en: "Ace Analytics",
            },
            jobTitle: {
              en: "UI Engineer",
            },
            desc: {
              en: "Responsibilities include frontend development using Angular, JavaScript, and CSS.",
            },
          },
          {
            date: "2025",
            period: "06/2023 - 11/2025",
            companyName: {
              en: "Ace Analytics",
            },
            jobTitle: {
              en: "Module Lead",
            },
            desc: {
              en: "Responsibilities include leading a team of developers, managing projects, and ensuring the quality of the code.",
            },
          },
        ],
        // current page of portfolio items
        portfolioItemsPage: 3,
        // portfolio items per page
        itemsPerPage: 6,
        // portfolio items filter by type
        filters: ["All", "HTML", "Angular"],
        currentFilter: "All",
        // portfolio archive name
        portfolioArchiveName: "",
        // list of portfolio items to loop through it
        allPortfolioItems: [
          {
            id: 1,
            url: "https://github.com/paragsaxena8/closet-keeper",
            imgUrl: "../assets/images/portfolio/3.avif",
            title: {
              en: "Closet Keeper",
            },
            date: {
              en: "July 2024",
            },
            desc: {
              en: "Closet Keeper is a open-source, easy-to-use app that helps you organize your closet and keep track of your clothes. You can add, categorize, and make notes on items, making it easier to plan outfits and get dressed efficiently.",
            },
            category: "Dashboard",
            tools: ["HTML", "CSS", "JavaScript", "React"],
            screenshots: {},
            show: true
          },
          {
            id: 2,
            url: "https://www.behance.net/gallery/175372191/UIUX-Design",
            imgUrl: "../assets/images/portfolio/7.avif",
            title: {
              en: "UI/UX Design",
            },
            date: {
              en: "May 2023",
            },
            desc: {
              en: "A Job recuritment portal based on UK",
            },
            category: "UX",
            tools: ["UX", "Adobe XD"],
            screenshots: {},
            show: false
          },
          {
            id: 3,
            url: "https://github.com/paragsaxena8/smart-space-ui",
            imgUrl: "../assets/images/portfolio/5.avif",
            title: {
              en: "Smart Space",
            },
            date: {
              en: "April 2022",
            },
            desc: {
              en: "A Web Application where you can create Blogs, Share Ideas and connect with like-minded people.",
            },
            category: "Dashboard",
            tools: ["HTML", "CSS", "JavaScript", "Angular"],
            screenshots: {},
            show: true
          },
          {
            id: 4,
            url: "https://paragsaxena8.github.io/coVaccinate/",
            imgUrl: "../assets/images/portfolio/3.avif",
            title: {
              en: "Co-Vaccinate",
            },
            date: {
              en: "Jan 2021",
            },
            desc: {
              en: "A Covid-19 Vaccination slot searching Application using Angular and Cowin API's.",
            },
            category: "Tools",
            tools: ["HTML", "CSS", "JavaScript", "Angular"],
            screenshots: {},
            show: true
          },
          {
            id: 5,
            url: "https://github.com/paragsaxena8/Rakshak",
            imgUrl: "../assets/images/portfolio/4.avif",
            title: {
              en: "Rakshak - A Web App Vulnerability Testing Tool",
            },
            date: {
              en: "September 2020",
            },
            desc: {
              en: "Built a PHP- and Python-powered web application for an OWASP vulnerability testing tool, complete with a Web CLI interface for executing security checks.",
            },
            category: "Security",
            tools: ["HTML", "CSS", "JavaScript", "PHP", "Python"],
            screenshots: {},
            show: true
          },
          {
            id: 6,
            url: "https://mahamudrafarms.com",
            imgUrl: "../assets/images/portfolio/1.avif",
            title: {
              en: "MahaMudra Farms",
            },
            date: {
              en: "Nov 2018",
            },
            desc: {
              en: "Built a PHP and HTML–based web application for MahaMudra Farms, supporting their organic farming operations.",
            },
            category: "Portfolio",
            tools: ["HTML", "CSS", "PHP"],
            screenshots: {},
            show: true
          },
        ],
        // viewed portfolio items
        portfolioItems: [],
        // blog post count
        blogPost: 0,
        // list of testimonials items to loop through it
        testimonialsItems: [
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "I create a pleasant experience with wireframing & prototyping web page interfaces to make more attractive with the design.",
            },
            quoteAuthor: {
              en: "UI/UX Design",
            },
            jobTitle: {
              en: "",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "I create a pleasant experience with wireframing & prototyping web page interfaces to make more attractive with the design.",
            },
            quoteAuthor: {
              en: "Front End Development",
            },
            jobTitle: {
              en: "",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "I create a pleasant experience with wireframing & prototyping web page interfaces to make more attractive with the design.",
            },
            quoteAuthor: {
              en: "SEO & Branding",
            },
            jobTitle: {
              en: "",
            },
          },
          {
            imgUrl: "https://via.placeholder.com/200",
            quoteContent: {
              en: "I create a pleasant experience with wireframing & prototyping web page interfaces to make more attractive with the design.",
            },
            quoteAuthor: {
              en: "Digital Consultation",
            },
            jobTitle: {
              en: "",
            },
          },
        ],
      };
    },

    created() {
      // get a theme to use
      this.getAppTheme();
    },

    mounted() {
      if (window.innerWidth >= 992) {
        // initialize circle cursor
        this.initCircleCursor(); // apply pan effect hero image
        this.heroImgPanEffect(); // initialize VanillaTilt library in portfolio section

        this.initializeTilt();
      } // nav menu tab trap
      this.navMenuTabTrap(); // scrolling options
      this.allBlogPosts(); // all Blog posts

      this.scrollingOptions();
      document.addEventListener("scroll", () => this.scrollingOptions()); // initialize popper.js plugin

      document.querySelectorAll(".has-ultimate-tooltip").forEach((el) => {
        Popper.createPopper(el, el.querySelector(".ultimate-tooltip"), {
          placement: "top",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 30],
              },
            },
          ],
        });
      }); // get portfolio items

      this.getPortfolioItems(); // init glightbox plugin

      new GLightbox({
        autoplayVideos: false,
      }); // initialize the first displayed type of skills

      this.initSkillsFirstType();
    },

    methods: {
      // initialize circle cursor
      initCircleCursor() {
        const app = this.$refs.appRef;
        const outer = this.$refs.circleCursorOuter;
        const inner = this.$refs.circleCursorInner; // return if disabled

        if (!outer || !inner) {
          return;
        }

        app.addEventListener("mousemove", (e) => {
          // make the circles follow the cursor
          outer.setAttribute(
            "style",
            `visibility: visible; top: ${e.clientY}px; left: ${e.clientX}px;`
          );
          inner.setAttribute(
            "style",
            `visibility: visible; top: ${e.clientY}px; left: ${e.clientX}px;`
          ); // add link hover style

          e.target.closest("a") ||
          e.target.closest("button") ||
          e.target.closest(".link-hover")
            ? inner.classList.add("cursor-link-hover")
            : inner.classList.remove("cursor-link-hover");
        });
        app.addEventListener("click", () => {
          // add pulse effect on click
          inner.classList.add("cursor-click-effect");
          setTimeout(() => inner.classList.remove("cursor-click-effect"), 200);
        });
      },

      allBlogPosts() {
        const MEDIUM_USERNAME = "@paragxd";
        const RSS_URL = `https://medium.com/feed/${MEDIUM_USERNAME}`;
        const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}`;

        // 1. HELPER: Extract Image source from HTML string
        const extractImage = (item) => {
          // Case 1: The feed actually has a thumbnail
          if (item.thumbnail && item.thumbnail.length > 0)
            return item.thumbnail;

          // Case 2: We have to hunt for the <img src=""> inside the content
          const doc = new DOMParser().parseFromString(
            item.description,
            "text/html"
          );
          const img = doc.querySelector("img");

          // Case 3: Return found image or a placeholder
          return img
            ? img.src
            : "https://via.placeholder.com/400x200?text=Read+on+Medium";
        };

        // 2. HELPER: Remove HTML tags for clean text preview
        const cleanText = (html) => {
          const doc = new DOMParser().parseFromString(html, "text/html");
          return doc.body.textContent || "";
        };

        async function fetchPosts() {
          let blogposts = document.querySelector("#blogpost");
          let postsCount = document.querySelector("#postCount");

          try {
            const res = await fetch(API_URL);
            const data = await res.json();

            if (data.status !== "ok") throw new Error("Failed to fetch");

            // 3. SIMULATED GRAPHQL: Map to a clean object structure
            // We download everything, but we process it into a clean list immediately
            const cleanPosts = data.items.map((item) => ({
              title: item.title,
              link: item.link,
              date: new Date(item.pubDate).toLocaleDateString(),
              // This fixes the "No Image" issue:
              image: extractImage(item),
              // This creates a clean description without HTML tags:
              description: cleanText(item.description).substring(0, 120) + "...",
              categories: Array.isArray(item.categories) ? item.categories : [],
            }));

            // Render - append to existing list
            const blogPostsHTML = cleanPosts
              .map(
                (post) => {
                  const tagsHTML = post.categories && post.categories.length
                    ? `<div class="tools">${post.categories.map(cat => `<span class=\"tool-tag\">${cat}</span>`).join('')}</div>`
                    : "";
                  return `
                <li class="portfolio-item">
                  <div class="item-img">
                    <img class="portfolio-img" loading="lazy" src="${post.image}" onerror="this.src='../assets/images/default-blog.png'" alt="${post.title}" />
                  </div>
                  <div class="item-details">
                    <h3 class="title">${post.title}</h3>
                    <div class="date">${post.date}</div>
                    <p class="description">${post.description}</p>
                    <div class="meta-info">
                      ${tagsHTML}
                      <div class="actions"><a class="visit-btn" href="${post.link}" target="_blank" rel="noopener">Visit</a></div>
                    </div>
                  </div>
                </li>`;
                }
              )
              .join("");
            blogposts.insertAdjacentHTML('beforeend', blogPostsHTML);
            postsCount.innerText = `${cleanPosts.length}+`;
            // inline suppression hover behavior for newly added blog Visit buttons
            const blogVisitBtns = document.querySelectorAll('#blogs .visit-btn');
            blogVisitBtns.forEach(btn => {
              const card = btn.closest('li.portfolio-item');
              if (!card || btn.__visitSuppressionBound) return;
              btn.addEventListener('mouseenter', () => card.classList.add('suppress-tags'));
              btn.addEventListener('mouseleave', () => card.classList.remove('suppress-tags'));
              btn.__visitSuppressionBound = true;
            });
          } catch (err) {
            const errorHTML = '<li style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p>Could not load posts.</p></li>';
            blogposts.insertAdjacentHTML('beforeend', errorHTML);
            postsCount.innerText = "0";
            console.error(err);
          }
        }

        fetchPosts();
      },

      // get a theme to use
      getAppTheme() {
        // get the saved theme from the localStorage
        const storageSavedTheme = localStorage.getItem("nafieSavedTheme"); // Check to see if there a saved theme

        if (
          storageSavedTheme &&
          this.themeOptions.includes(storageSavedTheme)
        ) {
          this.savedTheme = storageSavedTheme;
        } else if (storageSavedTheme) {
          this.savedTheme = this.themeOptions[0];
        } else {
          // So, try to get the browser default theme or make your own default
          // Check to see if Media-Queries are supported
          if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              this.savedTheme = "dark_theme";
            } else {
              this.savedTheme = "light_theme";
            }
          } else {
            // Default (when Media-Queries are not supported)
            this.savedTheme = this.appTheme;
          }
        } // save the new theme in the localStorage

        localStorage.setItem("nafieSavedTheme", this.savedTheme);
      },

      // detect the theme changes
      changeAppTheme() {
        const currentIndex = this.themeOptions.indexOf(this.savedTheme);
        const nextIndex =
          currentIndex === -1
            ? 0
            : (currentIndex + 1) % this.themeOptions.length;
        this.savedTheme = this.themeOptions[nextIndex];

        // save the new theme in the localStorage
        localStorage.setItem("nafieSavedTheme", this.savedTheme);
      },

      // toggle nav menu
      toggleNavMenu() {
        this.isNavMenuOpen = !this.isNavMenuOpen;
        this.isNavMenuOpen ? this.openNavMenu() : this.closeNavMenu();
      },

      // open nav menu
      openNavMenu() {
        const bodyEl = document.getElementsByTagName("body")[0];
        this.isNavMenuOpen = true;
        bodyEl.setAttribute("style", "overflow-y: hidden;"); // set focus on nav menu

        this.$refs.headerNav.querySelector(".desktop-menu-content").focus();
      },

      // close nav menu
      closeNavMenu() {
        const bodyEl = document.getElementsByTagName("body")[0];
        this.isNavMenuOpen = false;
        bodyEl.removeAttribute("style"); // set focus on nav menu toggle button

        this.$refs.navMenuToggleBtn.focus();
      },

      // nav menu tab trap
      navMenuTabTrap() {
        const nav = this.$refs.headerNav;
        const focusableElementsString =
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
        let firstTabStop;
        let lastTabStop;
        let isFirstTabStop;
        let isLastTabStop;
        document.addEventListener("keyup", (e) => {
          if (nav.classList.contains("menu-open")) {
            // get first & last focusable elements in the side menu for the tab trap
            const visibleFocusableEls = [
              ...nav.querySelectorAll(focusableElementsString),
            ].filter(
              (el) =>
                window.getComputedStyle(el).getPropertyValue("visibility") !==
                "hidden"
            );
            firstTabStop = visibleFocusableEls[0];
            lastTabStop = visibleFocusableEls[visibleFocusableEls.length - 1];

            if (e.code === "Tab") {
              if (e.shiftKey) {
                /* shift + tab */
                // if this is the first item, move to the last item
                isFirstTabStop && lastTabStop.focus();
              } else {
                /* tab */
                // if this is the last item, go back to the first item
                isLastTabStop && firstTabStop.focus();
              } // close nav menu on Escape button press
            } else if (e.code === "Escape") {
              this.toggleNavMenu();
            } // get current active element

            const activeEl = document.activeElement; // check if last item or not

            isLastTabStop = activeEl === lastTabStop ? true : false; // check if first item or not

            isFirstTabStop = activeEl === firstTabStop ? true : false;
          }
        });
      },

      // apply pan effect hero image
      heroImgPanEffect() {
        const parent = this.$refs.heroSection; // return if disabled

        if (!parent || !parent.getAttribute("data-paneffect")) {
          return;
        }

        const layer1 = parent.querySelectorAll(".layer")[0];
        const layer2 = parent.querySelectorAll(".layer")[1];
        parent.addEventListener("mousemove", (e) => {
          const x =
            ((e.x - parent.getBoundingClientRect().x) / parent.offsetWidth) *
            100;
          const y =
            ((e.y - parent.getBoundingClientRect().y) / parent.offsetHeight) *
            100;
          parent.classList.add("parallax-animation");
          layer1.setAttribute("style", `transform-origin: ${x}vw ${y}vh;`);
          layer2.setAttribute("style", `transform-origin: ${x}vw ${y}vh;`);
        });
      },

      // scrolling options
      scrollingOptions() {
        const scrollPosition = window.pageYOffset; // check for current scroll position to minimize the header

        this.isHeaderBig =
          scrollPosition >= this.startMinimizingHeaderAt ? false : true; // check for current scroll position to toggle the header

        this.isHeaderHidden =
          scrollPosition > 100 && scrollPosition > this.lastScrollPosition
            ? true
            : false;
        this.lastScrollPosition = scrollPosition;
      },

      // scroll to top
      scrollToTop() {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      },

      // initialize the first displayed type of skills
      initSkillsFirstType() {
        const skillsSwitchBtn = this.$refs.skillsSwitchBtn; // return if disabled

        if (!skillsSwitchBtn) {
          return;
        }

        this.skillsType = skillsSwitchBtn.querySelector("input").value;
      },

      // initialize VanillaTilt library in portfolio section
      initializeTilt() {
        const portfolioItems = this.$refs.portfolioItems; // return if disabled

        if (!portfolioItems) {
          return;
        }

        VanillaTilt.init(portfolioItems.querySelectorAll(".portfolio-item"), {
          max: 8,
          speed: 400,
          glare: true,
          "max-glare": 0.3,
        });
      },

      // get portfolio items
      getPortfolioItems() {
        const itemsArr = this.allPortfolioItems
          .filter((item) => {
            const urlParams = new URLSearchParams(window.location.search);
            const tax = urlParams.get("tax");

            if (tax) {
              if (tax === "cat") {
                const cat = urlParams.get("cat");
                this.portfolioArchiveName = cat;
                return item.category === cat;
              } else if (tax === "tools") {
                const tool = urlParams.get("tools");
                this.portfolioArchiveName = tool;
                return item.tools.includes(tool);
              }
            } else {
              return (
                this.currentFilter === "All" ||
                item.category === this.currentFilter
              );
            }
          })
          .slice(
            this.filteredPortfolioItems.length,
            this.portfolioItemsPage * this.itemsPerPage
          ); // check if have works or not

        if (itemsArr.length) {
          this.portfolioItems.push(...itemsArr);
          this.$nextTick(() => {
            // reinitialize VanillaTilt for new items
            this.portfolioItemsPage > 1 && this.initializeTilt(); // Forces the ScrollTrigger instance to re-calculate its start and end values

            setTimeout(() => ScrollTrigger.refresh(), 500);
          });
          this.portfolioItemsPage++;
        } else {
          // show message "No works" to the user
          this.setNotify({
            className: "danger",
            msg: this.$refs.portfolioItems.getAttribute("data-no-works-msg"),
            time: 3000,
          });
        }
      },

      // filter portfolio items
      filterPortfolioItems(filter) {
        this.currentFilter = filter;
        // this.portfolioItemsPage = 1;

        if (this.filteredPortfolioItems.length) {
          this.$nextTick(() => {
            // reinitialize VanillaTilt for new items
            this.portfolioItemsPage > 1 && this.initializeTilt(); // Forces the ScrollTrigger instance to re-calculate its start and end values

            setTimeout(() => ScrollTrigger.refresh(), 500);
          });
        } else {
          // get new portfolio items
          this.getPortfolioItems();
        }
      },

      // contact form validation
      contactFormValidation() {
        // contact form
        const contactForm = this.$refs.contactForm; // form controls
        const form = document.querySelector("#contactForm");
        const name = contactForm.querySelector('input[name="name"]');
        const email = contactForm.querySelector('input[name="email"]');
        const phone = contactForm.querySelector('input[name="phone"]');
        const message = contactForm.querySelector("textarea"); // form validation status

        let errors = {
          name: {
            required: true,
            minLength: true,
          },
          email: {
            required: true,
            invalid: true,
          },
          phone: {
            invalid: true,
          },
          message: {
            required: true,
          },
        };
        /* --------------- */

        /* name validation */

        /* --------------- */
        // required validation

        if (name.value === "") {
          errors.name.required = true;
          this.setNotify({
            id: "nameRequired",
            className: "danger",
            msg: name
              .closest(".control")
              .querySelector(".errors-msgs .required").value,
          });
        } else {
          errors.name.required = false;
          this.dismissNotify("nameRequired");
        } // minlength validation

        if (
          name.value.length > 0 &&
          name.value.length < name.getAttribute("minlength")
        ) {
          errors.name.minLength = true;
          this.setNotify({
            id: "nameMinLength",
            className: "danger",
            msg: name
              .closest(".control")
              .querySelector(".errors-msgs .minLength").value,
          });
        } else {
          errors.name.minLength = false;
          this.dismissNotify("nameMinLength");
        } // toggle invalid errors & style classes

        if (Object.keys(errors.name).some((err) => errors.name[err] === true)) {
          name.classList.remove("valid");
          name.classList.add("invalid");
        } else {
          name.classList.remove("invalid");
          name.classList.add("valid");
        }
        /* ---------------- */

        /* email validation */

        /* ---------------- */
        // required validation

        if (email.value === "") {
          errors.email.required = true;
          this.setNotify({
            id: "emailRequired",
            className: "danger",
            msg: email
              .closest(".control")
              .querySelector(".errors-msgs .required").value,
          });
        } else {
          errors.email.required = false;
          this.dismissNotify("emailRequired");
        } // email validation

        if (
          email.value.length > 0 &&
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            email.value
          )
        ) {
          errors.email.invalid = true;
          this.setNotify({
            id: "emailInvalid",
            className: "danger",
            msg: email
              .closest(".control")
              .querySelector(".errors-msgs .invalid").value,
          });
        } else {
          errors.email.invalid = false;
          this.dismissNotify("emailInvalid");
        } // toggle invalid errors & style classes

        if (
          Object.keys(errors.email).some((err) => errors.email[err] === true)
        ) {
          email.classList.remove("valid");
          email.classList.add("invalid");
        } else {
          email.classList.remove("invalid");
          email.classList.add("valid");
        }
        /* ---------------- */

        /* phone validation */

        /* ---------------- */
        // phone validation

        if (
          phone.value.length > 0 &&
          !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
            phone.value
          )
        ) {
          errors.phone.invalid = true;
          this.setNotify({
            id: "phoneInvalid",
            className: "danger",
            msg: phone
              .closest(".control")
              .querySelector(".errors-msgs .invalid").value,
          });
        } else {
          errors.phone.invalid = false;
          this.dismissNotify("phoneInvalid");
        } // toggle invalid errors & style classes

        if (
          Object.keys(errors.phone).some((err) => errors.phone[err] === true)
        ) {
          phone.classList.remove("valid");
          phone.classList.add("invalid");
        } else {
          phone.classList.remove("invalid");
          phone.classList.add("valid");
        }
        /* ------------------ */

        /* message validation */

        /* ------------------ */
        // required validation

        if (message.value === "") {
          errors.message.required = true;
          this.setNotify({
            id: "messageRequired",
            className: "danger",
            msg: message
              .closest(".control")
              .querySelector(".errors-msgs .required").value,
          });
        } else {
          errors.message.required = false;
          this.dismissNotify("messageRequired");
        } // toggle invalid errors & style classes

        if (
          Object.keys(errors.message).some(
            (err) => errors.message[err] === true
          )
        ) {
          message.classList.remove("valid");
          message.classList.add("invalid");
        } else {
          message.classList.remove("invalid");
          message.classList.add("valid");
        } // send the message if the form is valid

        !Object.values(errors).some((control) =>
          Object.values(control).some(Boolean)
        );
        form.addEventListener("submit", this.sendContactFormMessage);
      },

      // send message from contact form
      sendContactFormMessage(form) {
        form.preventDefault();
        const url = "https://formspree.io/f/xnqknazp";
        const formData = new FormData(form.target); // start loading spinner
        this.startLoading(); // send post request

        fetch(url, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        })
          .then((data) => {
            if (data.ok) {
              // show success message
              this.setNotify({
                className: "success",
                msg: form.target.getAttribute("data-success-msg"),
                time: 5000,
              }); // reset all form inputs

              form.target.reset(); // remove inputs valid classes

              form.target
                .querySelectorAll(".valid")
                .forEach((el) => el.classList.remove("valid"));
            } else {
              // show error message
              this.setNotify({
                className: "danger",
                msg: form.target.getAttribute("data-err-msg"),
                time: 5000,
              });
            } // end loading spinner

            this.endLoading();
            console.log(data);
          })
          .catch((err) => console.log(err));
      },

      // show messages by toast notifications
      setNotify({ id, className, msg, time }) {
        const notify = {
          id: id || `${Date.now()}${this.notifications.length}`,
          className,
          msg,
          time,
        };

        if (id) {
          !this.notifications.some((e) => e.id === id) &&
            this.notifications.push(notify);
        } else {
          this.notifications.push(notify);
        } // remove this notification from the array after (n) seconds

        time && setTimeout(() => this.dismissNotify(notify.id), time);
      },

      // dismiss the notifications
      dismissNotify(id) {
        const index = this.notifications.findIndex(
          (notify) => notify.id === id
        );
        index > -1 && this.notifications.splice(index, 1);
      },

      // add ajax loading spinner
      startLoading() {
        this.ajaxLoading.push(true);
      },

      // remove ajax loading spinner
      endLoading() {
        this.ajaxLoading.pop();
      },
    },
    computed: {
      // flag to toggle ajax loading spinner
      isAjaxLoading() {
        return this.ajaxLoading.some((state) => state === true);
      },

      // get the total years of experience
      experienceYears() {
        return (
          new Date(
            new Date() - new Date(String(this.careerStartDate))
          ).getFullYear() - 1970
        );
      },

      // caclulate total Projects
      completedProjects() {
        return this.allPortfolioItems.length;
      },

      // calculate happy clients
      happyClients() {
        return this.testimonialsItems.length;
      },

      // split experience items into chunks of 3 items
      experienceChunks() {
        return [...Array(Math.floor((this.experienceItems.length - 1) / 3))];
      },

      // filtered portfolio items
      filteredPortfolioItems() {
        const urlParams = new URLSearchParams(window.location.search);
        const tax = urlParams.get("tax");

        if (tax) {
          return this.portfolioItems;
        } else {
          return this.portfolioItems.filter(
            (item) =>
              this.currentFilter === "All" ||
              item.category === this.currentFilter
          );
        }
      },

      // get single portfolio item
      getSinglePortfolioItem() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        return this.allPortfolioItems.find((item) => item.id == id);
      },

      // get the total years of copyright
      copyrightDate() {
        const yearsDuration =
          new Date(
            new Date() - new Date(String(this.copyrightStartDate))
          ).getFullYear() - 1970;
        return yearsDuration === 0
          ? this.copyrightStartDate
          : `${this.copyrightStartDate} - ${
              this.copyrightStartDate + yearsDuration
            }`;
      },
    },
    directives: {
      // clone directive
      clone: {
        mounted(el) {
          el.parentNode.insertBefore(el.cloneNode(true), el.nextSibling);
        },
      },
      // add stagger delay to children elements
      staggerdelay: {
        mounted(el, binding) {
          [...el.children].forEach((child, i) => {
            child.setAttribute(
              "style",
              `animation-delay: ${(i + 1) * (binding.value || 100)}ms`
            );
          });
        },
      },
      // tooltip directive
      tooltip: {
        mounted(el, binding) {
          el.classList.add("has-tooltip");
          el.insertAdjacentHTML(
            "beforeend",
            `<div class="custom-tooltip custom-tooltip-${binding.value.dir}">${binding.value.text}</div>`
          );
        },
      },
    },
  });
  app.mount("#app");
})();

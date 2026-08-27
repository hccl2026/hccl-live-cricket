document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     1. MATCH FILTER BUTTONS
  ===================================================== */

  const filterButtons =
    document.querySelectorAll(".filter button");

  const matchCards =
    document.querySelectorAll(".match-card");


  if (
    filterButtons.length > 0 &&
    matchCards.length > 0
  ) {

    filterButtons.forEach(function (button) {

      button.addEventListener("click", function () {

        filterButtons.forEach(function (btn) {

          btn.classList.remove("on");

        });


        button.classList.add("on");


        const filter =
          button.getAttribute("data-filter");


        matchCards.forEach(function (card) {

          const status =
            card.getAttribute("data-status");


          if (
            filter === "all" ||
            filter === status
          ) {

            card.style.display = "";

          } else {

            card.style.display = "none";

          }

        });

      });

    });

  }


  /* =====================================================
     2. MATCH COUNTDOWN
  ===================================================== */

  const countdownElements =
    document.querySelectorAll(
      ".countdown[data-time]"
    );


  function updateCountdowns() {

    countdownElements.forEach(function (element) {

      const time =
        element.getAttribute("data-time");


      if (!time) {
        return;
      }


      const targetTime =
        new Date(time).getTime();


      const now =
        new Date().getTime();


      const difference =
        targetTime - now;


      if (
        Number.isNaN(targetTime)
      ) {

        element.textContent =
          "Schedule Pending";

        return;

      }


      if (difference <= 0) {

        element.textContent =
          "MATCH TIME";

        return;

      }


      const days =
        Math.floor(
          difference /
          (1000 * 60 * 60 * 24)
        );


      const hours =
        Math.floor(
          (
            difference %
            (1000 * 60 * 60 * 24)
          ) /
          (1000 * 60 * 60)
        );


      const minutes =
        Math.floor(
          (
            difference %
            (1000 * 60 * 60)
          ) /
          (1000 * 60)
        );


      const seconds =
        Math.floor(
          (
            difference %
            (1000 * 60)
          ) /
          1000
        );


      let countdownText =
        "Starts in ";


      if (days > 0) {

        countdownText +=
          days +
          "d ";

      }


      countdownText +=
        String(hours).padStart(2, "0") +
        "h " +

        String(minutes).padStart(2, "0") +
        "m " +

        String(seconds).padStart(2, "0") +
        "s";


      element.textContent =
        countdownText;

    });

  }


  if (countdownElements.length > 0) {

    updateCountdowns();

    setInterval(
      updateCountdowns,
      1000
    );

  }


  /* =====================================================
     3. HCCL TEAM LINKS
  ===================================================== */

  const teamMap = {

    "hccl reds":
      "reds",

    "hccl blues":
      "blues",

    "hccl warriors":
      "warriors",

    "hccl titans":
      "titans",

    "hccl kings":
      "kings",

    "hccl strikers":
      "strikers",

    "hccl lions":
      "lions",

    "hccl eagles":
      "eagles"

  };


  /*
  Only actual franchise cards inside
  #teams section will receive team links.
  */

  const franchiseCards =
    document.querySelectorAll(
      "#teams .team-card"
    );


  franchiseCards.forEach(function (card) {

    const nameElement =
      card.querySelector("b");


    if (!nameElement) {
      return;
    }


    const teamName =
      nameElement
      .textContent
      .trim()
      .toLowerCase();


    const teamKey =
      teamMap[teamName];


    if (!teamKey) {
      return;
    }


    const teamURL =
      "team.html?team=" +
      teamKey;


    /* Make card clickable */

    card.style.cursor =
      "pointer";


    card.setAttribute(
      "role",
      "link"
    );


    card.setAttribute(
      "tabindex",
      "0"
    );


    card.addEventListener(
      "click",
      function (event) {

        /*
        If future card has another button/link,
        don't hijack that click.
        */

        if (
          event.target.closest("a")
        ) {

          return;

        }


        window.location.href =
          teamURL;

      }
    );


    /* Keyboard accessibility */

    card.addEventListener(
      "keydown",
      function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          window.location.href =
            teamURL;

        }

      }
    );


    /*
    Convert Squad text into link
    */

    const squadElement =
      card.querySelector("span");


    if (squadElement) {

      squadElement.innerHTML =
        `<a href="${teamURL}">
          Squad →
        </a>`;

    }

  });


  /* =====================================================
     4. TEAM CARD HOVER EFFECT
  ===================================================== */

  franchiseCards.forEach(function (card) {

    card.addEventListener(
      "mouseenter",
      function () {

        card.style.transform =
          "translateY(-4px)";

        card.style.transition =
          "transform .2s ease";

      }
    );


    card.addEventListener(
      "mouseleave",
      function () {

        card.style.transform =
          "translateY(0)";

      }
    );

  });


  /* =====================================================
     5. HERO VIDEO AUTOPLAY SUPPORT
  ===================================================== */

  const videos =
    document.querySelectorAll(
      "video[autoplay]"
    );


  videos.forEach(function (video) {

    video.muted = true;

    video.playsInline = true;


    const playPromise =
      video.play();


    if (
      playPromise !== undefined
    ) {

      playPromise.catch(function () {

        /*
        Some mobile browsers may block
        autoplay until interaction.
        */

      });

    }

  });


  /* =====================================================
     6. ACTIVE NAVIGATION PAGE
  ===================================================== */

  const navLinks =
    document.querySelectorAll(
      ".nav nav a"
    );


  const currentFile =
    window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();


  navLinks.forEach(function (link) {

    const href =
      link
      .getAttribute("href");


    if (!href) {
      return;
    }


    const cleanHref =
      href
      .split("?")[0]
      .split("#")[0]
      .toLowerCase();


    /*
    Do not override manually active
    anchor links like Teams/Points.
    */

    if (
      cleanHref &&
      cleanHref === currentFile
    ) {

      /*
      Remove active only from exact
      page-level links.
      */

      navLinks.forEach(function (item) {

        const itemHref =
          item.getAttribute("href") || "";


        if (
          !itemHref.includes("#")
        ) {

          item.classList.remove(
            "active"
          );

        }

      });


      link.classList.add(
        "active"
      );

    }

  });


  /* =====================================================
     7. SMOOTH HOME ANCHOR LINKS
  ===================================================== */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetID =
          link.getAttribute("href");


        if (
          !targetID ||
          targetID === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetID
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({

          behavior:"smooth",

          block:"start"

        });

      }
    );

  });


});

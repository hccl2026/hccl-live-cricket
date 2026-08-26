document.addEventListener("DOMContentLoaded", function () {

  // MATCH FILTER BUTTONS
  const filterButtons = document.querySelectorAll(".filter button");
  const matchCards = document.querySelectorAll(".match-card");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

      filterButtons.forEach(function (btn) {
        btn.classList.remove("on");
      });

      button.classList.add("on");

      const filter = button.getAttribute("data-filter");

      matchCards.forEach(function (card) {
        const status = card.getAttribute("data-status");

        if (filter === "all" || filter === status) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

    });
  });


  // UPCOMING MATCH COUNTDOWN
  const countdowns = document.querySelectorAll(".countdown");

  function updateCountdowns() {

    countdowns.forEach(function (countdown) {

      const matchTime = countdown.getAttribute("data-time");

      if (!matchTime) return;

      const target = new Date(matchTime).getTime();
      const now = new Date().getTime();

      const distance = target - now;

      if (distance <= 0) {
        countdown.textContent = "Match starting now";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
      );

      let text = "Starts in ";

      if (days > 0) {
        text += days + "d ";
      }

      text += hours + "h " + minutes + "m " + seconds + "s";

      countdown.textContent = text;

    });

  }

  updateCountdowns();

  setInterval(updateCountdowns, 1000);


  // SMOOTH SCROLL FOR INTERNAL LINKS
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });

});

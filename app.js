(function () {
  var POSTS_PER_BATCH = 5;
  var rendered = 0;
  var container = document.getElementById("posts");
  var loading = document.getElementById("loading");

  // Format a date string like "February 20, 2026"
  function formatDate(dateStr) {
    var parts = dateStr.split("-");
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    var months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  // Build star string from rating (1-5)
  function renderStars(rating) {
    var s = "";
    for (var i = 0; i < 5; i++) {
      s += i < rating ? "\u2605" : "\u2606";
    }
    return s;
  }

  // Generate a URL-friendly slug from a title
  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  // Build the HTML for a single post
  function buildPost(post) {
    var slug = slugify(post.title);
    var div = document.createElement("div");
    div.className = "post";
    div.id = slug;

    // Header
    var header = document.createElement("div");
    header.className = "post-header";
    header.innerHTML =
      '<h2 class="post-title"><a href="#' + slug + '">' + escapeHtml(post.title) + "</a></h2>" +
      '<div class="post-date">' + formatDate(post.date) + "</div>" +
      '<div class="post-stars">' + renderStars(post.rating) + "</div>";
    div.appendChild(header);

    // Body
    var body = document.createElement("div");
    body.className = "post-body";

    // Photos
    var photosDiv = document.createElement("div");
    photosDiv.className = "post-photos";
    if (post.photos && post.photos.length > 0) {
      post.photos.forEach(function (src) {
        var img = document.createElement("img");
        img.alt = post.title;
        img.loading = "lazy";
        img.src = src;
        // If the image fails to load, show a placeholder
        img.onerror = function () {
          var placeholder = document.createElement("div");
          placeholder.className = "placeholder-img";
          placeholder.textContent = "[photo coming soon]";
          img.parentNode.replaceChild(placeholder, img);
        };
        photosDiv.appendChild(img);
      });
    }
    body.appendChild(photosDiv);

    // Content (review + map)
    var content = document.createElement("div");
    content.className = "post-content";

    var review = document.createElement("p");
    review.className = "post-review";
    review.textContent = post.review;
    content.appendChild(review);

    // Map embed
    if (post.mapQuery) {
      var mapDiv = document.createElement("div");
      mapDiv.className = "post-map";
      var iframe = document.createElement("iframe");
      iframe.src =
        "https://maps.google.com/maps?q=" +
        encodeURIComponent(post.mapQuery) +
        "&output=embed";
      iframe.loading = "lazy";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      iframe.title = "Map: " + post.title;
      mapDiv.appendChild(iframe);
      content.appendChild(mapDiv);
    }

    body.appendChild(content);
    div.appendChild(body);

    return div;
  }

  // Escape HTML to prevent XSS
  function escapeHtml(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Render next batch of posts
  function renderBatch() {
    if (rendered >= posts.length) return;

    var end = Math.min(rendered + POSTS_PER_BATCH, posts.length);
    for (var i = rendered; i < end; i++) {
      container.appendChild(buildPost(posts[i]));
    }
    rendered = end;
  }

  // Check if user has scrolled near the bottom
  function onScroll() {
    if (rendered >= posts.length) return;

    var scrollBottom = window.innerHeight + window.scrollY;
    var threshold = document.body.offsetHeight - 300;

    if (scrollBottom >= threshold) {
      loading.style.display = "block";
      renderBatch();
      if (rendered >= posts.length) {
        loading.style.display = "none";
      }
    }
  }

  // Fake hit counter
  function initHitCounter() {
    var el = document.getElementById("hitCounter");
    if (!el) return;
    var num = Math.floor(Math.random() * 8000) + 1337;
    var str = String(num);
    while (str.length < 6) str = "0" + str;
    el.textContent = str.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }

  // Scroll to hash target, rendering enough posts to reach it
  function scrollToHash() {
    var hash = window.location.hash.slice(1);
    if (!hash) return;
    var target = document.getElementById(hash);
    while (!target && rendered < posts.length) {
      renderBatch();
      target = document.getElementById(hash);
    }
    if (target) target.scrollIntoView();
  }

  // Initialize
  renderBatch();
  initHitCounter();
  scrollToHash();
  window.addEventListener("scroll", onScroll);
})();

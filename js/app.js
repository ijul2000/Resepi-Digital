/* =========================================================
   app.js — logik utama aplikasi ResepiKu
   ========================================================= */

(function () {
  "use strict";

  /* ---------------- STATE ---------------- */
  let recipes = [];
  let currentView = "home";
  let homeCategory = "Semua";
  let myCategory = "Semua";
  let searchQuery = "";
  let sortOrder = "terbaru";
  let deleteTargetId = null;

  /* ---------------- ELEMEN DOM ---------------- */
  const el = {
    header: document.querySelector(".site-header"),
    hamburgerBtn: document.getElementById("hamburgerBtn"),
    searchInput: document.getElementById("searchInput"),
    openAddBtn: document.getElementById("openAddBtn"),
    heroCta: document.getElementById("heroCta"),

    views: {
      home: document.getElementById("view-home"),
      myrecipes: document.getElementById("view-myrecipes"),
      about: document.getElementById("view-about")
    },
    navLinks: document.querySelectorAll(".nav-link, [data-nav]"),

    categoryChips: document.getElementById("categoryChips"),
    myCategoryChips: document.getElementById("myCategoryChips"),
    homeGrid: document.getElementById("homeGrid"),
    homeEmpty: document.getElementById("homeEmpty"),
    myGrid: document.getElementById("myGrid"),
    myEmpty: document.getElementById("myEmpty"),
    sortSelect: document.getElementById("sortSelect"),

    detailModal: document.getElementById("detailModal"),
    detailMedia: document.getElementById("detailMedia"),
    detailCategory: document.getElementById("detailCategory"),
    detailFavBtn: document.getElementById("detailFavBtn"),
    detailTitle: document.getElementById("detailTitle"),
    detailTime: document.getElementById("detailTime"),
    detailServings: document.getElementById("detailServings"),
    detailIngredients: document.getElementById("detailIngredients"),
    detailSteps: document.getElementById("detailSteps"),
    detailEditBtn: document.getElementById("detailEditBtn"),
    detailDeleteBtn: document.getElementById("detailDeleteBtn"),

    formModal: document.getElementById("formModal"),
    formTitle: document.getElementById("formTitle"),
    recipeForm: document.getElementById("recipeForm"),
    recipeId: document.getElementById("recipeId"),
    fName: document.getElementById("fName"),
    fCategory: document.getElementById("fCategory"),
    fEmoji: document.getElementById("fEmoji"),
    fTime: document.getElementById("fTime"),
    fServings: document.getElementById("fServings"),
    fIngredients: document.getElementById("fIngredients"),
    fInstructions: document.getElementById("fInstructions"),

    confirmModal: document.getElementById("confirmModal"),
    confirmCancelBtn: document.getElementById("confirmCancelBtn"),
    confirmDeleteBtn: document.getElementById("confirmDeleteBtn"),

    toast: document.getElementById("toast")
  };

  let currentDetailId = null;

  /* ---------------- UTILITI ---------------- */
  function uid() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  function todayISO() {
    return new Date().toISOString().slice(0, 10);
  }

  function showToast(message) {
    el.toast.textContent = message;
    el.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { el.toast.hidden = true; }, 2400);
  }

  function persist() {
    Storage.save(recipes);
  }

  function findRecipe(id) {
    return recipes.find((r) => String(r.id) === String(id));
  }

  /* ---------------- FILTER & SORT ---------------- */
  function filterRecipes(list, category, query) {
    let out = list;
    if (category && category !== "Semua") {
      out = out.filter((r) => r.category === category);
    }
    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter((r) => {
        const inName = r.name.toLowerCase().includes(q);
        const inCategory = r.category.toLowerCase().includes(q);
        const inIngredients = (r.ingredients || []).some((i) => i.toLowerCase().includes(q));
        return inName || inCategory || inIngredients;
      });
    }
    return out;
  }

  function sortRecipes(list, order) {
    const out = [...list];
    switch (order) {
      case "terlama":
        out.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "az":
        out.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        out.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "terbaru":
      default:
        out.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return out;
  }

  /* ---------------- RENDER: KATEGORI CHIPS ---------------- */
  function renderCategoryChips(container, activeCategory, onSelect) {
    container.innerHTML = "";
    DEFAULT_CATEGORIES.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = "chip" + (cat === activeCategory ? " active" : "");
      btn.type = "button";
      btn.textContent = cat;
      btn.addEventListener("click", () => onSelect(cat));
      container.appendChild(btn);
    });
  }

  /* ---------------- RENDER: RECIPE CARD ---------------- */
  function createCard(recipe) {
    const card = document.createElement("article");
    card.className = "recipe-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Lihat resepi " + recipe.name);

    const media = document.createElement("div");
    media.className = "card-media";
    media.innerHTML = Icons.get(recipe.emoji);
    const badge = document.createElement("span");
    badge.className = "card-badge";
    badge.textContent = recipe.category;
    media.appendChild(badge);

    const body = document.createElement("div");
    body.className = "card-body";

    const name = document.createElement("h3");
    name.className = "card-name";
    name.textContent = recipe.name;

    const meta = document.createElement("div");
    meta.className = "card-meta";
    const info = document.createElement("span");
    info.textContent = "◷ " + recipe.cookingTime + "    " + recipe.servings;
    const favBtn = document.createElement("button");
    favBtn.className = "card-fav-btn";
    favBtn.type = "button";
    favBtn.setAttribute("data-fav", String(!!recipe.favorite));
    favBtn.setAttribute("aria-label", "Tandakan kegemaran");
    favBtn.textContent = recipe.favorite ? "♥" : "♡";
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(recipe.id);
    });

    meta.appendChild(info);
    meta.appendChild(favBtn);
    body.appendChild(name);
    body.appendChild(meta);

    card.appendChild(media);
    card.appendChild(body);

    card.addEventListener("click", () => openDetail(recipe.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openDetail(recipe.id);
    });

    return card;
  }

  function renderGrid(container, emptyEl, list) {
    container.innerHTML = "";
    if (!list.length) {
      emptyEl.hidden = false;
      return;
    }
    emptyEl.hidden = true;
    list.forEach((r) => container.appendChild(createCard(r)));
  }

  /* ---------------- RENDER: SEMUA VIEW ---------------- */
  function renderHome() {
    renderCategoryChips(el.categoryChips, homeCategory, (cat) => {
      homeCategory = cat;
      renderHome();
    });
    let list = filterRecipes(recipes, homeCategory, searchQuery);
    list = sortRecipes(list, "terbaru").slice(0, 8);
    renderGrid(el.homeGrid, el.homeEmpty, list);
  }

  function renderMyRecipes() {
    renderCategoryChips(el.myCategoryChips, myCategory, (cat) => {
      myCategory = cat;
      renderMyRecipes();
    });
    let list = filterRecipes(recipes, myCategory, searchQuery);
    list = sortRecipes(list, sortOrder);
    renderGrid(el.myGrid, el.myEmpty, list);
  }

  function renderAll() {
    renderHome();
    renderMyRecipes();
  }

  /* ---------------- NAVIGASI VIEW ---------------- */
  function switchView(view) {
    currentView = view;
    Object.keys(el.views).forEach((key) => {
      el.views[key].hidden = key !== view;
    });
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === view);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeNavMenu();
  }

  function closeNavMenu() {
    el.header.classList.remove("nav-open");
    el.hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  /* ---------------- FAVORITE ---------------- */
  function toggleFavorite(id) {
    const recipe = findRecipe(id);
    if (!recipe) return;
    recipe.favorite = !recipe.favorite;
    persist();
    renderAll();
    if (currentDetailId === id) {
      el.detailFavBtn.setAttribute("data-fav", String(recipe.favorite));
      el.detailFavBtn.textContent = recipe.favorite ? "♥" : "♡";
    }
  }

  /* ---------------- MODAL: DETAIL ---------------- */
  function openDetail(id) {
    const recipe = findRecipe(id);
    if (!recipe) return;
    currentDetailId = id;

    el.detailMedia.innerHTML = Icons.get(recipe.emoji);
    el.detailCategory.textContent = recipe.category;
    el.detailFavBtn.setAttribute("data-fav", String(!!recipe.favorite));
    el.detailFavBtn.textContent = recipe.favorite ? "♥" : "♡";
    el.detailTitle.textContent = recipe.name;
    el.detailTime.textContent = recipe.cookingTime;
    el.detailServings.textContent = recipe.servings;

    el.detailIngredients.innerHTML = "";
    (recipe.ingredients || []).forEach((ing) => {
      const li = document.createElement("li");
      li.textContent = ing;
      el.detailIngredients.appendChild(li);
    });

    el.detailSteps.innerHTML = "";
    (recipe.instructions || []).forEach((step) => {
      const li = document.createElement("li");
      li.textContent = step;
      el.detailSteps.appendChild(li);
    });

    openModal(el.detailModal);
  }

  /* ---------------- MODAL: FORM (TAMBAH / EDIT) ---------------- */
  function populateCategoryOptions() {
    el.fCategory.innerHTML = "";
    DEFAULT_CATEGORIES.filter((c) => c !== "Semua").forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      el.fCategory.appendChild(opt);
    });
  }

  function openForm(recipe) {
    populateCategoryOptions();
    el.recipeForm.reset();

    if (recipe) {
      el.formTitle.textContent = "Edit Resepi";
      el.recipeId.value = recipe.id;
      el.fName.value = recipe.name;
      el.fCategory.value = recipe.category;
      el.fEmoji.value = recipe.emoji || "🍲";
      el.fTime.value = recipe.cookingTime;
      el.fServings.value = recipe.servings;
      el.fIngredients.value = (recipe.ingredients || []).join("\n");
      el.fInstructions.value = (recipe.instructions || []).join("\n");
    } else {
      el.formTitle.textContent = "Tambah Resepi";
      el.recipeId.value = "";
    }

    openModal(el.formModal);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const ingredients = el.fIngredients.value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    const instructions = el.fInstructions.value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const id = el.recipeId.value;

    if (id) {
      const recipe = findRecipe(id);
      if (recipe) {
        recipe.name = el.fName.value.trim();
        recipe.category = el.fCategory.value;
        recipe.emoji = el.fEmoji.value;
        recipe.cookingTime = el.fTime.value.trim();
        recipe.servings = el.fServings.value.trim();
        recipe.ingredients = ingredients;
        recipe.instructions = instructions;
      }
      showToast("Resepi berjaya dikemas kini.");
    } else {
      recipes.unshift({
        id: uid(),
        name: el.fName.value.trim(),
        category: el.fCategory.value,
        emoji: el.fEmoji.value,
        cookingTime: el.fTime.value.trim(),
        servings: el.fServings.value.trim(),
        ingredients,
        instructions,
        favorite: false,
        createdAt: todayISO()
      });
      showToast("Resepi berjaya disimpan.");
    }

    persist();
    renderAll();
    closeModal(el.formModal);
  }

  /* ---------------- PADAM RESEPI ---------------- */
  function openConfirmDelete(id) {
    deleteTargetId = id;
    openModal(el.confirmModal);
  }

  function performDelete() {
    if (deleteTargetId == null) return;
    recipes = recipes.filter((r) => String(r.id) !== String(deleteTargetId));
    persist();
    renderAll();
    closeModal(el.confirmModal);
    closeModal(el.detailModal);
    showToast("Resepi telah dipadam.");
    deleteTargetId = null;
  }

  /* ---------------- MODAL HELPERS ---------------- */
  function openModal(modalEl) {
    modalEl.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    modalEl.hidden = true;
    document.body.style.overflow = "";
  }

  function bindModalClosers() {
    document.querySelectorAll("[data-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        closeModal(document.getElementById(btn.dataset.close));
      });
    });
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay").forEach((overlay) => {
          if (!overlay.hidden) closeModal(overlay);
        });
      }
    });
  }

  /* ---------------- EVENT BINDING ---------------- */
  function bindEvents() {
    el.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        switchView(link.dataset.nav);
        if (link.dataset.scroll) {
          setTimeout(() => {
            const target = document.getElementById(link.dataset.scroll);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }, 60);
        }
      });
    });

    el.hamburgerBtn.addEventListener("click", () => {
      const open = el.header.classList.toggle("nav-open");
      el.hamburgerBtn.setAttribute("aria-expanded", String(open));
    });

    el.searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderAll();
    });

    el.sortSelect.addEventListener("change", (e) => {
      sortOrder = e.target.value;
      renderMyRecipes();
    });

    el.openAddBtn.addEventListener("click", () => openForm(null));
    el.heroCta.addEventListener("click", (e) => {
      e.preventDefault();
      openForm(null);
    });

    el.recipeForm.addEventListener("submit", handleFormSubmit);

    el.detailFavBtn.addEventListener("click", () => {
      if (currentDetailId != null) toggleFavorite(currentDetailId);
    });
    el.detailEditBtn.addEventListener("click", () => {
      const recipe = findRecipe(currentDetailId);
      closeModal(el.detailModal);
      openForm(recipe);
    });
    el.detailDeleteBtn.addEventListener("click", () => {
      openConfirmDelete(currentDetailId);
    });

    el.confirmCancelBtn.addEventListener("click", () => closeModal(el.confirmModal));
    el.confirmDeleteBtn.addEventListener("click", performDelete);

    bindModalClosers();
  }

  /* ---------------- INIT ---------------- */
  async function init() {
    const saved = Storage.load();
    if (saved && Array.isArray(saved) && saved.length) {
      recipes = saved;
    } else {
      recipes = await getSeedRecipes();
      persist();
    }

    bindEvents();
    renderAll();
    switchView("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();

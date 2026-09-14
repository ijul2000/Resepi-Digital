/* =========================================================
   storage.js — lapisan penyimpanan (localStorage)
   ========================================================= */

const STORAGE_KEY = "resepiku_recipes";

const Storage = {
  /** Dapatkan semua resepi daripada localStorage. Pulangkan null jika belum ada. */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("Gagal membaca data dari localStorage:", err);
      return null;
    }
  },

  /** Simpan senarai resepi ke localStorage. */
  save(recipes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      return true;
    } catch (err) {
      console.error("Gagal menyimpan data ke localStorage:", err);
      return false;
    }
  }
};

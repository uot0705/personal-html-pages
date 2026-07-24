(() => {
  const PASSWORD_HASH = [
    "0f19b568d6b05cb6",
    "c00418410da43025",
    "f9a8ec0ebf9a1a84",
    "9681ee20391a5397"
  ].join("");
  const AUTH_KEY = "zushi-hayama-day-plan-authenticated";

  const authScreen = document.getElementById("auth-screen");
  const authForm = document.getElementById("auth-form");
  const passwordInput = document.getElementById("password");
  const authError = document.getElementById("auth-error");
  const protectedContent = document.getElementById("protected-content");
  const submitButton = authForm.querySelector('button[type="submit"]');

  function showContent() {
    authScreen.hidden = true;
    protectedContent.hidden = false;
  }

  async function sha256Hex(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", bytes);
    return Array.from(
      new Uint8Array(digest),
      (byte) => byte.toString(16).padStart(2, "0")
    ).join("");
  }

  authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    authError.textContent = "";
    submitButton.disabled = true;

    try {
      const candidateHash = await sha256Hex(passwordInput.value);
      if (candidateHash !== PASSWORD_HASH) {
        authError.textContent = "パスワードが違います。";
        passwordInput.select();
        return;
      }

      try {
        localStorage.setItem(AUTH_KEY, "true");
      } catch (error) {
        // Storage may be unavailable in private browsing; the current page can still open.
      }
      showContent();
    } catch (error) {
      authError.textContent = "このブラウザではパスワードを確認できません。";
    } finally {
      submitButton.disabled = false;
    }
  });

  try {
    if (localStorage.getItem(AUTH_KEY) === "true") {
      showContent();
    } else {
      passwordInput.focus();
    }
  } catch (error) {
    passwordInput.focus();
  }
})();

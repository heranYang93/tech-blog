const newCommentRoute = "/post/comment/";

const loginFormHandler = async (event) => {
  event.preventDefault();

  const commentTitle = document.querySelector("#commentTitle").value.trim();
  const commentComment = document.querySelector("#commentContent").value.trim();

  if (email && password) {
    const response = await fetch(loginRoute, {
      method: "POST",
      body: JSON.stringify({ commentTitle, commentComment }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to post comment");
    }
  }
};

document
  .querySelector(".commentForm")
  .addEventListener("submit", loginFormHandler);

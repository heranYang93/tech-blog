const commentHandler = async (evt) => {
  evt.preventDefault();

  const commentTitle = document.querySelector("#commentTitle").value.trim();
  const commentContent = document.querySelector("#commentContent").value.trim();

  if (commentTitle && commentContent) {
    const response = await fetch("/post/comment", {
      method: "POST",
      body: JSON.stringify({ commentTitle, commentContent }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to post comment");
    }
  }
};

document
  .querySelector(".commentForm")
  .addEventListener("submit", commentHandler);
